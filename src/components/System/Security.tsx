import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import '../../styles/system.scss';
import { setProtectionMode } from '../../reducers/systemReducer';

const Security: React.FunctionComponent = () => {
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
