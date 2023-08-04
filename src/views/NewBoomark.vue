<template>
  <div class="d-flex justify-content-center my-5">
    <div class="card w-25">
      <div class="card-body">
        <div class="mb-3">
          <label for="title" class="form-label">Başlık</label>
          <input type="text" class="form-control" id="title" v-model="bookMarkData.title">
        </div>
        <div class="mb-3">
          <label for="url" class="form-label">Url</label>
          <input type="text" class="form-control" id="url" v-model="bookMarkData.url">
        </div>
        <div class="mb-3">
          <label for="url" class="form-label">Kategori</label>
          <select class="form-select" aria-label="Seçiniz"  v-model="bookMarkData.categoryId">
            <option selected>Open this select menu</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div class="mb-3">
          <textarea cols="35" rows="10" v-model="bookMarkData.description"></textarea>
        </div>
        <div>
          <button type="submit" class="btn btn-primary" @click="onSave">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        categories: null,
        bookMarkData: {
          title: null,
          url: null,
          categoryId: null,
          description: null
        }
      }
    },
    mounted() {
      this.$appAxios.get('/categories').then(response => {
        this.categories = response.data;
      });
    },
    methods: {
      onSave() {
        this.$appAxios.post('/bookmarks', { ...this.bookMarkData, user_id: this._getCurrentUser }).then(() => {
          this.bookMarkData = {}
          this.$router.push({name: "HomePage"});
        });
      }
    },
    computed: {
      ...mapGetters(['_getCurrentUser'])
    }
  }
</script>
