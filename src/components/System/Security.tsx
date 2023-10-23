import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import '../../styles/system.scss';
import { FaFan } from "react-icons/fa6";
import { setProtectionMode, setSupplierMode, setTemperature } from '../../reducers/systemReducer';
import { updateSystem } from '../../api/apiCalls';

const Security: React.FunctionComponent = () => {
    const system = useSelector((state: RootState) => state.system.system);
    const supplierMode = useSelector((state: RootState) => state.system.supplierMode);
    const dispatch = useDispatch<AppDispatch>();

    const triggerAlert = () => {
        dispatch(setProtectionMode(true));
    }

    return (
        <div  className="systemMain">
            <div>
                <button className="supplierButton" onClick={() => triggerAlert()} >Insert fake money</button>
                <button className="supplierButton" onClick={() => triggerAlert()} >Temper protection</button>
            </div>
        </div>
    )
};

export default Security;
