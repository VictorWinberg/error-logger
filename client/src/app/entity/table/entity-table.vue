<template>
  <div>
    <h1>
      Table
    </h1>

    <b-card v-if="!loading" no-body>
      <b-container v-for="error in groupedEntities" :key="error.errorId">
        <b-row v-b-toggle="`accordion-${error.errorId}`" class="text-left">
          <b-col sm="6">
            {{ error.errorId }}
          </b-col>
          <b-col sm="6">
            {{ countLevel1(error) }}
          </b-col>
        </b-row>
        <b-collapse
          :id="`accordion-${error.errorId}`"
          :accordion="`accordion-${error.errorId}`"
          role="tabpanel"
        >
          <b-card no-body>
            <b-container v-for="browser in error.items" :key="browser.browser">
              <b-row
                v-b-toggle="`accordion-${error.errorId}-${browser.browser}`"
                class="text-left"
              >
                <b-col cols="6">
                  {{ browser.browser }}
                </b-col>
                <b-col cols="6">
                  {{ countLevel2(browser) }}
                </b-col>
              </b-row>
              <b-collapse
                :id="`accordion-${error.errorId}-${browser.browser}`"
                :accordion="`accordion-${error.errorId}-${browser.browser}`"
                role="tabpanel"
              >
                <b-card no-body>
                  <b-container
                    v-for="version in browser.items"
                    :key="version.browserVersion"
                  >
                    <b-row
                      v-b-toggle="
                        `accordion-${error.errorId}-${browser.browser}-${version.browserVersion}`
                      "
                      class="text-left"
                    >
                      <b-col cols="6">
                        {{ version.browserVersion }}
                      </b-col>
                      <b-col cols="6">
                        {{ countLevel3(version) }}
                      </b-col>
                    </b-row>
                    <b-collapse
                      :id="
                        `accordion-${error.errorId}-${browser.browser}-${version.browserVersion}`
                      "
                      :accordion="
                        `accordion-${error.errorId}-${browser.browser}-${version.browserVersion}`
                      "
                      role="tabpanel"
                    >
                      <b-card
                        v-for="entity in version.items"
                        :key="entity.id"
                        no-body
                      >
                        <b-row v-for="(value, key) in entity" :key="key">
                          <b-col cols="3" class="text-right">
                            <b>{{ key }}:</b>
                          </b-col>
                          <b-col cols="9" class="text-left">
                            <code>{{ value }}</code>
                          </b-col>
                        </b-row>
                      </b-card>
                    </b-collapse>
                  </b-container>
                </b-card>
              </b-collapse>
            </b-container>
          </b-card>
        </b-collapse>
      </b-container>
    </b-card>
    <br />
    <b-button variant="outline-primary" @click="back()">
      GO BACK
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";

interface Error {
  errorId: string;
  items: Browser[];
}
interface Browser {
  browser: string;
  items: BrowserVersion[];
}

interface BrowserVersion {
  browserVersion: string;
  items: Entity[];
}

interface Entity {
  id: string;
  browser: string;
  browserVersion: string;
  platform: string;
  platformVersion: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  ErrorId: string;
}

interface Data {
  entities: Entity[];
  loading: boolean;
}

export default Vue.extend({
  name: "EntityListTable",
  data(): Data {
    return {
      entities: [],
      loading: true
    };
  },
  computed: {
    groupedEntities(): Error[] {
      var groupedEntities = this.entities.reduce(function(acc, entity) {
        if (acc.map((obj: Error) => obj.errorId).includes(entity.ErrorId)) {
          if (
            acc
              .find((obj: Error) => obj.errorId === entity.ErrorId)
              .items.map((obj: Browser) => obj.browser)
              .includes(entity.browser)
          ) {
            if (
              acc
                .find((obj: Error) => obj.errorId === entity.ErrorId)
                .items.find((obj: Browser) => obj.browser === entity.browser)
                .items.map((obj: BrowserVersion) => obj.browserVersion)
                .includes(entity.browser_version)
            ) {
              acc
                .find((obj: Error) => obj.errorId === entity.ErrorId)
                .items.find((obj: Browser) => obj.browser === entity.browser)
                .items.find(
                  (obj: BrowserVersion) =>
                    obj.browserVersion === entity.browser_version
                )
                .items.push(entity);
              return [...acc];
            } else {
              acc
                .find((obj: Error) => obj.errorId === entity.ErrorId)
                .items.find((obj: Browser) => obj.browser === entity.browser)
                .items.push({
                  browserVersion: entity.browser_version,
                  items: [entity]
                });
              return [...acc];
            }
          } else {
            acc
              .find((obj: Error) => obj.errorId === entity.ErrorId)
              .items.push({
                browser: entity.browser,
                items: [
                  { browserVersion: entity.browser_version, items: [entity] }
                ]
              });
            return [...acc];
          }
        } else {
          return [
            ...acc,
            {
              errorId: entity.ErrorId,
              items: [
                {
                  browser: entity.browser,
                  items: [
                    { browserVersion: entity.browser_version, items: [entity] }
                  ]
                }
              ]
            }
          ];
        }
      }, [] as Error[]);
      return groupedEntities;
    }
  },
  created() {
    this.refreshEntities();
    bus.$on("refresh", () => this.refreshEntities());
  },
  methods: {
    back() {
      this.$router.push({ name: "Home" });
    },
    countLevel1(error: Error) {
      var count = error.items.reduce(
        (acc, current) =>
          acc +
          current.items.reduce((a, c: BrowserVersion) => a + c.items.length, 0),
        0
      );
      return count;
    },
    countLevel2(browser: Browser) {
      return browser.items.reduce(
        (acc, current) => acc + current.items.length,
        0
      );
    },
    countLevel3(version: BrowserVersion) {
      return version.items.length;
    },
    async refreshEntities() {
      this.loading = true;
      this.entities = await this.$store.dispatch("entity/list");
      this.loading = false;
    }
  }
});
</script>

<style scoped lang="scss"></style>
