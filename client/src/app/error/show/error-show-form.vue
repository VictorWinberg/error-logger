<template>
  <div v-if="!loading">
    Project: {{ error.Project.name }}
    <br />
    <h1>{{ error.type }}</h1>
    <br />
    {{ error.stacktrace }}
    <br />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ErrorShowForm",
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      error: {},
      loading: true
    };
  },
  created() {
    this.refreshError();
  },
  methods: {
    async refreshError() {
      this.loading = true;
      this.error = await this.$store.dispatch("error/read", [this.id]);
      this.loading = false;
    }
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
