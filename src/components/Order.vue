<template>
  <v-container>
    <div :elevation="10">
      <h1>Order summary</h1>
      <br />
      <h2>Customer Name:</h2>
      <v-text-field required ref="input" v-model="customerName"></v-text-field>
      <h2>Chosen products:</h2>
      <v-table>
        <thead>
          <tr>
            <!-- <th class="text-left">ID</th> -->
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Amount</th>
          </tr>
        </thead>
        <tbody v-for="item in getCart" :key="item.id">
          <tr>
            <!-- <td class="text-left">{{ item.PID }}</td> -->
            <td class="text-left">{{ item.Name }}</td>
            <td class="text-left">{{ item.Price }}</td>
            <td class="text-left">
              {{ item.Quantity }}
            </td>
            <td class="text-left">{{ item.Amount }}</td>
          </tr>
        </tbody>
      </v-table>
      <br />
      <h2>Total amount: {{ getTotalAmount }} &euro;</h2>
      <v-btn color="green" @click="sendOrder"> Send Order </v-btn>
      <v-btn color="red" @click="cancelOrder"> Cancel Order </v-btn>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/plugins/http-common";

export default {
  name: "Order",
  data() {
    return {
      customerName: "",
      cart: [],
      tAmount: 0,
      orderId: '',
    };
  },
  computed: {
    getCart() {
      this.cart = this.$store.state.cart;
      return this.$store.state.cart;
    },
    getTotalAmount() {
      this.tAmount = 0;
      this.$store.state.cart.forEach((element) => {
        this.tAmount += element.Amount;
      });
      return this.tAmount;
    },
  },
  methods: {
    async sendOrder() {
      

      await HTTP.post(
        "order",
        {
          name: `${this.customerName} ${this.tAmount}`,
          customer: this.customerName,
          tAmount: this.tAmount,
        },
        {
          headers: {
            authorization: `Bearer ${this.$store.state.token.access_token}`,
          },
        }
      ).then((response) => {
        this.orderId = response.data;
        console.log("new Order Id", response.data);
      });

      this.cart.forEach((element) => {
        HTTP.post(
          "chosenproduct",
          {
            name: element.Name,
            price: element.Price,
            quantity: element.Quantity,
            amount: element.Amount,
            order: this.orderId,
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.token.access_token}`,
            },
          }
        ).then((response) => {
          console.log("chosen product", response.data);
        });
      });

      this.cart = [];
      this.$store.dispatch("updateCart", this.cart);
      this.$router.push({ path: "/" });
    },
    cancelOrder() {
      this.cart = [];
      this.$store.dispatch("updateCart", this.cart);
      this.$router.push({ path: "/" });
    },
  },
  created() {
    this.cart = this.$store.state.cart;
  },
};
</script>

<style></style>
