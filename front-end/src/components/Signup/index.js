import React from 'react'
import './style.min.css'
import { Title } from '../Styled'
import Signup from '../Auth/Signup'
import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, TableCell, Popup } from 'semantic-ui-react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

// Redux
import { connect } from 'react-redux'





class LandingSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            openMessage: true,




        }
        this.handleSubmit = this.handleSubmit.bind(this)
        /* this.handleChange = this.handleChange.bind(this) */

    }

    handleSubmit() {
     /*    this.props.signup(this.state.username, this.state.password) */
      }
    
    isPhone() { return window.innerWidth <= 480 }
    isMobile() { return window.innerWidth <= 1024 }










    render() {

        return (

            <div className='Home'>
                <div className='title'>FindThatCard</div>

                <Signup></Signup>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {


})(LandingSignup);
