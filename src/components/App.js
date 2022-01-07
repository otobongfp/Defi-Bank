import React, {Component} from 'react';
import Navbar from './Navbar';
import Main from './Main';
//import './App.css'
import web3 from 'web3';
import Tether from '../contracts/Tether.json';
import RWD from '../contracts/RWD.json';
import DefiBank from '../contracts/DefiBank.json';


class App extends Component{

    async UNSAFE_componentWillMount(){
        await this.loadweb3()
        await this.loadBlockchainData()
    }


    async loadweb3() {
        if(window.ethereum){
            window.web3 = new web3(window.ethereum);
            await window.ethereum.enable()
        }else if(window.web3){
            window.web3 = new web3(window.web3.currentProvider)
        }else{
            window.alert('Metamask no detected try installing it')
        }
    }

    async loadBlockchainData(){
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account : account[0]})
        const networkId = await web3.eth.net.getId();
        console.log(networkId);


        //Load Tether Contract
        const tetherData = Tether.networks[networkId]
        if(tetherData){
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
            this.setState({tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tether : tetherBalance.toString()})
            console.log({balance : tetherBalance})
        }else{
            window.alert('Error Tether Contract not deployed or not detected')
        }


        //Load Reward Token
        const rwdData = RWD.networks[networkId]
        if(rwdData){
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
            this.setState({rwd});
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwd : rwdBalance.toString()})
            console.log({RewardBalance : rwdBalance})
        }else{
            window.alert('Error Reward Contract not deployed or not detected')
        }


        //Load the Defi Bank Contract
        const defiBankData = DefiBank.networks[networkId]
        if(defiBankData){
            const defiBank = new web3.eth.Contract(DefiBank.abi, defiBankData.address);
            this.setState({defiBank});
            let stakingBalance = await defiBank.methods.stakingBalance(this.state.account).call()
            this.setState({defiBank : stakingBalance.toString()})
            console.log({SmartContract : stakingBalance})
        }else{
            window.alert('Error Defi Bank Contract not deployed or not detected')
        }

        this.setState({loading : false});
    }

    constructor(props){
        super(props);
        this.state = {
            account: '0x0000',
            tether: {},
            rwd: {},
            defiBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }

    render() {
        let content
        {this.state.loading ? content = <p id='loader' className='text-center' style={{margin:'30px'}}> ...loading</p> : content = <Main/>}
        return(
            <div>
                <Navbar account = {this.state.account}/>
                <div>
                    {/* <h1></h1> */}
                    <div className='container-fluid mt-5'>
                        <div className='row'>
                            <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth: '600px', minHeight: '100vm'}}>
                                <div className='text-center'>
                                    {content}
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>      
        )
    }

}

export default App