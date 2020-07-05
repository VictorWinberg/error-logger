<template>
  <div>
    <entity-show-form :id="id"></entity-show-form>
    <button @click="back()">GO BACK</button>
    <button @click="editEntity(id)">EDIT</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EntityShowForm from "@/app/entity/show/entity-show-form.vue";

export default Vue.extend({
  name: "EntityShow",
  components: {
    EntityShowForm
  },
  props: {
    id: { type: String, required: true }
  },
  methods: {
    editEntity(id: string) {
      this.$router.push({
        name: "EntityEdit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "EntityList" });
    }
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
