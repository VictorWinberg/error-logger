<template>
  <div v-if="!loading">
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
    <label for="browser_version">Browser_version</label>
    <input id="browser_version" v-model="entity.browser_version" type="text" />
    <br />
    <label for="platform">Platform</label>
    <input id="platform" v-model="entity.platform" type="text" />
    <br />
    <label for="platform_version">Platform_version</label>
    <input
      id="platform_version"
      v-model="entity.platform_version"
      type="text"
    />
    <br />
    <label for="location">Location</label>
    <input id="location" v-model="entity.location" type="text" />
    <br />
    <button @click="editEntity(id)">SAVE</button>
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

<style scoped lang="scss">
.error {
  color: red;
}
</style>
