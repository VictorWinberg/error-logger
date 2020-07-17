<template>
  <div>
    <error-edit-form :id="id"></error-edit-form>
    <button @click="back()">GO BACK</button>
    <button @click="showError(id)">SHOW</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ErrorEditForm from "@/app/error/edit/error-edit-form.vue";

export default Vue.extend({
  name: "ErrorEdit",
  components: {
    ErrorEditForm
  },
  props: {
    id: { type: String, required: true }
  },
  methods: {
    showError(id: string) {
      this.$router.push({
        name: "ErrorShow",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "ErrorList" });
    }
  }
});
</script>

<style lang="scss"></style>
