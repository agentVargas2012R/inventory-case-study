import {Inventory, Product} from "../inventory/inventory.model";
import {plainToInstance} from "class-transformer";
import {DBInventory, DBProduct, DBWarehouse, DBWKey} from "../inventory/inventory.entity";

export class TransformUtil {

    public static isEmpty(result: any | undefined) {
        try {
            if (!result) return true;
            if (Array.isArray(result) && result.length > 0) {
                if (result[0] !== undefined || result[0] !== null) return true;
                return Object.keys(result[0]).length > 0;
            }
            return Object.keys(result).length === 0;
        }catch(err) {
            return true;
        }
    }

    public static createWarehouses(jsonObjs: any): DBWarehouse[] {
        const warehouses: DBWarehouse[] = plainToInstance(
            DBWarehouse,
            jsonObjs
        ) as unknown as DBWarehouse[];

        return warehouses.map((entity) => {
            let record = {
                pk: entity.pk.split("#")[0],
                sk: `#${entity.pk.split("#")[1]}`,
                name: entity.name,
                address: entity.address,
                city: entity.city,
                state: entity.state,
                zipcode: entity.zipcode,
                "phone-number": entity["phone-number"],
            } as DBWarehouse;
            return record;
        });
    }

    public static createInventory(jsonObjs: any): DBInventory[] {
        const inventory: DBInventory[] = plainToInstance(
            DBInventory,
            jsonObjs
        ) as unknown as DBInventory[];
        return inventory.map((entity) => {
            let record = {
                pk: entity.pk,
                sk: entity.sk,
                inventory: entity.inventory
            } as DBInventory;
            return record;
        });
    }

    public static createProducts(jsonObjs: any): DBProduct[] {
        const products: DBProduct[] = plainToInstance(
            DBProduct,
            jsonObjs,
        ) as unknown as DBProduct[];
        let dbProducts = products.map((product) => {
            let record = {
                pk: product.pk.split("#")[0],
                sk: `#${product.pk.split("#")[1]}`,
                name: product.name,
                manufacturer: product.manufacturer,
                cost: product.cost,
                price: product.price
            } as DBProduct;
            return record;
        });
        return dbProducts;
    }
}


