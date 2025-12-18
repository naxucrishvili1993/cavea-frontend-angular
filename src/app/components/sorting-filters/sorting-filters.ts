import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sorting-filters',
  imports: [],
  templateUrl: './sorting-filters.html',
  styles: ``,
})
export class SortingFilters implements OnInit {
  variations = [
    { name: 'Name (ASC)', value: 'name_asc' },
    { name: 'Name (DESC)', value: 'name_desc' },
    { name: 'Price (ASC)', value: 'price_asc' },
    { name: 'Price (DESC)', value: 'price_desc' },
    { name: 'Location (ASC)', value: 'location_asc' },
    { name: 'Location (DESC)', value: 'location_desc' },
  ];

  currentSort = signal<string>('name');
  currentOrder = signal<string>('desc');

  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.currentSort.set(params.get('sort') ? String(params.get('sort')).toLowerCase() : 'name');
      this.currentOrder.set(
        params.get('order') ? String(params.get('order')).toLowerCase() : 'asc'
      );
    });
  }

  sortChanged(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      const [sort, order] = event.target.value.split('_');
      const queryParams: any = { page: 1, sort: sort, order: order };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }
}
