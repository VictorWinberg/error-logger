<template>
  <div>
    <entity-new></entity-new>
    <entity-list-table></entity-list-table>
  </div>
</template>

<script lang="ts">
import EntityNew from "@/app/entity/new/entity-new-form.vue";
import EntityListTable from "@/app/entity/list/entity-list-table.vue";

export default {
  name: "EntityList",
  components: {
    EntityNew,
    EntityListTable
  }
};
</script>

<style lang="scss"></style>
