const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require("./compiles");

const provider = new HDWalletProvider(
  //matamask助记词
  'dose wonder swallow medal famous apology tuna short quick choice magnet danger',
  //infura服务网址，这里选择ropsten
  'https://ropsten.infura.io/v3/70344c0d22294e0cbbfc488b3cd2da0b'
);

const web3 = new Web3(provider);

const deploy = async ()=>{
  const accounts = await web3.eth.getAccounts();
  // console.log('try get deploy account: ' + accounts[0]);
  // console.log("==bytecode=="+bytecode);
   console.log(interface);
  //const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:'0x'+bytecode,arguments:['peter']}).send({from:accounts[0],gas:'1000000'});
  const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:'0x'+bytecode}).send({from:accounts[0],gas:'1000000'});
  console.log(result.options.address);
}

deploy();
