<template>
  <div v-if="!loading">
    <h1>{{ project.name }}</h1>
    <br />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProjectShowForm",
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      project: {},
      loading: true
    };
  },
  created() {
    this.refreshProject();
  },
  methods: {
    async refreshProject() {
      this.loading = true;
      this.project = await this.$store.dispatch("project/read", [this.id]);
      this.loading = false;
    }
  }
});
</script>

<style lang="scss">
.error {
  color: red;
}
</style>
