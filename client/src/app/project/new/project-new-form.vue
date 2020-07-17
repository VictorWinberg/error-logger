<template>
  <div>
    <b-container fluid>
      <b-row class="text-right">
        <b-col sm="3">
          <label for="name">Name</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="project.name" type="text"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
    <br />
    <b-button variant="outline-success" @click="addProject()">CREATE</b-button>
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
