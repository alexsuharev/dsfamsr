<template>
    <v-row>
        <v-col cols="5">
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
            <v-btn color="primary" width="100%" class="mt-4" outlined :to="{ name: 'users-userId-edit' }">
                Редактировать
            </v-btn>
        </v-col>
        <v-col cols="7">
            <div v-for="field in fields" :key="field.index">
                <div class="d-flex align-center justify-space-between">
                    <div class="text-button" style="width: 210px">{{ field.title }}</div>
                    <div class="text-subtitle text-right" style="width: calc(100% - 210px - 50px)">{{ field.value }}</div>
                </div>
                <v-divider />
            </div>
        </v-col>
    </v-row>
</template>

<script>
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
        ]
    }),
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