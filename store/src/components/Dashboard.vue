<template>
  <v-container fluid>
    <h1>Dashboard</h1>
    {{projects}}
  </v-container>
</template>
<script>

export default {
  name: 'Dashboard',
  computed: {
    projects () {
      return this.$store.getters.dashboardProjects
    }
  },
  beforeMount () {
    this.$store.dispatch('FETCH_ARRAY', {entity: 'view_dashboard_projects'})
  }
}
</script>

<style scoped>
</style>
