import { Express, Request, Response } from "express";
import { omit } from "lodash/fp";

/**
 * @swagger
 * tags:
 *   name: Entity
 */
export default (app: Express, db: any) => {
  /**
   * @swagger
   * /entities:
   *   get:
   *     summary: Returns entities
   *     tags: [Entity]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Entity'
   */
  const { fn, col } = db.sequelize;
  app.get("/api/entities", async (req: Request, res: Response) => {
    try {
      const results = await db.Entity.findAll({
        include: [
          {
            model: db.Error,
            attributes: [
              "type",
              [fn("substring", col("stacktrace"), 1, 50), "stacktrace"]
            ]
          }
        ]
      });
      return res.send(results);
    } catch (err) {
      console.error("Error querying entities", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  /**
   * @swagger
   * /entities:
   *   post:
   *     summary: Create entity
   *     tags: [Entity]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: "body"
   *         in: "body"
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Entity"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/Entity'
   *       400:
   *         description: Bad Request
   */
  app.post("/api/entities", async (req: Request, res: Response) => {
    try {
      const result = await db.Entity.create(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error creating a entity", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  /**
   * @swagger
   * /entities/{id}:
   *   get:
   *     summary: Get entity
   *     tags: [Entity]
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
   *           $ref: '#/definitions/Entity'
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   */
  app.get("/api/entities/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Entity.findByPk(id, { include: [{ all: true }] });
      if (result == null) {
        return res.status(404).send("Entity Not Found");
      }
      return res.send(result);
    } catch (err) {
      console.error("Error querying entities", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  /**
   * @swagger
   * /entities/{id}:
   *   put:
   *     summary: Update entity
   *     tags: [Entity]
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
   *           $ref: '#/definitions/Entity'
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   */
  app.put("/api/entities/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Entity.findByPk(id);
      if (result == null) {
        return res.status(404).send("Entity Not Found");
      }
      await result.update(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error updating entity", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  /**
   * @swagger
   * /entities/{id}:
   *   delete:
   *     summary: Delete entity
   *     tags: [Entity]
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
  app.delete("/api/entities/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Entity.findByPk(id);
      if (result == null) {
        return res.status(404).send("Entity Not Found");
      }
      await result.destroy({ force: true });
      return res.send({ id });
    } catch (err) {
      console.error("Error deleting entity", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });
};
