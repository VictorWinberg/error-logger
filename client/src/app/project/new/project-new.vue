<template>
  <div>
    <project-new-form></project-new-form>
    <button @click="back()">GO BACK</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProjectNewForm from "@/app/project/new/project-new-form.vue";

export default Vue.extend({
  name: "ProjectNew",
  components: {
    ProjectNewForm
  },
  methods: {
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
