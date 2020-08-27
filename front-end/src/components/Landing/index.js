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
            <div>
                <div className='Home'>
                    <div className='title'>
                        <img src="Senza titolo-1.png" alt="logo" />
                    </div>
                    <p className='descr'>FindThatCard, the online trading site that allows you to buy and sell cards and related accessories in a simple way.</p>
                    <a className='loginA' href='/login' >Login</a>
                    <div className='container'>
                        <div className='one'>
                        <a href='#buy'>
                            <Icon name='shop'></Icon>
                            <h3>Buy</h3>
                            </a>
                        </div>
                        <div className='one'>
                        <a href='#trade'>
                            <Icon name='recycle'></Icon>
                            <h3>Trade</h3>
                            </a>
                        </div>
                        <div className='one'  >
                        <a href='#sell'>
                            <Icon name='dollar'></Icon>
                            <h3>Sell</h3>
                            </a>
                        </div>
                    </div>
                    <br />
                    <div className='divider'>
                        <img src="divider.png" alt="logo" />
                    </div>
                </div>
                <div className='UnderHome'>
                    <div className='buyRow'>

                        <div className='buyImage'id='buy'>
                            <img src="Charizard.png" alt="logo" />
                            <h3>Buy</h3>
                        </div>
                        <div className='buyText'>
                            <p>On FindThatCard you can buy whatever card you are looking for. Stay up to date on search trends, and discover all the offers that are right for you</p>
                        </div>
                    </div>


                    <div className='buyRow' id='trade'>


                        <div className='buyText'>
                            <p>Offer exchanges to whoever you want. create trade ads and wait for some users to accept your proposal</p>
                        </div>

                        <div className='buyImage'>
                            <img src="blue.png" alt="logo" />
                            <h3>Trade</h3>
                        </div>
                    </div>

                    <div className='buyRow' id='sell'>

                        <div className='buyImage'>
                            <img src="magic.png" alt="logo" />
                            <h3>Sell</h3>
                        </div>
                        <div className='buyText'>
                            <p>Sell ​​your disused cards, or look for a bargain by selling the cards of the moment. just take a picture and upload it</p>
                        </div>
                    </div>


                </div>

                <div className='footer'>
                    Made with love by Mikees
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
