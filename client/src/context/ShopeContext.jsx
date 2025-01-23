import { createContext } from "react";
import products from "../assets/assets";

export const ShopeContext = createContext();


const ShopeContextProvider =(props)=>{

    const currency = '$';
    const delivery_fee =10;



    const value ={
        products,currency,delivery_fee
    }

    return(
        <ShopeContext.Provider value={value}>
            {props.children}
        </ShopeContext.Provider>
    )
}

export default ShopeContextProvider;