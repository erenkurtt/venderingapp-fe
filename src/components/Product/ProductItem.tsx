import React, { useState } from 'react';
import { Product, updateProductItem } from '../../reducers/productReducer';
import '../../styles/product.scss';
import { Demand, setDemands } from '../../reducers/demandReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { Process, updateDeposit } from '../../reducers/processReducer';
import { setProduct } from '../../reducers/productReducer';
import { updateDemands, updateProcess, updateProduct } from '../../api/apiCalls';

interface ProdProps {
    product: Product
    demands: Demand[]
}

const ProductItem: React.FunctionComponent<ProdProps> = (props) => {
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const products = useSelector((state: RootState) => state.product.products);
    const supplierMode = useSelector((state: RootState) => state.system.supplierMode);
    const { product, demands } = props;
    const dispatch = useDispatch<AppDispatch>();

    const addToOrder = async () => {
        if (products) {
            const tempProducts = [...products];
            let index = tempProducts.indexOf(product);
            tempProducts[index] = {
                ...tempProducts[index],
                stock: tempProducts[index].stock - 1,
            };

            dispatch(setProduct(tempProducts));
            await updateProduct(product.productId, tempProducts[index]);

            let tempDemandArr = [...demands];
            let tempDemandItem = demands.find((demand) => demand.productId === product.productId);
            if (tempDemandItem) {
                let indexDemand = demands.indexOf(tempDemandItem);
                tempDemandItem = {
                    ...tempDemandItem,
                    count: tempDemandItem.count + 1,
                    price: product.price * (tempDemandItem.count + 1),
                };

                tempDemandArr[indexDemand] = tempDemandItem;

                // tempDemandItem.count += 1;
                // tempDemandItem.price = product.price * tempDemandItem.count;
                tempDemandArr[indexDemand] = tempDemandItem;

                dispatch(setDemands(tempDemandArr));
                await updateDemands(tempDemandItem.demandId, tempDemandItem);
            }
        }
    }

    const updateProdItem = async () => {
        if (products) {
            let tempProduct: Product = {
                ...product,
                stock: stock ? parseInt(stock) : product.stock,
                price: price ? parseFloat(price) : product.price
            }
            dispatch(updateProductItem({ index: products.indexOf(product), item: tempProduct }));
            await updateProduct(product.productId, tempProduct);
        }
    }

    return (
        <div className="productButtonParent">
            <div className="productButton" onClick={() => addToOrder()}>
                <img className="productImg" src={`./${product.productName}.png`} />
            </div>
            <p className="productInfoText">Stock: {product.stock}</p>
            <p className="productInfoText">Price: {product.price}</p>
            {
                supplierMode &&
                <div className='productSettingsMain'>
                    <input className='productItemInput' onChange={(e) => setStock(e.target.value)} placeholder="Set Stock" />
                    <input className='productItemInput' onChange={(e) => setPrice(e.target.value)} placeholder="Set Price" />
                    <button className='productItemInputBtn' onClick={() => updateProdItem()}>Update</button>
                </div>
            }
        </div>
    )
};

export default ProductItem;
