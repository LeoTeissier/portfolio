# Utilise une image Node officielle comme base
FROM node:20

# Crée un répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json depuis le répertoire parent
COPY ../package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application depuis le répertoire parent
COPY .. .

# Construis l'application Nuxt2
RUN npm run build

# Expose le port 3000
EXPOSE 3000

# Démarre l'application
CMD ["npm", "run", "dev"]
