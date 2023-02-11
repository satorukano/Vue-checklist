<template>
  <v-app>
    <v-main>
      <headerbar @return="page_back"/>
      <v-list lines="one" v-if="!showlist">
        <v-list-item v-for="member in members" :value="member.name"> <v-list-item-title v-text="member.name"
            @click="click_list(member.id)"></v-list-item-title>
          <template v-slot:append>
            <DeleteBtn :id="member.id" @deleted_id="delete_list"/>
          </template>
        </v-list-item>
      </v-list>
      <AddUserBtn v-if="!showlist" @add_user="add_user"/>
      <CheckList v-if="showlist" :id="selected_id" />
    </v-main>
  </v-app>
</template>

<script>
import CheckList from './components/CheckList.vue'
import headerbar from './components/headerbar.vue'
import AddUserBtn from './components/AddUserBtn.vue'
import DeleteBtn from './components/DeleteBtn.vue'

export default {
  name: 'App',

  components: {
    CheckList,
    headerbar,
    AddUserBtn,
    DeleteBtn
  },

  data: () => ({
    members: [],
    showlist: false,
    selected_id: "",
    dialog: false
  }),
  mounted: async function () {
    const response = await fetch(`${import.meta.env.VITE_API_HOST}/member`)
    let member = await response.json()
    console.log(member)
    this.members = member
  },
  methods: {
    click_list: function (id) {
      console.log(id)
      this.showlist = true
      this.selected_id = id
    },
    add_user: function (user_hash) {
      this.members.push(user_hash)
    },
    delete_list: function(id) {
      console.log(id)
      this. members = this.members.filter((member) => {
        return member.id != id
      })
    },
    page_back: function() {
      this.showlist = false
    }
  }
}
</script>
