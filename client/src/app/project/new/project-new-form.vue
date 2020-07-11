<template>
  <div>
    <label for="name">Name</label>
    <input id="name" v-model="project.name" type="text" />
    <br />
    <button @click="addProject()">CREATE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";

export default Vue.extend({
  name: "ProjectNewForm",
  components: {},
  data() {
    return {
      project: {}
    };
  },
  methods: {
    async addProject() {
      if (this.valid()) {
        await this.$store.dispatch("project/create", this.project);

        this.project = {};
        bus.$emit("refresh");
      }
    },
    valid(): boolean {
      return true;
    }
  }
});
</script>

<style lang="scss">
.error {
  color: red;
}
</style>
