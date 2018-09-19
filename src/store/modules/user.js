import axios from 'axios'
import router from '../../router/index'
import { getHeader, getUser, userAccountURL, loginURL,userURL, userProfileURL} from '../../config'

const state = {
    user: 'Hay'
}
const actions = {
  getUserProfile: ({ state, commit }) => {
    let id = getUser().user.id
    axios.get(userProfileURL +'/'+id, {
        headers: getHeader()
    }).then((res)=> {
        console.log('Get User Profile')
        state.user = res.data.data
    })
  },
  updateUserProfile: ({state}, payload) => {
      axios.put(userProfileURL+'/'+getUser().user.id, payload, {
          headers: getHeader()
      }).then((res)=> {
          console.log(res)
      }, (err)=> {
          console.log(err)
      })
  },
  login: ({state}, payload) => {
    let authUser = {};
    axios.post(loginURL, payload).then(
      response => {
          if (response.status === 200) {
              authUser.access_token = response.data.token;
              authUser.user = response.data.user;
              window.localStorage.setItem("authUser", JSON.stringify(authUser));
              console.log('Login Success')
              router.push({ path: '/' })
          }
      },
      err => {
        Javascript: window.alert("Periksa kembali username / password.");
      }
    )
  },
  signUp: ({state, commit}, payload) => {
    axios.post(userAccountURL, payload).then((res)=> {
      alert('Account is created')
      let authUser = {};
      axios.post(loginURL, payload).then(
      response => {
        if (response.status === 200) {
          authUser.access_token = response.data.token;
          authUser.user = response.data.user;
          window.localStorage.setItem("authUser", JSON.stringify(authUser));
          console.log('Login Success')
          router.push({ path: '/' })
        }
      },err => {
        Javascript: window.alert("Periksa kembali username / password.");
      })
    }, (err)=> {
      console.log(err)
      alert('Failed')
    })
  },
  logout: (context, payload) => {
    if (window.localStorage.getItem('authUser')) {
        console.log('Logged out from system...')
        window.localStorage.removeItem('authUser')
        router.push({ path: '/login' })
    }
  }
}
const mutations = {
  updateTables: (state, { tables }) => {
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
