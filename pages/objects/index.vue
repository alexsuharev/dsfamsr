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
            <v-form @submit.prevent="createNewInstitute">
          <v-card-title>
            <div class="d-flex align-center justify-space-between" style="width: 100%">
                <div class="text-h5">
                  Новое Образовательное Учреждение
                </div>
                <div class="subtitle-1">
                  <v-sheet width="280">
                    <v-select v-model="newObjectForm.data.type.selected" :items="newObjectForm.data.type.items" label="Тип образовательного учреждения" outlined hide-details>
                    </v-select>
                  </v-sheet>
                </div>
              </div>
            
          </v-card-title>

          <v-card-text>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.identificator"
                        label="ID"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.created_year"
                        label="Год инcталляции"
                        outlined
                        hide-details
                      />
                  </v-col>
                  
              </v-row>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.responsibility"
                        label="Зона ответственности"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.supplier"
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
                        v-model="newObjectForm.data.gk_name"
                        label="Наименование по ГК"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.gk_address"
                        label="Адрес по ГК"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.district"
                        label="Округ"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.metro"
                        label="Метро"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.phone"
                        label="Телефон ОУ"
                        type="tel"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.email"
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
                        v-model="newObjectForm.data.gk_implementation"
                        label="ГК на внедрение"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.building_type"
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
                        v-model="newObjectForm.data.food_responsible"
                        label="Ответственный по питанию"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.food_responsible_phone"
                        label="Телефон ответственного по питанию"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row> 
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.canteen_manager"
                        label="Заведующий столовой"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.canteen_manager_phone"
                        label="Телефон заведующего столовой"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>  
              <v-row>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.it_responsible"
                        label="Ответственный за IT"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                        v-model="newObjectForm.data.it_responsible_phone"
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
                        v-model="newObjectForm.data.admin_ip"
                        label="IP-адрес АРМ Администратора"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="4">
                      <v-text-field
                        v-model="newObjectForm.data.remote_settings"
                        label="Настройки удалённого доступа"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="4">
                      <v-text-field
                        v-model="newObjectForm.data.remote_password"
                        label="Пароль доступа"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row> 
              <v-row>
                  <v-col cols="4">
                      <v-text-field
                        v-model="newObjectForm.data.network_address"
                        label="Сетевой адрес"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="4">
                      <v-text-field
                        v-model="newObjectForm.data.network_place"
                        label="Место расположения шкафа"
                        outlined
                        hide-details
                      />
                  </v-col>
                  <v-col cols="4">
                      <v-text-field
                        v-model="newObjectForm.data.mask"
                        label="Маска подсети"
                        outlined
                        hide-details
                      />
                  </v-col>
              </v-row>
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
    </div>

    <v-data-table :headers="headers" :items="insitutes" :items-per-page="5" class="elevation-1">
      <template #[`item.identificator`]="{ item }">
        <v-btn
            :to="{ name: 'objects-objectId', params: {objectId: item.identificator} }"
            class="ma-2" text-color="black"
            text
        >
          {{ item.identificator }}
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: "SecondaryPage",
    data: () => ({
      newObjectForm: {
        isOpened: false,
        isProgressed: false,
        data: {
          identificator: 'identificator',
          type: {
            selected: 'Дошкольные ОУ',
            items: [
              'Дошкольные ОУ',
              'Общеобразовательные ОУ',
              'Профессиональные ОУ'
            ]
          },
          created_year: '2022-05-08',
          responsibility: 'responsibility',
          supplier: 'supplier',
          gk_name: 'gk_name',
          gk_address: 'gk_address',
          district: 'district',
          metro: 'metro',
          phone: 'phone',
          email: 'email',
          gk_implementation: 'gk_implementation',
          building_type: 'building_type',
          food_responsible: 'food_responsible',
          food_responsible_phone: 'food_responsible_phone',
          canteen_manager: 'canteen_manager',
          canteen_manager_phone: 'canteen_manager_phone',
          it_responsible: 'it_responsible',
          it_responsible_phone: 'it_responsible_phone',
          admin_ip: 'admin_ip',
          remote_settings: 'remote_settings',
          remote_password: 'remote_password',
          network_address: 'network_address',
          network_place: 'network_place',
          mask: 'mask',
        }
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
            value: 'identificator',
        },
        { text: 'Наименование по ГК', value: 'gk_name', sortable: true },
        { text: 'Адрес', value: 'gk_address', sortable: true },
      ],
    }),
    computed: {
      ...mapGetters('institutes', ['getInstitutes']),
      insitutes() {
          if (this.filter.types.selected === 'Все') {
              return this.getInstitutes;
          } else {
              return this.getInstitutes.filter(institute => institute.type === this.filter.types.selected);
          }
      }
    },
    mounted() {
      this.setInstitutes();
    },
    methods: {
      ...mapActions('institutes', ['setInstitutes', 'createInstitute']),
      createNewInstitute() {
        this.newObjectForm.isProgressed = true;
        this.createInstitute(this.newObjectForm.data).then(result => {
          this.newObjectForm.isProgressed = false;
          this.newObjectForm.isOpened = false;
          console.log('this.createInstitute', result);
        }).catch(error => {
          console.log(error);
          this.newObjectForm.isProgressed = false;
        })
      }
    }
  }
  // TODO Сделать Валидацию
  // TODO Сделать Редактирование
  // TODO Сделать Загрузку файлов
</script>
