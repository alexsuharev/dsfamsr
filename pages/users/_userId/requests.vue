<template>
    <div class="wrapper">
        <div v-if="user" class="d-flex align-center justify-space-between mb-5">
            <pages-title :text="user.name" :has-margin="false" />
            <v-sheet width="280">
                <v-select v-model="filter.types.selected" :items="filter.types.items" label="Типы заявок" outlined hide-details>
                </v-select>
            </v-sheet>
        </div>
        <v-data-table v-if="items" :headers="headers" :items="filteredItems" :items-per-page="5" class="elevation-1">
            <template #[`item.id`]="{ item }">
                <v-btn
        :to="{ name: 'requests-itemId', params: {itemId: item.id} }"
        class="ma-2" color="yellow" text-color="black">
                {{ item.id }}
                </v-btn>
            </template>
        </v-data-table>
        <v-skeleton-loader
            v-if="!items"
            type="table"
        />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'UserRequests',
    data: () => ({
        user: null,
        items: null,
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
        headers: [
            {
                text: 'ID',
                align: 'start',
                sortable: false,
                value: 'id',
            },
            { text: 'Тип', value: 'type', sortable: true },
            { text: 'Стату', value: 'status', sortable: true },
        ],
    }),
    computed: {
        userId() {
            return this.$route.params.userId
        },
        filteredItems() {
            if (this.filter.types.selected === 'Все') {
            return this.items;
            } else {
            return this.items.filter(item => item.type === this.filter.types.selected);
            }
        }
    },
    mounted() {
        this.getSingleUser(this.userId).then(result => {
            this.user = result;
        }).catch(error => {
            console.log(error);
        });
        this.getUsersItems(this.userId).then(result => {
            this.items = result;
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        ...mapActions('users', ['getSingleUser', 'getUsersItems']),
        filtering(item, queryText, itemText) {
            if (!`${JSON.stringify(item)}`.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())) return false;
            return item;
        },
    }
}
</script>