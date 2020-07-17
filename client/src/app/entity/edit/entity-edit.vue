<template>
  <div>
    <entity-edit-form :id="id"></entity-edit-form>
    <button @click="back()">GO BACK</button>
    <button @click="showEntity(id)">SHOW</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EntityEditForm from "@/app/entity/edit/entity-edit-form.vue";

export default Vue.extend({
  name: "EntityEdit",
  components: {
    EntityEditForm
  },
  props: {
    id: { type: String, required: true }
  },
  methods: {
    showEntity(id: string) {
      this.$router.push({
        name: "EntityShow",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "EntityList" });
    }
  }
});
</script>

<style lang="scss"></style>
