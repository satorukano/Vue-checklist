<template>
    <v-app-bar >
        <v-app-bar-title>
            <v-img :src="img_src" width="100" height="50" @click="page_return" class="wmicon"></v-img>
        </v-app-bar-title>
    </v-app-bar>
</template>

<script>
export default {
    name: "headerbar",
    data: () => ({
        img_src: "src/assets/images/logo-header.jpg"
    }),
    methods: {
        page_return: function() {
            this.$emit("return", "return")
        }
    }
}
</script>

<style>
.wmicon{
    cursor: pointer;
}
</style>

