<template>
  <div>
    <error-show-form :id="id"></error-show-form>
    <b-button variant="dark" @click="back()">
      GO BACK
    </b-button>
    <b-button variant="outline-dark" @click="editError(id)">
      EDIT
    </b-button>
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

<style scoped lang="scss">
.error {
  color: red;
}
</style>
