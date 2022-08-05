import {gql} from "graphql-request";

export interface IWarehouse {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    products: IProductsItem[];
}

export interface IProductsItem {
    name: string;
    manufacturer: string;
    cost: number;
    price: number;
    inventory: number;
}

export interface IStateCard {
    warehouse: IWarehouse
}

export interface IData {
    warehouse: IWarehouse[]
}

export const GRAPH = gql`{
  all {
    name
    address
    city
    state
    zipCode
    phoneNumber
    products {
      name      
      manufacturer
      cost
      price
      inventory
    }
  }
}`;

export const GRAPHQL_ENDPOINT = `https://z7z3h13z9h.execute-api.us-east-1.amazonaws.com/Stage/inventory/graphql`;
export const UPLOAD_ENDPOINT = `https://z7z3h13z9h.execute-api.us-east-1.amazonaws.com/Stage/inventory/upload`;