<template>
  <div class="wrapper">
    <div class="d-flex align-items-center justify-space-between mb-5">
      <!-- <pages-title text="Заявки" :has-margin="false" /> -->
      <!-- <div class="d-flex align-items-center justify-space-between"> -->
        <v-sheet width="280">
          <v-select
            :items="filter.types.items"
            v-model="filter.types.selected"
            label="Типы заявок"
            outlined
            hide-details
          ></v-select>
        </v-sheet>
        <v-dialog
          v-model="newRequestForm.isOpened"
          width="900"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
              x-large
              class="ml-4"
            >
              создать заявку
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5">
              Новая Заявка
            </v-card-title>

            <v-card-text>
              <v-select
                :items="newRequestForm.data.type.items"
                v-model="newRequestForm.data.type.selected"
                label="Тип заявки"
                outlined
                hide-details
                class="mb-4"
              ></v-select>
              <v-textarea
                v-model="newRequestForm.data.description"
                outlined
                label="Описание"
                hide-details
                class="mb-4"
              ></v-textarea>
              <v-text-field
                v-model="newRequestForm.data.applicant_name"
                label="ФИО заявителя"
                outlined
                hide-details
                class="mb-4"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="newRequestForm.isOpened = false"
              >
                Создать
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
     <!-- </div> -->
    </div>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    >
      <template #[`item.id`]="{ item }">
        <v-chip
          class="ma-2"
          color="red"
          text-color="white"
          v-if="item.priority.selected === 'Критический'"
        >
          {{ item.id }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="orange"
          text-color="white"
          v-if="item.priority.selected === 'Высокий'"
        >
          {{ item.id }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="primary"
          text-color="white"
          v-if="item.priority.selected === 'Средний'"
        >
          {{ item.id }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="green"
          text-color="white"
          v-if="item.priority.selected === 'Низкий'"
        >
          {{ item.id }}
        </v-chip>
      </template>
      <template #[`item.status`]="{ item }">
        <v-sheet width="130">
          <v-select
            :items="item.status.items"
            v-model="item.status.selected"
            outlined
            dense
            hide-selected
            hide-details
          ></v-select>
        </v-sheet>
      </template>
      <template #[`item.contractor`]="{ item }">
        <v-sheet width="130">
          <v-select
            :items="item.contractor.items"
            v-model="item.contractor.selected"
            outlined
            dense
            hide-selected
            hide-details
          ></v-select>
        </v-sheet>
      </template>
      <template #[`item.request`]="{ item }">
        <v-switch
          v-model="item.request"
          color="primary"
          hide-details
          class="ma-0"
        ></v-switch>
      </template>
      <template #[`item.actions`]>
        <v-btn
          icon
          color="primary"
        >
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
    newRequestForm: {
      isOpened: false,
      IsProgressed: false,
      data: {
        description: "",
        applicant_name: "",
        type: {
          selected: 'Выезды',
          items: [
            'Сервисное обслуживание',
            'Выезды',
            'Допоствка карт'
          ]
        }
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
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Статуc', value: 'status' },
      { text: 'Исполнитель', value: 'contractor' },
      { text: 'ЗНО', value: 'request' },
      { text: 'Инициатор', value: 'creator' },
      { text: 'Крайний срок', value: 'ready_date' },
      { text: '', value: 'actions', sortable: false },
    ],
    desserts: [
      {
        id: 'jkh1kj2h3jkh13',
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
        id: 'ssdd7d7d7d7',
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
  })
}
</script>