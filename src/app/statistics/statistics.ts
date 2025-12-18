import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError } from 'rxjs';
import { LocationData } from '../../types/location';
import { BackLink } from '../components/back-link/back-link';
import { Locations as LocationsService } from '../services/locations';
import { Loading } from '../components/loading/loading';

@Component({
  selector: 'app-statistics',
  imports: [BackLink, Loading],
  templateUrl: './statistics.html',
  styles: ``,
})
export class Statistics implements OnInit {
  locationsData = signal<Array<LocationData>>([]);
  error = signal<string | null>(null);
  loading = signal<boolean>(false);

  locationsService = inject(LocationsService);

  ngOnInit(): void {
    this.loading.set(true);
    this.locationsService
      .getLocationsAndInventoryCounts()
      .pipe(
        catchError((err) => {
          this.error.set(`Failed to load locations data ${err.message}`);
          this.loading.set(false);
          return [];
        })
      )
      .subscribe((data: Array<LocationData>) => {
        this.locationsData.set(data);
        this.loading.set(false);
      });
  }
}
