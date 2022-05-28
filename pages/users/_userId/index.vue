<template>
    <v-row>
        <v-col v-if="user" cols="5">
            <div class="avatar_wrap">
                <v-avatar
                    tile
                    color="blue"
                    size="100%"
                    class="avatar_in"
                    rounded="10"
                >
                    <img alt="Avatar" src="https://thispersondoesnotexist.com/image">
                </v-avatar>
            </div>
            <v-btn color="primary" width="100%" class="mt-4" outlined :to="{ name: 'users-userId-edit' }">
                Редактировать
            </v-btn>
            <v-btn color="primary" width="100%" class="mt-4" outlined :to="{name: 'users-userId-requests', params: {userId: user.id}}">
                Заявки
            </v-btn>
        </v-col>
        <v-col v-if="user" cols="7">
            <div v-if="user.name" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">ФИО</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.name }}</div>
            </div>
            <v-divider v-if="user.name" />
            <div v-if="user.email" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">РАБОЧИЙ E-MAIL</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.email }}</div>
            </div>
            <v-divider v-if="user.email" />
            <div v-if="user.phone_work" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">РАБОЧИЙ ТЕЛЕФОН</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.phone_work }}</div>
            </div>
            <v-divider v-if="user.phone_work" />
            <div v-if="user.phone_personal" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">ЛИЧНЫЙ ТЕЛЕФОН</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.phone_personal }}</div>
            </div>
            <v-divider v-if="user.phone_personal" />
            <div v-if="user.birth_date" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">ДАТА РОЖДЕНИЯ</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.birth_date }}</div>
            </div>
            <v-divider v-if="user.birth_date" />
            <div v-if="user.sex" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">ПОЛ</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.sex }}</div>
            </div>
            <v-divider v-if="user.sex" />
            <div v-if="user.city" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">ГОРОД</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.city }}</div>
            </div>
            <v-divider v-if="user.city" />
            <div v-if="user.position" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">ДОЛЖНОСТЬ</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.position }}</div>
            </div>
            <v-divider v-if="user.position" />
            <div v-if="user.resp" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">ЗОНА ОТВЕТСТВЕННОСТИ</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.resp }}</div>
            </div>
            <v-divider v-if="user.resp" />
            <div v-if="user.address" class="d-flex align-center justify-space-between">
                <div class="text-button" style="width: 210px">АДРЕС МАСТА РАБОТЫ</div>
                <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ user.address }}</div>
            </div>
            <v-divider v-if="user.address" />
            <!-- <div v-for="field in fields" :key="field.index">
                <div class="d-flex align-center justify-space-between">
                    <div class="text-button" style="width: 210px">{{ field.title }}</div>
                    <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ field.value }}</div>
                </div>
                <v-divider />
            </div> -->
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'UserPage',
    data: () => ({
        fields: [
            {
                title: 'ФИО',
                value: 'Пупкин Василий Викторович'
            },
            {
                title: 'Рабочий E-mail',
                value: 'pupkin.vasya@mail.ru'
            },
            {
                title: 'Рабочий телефон',
                value: '+7 (695) 123-45-67'
            },
            {
                title: 'Личный телефон',
                value: '+7 (695) 765-43-21'
            },
            {
                title: 'Дата рождения',
                value: '23.07.1990'
            },
            {
                title: 'Пол',
                value: 'Мужской'
            },
            {
                title: 'Город',
                value: 'Москва'
            },
            {
                title: 'Должность',
                value: 'Старший Инженер'
            },
            {
                title: 'Зона ответственности',
                value: 'ЦАО'
            },
            {
                title: 'Адрес маста работы',
                value: 'Улица Пушкина, Дом Колотушкина #123к14 Улица Пушкина, Дом Колотушкина #123к14'
            }
        ],
        user: null
    }),
    computed: {
        userId() {
            return this.$route.params.userId
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
        ...mapActions('users', ['getSingleUser'])
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