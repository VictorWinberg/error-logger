import { ApiService } from "@/main";
import { Project } from "@/api";

export default {
  project: {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      async create(_: {}, payload: {}): Promise<void> {
        const res = await ApiService.postProjects({ body: payload });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
      },
      async list(): Promise<Project[]> {
        const res = await ApiService.getProjects({});
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
        return res.body;
      },
      async read(_: {}, [id]: [string]): Promise<{}> {
        const res = await ApiService.getProjectsById({ id });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
        return res.body;
      },
      async update(_: {}, [id, payload]: [string, {}]): Promise<void> {
        const res = await ApiService.putProjectsById({ id, body: payload });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
      },
      async remove(_: {}, [id]: [string]): Promise<void> {
        const res = await ApiService.deleteProjectsById({ id });
        if (!res.ok || res.status !== 200) {
          throw new Error("Response: " + res.status);
        }
      }
    }
  }
};
