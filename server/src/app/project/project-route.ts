import { Express, Request, Response } from "express";
import { omit } from "lodash/fp";

/**
 * @swagger
 * tags:
 *   name: Project
 */
export default (app: Express, db: any) => {
  /**
   * @swagger
   * /projects:
   *   get:
   *     summary: Returns projects
   *     tags: [Project]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Project'
   */
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const results = await db.Project.findAll();
      return res.send(results);
    } catch (err) {
      console.error("Error querying projects", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const result = await db.Project.create(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error creating a project", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Project.findByPk(id, {
        include: [{ all: true }]
      });
      if (result == null) {
        return res.status(404).send("Project Not Found");
      }
      return res.send(result);
    } catch (err) {
      console.error("Error querying projects", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.put("/api/projects/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Project.findByPk(id);
      if (result == null) {
        return res.status(404).send("Project Not Found");
      }
      await result.update(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error updating project", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.delete("/api/projects/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Project.findByPk(id);
      if (result == null) {
        return res.status(404).send("Project Not Found");
      }
      await result.destroy({
        force: true
      });
      return res.send({ id });
    } catch (err) {
      console.error("Error deleting project", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });
};
