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
                <v-col cols='4'>
                    <v-text-field
                        label="Имя"
                        outlined
                        hide-details
                    />
                </v-col>
                <v-col cols='4'>
                    <v-text-field
                        label="Фамилия"
                        outlined
                        hide-details
                    />
                </v-col>
                <v-col cols='4'>
                    <v-text-field
                        label="Отчество"
                        outlined
                        hide-details
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols='4'>
                    <v-text-field
                        label="Рабочий E-mail"
                        outlined
                        hide-details
                        type="email"
                    />
                </v-col>
                <v-col cols='4'>
                    <v-text-field
                        label="Рабочий телефон"
                        outlined
                        hide-details
                        type="tel"
                    />
                </v-col>
                <v-col cols='4'>
                    <v-text-field
                        label="Личный телефон"
                        outlined
                        hide-details
                        type="tel"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols='4'>
                    <v-menu
                        ref="menu"
                        v-model="user.menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        >
                        <template #activator="{ on, attrs }">
                            <v-text-field
                            v-model="user.date"
                            label="Дата рождения"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            outlined
                            hide-details
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="user.date"
                            :active-picker.sync="user.activePicker"
                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="save"
                        ></v-date-picker>
                        </v-menu>
                </v-col>
                <v-col cols='4'>
                    <v-select
                        :items="['Мужской', 'Женский']"
                        label="Пол"
                        outlined
                        hide-details
                    ></v-select>
                </v-col>
                <v-col cols='4'>
                    <v-autocomplete
                        v-model="city.selected"
                        :items="city.items"
                        outlined
                        label="Город"
                        item-text="city"
                        item-value="city"
                        hide-details
                    >
                        <template #selection="data">
                            {{ data.item.city }}
                        </template>
                        <template #item="data">
                            {{ data.item.city }} {{ data.item.region }}
                        </template>
                    </v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols='6'>
                    <v-text-field
                        label="Должность"
                        outlined
                        hide-details
                    />
                </v-col>
                <v-col cols='6'>
                    <v-select
                        :items="['СВАО', 'ЦАО', 'ЮАО']"
                        label="Зона ответственности"
                        outlined
                        hide-details
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols='12'>
                    <v-textarea
                        label="Адрес места работы"
                        outlined
                        hide-details
                        rows="1"
                    />
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
      },
      user: {
            activePicker: null,
            date: null,
            menu: false,
        },
        city: {
            selected: {
                "region": "Тува (Тувинская Респ.)",
                "city": "Кызыл"
            },
            items: [
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Бай Хаак"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Кызыл"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Самагалтай"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Сарыг-Сеп"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Суть-Холь"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Тоора-Хем"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Туран"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Тээли"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Хову-Аксы"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Чадан"
                },
                {
                    "region": "Тува (Тувинская Респ.)",
                    "city": "Шагонар"
                },
            ]
        }
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
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
