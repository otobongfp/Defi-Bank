import React, {Component} from 'react';
import tether from '../tether.png'


class Main extends Component {
    render(){
        return(
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead >
                    <tr style={{color:'#35c565'}}>
                        <th scope='col'>Staking Balance</th>
                        <th scope='col'>Reward Balance</th>
                    </tr>
                    </thead>

                    <tbody>
                        <tr style={{color:'#35c565'}}>
                            <td>USDT</td>
                            <td>RWD</td>
                        </tr>
                    </tbody>
                </table>

                <div className='card mb-2' style={{opacity:'0.9'}}>
                    <form className='mb-3'>
                        <div style={{borderSpacing:'0 1em'}}>
                            <label className='float-left mt-3' style={{marginLeft : '20px' }}><b>Stake Tokens</b></label>
                            <span className='float-right' style={{marginRight : '50px', marginLeft:'300px'}}>Balance: </span>
                            <div className='input-group mb-4'>
                                <input type='text' placeholder='0' style={{marginLeft: '5px',color:'#35c565'}} required/>
                                <div className='input-group-open'>
                                    <div className='input-group-text'>
                                        <img alt='tether' src={tether} height='30px'/>
                                        &nbsp; &nbsp; USDT
                                    </div>
                                </div>
                            </div>
                                <button type='submit' className='btn btn-lg btn-block' style={{backgroundColor:'#35c565', color:'white'}}>DEPOSIT</button>
                        </div>
                    </form>
                    <button className='btn btn-lg btn-block' style={{backgroundColor:'#35c565', color:'white'}}>WITHDRAW</button>

                    <div className='card-body text-center' style={{color: '#35c565'}}>
                        Airdrop
                    </div>

                </div>

            </div>
        )
    }
}

export default Main;