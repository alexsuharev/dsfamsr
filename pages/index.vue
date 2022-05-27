<template>
  <div class="wrapper">
    <div class="d-flex align-items-center justify-space-between mb-5">
      <pages-title text="Заявки за неделю" />
      <v-form target="downloadframe" method="POST" action="http://dsfamsr.ru/api/report/7">
        <v-btn color="primary" type="submit">
          Скачать отчет
        </v-btn>
      </v-form>
    </div>
    <LineChart ref="doughnutRef" :chart-data="weekData" :options="options" />
    <div class="d-flex align-items-center justify-space-between mb-5 mt-15">
      <pages-title text="Заявки за Месяц" />
      <v-form target="downloadframe" method="POST" action="http://dsfamsr.ru/api/report/30">
        <v-btn color="primary" type="submit">
          Скачать отчет
        </v-btn>
      </v-form>
    </div>
    <LineChart ref="doughnutRef" :chart-data="monthData" :options="options" />
    <div class="d-flex align-items-center justify-space-between mb-5 mt-15">
      <pages-title text="Заявки за Год" />
      <v-form target="downloadframe" method="POST" action="http://dsfamsr.ru/api/report/365">
        <v-btn color="primary" type="submit">
          Скачать отчет
        </v-btn>
      </v-form>
    </div>
    <BarChart ref="doughnutRef" :chart-data="yearData" :options="options" />
  </div>
</template>

<script>
import { LineChart, BarChart } from 'vue-chart-3';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "IndexPage",
  components: {
    PagesTitle: () => import('~/components/PagesTitle.vue'),
    LineChart,
    BarChart
  },
  computed: {
    ...mapGetters('items', ['getItems']),
    weekdaysFromToday() {
      return [
        this.$moment().subtract('days', 0).format('dddd'),
        this.$moment().subtract('days', 1).format('dddd'),
        this.$moment().subtract('days', 2).format('dddd'),
        this.$moment().subtract('days', 3).format('dddd'),
        this.$moment().subtract('days', 4).format('dddd'),
        this.$moment().subtract('days', 5).format('dddd'),
        this.$moment().subtract('days', 6).format('dddd'),
      ].reverse();
    },
    listLastWeekCreatedItems() {
      const array = [[], [], [], [], [], [], []];

      this.getItems.map(item => {
        const date = this.$moment(item.created_at).format('YYYY-MM-DD');
        console.log('listLastWeekCreatedItems', item, date);
        if (date === this.$moment().subtract('days', 0).format('YYYY-MM-DD')) {
          array[0].push(item);
        } else if (date === this.$moment().subtract('days', 1).format('YYYY-MM-DD')) {
          array[1].push(item);
        } else if (date === this.$moment().subtract('days', 2).format('YYYY-MM-DD')) {
          array[2].push(item);
        } else if (date === this.$moment().subtract('days', 3).format('YYYY-MM-DD')) {
          array[3].push(item);
        } else if (date === this.$moment().subtract('days', 4).format('YYYY-MM-DD')) {
          array[4].push(item);
        } else if (date === this.$moment().subtract('days', 5).format('YYYY-MM-DD')) {
          array[5].push(item);
        } else if (date === this.$moment().subtract('days', 6).format('YYYY-MM-DD')) {
          array[6].push(item);
        }
        return item
      });
      return array.reverse();
    },
    listLastWeekFinishedItems() {
      const array = [[], [], [], [], [], [], []];

      this.getItems.filter(item => item.status === 'Обработана').map(item => {
        const date = this.$moment(item.created_at).format('YYYY-MM-DD');
        console.log('listLastWeekCreatedItems', item, date);
        if (date === this.$moment().subtract('days', 0).format('YYYY-MM-DD')) {
          array[0].push(item);
        } else if (date === this.$moment().subtract('days', 1).format('YYYY-MM-DD')) {
          array[1].push(item);
        } else if (date === this.$moment().subtract('days', 2).format('YYYY-MM-DD')) {
          array[2].push(item);
        } else if (date === this.$moment().subtract('days', 3).format('YYYY-MM-DD')) {
          array[3].push(item);
        } else if (date === this.$moment().subtract('days', 4).format('YYYY-MM-DD')) {
          array[4].push(item);
        } else if (date === this.$moment().subtract('days', 5).format('YYYY-MM-DD')) {
          array[5].push(item);
        } else if (date === this.$moment().subtract('days', 6).format('YYYY-MM-DD')) {
          array[6].push(item);
        }
        return item
      });
      return array.reverse();
    },
    options() {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    },
    weekData() {
      return {
        labels: this.weekdaysFromToday,
        datasets: [
          {
            label: 'Созданные',
            data: this.listLastWeekCreatedItems.map(item => item.length),
            borderColor: '#77CEFF',
            backgroundColor: '#77CEFF',
          },
          {
            label: 'Завершенные',
            data: this.listLastWeekFinishedItems.map(item => item.length),
            borderColor: 'orange',
            backgroundColor: 'orange',
          }
        ]
      }
    },
    monthData() {
      return {
        labels: this.$moment.monthsShort(),
        datasets: [
          {
            label: 'Созданные',
            data: Array.from({length: 30}, () => Math.floor(Math.random() * 40)),
            borderColor: '#77CEFF',
            backgroundColor: '#77CEFF', 
          },
          {
            label: 'Завершенные',
            data: Array.from({length: 30}, () => Math.floor(Math.random() * 40)),
            borderColor: 'orange',
            backgroundColor: 'orange',
          }
        ]
      }
    },
    yearData() {
      return {
        labels: Array.from({length: 365}, () => {
          return '-';
        }),
        datasets: [
          {
            label: 'Созданные',
            data: Array.from({length: 365}, () => Math.floor(Math.random() * 40)),
            borderColor: '#77CEFF',
            backgroundColor: '#77CEFF', 
          },
          {
            label: 'Завершенные',
            data: Array.from({length: 365}, () => Math.floor(Math.random() * 40)),
            borderColor: 'orange',
            backgroundColor: 'orange',
          }
        ]
      }
    }
  },
  beforeMount() {
    this.setData();
  },
  methods: {
    ...mapActions('items', ['setData']),
  }
}
</script>