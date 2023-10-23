import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setProduct } from './reducers/productReducer';
import { RootState, AppDispatch } from './store/store';
import { getDemands, getProcess, getProducts, getSystem } from './api/apiCalls';
import ProductSection from './components/Product/ProductSection';
import Depositure from './components/Depositure/Depositure';
import { setProcess } from './reducers/processReducer';
import { setSystem } from './reducers/systemReducer';
import System from './components/System/System';
import { setDemands } from './reducers/demandReducer';
import DemandSection from './components/Depositure/DemandSection';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const SetProducts = async () => {
      const products = await getProducts();
      dispatch(setProduct(products));
    };

    const SetProcess = async () => {
      const process = await getProcess("12345");
      dispatch(setProcess(process));
    };

    const SetSystem = async () => {
      const system = await getSystem(1);
      dispatch(setSystem(system));
    };

    const setDemandList = async () => {
      const demands = await getDemands();
      dispatch(setDemands(demands));
    };

    SetProducts();
    SetProcess();
    SetSystem();
    setDemandList();
  }, []);

  return (
    <div className="mainScreen">
      <ProductSection />
      <div>
        <System />
        <Depositure />
        <DemandSection />
      </div>
    </div>
  );
}

export default App;
