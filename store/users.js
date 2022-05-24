export const state = () => ({
    list: [],
  });
  
  export const mutations = {
    setUsers(state, list) {
      state.list = list;
    }
  }
  
  export const actions = {
    setUsers(context) {
        this.$axios.$get('http://localhost:8000/api/users').then(result => {
            console.log('users.setUsers', result);
            context.commit('setUsers', result);
        }).catch(error => {
            console.log(error);
        });
    },
    getSingleUser(context, userId) {
      // console.log('users.getSingleuser', userId)
      return new Promise((resolve, reject) => {
          this.$axios.$get(`http://localhost:8000/api/users/${userId}`).then(result => {
              console.log('users.getSingleuser', result);
              // context.dispatch('setData');
              resolve(result);
          }).catch(error => {
              reject(error);
          });
      });
  },
  }
  
  export const getters = {
    getUsers: (state) => {
      return state.list;
    },
  }