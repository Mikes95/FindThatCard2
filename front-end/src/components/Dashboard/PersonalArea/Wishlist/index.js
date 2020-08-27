import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import './style.min.css'

import { Checkbox, Radio, Select, TextArea, Button, Message, Image, Input, Form, Dropdown, Menu, Table, Modal, Header, Segment, TableCell, Popup, Icon } from 'semantic-ui-react';

import { PayPalButton } from "react-paypal-button-v2";
import 'react-day-picker/lib/style.css';
import { add_to_wishlist ,buy,remove_from_wishlist} from '../../../../actions'
// Redux
import { connect } from 'react-redux'
import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
} from "react-image-magnifiers";



class Wishlist extends React.Component {
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
            errorMessage: '',
            open:false




        }
        this.setOpen = this.setOpen.bind(this)
        this.add_to_wishlist = this.add_to_wishlist.bind(this)
        this.buy = this.buy.bind(this)
        this.remove = this.remove.bind(this)
    }


    remove(){
        console.log('remove')
        this.props.remove_from_wishlist(this.props.card, this.props.user.username)
    }
    setOpen() {
        this.setState({ open: !this.state.open });
    }
    add_to_wishlist(){
        this.props.add_to_wishlist(this.props.card, this.props.user.username)
    }

    buy() {
      
        this.setOpen()
        this.props.buy(this.props.card, this.props.user.username)
    }

    render() {

        return (

            <div className="WishlistsingleCards">
                <div className="WishlisttitleContainer">
                <Modal
                    onClose={this.setOpen}
                    size={'mini'}
                    open={this.state.open}

                >
                    <Modal.Header>You are going yo buy:</Modal.Header>
                    <Modal.Content>

                        <div className="modalContainer">
                            <b className="description" >Name :</b>
                            <label className='price'>{this.props.card.name}</label>
                        </div>
                        <div className="modalContainer">
                            <b className="description" >Owner :</b>
                            <label className='price'>{this.props.card.username}</label>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black'
                        className='wish'
                        onClick={this.setOpen}>
                            Nope
        </Button>
                        <Button
                            className='buy'
                            content="Confirm"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={this.buy}
                            positive
                        />
                    </Modal.Actions>
                </Modal>
                <Icon name='close' onClick={this.remove} />
                    <h3>{this.props.card.name}</h3>
                  
                    <h2>
                        {this.props.card.brand == "Pokémon" ?
                            <Image className='WishlisttitleBrand' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png' /> :
                            this.props.card.brand == "Yugioh" ?
                                <Image className='WishlisttitleBrand' src='https://i.ibb.co/gRWFPxX/kisspng-yu-gi-oh-power-of-chaos-yugi-the-destiny-yu-gi-o-yu-5ae1602555ef55-960105721524719653352.png' /> :
                                this.props.card.brand == "Magic" ?
                                    <Image className='WishlisttitleBrand' src='https://i.ibb.co/fXt8jnx/kisspng-magic-the-gathering-online-dominaria-playing-card-friends-gathering-5b0c43f601e504-904210801.png' /> : ''}
                    </h2>

                </div>
                <div className="WishlistdetailContainer">
                    <div className="WishlisttextContainer">
                        <div className="WishlistconditionContainer">
                            <label className="Wishlistdescription" >Condition :</label>
                            <Popup content={this.props.card.condition} trigger={<img className={'face ' + this.props.card.condition} alt="" />} />
                        </div>

                        <div className="WishlistconditionContainer">
                            <label className="Wishlistdescription" >Price :</label>
                            <label className='Wishlistprice'>{this.props.card.price + "€"}</label>
                        </div>

                       {/*  <div className="WishlistconditionContainer">
                            <label className="Wishlistdescription" >Description :</label>
                            <label className='Wishlistprice'>{this.props.card.description}</label>
                        </div> */}
                        <div className='WishlistbuttonContainer'>
                            <Button className='Wishlistbuy' onClick={this.setOpen}>Buy</Button>
                          {/*   <Button onClick={this.add_to_wishlist} className='wish'>Wishlist</Button> */}
                        </div>
                    </div>
                    <div className="WishlistimgContainer">
                        {/*  <Image src={'http://127.0.0.1:5500/be/api/public/SellingCards/' + this.props.card.username + '/' + this.props.card.filename} /> */}
                        <GlassMagnifier
                            magnifierSize="60%"
                            allowOverflow={true}
                            imageSrc={'http://127.0.0.1:5500/be/api/public/SellingCards/' + this.props.card.username + '/' + this.props.card.filename}
                            imageAlt="Example"
                            largeImageSrc={'http://127.0.0.1:5500/be/api/public/SellingCards/' + this.props.card.username + '/' + this.props.card.filename} // Optional
                        />
                    </div>
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


    add_to_wishlist,
    remove_from_wishlist,
    buy
})(Wishlist);
