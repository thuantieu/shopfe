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
import { HTTP } from "./plugins/http-common";

export default {
  name: "App",

  data: () => ({
    token: {},
  }),
  created() {
    
  },
  async mounted() {
    await HTTP.get("token").then((response) => {
      this.token = response.data;
    });
    await this.$store.dispatch("getTokent", this.token);
    // setTimeout(() => {
    //   console.log("Store token", this.$store.state.token);
    // }, 1000);
    HTTP.get('shop', {
      headers: {
        'authorization': `Bearer ${this.$store.state.token.access_token}`
      }
    }).then(response => {
      this.$store.dispatch("addproductList", response.data);
      setTimeout(() => {
        
        console.log(this.$store.state.productList);
      }, 1000);
    })

  },
};
</script>
