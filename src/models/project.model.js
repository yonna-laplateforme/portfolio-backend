import db from '../config/db.js';

export const findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM projects ORDER BY created_at DESC');
    return rows;
};

export const findById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0] ?? null;
};

export const create = async (data) => {
    // On s'assure que si github_url ou demo_url sont vides, on envoie null
    const { title, description, tech_stack, github_url, demo_url, image_url } = data;
    
    const [result] = await db.execute(
        'INSERT INTO projects (title, description, tech_stack, github_url, demo_url, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [
            title, 
            description || null, 
            tech_stack || null, 
            github_url || null, // Force NULL si undefined
            demo_url || null,   // Force NULL si undefined
            image_url || null
        ]
    );
    
    return await findById(result.insertId);
};

export const update = async (id, data) => {
  const { title, description, tech_stack, github_url, demo_url, image_url } = data;

  // 1. On récupère le projet actuel pour ne pas perdre l'image existante
  const currentProject = await findById(id);
  if (!currentProject) return false;

  // 2. Si image_url est vide (pas de nouvelle image), on garde l'ancienne
  const finalImageUrl = image_url || currentProject.image_url;

  // 3. Exécution avec gestion des valeurs nulles pour éviter l'erreur 400
  const [result] = await db.execute(
    'UPDATE projects SET title = ?, description = ?, tech_stack = ?, github_url = ?, demo_url = ?, image_url = ? WHERE id = ?',
    [
      title || currentProject.title, 
      description || currentProject.description, 
      tech_stack || currentProject.tech_stack, 
      github_url || null, 
      demo_url || null, 
      finalImageUrl, 
      id
    ]
  );
  
  return result.affectedRows > 0;
};

export const remove = async (id) => {
  const [result] = await db.execute('DELETE FROM projects WHERE id = ?', [id]);
  return result.affectedRows > 0;
};