import { describe, it, expect } from 'vitest';
import AppError from './AppError.js'; // Ajuste le chemin si nécessaire

describe('Classe AppError', () => {
  it('doit correctement initialiser le message et le code statut HTTP', () => {
    // 1. Instanciation de l'erreur (Exemple issu de tes règles de sécurité)
    const error = new AppError('Token manquant ou format invalide', 401);

    // 2. Vérifications avec les Matchers de ton cours
    expect(error.message).toBe('Token manquant ou format invalide');
    expect(error.status).toBe(401);
    expect(error).toBeInstanceOf(Error); 
  });
});