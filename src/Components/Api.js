import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import { Container } from 'react-bootstrap';
import  {GlobalState}  from '../Context/UserContext';
import Cards from "../Layout/Cards"



 function Api() {
     

    const [details,setDetails]=useState([]);
  
    
        const fetchDetails=async()=>{
            const response=await Axios.get('https://covid.mathdro.id/api');
        const {data}=response
     setDetails(data)   
        }

       

        useEffect(()=>{
        
        fetchDetails();
        


    },)

     const countries=async()=>{
        try {
            const {data:{ countries }}=await Axios.get(`https://covid.mathdro.id/api/countries`)
            console.log(countries);
            return countries.map((country)=>country.name);
        } catch (error) {
            console.log(error);
        }
    }
    

    return(
        <Container fluid>
        <GlobalState.Provider value={details}>
        
<Cards countries={countries}/>
        </GlobalState.Provider>
        </Container>
    )


    
}

export default Api;
