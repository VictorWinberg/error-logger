<template>
  <div>
    <project-new></project-new>
    <project-list-table></project-list-table>
  </div>
</template>

<script lang="ts">
import ProjectNew from "@/app/project/new/project-new-form.vue";
import ProjectListTable from "@/app/project/list/project-list-table.vue";

export default {
  name: "ProjectList",
  components: {
    ProjectNew,
    ProjectListTable
  }
};
</script>

<style scoped lang="scss"></style>
