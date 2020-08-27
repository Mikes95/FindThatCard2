import React from 'react'
import './style.min.css'
import { Title } from '../Styled'
import Login from '../Auth/Login'
import Header from './Header'
import FooterMenu from './footerMenu'
import PersonalArea from './PersonalArea'
import SellingArea from './SellingArea'
import BuyArea from './BuyArea'
import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, Loader, Dimmer } from 'semantic-ui-react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

// Redux
import { user_detail, closeMessage, changeMenu } from '../../actions'
import { connect } from 'react-redux'






class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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








    render() {

        return (

            <div className='dashboardContainer'>
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
        menu: state.user.menu
    }
}

export default connect(mapStateToProps, {
    user_detail, closeMessage,
    changeMenu

})(Dashboard);
