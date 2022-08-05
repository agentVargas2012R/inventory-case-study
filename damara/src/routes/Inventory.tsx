import React, {Key, useEffect, useState} from 'react';
import AnalyticCard from "../components/AnalyticCard";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import StatCard from "../components/StatCard";
import TitleCard from "../components/TitleCard";
import {IProductsItem, IWarehouse, IData, GRAPH, GRAPHQL_ENDPOINT} from "../models/Model";
import {GraphQLClient, gql} from 'graphql-request';

import OutOfStockCard from "../components/OutOfStockCard";

const graphQLAWS = new GraphQLClient(GRAPHQL_ENDPOINT);

export async function getWarehouseData(): Promise<IWarehouse[]> {
    const  data: any  = await graphQLAWS.request(GRAPH, {});
    console.log("RESPONSE FROM GRAPHQL API");
    console.log(data);
    return data.all as IWarehouse[]
}

export const generateKey = (pre: string) => {
    return `${ pre }_${ new Date().getTime() }_${ Math.random() * 10000 }`;
}

export default function Inventory() {
    let [warehouse, setWarehouse ] = useState<IData["warehouse"]>([]);

    useEffect(() => {
        let mounted = true;
        getWarehouseData()
            .then(items => {
                if (mounted) {
                    setWarehouse(items)
                }
            })
    }, []);

    return (
        <Container fluid={"fluid"}>
            {warehouse.map( (warehouse:  IWarehouse, indexNumber) => (
              <div>
                <Row fluid={"fluid"}>

                    <Col xs={12}>
                        <TitleCard key={generateKey(warehouse.name)} name={warehouse.name} address={warehouse.address} city={warehouse.city} state={warehouse.state} zipCode={warehouse.zipCode} phoneNumber={warehouse.phoneNumber}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                     <AnalyticCard key={generateKey(warehouse.name)} products={warehouse.products}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <StatCard key={generateKey(warehouse.name)} name={"Cost"} products={warehouse.products} description={"Total cost at this facility."} color={"black"} />
                    </Col>
                    <Col xs={6}>
                        <OutOfStockCard key={generateKey(warehouse.name)} warehouse={warehouse}/>
                    </Col>
                </Row>
              </div>
            )) }
        </Container>
    )
}