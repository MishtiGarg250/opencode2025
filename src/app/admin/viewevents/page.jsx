'use client'
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { useEffect } from 'react';
import { Image } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react';

import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from 'axios';

var eventData = [];
const deleteHandler = async (eventName) => {
  const token = localStorage.getItem('token');  
  const headers = {
    'Authorization': `Bearer ${token}`,
  }
 await axios.delete(`${process.env.BACKEND_URL}/api/v1/admin/delete/`+eventName, {headers: headers}).
   then(()=> {
    alert("YAY! deleted")
   })
   .catch(error => {
    console.error(error )
   })
}

export default function Viewevents() {

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);


  


  /*THIS WILL HAVE TO BE CHANGED ONCE DATABASE ACCESS IS RECIEVED*/
  useEffect(() => {
   axios.get(`${process.env.BACKEND_URL}/api/v1/events/`).
    then((response) => {
      eventData = response.data;
      console.log(eventData);
      setDataLoaded(true);
    })
    .catch(error=>{
      console.error(error)
    })
  }, []);
  if (!dataLoaded) {
    return <div>Loading...</div>; // or any loading indicator
  }
  if(!eventData){
    return (
      <div>
         <Image src='https://imageio.forbes.com/blogs-images/zarastone/files/2017/05/21Amazon-Barkley-404.jpg?height=711&width=711&fit=bounds' width={500} height={500} alt='no data'></Image>
      </div>
    )
  }
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} >
    {eventData.data.map((item,i)=>
    
    <div style={{paddingTop: 20}} key={i}>
    <div style={{display: "flex", margin: "auto"}}>
    <h1>{i+1}. {item.name}</h1>
    <Image
    boxSize='130px'
    
    src={item.logoImageURL}
    style={{paddingRight: 30}}
    alt='Dan Abramov'

  />
  <Button colorScheme='red' size='sm' onClick={()=>deleteHandler(item.name)}>DELETE EVENT</Button>
  </div>
  <div>
    <p className="text-sm">{item.description}</p>
  </div>
    <div >
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 2,
            itemsToScroll: 2,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {item.coverImagesURL?.map((img,j)=><div style={{ width: 300, height: 325,  }} key={j}>
        <Image
    boxSize='300px'
    
    src={img.url}
    alt='Dan Abramov'
  /><p>Image {j+1}</p></div>
  )}
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        
        
      </ReactSimplyCarousel>
    </div></div>
    )}
    </Box>
  );
}
