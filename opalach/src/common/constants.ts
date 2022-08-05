import { DBProduct, DBWarehouse } from '../inventory/inventory.entity';
import {Inventory} from "../inventory/inventory.model";

export class Constants {
  public static readonly WAREHOUSE_DB: DBWarehouse[] = [
    {
      pk: 'warehouse#001',
      sk: '123456789',
      name: 'Southeast',
      address: 'address',
      city: 'Jupiter',
      state: 'FL',
      zipcode: '33458',
      'phone-number': '111-111-1111',
    },
    {
      pk: 'warehouse#001',
      sk: '1234567891',
      name: 'Northeast',
      address: 'address',
      city: 'Weston',
      state: 'FL',
      zipcode: '33458',
      'phone-number': '222-222-2222',
    },
  ];

  public static readonly WAREHOUSE = {
    warehouseId: 'warehouse#001',
    name: 'Southeast',
    address: 'address',
    city: 'Jupiter',
    state: 'FL',
    zipCode: '33458',
    phoneNumber: '111-111-1111',
  };

  public static readonly PRODUCT = {
    productId: 'product_id#001',
    name: 'Ketchup',
    manufacturer: 'Heinz',
    cost: 3,
    price: 4,
  };

  public static readonly PRODUCT_DB: DBProduct[] = [
    {
      pk: 'product_id#001',
      sk: 'NA',
      name: 'Ketchup',
      manufacturer: 'Heinz',
      cost: 3,
      price: 4,
    },
  ];

  public static readonly INVENTORY: Inventory = {
    warehouseId: 'warehouse#001',
    productId: 'product#001',
    inventory: 10,
  };

  public static readonly INVENTORY_DB = [
    {
      pk: 'warehouse#001',
      sk: 'product#001',
      inventory: 10,
    },
  ];
}
