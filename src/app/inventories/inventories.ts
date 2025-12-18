import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Inventory } from '../../types/inventory';
import { Inventories as InventoriesService } from '../services/inventories';
import { catchError, map } from 'rxjs';
import { Loading } from '../components/loading/loading';
import { InventoryTable } from '../components/inventory-table/inventory-table';

@Component({
  selector: 'app-inventories',
  imports: [RouterLink, Loading, InventoryTable],
  templateUrl: './inventories.html',
  styles: `
    a {
      padding: 0.5rem 0.75rem;
      background-color: white;
      color: black;
      border-radius: 0.375rem;
      cursor: pointer;
      font-weight: 500;
    }
  `,
})
export class Inventories implements OnInit {
  inventoriesService = inject(InventoriesService);

  inventories = signal<Array<Inventory>>([]);
  error = signal<string | null>(null);
  loading = signal<boolean>(false);
  count = signal<number>(0);

  page = 1;
  locationId = 'all';
  sort = 'name';
  order = 'asc';

  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.page = params.get('page') ? Number(params.get('page')) : 1;
      this.locationId = params.get('locationId') ? String(params.get('locationId')) : 'all';
      this.sort = params.get('sort') ? String(params.get('sort')).toLowerCase() : 'name';
      this.order = params.get('order') ? String(params.get('order')).toLowerCase() : 'asc';

      this.loading.set(true);

      this.inventoriesService
        .getInventories({
          page: this.page.toString(),
          locationId: this.locationId,
          sortBy: (this.sort as 'name' | 'price' | 'location') || undefined,
          order: (this.order.toUpperCase() as 'ASC' | 'DESC') || undefined,
        })
        .pipe(
          map((response) => {
            this.inventories.set(response.inventories);
            this.count.set(response.total);
            this.loading.set(false);
          }),
          catchError((err) => {
            this.error.set('Failed to load inventories.');
            this.loading.set(false);
            throw err;
          })
        )
        .subscribe();
    });
  }

  onInventoryDelete(inventory: Inventory) {
    this.inventories.update((inventories) => inventories.filter((inv) => inv.id !== inventory.id));
  }
}
