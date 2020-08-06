import React from 'react'
import './style.min.css'

import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, TableCell, Popup } from 'semantic-ui-react';


import 'react-day-picker/lib/style.css';

// Redux
import { connect } from 'react-redux'





class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {





        }
        this.logOut = this.logOut.bind(this)
        

    }


    logOut(){
        localStorage.setItem('token','')
        localStorage.setItem('username','')
        window.location = '/homepage'
    }






    render() {

        return (



            <div className="HeaderMenu">
                FindThatCard

                <div className='hamburger'>

                    <Dropdown item icon='wrench' fixed='left'>
                        <Dropdown.Menu>
                      
                            <Dropdown.Item onClick={this.logOut}>Logout</Dropdown.Item>
                           
                        </Dropdown.Menu>
                    </Dropdown>





                </div>

            </div >

        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {


})(Header);
