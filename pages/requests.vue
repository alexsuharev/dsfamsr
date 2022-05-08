<template>
  <div class="wrapper">
    <div class="d-flex align-items-center justify-space-between mb-5">
      <!-- <pages-title text="Заявки" :has-margin="false" /> -->
      <!-- <div class="d-flex align-items-center justify-space-between"> -->
      <v-sheet width="280">
        <v-select v-model="filter.types.selected" :items="filter.types.items" label="Типы заявок" outlined hide-details>
        </v-select>
      </v-sheet>
      <v-dialog v-model="newRequestForm.isOpened" width="900">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" x-large class="ml-4" v-on="on">
            создать заявку
          </v-btn>
        </template>

        <v-card>
          <v-form @submit.prevent="onFormSubmit">
            <v-card-title class="text-h5">
              Новая Заявка
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col :cols="`${newRequestForm.data.type.selected === 'Сервисное обслуживание' ? 4 : 6}`">
                  <v-select
v-model="newRequestForm.data.type.selected" :items="newRequestForm.data.type.items"
                    label="Тип заявки" outlined hide-details class="mb-0" />
                </v-col>
                <v-col cols="`${newRequestForm.data.type.selected === 'Сервисное обслуживание' ? 4 : 6}`">
                  <v-select
v-model="newRequestForm.data.priority.selected" :items="newRequestForm.data.priority.items"
                    label="Приоритет" outlined hide-details class="mb-0" />
                </v-col>
                <v-col v-if="newRequestForm.data.type.selected === 'Сервисное обслуживание'" cols="4">
                  <v-autocomplete
v-model="newRequestForm.data.zno.selected" :items="newRequestForm.data.zno.items"
                    outlined label="ЗНО" clearable class="mb-0" hide-details />
                </v-col>
              </v-row>

              <v-row>
                <v-col :cols="newRequestForm.data.type.selected === 'Допостaвка карт' ? 8 : 12">
                  <v-autocomplete
v-model="institutions.selected" :items="institutions.items" outlined
                    label="Образовательное учреждение" clearable :filter="filtering" class="mb-0" hide-details>
                    <template #selection="data">
                      <div>
                        <div>
                          <strong>{{ data.item.name }}</strong>
                        </div>
                        <div>
                          <span>{{ data.item.address }}</span>
                        </div>
                      </div>
                    </template>
                    <template #item="data">
                      <template>
                        <v-list-item-content>
                          <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                          <v-list-item-subtitle>{{ data.item.address }}</v-list-item-subtitle>
                          <v-list-item-subtitle>{{ data.item.id }}</v-list-item-subtitle>
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
v-model="newRequestForm.data.applicant_name" label="ФИО заявителя" outlined
                    hide-details>
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
v-model="newRequestForm.data.applicant_phone" label="Телефонный номер заявителя"
                    outlined hide-details></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
v-model="newRequestForm.data.contructor.selected"
                    :items="newRequestForm.data.contructor.items" outlined label="Исполнитель" clearable class="mb-0"
                    hide-details />
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
              <!-- <v-textarea v-model="newRequestForm.data.comment" outlined label="Комментарий исполнителя" hide-details class="mb-4"
                rows="1">
              </v-textarea> -->
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
      <!-- </div> -->
      <v-dialog v-model="infoModal.isOpened" width="700" persistent>
        <v-card :loading="infoModal.isLoading">
            <v-skeleton-loader
              v-if="!infoModal.item"
              type="table-heading, list-item-three-line, list-item-two-line, list-item-three-line, list-item-two-line, actions"
            ></v-skeleton-loader>
            <v-card-title v-if="infoModal.item">
              <div class="d-flex align-center justify-space-between" style="width: 100%">
                <div class="text-h5">
                  Заявка №{{ infoModal.item.id }}
                </div>
                <div class="subtitle-1">
                  ОТ: {{ $moment(infoModal.item.created_at).format('DD.MM.YYYY HH:MM') }}
                </div>
              </div>
            </v-card-title>

            <v-card-text v-if="infoModal.item">
              <div>
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Исполнитель</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.executor }}</div>
                  </div>
                  <v-divider />
              </div>
              <div>
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Описание</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.description }}</div>
                  </div>
                  <v-divider />
              </div>
              <div>
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Крайний срок исполнения</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ $moment(infoModal.item.expires_at_date).format('DD.MM.YYYY') }} {{ infoModal.item.expires_at_time }}</div>
                  </div>
                  <v-divider />
              </div>
              <div>
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Номер Инцидента</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.incedent_number }}</div>
                  </div>
                  <v-divider />
              </div>
              <div>
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Приоритет</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.proirity }}</div>
                  </div>
                  <v-divider />
              </div>
              <div v-if="infoModal.item.request_type">
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">ЗНО</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.request_type }}</div>
                  </div>
                  <v-divider />
              </div>
              <div>
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Имя заявителя</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.requestor_name }}</div>
                  </div>
                  <v-divider />
              </div>
              <div>
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Телефон заявителя</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.requestor_phone }}</div>
                  </div>
                  <v-divider />
              </div>
              <div>
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Статус</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.status }}</div>
                  </div>
                  <v-divider />
              </div>
              <div>
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Тип Заявки</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.type }}</div>
                  </div>
                  <v-divider v-if="infoModal.item.type === 'Допостaвка карт'" />
              </div>
              <div v-if="infoModal.item.type === 'Допостaвка карт'">
                  <div class="d-flex align-center justify-space-between">
                      <div class="text-button" style="width: 50%">Количество карт</div>
                      <div class="text-subtitle text-left" style="width: 50%">{{ infoModal.item.cards_amount }}</div>
                  </div>
              </div>
            </v-card-text>

            <v-divider v-if="infoModal.item"></v-divider>

            <v-card-actions v-if="infoModal.item">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="infoModalClose">
                Закрыть
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table :headers="headers" :items="filteredItems" :items-per-page="5" class="elevation-1">
      <template #[`item.id`]="{ item }">
        <v-chip v-if="item.proirity === 'Критический'" class="ma-2" color="red" text-color="white" @click.prevent="openInfoModal(item.id)">
          {{ item.id }}
        </v-chip>
        <v-chip v-if="item.proirity === 'Высокий'" class="ma-2" color="orange" text-color="white" @click.prevent="openInfoModal(item.id)">
          {{ item.id }}
        </v-chip>
        <v-chip v-if="item.proirity === 'Средний'" class="ma-2" color="primary" text-color="white" @click.prevent="openInfoModal(item.id)">
          {{ item.id }}
        </v-chip>
        <v-chip v-if="item.proirity === 'Низкий'" class="ma-2" color="green" text-color="white" @click.prevent="openInfoModal(item.id)">
          {{ item.id }}
        </v-chip>
      </template>
      <!-- <template #[`item.status`]="{ item }"> -->
      <!-- <v-sheet width="130"> -->
      <!-- <v-select v-model="item.status.selected" :items="item.status.items" outlined dense hide-selected hide-details>
          </v-select> -->
      <!-- КАКОЙ ТО СТАТУС -->
      <!-- </v-sheet> -->
      <!-- </template> -->
      <template #[`item.contractor`]="{ item }">
        <v-sheet width="130">
          <!-- <v-select
