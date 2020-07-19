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

  /**
   * @swagger
   * /projects:
   *   post:
   *     summary: Create project
   *     tags: [Project]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: "body"
   *         in: "body"
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Project"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/Project'
   *       400:
   *         description: Bad Request
   */
  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const result = await db.Project.create(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error creating a project", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  /**
   * @swagger
   * /projects/{id}:
   *   get:
   *     summary: Get project
   *     tags: [Project]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         format: uuid
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/Project'
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   */
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

  /**
   * @swagger
   * /projects/{id}:
   *   put:
   *     summary: Update project
   *     tags: [Project]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         format: uuid
   *       - name: "body"
   *         in: "body"
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Project"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/Project'
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   */
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

  /**
   * @swagger
   * /projects/{id}:
   *   delete:
   *     summary: Delete project
   *     tags: [Project]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         format: uuid
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   */
  app.delete("/api/projects/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Project.findByPk(id);
      if (result == null) {
        return res.status(404).send("Project Not Found");
      }
      await result.destroy({ force: true });
      return res.send({ id });
    } catch (err) {
      console.error("Error deleting project", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });
};
