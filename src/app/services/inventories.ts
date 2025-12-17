import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Inventory } from '../../types/inventory';
import { API } from '../../lib/constants';

@Injectable({
  providedIn: 'root',
})
export class Inventories {
  http = inject(HttpClient);

  createInventory(data: Partial<Inventory>) {
    return this.http.post<Inventory>(`${API}/inventories`, data);
  }
}
