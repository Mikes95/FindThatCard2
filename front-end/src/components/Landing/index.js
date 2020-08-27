import React from 'react'
import './style.min.css'
import { Title } from '../Styled'
import Login from '../Auth/Login'
import { Button, Message, Icon, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, TableCell, Popup } from 'semantic-ui-react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

// Redux
import { connect } from 'react-redux'





class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            openMessage: true,




        }
        /* this.handleChange = this.handleChange.bind(this) */

    }


    isPhone() { return window.innerWidth <= 480 }
    isMobile() { return window.innerWidth <= 1024 }






    componentWillMount() {
        let token = localStorage.getItem('token');
        if (token) {
            window.location = '/dashboard'
        }
    }



    render() {

        return (

            <div className='Home'>
                <div className='title'>
                    <img src="logo.png" alt="logo" />
                </div>
                <p className='descr'>FindThatCard, the online trading site that allows you to buy and sell cards and related accessories in a simple way.</p>
                <a className='loginA' href='/login' >Login</a>
                <div className='container'>
                    <div className='one'>
                    <Icon name='shop'></Icon>
                        <h3>Buy</h3>
                    </div>
                    <div className='one'>
                    <Icon name='recycle'></Icon>
                        <h3>Trade</h3>
                    </div>
                    <div className='one'>
                    <Icon name='dollar'></Icon>
                        <h3>Sell</h3>
                    </div>
                </div>
                <br /> 
                <div className='divider'>
                    <img src="divider.png" alt="logo" />
                </div>

                <div className='Under'>
                    <h3>ciao</h3>
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


})(Landing);
