<template>
  <div class="d-flex justify-content-center my-5">
    <div class="card w-25">
      <div class="card-body">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="password" id="password">
        </div>
        <div>
          <button type="submit" class="btn btn-primary" @click="onSave">Submit</button>
        </div>
        <span class="text-center mt-3">
            Üye değil misin ?
            <router-link :to="{name: 'RegisterPage'}">Üye Ol</router-link>
          </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    onSave(){
      this.$appAxios.get(`/users?email=${this.email}&password=${this.password}`).then(response => {
        if (response.data != null && response.data.length > 0) {
          this.$store.commit('setUser', response.data[0]);
          this.$router.push({name: "HomePage"});
        } else {
            throw "Kullanıcı bulunamadı";
        }
      }).catch(reason => {
        alert(reason);
      })
    }
  }
}

</script>