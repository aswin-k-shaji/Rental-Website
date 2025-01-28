import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopeContext = createContext();


const ShopeContextProvider =(props)=>{

    const currency = '₹';
    const delivery_fee =10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const [cartItems, setcartItems] =useState({})
    const [products, setProducts] =useState([])
    const [token,setToken]=useState('')
    const navigate=useNavigate()



 
    const addToCart = async(itemId)=>{

        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId]) {
                cartData[itemId] +=1
            }
            else{
                cartData[itemId]=1
            }
            
        }
        else{
            cartData[itemId] ={}
            cartData[itemId] =1
        }
        setcartItems(cartData);
    
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
          try {
            if (cartItems[item] > 0) {
              totalCount += cartItems[item];
            }
          } catch (error) {
            console.error('Error processing item:', item, error);
          }
        }
        return totalCount;
      }

      const updateQuantity=async(itemId,Quantity)=>{
        let cartData = structuredClone(cartItems)

        cartData[itemId]=Quantity

        setcartItems(cartData )
      }



      const getCartAmount =()=>{
        let totalAmount = 0
        for(const items in cartItems){
          let itemInfo =products.find((product)=>product._id === items);
            try {
              if (cartItems[items]>0) {
                totalAmount += itemInfo.pricePerDay*cartItems[items]
              }
            } catch (error) {
              
            }
        }
        return totalAmount;
      }

      const getProductsData = async()=>{
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
              console.log(response.data.items)
              setProducts(response.data.items)
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }

      useEffect(()=>{
        getProductsData()
      },[])

      
      

    const value ={
        products,currency,delivery_fee,
        search , setSearch ,showSearch ,setShowSearch,
        cartItems,addToCart,getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,token,setToken
    }

    return(
        <ShopeContext.Provider value={value}>
            {props.children}
        </ShopeContext.Provider>
    )
}

export default ShopeContextProvider;