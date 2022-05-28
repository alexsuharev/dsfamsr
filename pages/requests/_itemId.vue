<template>
  <div class="wrapper">
    <div v-if="item" class="d-flex align-center justify-space-between mb-5">
      <div class="d-flex align-center">
        <v-dialog v-model="newRequestForm.isOpened" width="900">
          <template #activator="{ on, attrs }">
            <v-btn icon class="mr-4" v-bind="attrs" v-on="on">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-form @submit.prevent="onFormSubmit">
              <v-card-title class="text-h5">
                Редактирование заявки
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col :cols="item.type === 'Допостaвка карт' ? 6 : 4">
                    <v-select
v-model="item.type" :items="newRequestForm.data.type.items"
                      label="Тип заявки" outlined hide-details class="mb-0" />
                  </v-col>
                  <v-col :cols="item.type === 'Допостaвка карт' ? 6 : 4">
                    <v-select
                      v-model="item.proirity"
                      :items="newRequestForm.data.priority.items" label="Приоритет" outlined hide-details
                      class="mb-0" />
                  </v-col>
                  <v-col v-if="item.type === 'Сервисное обслуживание'" cols="4">
                    <v-autocomplete
                      v-model="item.request_type"
                      :items="newRequestForm.data.request_type.items" outlined label="ЗНО" clearable class="mb-0"
                      hide-details />
                  </v-col>
                  <v-col v-if="item.type === 'Выезды'" cols="4" class="d-flex align-center">
                    <v-switch v-model="item.teaching" label="Обучение" hide-details class="ma-0 pa-0" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col :cols="item.type === 'Допостaвка карт' ? 8 : 12">
                    <v-autocomplete
v-model="item.institute" :items="getInstitutes" outlined
                      label="Образовательное учреждение" clearable :filter="filtering" class="mb-0" hide-details>
                      <template #selection="data">
                        <div>
                          <div>
                            <strong>{{ data.item.gk_name }}</strong>
                          </div>
                          <div>
                            <span>{{ data.item.gk_address }}</span>
                          </div>
                        </div>
                      </template>
                      <template #item="data">
                        <template>
                          <v-list-item-content>
                            <v-list-item-title>{{ data.item.gk_name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ data.item.gk_address }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ data.item.ifentificator }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col v-if="item.type === 'Допостaвка карт'" cols="4">
                    <v-text-field
v-model="item.cards_amount" type="number" min="1"
                      label="Количество карт" outlined hide-details>
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row class="mb-4">
                  <v-col cols="4">
                    <v-text-field
v-model="item.requestor_name" label="ФИО заявителя" outlined
                      hide-details>
                    </v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
v-model="item.requestor_phone" label="Телефонный номер заявителя"
                      outlined hide-details></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-autocomplete
v-model="item.user" :items="getUsers" outlined label="Исполнитель"
                      clearable class="mb-0" hide-details>
                      <template #selection="data">
                        {{ data.item.name }}
                      </template>
                      <template #item="data">
                        {{ data.item.name }}
                      </template>
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-textarea
v-model="item.description" outlined label="Описание" hide-details
                  class="mb-4" rows="1">
                </v-textarea>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
v-model="item.incedent_number" label="Номер инцидента" outlined
                      hide-details>
                    </v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-menu
v-model="item.datePicker" transition="scale-transition" offset-y
                      min-width="auto">
                      <template #activator="{ on, attrs }">
                        <v-text-field
v-model="computedDateFormattedMomentjs" label="Крайная дата выполнения"
                          prepend-icon="mdi-calendar" v-bind="attrs" outlined v-on="on"></v-text-field>
                      </template>
                      <v-date-picker
v-model="item.date" locale="ru-RU"
                        @input="item.datePicker = false">
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="4">
                    <v-menu
ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                      :return-value.sync="item.expires_at_time" transition="scale-transition" offset-y max-width="290px"
                      min-width="290px">
                      <template #activator="{ on, attrs }">
                        <v-text-field
