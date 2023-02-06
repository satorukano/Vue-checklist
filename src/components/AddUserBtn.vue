<template>
    <v-btn>
        ユーザー追加

        <v-dialog v-model="dialog" activator="parent" persistent>
            <v-card>
                <v-card-title>ユーザー追加</v-card-title>
                <v-card-text>
                    <v-text-field label="user" v-model="user"></v-text-field>
                    <div v-if="add_error == true">通信に失敗しました</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="black" @click="add_user" variant="outlined">追加</v-btn>
                    <v-btn color="black" @click="dialog = false; add_error = false" variant="outlined">閉じる</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
export default {
    name: "adduserbtn",
    data: () => ({
        dialog: false,
        add_error: false,
        user: "",
    }),

    methods: {
        add_user: async function () {
            let hash = { hello: "hello" }
            console.log(this.list)
            hash["user_name"] = this.user
            console.log(hash)
            const response = await fetch("http://localhost:8080/add", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify(hash)
            })
            let user_id = await response.json()
            this.$emit("add_user", {id: user_id.id, name: this.user})
            this.user = ""
            this.dialog = false
        }
    }
}

</script>