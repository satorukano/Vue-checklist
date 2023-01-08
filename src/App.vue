<template>
  <v-app>
    <v-main>
      <headerbar/>
      <CheckList/>
    </v-main>
  </v-app>
</template>

<script>
import CheckList from './components/CheckList.vue'
import headerbar from './components/headerbar.vue'

export default {
  name: 'App',

  components: {
    CheckList,
    headerbar
  },

  data: () => ({
    //
  }),
}
</script>
