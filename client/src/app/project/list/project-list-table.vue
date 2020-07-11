<template>
  <ul v-if="!loading">
    <li v-for="project in projects" :key="project.id">
      <hr />
      <b>{{ project.name }}</b>
      <br />
      <b-button variant="outline-primary" @click="showProject(project.id)">
        SHOW
      </b-button>
      <b-button variant="outline-dark" @click="editProject(project.id)">
        EDIT
      </b-button>
      <b-button variant="outline-danger" @click="removeProject(project.id)">
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
  name: "ProjectListTable",
  data() {
    return {
      projects: [],
      loading: true
    };
  },
  created() {
    this.refreshProjects();
    bus.$on("refresh", () => this.refreshProjects());
  },
  methods: {
    async refreshProjects() {
      this.loading = true;
      this.projects = await this.$store.dispatch("project/list");
      this.loading = false;
    },
    showProject(id: string) {
      this.$router.push({
        name: "ProjectShow",
        params: { id }
      });
    },
    editProject(id: string) {
      this.$router.push({
        name: "ProjectEdit",
        params: { id }
      });
    },
    async removeProject(id: string) {
      this.loading = true;
      await this.$store.dispatch("project/remove", [id]);
      await this.refreshProjects();
      this.loading = false;
    }
  }
});
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
}
.error {
  color: red;
}
</style>
