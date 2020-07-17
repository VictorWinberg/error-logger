<template>
  <div v-if="!loading">
    <b-container fluid>
      <b-row class="text-right">
        <b-col sm="3">
          <label for="name">Name</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="project.name" type="text"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
    <br />
    <b-button variant="outline-success" @click="editProject(id)">
      SAVE
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";

export default Vue.extend({
  name: "ProjectEditForm",
  components: {},
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      project: {},
      loading: true
    };
  },
  created() {
    this.refreshProject();
  },
  methods: {
    async refreshProject() {
      this.loading = true;
      this.project = await this.$store.dispatch("project/read", [this.id]);
      this.loading = false;
    },
    async editProject(id: string) {
      if (this.valid()) {
        await this.$store.dispatch("project/update", [id, this.project]);
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