v-model="item.contractor.selected" :items="item.contractor.items" outlined dense hide-selected
            hide-details></v-select> -->
          {{ item.executor }}
        </v-sheet>
      </template>
      <template #[`item.request`]="{ item }">
        <v-switch v-model="item.request" color="primary" hide-details class="ma-0" disabled></v-switch>
      </template>
      <template #[`item.actions`]>
        <v-btn icon color="primary">
          <v-icon dark>
            mdi-minus
          </v-icon>
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
      newRequestForm: {
        isOpened: false,
        IsProgressed: false,
        data: {
          description: "",
          applicant_name: "",
          applicant_phone: "",
          incident_id: "",
          datePicker: false,
          comment: "",
          cards_amount: 0,
          // timePicker: false,
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          // time: null,
          type: {
            selected: 'Выезды',
            items: [
              'Сервисное обслуживание',
              'Выезды',
              'Допостaвка карт'
            ]
          },
          contructor: {
            selected: '',
            items: [
              'Вася Пупкин',
              'Петров Петр',
              'Алексеев Алексей',
              'Васильев Василий',
              'Иванов Иван',
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
          zno: {
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
      infoModal: {
        isOpened: false,
        isLoading: false,
        item: null
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
      headers: [{
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        // {
        //   text: 'Статуc',
        //   value: 'status'
        // },
        {
          text: 'Исполнитель',
          value: 'requestor_name'
        },
        {
          text: 'ЗНО',
          value: 'request_type'
        },
        {
          text: 'Инициатор',
          value: 'requestor_name'
        },
        {
          text: 'Крайний срок',
          value: 'expires_at_date'
        },
        // { text: '', value: 'actions', sortable: false },
      ],
      institutions: {
        selected: null,
        items: [{
            id: '122d',
            address: 'Улица Пушкина, дом Колотушкина',
            name: "Институт №505 им. М. М. Макеева города Кохма"
          },
          {
            id: '3kk3',
            address: 'Улица Колотушкина, дом Пушкина',
            name: "Школа №186 им. К. А. Павлова города Апшеронск"
          },
          {
            id: '3kk3',
            address: 'Улица Трататаевская, дом 23',
            name: "Лицей №714 им. В. М. Полякова города Весьегонск"
          },
          {
            id: '3kk3',
            address: 'Улица Ололоева, дом 3536',
            name: "Школа №97 им. К. Д. Овчинникова города Донецк"
          }
        ]
      }
    }),
    computed: {
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
      ...mapActions('items', ['createItem', 'setData', 'getSingleItem']),
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
      },
      openInfoModal(ItemId) {
        this.infoModal.isOpened = true;
        this.infoModal.isLoading = true;
        this.getSingleItem(ItemId).then(result => {
          this.infoModal.item = result;
          this.infoModal.isLoading = false;
          console.log(this.infoModal.item);
        }).catch(error => {
          this.infoModal.isLoading = false;
          console.log(error);
        });
      },
      infoModalClose() {
        this.infoModal.isOpened = false;
        this.infoModal.isLoading = false;
        this.infoModal.item = null;
      }
    }
  }

  // TODO Сделать Валидацию
  // TODO Сделать Редактирование
  // TODO Сделать Вывод Образовательных учреждений

</script>
