import React from 'react'

const Home=({allData})=>{
return(
    allData.map((index=>{
    return <h1>{index.TotalDeaths}</h1>
}))    
)
}
export default Home;
