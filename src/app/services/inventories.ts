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

  getInventories({
    page,
    locationId,
    sortBy,
    order,
  }: {
    page: string;
    locationId: string;
    sortBy?: 'name' | 'price' | 'location';
    order?: 'ASC' | 'DESC';
  }) {
    return this.http.get<{ inventories: Array<Inventory>; total: number }>(
      `${API}/inventories?page=${page}${
        locationId !== 'all' ? `&locationId=${locationId}` : ''
      }&sortBy=${sortBy}${order ? `&order=${order.toUpperCase()}` : ''}`
    );
  }

  deleteInventory(id: number) {
    return this.http.delete<{ message: string }>(`${API}/inventories/${id}`);
  }
}
