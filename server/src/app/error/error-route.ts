import { Express, Request, Response } from "express";
import { omit } from "lodash/fp";

/**
 * @swagger
 * tags:
 *   name: Error
 */
export default (app: Express, db: any) => {
  /**
   * @swagger
   * /errors:
   *   get:
   *     summary: Returns errors
   *     tags: [Error]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Error'
   */
  app.get("/api/errors", async (req: Request, res: Response) => {
    try {
      const results = await db.Error.findAll({
        include: [
          {
            model: db.Project,
            attributes: ["name"]
          }
        ]
      });
      return res.send(results);
    } catch (err) {
      console.error("Error querying errors", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  /**
   * @swagger
   * /errors:
   *   post:
   *     summary: Create error
   *     tags: [Error]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: "body"
   *         in: "body"
   *         required: true
   *         schema:
   *           $ref: "#/definitions/Error"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/Error'
   *       400:
   *         description: Bad Request
   */
  app.post("/api/errors", async (req: Request, res: Response) => {
    try {
      const result = await db.Error.create(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error creating a error", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  /**
   * @swagger
   * /errors/{id}:
   *   get:
   *     summary: Get error
   *     tags: [Error]
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
   *           $ref: '#/definitions/Error'
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   */
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

  /**
   * @swagger
   * /errors/{id}:
   *   put:
   *     summary: Update error
   *     tags: [Error]
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
   *           $ref: '#/definitions/Error'
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   */
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

  /**
   * @swagger
   * /errors/{id}:
   *   delete:
   *     summary: Delete error
   *     tags: [Error]
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
  app.delete("/api/errors/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.Error.findByPk(id);
      if (result == null) {
        return res.status(404).send("Error Not Found");
      }
      await result.destroy({
        force: true
      });
      return res.send({ id });
    } catch (err) {
      console.error("Error deleting error", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });
};
