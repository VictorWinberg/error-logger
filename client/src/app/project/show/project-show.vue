<template>
  <div>
    <project-show-form :id="id"></project-show-form>
    <b-button variant="dark" @click="back()">
      GO BACK
    </b-button>
    <b-button variant="outline-dark" @click="editProject(id)">
      EDIT
    </b-button>
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

<style scoped lang="scss">
.error {
  color: red;
}
</style>
