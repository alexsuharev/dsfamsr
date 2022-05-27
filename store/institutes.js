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
        this.$axios.$get('/institutes').then(result => {
            console.log('institutes.setInstitutes', result);
            context.commit('setInstitutes', result);
        }).catch(error => {
            console.log(error);
        });
    },
    createInstitute(context, data) {
        return new Promise((resolve, reject) => {
            this.$axios.$post('/institutes', data).then(result => {
                context.dispatch('setInstitutes');
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })
    },
    getSingleInstitute(context, instituteId) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/institutes/${instituteId}`).then(result => {
                // context.dispatch('setInstitutes');
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })
    },
    patchInstitute(context, data) {
        return new Promise((resolve, reject) => {
            this.$axios.$patch(`/institutes/${data.id}`, data).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })
    },
    createDevice(context, data) {
        return new Promise((resolve, reject) => {
            this.$axios.$post('/devices', data).then(result => {
                console.log('createDevice', result);
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })
    },
    saveDevice(context, data) {
        return new Promise((resolve, reject) => {
            this.$axios.$patch(`/devices/${data.id}`, data).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })
    },
    deleteDevice(context, data) {
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`/devices/${data.id}`).then(result => {
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
    }
}