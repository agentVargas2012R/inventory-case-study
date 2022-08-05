import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Inventory, Product, Warehouse } from './inventory.model';
import { InventoryService } from './inventory.service';

@Resolver((of) => Warehouse)
export class InventoryResolver {
  constructor(private inventoryService: InventoryService) {}

  @Query((returns) => [Warehouse])
  public async all() {
    const warehouses = await this.inventoryService.getWarehouses();
    for (const warehouse of warehouses) {
      const inventory = await this.inventoryService.getInventory(
        warehouse.warehouseId,
      );
      const products = await this.inventoryService.getProducts(
        warehouse.warehouseId,
        inventory,
      );
      warehouse.products = products;
    }

    return warehouses;
  }

  @Query((returns) => [Warehouse])
  public async warehouse() {
    return this.inventoryService.getWarehouses();
  }

  @Query((returns) => [Product])
  public async product(@Args('warehouseId') warehouseId: string) {
    const inventory = await this.inventoryService.getInventory(warehouseId);
    return this.inventoryService.getProducts(warehouseId, inventory);
  }

  @Query((returns) => [Inventory])
  public async inventory(
    @Args('warehouseId') warehouseId: string,
    @Args('productId') productId: string,
  ) {
    return this.inventoryService.getInventory(warehouseId, productId);
  }

  @ResolveField()
  public async products(@Parent() warehouse: Warehouse) {
    const { warehouseId } = warehouse;
    const inventory = await this.inventoryService.getInventory(warehouseId);
    const products = await this.inventoryService.getProducts(
      warehouseId,
      inventory,
    );
    return products;
  }
}
