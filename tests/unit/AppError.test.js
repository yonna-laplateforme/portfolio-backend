import { describe, it, expect } from 'vitest';
import AppError from '../../src/errors/AppError.js'; 

describe('Classe AppError', () => {
  it('doit correctement initialiser le message et le code statut HTTP', () => {
    
    const error = new AppError('Token manquant ou format invalide', 401);

    
    expect(error.message).toBe('Token manquant ou format invalide');
    expect(error.status).toBe(401);
    expect(error).toBeInstanceOf(Error); 
  });
});