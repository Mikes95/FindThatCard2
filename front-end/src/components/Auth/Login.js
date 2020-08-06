import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login, closeMessage } from '../../actions'
import { Message, Modal, Input, Button, Dimmer, Loader, Image, Segment, Form } from 'semantic-ui-react';
import './style.min.css'



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    this.props.login(this.state.username, this.state.password)
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
        <br />


        <br />

        <Form onSubmit={this.handleSubmit}>
          <div className='superConteiner'>
            <div className='altraCarta2'> <a href='/signup'>Signup</a></div>
            <div className='FormContainer'>

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
              <Button color='blue' fluid> Login</Button>
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
  login,
  closeMessage,
})(Login);
