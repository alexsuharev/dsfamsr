<template>
  <div class="wrapper">
    <pages-title text="Главная" />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  components: {
    PagesTitle: () => import('~/components/PagesTitle.vue')
  }
}
</script>