import { describe, it, expect, vi } from "vitest";

vi.mock("../../src/models/project.model.js", () => ({
  findAll: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: "Portfolio",
      description: "Projet test",
    },
  ]),
}));

import { getAllProjects } from "../../src/controllers/project.controller.js";

describe("Test d'intégration - project.controller", () => {
  it("renvoie un tableau de projets sans appeler la vraie base de données", async () => {
    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    await getAllProjects(req, res, next);

    expect(res.json).toHaveBeenCalledWith([
      {
        id: 1,
        title: "Portfolio",
        description: "Projet test",
      },
    ]);

    expect(next).not.toHaveBeenCalled();
  });
});