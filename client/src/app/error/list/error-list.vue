<template>
  <div>
    <error-new></error-new>
    <error-list-table></error-list-table>
  </div>
</template>

<script lang="ts">
import ErrorNew from "@/app/error/new/error-new-form.vue";
import ErrorListTable from "@/app/error/list/error-list-table.vue";

export default {
  name: "ErrorList",
  components: {
    ErrorNew,
    ErrorListTable
  }
};
</script>

<style lang="scss"></style>
