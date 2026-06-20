# Utilise l'image Node.js LTS basée sur Alpine Linux
FROM node:lts-alpine

# Définit un répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances, puis les installe
COPY package*.json ./
RUN npm install

# Copie le reste du code source dans le conteneur
COPY . .

# Définit la commande pour exécuter l'application
CMD ["node", "src/server.js"]