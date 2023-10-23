import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setProcess } from '../../reducers/processReducer';
import '../../styles/depositure.scss';
import { updateDemands, updateProcess, updateProduct, updateSystem } from '../../api/apiCalls';
import { Demand, setDemands } from '../../reducers/demandReducer';
import { setProduct } from '../../reducers/productReducer';
import { setSystem } from '../../reducers/systemReducer';


const ConrolPayment: React.FunctionComponent = () => {

    const [isFinish, setIsFinish] = useState(false);
    const [change, setChange] = useState(0);
    const process = useSelector((state: RootState) => state.process.process);
    const demands = useSelector((state: RootState) => state.demands.demands);
    const products = useSelector((state: RootState) => state.product.products);
    const system = useSelector((state: RootState) => state.system.system);

    const dispatch = useDispatch<AppDispatch>();

    const finishPayment = () => {
        if (process && demands) {
            if (process?.payment >= demands.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)) {
                setIsFinish(true);
                setChange(process?.payment - demands.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0))
            }
        }
    }

    const cancelPayment = async () => {
        if (demands && products && process) {
            let tempProducts = [...products];
            let tempDemands = [...demands];
            let lastDemand: Demand[] = [];
            tempDemands.forEach(async (demand) => {
                let productItem = products.find((prod) => prod.productId === demand.productId);
                let productIndex = products.findIndex((prod) => prod.productId === demand.productId);
                if (productItem) {
                    productItem = {
                        ...productItem,
                        stock: productItem?.stock + demand.count
                    };
                    tempProducts[productIndex] = productItem;
                    await updateProduct(productItem.productId, productItem);
                    let tempDemand: Demand = {
                        id: demand.id,
                        demandId: demand.demandId,
                        productId: demand.productId,
                        count: 0,
                        price: 0,
                    }
                    lastDemand.push(tempDemand);
                    await updateDemands(demand.demandId, tempDemand);
                }
            });

            let tempprocess = { ...process };
            tempprocess.payment = 0;
            await updateProcess(tempprocess.processId, tempprocess);
            dispatch(setProcess(tempprocess));
            dispatch(setDemands(lastDemand));
            dispatch(setProduct(tempProducts));
        }
    }

    const closePayment = async () => {
        if (demands && products && process && system) {
            let tempDemands = [...demands];
            let lastDemand: Demand[] = [];
            tempDemands.forEach(async (demand) => {
                let tempDemand: Demand = {
                    id: demand.id,
                    demandId: demand.demandId,
                    productId: demand.productId,
                    count: 0,
                    price: 0,
                }
                lastDemand.push(tempDemand);
                await updateDemands(demand.demandId, tempDemand);
            });

            let tempprocess = { ...process };
            let tempSystem = {...system};
            tempprocess.payment = 0;
            tempSystem.balance = tempSystem.balance + process.payment - change;
            await updateProcess(tempprocess.processId, tempprocess);
            await updateSystem(tempSystem.systemId, tempSystem);
            dispatch(setSystem(tempSystem));
            dispatch(setProcess(tempprocess));
            dispatch(setDemands(lastDemand));
        }
    }

    return (
        <div>
            <div>
                <button className='paymentButtons' onClick={() => finishPayment()}>Finish payment</button>
                <button className='paymentButtons' onClick={() => cancelPayment()}>Cancel and Get refund</button>
                {
                    isFinish &&
                    <div>
                        <div>Change: {change}</div>
                        <button className='paymentButtons' onClick={() => closePayment()}>Get Remaining charge and Close</button>
                    </div>
                }
            </div>
        </div>
    )
};

export default ConrolPayment;
