<template>
  <div>
    <error-edit-form :id="id"></error-edit-form>
    <b-button variant="outline-dark" @click="back()">
      GO BACK
    </b-button>
    <b-button variant="outline-primary" @click="showError(id)">
      SHOW
    </b-button>
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
