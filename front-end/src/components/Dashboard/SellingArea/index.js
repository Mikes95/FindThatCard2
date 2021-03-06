import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import './style.min.css'

import { Checkbox, Radio, Select, TextArea, Button, Message, Image, Input, Form, Dropdown, Menu, Table, Modal, Header, Segment, TableCell, Popup } from 'semantic-ui-react';

import { PayPalButton } from "react-paypal-button-v2";
import 'react-day-picker/lib/style.css';
import { addNewCard,changeMenu } from '../../../actions'
// Redux
import { connect } from 'react-redux'


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

class SellingArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    getUploadParams = ({ file, meta }) => {
        const body = new FormData()
        body.append('fileField', file)
        console.log(file, meta)
        this.setState({ file: meta });
        return { url: 'https://httpbin.org/post', body }
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
        this.setState({ rechanrgeModal: val });
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

        let data = {
            'username': this.props.user.username,
            'title': this.state.articleTitle,
            'name': this.state.cardName,
            'brand': this.state.cardBrand,
            'price': parseFloat(this.state.cardPrice),
            'condition': this.state.value,
            'description': this.state.description,
        }
        

        if (data.title.length < 1) {
            console.log('Please insert a title')
            this.setState({ error: true });
            this.setState({ errorMessage: 'Please insert a title' });
            return
        }
        else if (data.name.length < 1) {
            console.log('Please insert a name')
            this.setState({ error: true });
            this.setState({ errorMessage: 'Please insert a name' });
            return
        }
        else if (data.brand.length < 1) {
            console.log('Please choose a brand')
            this.setState({ error: true });
            this.setState({ errorMessage: 'Please choose a brand' });
            return
        }
        else if (data.price < 0) {
            console.log('Please insert a price')
            this.setState({ error: true });
            this.setState({ errorMessage: 'Please insert a price' });
            return
        }
        else if (!this.state.value) {
            console.log('Please choose a condition,',this.state.value)
            this.setState({ error: true });
            this.setState({ errorMessage: 'Please choose a condition' });
            return
        }
        else if (data.description.length < 1) {
            console.log('Please insert a description')
            this.setState({ error: true });
            this.setState({ errorMessage: 'Please insert a description' });
            return
        }
        else if (!this.state.file) {
            console.log('Please choose a file')
            this.setState({ error: true });
            this.setState({ errorMessage: 'Please choose a file' });
            return
        }

        this.setState({ error: false });
        this.setState({ errorMessage: '' });
        this.props.changeMenu(0)
        this.props.addNewCard(data, this.state.file)
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

            <div className="SellingAreaContainer">
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
                    {/*                  <Modal.Actions>
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
                    </Modal.Actions> */}
                </Modal>
                <Form>
                    <Form.Field
                        control={Input}
                        name='articleTitle'
                        onChange={(event) => { this.handleChange(event) }}
                        value={this.state.articleTitle}
                        label="Article's title"
                        placeholder="Article's title"

                    />
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            label="Card's name"
                            placeholder="Card's name"
                            name='cardName'
                            onChange={(event) => { this.handleChange(event) }}
                            value={this.state.cardName}
                        />
                        <Form.Field
                            control={Input}
                            label="Card's price"
                            placeholder="Card's price"
                            type='number'
                            max={100}
                            min={1}
                            name='cardPrice'
                            onChange={(event) => { this.handleChange(event) }}
                            value={this.state.cardPrice}
                        />
                        {/*  <Form.Field
                            control={Select}
                            label='Gender'
                            options={options}
                            placeholder='Gender'
                        /> */}
                    </Form.Group>
                    <Form.Group inline>
                        <label>Card brand</label>


                        <Image className={this.state.cardBrand == 'Pokémon' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('Pokémon')} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png' size='small' />

                        <Image className={this.state.cardBrand == 'Yugioh' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('Yugioh')} src='https://i.ibb.co/gRWFPxX/kisspng-yu-gi-oh-power-of-chaos-yugi-the-destiny-yu-gi-o-yu-5ae1602555ef55-960105721524719653352.png' size='small' />

                        <Image className={this.state.cardBrand == 'Magic' ? 'imgSelected' : 'imgNotSelected'} onClick={() => this.cardBrand('Magic')} src='https://i.ibb.co/fXt8jnx/kisspng-magic-the-gathering-online-dominaria-playing-card-friends-gathering-5b0c43f601e504-904210801.png' size='small' />


                    </Form.Group>
                    <Form.Group inline>
                        <label>Card's condition</label>
                        <Form.Radio
                            label='Poor'
                            value='poor'
                            checked={value === 'poor'}
                            onChange={this.handleChange2}
                        />
                        <Form.Radio
                            label='Good'
                            value='good'
                            checked={value === 'good'}
                            onChange={this.handleChange2}
                        />
                        <Form.Radio
                            label='Near Mint'
                            value='near-mint'
                            checked={value === 'near-mint'}
                            onChange={this.handleChange2}
                        />
                        <Form.Radio
                            label='Mint'
                            value='mint'
                            checked={value === 'mint'}
                            onChange={this.handleChange2}
                        />
                    </Form.Group>

                    <Form.Field
                        control={TextArea}
                        label='Description'
                        placeholder='Tell us more about this card'
                        name='description'
                        onChange={(event) => { this.handleChange(event) }}
                        value={this.state.description}
                    />
                    <Form.Field
                        control={Checkbox}
                        label='I agree to the Terms and Conditions'
                    />
                    {/* <Dropzone
                        getUploadParams={this.getUploadParams}
                        onChangeStatus={this.handleChangeStatus}
                 
                        accept="image/*"
                    /> */}
                    <input type="file" name="file" onChange={this.onChangeHandler} />
                    {this.state.error ? <Message
                        negative
                        icon='warning sign'
                        header='Something is missing'
                        content={this.state.errorMessage}
                        onDismiss={this.props.closeMessage}
                    />:''}
                    <Button fluid onClick={this.sendCards}>Submit</Button>

                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {

    addNewCard,
    changeMenu

})(SellingArea);
