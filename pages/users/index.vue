<template>
  <div class="wrapper">
    <div class="d-flex align-items-center justify-space-between mb-5">
      <pages-title text="Пользователи" :has-margin="false" />
      <v-dialog v-model="newRequestForm.isOpened" width="900">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" x-large class="ml-4" v-on="on">
            создать пользователя
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5">
            Новый пользователь
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-select
v-model="newRequestForm.data.type.selected" :items="newRequestForm.data.type.items"
                  label="Тип заявки" outlined hide-details class="mb-0" />
              </v-col>
              <v-col cols="4">
                <v-select
v-model="newRequestForm.data.priority.selected" :items="newRequestForm.data.priority.items"
                  label="Приоритет" outlined hide-details class="mb-0" />
              </v-col>
              <v-col cols="4">
                <v-autocomplete
v-model="newRequestForm.data.zno.selected"
                  :items="newRequestForm.data.zno.items" outlined label="ЗНО" clearable class="mb-0"
                  hide-details />
              </v-col>
            </v-row>

            <v-row>
              <v-col :cols="newRequestForm.data.type.selected === 'Допоствка карт' ? 8 : 12">
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
                    <v-list-item-content>
                      <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ data.item.address }}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{ data.item.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col v-if="newRequestForm.data.type.selected === 'Допоствка карт'" cols="4">
                <v-text-field v-model="newRequestForm.data.cards" type="number" min="1" label="Количество карт" outlined hide-details>
                </v-text-field>
              </v-col>
            </v-row>
            
            <v-row class="mb-4">
              <v-col cols="4">
                <v-text-field v-model="newRequestForm.data.applicant_name" label="ФИО заявителя" outlined hide-details>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
v-model="newRequestForm.data.applicant_phone" label="Телефонный номер заявителя" outlined
                  hide-details></v-text-field>
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
                  <v-date-picker v-model="newRequestForm.data.date" locale="ru-RU" @input="newRequestForm.data.datePicker = false">
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-menu
ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                  :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                  <template #activator="{ on, attrs }">
                    <v-text-field
v-model="time" label="Крайнее время выполнения" prepend-icon="mdi-clock-time-four-outline"
                      v-bind="attrs" outlined v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-if="menu2" v-model="time" full-width format="24hr" @click:minute="$refs.menu.save(time)">
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
            <v-btn color="primary" @click="newRequestForm.isOpened = false">
              Создать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- </div> -->
    </div>

    <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1">
      <template #[`item.user`]="{ item }">
        <v-btn
:to="{ name: 'users-userId', params: {userId: item.user.id} }"
class="ma-2" color="yellow" text-color="black">
          {{ item.user.firstname }} {{ item.user.lastname }}
        </v-btn>
      </template>
      <template #[`item.status`]="{ item }">
        <v-sheet width="130">
          <v-select v-model="item.status.selected" :items="item.status.items" outlined dense hide-selected hide-details>
          </v-select>
        </v-sheet>
      </template>
      <template #[`item.contractor`]="{ item }">
        <v-sheet width="130">
          <v-select
v-model="item.contractor.selected" :items="item.contractor.items" outlined dense hide-selected
            hide-details></v-select>
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
          cards: 1,
          // timePicker: false,
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          // time: null,
          type: {
            selected: 'Выезды',
            items: [
              'Сервисное обслуживание',
              'Выезды',
              'Допоствка карт'
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
      filter: {
        types: {
          selected: 'Все',
          items: [
            'Все',
            'Сервисное обслуживание',
            'Выезды',
            'Допоствка карт'
          ]
        }
      },
      headers: [{
          text: 'ФИО',
          align: 'start',
          value: 'user',
        },
        {
          text: 'Статуc',
          value: 'status'
        },
        {
          text: 'Исполнитель',
          value: 'contractor'
        },
        {
          text: 'ЗНО',
          value: 'request'
        },
        {
          text: 'Инициатор',
          value: 'creator'
        },
        {
          text: 'Крайний срок',
          value: 'ready_date'
        },
        // { text: '', value: 'actions', sortable: false },
      ],
      desserts: [{
          user: {
            firstname: 'Вася',
            lastname: 'Пупкин',
            id: '78в7в7в7в7в77в'
          },
          isInfoOpened: false,
          priority: {
            selected: 'Средний',
            items: [
              'Низкий',
              'Средний',
              'Высокий',
              'Критический',
            ]
          },
          status: {
            selected: 'В обработке',
            items: [
              'В обработке',
              'В процессе',
              'В ремонте',
              'Отклонено',
              'Выполнено',
            ]
          },
          contractor: {
            selected: 'Вася Пупкин',
            items: [
              'Вася Пупкин',
              'Петров Петр',
              'Алексеев Алексей',
              'Васильев Василий',
              'Иванов Иван',
            ]
          },
          request: true,
          creator: 'Алексеев А. А.',
          ready_date: '05/04/22 08:47:31'
        },
        {
          user: {
            firstname: 'Игорь',
            lastname: 'Березов',
            id: 'a8sydd98asd9h'
          },
          isInfoOpened: false,
          priority: {
            selected: 'Низкий',
            items: [
              'Низкий',
              'Средний',
              'Высокий',
              'Критический',
            ]
          },
          status: {
            selected: 'В ремонте',
            items: [
              'В обработке',
              'В процессе',
              'В ремонте',
              'Отклонено',
              'Выполнено',
            ]
          },
          contractor: {
            selected: 'Васильев Василий',
            items: [
              'Вася Пупкин',
              'Петров Петр',
              'Алексеев Алексей',
              'Васильев Василий',
              'Иванов Иван',
            ]
          },
          request: false,
          creator: 'Алексеев А. А.',
          ready_date: '28/07/22 18:47:31'
        }
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
    },
    methods: {
      filtering(item, queryText, itemText) {
        if (!`${JSON.stringify(item)}`.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())) return false;
        return item;
      },
    }
  }
  // Сделать чтоб нелзья было поставить 0 в Каоличество карт
  // Сделать фильтр заявок
</script>
