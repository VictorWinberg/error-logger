import { Express, Request, Response } from "express";
import { omit } from "lodash/fp";

export default (app: Express, db: any) => {
  app.get("/api/errors", async (req: Request, res: Response) => {
    try {
      const results = await db.Error.findAll();
      return res.send(results);
    } catch (err) {
      console.error("Error querying errors", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.post("/api/errors", async (req: Request, res: Response) => {
    try {
      const result = await db.Error.create(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error creating a error", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.get("/api/errors/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Error.findByPk(id, { include: [{ all: true }] });
      if (result == null) {
        return res.status(404).send("Error Not Found");
      }
      return res.send(result);
    } catch (err) {
      console.error("Error querying errors", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.put("/api/errors/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Error.findByPk(id);
      if (result == null) {
        return res.status(404).send("Error Not Found");
      }
      await result.update(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error updating error", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.delete("/api/errors/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Error.findByPk(id);
      if (result == null) {
        return res.status(404).send("Error Not Found");
      }
      await result.destroy({ force: true });
      return res.send({ id });
    } catch (err) {
      console.error("Error deleting error", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });
};
