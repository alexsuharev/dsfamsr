<template>
    <v-row>
        <v-col cols="3">
            <div class="avatar_wrap">
                <v-avatar
                    tile
                    color="blue"
                    size="100%"
                    class="avatar_in"
                    rounded="10"
                >
                    <span class="white--text text-h5">CJ</span>
                </v-avatar>
            </div>
            <v-btn color="primary" width="100%" class="mt-4" outlined>
                Сохранить
            </v-btn>
        </v-col>
        <v-col cols="9">
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
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'UserPage',
    data: () => ({
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
    computed: {
        userId() {
            return this.$route.params.userId;
        },
        menu() {
            return this.user.menu;
        }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
}
</script>

<style lang="scss" scoped>
.avatar_wrap {
    padding-top: 100%;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.avatar_in {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>