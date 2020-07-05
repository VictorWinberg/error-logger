export default {
  project: {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      async create(_: {}, payload: {}): Promise<void> {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }
      },
      async list(): Promise<[]> {
        const res = await fetch("/api/projects");
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        return json;
      },
      async read(_: {}, [id]: [string]): Promise<{}> {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        return json;
      },
      async update(_: {}, [id, payload]: [string, {}]): Promise<void> {
        const res = await fetch(`/api/projects/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      },
      async remove(_: {}, [id]: [string]): Promise<void> {
        const res = await fetch(`/api/projects/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      }
    }
  }
};
