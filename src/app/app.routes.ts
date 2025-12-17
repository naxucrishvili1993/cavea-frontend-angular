import { Routes } from '@angular/router';
import { Inventories } from './inventories/inventories';
import { AddInventory } from './add-inventory/add-inventory';
import { Statistics } from './statistics/statistics';
import { ManageLocations } from './manage-locations/manage-locations';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Inventories,
  },
  {
    path: 'inventories',
    component: Inventories,
  },
  {
    path: 'add-inventory',
    component: AddInventory,
  },
  {
    path: 'statistics',
    component: Statistics,
  },
  {
    path: 'manage-locations',
    component: ManageLocations,
  },
];
