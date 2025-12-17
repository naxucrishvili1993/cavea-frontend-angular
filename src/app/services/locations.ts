import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../../lib/constants';
import { catchError, map } from 'rxjs';
import { Location, LocationData } from '../../types/location';

@Injectable({
  providedIn: 'root',
})
export class Locations {
  http = inject(HttpClient);

  getLocations() {
    return this.http.get<{ locations: Array<Location> }>(`${API}/locations`);
  }

  getLocationsAndInventoryCounts() {
    return this.http
      .get<{ inventoriesByLocation: LocationData[] }>(`${API}/inventories/by-location`)
      .pipe(
        map((data: any) => data.inventoriesByLocation as Array<LocationData>),
        catchError((error) => {
          console.error('Failed to fetch locations data', error);
          throw error;
        })
      );
  }

  createLocation(address: string) {
    return this.http.post<{ location: Location }>(`${API}/locations`, { address }).pipe(
      map((location) => location.location),
      catchError((error) => {
        console.error('Failed to create location', error);
        throw error;
      })
    );
  }

  deleteLocation(id: number) {
    return this.http.delete<{ success: boolean }>(`${API}/locations/${id}`).pipe(
      map((res) => res),
      catchError((error) => {
        console.error('Failed to delete location', error);
        throw error;
      })
    );
  }
}
