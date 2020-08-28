import React from 'react'
import './style.min.css'
import { Title } from '../Styled'
import Login from '../Auth/Login'
import Header from './Header'
import CoinBig from './Header/CoinBig'
import { PayPalButton } from "react-paypal-button-v2";
import FooterMenu from './footerMenu'
import PersonalArea from './PersonalArea'
import SellingArea from './SellingArea'
import BuyArea from './BuyArea'
import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, Loader, Dimmer } from 'semantic-ui-react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

// Redux
import { user_detail, closeMessage, changeMenu, open_refill, payment } from '../../actions'
import { connect } from 'react-redux'



const options = [
    { key: 1, text: '5€', value: 5 },
    { key: 2, text: '10€', value: 10 },
    { key: 3, text: '20€', value: 20 },
    { key: 4, text: '30€', value: 30 },
    { key: 5, text: '50€', value: 50 },
    { key: 6, text: '100€', value: 100 },
]


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rechanrgeModal: false,
            refill: 0,
            openMessage: true,




        }
        /* this.handleChange = this.handleChange.bind(this) */

    }


    isPhone() { return window.innerWidth <= 480 }
    isMobile() { return window.innerWidth <= 1024 }

    componentDidMount() {
        this.props.changeMenu(0)
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if (!token) {
            window.location = '/homepage'
        }
        this.props.user_detail(localStorage.getItem('username'))

    }

    handleChangeValue = (e, { value }) => {

        this.setState({ refill: value });
    }






    render() {

        return (

            <div className='dashboardContainer'>
                <Modal
                    onClose={() => this.props.open_refill(false)}

                    open={this.props.refill_modal == true ? true : false}

                >
                    <Modal.Header>Here you can refill your balance! <br></br>Current balance:<gold>{this.props.user.user ? this.props.user.user.balance : '0'}<Icon name='dollar sign' /></gold></Modal.Header>
                    <Modal.Content image>

                        <Modal.Description>

                            <p className='last_p' style={{display: 'flex'}}>
                                For now, only Paypal is avaiable:  <Dropdown className='pikaDrop' onChange={this.handleChangeValue} clearable options={options} selection />          <div className='paypalcontainer2'>
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
                                            this.props.payment(this.props.user.user.username, this.state.refill, data)
                                            alert("Transaction completed by " + details.payer.name.given_name);
                                            setTimeout(function () { //Start the timer
                                                window.location.reload();
                                            }.bind(this), 1000)

                                        }}
                                    />
                                </div>
                            </p>



                            <div className='paypalcontainer'>
                                <div style={{ marginLeft: '15px', marginBottom: '10px' }}>
                                    <CoinBig ></CoinBig>
                                </div>
                                {/*  <PayPalButton
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
                                        this.props.payment(this.props.user.user.username, this.state.refill, data)
                                        alert("Transaction completed by " + details.payer.name.given_name);             
                                        setTimeout(function () { //Start the timer
                                            window.location.reload();
                                        }.bind(this), 1000)

                                    }}
                                /> */}

                            </div>

                        </Modal.Description>

                    </Modal.Content>

                </Modal>
                {this.props.messageType == 'error' ?
                    <div className="ErrorMessage">
                        <Modal dimmer={true} size={'tiny'} open={this.props.openMessage} onClose={this.props.closeMessage}>
                            <Message
                                negative
                                icon='warning sign'
                                header='Oops'
                                content={this.props.message}
                                onDismiss={this.props.closeMessage}
                            />
                        </Modal>
                    </div>
                    :
                    <div className="ErrorMessage">
                        <Modal dimmer={true} size={'tiny'} open={this.props.openMessage} onClose={this.props.closeMessage}>
                            <div className="MySuccess">
                                <Message
                                    success
                                    icon='check circle'
                                    header='Success'
                                    content={this.props.message}
                                    onDismiss={this.props.closeMessage}
                                />
                            </div>
                        </Modal>
                    </div>}
                {this.props.user.user ?
                    <Header
                        user={this.props.user.user}
                    ></Header> : ''}

                <div className='AreaContainer'>

                    {this.props.menu == 0 ?
                        this.props.user.user ?
                            <PersonalArea
                                user={this.props.user.user}
                            ></PersonalArea>
                            : '' : ''}
                    {this.props.menu == 1 ?
                        <BuyArea
                            user={this.props.user.user}
                        ></BuyArea>
                        : ''}
                    {this.props.menu == 2 ?
                        <SellingArea
                            user={this.props.user.user}
                        ></SellingArea>
                        : ''}

                </div>
                <FooterMenu
                    user={this.props.user.user}
                ></FooterMenu>
                {
                    this.props.loading ?
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer> : ''
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        message: state.user.message,
        messageType: state.user.messageType,
        openMessage: state.user.openMessage,
        loading: state.user.loading,
        menu: state.user.menu,
        refill_modal: state.user.open_refill
    }
}

export default connect(mapStateToProps, {
    user_detail, closeMessage,
    changeMenu,
    open_refill,
    payment

})(Dashboard);
