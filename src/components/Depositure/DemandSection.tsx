import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import '../../styles/demand.scss';
import { updateDemands, updateProduct } from '../../api/apiCalls';
import { Demand, setDemands } from '../../reducers/demandReducer';
import { setProduct } from '../../reducers/productReducer';
import ConrolPayment from './ControlPayment';


const DemandSection: React.FunctionComponent = () => {
    const demands = useSelector((state: RootState) => state.demands.demands);
    const products = useSelector((state: RootState) => state.product.products);
    const dispatch = useDispatch<AppDispatch>();
 
    const operateDemandItem = async (demand: Demand, operation: string) => {
        if(demands && products) {
            let tempDemands = [...demands];
            let tempProducts = [...products];

            const index = tempDemands.indexOf(demand);
            let tempDemandItem = tempDemands[index];

            let productItem = products.find((prod) => prod.productId === demand.productId);
            const productIndex = products.findIndex((prod) => prod.productId === demand.productId);

            if(productItem) {
                tempDemandItem = {
                    ...tempDemandItem,
                    count: operation === "decrease" ? tempDemandItem.count - 1 : tempDemandItem.count + 1 ,
                    price: productItem.price * (operation === "decrease" ? tempDemandItem.count - 1 : tempDemandItem.count + 1),
                };

                productItem = {
                    ...productItem,
                    stock: operation === "increase" ? productItem.stock - 1 : productItem.stock + 1
                };

                tempDemands[index] = tempDemandItem;
                tempProducts[productIndex] = productItem;

                dispatch(setDemands(tempDemands));
                dispatch(setProduct(tempProducts))
                await updateDemands(demand.demandId, tempDemandItem);
                await updateProduct(productItem.productId, productItem);
            }
        }

    }

    return (
        <div className='demandSectionMain'>
            {products &&
                demands &&
                demands.map((demand) => (
                    demand.count > 0 &&
                    <div key={demand.productId}>
                        {products.find((product) => product.productId === demand.productId) ? (
                            <div className="demandItemMain">
                                <div className='demandItem'>{products.find((product) => product.productId === demand.productId)!.productName}</div>
                                <div className='demandItem'>
                                    <button onClick={() => operateDemandItem(demand, "decrease")}>-</button>
                                    <span>{demand.count}</span>
                                    <button onClick={() => operateDemandItem(demand, "increase")}>+</button>
                                </div>
                                <div className='demandItem'>{demand.price}</div>
                            </div>
                        ) : (
                            <div>Product not found</div>
                        )}
                    </div>
                ))}
            {
                demands && demands.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0) > 0 &&
                <div>
                    <div className='totalSection'>Total: {demands.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)}</div>
                    <ConrolPayment />
                </div>
            }
        </div>
    )
};

export default DemandSection;
