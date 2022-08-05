import ReactDOM from "react-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useState} from "react";
import {IProductsItem} from "../models/Model";

interface IStateCard {
    name: string;
    products: IProductsItem[];
    description: string;
    color: string;
}

export default function StatCard(props: IStateCard) {


    let stateProps = useState(props);
    let totalCost = props.products.reduce((accum, item) => {
        return accum += (item.inventory * item.cost);
    }, 0);

    return (
        <Card className={"mt-2 mb-2"}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                    <div className={props.color}>{props.name}</div>
                </Typography>
                <Typography gutterBottom variant="h3" component="h5">
                    ${totalCost.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}