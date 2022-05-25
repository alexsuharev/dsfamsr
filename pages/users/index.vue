<template>
  <div class="wrapper">
    <div class="d-flex align-items-center justify-space-between mb-5">
      <pages-title text="Пользователи" :has-margin="false" />

      <v-dialog v-model="newUser.isOpened" width="900">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" x-large class="ml-4" v-on="on">
            Создать пользователя
          </v-btn>
        </template>

        <v-card>
          <v-form @submit.prevent="createNewUser">
            <v-card-title>
              <div class="d-flex align-center justify-space-between" style="width: 100%">
                <div class="text-h5">
                  Новый пользователь
                </div>
              </div>
              
            </v-card-title>
              
            <v-card-text>
              <v-text-field
                v-model="newUser.name"
                label="ФИО"
                hide-details
                outlined
                class="mb-4"
                required
              />
              <v-text-field
                v-model="newUser.email"
                label="Email"
                type="email"
                hide-details
                outlined
                class="mb-4"
                required
              />
              <v-text-field
                v-model="newUser.password"
                label="Пароль"
                hide-details
                outlined
                class="mb-4"
                required
              />
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">
                Создать
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table :headers="headers" :items="getUsers" :items-per-page="5" class="elevation-1">
      <template #[`item.user`]="{ item }">
        <v-btn
:to="{ name: 'users-userId', params: {userId: item.id} }"
class="ma-2" color="yellow" text-color="black">
          {{ item.name }}
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
  export default {
    name: "SecondaryPage",
    computed: {
      // PagesTitle: () => import('~/components/PagesTitle.vue')
      ...mapGetters('users', ['getUsers']),
    },
    data: () => ({
      newUser: {
        isOpened: false,
        name: '',
        email: '',
        password: ''
      },
      headers: [
        {
          text: 'ФИО',
          align: 'start',
          value: 'user',
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Рабочий Телефон',
          value: 'phone_work'
        },
        // { text: '', value: 'actions', sortable: false },
      ],
    }),
    mounted() {
      this.setUsers()
    },
    methods: {
      ...mapActions('users', ['setUsers']),
      filtering(item, queryText, itemText) {
        if (!`${JSON.stringify(item)}`.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())) return false;
        return item;
      },
      save (date) {
        this.$refs.menu.save(date)
      },
      createNewUser() {
        this.$axios.$post(`http://dsfamsr.ru/api/users`, this.newUser).then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }
  // TODO Сделать Удаление пользователя
</script>
