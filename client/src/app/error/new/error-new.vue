<template>
  <div>
    <error-new-form></error-new-form>
    <button @click="back()">GO BACK</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ErrorNewForm from "@/app/error/new/error-new-form.vue";

export default Vue.extend({
  name: "ErrorNew",
  components: {
    ErrorNewForm
  },
  methods: {
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
