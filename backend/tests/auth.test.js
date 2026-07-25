const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Authentication", () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("Register user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("Login succeeds", async () => {

    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@test.com",
        password: "password123"
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Login fails with wrong password", async () => {

    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@test.com",
        password: "password123"
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "wrongpassword"
      });

    expect(res.statusCode).toBe(400);
  });

});