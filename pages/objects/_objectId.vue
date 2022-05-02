<template>
  <div class="wrapper">
    <div class="d-flex align-center justify-space-between mb-5">
      <pages-title :text="`Образовательное учреждение №${objectId}`" :has-margin="false" />

      <v-dialog v-model="newObjectForm.isOpened" width="900">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" x-large class="ml-4" v-on="on">
            редактировать Оу
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5">
            Новое Образовательное Учреждение
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field label="ID" outlined hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Год инcталляции" outlined hide-details />
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field label="Зона ответственности" outlined hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Поставщик питания" outlined hide-details />
              </v-col>
            </v-row>
            <div class="text-h6 my-4">Реквизиты ОУ:</div>
            <v-row>
              <v-col cols="6">
                <v-text-field label="Наименование по ГК" outlined hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Адрес по ГК" outlined hide-details />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field label="Округ" outlined hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Метро" outlined hide-details />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field label="Телефон ОУ" type="tel" outlined hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="E-mail" type="email" outlined hide-details />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field label="ГК на внедрение" outlined hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Тип здания" outlined hide-details />
              </v-col>
            </v-row>
            <div class="text-h6 my-4">Контакты ответственных:</div>
            <v-row>
              <v-col cols="6">
                <v-text-field label="Ответственный по питанию" outlined hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Телефон ответственного по питанию" outlined hide-details />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field label="Заведующий столовой" outlined hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Телефон заведующего столовой" outlined hide-details />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field label="Ответственный за IT" outlined hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Телефон ответственного за IT" outlined hide-details />
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
                <v-text-field label="IP-адрес АРМ Администратора" outlined hide-details />
              </v-col>
              <v-col cols="4">
                <v-text-field label="Настройки удалённого доступа" outlined hide-details />
              </v-col>
              <v-col cols="4">
                <v-text-field label="Пароль доступа" outlined hide-details />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field label="Сетевой адрес" outlined hide-details />
              </v-col>
              <v-col cols="4">
                <v-text-field label="Место расположения шкафа" outlined hide-details />
              </v-col>
              <v-col cols="4">
                <v-text-field label="Маска подсети    " outlined hide-details />
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="newObjectForm.isOpened = false">
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-row class="object__wrap">
      <v-col cols="5" class="object__col">
        <div class="map_wrap">
            <div class="map_in">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2253.6113835730166!2d37.60293511582563!3d55.60877681055838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414ab26274b8e061%3A0xaa0858eccbb527b9!2z0JLQsNGA0YjQsNCy0YHQutC-0LUg0YguLCDQnNC-0YHQutCy0LA!5e0!3m2!1sru!2sru!4v1651518275198!5m2!1sru!2sru" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
      </v-col>
      <v-col cols="7" class="object__col">
        <div v-for="field in fieldsMain" :key="field.index">
          <div class="d-flex align-center justify-space-between">
            <div class="text-button" style="width: 210px">{{ field.title }}</div>
            <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ field.value }}</div>
          </div>
          <v-divider />
        </div>
        <div class="text-h6 my-4">
          Реквизиты ОУ:
        </div>
        <div v-for="field in fieldsReqs" :key="field.index">
          <div class="d-flex align-center justify-space-between">
            <div class="text-button" style="width: 210px">{{ field.title }}</div>
            <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ field.value }}</div>
          </div>
          <v-divider />
        </div>
        <div class="text-h6 my-4">
          Документы по ОУ:
        </div>
        <div v-for="field in fieldsDocs" :key="field.index">
          <div class="d-flex align-center justify-space-between">
            <div class="text-button object__title">{{ field.title }}</div>
            <a href="#" class="text-subtitle text-right object__value">{{ field.value }}</a>
          </div>
          <v-divider />
        </div>
      </v-col>
    </v-row>

    <v-tabs
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

    <v-tabs-items v-model="selectedTab">
      <v-tab-item>
        <v-card>
          <v-card-text>
              <div v-for="contact in contacts" :key="contact.index">
                <div class="d-flex align-center justify-space-between">
                    <div class="text-button object__title">{{ contact.title }}</div>
                    <div class="text-subtitle object__value">{{ contact.value }}</div>
                </div>
                <v-divider />
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>    
          <v-card-text>
              <div v-for="device in devices" :key="device.index">
                <div class="d-flex align-center justify-space-between">
                    <div class="text-button object__title">{{ device.title }}</div>
                    <div class="text-subtitle object__value">{{ device.value }}</div>
                </div>
                <v-divider />
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
    name: "ObjectIdPage",
    data: (context) => ({
      newObjectForm: {
        isOpened: false,
        IsProgressed: false,
      },
      fieldsMain: [{
          title: 'ID',
          value: context.$route.params.objectId
        },
        {
          title: 'Год инcталляции',
          value: '12.12.21'
        },
        {
          title: 'Зона ответственности',
          value: 'Зона ответственности'
        },      
        {
          title: 'Поставщик питания',
          value: 'Поставщик питания '
        }
      ],
      fieldsReqs: [{
          title: 'Наименование по ГК',
          value: 'Наименование по ГК'
        },
        {
          title: 'ГК на внедрение',
          value: 'ГК на внедрение'
        },
        {
          title: 'Округ',
          value: 'Округ'
        },
        {
          title: 'Метро',
          value: 'Метро'
        },
        {
          title: 'Телефон ОУ',
          value: 'Телефон ОУ'
        },
        {
          title: 'E-mail',
          value: 'E-mail'
        },
        {
          title: 'ГК на внедрение',
          value: 'ГК на внедрение'
        },
        {
          title: 'Тип здания',
          value: 'Тип здания'
        }
      ],
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
      selectedTab: 0,
      contacts: [
          {
              title: 'Ответственный по питанию',
              value: '+123456789'
          },
          {
              title: 'Заведующий столовой',
              value: '+123456789'
          },
          {
              title: 'Ответственный за IT',
              value: '+123456789'
          }     
      ],
      devices: [
          {
              title: 'Монитор',
              value: 'Большой'
          },
          {
              title: 'Сервер',
              value: 'Медленный'
          },
          {
              title: 'Мышь',
              value: 'Не работает'
          }     
      ]
    }),
    computed: {
      objectId() {
        return this.$route.params.objectId
      }
    },
  }

</script>

<style>
.map_wrap {
    height: 100%;
}
.map_in {
    height: 100%;
}
.object__title {
    width: 400px;
}
.object__value {
    width: calc(100% - 400px - 50px)
}
@media all and (max-width: 1919px) {
    .object__wrap {
        flex-direction: column;
    }
    .object__col {
        flex: 0 0 100%;
        max-width: 100%; 
    }
    .map_in {
        height: 600px;
    }
    .object__title {
        width: 500px;
    }
    .object__value {
        width: calc(100% - 500px - 50px)
    }
}
</style>