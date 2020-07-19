import React,{useContext,useState,useEffect} from 'react'
import { Container,Row,Col } from 'reactstrap'
import {Card} from "react-bootstrap"
import { Doughnut, Bar } from 'react-chartjs-2';
import {GlobalState} from "../Context/UserContext";
import CountUp from 'react-countup';
import Axios from "axios"
import {Form} from "react-bootstrap"

import { NativeSelect, FormControl  } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Cards({countries}) {
   const info=useContext(GlobalState);

   const [cases,setCase]=useState(info)
   
   
   const {lastUpdate}=info;
   

   const date=Date(lastUpdate).slice(0,24);

   const [fetched,SetFetched]=useState([]);
    useEffect(()=>{
        const fetchCountries=async ()=>{
            SetFetched(await countries());
        }
        fetchCountries();
      },[SetFetched])

    const  fetchData=async (country)=>{ 
      
      
      if(country==='global'){
        setCase(info);
        console.log('global')
      }else{
                let changebleURL=`https://covid.mathdro.id/api/countries/${country}`;
  
            const res= await Axios.get(changebleURL);
            const data=res.data; 
            console.log(data)
            setCase(data);

         

      }    
             
        
    }

   const handleCountryChange=async(country)=>{
     fetchData(country);
     
   }

   var  Confirmed=(cases.confirmed || 0);
   var TotalCases=(Confirmed.value || 0);
   
   
   var Deaths=(cases.deaths || 0);
   var totalDeaths=(Deaths.value || 0);
   
   var recovered=(cases.recovered || 0);
   var Recovered=(recovered.value || 0);

    return (
        <div>
        <Container>
        <Row>
        <Col xs={8}>
        <FormControl className='formcontrol' >
        <NativeSelect defaultValue="" onClick={(e)=>{  
            if(e.target.value.length >4){ handleCountryChange(e.target.value)  }
              }} >
        <option value='global' >World-Wide-cases</option>
        {fetched.map((country,i)=>
            <option key={i} value={country} >{country}</option>
            )}
        </NativeSelect>
        </FormControl>
        </Col>
        </Row>
        <Row>
        <h1 className="align-center">Showing Cases of </h1>
        </Row>
        
        
        
        <Row>
        <Col md="auto">
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title><h1>Total Cases</h1></Card.Title>
    <Card.Subtitle className="mb-2 text-muted">as of {date}</Card.Subtitle>
    <Card.Text>
    <h1><CountUp start={0} end={TotalCases} separator="," duration={2}/></h1> 
    </Card.Text>
    
  </Card.Body>
</Card>
        
        </Col>
        <Col md="auto">
        
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title><h1>Total Death</h1></Card.Title>
    <Card.Subtitle className="mb-2 text-muted">as of {date}</Card.Subtitle>
    <Card.Text>
    <h1><CountUp start={0} end={totalDeaths} separator="," duration={2}/></h1>
    </Card.Text>
  
  </Card.Body>
</Card>

        </Col>
        <Col md="auto">
        
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title><h1> Recovered</h1></Card.Title>
    <Card.Subtitle className="mb-2 text-muted">As of {date}</Card.Subtitle>
    <Card.Text>
    <h1><CountUp start={0} end={Recovered} separator="," duration={2}/></h1>
    </Card.Text>
  </Card.Body>
</Card>

        </Col>
      </Row>{'      '}
      <Row>
      <Col>
      <Bar 
      data={{
      labels:['Infected','Recovered','Deaths'],
      datasets:[{
          label:'People',
          backgroundColor:['#0A3D62','#218F76','#FF3E4D'],
          data:[TotalCases,Recovered,totalDeaths]
      }]
      }}
      options={{
          legend:{display : false},
          title:{display:true,text:`WorldWide data `}
      }} separator=","
      />
      </Col>

      <Col>
      <Doughnut data={{
        labels:['Infected','Recovered','Deaths'],
        datasets:[{
            label:'People',
            backgroundColor:['#EA7773','#26ae60','#E71C23'],
            data:[TotalCases,Recovered,totalDeaths]
        }]
        }} 
        options={{
          legend:{display : false},
          title:{display:true,text:`WorldWide data `}
      }}
        /></Col>
        </Row>
      </Container>
        </div>
    )
}
