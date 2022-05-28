<template>
  <div class="wrapper">
    <div class="d-flex align-items-center justify-space-between mb-5">
      <!-- <pages-title text="Заявки" :has-margin="false" /> -->
      <!-- <div class="d-flex align-items-center justify-space-between"> -->
      <v-sheet width="280">
        <v-select v-model="filter.types.selected" :items="filter.types.items" label="Типы заявок" outlined hide-details>
        </v-select>
      </v-sheet>
      <div class="d-flex align-center">
      <v-dialog v-model="newRequestForm.isOpened" width="900">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" class="ml-4" v-on="on">
            создать заявку
            <v-icon right>
              mdi-chart-box-plus-outline
            </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-form @submit.prevent="onFormSubmit">
            <v-card-title class="text-h5">
              Новая Заявка
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col :cols="newRequestForm.data.type.selected === 'Допостaвка карт' ? 6 : 4">
                  <v-select
v-model="newRequestForm.data.type.selected" :items="newRequestForm.data.type.items"
                    label="Тип заявки" outlined hide-details class="mb-0" />
                </v-col>
                <v-col :cols="newRequestForm.data.type.selected === 'Допостaвка карт' ? 6 : 4">
                  <v-select
v-model="newRequestForm.data.priority.selected" :items="newRequestForm.data.priority.items"
                    label="Приоритет" outlined hide-details class="mb-0" />
                </v-col>
                <v-col v-if="newRequestForm.data.type.selected === 'Сервисное обслуживание'" cols="4">
                  <v-autocomplete
v-model="newRequestForm.data.request_type.selected" :items="newRequestForm.data.request_type.items"
                    outlined label="ЗНО" clearable class="mb-0" hide-details />
                </v-col>
                <v-col v-if="newRequestForm.data.type.selected === 'Выезды'" cols="4" class="d-flex align-center">
                  <v-switch v-model="newRequestForm.data.teaching" label="Обучение" hide-details class="ma-0 pa-0" />
                </v-col>
              </v-row>
              <v-row>
                <v-col :cols="newRequestForm.data.type.selected === 'Допостaвка карт' ? 8 : 12">
                  <v-autocomplete
v-model="newRequestForm.data.institute" :items="getInstitutes" outlined
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
                <v-col v-if="newRequestForm.data.type.selected === 'Допостaвка карт'" cols="4">
                  <v-text-field
v-model="newRequestForm.data.cards_amount" type="number" min="1" label="Количество карт"
                    outlined hide-details>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row class="mb-4">
                <v-col cols="4">
                  <v-text-field
v-model="newRequestForm.data.requestor_name" label="ФИО заявителя" outlined
                    hide-details>
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
v-model="newRequestForm.data.requestor_phone" label="Телефонный номер заявителя"
                    outlined hide-details></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
v-model="newRequestForm.data.user"
                    :items="getUsers" outlined label="Исполнитель" clearable class="mb-0"
                    hide-details >
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
v-model="newRequestForm.data.description" outlined label="Описание" hide-details class="mb-4"
                rows="1">
              </v-textarea>
              <v-row>
                <v-col cols="4">
                  <v-text-field v-model="newRequestForm.data.incident_id" label="Номер инцидента" outlined hide-details>
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-menu
v-model="newRequestForm.data.datePicker" transition="scale-transition" offset-y
                    min-width="auto">
                    <template #activator="{ on, attrs }">
                      <v-text-field
v-model="computedDateFormattedMomentjs" label="Крайная дата выполнения"
                        prepend-icon="mdi-calendar" v-bind="attrs" outlined v-on="on"></v-text-field>
                    </template>
                    <v-date-picker
v-model="newRequestForm.data.date" locale="ru-RU"
                      @input="newRequestForm.data.datePicker = false">
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4">
                  <v-menu
ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                    :return-value.sync="time" transition="scale-transition" offset-y max-width="290px"
                    min-width="290px">
                    <template #activator="{ on, attrs }">
                      <v-text-field
v-model="time" label="Крайнее время выполнения"
                        prepend-icon="mdi-clock-time-four-outline" v-bind="attrs" outlined v-on="on"></v-text-field>
                    </template>
                    <v-time-picker
v-if="menu2" v-model="time" full-width format="24hr"
                      @click:minute="$refs.menu.save(time)">
                    </v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">
                Создать
                <v-icon right>
                mdi-check
              </v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog v-model="reportsForm.isOpened" width="900">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" class="ml-4" v-on="on">
            Отчет
            <v-icon right>
              mdi-chart-box
            </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            Отчет по заявкам
          </v-card-title>
          <v-form target="downloadframe" method="POST" action="https://dsfamsr.ru/api/report/365">
            <v-card-text>
              <v-select
                  v-model="reportsForm.data.type.selected" :items="reportsForm.data.type.items"
                      label="Тип заявки" outlined hide-details class="mb-5" />
                      <v-select
                  v-model="reportsForm.data.priority.selected" :items="reportsForm.data.priority.items"
                      label="Приоритет" outlined hide-details class="mb-5" />
                    <v-select
                  v-model="reportsForm.data.status.selected" :items="reportsForm.data.status.items"
                      label="Статус" outlined hide-details class="mb-5" />
                    <v-autocomplete
  v-model="reportsForm.data.institute" :items="getInstitutes" outlined
                      label="Образовательное учреждение" clearable :filter="filtering" class="mb-5" hide-details>
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
                    <v-autocomplete
  v-model="reportsForm.data.user"
                      :items="getUsers" outlined label="Исполнитель" clearable class="mb-5"
                      hide-details >
                      <template #selection="data">
                        {{ data.item.name }}
                      </template>
                      <template #item="data">
                        {{ data.item.name }}
                      </template>
                      </v-autocomplete>
                <v-date-picker
                  v-model="reportsForm.data.date"
                  full-width
                  range
                  flat
                  :selected-items-text="`С ${dateRangeText}`"
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
      </v-dialog>
      </div>
    </div>
    <v-data-table :headers="headers" :items="getItems" :items-per-page="5" class="elevation-1">
      <template #[`item.id`]="{ item }">
        <v-btn
