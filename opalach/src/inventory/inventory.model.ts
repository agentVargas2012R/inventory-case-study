import { Field, ObjectType } from '@nestjs/graphql';
import {Transform} from "class-transformer";

@ObjectType()
export class Warehouse {
  constructor() {}

  @Field((type) => String)
  warehouseId: string;

  @Field({ description: `The name of the warehouse.` })
  name: string;

  @Field({
    description: `The physical and registered location of the warehouse.`,
  })
  address: string;

  @Field({ description: `The cit where the warehouse is located.` })
  city: string;

  @Field({ description: `The state of the warehouse.` })
  state: string;

  @Field({ description: `The postal code of the warehouse.` })
  zipCode: string;

  @Field({ description: `The contact number of the warehouse.` })
  phoneNumber: string;

  @Field((type) => [Product], {
    description: 'The products in this warehouse.',
  })
  products?: Product[];
}

@ObjectType()
export class Product {
  @Field((type) => String)
  productId: string;

  @Field({ description: `The name of the product.` })
  name: string;

  @Field({ description: 'The provider of the product.' })
  manufacturer: string;

  @Field({ defaultValue: 0, description: `The cost associated  with the product.` })
  cost: number;

  @Field({ defaultValue: 0, description: `The price of the product.` })
  price: number;

  @Field({
    defaultValue: 0,
    nullable: true,
    description: `The inventory of the product.`,
  })
  inventory: number;
}

@ObjectType()
export class Inventory {
  @Transform(({value, key, obj, type}) => { console.log(value); console.log(key); console.log(obj); console.log(type);})
  @Field()
  warehouseId: string;

  @Field()
  productId: string;

  @Field({
    defaultValue: 0,
    nullable: true,
    description: `The amount associated with the product.`,
  })
  inventory: number;
}
