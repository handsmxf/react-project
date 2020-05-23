import React from 'react';
import logo from './logo.svg';
import './App.css';
import bg from './react.jpg';
//接收web3.js导出的web3
import web3 from './web3';
//导入合约实例
import lottry from './lottry';

class App extends React.Component {



  state = {
    manager : '',
    players : [],
    balance : '',
    value : ''
  }

  //react生命周期函数，一般在render函数之后执行
  async componentDidMount(){
    //获取管理者地址后，把地址赋值给state的managerAddress
    const manager = await lottry.methods.manager().call();
    const players = await lottry.methods.getPlayers().call();
    //获取账户金额，通过合约地址获取
    const balance = await web3.eth.getBalance(lottry.options.address);
    this.setState({manager, players, balance});

  }

  onSubmit = async event =>{
    event.preventDefault();
    const balance = document.getElementById('balance');
    const message = document.getElementById('message');
    if(balance.value == ''){
      message.style.color = 'red';
      this.setState({message:'投注金额不能为空！'});
    } else {
      if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(balance.value)){
        const accounts = await web3.eth.getAccounts();
        message.style.color = 'white';
        this.setState({message:'等待交易完成...'});
        // console.log(accounts[0]);
        // console.log(this.state.value);
        // console.log(web3.utils.toWei(this.state.value,'ether'));
        await lottry.methods.enter().send({from:accounts[0],value:web3.utils.toWei(this.state.value,'ether')});

        this.setState({message:'恭喜您，投注成功!'});
        window.location.reload();
      } else {
        message.style.color = 'red';
        this.setState({message:'请输入正确的数字！'});
      }
    }
  }

  onClick = async ()=>{
    const accounts = await web3.eth.getAccounts();
    this.setState({message:'等待博弈结果...'});
    await lottry.methods.pickwiner().send({from:accounts[0]});
    this.setState({message:'博弈完成~'});
  }

  render() {
    // console.log(lottry.methods);
    return (
      // <div>
      //   <p>this managerAddress is : {this.state.manager}</p>
      //   <p>this players number is :{this.state.players.length}</p>
      //   <p> this balance is : {web3.utils.fromWei(this.state.balance,'ether')} 位</p>
      //   <hr />
      //
      //   <form onSubmit={this.onSubmit}>
      //     <h3>博彩项目</h3>
      //     <div>
      //       <label>投注：</label>
      //       <input
      //         class='btn btn-submit'
      //         value={this.state.value}
      //         onChange={event=>{this.setState({value:event.target.value})}}
      //       />
      //     </div>
      //     <button>立即投注</button>
      //   </form>
      //   <hr />
      //   <h3>博弈结果</h3>
      //   <button onClick={this.onClick}>开始博弈</button>
      // </div>

      <div id='wrap'>
      	<h1>My first react project</h1>
      	<div id='sidebar'>
      		<ul>
      			<li><span>荷官地址：</span> <span>{this.state.manager}</span></li>
      			<li><span>玩家数量：</span> <span>{this.state.players.length}</span></li>
      			<li><span>奖池金额：</span> <span>{web3.utils.fromWei(this.state.balance,'ether')} 位</span></li>
            <li></li>
      		</ul>
          <p><img src={bg} width="300" height="300" alt="" /></p>
      	</div>

      	<div id="content">
      		<form id="contactform" onSubmit={this.onSubmit} >
      		<p><label>请下注：</label>
      			<input
              type="text"
              id='balance'
              value={this.state.value}
              onChange={event=>{this.setState({value:event.target.value})}}
              />
          </p>
      		<p>
            <button>立即投注</button>
          </p>
      		</form>
          <ul>
            <li id='message'>{this.state.message}</li>
          </ul>
          <button id='start' onClick={this.onClick}>开始博弈</button>
      	</div>
      </div>
    );
  }
}

export default App;
