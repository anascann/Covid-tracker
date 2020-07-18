import React,{useContext,useState,useEffect} from 'react'
import { Container,Row,Col } from 'reactstrap'
import {Card} from "react-bootstrap"
import { Doughnut, Bar } from 'react-chartjs-2';
import {GlobalState} from "../Context/UserContext";
import CountUp from 'react-countup';
import {Form} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Cards({countries}) {
    const info=useContext(GlobalState);
    console.log(info)
    const  Confirmed=(info.confirmed || 0);
    const TotalCases=(Confirmed.value || 0);
   

    const Deaths=(info.deaths || 0);
   const totalDeaths=(Deaths.value || 0);

    const recovered=(info.recovered || 0);
   const Recovered=(recovered.value || 0);

   const {lastUpdate}=info;
   console.log(lastUpdate)

   const date=Date(lastUpdate).slice(0,24);

   const [fetched,SetFetched]=useState([]);
    useEffect(()=>{
        const fetchCountries=async ()=>{
            SetFetched(await countries());
        }
        fetchCountries();
      },[SetFetched])

   




   

   {/*const metaData={totalCase: info.confirmed.value,
    totalDeath: info.deaths.value,
   Recovered: info.recovered.value}*/}

  

   

        
    
    
    
    return (
        <div>
        <Container>
        <Row>
        <Col xs={8}>
        <Form.Group>
  <Form.Control as="select" size="lg">
  <option value='global' >World-Wide-cases</option>
  {fetched.map((country,i)=>
      <option key={i} value={country} >{country}</option>
      )}
  </Form.Control>
  </Form.Group>
        </Col>
        </Row>
        <Row>
        <h1 className="align-center">Showing Cases Globally</h1>
        </Row>
        
        
        
        <Row>
        <Col md="auto">
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title><h1>Total Cases</h1></Card.Title>
    <Card.Subtitle className="mb-2 text-muted">as of {date}</Card.Subtitle>
    <Card.Text>
    <h1><CountUp start={0} end={TotalCases} separator="," duration={4}/></h1> 
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
    <h1><CountUp start={0} end={totalDeaths} separator="," duration={4}/></h1>
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
    <h1><CountUp start={0} end={Recovered} separator="," duration={4}/></h1>
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
