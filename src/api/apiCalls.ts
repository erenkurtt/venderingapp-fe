import axios from "axios";
import { Product } from "../reducers/productReducer";
import { Process } from "../reducers/processReducer";
import { System } from "../reducers/systemReducer";
import { Demand } from "../reducers/demandReducer";

const apiUrl:string = "http://localhost:8080";

//GET REQUESTS

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(apiUrl + "/products");
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        return response.data as Product[];
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const getProcess = async (processId: string): Promise<Process> => {
    try {
        const response = await axios.get(apiUrl + "/processes/" + processId);
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        return response.data as Process;
      } catch (error) {
        console.error('Error fetching process:', error);
        throw error;
    }
}

export const getSystem = async (systemId: number): Promise<System> => {
    try {
        const response = await axios.get(apiUrl + "/system/" + systemId);
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        return response.data as System;
      } catch (error) {
        console.error('Error fetching system:', error);
        throw error;
    }
}

export const getDemands = async (): Promise<Demand[]> => {
    try {
        const response = await axios.get(apiUrl + "/demands");
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        return response.data as Demand[];
      } catch (error) {
        console.error('Error fetching system:', error);
        throw error;
    }
}

//PUT METHODS

export const updateProduct = async (productId: number, data: Product) => {
    try {
        const response = await axios.put(apiUrl + "/products/" + productId, data);
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error update product:', error);
        throw error;
    }
}

export const updateSystem = async (systemId: number, data: System) => {
    try {
        const response = await axios.put(apiUrl + "/system/" + systemId, data);
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error update product:', error);
        throw error;
    }
}

export const updateProcess = async (processId: String, data: Process) => {
    try {
        const response = await axios.put(apiUrl + "/processes/" + processId, data);
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error update product:', error);
        throw error;
    }
}

export const updateDemands = async (demandId: String, data: Demand) => {
    try {
        const response = await axios.put(apiUrl + "/demands/" + demandId, data);
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching system:', error);
        throw error;
    }
}