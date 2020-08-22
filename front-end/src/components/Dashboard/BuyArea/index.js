import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import './style.min.css'

import { Checkbox, Radio, Select, TextArea, Button, Message, Image, Input, Form, Dropdown, Menu, Table, Modal, Header, Segment, TableCell, Popup, Icon } from 'semantic-ui-react';

import { PayPalButton } from "react-paypal-button-v2";
import 'react-day-picker/lib/style.css';
import { addNewCard, card_list } from '../../../actions'
import ACards from './SingleCard'
// Redux
import { connect } from 'react-redux'


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

class BuyArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            rechanrgeModal: false,
            refill: 0,
            cardBrand: 'Pokémon',
            articleTitle: '',
            cardName: '',
            cardPrice: 1,
            cardCondition: '',
            description: '',
            file: '',
            error: '',
            errorMessage: ''




        }
        this.setOpen = this.setOpen.bind(this)
        this.sendCards = this.sendCards.bind(this)


    }
    // specify upload params and url for your files
    componentDidMount() {
        this.props.card_list()
    }

    // called every time a file's `status` changes
    handleChangeStatus = ({ meta, file }, status) => { /* console.log(status, meta, file) */ }

    // receives array of files that are done uploading when submit button is clicked
    handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    cardBrand(val) {
        this.setState({ cardBrand: val });
    }

    setOpen(val) {
        this.setState({ open: val });
    }

    handleChangeValue = (e, { value }) => {

        this.setState({ refill: value });
    }
    handleChange(event) {

        let { name, value } = event.target

        this.setState({ [name]: value });
        this.setState({ error: false });
        this.setState({ errorMessage: '' });
    }
    handleChange2 = (e, { value }) => this.setState({ value })
    sendCards() {


    }
    onChangeHandler = event => {
        console.log(event.target.files[0])
        this.setState({
            file: event.target.files[0],

        })
    }

    render() {
        const { value } = this.state

        return (

            <div className="superContainer">
                <h1>Avaiable cards: <label className='filter'>
                    <Modal
                        onClose={() => this.setOpen(false)}
                        onOpen={() => this.setOpen(true)}
                        open={this.state.open}
                        trigger={<Button>Show Modal</Button>}
                    >
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content image>
                        <Form.Group inline>
                        <label>Card brand</label>


                        <Image className={this.state.cardBrand == 'Pokémon' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('Pokémon')} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png' size='small' />

                        <Image className={this.state.cardBrand == 'Yugioh' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('Yugioh')} src='https://i.ibb.co/gRWFPxX/kisspng-yu-gi-oh-power-of-chaos-yugi-the-destiny-yu-gi-o-yu-5ae1602555ef55-960105721524719653352.png' size='small' />

                        <Image className={this.state.cardBrand == 'Magic' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('Magic')} src='https://i.ibb.co/fXt8jnx/kisspng-magic-the-gathering-online-dominaria-playing-card-friends-gathering-5b0c43f601e504-904210801.png' size='small' />


                    </Form.Group>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => this.setOpen(false)}>
                                Nope
        </Button>
                            <Button
                                content="Yep, that's me"
                                labelPosition='right'
                                icon='checkmark'
                                onClick={() => this.setOpen(false)}
                                positive
                            />
                        </Modal.Actions>
                    </Modal>



                    <Icon name='search' /></label></h1>




                {this.props.cards ? this.props.cards.map(item => {
                    return (
                        <ACards
                            card={item}
                        />
                    );
                }) : ''}
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
                <Modal
                    onClose={() => this.setOpen(false)}
                    onOpen={() => this.setOpen(true)}
                    open={this.state.rechanrgeModal}

                >
                    <Modal.Header>Load image</Modal.Header>
                    <Modal.Content image>

                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>
                                We've found the following gravatar image associated with your e-mail
                                address.
                            </p>


                        </Modal.Description>

                    </Modal.Content>

                </Modal>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.user.cards
    }
}

export default connect(mapStateToProps, {

    addNewCard, card_list

})(BuyArea);
