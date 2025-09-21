import request from "supertest";
import app  from "../src/index";

describe("Course Routes", () => {
  it("should list all courses", async () => {
    const res = await request(app).get("/courses");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should fail to create course without required fields", async () => {
    const res = await request(app).post("/courses").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should create course successfully", async () => {
    const res = await request(app).post("/courses").send({ title: "New Course", description: "Course Description", difficulty: "Beginner" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
  });
});
