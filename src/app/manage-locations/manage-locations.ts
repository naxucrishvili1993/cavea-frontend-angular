import { Component, inject, OnInit, signal } from '@angular/core';
import { Locations as LocationsService } from '../services/locations';
import { Location } from '../../types/location';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-manage-locations',
  imports: [],
  templateUrl: './manage-locations.html',
  styles: ``,
})
export class ManageLocations implements OnInit {
  locationName = signal<String>('');

  locationsService = inject(LocationsService);
  locations = signal<Array<Location>>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.locationsService
      .getLocations()
      .pipe(
        catchError((error) => {
          console.error('Failed to load locations', error);
          this.locations.set([]);
          return [];
        })
      )
      .subscribe((data) => {
        this.locations.set(data.locations);
        this.loading.set(false);
      });

    console.log(this.locations());
  }

  setLocationName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.locationName.set(input.value);
  }

  handleAddLocation() {
    if (this.locationName().trim() === '') {
      return;
    }

    if (this.locationName().length < 5 || this.locationName().length > 50) {
      return;
    }

    if (this.locations().some((loc) => loc.address === this.locationName().trim())) {
      return;
    }

    this.loading.set(true);
    this.locationsService
      .createLocation(this.locationName().trim())
      .pipe(
        catchError((error) => {
          console.error('Failed to create location', error);
          throw error;
        })
      )
      .subscribe((newLocation) => {
        console.log('Location created successfully.');
        this.locations.update((locs) => [...locs, newLocation]);
        this.locationName.set('');
      });
    this.loading.set(false);
  }

  handleDelete(id: number): void {
    this.locationsService
      .deleteLocation(id)
      .pipe(
        catchError((error) => {
          console.error('Failed to delete location', error);
          throw error;
        })
      )
      .subscribe(() => {
        console.log('Location deleted successfully.');
        this.locations.update((locs) => locs.filter((loc) => loc.id !== id));
      });
  }
}
