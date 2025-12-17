import axios from 'axios';
import type { Inventory } from '../types/inventory';
import { API } from '../lib/constants';

export const getInventories = async ({
  page,
  locationId,
  sortBy = 'name',
  order = 'ASC',
}: {
  page: string;
  locationId: string;
  sortBy?: 'name' | 'price' | 'location';
  order?: 'ASC' | 'DESC';
}) => {
  const res = await axios.get(
    `${API}/inventories?page=${page}${
      locationId !== 'all' ? `&locationId=${locationId}` : ''
    }&sortBy=${sortBy}${order ? `&order=${order.toUpperCase()}` : ''}`
  );
  return res.data;
};

export const getInventory = async (id: number) => {
  const res = await axios.get(`${API}/inventories/${id}`);
  return res.data.inventory;
};

export const createInventory = async (data: Partial<Inventory>) => {
  const res = await axios.post(`${API}/inventories`, data);
  return res.data.inventory;
};

export const updateInventory = async (id: number, data: Partial<Inventory>) => {
  const res = await axios.put(`${API}/inventories/${id}`, data);
  return res.data.inventory;
};

export const deleteInventory = async (id: number) => {
  return await axios.delete(`${API}/inventories/${id}`);
};

export const getLocationsAndInventoryCounts = async () => {
  const res = await axios.get(`${API}/inventories/by-location`);
  return res.data.inventoriesByLocation;
};
