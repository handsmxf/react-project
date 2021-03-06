import Web3 from 'web3';

//window.web3.currentProvider 当前浏览器中metamask自带的web3的provider
const web3 = new Web3(window.web3.currentProvider);


// window.addEventListener('load', async () => {
//   // Modern dapp browsers...
//   if (window.ethereum) {
//     window.web3 = new Web3(ethereum);
//     try {
//       // Request account access if needed
//       await ethereum.enable();
//       // Acccounts now exposed
//       web3.eth.sendTransaction({/* ... */});
//     } catch (error) {
//       // User denied account access...
//     }
//   }
//   // Legacy dapp browsers...
//   else if (window.web3) {
//     window.web3 = new Web3(web3.currentProvider);
//     // Acccounts always exposed
//     web3.eth.sendTransaction({/* ... */});
//   }
//   // Non-dapp browsers...
//   else {
//     console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
//   }
// });

//导出web3 可以让其它文件接收并使用
export default web3;
