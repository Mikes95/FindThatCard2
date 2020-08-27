import React from 'react'
import './style.min.css'

import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, TableCell, Popup } from 'semantic-ui-react';
import { PayPalButton } from "react-paypal-button-v2";

import 'react-day-picker/lib/style.css';

// Redux
import { connect } from 'react-redux'




class CoinBig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
       
    }


    render() {

        return (
                            <div class="CoinBig">
                                <div class="CoinBigcoin__front"></div>
                                <div class="CoinBigcoin__edge">
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>

                                </div>
                                <div class="CoinBigcoin__back"></div>
                                <div class="CoinBigcoin__shadow"></div>
                            </div>
                           



          
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {
 

})(CoinBig);
