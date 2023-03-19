
import { useState,useEffect } from 'react';

const Display=({contract,account})=>{
    const [data,setData]=useState('')
    const getData=async()=>{
        let dataArray;
        const Otheraddress=document.querySelector('.address').value;
        console.log(Otheraddress)
        try{
            if(Otheraddress){
                dataArray=await contract.display(Otheraddress)
                console.log(dataArray)
            }else{
                dataArray=await contract.display(account)
            }
        }
        catch(e){
            alert("You don't have access")
        }
        const isEmpty=Object.keys(dataArray).length===0;
        if(!isEmpty){
            const str=dataArray.toString();
            const str_array=str.split(',')
            const images = str_array.map((item, i) => {
                return (
                  <a href={item} key={i} target="_blank">
                    <img
                      key={i}
                      src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                      alt="new"
                      className="image-list aspect-square object-cover"
                    ></img>
                  </a>
                );
              });
            setData(images)
        }else{
            alert('empty')
        }
    }

    return(
        <>
        <div className='flex flex-col items-center justify-center'>
        <div className='image-list mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6' >{data}</div>
        <input type='text' placeholder='Enter address' className='address w-96 text-center border-solid border-gray-800 border-2
         h-8 rounded-xl m-4'></input>
         
        <button className='center button w-32 bg-primary text-white rounded-lg flex justify-center align-middle p-2 justify-items-center' onClick={getData}>
            Get Data
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
</svg>

            </button>
        </div>
        
        </>
    )
}

export default Display
