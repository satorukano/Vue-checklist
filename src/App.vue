<template>
  <v-app>
    <v-main>
      <headerbar />
      <v-list lines="one" v-if="!showlist">
        <v-list-item v-for="member in members" :value="member.name"> <v-list-item-title v-text="member.name"
            @click="clicklist(member.id)"></v-list-item-title></v-list-item>
      </v-list>
      <AddUserBtn v-if="!showlist" @add_user="add_user"/>
      <CheckList v-if="showlist" v-bind:id="selected_id" />
    </v-main>
  </v-app>
</template>

<script>
import CheckList from './components/CheckList.vue'
import headerbar from './components/headerbar.vue'
import AddUserBtn from './components/AddUserBtn.vue'

export default {
  name: 'App',

  components: {
    CheckList,
    headerbar,
    AddUserBtn
  },

  data: () => ({
    members: [],
    showlist: false,
    selected_id: "",
    dialog: false
  }),
  mounted: async function () {
    const response = await fetch("http://localhost:8080/member")
    let member = await response.json()
    console.log(member)
    this.members = member
  },
  methods: {
    clicklist: function (id) {
      console.log(id)
      this.showlist = true
      this.selected_id = id
    },
    add_user: function(user_hash) {
      this.members.push(user_hash)
    }
  }
}
</script>
