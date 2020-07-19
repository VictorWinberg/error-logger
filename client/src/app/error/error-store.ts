import { ApiService } from "@/main";
import { Error } from "@/api";

export default {
  error: {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      async create(_: {}, payload: {}): Promise<void> {
        const res = await ApiService.postErrors({ body: payload });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
      },
      async list(): Promise<Error[]> {
        const res = await ApiService.getErrors({});
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
        return res.body;
      },
      async read(_: {}, [id]: [string]): Promise<{}> {
        const res = await ApiService.getErrorsById({ id });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
        return res.body;
      },
      async update(_: {}, [id, payload]: [string, {}]): Promise<void> {
        const res = await ApiService.putErrorsById({ id, body: payload });
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
