import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("POST /api/contact", () => {
  it("doit refuser un formulaire vide", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({});

    expect(response.status).toBe(400);
  });

  it("doit accepter un formulaire valide", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Yonna Merlini",
        email: "test@example.com",
        message: "Bonjour, je souhaite vous contacter."
      });

    expect(response.status).toBe(200);
  });
});