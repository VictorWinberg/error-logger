<template>
  <div>
    <b-container fluid>
      <b-row class="text-right">
        <b-col sm="3">
          <label> Entity </label>
        </b-col>
        <b-col sm="9">
          <entity-selector
            v-model="entity.ErrorId"
            entity="error"
            option-name="id"
          ></entity-selector>
        </b-col>
      </b-row>
      <b-row class="text-right">
        <b-col sm="3">
          <label> Browser </label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="entity.browser"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="text-right">
        <b-col sm="3">
          <label> Browser Version </label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="entity.browser_version"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="text-right">
        <b-col sm="3">
          <label> Platform </label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="entity.platform"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="text-right">
        <b-col sm="3">
          <label> Platform Version</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="entity.platform_version"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="text-right">
        <b-col sm="3">
          <label> Location </label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="entity.location"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
    <b-button variant="outline-success" @click="addEntity()">CREATE</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";
import EntitySelector from "@/components/EntitySelector.vue";

export default Vue.extend({
  name: "EntityNewForm",
  components: {
    EntitySelector
  },
  data() {
    return {
      entity: {},
      textField: "",
      types: [
        { name: "Error", model: "ErrorId" },
        { name: "Browser", model: "browser" },
        { name: "Browser version", model: "browser_version" },
        { name: "Platform", model: "entity.platform" },
        { name: "Platform version", model: "entity.platform_version" },
        { name: "Location", model: "location" }
      ]
    };
  },
  methods: {
    async addEntity() {
      console.log(this.entity);

      if (this.valid()) {
        await this.$store.dispatch("entity/create", this.entity);

        this.entity = {};
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
