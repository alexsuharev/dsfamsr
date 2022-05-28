<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container fluid class="py-0 fill-height">
        <nuxt-link :to="{name: 'users-userId', params: {userId: $auth.user.id}}" class="d-flex align-center">
          <!-- <v-avatar size="36px" color="primary" class="mr-4"> -->
            <!-- <img alt="Avatar" src="https://thispersondoesnotexist.com/image"> -->
            <!-- <v-icon v-else color="#fff">mdi-account</v-icon> -->
          <!-- </v-avatar> -->
          <strong>{{ $auth.user.name }}</strong>
        </nuxt-link>

        <v-spacer></v-spacer>

        <!-- <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive> -->
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="link in links" :key="link.index" :to="{name: link.url }" exact>
                  <v-list-item-icon class="mr-2">
                    <v-icon v-text="link.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ link.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                  @click="logout"
                >
                  <v-list-item-icon class="mr-2">
                    <v-icon>
                      mdi-exit-run
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Выход
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="pa-4"
            >
              <Nuxt />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: "DefaultLayout",
    data: () => ({
      links: [
        {
          text: 'Главная',
          url: 'index',
          icon: 'mdi-home'
        },
        {
          text: 'Заявки',
          url: 'requests',
          icon: 'mdi-chart-box'
        },
        {
          text: 'Пользователи',
          url: 'users',
          icon: 'mdi-account-multiple'
        },
        {
          text: 'Образовательные учреждения',
          url: 'objects',
          icon: 'mdi-town-hall'
        }
      ]
    }),
    created() {
      this.setData();
      this.setInstitutes();
      this.setUsers();
    },
    methods: {
      ...mapActions('items', ['setData']),
      ...mapActions('institutes', ['setInstitutes']),
      ...mapActions('users', ['setUsers']),
      async logout() {
        await this.$auth.logout();
        this.$router.push({name: 'login'})
      }
    }
  }
</script>