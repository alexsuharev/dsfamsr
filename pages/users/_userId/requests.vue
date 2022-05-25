<template>
    <div class="wrapper">
        <div v-if="user" class="d-flex align-items-center justify-space-between mb-5">
            <pages-title :text="user.name" :has-margin="false" />
        </div>
        <pre v-if="user">
            {{ user }}
        </pre>
        <pre v-if="items">
            {{ items }}
        </pre>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'UserRequests',
    data: () => ({
        user: null,
        items: null
    }),
    computed: {
        userId() {
            return this.$route.params.userId
        },
    },
    mounted() {
        this.getSingleUser(this.userId).then(result => {
            this.user = result;
        }).catch(error => {
            console.log(error);
        });
        this.getUsersItems(this.userId).then(result => {
            this.items = result;
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        ...mapActions('users', ['getSingleUser', 'getUsersItems'])
    }
}
</script>