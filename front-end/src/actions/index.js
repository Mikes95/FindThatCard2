import { actionTypes as types, urls } from '../constants'
import { post } from '../helpers'

const API = 'http://localhost:3000'
const token = localStorage.getItem('token')


export const closeMessage = () => dispatch => {
  console.log('chiudo il mex')
  dispatch({
    type: 'CLOSE_MESSAGE',
  })
}


export const changeMenu = (menu) => dispatch => {
  console.log('changeMenu', menu)
  dispatch({
    type: 'CHANGE_MENU',
    payload: menu
  })
}




export const signup = (email, username, password) => dispatch => {
  dispatch({
    type: 'START_LOADING',
  })
  console.log('action login', email)
  var data = { 'email': email, 'username': username, 'password': password }
  fetch(API + '/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson)
      dispatch({
        type: 'END_LOADING',
      })
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })


      !resJson.error ?
        window.location = '/login' : ''

    })
}

export const login = (email, password) => dispatch => {
  dispatch({
    type: 'START_LOADING',
  })
  console.log('action login', email)
  var data = { 'username': email, 'password': password }
  fetch(API + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {
      dispatch({
        type: 'END_LOADING',
      })
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })
      if (resJson.error == false) {
        dispatch({
          type: 'SET_USER',
          payload: resJson.user
        })
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: resJson
        })
        window.location = '/dashboard'
      }
      /*  !resJson.error ?
         dispatch({
           type: 'LOGIN_SUCCESS',
           payload: resJson.token
         }) : '' */

      /* !resJson.error ?
        window.location = '/homepage' : '' */

    })
}






export const user_detail = (username) => dispatch => {
  console.log('userdetail')
  dispatch({
    type: 'START_LOADING',
  })

  var data = { 'username': username }
  fetch(API + '/user/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {
      dispatch({
        type: 'END_LOADING',
      })

      if (resJson.error == false) {
        dispatch({
          type: 'SET_USER',
          payload: resJson.user
        })
      }

    })
}



export const payment = (username, money, payment_data) => dispatch => {
  console.log('payment', payment_data)


  var data = { 'username': username, 'money': money, 'payment_data': payment_data }
  fetch(API + '/user/refill', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {

      if (resJson.error == false) {
        dispatch({
          type: 'SET_USER',
          payload: resJson.user
        })
      }
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })
    })
}


export const addNewCard = (data, file) => dispatch => {

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  formData.append('file', file);
  console.log('addNewCard', formData)

  fetch(API + '/user/newcard', {
    method: 'POST',
    headers: {

      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: formData
  })
    .then(response => response.json())

    .then(resJson => {
      dispatch({
        type: 'END_LOADING',
      })
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })
      if (resJson.error == false) {

        /*  window.location = '/dashboard' */
      }
      /*  !resJson.error ?
         dispatch({
           type: 'LOGIN_SUCCESS',
           payload: resJson.token
         }) : '' */

      /* !resJson.error ?
        window.location = '/homepage' : '' */

    })
}


export const RemoveCard = (username, card) => dispatch => {
  console.log('RemoveCard', username, card)


  var data = { 'username': username, 'data': card, }
  fetch(API + '/user/remove-card', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {

      if (resJson.error == false) {
        dispatch({
          type: 'SET_CARDS',
          payload: resJson.items
        })
      }
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })
    })
}


export const card_list = (data) => dispatch => {

  console.log('card_list')
  dispatch({
    type: 'START_LOADING',
  })

  var data = { 'data': data }
  fetch(API + '/card/cardlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {

      dispatch({
        type: 'SET_CARDS',
        payload: resJson.items
      })

      dispatch({
        type: 'END_LOADING',
      })



    })
}


export const search_card_list = (data) => dispatch => {

  console.log('search_card_list', data)
  dispatch({
    type: 'START_LOADING',
  })

  var dd = { 'data': data }
  fetch(API + '/card/searchcardlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(dd),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {

      dispatch({
        type: 'SET_CARDS',
        payload: resJson.items
      })

      dispatch({
        type: 'END_LOADING',
      })




    })
}

export const add_to_wishlist = (data, username) => dispatch => {

  console.log('wishlist', data, username)


  dispatch({
    type: 'START_LOADING',
  })
  var dd = {
    'data': data,
    'username': username,
  }
  fetch(API + '/user/wishlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(dd),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {
      if (!resJson.error) {
        dispatch({
          type: 'SET_USER',
          payload: resJson.user
        })

        dispatch({
          type: 'END_LOADING',
        })
      }
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })



    })
}

export const remove_from_wishlist = (data, username) => dispatch => {

  console.log('remove_from_wishlist', data, username)


  dispatch({
    type: 'START_LOADING',
  })
  var dd = {
    'data': data,
    'username': username,
  }
  fetch(API + '/user/remove-wishlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(dd),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {
      if (!resJson.error) {
        dispatch({
          type: 'SET_USER',
          payload: resJson.user
        })

        dispatch({
          type: 'END_LOADING',
        })
      }
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })



    })
}


export const stats = (username) => dispatch => {
  console.log('stats', username)
  fetch(API + '/user/stats' + `?username=${encodeURIComponent(username)}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors',
  })
    .then(response => response.json())
    .then(resJson => {
      if (!resJson.error) {
        dispatch({
          type: 'SET_STATS',
          payload: resJson.stats
        })
      }
    })
}




export const buy = (data, username) => dispatch => {

  console.log('buy', data, username)


  dispatch({
    type: 'START_LOADING',
  })
  var dd = {
    'data': data,
    'username': username,
  }
  fetch(API + '/user/buy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(dd),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {
      if (!resJson.error) {
        dispatch({
          type: 'SET_USER',
          payload: resJson.user
        })

        dispatch({
          type: 'SET_CARDS',
          payload: resJson.cards
        })
      }
      dispatch({
        type: 'END_LOADING',
      })
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })



    })
}
export const open_refill = (open) => dispatch => {
  console.log('open_refill')
  dispatch({
    type: 'OPEN_REFILL',
    payload: open
  })
}

export const update_address = (data, username) => dispatch => {

  console.log('update_address', data, username)


  dispatch({
    type: 'START_LOADING',
  })
  var dd = {
    'data': data,
    'username': username,
  }
  fetch(API + '/user/address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(dd),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {
      if (!resJson.error) {
        dispatch({
          type: 'SET_USER',
          payload: resJson.user
        })
      }
      dispatch({
        type: 'END_LOADING',
      })
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })



    })
}

export const get_orders = (username) => dispatch => {
  console.log('userdetail')


  var data = { 'username': username }
  fetch(API + '/user/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {

      if (resJson.error == false) {
        dispatch({
          type: 'SET_ORDERS',
          payload: resJson.orders
        })
      }

    })
}



export const mod_order = (username, id, status) => dispatch => {
  console.log('confirm_received')


  var data = {
    'username': username,
    'id': id,
    'status': status
  }
  fetch(API + '/user/confirm-received', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(response => response.json())

    .then(resJson => {

      if (resJson.error == false) {
        dispatch({
          type: 'SET_ORDERS',
          payload: resJson.orders
        })
      }
      dispatch({
        type: resJson.error ? 'SET_ERROR' : 'SET_SUCCESS',
        payload: resJson.message,
      })

    })
}