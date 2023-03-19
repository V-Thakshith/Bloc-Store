import Upload from './artifacts/contracts/Lock.sol/Upload.json'
import { useState,useEffect } from 'react';
import {ethers} from 'ethers'
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';


function App() {
  const [account,setAccount]=useState('')
  const [contract,setContract]=useState(null)
  const [provider,setProvider]=useState(null)
  const [modalOpen,setModalOpen]=useState(false)

  useEffect(()=>{
    const provider= new ethers.providers.Web3Provider(window.ethereum)

    const loadProvider=async()=>{
      if(provider){
        window.ethereum.on("chainChanged",()=>{
          window.location.reload()
        })
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        })
        await provider.send("eth_requestAccounts",[])
        const signer=provider.getSigner();
        const address=await signer.getAddress();
        setAccount(address)
        let contractAddress='0x5FbDB2315678afecb367f032d93F642f64180aa3'

        const contract=new ethers.Contract(
          contractAddress,Upload.abi,signer
        )
        setContract(contract)
        setProvider(provider)
      }else{
        alert("Metamask is not installed")
      }
    };
    provider && loadProvider()
  },[])

  return (
    <>
    <>
    <div className='mt-5 ml-5 mb-5 h-screen'>
    <div>
    {!modalOpen && (
      <button
        className='share'
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <div className='bg-primary text-white rounded-lg flex justify-center align-middle p-3 justify-items-center m-2 top-0 left-0'>
          <h3>Share</h3>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 m-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
            />
          </svg>
        </div>
      </button>
    )}
    {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract}></Modal>}
      <div className='flex flex-col content-center'>
        <h1 className='text-7xl text-center m-3 font-bold text-textPrimary'>Bloc-store</h1>
        <h2 className='text-textPrimary text-xl text-center m-3 font-bold'>
          Account-ID: {account ? account : 'Not connected'}
        </h2>
      </div>

    </div>
  <div className='flex mt-32'>
    
    <div className='flex flex-col mx-auto justify-center align-middle'>
      <div>
        <div className='flex flex-col justify-center items-center'>
          <div>
            <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
          </div>
          <div>
            <Display account={account} contract={contract}></Display>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</>;

    </>
  );
}

export default App;
