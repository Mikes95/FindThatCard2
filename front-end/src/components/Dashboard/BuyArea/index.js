import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import './style.min.css'

import { Checkbox, Radio, Select, TextArea, Button, Message, Image, Input, Form, Dropdown, Menu, Table, Modal, Header, Segment, TableCell, Popup, Icon } from 'semantic-ui-react';

import { PayPalButton } from "react-paypal-button-v2";
import 'react-day-picker/lib/style.css';
import { addNewCard, card_list, search_card_list } from '../../../actions'
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
            cardBrand: 'All',
            articleTitle: '',
            cardName: '',
            cardPrice: 0,
            maxPrice: 999,
            cardCondition: '',
            description: '',
            file: '',
            error: '',
            errorMessage: ''




        }
        this.setOpen = this.setOpen.bind(this)
        this.sendCards = this.sendCards.bind(this)
        this.search = this.search.bind(this)


    }
    // specify upload params and url for your files
    componentDidMount() {
        this.props.card_list()
    }
    search() {
        let data = {
            'name': this.state.cardName,
            'brand': this.state.cardBrand,
            'min_price': parseFloat(this.state.cardPrice),
            'max_price': parseFloat(this.state.maxPrice),
            'username': this.props.user.username
        }
        console.log(data)
        this.props.search_card_list(data)
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

    setOpen() {
        this.setState({ open: !this.state.open });
    }

    handleChangeValue = (e, { value }) => {

        this.setState({ refill: value });
    }
    handleChangePrice(event) {

        let { name, value } = event.target
        console.log(name, value)
        this.setState({ [name]: value });
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
                <Modal
                    onClose={this.setOpen}

                    open={this.state.open}

                >
                    <Modal.Header>Choose search filter</Modal.Header>
                    <Modal.Content image>
                        <div className='AllFilter'>
                            <div className='firstSetting'>
                                <label>Card's name</label>
                                <Form.Field
                                    control={Input}
                                    /*  label="Card's name" */
                                    placeholder="Card's name"
                                    name='cardName'
                                    onChange={(event) => { this.handleChange(event) }}
                                    value={this.state.cardName}
                                /><br />
                            </div>
                            <div className='firstSetting'>
                                <label>higher than: ${this.state.cardPrice}</label>
                                <Form.Input
                                    /* label={`Duration: ${this.state.cardPrice}ms `} */
                                    min={0}
                                    max={999}
                                    name='cardPrice'
                                    onChange={(event) => { this.handleChangePrice(event) }}
                                    step={1}
                                    type='range'
                                    value={this.state.cardPrice}
                                />
                                <label>Lower than: ${this.state.maxPrice}</label>
                                <Form.Input
                                    /* label={`Duration: ${this.state.cardPrice}ms `} */
                                    min={0}
                                    max={999}
                                    name='maxPrice'
                                    onChange={(event) => { this.handleChangePrice(event) }}
                                    step={1}
                                    type='range'
                                    value={this.state.maxPrice}
                                />
                            </div>
                            <div className='secondSetting'>
                                <Form.Group inline>
                                    <label>Card brand: {this.state.cardBrand}</label>
                                    <h1 className={this.state.cardBrand == 'All' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('All')} >ALL</h1>


                                    <Image className={this.state.cardBrand == 'Pokémon' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('Pokémon')} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png' size='small' />

                                    <Image className={this.state.cardBrand == 'Yugioh' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('Yugioh')} src='https://i.ibb.co/gRWFPxX/kisspng-yu-gi-oh-power-of-chaos-yugi-the-destiny-yu-gi-o-yu-5ae1602555ef55-960105721524719653352.png' size='small' />

                                    <Image className={this.state.cardBrand == 'Magic' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('Magic')} src='https://i.ibb.co/fXt8jnx/kisspng-magic-the-gathering-online-dominaria-playing-card-friends-gathering-5b0c43f601e504-904210801.png' size='small' />


                                </Form.Group>
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.setOpen}>
                            Nope
        </Button>
                        <Button
                            content="Yep, that's me"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={this.setOpen}
                            positive
                        />
                    </Modal.Actions>
                </Modal>
                <h1>Avaiable cards: {this.props.cards ? this.props.cards.length : 0}
                    <label className='filter'>
                        <div className='smallFilter'>
                            <p>  Name: {this.state.cardName}<br />
                                Brand:   {this.state.cardBrand}<br />
                                {this.state.cardPrice}&ge; price &le;{this.state.maxPrice}</p>


                        </div>








                    </label>
                    <div class='mio'>
                        <Icon name='search' onClick={this.search} />
                        <Button onClick={() => this.setOpen(true)}>Filter</Button>
                    </div>
                </h1>



                <div className='cardsContainer'>
                    {this.props.cards ? this.props.cards.map(item => {
                        return (
                            <ACards
                                card={item}
                                user={this.props.user}
                            />
                        );
                    }) : ''}
                </div>
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
        cards: state.user.cards,
        user: state.user.user
    }
}

export default connect(mapStateToProps, {

    addNewCard, card_list, search_card_list

})(BuyArea);
