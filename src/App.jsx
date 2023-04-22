import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";
import pabi from "./utils/Posts.json";
const { create } = require("ipfs-http-client");
const IPFS = require('ipfs-http-client');



const INFURA_ID="2OlttyWcK3E662DcYQQmwpVDmP0";
const INFURA_SECRET_KEY="dbba813dd2a780c2fc8171b10ead99fa"
// const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
const auth = 'Basic ' + btoa(INFURA_ID + ':' + INFURA_SECRET_KEY);
const ipfs = IPFS.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }});
 
  const saveText = async () => {
    try {
      // let ipfs = await ipfsClient();
      let result = await ipfs.add(`welcome ${new Date()}`);
      console.log(result,"tesst");
    } catch (error) {
      console.error('Failed to save text:', error);
    }
  };

  saveText();


console.log("here")
// console.log(ipfs.add(`test`));


const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0x343610D353a0B2Ba86dDAAa348BF62B732107284";

  const contractABI = abi.abi;

  var waveTotal;

  const PostcontractAddress = "0x9F634FDd52a055896276825337445D809640dB3B";

  const PostcontractABI = pabi.abi;

  var waveTotals;


  

  

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }


  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        waveTotal = count.toNumber();
        console.log(waveTotal);
        document.getElementById("myText").innerHTML = waveTotal;
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }





  const Post = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log("here")
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const PostContract = new ethers.Contract(PostcontractAddress, PostcontractABI, signer);
        console.log(PostContract.createPost("QmTmTujFF3PS3wUyNvU6naiU6eTvU6B4GZJ4Q4azJSHT89", "This is a test post", "Original"));
        
        // Example usage


        // let count = await wavePortalContract.getTotalWaves();
        // console.log("Retrieved total wave count...", count.toNumber());

        // const waveTxn = await wavePortalContract.wave();
        // console.log("Mining...", waveTxn.hash);

        // await waveTxn.wait();
        // console.log("Mined -- ", waveTxn.hash);

        // count = await wavePortalContract.getTotalWaves();
        // waveTotal = count.toNumber();
        // console.log(waveTotal);
        // document.getElementById("myText").innerHTML = waveTotal;
        // console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }











  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          Connect your wallet, and wave at Gnosis Chain!
        </div>
        <div className="bio">
          Wave at least once, to see how many times you have waved!
        </div>
        <div className="header"><span id="myText"></span></div>
        {!currentAccount && ( <button className="waveButton" onClick={Post}>
          Wave at Gnosis Chain!
        </button>)}

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App