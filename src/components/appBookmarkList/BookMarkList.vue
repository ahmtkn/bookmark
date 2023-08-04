<template>
  <div class="col-md-10">
      <div class="row">
        <BookMarkListItem v-for="item in items" :key="item.id" :item="item"/>
      </div>
  </div>
</template>
<script>
import BookMarkListItem from "@/components/appBookmarkList/BookMarkListItem.vue";
export default {
  props: ['items'],
  components:{
    BookMarkListItem
  },
  data() {
    return {
      bookmarks: null
    }
  },
}
</script>