import React from 'react'
import './style.min.css'

import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Header, Segment, TableCell, Popup } from 'semantic-ui-react';
import { HorizontalBar } from 'react-chartjs-2';
import { PayPalButton } from "react-paypal-button-v2";
import 'react-day-picker/lib/style.css';
import { payment, stats } from '../../../actions'
import Wishlist from './Wishlist'
// Redux
import { connect } from 'react-redux'

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
            refill: 0




        }
        this.setOpen = this.setOpen.bind(this)


    }


    setOpen(val) {
        this.setState({ rechanrgeModal: val });
    }

    handleChangeValue = (e, { value }) => {
        console.log(value)
        this.setState({ refill: value });
    }

    componentDidMount() {
        this.props.stats(this.props.user.username)
    }


    render() {

        return (

            <div className="PersonalAreaContainer">
                <Modal
                    onClose={() => this.setOpen(false)}
                    onOpen={() => this.setOpen(true)}
                    open={this.state.rechanrgeModal}

                >
                    <Modal.Header>Refill balance</Modal.Header>
                    <Modal.Content image>

                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>
                                We've found the following gravatar image associated with your e-mail
                                address.
                            </p>
                            <p style={{ display: 'flex' }}><Dropdown onChange={this.handleChangeValue} clearable options={options} selection /><div className='paypalcontainer'>
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
                                        /* return fetch("/refill", {
                                            method: "post",
                                            body: JSON.stringify({
                                                orderID: data.orderID
                                            })
                                        }); */
                                    }}
                                />
                            </div></p>

                        </Modal.Description>

                    </Modal.Content>
                    {/*                  <Modal.Actions>
                        <Button color='black' onClick={() => this.setOpen(false)}>
                            Nope
                        </Button>
                        <Button
                            content="Yep, that's me"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={() => this.setOpen(false)}
                            positive
                        />
                    </Modal.Actions> */}
                </Modal>
                <div className="AccountCard">
                    <h3>Personal info</h3>
                    {this.props.user ?
                        <div>
                            <p><b>Username: </b> {this.props.user.username}</p>
                            <p><b>Email: </b> {this.props.user.email}</p>
                            <p><b>Balance: </b> {this.props.user.balance}    <Icon name='dollar sign' /> <a onClick={() => this.setOpen(true)}>Refill</a></p>
                        </div>
                        : ''}
                </div>
                <div className='stats'>
                    <div className='pesonal'>
                        <h3>Personal Stats.</h3>
                        {console.log(this.props.stat)}
                        {this.props.stat ? <div>
                            {console.log(this.props.stat)}
                            <p><b>Searched cards: </b> {this.props.stat.count}</p>
                            <HorizontalBar
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
                                        }]
                                    }
                                }}
                            />
                        </div> : ''}
                    </div>
                    <div className='global'>
                        <h3>Global Stats.</h3>
                    </div>
                </div>
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
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stat: state.user.stats

    }
}

export default connect(mapStateToProps, {
    payment,
    stats
})(PersonalArea);
