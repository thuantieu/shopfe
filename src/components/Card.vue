<template>
  <v-card class="mr-2 mb-2" max-width="200px">
    <!-- <v-img src="@/sampledata/ball1.jpg" height="40%" cover></v-img> -->
    <v-img :src="Source" height="110px" cover></v-img>

    <v-card-title>
      {{ Name }}
    </v-card-title>

    <v-card-subtitle>
      Size: {{ Size }} <br />
      Price: {{ Price }}</v-card-subtitle
    >

    <v-card-actions>
      <v-btn color="red-darken-2" @click="getPid"> Add to cart </v-btn>
      <br />

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-card-text v-show="show">
        <h4>Product description</h4>
        <p>
          {{ Description }}
        </p>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    PID: String,
    Source: String,
    Name: String,
    Price: String,
    Size: String,
    Description: String,
  },
  data: () => ({
    show: false,
  }),
  methods: {
    getPid() {
      this.$emit("productDetail", {
        PID: this.PID,
        Name: this.Name,
        Size: this.Size,
        Price: this.Price,
        Description: this.Description,
      });
    },
  },
};
</script>
