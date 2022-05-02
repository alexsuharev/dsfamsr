<template>
  <div class="wrapper">
    <div class="d-flex align-items-center justify-space-between mb-5">
      <!-- <pages-title text="Заявки" :has-margin="false" /> -->
      <!-- <div class="d-flex align-items-center justify-space-between"> -->
      <v-sheet width="280">
        <v-select v-model="filter.types.selected" :items="filter.types.items" label="Типы образовательных учреждений" outlined hide-details>
        </v-select>
      </v-sheet>
      <v-dialog v-model="newObjectForm.isOpened" width="900">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" x-large class="ml-4" v-on="on">
            создать ОУ
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5">
            Новое Образовательное Учреждение
          </v-card-title>

          <v-card-text>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        label="ID"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        label="Год инcталляции"
                        outlined
                        hide-details
                      />
                  </v-col>
                  
              </v-row>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        label="Зона ответственности"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        label="Поставщик питания"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>
              <div class="text-h6 my-4" >Реквизиты ОУ:</div>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        label="Наименование по ГК"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        label="Адрес по ГК"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        label="Округ"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        label="Метро"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        label="Телефон ОУ"
                        type="tel"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        label="E-mail"
                        type="email"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        label="ГК на внедрение"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        label="Тип здания"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>
              <div class="text-h6 my-4" >Контакты ответственных:</div>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        label="Ответственный по питанию"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        label="Телефон ответственного по питанию"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row> 
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        label="Заведующий столовой"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        label="Телефон заведующего столовой"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>  
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        label="Ответственный за IT"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        label="Телефон ответственного за IT"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>  
              <div class="text-h6 my-4" >Документы по ОУ:</div>
              <v-row>
                  <v-col cols="12">
                    <v-file-input
                        label="Акт выполненных работ"
                        outlined
                        hide-details
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                        label="Сертификат"
                        outlined
                        hide-details
                    ></v-file-input>
                  </v-col>   
                  <v-col cols="12">
                    <v-file-input
                        label="Акт о проведении мероприятий по обучению персонала и запуску услуг"
                        outlined
                        hide-details
                    ></v-file-input>
                  </v-col>      
              </v-row> 
              <div class="text-h6 my-4" >Сетевые настройки:</div>
              <v-row>
                  <v-col cols="4">
                      <v-text-field
                        label="IP-адрес АРМ Администратора"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="4">
                      <v-text-field
                        label="Настройки удалённого доступа"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="4">
                      <v-text-field
                        label="Пароль доступа"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row> 
              <v-row>
                  <v-col cols="4">
                      <v-text-field
                        label="Сетевой адрес"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="4">
                      <v-text-field
                        label="Место расположения шкафа"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="4">
                      <v-text-field
                        label="Маска подсети    "
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row> 
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="newObjectForm.isOpened = false">
              Создать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- </div> -->
    </div>

    <v-data-table :headers="headers" :items="insitutes" :items-per-page="5" class="elevation-1">
      <template #[`item.id`]="{ item }">
        <v-btn
            :to="{ name: 'objects-objectId', params: {objectId: item.id} }"
            class="ma-2" text-color="black"
            text
        >
          {{ item.id }}
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
      newObjectForm: {
        isOpened: false,
        IsProgressed: false,
      },
      filter: {
        types: {
          selected: 'Все',
          items: [
            'Все',
            'Дошкольные ОУ',
            'Общеобразовательные ОУ',
            'Профессиональные ОУ'
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
        { text: 'Наименование по ГК', value: 'name', sortable: true },
        { text: 'Адрес', value: 'address', sortable: true },
      ],
      desserts: [
        {
            id: '1e2dw',
            address: 'Улица Колотушкина, Дом Пушкина #133к1 ',
            name: 'Колледж №687 им. Е. Д. Павлова города Карталы',
            type: 'Дошкольные ОУ'
        },
        {
            id: '12de2',
            address: 'Улица Пушкина, Дом Колотушкина #123к14',
            name: 'Университет №149 им. С. А. Кириллова города Болотное',
            type: 'Общеобразовательные ОУ'
        },
        {
            id: '44tt4',
            address: 'Улица Пушкина, Дом Колотушкина #123к14',
            name: 'Университет №149 им. С. А. Кириллова города Болотное',
            type: 'Профессиональные ОУ'
        }
      ],
    }),
    computed: {
        insitutes() {
            if (this.filter.types.selected === 'Все') {
                return this.desserts;
            } else {
                return this.desserts.filter(dessert => dessert.type === this.filter.types.selected);
            }
        }
    },
  }
  // Сделать чтоб нелзья было поставить 0 в Каоличество карт
  // Сделать фильтр заявок
</script>
