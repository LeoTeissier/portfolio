# Utilise une image Node officielle comme base
FROM node:22

# Crée un répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application dans le répertoire de travail
COPY . .

# Expose le port 3000
EXPOSE 3000

# Démarre l'application en mode développement
CMD ["npm", "run", "dev"]
