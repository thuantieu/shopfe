<template>
  <v-container>
    
    <v-row dense>
      <v-col>
        <h1>{{ title }}</h1>
        <!-- <v-btn @click="getState">Get Id</v-btn> -->
        <v-divider></v-divider> <br />
        <div class="float-left" v-for="item in pList" :key="item.id">
          <Card
            :PID="item.id"
            :Source="item.image"
            :Name="item.name"
            :Size="item.size"
            :Price="item.price"
            :Description="item.manufacture"
            @product-detail="handleProduct"
          />
        </div>
      </v-col>
      <v-col cols="4">
        <h1>Cart</h1>
        <v-divider></v-divider> <br />
        <div v-show="tAmount > 0">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th colspan="2">Quantity</th>
    
                  <th>Amount</th>
                </tr>
              </thead>
    
              <tbody v-for="item in cart" :key="item.id">
                <tr>
                  <td>{{ item.PID }}</td>
                  <td>{{ item.Name }}</td>
                  <td>{{ item.Price }}</td>
                  <td>
                    {{ item.Quantity }}
                  </td>
                  <td>
                    <v-btn color="red-lighten-2" size="small" @click="handleAdd(item.PID)"><b>+</b></v-btn> <br>
                    <v-btn color="blue-lighten-2" size="small" @click="handleRemove(item.PID)"><b>-</b></v-btn>
                  </td>
                  <td>{{ item.Amount }}</td>
                </tr>
              </tbody>
            </table> <br>
             
            <h2>Total amount: {{ getTotalAmount }} &euro;</h2>
            <v-btn color="green"> Send Order </v-btn>
        </div>
      </v-col>
    </v-row>
    <!-- {{ pList }} -->
  </v-container>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "HomePage",
  setup() {
    return {};
  },
  data: () => {
    return {
      productId: "",
      pList: [],
      cart: [],
      tAmount: 0
    };
  },
  methods: {
    getState() {
      console.log(this.productId);
    },
    handleAdd (id) {
        this.cart.forEach(element => {
            element.Quantity = element.PID === id
            ? element.Quantity += 1
            : element.Quantity

            element.Amount = Number(element.Quantity) * Number(element.Price) 
        });
    },

    handleRemove (id) {
        this.cart.forEach(element => {
            element.Quantity = element.PID === id
            ? element.Quantity -= 1
            : element.Quantity
            element.Amount = Number(element.Quantity) * Number(element.Price) 
            
        });

        this.cart = this.cart.filter(c => c.Quantity !== 0)
    },
    handleProduct(s) {
      this.productId = s.PID;

      //   this.cart.push({
      //       PID: s.PID,
      //       Name: s.Name,
      //       Price: s.Price,
      //       Quantity: 1,
      //       Amount: Number(s.Price),
      //     });

      if (this.cart.length > 0) {
        let orderedProduct = this.cart.find((c) => this.productId === c.PID);
        if (!orderedProduct) {
          this.cart.push({
            PID: s.PID,
            Name: s.Name,
            Price: s.Price,
            Quantity: 1,
            Amount: Number(s.Price),
          });
        }
      } else {
        this.cart.push({
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
    getTotalAmount () {
        this.tAmount = 0
        this.cart.forEach(element => {
            this.tAmount += element.Amount
        });
        return this.tAmount
    }
  },
  created() {
    this.pList = this.$store.state.productList;
    console.log(this.cart);
  },
  components: {
    Card,
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
