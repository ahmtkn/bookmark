<template>
  <div class="card mx-1 my-2" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ item.title }}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ item.category.name}}</h6>
      <p class="card-text">{{ item.description }}</p>
      <div class="d-flex justify-content-evenly">
        <button class="btn btn-transparent" :class="{'btn-primary': alreadyLiked}" @click="addLike">
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-current group-hover:text-white" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
            <path
                d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"
            />
          </svg>
        </button>
        <button class="btn btn-transparent" :class="{'btn-warning': alreadyBookmarked}"  @click="bookMarkItem">
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-current group-hover:text-white" enable-background="new 0 0 24 24" viewBox="0 0 24 24" width="24" height="24">
            <rect fill="none" />
            <path d="M17,11v6.97l-5-2.14l-5,2.14V5h6V3H7C5.9,3,5,3.9,5,5v16l7-3l7,3V11H17z M21,7h-2v2h-2V7h-2V5h2V3h2v2h2V7z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  props: ['item'],
  methods: {
    addLike() {
      this.$appAxios.get(`/user_likes?bookmarkId=${this.likedItem}`)
          .then(like_response => {
            this.$appAxios({
              url: this.alreadyLiked ? `/user_likes/${like_response.data[0].id}` : `/user_likes`,
              method: this.alreadyLiked ? "DELETE" : "POST",
              data: {
                userId: this._getCurrentUser.id,
                bookmarkId: this.item.id
              }
            }).then(response => {
              let bookmarks = this._userLikes;
              if (this.alreadyLiked) {
                bookmarks = this._userLikes.filter(b => b != this.likedItem);
              }else {
                bookmarks = [...bookmarks, response.data.bookmarkId]
              }
              this.$store.commit('setLikes', bookmarks);
            });
          });
    },
    bookMarkItem() {
      this.$appAxios.get(`/user_bookmarks?bookmarkId=${this.bookmarkedItem}`)
          .then(bookmark_response => {
            this.$appAxios({
              url: this.alreadyBookmarked ? `/user_bookmarks/${bookmark_response.data[0].id}` : `/user_bookmarks`,
              method: this.alreadyBookmarked ? "DELETE" : "POST",
              data: {
                userId: this._getCurrentUser.id,
                bookmarkId: this.item.id
              }
            }).then(response => {
              let bookmarks = this._userBookmarks;
              if (this.alreadyBookmarked) {
                bookmarks = this._userBookmarks.filter(b => b != this.bookmarkedItem)
              }else {
                bookmarks = [...bookmarks, response.data.bookmarkId]
              }
              this.$store.commit("setBookmarks", bookmarks);
            });
          });
    }
  },
  computed: {
    alreadyLiked() {
      return Boolean(this.likedItem);
    },
    likedItem() {
      return this._userLikes?.find(b => b == this.item.id);
    },
    alreadyBookmarked() {
      return Boolean(this.bookmarkedItem);
    },
    bookmarkedItem() {
      return this._userBookmarks?.find(b => b == this.item.id);
    },
     ...mapGetters(['_userLikes', '_getCurrentUser', '_userBookmarks'])
  }
}
</script>