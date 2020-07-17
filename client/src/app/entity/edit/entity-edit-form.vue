<template>
  <div v-if="!loading">
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
          <b-form-input v-model="entity.browserVersion"></b-form-input>
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
          <b-form-input v-model="entity.platformVersion"></b-form-input>
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
    <br />
    <b-button variant="outline-success" @click="editEntity(id)">
      SAVE
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";
import EntitySelector from "@/components/EntitySelector.vue";

export default Vue.extend({
  name: "EntityEditForm",
  components: {
    EntitySelector
  },
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      entity: {},
      loading: true
    };
  },
  created() {
    this.refreshEntity();
  },
  methods: {
    async refreshEntity() {
      this.loading = true;
      this.entity = await this.$store.dispatch("entity/read", [this.id]);
      this.loading = false;
    },
    async editEntity(id: string) {
      if (this.valid()) {
        await this.$store.dispatch("entity/update", [id, this.entity]);
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
