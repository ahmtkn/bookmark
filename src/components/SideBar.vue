<template>
  <div class="col-md-2">
    <div class="sidebar">
      <a class="" href="#" v-for="category in categories" :key="category.id" @click.prevent="$emit('getBookmarkByCategory', category.id)">{{ category.name }}</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: null,
    }
  },
  mounted() {
    this.$appAxios('/categories').then(response => this.categories = response.data);
  }
}
</script>