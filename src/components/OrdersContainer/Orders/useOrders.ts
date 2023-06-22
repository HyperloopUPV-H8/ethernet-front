import { VehicleOrders, useWsHandler } from "common";
import { useEffect } from "react";
import { config } from "common";
import { useDispatch, useSelector } from "react-redux";
import { setOrders, updateStateOrders } from "slices/ordersSlice";
import { RootState } from "store";
import { nanoid } from "nanoid";

//TODO: make typed fetch function, from url you get response type

const ORDERS_URL = import.meta.env.PROD
    ? `http://${config.prodServer.ip}:${config.prodServer.port}/${config.paths.orderDescription}`
    : `http://${config.devServer.ip}:${config.devServer.port}/${config.paths.orderDescription}`;

export function useOrders() {
    const dispatch = useDispatch();
    const handler = useWsHandler();

    useEffect(() => {
        const controller = new AbortController();
        const id = nanoid();

        fetch(ORDERS_URL)
            .then((res) => res.json())
            .then((descriptions: VehicleOrders) => {
                dispatch(setOrders(descriptions));
                handler.subscribe("order/stateOrders", {
                    id: id,
                    cb: (stateOrder) => {
                        dispatch(updateStateOrders(stateOrder));
                    },
                });
            })
            .catch((reason) => console.error(reason));

        return () => {
            controller.abort();
            handler.unsubscribe("order/stateOrders", id);
        };
    }, []);

    return useSelector((state: RootState) => state.orders);
}
