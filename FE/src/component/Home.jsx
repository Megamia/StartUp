import React, { useState, useEffect } from 'react';
import  axios  from 'axios';

const Home = () => {

    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/fullData`);
                console.log(response.data.data);
                if(response.status===200){
                    setData(response.data.data);
                }else{
                    console.log("Lỗi");
                }
            } catch (e) {
                console.log("Error: ",e);
            }
        }
        fetchData()
    }, []);
    return ( 
        <div className='flex'>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div className='flex flex-col'>
                        <span key={index}>Tên: {item.name}</span>  
                        <span key={index}>Nhập: {item.purchase}</span>  
                        <span key={index}>Xuất: {item.selling}</span>  
                        <span key={index}>Lãi: {item.profit}</span>  
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
     );
}
 
export default Home;