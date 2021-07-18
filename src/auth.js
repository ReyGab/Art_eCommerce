class Auth {
  
    login(cb) {
      localStorage.setItem('isAuthenticated', true);
      cb();
    }

    logout(cb) {
      localStorage.setItem('isAuthenticated', false);
    }
  
    isAuthenticated() {
      const isAuth = localStorage.getItem('isAuthenticated');
      return JSON.parse(isAuth);
    }
  }
  
  export default new Auth();