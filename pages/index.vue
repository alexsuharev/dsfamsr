<template>
  <div class="wrapper">
    <div class="d-flex align-items-center justify-space-between mb-5">
      <pages-title text="Заявки за неделю" />
      <v-form target="downloadframe" method="POST" action="http://localhost:8000/api/week-report">
        <v-btn color="primary" type="submit">
          Скачать отчет
        </v-btn>
      </v-form>
    </div>
    <LineChart ref="doughnutRef" :chart-data="weekData" :options="options" />
  </div>
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { mapGetters, mapActions } from 'vuex';
import fileDownload from 'js-file-download';
export default {
  name: "IndexPage",
  components: {
    PagesTitle: () => import('~/components/PagesTitle.vue'),
    LineChart
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
    }
  },
  beforeMount() {
    this.setData();
  },
  methods: {
    ...mapActions('items', ['setData']),
    weekReport() {
      this.$axios.$get(`http://localhost:8000/api/week-report`, {
        responseType: 'blob',
      }).then((response) => {
        console.log(this.$axios.defaults.headers);
        fileDownload(response.data);
      }).catch(error => {
        console.log(error);
      })
    },
  }
}
</script>