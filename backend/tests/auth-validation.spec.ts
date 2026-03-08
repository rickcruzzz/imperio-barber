import request from "supertest";
import { app } from "../src/app";

describe("Auth validation", () => {
  it("should reject weak password on register", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      name: "Teste User",
      email: "teste@email.com",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });

  it("should reject invalid login body", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "not-an-email",
      password: "short",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });
});
