<template>
  <div>
    <project-edit-form :id="id"></project-edit-form>
    <button @click="back()">GO BACK</button>
    <button @click="showProject(id)">SHOW</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProjectEditForm from "@/app/project/edit/project-edit-form.vue";

export default Vue.extend({
  name: "ProjectEdit",
  components: {
    ProjectEditForm
  },
  props: {
    id: { type: String, required: true }
  },
  methods: {
    showProject(id: string) {
      this.$router.push({
        name: "ProjectShow",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "ProjectList" });
    }
  }
});
</script>

<style scoped lang="scss"></style>
