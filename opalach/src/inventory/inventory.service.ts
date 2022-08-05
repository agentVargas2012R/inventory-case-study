import { Injectable } from '@nestjs/common';
import { Inventory, Warehouse } from './inventory.model';
import { Constants } from '../common/constants';
import { plainToInstance } from 'class-transformer';
import { DBInventory, DBProduct, DBWarehouse } from './inventory.entity';
import {DynamoDBUtil} from "../common/dynamodb-util";

@Injectable()
export class InventoryService {
  dynamoDBUtil: DynamoDBUtil;
  constructor() {
    this.dynamoDBUtil = new DynamoDBUtil();
  }
  public async getWarehouses(): Promise<Warehouse[]> {
    let dynamoDBJson = await this.dynamoDBUtil.query("warehouse", "#");
    let json = await this.dynamoDBUtil.unmarshallRecords(dynamoDBJson);
    const entities: DBWarehouse[] = plainToInstance(
      DBWarehouse,
      json,
    );

    return entities.map((entity) => {
      return {
        warehouseId: entity.pk + "#" + entity.sk.split("#")[1],
        name: entity.name,
        address: entity.address,
        city: entity.city,
        state: entity.state,
        zipCode: entity.zipcode,
        phoneNumber: entity['phone-number'],
      };
    });
  }

  public async getInventory(warehouseId: string, productId?: string) {
    let dynamoDBJson = await this.dynamoDBUtil.query(warehouseId, "product#");
    let json = await this.dynamoDBUtil.unmarshallRecords(dynamoDBJson);

    const entities: DBInventory[] = plainToInstance(
      DBInventory,
      json,
    );

    return entities.map((entity) => {
      return {
        warehouseId: entity.pk,
        productId: entity.sk,
        inventory: entity.inventory,
      };
    });
  }

  public async getProducts(warehouseId: string, inventory: Inventory[]) {
    let dynamoDBJson = await this.dynamoDBUtil.query("product", "#");
    let json = await this.dynamoDBUtil.unmarshallRecords(dynamoDBJson);
    const entities: DBProduct[] = plainToInstance(
      DBProduct,
      json,
    );
    const warehouseInventory = inventory.filter((inv) => inv.warehouseId === warehouseId);
    const warehouseProducts = entities.map((product) => {
      let matchingProduct = warehouseInventory.find((inv) => {
        return `${product.pk}${product.sk}` === inv.productId;
      });
      let inventory = matchingProduct ? matchingProduct.inventory : 0;
      return {
        productId: product.pk,
        name: product.name,
        manufacturer: product.manufacturer,
        cost: product.cost,
        price: product.price,
        inventory: inventory,
      }
    });

    return warehouseProducts;
  }
}
