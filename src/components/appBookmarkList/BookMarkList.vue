<template>
  <div class="col-md-11">
      <div class="row">
        <BookMarkListItem v-for="i in 10" :key="i"/>
      </div>
  </div>
</template>
<script>
import BookMarkListItem from "@/components/appBookmarkList/BookMarkListItem.vue";
export default {
  components:{
    BookMarkListItem
  }
}
</script>