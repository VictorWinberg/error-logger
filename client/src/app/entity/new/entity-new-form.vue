<template>
  <div>
    <label for="error">Error</label>
    <entity-selector
      v-model="entity.ErrorId"
      entity="error"
      option-name="id"
    ></entity-selector>
    <br />
    <label for="browser">Browser</label>
    <input id="browser" v-model="entity.browser" type="text" />
    <br />
    <label for="browserVersion">Browser Version</label>
    <input id="browserVersion" v-model="entity.browserVersion" type="text" />
    <br />
    <label for="platform">Platform</label>
    <input id="platform" v-model="entity.platform" type="text" />
    <br />
    <label for="platformVersion">Platform Version</label>
    <input id="platformVersion" v-model="entity.platformVersion" type="text" />
    <br />
    <label for="location">Location</label>
    <input id="location" v-model="entity.location" type="text" />
    <br />
    <button @click="addEntity()">CREATE</button>
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
      entity: {}
    };
  },
  methods: {
    async addEntity() {
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

<style lang="scss">
.error {
  color: red;
}
</style>
