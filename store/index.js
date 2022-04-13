const strict = false;
const actions = {
  async onAuthStateChangedAction(state, {
    authUser,
    claims
  }) {
    if (!authUser) {
      // remove state
      await state.commit('SET_USER', null)

      // redirect from here
      this.$router.push({
        name: "auth",
      })
    } else {
      state.commit('SET_USER', authUser)
    }
  },
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

const state = () => ({
  user: null,
})

const getters = {
  getUser(state) {
    return state.user
  },
}

export default {
  strict,
  state,
  actions,
  mutations,
  getters,
}
