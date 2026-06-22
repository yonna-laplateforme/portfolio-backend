import { describe, it, expect, vi } from 'vitest';
import { getAllProjects } from './project.controller.js';

describe('Test d\'Intégration - project.controller', () => {
  it('doit traverser toutes les couches et renvoyer un tableau de projets provenant de la BDD', async () => {
    // 1. On simule les objets req et res d'Express
    const req = {}; // Pas besoin de paramètres pour un GET global
    const res = {
      json: vi.fn() // On crée un "espion" sur la méthode res.json()
    };

    // 2. On appelle directement la fonction du contrôleur
    // Elle va déclencher le Service, le Modèle et la vraie requête SQL
    await getAllProjects(req, res);

    // 3. Vérifications (Vérifie que l'intégration des couches s'est bien faite)
    // res.json() a bien dû être appelé par le contrôleur
    expect(res.json).toHaveBeenCalled();

    // On récupère les données reçues par res.json()
    const dataSent = res.json.mock.calls[0][0];

    // On vérifie que la base de données a bien renvoyé un tableau (vide ou rempli)
    expect(Array.isArray(dataSent)).toBe(true);
  });
});