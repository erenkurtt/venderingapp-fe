import  React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { updateDeposit} from '../../reducers/processReducer';
import '../../styles/depositure.scss';
import { updateProcess } from '../../api/apiCalls';


const Depositure: React.FunctionComponent = () => {
    const process = useSelector((state: RootState) => state.process.process);
    const moneyUnits = [1, 5, 10, 20];
    const dispatch = useDispatch<AppDispatch>();

    const addDeposit = useCallback(async (value: number) => {
        if(process) {
            dispatch(updateDeposit(value + process.payment));
            const tempProcess = { ...process };
            tempProcess.payment += value;
            await updateProcess("12345", tempProcess);
        }
    }, [process]);

    return (
        <div className='depositMain'>
            <div className='depositCount'>{process?.payment}</div>
            <div className='buttonParent'>
                {
                    moneyUnits.map((value, i) =>
                        <button onClick={() => addDeposit(value)} className="moneyButtons" key={i}>{value}</button>)
                }
            </div>
        </div>
    )
};

export default Depositure;
