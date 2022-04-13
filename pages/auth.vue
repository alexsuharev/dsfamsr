<template>
  <v-card width="600" outlined :loading="isLoading" :disabled="isLoading">
    <v-form @submit.prevent="login">
      <v-card-title>Вход</v-card-title>
      <v-card-text>
        <v-text-field v-model="email" label="Логин" type="text" outlined hide-details class="mb-3"></v-text-field>
        <v-text-field v-model="password" label="Пароль" type="password" outlined hide-details></v-text-field>
      </v-card-text>
      <v-card-text class="pt-0 d-flex justify-end">
        <v-btn color="primary" type="submit" :loading="isLoading">
          Войти
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    name: "AuthPage",
    layout: 'auth',
    data: () => ({
      isLoading: false,
      email: '',
      password: ''
    }),
    methods: {
      async login() {
        this.isLoading = true;
        await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$router.push({
            name: 'index'
          });
          this.$toast.success(`Привет, ${user.user.email}`);
        }).catch((error) => {
          this.$toast.error(error.message);
        });
        this.isLoading = false;
      },
    }
  }

</script>
