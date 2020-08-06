import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login, signup, closeMessage } from '../../actions'
import { Message, Modal, Input, Button, Dimmer, Loader, Image, Segment, Form } from 'semantic-ui-react';
import './style.min.css'


let token = localStorage.getItem('token')
token = token === undefined || token == 'undefined' ? false : true

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirm: '',
      clientError: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    if (!this.state.email.includes('@')) {
      console.log('errore')
      this.setState({ clientError: "Please format email with @" });
      return 

    }
    else if (this.state.password != '' && this.state.password != this.state.confirm) {
      console.log('errore')
      this.setState({ clientError: "Password and Password confirmation must be the same" });

    }
    else if(this.state.password && this.state.email && this.state.username) {
      this.props.signup(this.state.email, this.state.username, this.state.password)
    }
  }

  handleChange(event) {
    let { name, value } = event.target
    this.setState({ [name]: value });
  }
  render() {
    return (

      <div className='Logincontainer'>
      
        {this.props.messageType == 'error' ?
          <div className="ErrorMessage">
            <Modal dimmer={true} size={'tiny'} open={this.props.openMessage} onClose={this.props.closeMessage}>
              <Message
                closeIcon
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
          </div> }
        <br />


        <br />

        <Form >
          <div className='superConteiner'>
            <div className='altraCarta'> <a href='/login'>Login</a></div>
            <div className='FormContainer'>

              <p>Email : </p>
              <Input
                placeholder='Email'
                name='email'
                fluid
                value={this.state.email}
                onChange={(event) => { this.handleChange(event) }} />
              <br />
              <p>Username : </p>
              <Input
                placeholder='Username'
                name='username'
                fluid
                value={this.state.username}
                onChange={(event) => { this.handleChange(event) }} />
              <br />
              <p>Password : </p>
              <Input
                type='password'
                fluid
                placeholder='Password'
                name='password'
                value={this.state.password}
                onChange={(event) => { this.handleChange(event) }} />
              <br />
              <p>Confirm Password : </p>
              <Input
                type='password'
                fluid
                placeholder='Password'
                name='confirm'
                value={this.state.confirm}
                onChange={(event) => { this.handleChange(event) }} />
              <br />
              {this.state.clientError ?
                <Message
                  negative
                  icon='warning sign'

                  content={this.state.clientError}
                  onDismiss={this.props.closeMessage}
                /> : ''}
              <Button color='blue' onClick={this.handleSubmit} fluid> Sign up</Button>

            </div>
          </div>
        </Form>

        {
          this.props.loading ?
            <Dimmer active inverted>
              <Loader size='large'>Loading</Loader>
            </Dimmer> : ''
        }
      </div >
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
  }
}
export default connect(mapStateToProps, {
  signup,
  closeMessage,
})(Signup);
