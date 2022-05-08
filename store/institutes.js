export const state = () => ({
    data: [],
});

export const mutations = {
    setInstitutes(state, data) {
      state.data = data;
    }
}

export const actions = {
    setInstitutes(context) {
        this.$axios.$get('http://localhost:8000/api/institutes').then(result => {
            console.log('institutes.setInstitutes', result);
            context.commit('setInstitutes', result);
        }).catch(error => {
            console.log(error);
        });
    },
    createInstitute(context, data) {
        return new Promise((resolve, reject) => {
            this.$axios.$post('http://localhost:8000/api/institutes', data).then(result => {
                context.dispatch('setInstitutes');
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })
    },
}

export const getters = {
    getInstitutes: (state) => {
      return state.data;
    },
}