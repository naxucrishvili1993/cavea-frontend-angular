import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Location } from '../../../types/location';
import { Locations as LocationsService } from '../../services/locations';
import { catchError, map } from 'rxjs';
import { toast } from 'ngx-sonner';

@Component({
  selector: '[app-location-item]',
  imports: [],
  templateUrl: './location-item.html',
  styles: ``,
})
export class LocationItem implements OnInit {
  location = input.required<Location>();
  locationDeleted = output<{ locationId: number }>();
  isEditing = signal<boolean>(false);
  editedAddress = signal<string>('');

  locationsService = inject(LocationsService);

  ngOnInit(): void {
    this.editedAddress.set(this.location().address);
  }

  onAddressChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.editedAddress.set(event.target.value);
    }
  }

  toggleEdit() {
    this.isEditing.update((v) => !v);
  }

  onDelete(locationId: number) {
    this.locationDeleted.emit({ locationId: locationId });
  }

  update() {
    this.locationsService
      .updateLocation(this.location().id, this.editedAddress())
      .pipe(
        map(() => {
          this.isEditing.set(false);
          this.location().address = this.editedAddress();
          toast.success('Location updated successfully.');
        }),
        catchError((err) => {
          toast.error('Failed to update location.' + (err?.message || ''));
          return [];
        })
      )
      .subscribe();
  }
}
