<template>
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
              <td v-if="edit==false">{{ item.check }}</td>
              <td v-else><v-text-field v-model="item.check"></v-text-field></td>
            </tr>
          </tbody>
        </v-table>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-btn v-if="edit==false">
    編集

    <v-dialog
        v-model="dialog"
        activator="parent"
        persistent
      >
        <v-card>
          <v-card-title>パスワード</v-card-title>
          <v-card-text>
            <v-text-field label="password" v-model="pass"></v-text-field>
            <div v-if="pass_error==true">パスワードが間違っています</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="black" @click="check_pass" variant="outlined">決定</v-btn>
            <v-btn color="black" @click="dialog = false; pass_error = false" variant="outlined">閉じる</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-btn>
  <v-btn v-else @click="edit=false">保存</v-btn>
</template>

<script>




export default {
  name: 'HelloWorld',

  data: () => ({
    list: [],
    dialog: false,
    edit: false,
    pass: ""
  }),
  mounted: async function()  {
    const response = await fetch("http://localhost:8080")
    let received_list = await response.json()
    this.list = received_list
  },
  methods: {
    check_pass: function() {
      if (this.pass == "wm1137") {
        this.edit = true
        this.error = false
        this.dialog = false
        this.pass = ""
      }else {
        this.pass_error = true
        this.pass = ""
      }
    }
  }
}
</script>



