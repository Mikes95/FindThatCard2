import React from 'react'
import './style.min.css'

import { Button, Message, Icon, Input, Form, Dropdown, Menu, Table, Modal, Checkbox, Segment, TableCell, Popup } from 'semantic-ui-react';

import { changeMenu } from '../../../actions'
import 'react-day-picker/lib/style.css';

// Redux
import { connect } from 'react-redux'





class FooterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {





        }
      

    }









    render() {

        return (

          

                <div className="footerMenu">
                
                    <Icon className={this.props.menu==0 ? 'selected':''} name='user' onClick={() => this.props.changeMenu(0,this.props.user.username)}/>
                    <Icon className={this.props.menu==1 ? 'selected':''}  name='shop' onClick={() => this.props.changeMenu(1,this.props.user.username)} />
                    <Icon className={this.props.menu==2 ? 'selected':''}  name='plus' onClick={() => this.props.changeMenu(2,this.props.user.username)}/>
                  {/*   <Icon name='search' onClick={() => this.props.changeMenu(3,this.props.user.username)}/> */}
                </div>
        
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.user.menu,
    }
}

export default connect(mapStateToProps, {

    changeMenu
})(FooterMenu);
