<template>
  <div v-show="tAmount > 0">
    <h1>Cart</h1>
    <v-divider></v-divider> <br />
    <table>
      <thead>
        <tr>
          <!-- <th>ID</th> -->
          <th>Name</th>
          <th>Price</th>
          <th colspan="2">Quantity</th>

          <th>Amount</th>
        </tr>
      </thead>

      <tbody v-for="item in getCart" :key="item.id">
        <tr>
          <!-- <td>{{ item.PID }}</td> -->
          <td>{{ item.Name }}</td>
          <td>{{ item.Price }}</td>
          <td>
            {{ item.Quantity }}
          </td>
          <td>
            <v-btn
              color="red-lighten-2"
              size="small"
              icon="mdi-plus"
              @click="handleAdd(item.PID)"
            ></v-btn>
            <br />
            <v-btn
              color="blue-lighten-2"
              size="small"
              icon="mdi-minus"
              @click="handleRemove(item.PID)"
            ></v-btn>
          </td>
          <td>{{ item.Amount }}</td>
        </tr>
      </tbody>
    </table>
    <br />

    <h2>Total amount: {{ getTotalAmount }} &euro;</h2>
    <v-btn color="green" @click="viewOrder"> View Cart </v-btn>
    <v-btn color="red" @click="cancelOrder"> Clear Cart </v-btn>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data: () => {
    return {
      cart: [],
      tAmount: 0,
    };
  },
  methods: {
    viewOrder() {
      this.$router.push({ path: "/order" });
    },
    cancelOrder() {
      this.cart = [];
      this.$store.dispatch("updateCart", this.cart);
    },
    async handleAdd(id) {
      this.cart.forEach((element) => {
        element.Quantity =
          element.PID === id ? (element.Quantity += 1) : element.Quantity;

        element.Amount = Number(element.Quantity) * Number(element.Price);
      });
      this.$store.dispatch("updateCart", this.cart);
    },

    handleRemove(id) {
      this.cart.forEach((element) => {
        element.Quantity =
          element.PID === id ? (element.Quantity -= 1) : element.Quantity;
        element.Amount = Number(element.Quantity) * Number(element.Price);
      });

      this.cart = this.cart.filter((c) => c.Quantity !== 0);
      this.$store.dispatch("updateCart", this.cart);
    },
  },
  computed: {
    getCart() {
      this.cart = this.$store.state.cart;
      return this.$store.state.cart;
    },
    getTotalAmount() {
      this.tAmount = 0;
      this.cart.forEach((element) => {
        this.tAmount += element.Amount;
      });
      return this.tAmount;
    },
  },
};
</script>

<style lang="scss" scoped></style>
