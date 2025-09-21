import { Router } from "express";
import db from "../database/db";
import { sendSuccess, sendError } from "../utils/response";
import { createCourseSchema } from "../schemas/courseSchemas";

const router = Router();

router.get("/", (req, res) => {
	db.all("SELECT * FROM courses", [], (err, rows) => {
		if (err) return sendError(res, err.message, 500);
		return sendSuccess(res, rows);
	});
});

router.post("/", (req, res) => {
	const { error } = createCourseSchema.validate(req.body);
	if (error) {
		return sendError(res, error.details[0].message, 400);
	}
	const { title, description, difficulty } = req.body;

	db.run(
		"INSERT INTO courses (title, description, difficulty) VALUES (?, ?, ?)",
		[title, description, difficulty],
		(err) => {
			if (err) return sendError(res, err.message, 500);
			return sendSuccess(res, "Course created successfully", 201);
		}
	);
});

export default router;
