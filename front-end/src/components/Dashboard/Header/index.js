import React from 'react'
import './style.min.css'

import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, TableCell, Popup } from 'semantic-ui-react';
import { PayPalButton } from "react-paypal-button-v2";
import Coin from './Coin'
import CoinBig from './CoinBig'
import 'react-day-picker/lib/style.css';

// Redux
import { connect } from 'react-redux'
import { update_address ,open_refill} from '../../../actions'


const options = [
    { key: 1, text: '5€', value: 5 },
    { key: 2, text: '10€', value: 10 },
    { key: 3, text: '20€', value: 20 },
    { key: 4, text: '30€', value: 30 },
    { key: 5, text: '50€', value: 50 },
    { key: 6, text: '100€', value: 100 },
]


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            open: false,
            open2: false,
            address: this.props.user ? this.props.user.address : '',
            rechanrgeModal: false,
            refill: 0,
        }
        this.logOut = this.logOut.bind(this)
        this.setOpen = this.setOpen.bind(this)
        this.setOpen2 = this.setOpen2.bind(this)
        this.setOpenMoney = this.setOpenMoney.bind(this)
        this.update_address = this.update_address.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeValue = this.handleChangeValue.bind(this)
    }

    update_address() {
        this.props.update_address(this.state.address, this.props.user.username)
    }
    handleChange(event) {

        let { name, value } = event.target
      
        this.setState({ [name]: value });

    }
    logOut() {
        localStorage.setItem('token', '')
        localStorage.setItem('username', '')
        window.location = '/homepage'
    }

    setOpen() {
        this.setState({ open: !this.state.open });
    }
    setOpen2() {
        this.setState({ open2: !this.state.open });
    }
    setOpenMoney(val) {
        this.setState({ rechanrgeModal: val });
    }

    handleChangeValue = (e, { value }) => {
    
        this.setState({ refill: value });
    }

    render() {

        return (



            <div className="HeaderMenu">
                <label className='logo'>
                    FindThatCard
                    {this.props.user.admin ==true?<div className='admin'>Admin</div> :''}
                    </label>





                <Modal
                    onClose={() => this.setOpenMoney(false)}
                    onOpen={() => this.setOpenMoney(true)}
                    open={this.state.rechanrgeModal}

                >
                    <Modal.Header>Here you can refill your balance: current balance:{this.props.user.balance}</Modal.Header>
                    <Modal.Content image>

                        <Modal.Description>

                            <p>
                                For now, only Paypal is avaiable:  <Dropdown className='pikaDrop' onChange={this.handleChangeValue} clearable options={options} selection />
                            </p>



                            <div className='paypalcontainer'>
                                <div style={{ marginLeft: '15px', marginBottom: '10px' }}>
                                 {/*    <CoinBig ></CoinBig> */}
                                </div>
                                <PayPalButton
                                    amount={this.state.refill}
                                    locale='en_US'
                                    style={{
                                        layout: 'horizontal',
                                        label: 'buynow',
                                        branding: 'true',
                                        tagline: false,
                                        height: 40
                                    }}
                                    onSuccess={(details, data) => {
                                        this.props.payment(this.props.user.username, this.state.refill, data)
                                        alert("Transaction completed by " + details.payer.name.given_name);             
                                        setTimeout(function () { //Start the timer
                                            window.location.reload();
                                        }.bind(this), 1000)

                                    }}
                                />

                            </div>

                        </Modal.Description>

                    </Modal.Content>

                </Modal>







                <Modal
                    onClose={this.setOpen}
                    size={'mini'}
                    open={this.state.open}

                >
                    <Modal.Header>Personal info:</Modal.Header>
                    <Modal.Content>

                        {this.props.user ?
                            <div className="AccountCardModal">
                                <p><b>Username: </b> {this.props.user.username}</p>
                                <p><b>Email: </b> {this.props.user.email}</p>
                                <p><b>Address: </b><br />
                                    <Input

                                        name='address'
                                        onChange={(event) => { this.handleChange(event) }}
                                        value={this.state.address}

                                        placeholder="address"

                                    /><Button onClick={this.update_address}>Save</Button>
                                </p>

                            </div>
                            : ''}
                        <Button style={{ backgroundColor: '#14213D', color: 'white' }} fluid onClick={this.logOut}>Logout</Button>

                    </Modal.Content>
                    <Modal.Actions>


                    </Modal.Actions>
                </Modal>



                <div className='hamburger'>
                    <a onClick={() => this.props.open_refill(true)}>
                        <Coin></Coin></a>

                    <Dropdown onClick={this.setOpen} item icon='wrench' fixed='right'>
                        {/*  <Dropdown.Menu>

                            <Dropdown.Item onClick={this.logOut}>Logout</Dropdown.Item>

                        </Dropdown.Menu> */}
                    </Dropdown>





                </div>

            </div >

        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {
    update_address,
    open_refill

})(Header);
