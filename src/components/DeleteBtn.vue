<template>
    <v-btn variant="plain">
        <v-icon icon="mdi-close"></v-icon>
        <v-dialog v-model="dialog" activator="parent" persistent>
            <v-card>
                <v-card-title>ユーザー削除</v-card-title>
                <v-card-text>
                    このユーザーを本当に削除しますか
                    <div v-if="delete_error == true">通信に失敗しました</div>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="black" @click="delete_user" variant="outlined">削除</v-btn>
                    <v-btn color="black" @click="dialog = false; delete_error = false" variant="outlined">閉じる</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
export default {
    name: "DeleteBtn",
    data: () => ({
        dialog: false,
        delete_error: false,
    }),

    props: ["id"],

    methods: {
        delete_user: async function () {
            let hash = {}
            console.log(this.id)
            hash["user_id"] = this.id
            console.log(hash)
            const response = await fetch("http://localhost:8080/delete", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "delete",
                body: JSON.stringify(hash)
            })
            let result = await response.json()
            console.log(result)
            this.$emit("deleted_id", this.id)
            this.dialog = false
        }
    }
}

</script>