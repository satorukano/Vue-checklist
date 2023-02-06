<template>
  <v-card v-if="edit==false">
    <v-tabs bg-color="black" center-active>
      <v-tab @click="tabclick('crew')">クルー</v-tab>
      <v-tab @click="tabclick('skipper')">スキッパー</v-tab>
    </v-tabs>
  </v-card>
  <v-expansion-panels>
    <v-expansion-panel v-for="items in list" :key="items.title">
      <v-expansion-panel-title>
        {{ items.title }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                チェック項目
              </th>
              <th class="text-left">
                チェック
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items.check_list" :key="item.title">
              <td>{{ item.title }}</td>
              <td v-if="edit == false">{{ item.check }}</td>
              <td v-else><v-responsive class="ma-0 pa-0" :width="`3rem`"><v-text-field v-model="item.check" class="check"></v-text-field></v-responsive></td> 
            </tr>
          </tbody>
        </v-table>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-btn v-if="edit == false">
    編集

    <v-dialog v-model="dialog" activator="parent" persistent>
      <v-card>
        <v-card-title>パスワード</v-card-title>
        <v-card-text>
          <v-text-field label="password" v-model="pass"></v-text-field>
          <div v-if="pass_error == true">パスワードが間違っています</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" @click="check_pass" variant="outlined">決定</v-btn>
          <v-btn color="black" @click="dialog = false; pass_error = false" variant="outlined">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
  <v-btn v-else @click="savedata">保存</v-btn>
</template>

<script>



export default {
  name: 'CheckList',
  props: ['id'],
  data: () => ({
    list: [],
    dialog: false,
    edit: false,
    pass: "",
    table: "crew"
  }),
  mounted: async function () {
    this.receivelist()
  },
  watch: {
    table: async function () {
      this.receivelist()
    }
  },
  methods: {
    check_pass: function () {
      if (this.pass == "wm1137") {
        this.edit = true
        this.error = false
        this.dialog = false
        this.pass = ""
        console.log(this.list)
      } else {
        this.pass_error = true
        this.pass = ""
      }
    },
    savedata: async function () {
      let hash = { hello: "hello" }
      console.log(this.list)
      hash["data"] = this.list
      console.log(hash)
      this.edit = false
      const response = await fetch("http://localhost:8080/edit", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(hash)
      })
      let connection = await response.text()
      console.log(connection)

    },
    tabclick: function (table) {
      this.table = table
    },
    receivelist: async function () {
      let hash = {}
      hash.id = this.id
      hash.table = this.table
      const response = await fetch("http://localhost:8080", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(hash)
      })
      let received_list = await response.json()
      this.list = received_list
    }
  }
}
</script>

<style scoped>
.check.v-text-field >>> input {
  font-size: 0.8em;
  padding: 0 !important;
  height: 2rem;
}
</style>



