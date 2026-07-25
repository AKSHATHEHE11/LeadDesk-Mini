const request = require("supertest");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = require("../app");

const User = require("../models/User");
const Lead = require("../models/Lead");

let adminToken;
let memberToken;
let memberId;

beforeAll(async () => {

  await User.deleteMany({});
  await Lead.deleteMany({});

  const password = await bcrypt.hash("password123",10);

  const admin = await User.create({
    name:"Admin",
    email:"admin@test.com",
    password,
    role:"admin"
  });

  const member = await User.create({
    name:"Member",
    email:"member@test.com",
    password,
    role:"member"
  });

  memberId = member._id;

  adminToken = (
    await request(app)
      .post("/api/auth/login")
      .send({
        email:"admin@test.com",
        password:"password123"
      })
  ).body.token;

  memberToken = (
    await request(app)
      .post("/api/auth/login")
      .send({
        email:"member@test.com",
        password:"password123"
      })
  ).body.token;

});

afterAll(async()=>{
    await User.deleteMany({});
    await Lead.deleteMany({});
    await mongoose.connection.close();
});

describe("Lead API",()=>{

    let leadId;

    test("Admin creates lead",async()=>{

        const res=await request(app)
        .post("/api/leads")
        .set("Authorization",`Bearer ${adminToken}`)
        .send({
            name:"John",
            email:"john@test.com",
            company:"ABC",
            phone:"9999999999"
        });

        expect(res.statusCode).toBe(201);

        leadId=res.body.data._id;

    });

    test("Member cannot create lead",async()=>{

        const res=await request(app)
        .post("/api/leads")
        .set("Authorization",`Bearer ${memberToken}`)
        .send({
            name:"A",
            email:"a@test.com",
            company:"ABC",
            phone:"1111111111"
        });

        expect(res.statusCode).toBe(403);

    });

    test("Admin assigns lead",async()=>{

        const res=await request(app)
        .put(`/api/leads/${leadId}/assign`)
        .set("Authorization",`Bearer ${adminToken}`)
        .send({
            assignedTo:memberId
        });

        expect(res.statusCode).toBe(200);

    });

});