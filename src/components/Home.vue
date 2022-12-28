<template>
  <v-container>
    <!-- <v-row dense> -->
    <!-- <v-overlay
          
        >
        <v-defaults-provider :defaults="defaults">
        <v-card title="Title" subtitle="Subtitle" class="ma-10"></v-card>
      </v-defaults-provider>
        </v-overlay> -->
    <!-- </v-row> -->
    <v-row dense>
      <v-col>
        <h1>{{ title }}</h1>
        <v-divider></v-divider> <br />
        <div class="float-left" v-for="item in products" :key="item.id">
          <Card
            :PID="item.Id"
            :Source="item.Image__c"
            :Name="item.Name"
            :Size="item.Size__c"
            :Price="item.Price__c"
            :Description="item.Description__c"
            @product-detail="handleProduct"
          />
        </div>
      </v-col>
      <v-col cols="4">
        <CartVue />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/Card.vue";
import CartVue from "./Cart.vue";

export default {
  name: "HomePage",
  setup() {
    return {};
  },
  data: () => {
    return {
      // defaults: {
      //   global: {
      //     elevation: 10,
      //   },
      //   VCard: {
      //     color: "cyan-lighten-4",
      //   },
      // },
      
      productId: "",
      pList: [],
      cart: [],
      tAmount: 0,
    };
  },
  methods: {
    getState() {
      console.log(this.productId);
    },
    // handleAdd(id) {
    //   this.cart.forEach((element) => {
    //     element.Quantity =
    //       element.PID === id ? (element.Quantity += 1) : element.Quantity;

    //     element.Amount = Number(element.Quantity) * Number(element.Price);
    //   });
    // },

    // handleRemove(id) {
    //   this.cart.forEach((element) => {
    //     element.Quantity =
    //       element.PID === id ? (element.Quantity -= 1) : element.Quantity;
    //     element.Amount = Number(element.Quantity) * Number(element.Price);
    //   });

    //   this.cart = this.cart.filter((c) => c.Quantity !== 0);
    // },
    handleProduct(s) {
      this.productId = s.PID;
      if (this.$store.state.cart.length > 0) {
        let orderedProduct = this.$store.state.cart.find(
          (c) => this.productId === c.PID
        );
        if (!orderedProduct) {
          this.$store.dispatch("addToCart", {
            PID: s.PID,
            Name: s.Name,
            Price: s.Price,
            Quantity: 1,
            Amount: Number(s.Price),
          });
        }
      } else {
        this.$store.dispatch("addToCart", {
          PID: s.PID,
          Name: s.Name,
          Price: s.Price,
          Quantity: 1,
          Amount: Number(s.Price),
        });
      }
    },
  },
  computed: {
    title() {
      return this.$store.state.appTitle;
    },
    products() {
      return this.$store.state.productList;
    },
    // getTotalAmount() {
    //   this.tAmount = 0;
    //   this.cart.forEach((element) => {
    //     this.tAmount += element.Amount;
    //   });
    //   return this.tAmount;
    // },
  },
  created() {
    this.pList = this.$store.state.productList;
  },
  components: {
    Card,
    CartVue,
  },
};
</script>

<style>
table {
  text-align: center;
  width: 100%;
  border-collapse: collapse;
}
td {
  width: 6em;
}

table,
td,
th {
  border-bottom: 1px solid;
}
</style>
