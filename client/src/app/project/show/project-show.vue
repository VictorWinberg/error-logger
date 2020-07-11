<template>
  <div>
    <project-show-form :id="id"></project-show-form>
    <button @click="back()">GO BACK</button>
    <button @click="editProject(id)">EDIT</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProjectShowForm from "@/app/project/show/project-show-form.vue";

export default Vue.extend({
  name: "ProjectShow",
  components: {
    ProjectShowForm
  },
  props: {
    id: { type: String, required: true }
  },
  methods: {
    editProject(id: string) {
      this.$router.push({
        name: "ProjectEdit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "ProjectList" });
    }
  }
});
</script>

<style lang="scss">
.error {
  color: red;
}
</style>
