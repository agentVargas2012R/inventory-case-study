import ReactDOM from "react-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useState} from "react";

interface ITitle {
   name: string;
   address: string;
   city: string;
   state: string;
   zipCode: string;
   phoneNumber: string;
}
export default function TitleCard(title: ITitle) {
    let cardTitle = useState(title);
    return (
        <Card className={" mt-2 mb-2"}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    <div className={"titleColor"}>{title.name}</div>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong className={"addressLine"}>{title.address} {title.city} {title.state}, {title.zipCode}</strong>
                </Typography>
            </CardContent>
        </Card>
    );
}