import "../App.css";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import {IAnalytics} from "./AnalyticCard";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        let cost = payload[0].payload?.cost;
        let amt = payload[0].payload?.amt;
        return (
            <div className="custom-tooltip">
                <p className="label">{" Cost/Item: $" + cost }</p>
                <p className="intro">{" Total Cost: $" + amt }</p>
            </div>
        );
    }

    return null;
};


export default function InventoryBarChart(ianalytics: IAnalytics) {


     let data: any = [];
     ianalytics.products.map((item) => {
         data.push({
              name: item.name,
              items: item.inventory,
              cost: item.cost,
              amt: item.inventory * item.cost
         })
     });

    return (
        <BarChart className={"margin-left-80"}
            width={700}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="items" barSize={20} fill="#8884d8" />
        </BarChart>
    );
}
