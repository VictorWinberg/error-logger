<template>
  <div v-if="!loading">
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
    <button @click="editError(id)">SAVE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";
import EntitySelector from "@/components/EntitySelector.vue";

export default Vue.extend({
  name: "ErrorEditForm",
  components: {
    EntitySelector
  },
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      error: {},
      loading: true
    };
  },
  created() {
    this.refreshError();
  },
  methods: {
    async refreshError() {
      this.loading = true;
      this.error = await this.$store.dispatch("error/read", [this.id]);
      this.loading = false;
    },
    async editError(id: string) {
      if (this.valid()) {
        await this.$store.dispatch("error/update", [id, this.error]);
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
