export const state = () => ({
    data: [],
});

export const mutations = {
    setData(state, data) {
      state.data = data;
    }
}

export const actions = {
    setData(context) {
        this.$axios.$get('http://localhost:8000/api/items').then(result => {
            console.log('items.setData', result);
            context.commit('setData', result);
        }).catch(error => {
            console.log(error);
        });
    },
    createItem(context, data) {
        console.log('createItem', data)
        return new Promise((resolve, reject) => {
            this.$axios.$post('http://localhost:8000/api/items', data).then(result => {
                console.log('items.createItem', result, data);
                context.dispatch('setData');
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })
    },
    getSingleItem(context, itemId) {
        // console.log('items.getSingleItem', itemId)
        return new Promise((resolve, reject) => {
            this.$axios.$get(`http://localhost:8000/api/items/${itemId}`).then(result => {
                console.log('items.getSingleItem', result);
                // context.dispatch('setData');
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },
    changeStatus(context, data) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`http://localhost:8000/api/items/change-status`, data).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
}

export const getters = {
    getItems: (state) => {
      return state.data;
    },
}