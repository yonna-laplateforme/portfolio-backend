DROP TABLE IF EXISTS project;

CREATE TABLE project (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tech_stack VARCHAR(255),
  github_url VARCHAR(255),
  demo_url VARCHAR(255),
  image_url VARCHAR(255),
  client VARCHAR(255),
  role VARCHAR(100),
  date_realisation DATE,
  visibility VARCHAR(50) DEFAULT 'Publié',
  isFeatured TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO project (title, description, tech_stack, isFeatured) 
VALUES 
('Mon Premier Portfolio', 'Un portfolio vitrine responsive', 'HTML, CSS, JS', 1),
('Application Météo', 'Application qui donne la météo en temps réel', 'React, API REST', 0),
('Backend E-commerce', 'API de gestion de boutique en ligne', 'Node.js, Express, MySQL', 1);