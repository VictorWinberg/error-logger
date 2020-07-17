<template>
  <ul v-if="!loading">
    <li v-for="entity in entities" :key="entity.id">
      <hr />
      Error: {{ entity.ErrorId }}
      <br />
      <b>{{ entity.browser }}</b>
      <br />
      <b>{{ entity.browserVersion }}</b>
      <br />
      <b>{{ entity.platform }}</b>
      <br />
      <b>{{ entity.platformVersion }}</b>
      <br />
      <b>{{ entity.location }}</b>
      <br />
      <b-button variant="outline-primary" @click="showEntity(entity.id)">
        SHOW
      </b-button>
      <b-button variant="outline-dark" @click="editEntity(entity.id)">
        EDIT
      </b-button>
      <b-button variant="outline-danger" @click="removeEntity(entity.id)">
        REMOVE
      </b-button>
    </li>
    <hr />
  </ul>
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
    },
    showEntity(id: string) {
      this.$router.push({
        name: "EntityShow",
        params: { id }
      });
    },
    editEntity(id: string) {
      this.$router.push({
        name: "EntityEdit",
        params: { id }
      });
    },
    async removeEntity(id: string) {
      this.loading = true;
      await this.$store.dispatch("entity/remove", [id]);
      await this.refreshEntities();
      this.loading = false;
    }
  }
});
</script>

<style lang="scss">
ul {
  list-style: none;
  padding: 0;
}
.error {
  color: red;
}
</style>
