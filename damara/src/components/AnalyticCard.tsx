import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InventoryBarChart from "./InventoryBarChart";
import {IProductsItem, IWarehouse} from "../models/Model";
import {useState} from "react";

export interface IAnalytics {
    products: IProductsItem[]
}

export default function AnalyticCard(ianalytics: IAnalytics) {

    let prdcts = useState(ianalytics);

    return (
        <Card className={"card-padding mt-2 mb-2"}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Inventory
                </Typography>
                <InventoryBarChart products={ianalytics.products}/>
                <Typography variant="body2" color="textSecondary" component="p">
                    Current Inventory By Warehouse.
                </Typography>
            </CardContent>
        </Card>
    );
}