<template>
  <div>
    <b-container fluid>
      <b-row class="text-right">
        <b-col sm="3">
          <label> Project </label>
        </b-col>
        <b-col sm="9">
          <entity-selector
            v-model="error.ProjectId"
            entity="project"
            option-name="name"
          ></entity-selector>
        </b-col>
      </b-row>
      <b-row class="text-right">
        <b-col sm="3">
          <label> Type </label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="error.type"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="text-right">
        <b-col sm="3">
          <label> Stacktrace </label>
        </b-col>
        <b-col sm="9">
          <b-form-textarea
            v-model="error.stacktrace"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-col>
      </b-row>
    </b-container>
    <br />
    <b-button variant="outline-success" @click="addError()">CREATE</b-button>
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

<style scoped lang="scss">
.error {
  color: red;
}
</style>
