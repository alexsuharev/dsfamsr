<template>
    <v-row>
        <v-col v-if="user" cols="3">
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
            <v-btn color="primary" width="100%" class="mt-4" outlined @click="updateUser">
                Сохранить
            </v-btn>
        </v-col>
        <v-col v-if="user" cols="9">
            <v-row>
                <v-col cols='12'>
                    <v-text-field
                        v-model="user.name"
                        label="ФИО"
                        outlined
                        hide-details
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols='4'>
                    <v-text-field
                        v-model="user.email"
                        label="Рабочий E-mail"
                        outlined
                        hide-details
                        type="email"
                    />
                </v-col>
                <v-col cols='4'>
                    <v-text-field
                        v-model="user.phone_work"
                        label="Рабочий телефон"
                        outlined
                        hide-details
                        type="tel"
                    />
                </v-col>
                <v-col cols='4'>
                    <v-text-field
                        v-model="user.phone_personal"
                        label="Личный телефон"
                        outlined
                        hide-details
                        type="tel"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols='4'>
                    <v-text-field
                        v-model="user.birth_date"
                        label="Дата рождения"
                        outlined
                        hide-details
                        type="tel"
                    />
                </v-col>
                <v-col cols='4'>
                    <v-select
                        v-model="user.sex"
                        :items="['Мужской', 'Женский']"
                        label="Пол"
                        outlined
                        hide-details
                    ></v-select>
                </v-col>
                <v-col cols='4'>
                    <v-autocomplete
                        v-model="user.city"
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
                        v-model="user.position"
                        label="Должность"
                        outlined
                        hide-details
                    />
                </v-col>
                <v-col cols='6'>
                    <v-select
                        v-model="user.resp"
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
                        v-model="user.address"
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
import { mapActions } from 'vuex';
export default {
    name: 'UserPage',
    data: () => ({
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
        },
        user: null
    }),
    computed: {
        userId() {
            return this.$route.params.userId;
        },
    },
    mounted() {
        this.getSingleUser(this.userId).then(result => {
            this.user = result;
        }).catch(error => {
            console.log(error);
        })
    },
    methods: {
        ...mapActions('users', ['getSingleUser']),
        save (date) {
        this.$refs.menu.save(date)
      },
      updateUser() {
        this.$axios.$patch(`/users/${this.user.id}`, this.user).then(result => {
          this.$router.push({name: 'users-userId', params: {userId: this.user.id}})
        }).catch(error => {
          console.log(error)
        });
      }
    }
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