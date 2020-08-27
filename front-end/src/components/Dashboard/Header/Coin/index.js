import React from 'react'
import './style.min.css'

import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, TableCell, Popup } from 'semantic-ui-react';
import { PayPalButton } from "react-paypal-button-v2";

import 'react-day-picker/lib/style.css';

// Redux
import { connect } from 'react-redux'




class Coin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
       
    }


    render() {

        return (
                            <div class="coin">
                                <div class="coin__front"></div>
                                <div class="coin__edge">
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>

                                </div>
                                <div class="coin__back"></div>
                                <div class="coin__shadow"></div>
                            </div>
                           



          
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {
 

})(Coin);
