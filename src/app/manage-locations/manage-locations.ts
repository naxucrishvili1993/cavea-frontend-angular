import { Component, inject, OnInit, signal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { catchError } from 'rxjs';
import { Location } from '../../types/location';
import { BackLink } from '../components/back-link/back-link';
import { Loading } from '../components/loading/loading';
import { LocationItem } from '../components/location-item/location-item';
import { Locations as LocationsService } from '../services/locations';

@Component({
  selector: 'app-manage-locations',
  imports: [BackLink, Loading, LocationItem],
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
          this.loading.set(false);
          return [];
        })
      )
      .subscribe((data) => {
        this.locations.set(data.locations);
        this.loading.set(false);
      });
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
        toast.success('Location created successfully.');
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
        toast.success('Location deleted successfully.');
        this.locations.update((locs) => locs.filter((loc) => loc.id !== id));
      });
  }
}
