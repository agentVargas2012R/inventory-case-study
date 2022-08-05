import {Expose, Transform} from "class-transformer";

export class DBWKey {
  pk: string;
  sk: string;
}

export class DBWarehouse {
  @Expose({ name: 'pk' })
  @Transform((objectId) => objectId.obj.warehouse_id || objectId.obj.pk, { toClassOnly: false })
  pk: string;
  sk: string;
  zipcode: string;
  'phone-number': string;
  name: string;
  address: string;
  city: string;
  state: string;
}

export class DBProduct {
  @Expose({ name: 'pk' })
  @Transform((objectId) => objectId.obj.product_id || objectId.obj.pk, { toClassOnly: false })
  pk: string;
  sk: string;
  name: string;
  manufacturer: string;
  cost: number;
  price: number;
}

export class DBInventory {


  @Expose({ name: 'pk' })
  @Transform((objectId) => objectId.obj.warehouse_id || objectId.obj.pk, { toClassOnly: false })
  pk: string;

  @Expose({ name: 'sk' })
  @Transform((objectId) => objectId.obj.product_id || objectId.obj.sk, { toClassOnly: false })
  sk: string;

  inventory: number;
}
