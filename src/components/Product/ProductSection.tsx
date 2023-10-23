import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import ProductItem from './ProductItem';
import '../../styles/product.scss';
import { System, setSystem } from '../../reducers/systemReducer';
import { updateSystem } from '../../api/apiCalls';


const ProductSection: React.FunctionComponent = () => {
    const [checkBalance, setCheckBalance] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector((state: RootState) => state.product.products);
    const demands = useSelector((state: RootState) => state.demands.demands);
    const system = useSelector((state: RootState) => state.system.system);
    const supplierMode = useSelector((state: RootState) => state.system.supplierMode);

    const approveBalance = async () => {
        if (system) {
            let tempSystem: System = {
                ...system,
                balance: checkBalance ? parseInt(checkBalance) : system.balance,
            }
            dispatch(setSystem(tempSystem));
            await updateSystem(system.systemId, tempSystem);
        }
    }

    return (
        <div>
            <div className="productItem">
                {
                    demands && products && products.map((product) => <ProductItem product={product} demands={demands} />)
                }
            </div>
            {
                supplierMode &&
                <div className='productItem'>
                    <div>Balance: {system?.balance}</div>
                    <div>
                        <input onChange={(e) => setCheckBalance(e.target.value)} placeholder='Set Balance' />
                        <button onClick={() => approveBalance()}>Approve</button>
                    </div>
                    <div>
                        <button onClick={() => window.location.reload()} >Reset Machine</button>
                    </div>
                </div>
            }
        </div>
    )
};

export default ProductSection;
