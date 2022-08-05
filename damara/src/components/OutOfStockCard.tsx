import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useState} from "react";
import {IStateCard} from "../models/Model";

export default function OutOfStockCard(props: IStateCard) {


    let stateProps = useState(props);
    let itemsOutOfStock = props.warehouse.products.map((item) => {
       if(item.inventory === 0) return item;
    });
    let [itemCheck] = itemsOutOfStock;

    return (
        <Card className={"mt-2 mb-2"}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                    <div>{props.warehouse.name}</div>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    { !itemCheck && <h4 className={"black"}>All Items In Stock </h4> }
                    { itemCheck &&  <h4 className={"red"}>Out of Stock Items: </h4> }
                    { Array.isArray(itemsOutOfStock) && itemsOutOfStock.map((item) => (
                        <h5 className={"red"}>{item && item.name}</h5>
                    ))}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    { itemCheck && "These products are currently unavailable at this location." }
                </Typography>
            </CardContent>
        </Card>
    );
}