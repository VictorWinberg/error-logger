<template>
  <div v-if="!loading">
    <label for="name">Name</label>
    <input id="name" v-model="project.name" type="text" />
    <br />
    <button @click="editProject(id)">SAVE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";

export default Vue.extend({
  name: "ProjectEditForm",
  components: {},
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
    },
    async editProject(id: string) {
      if (this.valid()) {
        await this.$store.dispatch("project/update", [id, this.project]);
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
