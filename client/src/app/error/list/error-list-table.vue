<template>
  <ul v-if="!loading">
    <li v-for="error in errors" :key="error.id">
      <hr />
      Project: {{ error.ProjectId }}
      <br />
      <b>{{ error.type }}</b>
      <br />
      {{ error.stacktrace }}
      <br />
      <b-button variant="outline-primary" @click="showError(error.id)">
        SHOW
      </b-button>
      <b-button variant="outline-dark" @click="editError(error.id)">
        EDIT
      </b-button>
      <b-button variant="outline-danger" @click="removeError(error.id)">
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
  name: "ErrorListTable",
  data() {
    return {
      errors: [],
      loading: true
    };
  },
  created() {
    this.refreshErrors();
    bus.$on("refresh", () => this.refreshErrors());
  },
  methods: {
    async refreshErrors() {
      this.loading = true;
      this.errors = await this.$store.dispatch("error/list");
      this.loading = false;
    },
    showError(id: string) {
      this.$router.push({
        name: "ErrorShow",
        params: { id }
      });
    },
    editError(id: string) {
      this.$router.push({
        name: "ErrorEdit",
        params: { id }
      });
    },
    async removeError(id: string) {
      this.loading = true;
      await this.$store.dispatch("error/remove", [id]);
      await this.refreshErrors();
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
