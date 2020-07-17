<template>
  <div v-if="!loading">
    Error: {{ entity.Error.id }}
    <br />
    <h1>{{ entity.browser }}</h1>
    <br />
    <h1>{{ entity.browserVersion }}</h1>
    <br />
    <h1>{{ entity.platform }}</h1>
    <br />
    <h1>{{ entity.platformVersion }}</h1>
    <br />
    <h1>{{ entity.location }}</h1>
    <br />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EntityShowForm",
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      entity: {},
      loading: true
    };
  },
  created() {
    this.refreshEntity();
  },
  methods: {
    async refreshEntity() {
      this.loading = true;
      this.entity = await this.$store.dispatch("entity/read", [this.id]);
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
