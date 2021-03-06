import { actionTypes as types } from '../constants'

const INITIAL_STATE = {

}

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:

    case 'START_LOADING':

      return {
        ...state,

        loading: true
      }

    case 'END_LOADING':

      return {
        ...state,

        loading: false
      }

      case 'CHANGE_MENU':
      return {
        ...state,
        menu: action.payload,
      }

    case 'LOGIN_SUCCESS':

      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('username', action.payload.user.username)
      return {
        ...state,
      }

    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        showData: true,
      }
    
      case 'SET_CARDS':
      return {
        ...state,
        cards: action.payload,
        
      }
      case 'SET_STATS':
      return {
        ...state,
        stats: action.payload,
        
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }


    case 'SET_SUCCESS':

      return {
        ...state,
        user: {
          ...state.user,
        },
        messageType: 'success',
        message: action.payload,
        openMessage: true,
      }

    case 'SET_ERROR':
      return {
        ...state,
        user: {
          ...state.user,
        },
        messageType: 'error',
        message: action.payload,
        openMessage: true,
      }
    case 'CLOSE_MESSAGE':
      return {
        ...state,
        user: {
          ...state.user,
        },
        messageType: 'success',
        message: '',
        openMessage: false,
      }
      case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      }
      case 'OPEN_REFILL':
      return {
        ...state,
        open_refill: action.payload,
      }
      
    default:
      return state
  }
}

export default user
