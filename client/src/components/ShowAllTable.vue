<template>
  <div class="column is-9">
    <div class="container">
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th style="width: 5%">ID</th>
            <th style="width: 25%">Product Name</th>
            <th style="width: 22%">Category</th>
            <th style="width: 10%">Stock</th>
            <th style="width: 18%">Price</th>
            <th style="width: 20%">Action</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th style="width: 5%">ID</th>
            <th style="width: 25%">Product Name</th>
            <th style="width: 22%">Category</th>
            <th style="width: 10%">Stock</th>
            <th style="width: 18%">Price</th>
            <th style="width: 20%">Action</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <th>{{ product.id }}</th>
            <td>
              <a href="#">{{ product.name }}</a>
            </td>
            <td>{{ product.category_name }}</td>
            <td>{{ product.stock }}</td>
            <td>Rp. {{ product.price.toLocaleString("id") }}</td>
            <td>
              <a
                class="button is-warning is-small is-rounded"
                @click.prevent="editItem(product.id)"
                >Edit</a
              >
              <a
                class="button is-danger is-small is-rounded"
                @click="deleteItem(product.id)"
                >Delete</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getProducts() {
      this.$store.dispatch("getProducts");
    },
    deleteItem(id) {
      this.$store.dispatch("deleteProduct", { id });
    },
    editItem(id) {
      this.$router.push({ path: `/home/${id}/edit` });
    },
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style></style>
