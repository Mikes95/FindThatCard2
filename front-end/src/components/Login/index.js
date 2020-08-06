import React from 'react'
import './style.min.css'
import { Title } from '../Styled'
import Login from '../Auth/Login'
import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, TableCell, Popup } from 'semantic-ui-react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

// Redux
import { connect } from 'react-redux'





class LandingLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            openMessage: true,




        }
        /* this.handleChange = this.handleChange.bind(this) */

    }


    isPhone() { return window.innerWidth <= 480 }
    isMobile() { return window.innerWidth <= 1024 }










    render() {

        return (

            <div className='Home'>
                <div className='title'>FindThatCard</div>

                <Login></Login>
              
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {


})(LandingLogin);
