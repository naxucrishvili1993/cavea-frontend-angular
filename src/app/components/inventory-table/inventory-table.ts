import { Component, inject, input, output } from '@angular/core';
import { Inventory } from '../../../types/inventory';
import { Inventories as InventoriesService } from '../../services/inventories';
import { toast } from 'ngx-sonner';
import { Pagination } from '../pagination/pagination';
import { LocationsFilterSelect } from '../locations-filter-select/locations-filter-select';
import { SortingFilters } from '../sorting-filters/sorting-filters';

@Component({
  selector: 'app-inventory-table',
  imports: [Pagination, LocationsFilterSelect, SortingFilters],
  templateUrl: './inventory-table.html',
  styles: ``,
})
export class InventoryTable {
  private readonly toast = toast;
  inventoriesService = inject(InventoriesService);
  inventories = input.required<Array<Inventory>>();
  inventoryDeleted = output<Inventory>();

  page = input.required<number>();
  totalInventories = input.required<number>();

  onDelete(inventory: Inventory) {
    this.inventoriesService.deleteInventory(inventory.id).subscribe(() => {
      this.toast.success('Inventory deleted successfully.');
      this.inventoryDeleted.emit(inventory);
    });
  }
}
