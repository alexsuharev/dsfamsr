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
            </v-card-text>
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
    }
  }
  // TODO Сделать Удаление пользователя
</script>
