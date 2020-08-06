import React from 'react'
import './style.min.css'

import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Header, Segment, TableCell, Popup } from 'semantic-ui-react';

import { PayPalButton } from "react-paypal-button-v2";
import 'react-day-picker/lib/style.css';
import { payment } from '../../../actions'
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
            refill:0
            



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
                            <p style={{display: 'flex'}}><Dropdown  onChange={this.handleChangeValue} clearable options={options} selection /><div className='paypalcontainer'>
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
                                        this.props.payment(this.props.user.username,this.state.refill,data)
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
                    {this.props.user ? <div>
                        <p><b>Username: </b> {this.props.user.username}</p>
                        <p><b>Email: </b> {this.props.user.email}</p>
                        <p><b>Balance: </b> {this.props.user.balance}    <Icon name='dollar sign' /> <a onClick={() => this.setOpen(true)}>Refill</a></p>
                    </div>
                        : ''}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {
    payment

})(PersonalArea);
