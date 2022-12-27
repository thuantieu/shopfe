<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <!-- <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template> -->

      <v-app-bar-title>Ball shop</v-app-bar-title>

      <!-- <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template> -->
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import productList from '@/sampledata/products.json'
export default {
  name: "App",

  data: () => ({
    //
  }),
  created () {
    this.$store.dispatch('addproductList', productList)
  }
};
</script>
