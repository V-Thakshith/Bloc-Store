import axios from 'axios'
import { useState } from 'react'


const FileUpload=({contract,account,provider})=>{
    const [file,setFile]=useState(null)
    const [fileName,setFileName]=useState('NO image selected')
    const handleSubmit=async(e)=>{
         e.preventDefault()
         if(file){
            try{
                const formData=new FormData()
                formData.append("file",file)

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                      pinata_api_key: `9a4efe9a66745c06131e`,
                      pinata_secret_api_key: `96f85a65a2dba7a825a6846bfc6dfc0e719a6543e7b3cff653ab5de7c7a18600`,
                      "Content-Type": "multipart/form-data",
                    },
                  });
                  const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                  const signer=contract.connect(provider.getSigner())
                  await signer.add(account,ImgHash)
                  alert('Successfully image uploaded')
                  setFileName("No image selected")
                  setFile(null)

            }catch(e){
                alert('Unable to upload to pinata')
            }
         }
    }

    const retrieveFile=(e)=>{
        const data=e.target.files[0]
        console.log(data)
        const reader=new window.FileReader();
        reader.readAsArrayBuffer(data)
        reader.onloadend=()=>{
            setFile(e.target.files[0])
        }
        setFileName(e.target.files[0].name)
        e.preventDefault()
    }

    return(
        <div>
            <form className='form flex flex-col items-center ' onSubmit={handleSubmit}>
                
                <label htmlFor='file-upload' className='bg-primary text-white rounded-lg flex justify-center align-middle p-2 justify-items-center m-2'>
                    Choose Image
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 m-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

                </label>
                <input disabled={!account} type='file' id="file-upload" name='data' onChange={retrieveFile} className='hidden'></input>
                <span className='text-white text-xl text-center m-1'>Image-name: {fileName}</span>
               <button type='submit' className='bg-primary text-white rounded-lg flex justify-center align-middle p-2 justify-items-center m-3 ' disabled={!file}>Upload File
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
</svg>
               </button>
                
            </form>
        </div>
    )
    
}

export default FileUpload
