import {Injectable} from '@nestjs/common';
import {FILE_TYPE} from "./upload.model";
import { plainToInstance } from 'class-transformer';
import {Inventory, Product} from "../inventory/inventory.model";
import {DBInventory, DBProduct, DBWarehouse} from "../inventory/inventory.entity";
import {DynamoDBUtil} from "../common/dynamodb-util";
import {TransformUtil} from "../common/transform-util";

@Injectable()
export class UploadService {

  dynamoDBUtil: DynamoDBUtil;
  constructor() {
    this.dynamoDBUtil = new DynamoDBUtil();
  }

  public transform(jsonObjs: any[], fileType: FILE_TYPE): DBInventory[] | DBProduct[] | DBWarehouse[] {
   switch (fileType) {
      case FILE_TYPE.INVENTORY_CSV:
        return TransformUtil.createInventory(jsonObjs);
      case FILE_TYPE.PRODUCT_CSV:
        return TransformUtil.createProducts(jsonObjs);
       case FILE_TYPE.WAREHOUSE_CSV:
           return TransformUtil.createWarehouses(jsonObjs);
     default:
       throw new Error("No Record Processor for this file type found.");
    }
  }

  public async save(entities: DBInventory[] | DBProduct[] | DBWarehouse[]): Promise<Boolean> {
    const dbRecords = await this.dynamoDBUtil.marshallRecords(entities);
    return await this.dynamoDBUtil.batchWriteItems(dbRecords);
  }
}
