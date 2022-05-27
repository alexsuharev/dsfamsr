<template>
  <div class="wrapper">
    <div v-if="institute" class="d-flex align-center justify-space-between mb-5">
      <pages-title :text="`Образовательное учреждение №${objectId}`" :has-margin="false" />
      <div class="d-flex align-center">
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
                <v-col v-if="newRequestForm.data.type.selected === 'Сервисное обслуживание'" cols="4">
                  <v-autocomplete
v-model="newRequestForm.data.request_type.selected" :items="newRequestForm.data.request_type.items"
                    outlined label="ЗНО" clearable class="mb-0" hide-details />
                </v-col>
                <v-col v-if="newRequestForm.data.type.selected === 'Выезды'" cols="4" class="d-flex align-center">
                  <v-switch v-model="newRequestForm.data.teaching" label="Обучение" hide-details class="ma-0 pa-0" />
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
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        </v-dialog>
        <v-dialog v-if="newObjectForm.data" v-model="newObjectForm.isOpened" width="900">
          <template #activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" x-large class="ml-4" v-on="on">
              редактировать Оу
            </v-btn>
          </template>

          <v-card>
              <v-form @submit.prevent="updateInstitute">
            <v-card-title class="text-h5">
              Новое Образовательное Учреждение
            </v-card-title>

            <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.identificator" label="Идентификатор" outlined hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.created_year" label="Год инcталляции" outlined hide-details />
                  </v-col>

                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.responsibility" label="Зона ответственности" outlined hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.supplier" label="Поставщик питания" outlined hide-details />
                  </v-col>
                </v-row>
                <div class="text-h6 my-4">Реквизиты ОУ:</div>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.gk_name" label="Наименование по ГК" outlined hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.gk_address" label="Адрес по ГК" outlined hide-details />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.district" label="Округ" outlined hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.metro" label="Метро" outlined hide-details />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.phone" label="Телефон ОУ" type="tel" outlined hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.email" label="E-mail" type="email" outlined hide-details />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.gk_implementation" label="ГК на внедрение" outlined hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.building_type" label="Тип здания" outlined hide-details />
                  </v-col>
                </v-row>
                <div class="text-h6 my-4">Контакты ответственных:</div>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.food_responsible" label="Ответственный по питанию" outlined hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.food_responsible_phone" label="Телефон ответственного по питанию" outlined hide-details />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.canteen_manager" label="Заведующий столовой" outlined hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.canteen_manager_phone" label="Телефон заведующего столовой" outlined hide-details />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.it_responsible" label="Ответственный за IT" outlined hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newObjectForm.data.it_responsible_phone" label="Телефон ответственного за IT" outlined hide-details />
                  </v-col>
                </v-row>
                <div class="text-h6 my-4">Документы по ОУ:</div>
                <v-row>
                  <v-col cols="12">
                    <v-file-input label="Акт выполненных работ" outlined hide-details></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input label="Сертификат" outlined hide-details></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
    label="Акт о проведении мероприятий по обучению персонала и запуску услуг" outlined
                      hide-details></v-file-input>
                  </v-col>
                </v-row>
                <div class="text-h6 my-4">Сетевые настройки:</div>
                <v-row>
                  <v-col cols="4">
                    <v-text-field v-model="newObjectForm.data.admin_ip" label="IP-адрес АРМ Администратора" outlined hide-details />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="newObjectForm.data.remote_settings" label="Настройки удалённого доступа" outlined hide-details />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="newObjectForm.data.remote_password" label="Пароль доступа" outlined hide-details />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-text-field v-model="newObjectForm.data.network_address" label="Сетевой адрес" outlined hide-details />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="newObjectForm.data.network_place" label="Место расположения шкафа" outlined hide-details />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="newObjectForm.data.mask" label="Маска подсети" outlined hide-details />
                  </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">
                Сохранить
              </v-btn>
            </v-card-actions>
              </v-form>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <v-row v-if="institute" class="object-wrap">
      <v-col cols="5" class="object-col">
        <div class="map-wrap">
            <div class="map-in">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2253.6113835730166!2d37.60293511582563!3d55.60877681055838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414ab26274b8e061%3A0xaa0858eccbb527b9!2z0JLQsNGA0YjQsNCy0YHQutC-0LUg0YguLCDQnNC-0YHQutCy0LA!5e0!3m2!1sru!2sru!4v1651518275198!5m2!1sru!2sru" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
      </v-col>
      <v-col cols="7" class="object-col">
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">ID</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.id }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">ГОД ИНCТАЛЛЯЦИИ</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.created_year }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">ЗОНА ОТВЕТСТВЕННОСТИ</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.responsibility }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">ПОСТАВЩИК ПИТАНИЯ</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.supplier }}</div>
        </div>
        <v-divider />
        <div class="text-h6 my-4">
          Реквизиты ОУ:
        </div>
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">НАИМЕНОВАНИЕ ПО ГК</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.gk_name }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">ГК НА ВНЕДРЕНИЕ</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.gk_implementation }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">АДРЕС ПО ГК</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.gk_address }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">ОКРУГ</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.district }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">МЕТРО</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.metro }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">ТЕЛЕФОН ОУ</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.phone }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">E-MAIL</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.email }}</div>
        </div>
        <v-divider />
        <div class="d-flex align-center justify-space-between">
          <div class="text-button" style="width: 210px">ТИП ЗДАНИЯ</div>
          <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ institute.building_type }}</div>
        </div>
        <v-divider />
        <div class="text-h6 my-4">
          Документы по ОУ:
        </div>
        <div v-for="field in fieldsDocs" :key="field.index">
          <div class="d-flex align-center justify-space-between">
            <div class="text-button object-title">{{ field.title }}</div>
            <a href="#" class="text-subtitle text-right object-value">{{ field.value }}</a>
          </div>
          <v-divider />
        </div>
      </v-col>
    </v-row>

    <v-tabs
      v-if="institute"
      v-model="selectedTab"
      background-color="transparent"
      color="basil"
      grow
      class="mt-10"
    >
      <v-tab>
        Контакты ответственных
      </v-tab>
      <v-tab>
        Разнарядка
      </v-tab>
    </v-tabs>

    <v-tabs-items v-if="institute" v-model="selectedTab">
      <v-tab-item>
        <v-card>
          <v-card-text>
              <div class="d-flex align-center justify-space-between">
                  <div class="text-button object-title">ОТВЕТСТВЕННЫЙ ПО ПИТАНИЮ</div>
                  <div class="text-subtitle object-value">{{ institute.food_responsible_phone }}</div>
              </div>
              <v-divider />
              <div class="d-flex align-center justify-space-between">
                  <div class="text-button object-title">ЗАВЕДУЮЩИЙ СТОЛОВОЙ</div>
                  <div class="text-subtitle object-value">{{ institute.canteen_manager_phone }}</div>
              </div>
              <v-divider />
              <div class="d-flex align-center justify-space-between">
                  <div class="text-button object-title">ОТВЕТСТВЕННЫЙ ЗА IT</div>
                  <div class="text-subtitle object-value">{{ institute.it_responsible_phone }}</div>
              </div>
              <v-divider />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>    
          <v-card-text>
            <div v-for="device in institute.devices" :key="device.id" class="d-flex align-center mb-4">
              <v-text-field
                v-model="device.name"
                label="Название"
                hide-details
                outlined
                dense
                required
                class="mr-4"
              />
              <v-text-field
                v-model="device.value"
                label="Модель"
                hide-details
                outlined
                dense
                required
                class="mr-4"
              />
              <v-btn icon @click="removeDevice(device)">
                <v-icon icon>
                  mdi-delete
                </v-icon>
              </v-btn>
              <v-btn icon @click="patchDevice(device)">
                <v-icon icon>
                  mdi-check
                </v-icon>
              </v-btn>
            </div>
            <v-divider class="mb-4" />
            <v-form @submit.prevent="addDevice">
              <div class="d-flex align-center">
                <v-text-field
                  v-model="newDevice.name"
                  label="Название"
                  hide-details
                  outlined
                  dense
                  required
                  class="mr-4"
                />
                <v-text-field
                  v-model="newDevice.value"
                  label="Модель"
                  hide-details
                  outlined
                  dense
                  required
                  class="mr-4"
                />
                <v-btn type="submit" icon>
                  <v-icon icon>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-skeleton-loader
      v-if="!institute"
      type="table-heading, image, list-item-two-line, list-item-two-line, list-item-two-line, list-item-two-line, actions"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: "ObjectIdPage",
    data: (context) => ({
      time: null,
      menu2: false,
      newObjectForm: {
        isOpened: false,
        IsProgressed: false,
        data: null
      },
      newDevice: {
        name: '',
        value: ''
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
      institute: null,
      selectedTab: 0,
      fieldsDocs: [{        
          title: 'Акт выполненных работ',
          value: 'Акт выполненных работ.docx'
        },
        {
          title: 'Сертификат',
          value: 'Сертификат.docx'
        },
        {
          title: 'Акт о проведении мероприятий по обучению персонала и запуску услуг',
          value: 'tratata.docx'
        }
      ],
    }),
    computed: {
      ...mapGetters('users', ['getUsers']),
      objectId() {
        return this.$route.params.objectId
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
    },
    mounted() {
      this.loadInstitute();
    },
    methods: {
      ...mapActions('institutes', ['getSingleInstitute', 'patchInstitute', 'createDevice', 'saveDevice', 'deleteDevice']),
      ...mapActions('items', ['createItem']),
      filtering(item, queryText, itemText) {
        if (!`${JSON.stringify(item)}`.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())) return false;
        return item;
      },
      onFormSubmit() {
        this.newRequestForm.IsProgressed = true;
        this.createItem({
          ...this.newRequestForm.data,
          time: this.time,
          institute: this.institute
        }).then(result => {
          this.newRequestForm.isProgressed = false;
          this.newRequestForm.isOpened = false;
        }).catch(error => {
          this.newRequestForm.isProgressed = false;
          console.log(error);
        });
      },
      loadInstitute() {
        this.getSingleInstitute(this.objectId).then(result => {
          console.log(result);
          this.institute = result;
          this.newObjectForm.data = result;
        }).catch(error => {
          console.log(error);
        });
      },
      updateInstitute() {
        console.log(this.newObjectForm.data);
        this.patchInstitute(this.newObjectForm.data).then(result => {
          this.$router.push({ name: 'objects' })
        }).catch(error => {
          console.log(error);
        });
      },
      addDevice() {
        console.log({
          name: this.newDevice.name,
          value: this.newDevice.value,
          institute_id: this.institute.id
        })
        this.createDevice({
          name: this.newDevice.name,
          value: this.newDevice.value,
          institute_id: this.institute.id
        }).then(result => {
          this.loadInstitute();
          this.newDevice = {
            name: '',
            value: ''
          }
          console.log('this.institute.devices', this.institute);
        }).catch(error => {
          console.log(error);
        });
      },
      patchDevice(device) {
        this.saveDevice(device).then(result => {
          this.loadInstitute();
        }).catch(error => {
          console.log(error);
        });
      },
      removeDevice(device) {
        this.deleteDevice(device).then(result => {
          this.loadInstitute();
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }

</script>

<style>
.map-wrap {
    height: 100%;
}

.map-in {
    height: 100%;
}

.object-title {
    width: 400px;
}

.object-value {
    width: calc(100% - 400px - 50px)
}
@media all and (max-width: 1919px) {
    .object-wrap {
        flex-direction: column;
    }

    .object-col {
        flex: 0 0 100%;
        max-width: 100%; 
    }

    .map-in {
        height: 600px;
    }

    .object-title {
        width: 500px;
    }

    .object-value {
        width: calc(100% - 500px - 50px)
    }
}
</style>