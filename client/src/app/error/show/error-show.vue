<template>
  <div>
    <error-show-form :id="id"></error-show-form>
    <button @click="back()">GO BACK</button>
    <button @click="editError(id)">EDIT</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ErrorShowForm from "@/app/error/show/error-show-form.vue";

export default Vue.extend({
  name: "ErrorShow",
  components: {
    ErrorShowForm
  },
  props: {
    id: { type: String, required: true }
  },
  methods: {
    editError(id: string) {
      this.$router.push({
        name: "ErrorEdit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "ErrorList" });
    }
  }
});
</script>

<style lang="scss">
.error {
  color: red;
}
</style>
