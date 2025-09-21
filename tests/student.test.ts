import request from "supertest";
import app  from "../src/index";

describe("Student Routes", () => {
  it("should list all courses enrolled by studentEmail", async () => {
    const email = "test@gmail.com";
    const res = await request(app).get(`/student/${email}/enrollments`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should fail with invalid email", async () => {
    const email = "test_gmail.com";
    const res = await request(app).get(`/student/${email}/enrollments`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should enroll course successfully", async () => {
    const email = "test@gmail.com";
    const res = await request(app).post('/enrollments').send({ courseId: 1, studentEmail: email });
    if(res.statusCode === 409) {
      expect(res.body).toHaveProperty("success", false);
    } else {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("success", true);
    }
  });

  it("should enroll fail with invalid email", async () => {
    const email = "test_gmail.com";
    const res = await request(app).post('/enrollments').send({ courseId: 1, studentEmail: email });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should enroll fail without required fields", async () => {
    const email = "test@gmail.com";
    const res = await request(app).post('/enrollments').send({ studentEmail: email });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });
});
