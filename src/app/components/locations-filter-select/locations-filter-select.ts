import { Component, inject, OnInit, signal } from '@angular/core';
import { Location } from '../../../types/location';
import { ActivatedRoute, Router } from '@angular/router';
import { Locations as LocationsService } from '../../services/locations';
import { catchError } from 'rxjs';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-locations-filter-select',
  imports: [],
  templateUrl: './locations-filter-select.html',
  styles: ``,
})
export class LocationsFilterSelect implements OnInit {
  locations = signal<Array<Location>>([]);
  loading = signal<boolean>(false);
  currentLocationId = signal<string>('all');

  route = inject(ActivatedRoute);
  router = inject(Router);
  locationsService = inject(LocationsService);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.currentLocationId.set(params.get('locationId') || 'all');
    });

    this.loading.set(true);
    this.locationsService
      .getLocations()
      .pipe(
        catchError((err) => {
          this.loading.set(false);
          toast.error('Failed to load locations.' + (err?.message || ''));
          return [];
        })
      )
      .subscribe((locations) => {
        this.locations.set(locations.locations);
      });

    this.loading.set(false);
  }

  locationIdChanged(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      const queryParams: any = { page: 1 };
      if (event.target.value !== 'all') {
        queryParams.locationId = event.target.value;
      } else {
        queryParams.locationId = null;
      }
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }
}
