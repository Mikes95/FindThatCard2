import React from 'react'
import './style.min.css'
import CoinBig from '../Header/CoinBig'
import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Header, Segment, TableCell, Popup } from 'semantic-ui-react';
import { HorizontalBar } from 'react-chartjs-2';
import { PayPalButton } from "react-paypal-button-v2";
import 'react-day-picker/lib/style.css';
import { payment, stats, user_detail, update_address, get_orders, mod_order, open_refill, romove_from_wishlist } from '../../../actions'
import Wishlist from './Wishlist'
// Redux
import { connect } from 'react-redux'
const status = [
    { key: 1, text: 'paid', value: 'paid' },
    { key: 2, text: 'processed', value: 'processed' },
    { key: 3, text: 'shipped', value: 'shipped' },
    /* { key: 4, text: 'received', value: 'received' } */
]
const options = [
    { key: 1, text: '5€', value: 5 },
    { key: 2, text: '10€', value: 10 },
    { key: 3, text: '20€', value: 20 },
    { key: 4, text: '30€', value: 30 },
    { key: 5, text: '50€', value: 50 },
    { key: 6, text: '100€', value: 100 },
]



class PersonalArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rechanrgeModal: false,
            refill: 0,
            address: this.props.user.address,
            order: 'seller',
            stats: 'global',
            status: '',
            id_mod: '',



        }
        this.setOpen = this.setOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.update_address = this.update_address.bind(this)
        this.confirm_received = this.confirm_received.bind(this)
        this.mod_order_status = this.mod_order_status.bind(this)

    }
    isPhone() { return window.innerWidth <= 480 }
    isMobile() { return window.innerWidth <= 1024 }
    confirm_received(id) {

        this.props.mod_order(this.props.user.username, id, 'received')
    }
    mod_order_status(id, status) {

        this.props.mod_order(this.props.user.username, id, this.state.status)
        this.setState({ status: '' });
        this.setState({ id_mod: '' });
    }

    update_address() {
        this.props.update_address(this.state.address, this.props.user.username)
    }

    handleChange(event) {

        let { name, value } = event.target

        this.setState({ [name]: value });

    }
    handleChangeOder(type) {
        this.setState({ order: type });
    }
    handleChangeStats(type) {
        this.setState({ stats: type });
    }
    setOpen(val) {
        this.setState({ rechanrgeModal: val });
    }

    handleChangeValue = (e, { value }) => {

        this.setState({ refill: value });
    }

    componentDidMount() {
        this.props.stats(this.props.user.username)
        this.props.user_detail(this.props.user.username)
        this.props.get_orders(this.props.user.username)
        this.props.open_refill(false)
    }
    handleChangeDrop(event, id) {

        this.setState({ status: event.value });
        this.setState({ id_mod: id });

    }



    render() {

        return (

            <div className="PersonalAreaContainer">

                {/*   <Modal
                    onClose={() => this.props.open_refill(false)}
                    
                    open={this.props.refill_modal==true? true: false}

                >
                    <Modal.Header>Here you can refill your balance! <br></br>Current balance:<gold>{this.props.user.balance}<Icon name='dollar sign' /></gold></Modal.Header>
                    <Modal.Content image>

                        <Modal.Description>

                            <p>
                                For now, only Paypal is avaiable:  <Dropdown className='pikaDrop' onChange={this.handleChangeValue} clearable options={options} selection />
                            </p>



                            <div className='paypalcontainer'>
                                <div style={{ marginLeft: '15px', marginBottom: '10px' }}>
                                    <CoinBig ></CoinBig>
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

                </Modal> */}
                <div className='stats'>
                    {/*       <div className="AccountCard">
                        <h3>Personal info</h3>
                        {this.props.user ?
                            <div>
                                <p><b>Username: </b> {this.props.user.username}</p>
                                <p><b>Email: </b> {this.props.user.email}</p>
                                <p><b>Address: </b>
                                    <Input

                                        name='address'
                                        onChange={(event) => { this.handleChange(event) }}
                                        value={this.state.address}

                                        placeholder="address"

                                    /><Button onClick={this.update_address}>Save</Button>
                                </p>
                                <p><b>Balance: </b> {this.props.user.balance}    <Icon name='dollar sign' /> <a onClick={() => this.setOpen(true)}>Refill</a></p>
                            </div>
                            : ''}
                    </div>  */}
                    <div className="OrdersCard">
                        <h3>Orders: <a onClick={() => this.handleChangeOder('seller')}>(as Seller) </a>
                            /
                        <a onClick={() => this.handleChangeOder('buyer')}> (as Buyer)</a></h3>
                        {this.state.order == 'seller' ?
                            <div className="table">
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Date</Table.HeaderCell>
                                            <Table.HeaderCell>Seller</Table.HeaderCell>
                                            <Table.HeaderCell>Buyer</Table.HeaderCell>
                                            <Table.HeaderCell>Price</Table.HeaderCell>
                                            <Table.HeaderCell>Address</Table.HeaderCell>
                                            <Table.HeaderCell>Card's name</Table.HeaderCell>
                                            <Table.HeaderCell>Status</Table.HeaderCell>
                                            <Table.HeaderCell>Action</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {this.props.orders ? this.props.orders.as_seller.map((item, index) => {

                                            return (<Table.Row>
                                                <Table.Cell>{item.date}</Table.Cell>
                                                <Table.Cell>{item.seller}</Table.Cell>
                                                <Table.Cell >{item.buyer}</Table.Cell>
                                                <Table.Cell >{item.amount}</Table.Cell>
                                                <Table.Cell >{item.ship_to}</Table.Cell>
                                                <Table.Cell >{item.card.name}</Table.Cell>
                                                <Table.Cell positive>{item.status == 'received' ? 'received' :
                                                    <Dropdown
                                                        clearable
                                                        options={status}
                                                        selection
                                                        name='status'
                                                        onChange={(e, val) => this.handleChangeDrop(val, item._id)}
                                                        defaultValue={item.status} />
                                                }
                                                </Table.Cell>
                                                <Table.Cell >
                                                    <Button
                                                        disabled={item.status == 'received' ? true : false}
                                                        style={{
                                                            backgroundColor: this.state.id_mod == item._id ? '#FCA311' : '',
                                                            color: this.state.id_mod == item._id ? 'white' : ''
                                                        }}
                                                        onClick={() => this.mod_order_status(item._id)}
                                                        fluid >SAVE</Button>
                                                </Table.Cell>
                                            </Table.Row>)
                                        }) : ''}

                                        {/* <Table.Row positive>
                                        <Table.Cell>Jimmy</Table.Cell>
                                        <Table.Cell>
                                            <Icon name='checkmark' />
                                            Approved
                                        </Table.Cell>
                                        <Table.Cell>None</Table.Cell>
                                    </Table.Row> */}


                                    </Table.Body>
                                </Table>
                            </div>
                            :
                            <div className="table">
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Date</Table.HeaderCell>
                                            <Table.HeaderCell>Seller</Table.HeaderCell>
                                            <Table.HeaderCell>Buyer</Table.HeaderCell>
                                            <Table.HeaderCell>Price</Table.HeaderCell>
                                            <Table.HeaderCell>Address</Table.HeaderCell>
                                            <Table.HeaderCell>Card's name</Table.HeaderCell>
                                            <Table.HeaderCell>Status</Table.HeaderCell>
                                            <Table.HeaderCell>Action</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {this.props.orders ? this.props.orders.as_buyer.map((item, index) => {

                                            return (<Table.Row>
                                                <Table.Cell>{item.date}</Table.Cell>
                                                <Table.Cell>{item.seller}</Table.Cell>
                                                <Table.Cell >{item.buyer}</Table.Cell>
                                                <Table.Cell >{item.amount}</Table.Cell>
                                                <Table.Cell >{item.ship_to}</Table.Cell>
                                                <Table.Cell >{item.card.name}</Table.Cell>
                                                <Table.Cell positive>{item.status}</Table.Cell>
                                                <Table.Cell >
                                                    <Button
                                                        onClick={() => this.confirm_received(item._id)}
                                                        fluid >Conrirm received card</Button></Table.Cell>
                                            </Table.Row>)
                                        }) : ''}

                                        {/* <Table.Row positive>
                                        <Table.Cell>Jimmy</Table.Cell>
                                        <Table.Cell>
                                            <Icon name='checkmark' />
                                            Approved
                                        </Table.Cell>
                                        <Table.Cell>None</Table.Cell>
                                    </Table.Row> */}


                                    </Table.Body>
                                </Table>
                            </div>}
                    </div>
                </div>
                <div className='stats'>
                    <div className='pesonal'>
                        <h3>Stats:  <a onClick={() => this.handleChangeStats('personal')}>Pesonal </a> / <a onClick={() => this.handleChangeStats('global')}>Global </a></h3>

                        {this.props.stat ?
                            this.state.stats == 'personal' ?
                                <div>

                                    <p><b>Searched cards: </b> {this.props.stat.count}</p>
                                    {console.log(window.innerWidth)}
                                    <HorizontalBar
                                        height={window.innerWidth < 500 ? '150px' : '100%'}
                                        data={
                                            {
                                                labels: ['All', 'Pokémon', 'Yugioh', 'Magic'],
                                                datasets: [
                                                    {
                                                        label: 'My First dataset',
                                                        backgroundColor: "#FCA311 ",
                                                        borderColor: 'rgba(255,99,132,1)',
                                                        borderWidth: 1,
                                                        hoverBackgroundColor: "#FCA311 ",
                                                        hoverBorderColor: 'rgba(255,99,132,1)',
                                                        data: [this.props.stat.brandAll, this.props.stat.brandPokemon, this.props.stat.brandYugioh, this.props.stat.brandMagic]
                                                    }
                                                ]

                                            }
                                        }

                                        options={{
                                            legend: {
                                                display: false
                                            },
                                            scales: {
                                                xAxes: [{
                                                    display: true,
                                                    ticks: {
                                                        suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                                        // OR //
                                                        beginAtZero: true   // minimum value will be 0.
                                                    }
                                                }],


                                            }
                                        }}
                                    />
                                </div>
                                :
                                <div>

                                    <p><b>Searched cards: </b> {this.props.stat.global.count}</p>
                                    <HorizontalBar
                                        height={window.innerWidth < 500 ? '150px' : '100%'}
                                        data={
                                            {
                                                labels: ['All', 'Pokémon', 'Yugioh', 'Magic'],
                                                datasets: [
                                                    {
                                                        label: 'My First dataset',
                                                        backgroundColor: "#FCA311 ",
                                                        borderColor: 'rgba(255,99,132,1)',
                                                        borderWidth: 1,
                                                        hoverBackgroundColor: "#FCA311 ",
                                                        hoverBorderColor: 'rgba(255,99,132,1)',
                                                        data: [this.props.stat.global.brandAll, this.props.stat.global.brandPokemon, this.props.stat.global.brandYugioh, this.props.stat.global.brandMagic]
                                                    }
                                                ]

                                            }
                                        }

                                        options={{
                                            legend: {
                                                display: false
                                            },
                                            scales: {
                                                xAxes: [{
                                                    display: true,
                                                    ticks: {
                                                        suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                                        // OR //
                                                        beginAtZero: true   // minimum value will be 0.
                                                    }
                                                }],


                                            }
                                        }}
                                    />
                                </div>
                            : ''}
                    </div>
                    {this.props.user.wishlist ?
                    <div className='wishlist'>
                        <h3>Wishlist</h3>
                        <div className='container'>
                            {this.props.user.wishlist ? this.props.user.wishlist.map(item => {
                                return (
                                    <Wishlist
                                        card={item}
                                        user={this.props.user}
                                    />

                                );
                            }) : ''}
                        </div>
                    </div> : ''}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stat: state.user.stats,
        orders: state.user.orders,
        refill_modal: state.user.open_refill

    }
}

export default connect(mapStateToProps, {
    payment,
    user_detail,
    stats,
    update_address,
    get_orders, mod_order,
    open_refill,
    romove_from_wishlist
})(PersonalArea);
