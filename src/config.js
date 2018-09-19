const getHeader =  function () {
    const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + tokenData.access_token
    }
    return headers
  }
  const getUser = function () {
    const userData = JSON.parse(window.localStorage.getItem('authUser'))
    return userData
  }
  // Domain
  const apiDomain = 'http://127.0.0.1:3000'

  const loginURL = apiDomain + '/auth/login'
  const userURL = apiDomain + '/user'
  const userProfileURL = apiDomain + '/user/profile'

  const userAccountURL = apiDomain + '/user-account/sign-up'

  export {
    getHeader,
    getUser,
    apiDomain,
    loginURL,
    userAccountURL,
    userURL,
    userProfileURL
  }
  