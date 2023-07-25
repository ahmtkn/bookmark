<template>
  <div class="d-flex justify-content-center my-5">
    <div class="card w-25">
      <div class="card-body">
        <div class="mb-3">
          <label for="username" class="form-label">Name</label>
          <input type="text" class="form-control" id="username" v-model="userData.username" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="userData.email" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="userData.password" id="password">
        </div>
        <div>
          <button type="submit" class="btn btn-primary" @click="onSave">Submit</button>
        </div>
        <span class="text-center mt-3">
            Zaten üyeyim
            <router-link :to="{name: 'LoginPage'}">Giriş Yap</router-link>
          </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        username: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    onSave() {
     this.$appAxios.post('/users', { ...this.userData }).then(response => {
        this.$store.commit('setUser', response.data);
        this.$router.push({name: 'HomePage'})
      });
    }
  }
}
</script>