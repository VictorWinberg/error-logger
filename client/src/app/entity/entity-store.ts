import { ApiService } from "@/main";
import { Entity } from "@/api";

export default {
  entity: {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      async create(_: {}, payload: {}): Promise<void> {
        const res = await ApiService.postEntities({ body: payload });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
      },
      async list(): Promise<Entity[]> {
        const res = await ApiService.getEntities({});
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
        return res.body;
      },
      async read(_: {}, [id]: [string]): Promise<Entity> {
        const res = await ApiService.getEntitiesById({ id });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
        return res.body;
      },
      async update(_: {}, [id, payload]: [string, {}]): Promise<void> {
        const res = await ApiService.putEntitiesById({ id, body: payload });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
      },
      async remove(_: {}, [id]: [string]): Promise<void> {
        const res = await ApiService.deleteEntitiesById({ id });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
      }
    }
  }
};
