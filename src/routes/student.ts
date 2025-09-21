import { Router } from "express";
import db from "../database/db";
import { sendSuccess, sendError } from "../utils/response";
import { enrollmentSchema, emailParamSchema } from "../schemas/studentSchemas";

const router = Router();

router.get("/student/:email/enrollments", (req, res) => {
	const { error } = emailParamSchema.validate(req.params);
	if (error) {
		return sendError(res, error.details[0].message, 400);
	}
	const email = req.params.email;

	db.all(
		`SELECT e.studentEmail, e.enrolledAt, c.id as courseId, c.title, c.description, c.difficulty 
    FROM enrollments e JOIN courses c ON e.courseId = c.id 
    WHERE studentEmail = ?`,
		[email],
		(err, rows) => {
			if (err) return sendError(res, err.message, 500);
			return sendSuccess(res, rows);
		}
	);
});

router.post("/enrollments", (req, res) => {
	const { error } = enrollmentSchema.validate(req.body);
	if (error) {
		return sendError(res, error.details[0].message, 400);
	}
	const { courseId, studentEmail } = req.body;

	db.get("SELECT title FROM courses WHERE id = ?", [courseId], (err, row) => {
		if (err) return sendError(res, err.message, 500);
		if (!row) return sendError(res, "Course not found", 404);

		db.run(
			"INSERT INTO enrollments (studentEmail, courseId) VALUES (?, ?)",
			[studentEmail, courseId],
			(err) => {
				if (err) {
					if (err.message.includes("UNIQUE constraint failed")) {
						return sendError(
							res,
							"Student already enrolled in this course",
							409
						);
					}
					return sendError(res, err.message, 500);
				}

				return sendSuccess(res, "Enroll course successfully.", 201);
			}
		);
	});
});

export default router;
