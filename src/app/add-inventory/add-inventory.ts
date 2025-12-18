import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocationData } from '../../types/location';
import { Locations as LocationsService } from '../services/locations';
import { catchError } from 'rxjs';
import { Inventories as InventoriesService } from '../services/inventories';
import { BackLink } from '../components/back-link/back-link';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-add-inventory',
  imports: [BackLink],
  templateUrl: './add-inventory.html',
  styles: ``,
})
export class AddInventory implements OnInit {
  locationsData = signal<Array<LocationData>>([]);
  locationsService = inject(LocationsService);
  inventoriesService = inject(InventoriesService);
  router = inject(Router);
  form = signal<{
    name: string;
    description: string;
    price: string;
    locationId: string;
  }>({
    name: '',
    description: '',
    price: '0',
    locationId: this.locationsData.length > 0 ? String(this.locationsData().at(0)?.id) : '',
  });

  errors = signal<Record<string, string>>({});

  ngOnInit(): void {
    this.locationsService
      .getLocationsAndInventoryCounts()
      .pipe(
        catchError((err) => {
          toast.error(`Failed to load locations data ${err.message}`);
          return [];
        })
      )
      .subscribe((data: Array<LocationData>) => {
        this.locationsData.set(data);
        this.form.update((f) => ({ ...f, locationId: String(data.at(0)?.id) }));
      });
  }

  resetForm() {
    this.form.set({
      name: '',
      description: '',
      price: '0',
      locationId: this.locationsData.length > 0 ? String(this.locationsData().at(0)?.id) : '',
    });
  }

  handleChange(e: Event) {
    if (e && e.target instanceof HTMLInputElement) {
      this.form.set({ ...this.form(), [e.target.name]: e.target.value });
    }
  }

  handleSelect(e: Event) {
    this.form.set({
      ...this.form(),
      locationId: e.target instanceof HTMLSelectElement ? e.target.value : '',
    });
  }

  handleSubmit() {
    this.inventoriesService
      .createInventory({
        ...this.form(),
        price: Number(this.form().price),
        locationId: Number(this.form().locationId),
      })
      .pipe(
        catchError((err) => {
          if (err.status === 400 && err.error && err.error.errors) {
            const apiErrors: Record<string, string> = {};
            for (const error of err.error.errors) {
              apiErrors[error.field] = error.message;
            }
            this.errors.set(apiErrors);
          } else {
            console.log(`Failed to create inventory: ${err.message}`);
          }
          return [];
        })
      )
      .subscribe(() => {
        toast.success('Inventory created successfully.');
        this.router.navigate(['/inventories']);
      });
  }
}
