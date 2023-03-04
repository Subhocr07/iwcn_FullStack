import express from "express";
import db from "./db.js";

const router = express.Router();

//get all the notes from the database

router.get("/notes", async (req, res) => {
  const q = "SELECT * FROM notes";
  try {
    const [data] = await db.query(q);
    if (data) return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

//when updating a note....it will fetch that particular note
router.get("/notes/:id", async (req, res) => {
  const q = "SELECT * FROM notes WHERE id = ?";
  const id = req.params.id;
  try {
    const [data] = await db.query(q, [id]);
    if (data) return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

//add new notes to the database
router.post("/notes", async (req, res) => {
  const q =
    "INSERT INTO notes (`id`, `title`, `description`) Values(default,?,?)";
  try {
    const [data] = await db.query(q, [req.body.title, req.body.description]);

    if (data) return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});
//delete notes from the database
router.delete("/notes/:id", async (req, res) => {
  const q = "DELETE FROM notes WHERE id = ?";
  try {
    const notesid = req.params.id;
    const [data] = await db.query(q, [notesid]);
    if (data) return res.json("delete successfully");
  } catch (error) {
    return res.json(error);
  }
});
//update notes in the database
router.put("/notes/:id", async (req, res) => {
  const q = "UPDATE notes SET `title` = ?, description = ? WHERE id = ? ";
  const notesid = req.params.id;
  try {
    const Values = [req.body.title, req.body.description];
    const [data] = await db.query(q, [...Values, notesid]);
    if (data) return res.json("successfully");
  } catch (error) {
    return res.json(error);
  }
});

export default router;
