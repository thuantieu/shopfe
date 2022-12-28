<template>
  <v-container>
    <div :elevation="10">
      <h1>Order summary</h1>
       <br />
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Amount</th>
          </tr>
        </thead>
        <tbody v-for="item in getCart" :key="item.id">
          <tr>
            <td class="text-left">{{ item.PID }}</td>
            <td class="text-left">{{ item.Name }}</td>
            <td class="text-left">{{ item.Price }}</td>
            <td class="text-left">
              {{ item.Quantity }}
            </td>
            <td class="text-left">{{ item.Amount }}</td>
          </tr>
        </tbody>
      </v-table>
      <h2>Total amount: {{ getTotalAmount }} &euro;</h2>
      <v-btn color="green"> Send Order </v-btn>
      <v-btn color="red" @click="cancelOrder"> Cancel Order </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      cart: [],
      tAmount: 0,
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
    cancelOrder() {
      this.cart = [];
      this.$store.dispatch("updateCart", this.cart);
      this.$router.push({path: '/'})
    },
  },
  created() {
    this.cart = this.$store.state.cart;
  },
};
</script>

<style></style>
