<template>
  <div>
    <entity-new-form></entity-new-form>
    <button @click="back()">GO BACK</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EntityNewForm from "@/app/entity/new/entity-new-form.vue";

export default Vue.extend({
  name: "EntityNew",
  components: {
    EntityNewForm
  },
  methods: {
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