v-model="item.expires_at_time" label="Крайнее время выполнения"
                          prepend-icon="mdi-clock-time-four-outline" v-bind="attrs" outlined v-on="on"></v-text-field>
                      </template>
                      <v-time-picker
v-if="menu2" v-model="item.expires_at_time" full-width format="24hr"
                        @click:minute="$refs.menu.save(item.expires_at_time)">
                      </v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">
                  Сохранить
                  <v-icon right>
                mdi-check
              </v-icon>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <pages-title
:text="`Заявка №${itemId} от ${$moment(item.created_at).format('YYYY-MM-DD')}`"
          :has-margin="false" />
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-sheet v-bind="attrs" width="20" height="20" class="ml-4" :color="color" rounded v-on="on" />
          </template>
          <span>Приоритет: {{ item.proirity }}</span>
        </v-tooltip>
        <v-sheet class="ml-4" width="200">
          <v-select
:items="statuses" :value="item.status" label="Статус заявки" outlined dense hide-details
            @change="updateStatus" />
        </v-sheet>
      </div>
      <nuxt-link :to="{name: 'users-userId-requests', params: {userId: item.user.id}}" class="d-flex align-center">
        <v-avatar size="36px" color="primary" class="mr-4">
          <img v-if="item.user.avatar" alt="Avatar" :src="item.user.avatar">
          <v-icon v-else color="#fff">mdi-account</v-icon>
        </v-avatar>
        <strong>{{ item.user.name }}</strong>
      </nuxt-link>
    </div>
    <div v-if="item">
      <div class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">ТИП</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ item.type }}</div>
      </div>
      <v-divider />
      <div v-if="item.request_type" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">ЗНО</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ item.request_type }}</div>
      </div>
      <v-divider v-if="item.request_type" />
      <div v-if="item.teaching === 0 || item.teaching === 1" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">Обучение</div>
        <v-switch v-model="item.teaching" disabled hide-details class="ma-0 pa-0" />
      </div>
      <v-divider v-if="item.teaching === 0 || item.teaching === 1" />
      <div v-if="item.requestor_name" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">ФИО заявителя</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ item.requestor_name }}</div>
      </div>
      <v-divider v-if="item.requestor_name" />
      <div v-if="item.requestor_phone" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">Телефонный номер заявителя</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ item.requestor_phone }}</div>
      </div>
      <v-divider v-if="item.requestor_phone" />
      <div v-if="+item.cards_amount > 0" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">КОЛИЧЕСТВО КАРТ</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ item.cards_amount }}</div>
      </div>
      <v-divider v-if="+item.cards_amount > 0" />
      <div v-if="item.description" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">ОПИСАНИЕ</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ item.description }}</div>
      </div>
      <v-divider v-if="item.description" />
      <div v-if="item.incedent_number" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">НОМЕР ИНЦИДЕНТА</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ item.incedent_number }}</div>
      </div>
      <v-divider v-if="item.incedent_number" />
      <div v-if="item.expires_at_date && item.expires_at_time" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">КРАЙНИЙ СРОК</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{item.expires_at_date}}
          {{item.expires_at_time}} ( {{ $moment(`${item.expires_at_date} ${item.expires_at_time}`).fromNow() }} )</div>
      </div>
      <v-divider v-if="item.expires_at_date && item.expires_at_time" />
      <div v-if="item.institute" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">
          <nuxt-link :to="{ name: 'objects-objectId', params: {objectId: item.institute.identificator} }">
            {{ item.institute.gk_name }}</nuxt-link>
        </div>
      </div>
      <v-divider v-if="item.institute" />
      <div v-if="item.comment" class="d-flex align-center justify-space-between">
        <div class="text-button" style="width: 50%;">КОММЕНТАРИЙ ИСПОЛНИТЕЛЯ</div>
        <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ item.comment }}</div>
      </div>
      <v-divider v-if="item.comment" />
    </div>
    <v-row v-if="item">
      <v-col cols="6">
        <v-card class="mt-4">
          <v-card-title>
            Комментарий
          </v-card-title>
          <v-form @submit.prevent="addComment">
            <v-card-text>
              <v-textarea v-model="comment" outlined label="Комментарий исполнителя" hide-details rows="10" />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">
                Добавить
                <v-icon right>
                mdi-plus
              </v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="mt-4">
          <v-card-title>
            Отчет по заявкам
          </v-card-title>
          <v-form target="downloadframe" method="POST" action="https://dsfamsr.ru/api/report/365">
            <v-card-text>
              <v-date-picker
                v-model="dates"
                full-width
                range
              />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">
                Скачать отчет
                <v-icon right>
                  mdi-printer
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-skeleton-loader
v-if="!item"
      type="table-heading, image, list-item-two-line, list-item-two-line, list-item-two-line, list-item-two-line, actions" />
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    name: 'SingleItemPage',
    data: () => ({
      dates: [],
      item: null,
      statuses: ['Создана', 'В обработке', 'Обработана'],
      comment: '',
      time: null,
      menu2: false,
      newRequestForm: {
        isOpened: false,
        IsProgressed: false,
        data: {
          type: {
            items: [
              'Сервисное обслуживание',
              'Выезды',
              'Допостaвка карт'
            ]
          },
          priority: {
            items: [
              'Низкий',
              'Средний',
              'Высокий',
              'Критический',
            ]
          },
          request_type: {
            items: [
              'Демонтаж оборудования',
              'Демонтаж СКУД',
              'Монтаж оборудования',
              'Монтаж СКУД',
              'Перенос оборудования',
              'Ремонт СКУД',
            ]
          },
        }
      },
    }),
    computed: {
      ...mapGetters('users', ['getUsers']),
      ...mapGetters('institutes', ['getInstitutes']),
      computedDateFormattedMomentjs: {
        get() {
          console.log(this.item.expires_at_date);
          return this.item.expires_at_date ? this.$moment(`${this.item.expires_at_date} ${this.item.expires_at_time}`).format('DD/MM/YY') : ''
        },
        set(newDate) {
          const date = this.$moment(newDate, 'DD/MM/YY', true);
          if (date.isValid()) {
            console.log('newDate', this.$moment(date).format('YYYY-MM-DD'));
            this.item.expires_at_date = this.$moment(date).format('YYYY-MM-DD');
          }
        }
      },
      itemId() {
        return this.$route.params.itemId
      },
      color() {
        let color = 'primary';
        switch (this.item.proirity) {
          case ('Низкий'):
            color = 'success';
            break;
          case ('Средний'):
            color = 'info';
            break;
          case ('Высокий'):
            color = 'warning';
            break;
          case ('Критический'):
            color = 'error';
            break;
          default:
            color = 'primary';
            break;
        }
        return color;
      }
    },
    mounted() {
      this.getSingleItem(this.itemId).then(response => {
        this.item = response;
      });
    },
    methods: {
      ...mapActions('items', ['getSingleItem', 'changeStatus']),
      updateStatus(data) {
        this.changeStatus({
          new_status: data,
          id: this.itemId
        }).then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        })
      },
      addComment() {
        this.$axios.$post(`/items/add-comment`, {
          comment: this.comment,
          id: this.itemId
        }).then(result => {
          this.comment = '';
          this.getSingleItem(this.itemId).then(response => {
            this.item = response;
          });
        }).catch(error => {
          console.log(error)
        });
      },
      filtering(item, queryText, itemText) {
        if (!`${JSON.stringify(item)}`.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())) return false;
        return item;
      },
      onFormSubmit() {
        this.itemogressed = true;
        this.$axios.$patch(`/items/${this.item.id}`, this.item).then(result => {
          console.log('onFormSubmit', result);
          this.result = result;
          this.newRequestForm.isProgressed = false;
          this.newRequestForm.isOpened = false;
        }).catch(error => {
          this.newRequestForm.isProgressed = false;
          console.log(error);
        });
      }
    }
  }

</script>
