import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import '../../styles/system.scss';
import { FaFan } from "react-icons/fa6";
import { setSupplierMode } from '../../reducers/systemReducer';

const System: React.FunctionComponent = () => {
    const system = useSelector((state: RootState) => state.system.system);
    const supplierMode = useSelector((state: RootState) => state.system.supplierMode);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div  className="systemMain">
            <div>
                <button onClick={() => dispatch(setSupplierMode(!supplierMode))} className="supplierButton">Supplier Mod</button>
            </div>
            <div className="systemTemperature">
                <FaFan />
                <h1 className="tempValue">{system?.temperature} <span className="degreeSymbol">o</span> <span className='calcSymbol'>C</span></h1>
            </div>
        </div>
    )
};

export default System;
