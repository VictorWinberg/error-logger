<template>
  <div>
    <label for="project">Project</label>
    <entity-selector
      v-model="error.ProjectId"
      entity="project"
      option-name="name"
    ></entity-selector>
    <br />
    <label for="type">Type</label>
    <input id="type" v-model="error.type" type="text" />
    <br />
    <label for="stacktrace">Stacktrace</label>
    <textarea id="stacktrace" v-model="error.stacktrace" />
    <br />
    <button @click="addError()">CREATE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";
import EntitySelector from "@/components/EntitySelector.vue";

export default Vue.extend({
  name: "ErrorNewForm",
  components: {
    EntitySelector
  },
  data() {
    return {
      error: {}
    };
  },
  methods: {
    async addError() {
      if (this.valid()) {
        await this.$store.dispatch("error/create", this.error);

        this.error = {};
        bus.$emit("refresh");
      }
    },
    valid(): boolean {
      return true;
    }
  }
});
</script>

<style lang="scss">
.error {
  color: red;
}
</style>
