<template>
  <div class="row">
    <div class="col-md-12">
      <nav class="navbar navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
          <router-link :to="{ name: 'HomePage'}" class="navbar-brand">Home</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
            </ul>
          </div>
          <div class="d-flex justify-content-right">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link :to="{ name: 'NewBookmark'}" class="nav-link">Add New Bookmark</router-link>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ _getCurrentUser?.username}}
                  </a>
                  <ul class="dropdown-menu">
                    <li><button class="dropdown-item" @click="onLogout" >Çıkış Yap</button></li>
                  </ul>
                </li>
              </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters(["_isAuthenticated", "_getCurrentUser"])
  },
  methods: {
    onLogout() {
      this.$store.commit('logout');
      this.$router.push({name: "LoginPage"});
    }
  }
}
</script>