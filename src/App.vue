<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      

      <v-app-bar-title @click="() => $router.push({ path: '/' })"
        ><v-btn variant="text" size="xlarge">Ball shop</v-btn>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import productList from "@/sampledata/products.json";
export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("addproductList", productList);
  },
};
</script>
