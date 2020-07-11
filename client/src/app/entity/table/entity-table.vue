<template>
  <div>
    <h1>
      Table
    </h1>
    <ul v-if="!loading">
      <li v-for="entity in entities" :key="entity.id">
        <hr />
        Error: {{ entity.ErrorId }}
        <br />
        <b>{{ entity.browser }}</b>
        <br />
        <b>{{ entity.browser_version }}</b>
        <br />
        <b>{{ entity.platform }}</b>
        <br />
        <b>{{ entity.platform_version }}</b>
        <br />
        <b>{{ entity.location }}</b>
        <br />
      </li>
      <hr />
      <b-button variant="outline-primary">
        GO BACK
      </b-button>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";

export default Vue.extend({
  name: "EntityListTable",
  data() {
    return {
      entities: [],
      loading: true
    };
  },
  created() {
    this.refreshEntities();
    bus.$on("refresh", () => this.refreshEntities());
  },
  methods: {
    async refreshEntities() {
      this.loading = true;
      this.entities = await this.$store.dispatch("entity/list");
      this.loading = false;
    }
  }
});
</script>

<style scoped lang="scss">
</style>
