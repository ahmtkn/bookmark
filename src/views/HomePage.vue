<template>
  <AppHeader />
  <div class="row">
    <SideBar @getBookmarkByCategory="getByCategory" :categories="categories"/>
    <BookMarkList v-if="bookmarkLists.length > 0" :items="bookmarkLists" />
    <div class="col-md-10" v-else>Data yok...</div>
  </div>
</template>

<script>
import BookMarkList from "@/components/appBookmarkList/BookMarkList.vue";
export default {
  data() {
    return {
      categories: null,
      bookmarkLists: []
    }
  },
  components:{
    BookMarkList
  },
  mounted() {
    this.$appAxios.get('/bookmarks?_expand=category').then(response => this.bookmarkLists = response?.data)
  },
  methods: {
    getByCategory(categoryId) {
      const url = categoryId ? (`/bookmarks?_expand=category&user&categoryId=${categoryId}`) : this.$appAxios.get(`/bookmarks?_expand=category&user`)
      this.$appAxios.get(url).then(response => this.bookmarkLists = response?.data || []);
    }
  }
}
</script>

<style>
.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #000;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: #ffff;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active {
  background-color: #04AA6D;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>