# Utilise une image Node officielle comme base
FROM node:22

# Crée un répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json depuis le répertoire parent
COPY ../package.json ../package-lock.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application depuis le répertoire src
COPY ../src ./src

# Expose le port 3000
EXPOSE 3000

# Construis l'application Nuxt
RUN npm run build

# Démarre l'application
CMD ["npm", "run", "start"]
