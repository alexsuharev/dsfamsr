<template>
    <v-app>
        <v-main class="auth__main">
            <v-container class="auth__container" fluid>
                <Nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
  export default {
    name: "AuthLayout",
  }
</script>

<style lang="scss" scoped>
    .auth {
        &__main {}
        &__container {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>