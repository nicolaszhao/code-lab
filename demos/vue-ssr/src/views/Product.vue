<template>
  <h2>Product</h2>
  <p>
    Product name: {{ product.name }}
  </p>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchProduct', route.params.id);
  },
  computed: {
    product() {
      return this.$store.state.products[this.$route.params.id]
    },
  },
}
</script>

<style>

</style>
