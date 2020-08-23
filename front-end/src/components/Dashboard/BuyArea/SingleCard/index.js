import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import './style.min.css'

import { Checkbox, Radio, Select, TextArea, Button, Message, Image, Input, Form, Dropdown, Menu, Table, Modal, Header, Segment, TableCell, Popup, Icon } from 'semantic-ui-react';

import { PayPalButton } from "react-paypal-button-v2";
import 'react-day-picker/lib/style.css';

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



class SingleCard extends React.Component {
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



    }








    render() {

        return (

            <div className="singleCards">
                <div className="titleContainer">

                    <h3>{this.props.card.name}</h3>
                    <label className="divider">|</label>
                    <h2>{this.props.card.title}
                        {this.props.card.brand == "Pokémon" ?
                            <Image className='titleBrand' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png' size='small' /> :
                            this.props.card.brand == "Yugioh" ?
                                <Image className='titleBrand' src='https://i.ibb.co/gRWFPxX/kisspng-yu-gi-oh-power-of-chaos-yugi-the-destiny-yu-gi-o-yu-5ae1602555ef55-960105721524719653352.png' size='small' /> :
                                this.props.card.brand == "Magic" ?
                                    <Image className='titleBrand' src='https://i.ibb.co/fXt8jnx/kisspng-magic-the-gathering-online-dominaria-playing-card-friends-gathering-5b0c43f601e504-904210801.png' size='small' /> : ''}
                    </h2>

                </div>
                <div className="detailContainer">
                    <div className="textContainer">
                        <div className="conditionContainer">
                            <label className="description" >Condition :</label>
                            <Popup content={this.props.card.condition} trigger={<img className={'face ' + this.props.card.condition} alt="" />} />
                        </div>

                        <div className="conditionContainer">
                            <label className="description" >Price :</label>
                            <label className='price'>{this.props.card.price + "€"}</label>
                        </div>

                        <div className="conditionContainer">
                            <label className="description" >Description :</label>
                            <label className='price'>{this.props.card.description}</label>
                        </div>
                    </div>
                    <div className="imgContainer">
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



                {/*   <Icon name='home' size='large' /> */}
                {
                    console.log(this.props.card)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {



})(SingleCard);
