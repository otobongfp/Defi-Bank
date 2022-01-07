import React, {Component} from 'react';
import bank from '../bank.png'


class Navbar extends Component {
    render(){
        return(
            <nav className = 'navbar navbar- shadow p-0' style = {{backgroundColor: '#35c565', height: '50px'}}>
                <href className = 'navbar-brand col-sm-3 col-md-2 mr-2' style = {{color: 'white', paddingLeft: '20px'}}>
                    <img src={bank} height={30} width={50} className='d-inline-block align-top' alt ='bank'/>
                    &nbsp; Decentralized Banking App
                </href>
                <ul className='navbar-nav px-3'>
                    <li>
                        <small style = {{color : 'white'}}>
                            Current User Address  :  {this.props.account}
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;