:to="{ name: 'requests-itemId', params: {itemId: item.id} }"
class="ma-2" color="yellow" text-color="black">
          {{ item.id }}
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex';

  export default {
    name: "SecondaryPage",
    components: {
      // PagesTitle: () => import('~/components/PagesTitle.vue')
    },
    data: () => ({
      time: null,
      menu2: false,
      reportsForm: {
        isOpened: false,
        data: {
          date: [],
          // time: null,
          institute: {},
          user: {},
          type: {
            selected: 'Выезды',
            items: [
              'Сервисное обслуживание',
              'Выезды',
              'Допостaвка карт'
            ]
          },
          priority: {
            selected: 'Средний',
            items: [
              'Низкий',
              'Средний',
              'Высокий',
              'Критический',
            ]
          },
          request_type: {
            selected: '',
            items: [
              'Демонтаж оборудования',
              'Демонтаж СКУД',
              'Монтаж оборудования',
              'Монтаж СКУД',
              'Перенос оборудования',
              'Ремонт СКУД',
            ]
          },
          status: {
            selected: '',
            items: [
              'Создана',
              'В обработке',
              'Обработана',
            ]
          },
        }
      },
      newRequestForm: {
        isOpened: false,
        IsProgressed: false,
        data: {
          description: "",
          requestor_name: "",
          requestor_phone: "",
          incident_id: "",
          datePicker: false,
          comment: "",
          cards_amount: 0,
          teaching: null,
          // timePicker: false,
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          // time: null,
          institute: {},
          user: {},
          type: {
            selected: 'Выезды',
            items: [
              'Сервисное обслуживание',
              'Выезды',
              'Допостaвка карт'
            ]
          },
          priority: {
            selected: 'Средний',
            items: [
              'Низкий',
              'Средний',
              'Высокий',
              'Критический',
            ]
          },
          request_type: {
            selected: '',
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
      filter: {
        types: {
          selected: 'Все',
          items: [
            'Все',
            'Сервисное обслуживание',
            'Выезды',
            'Допостaвка карт'
          ]
        }
      },
      headers: [
        {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
        },
        // { text: 'Тип', value: 'type', sortable: true },
        { text: 'Статус', value: 'status', sortable: true },
        { text: 'Исполнитель', value: 'executor', sortable: true },
        { text: 'ЗНО', value: 'request_type', sortable: true },
        { text: 'Инициатор', value: 'requestor_name', sortable: true },
        { text: 'Крайний срок', value: 'expires_at_date', sortable: true },
      ],
    }),
    computed: {
      dateRangeText () {
        return this.reportsForm.data.date.join(' по ')
      },
      computedDateFormattedMomentjs: {
        get() {
          console.log(this.newRequestForm.data.date);
          return this.newRequestForm.data.date ? this.$moment(this.newRequestForm.data.date).format('DD/MM/YY') : ''
        },
        set(newDate) {
          const date = this.$moment(newDate, 'DD/MM/YY', true);
          if (date.isValid()) {
            console.log('newDate', this.$moment(date).format('YYYY-MM-DD'));
            this.newRequestForm.data.date = this.$moment(date).format('YYYY-MM-DD');
          }
        }
      },
      ...mapGetters('items', ['getItems']),
      ...mapGetters('users', ['getUsers']),
      ...mapGetters('institutes', ['getInstitutes']),
      filteredItems() {
        if (this.filter.types.selected === 'Все') {
          return this.getItems;
        } else {
          return this.getItems.filter(item => item.type === this.filter.types.selected);
        }
      }
    },
    mounted() {
      this.setData();
    },
    methods: {
      ...mapActions('items', ['createItem', 'setData']),
      filtering(item, queryText, itemText) {
        if (!`${JSON.stringify(item)}`.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())) return false;
        return item;
      },
      onFormSubmit() {
        this.newRequestForm.IsProgressed = true;
        this.createItem({
          ...this.newRequestForm.data,
          time: this.time,
        }).then(result => {
          this.newRequestForm.isProgressed = false;
          this.newRequestForm.isOpened = false;
        }).catch(error => {
          this.newRequestForm.isProgressed = false;
          console.log(error);
        });
      }
    }
  }

  // TODO Сделать Валидацию
  // TODO Сделать Редактирование
  // TODO Сделать Вывод Образовательных учреждений

</script>
