<template>
  <div>
    <entity-show-form :id="id"></entity-show-form>
    <b-button variant="dark" @click="back()">
      GO BACK
    </b-button>
    <b-button variant="outline-dark" @click="editEntity(id)">
      EDIT
    </b-button>
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

<style lang="scss">
.error {
  color: red;
}
</style>
