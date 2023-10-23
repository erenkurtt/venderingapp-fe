import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import '../../styles/system.scss';
import { FaFan } from "react-icons/fa6";
import { setSupplierMode, setTemperature } from '../../reducers/systemReducer';
import { updateSystem } from '../../api/apiCalls';

const System: React.FunctionComponent = () => {
    const [isCooling, setIsCooling] = useState(false);
    const [increase, setIncrease] = useState(1);
    const system = useSelector((state: RootState) => state.system.system);
    const supplierMode = useSelector((state: RootState) => state.system.supplierMode);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() =>{
        const temperInterval = setInterval(() => {
            if(system) {
                let tempSystem = {...system};
                if(tempSystem.temperature === 3) {
                    setIncrease(1);
                    setIsCooling(false);
                } 
                if(tempSystem.temperature === 7) {
                    setIncrease(-1);
                    setIsCooling(true);
                }
                tempSystem.temperature += increase;
                dispatch(setTemperature(tempSystem?.temperature));
                updateSystem(system.systemId, tempSystem);
            }
        }, 4000);

        return () => clearInterval(temperInterval);
    }, [system]);

    return (
        <div  className="systemMain">
            <div>
                <button onClick={() => dispatch(setSupplierMode(!supplierMode))} className="supplierButton">Supplier Mod</button>
            </div>
            <div className="systemTemperature">
                <div className={`${isCooling && 'spin'}`}>
                    <FaFan />
                </div>
                <h1 className="tempValue">{system?.temperature} <span className="degreeSymbol">o</span> <span className='calcSymbol'>C</span></h1>
            </div>
        </div>
    )
};

export default System;
