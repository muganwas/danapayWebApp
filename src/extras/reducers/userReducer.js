const defaultState = {
    user: { 
      username: '',
      password: '',
      loggedIn: false,
      registered: false
    },
    fetching: false,
    fetched: false,
    error: null
  }
  const userReducer = (state = defaultState, action)=>{
      switch(action.type){
          case "FETCH_USER_PENDING":{
            return {...state,
              fetched: false,
              error: null,
              fetching: true
            }
          }
          case "FETCH_USER_REJECTED":{
            return {...state,
              fetching: false,
              fetched: false,
              error: action.payload
            }
          }
          case "FETCH_USER_FULFILLED":{
            return {...state,
              fetched: true,
              fetching: false,
              error: false,
              user: action.payload
            }
          }
          default:
            return state;
      }  
  }
  
  export default userReducer;