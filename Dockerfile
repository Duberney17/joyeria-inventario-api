# ---- Etapa 1: build ----
# Usamos una imagen con Node que incluye npm, basada en Alpine (liviana)
FROM node:24-alpine AS builder

WORKDIR /app

# Copiamos primero solo los archivos de dependencias.
# Docker cachea esta capa: si no cambian package.json/package-lock.json,
# no vuelve a correr "npm ci" en el siguiente build (más rápido).
COPY package*.json ./
RUN npm ci

# Ahora sí copiamos el resto del código fuente
COPY tsconfig.json ./
COPY src ./src

# Compilamos TypeScript -> JavaScript (queda en /app/dist)
RUN npm run build


# ---- Etapa 2: producción ----
# Imagen final, limpia, sin herramientas de compilación ni TypeScript
FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production

# Instalamos SOLO las dependencias de producción (sin devDependencies)
COPY package*.json ./
RUN npm ci --omit=dev

# Copiamos el resultado ya compilado desde la etapa "builder"
COPY --from=builder /app/dist ./dist

# Puerto en el que escucha la app (ver src/index.ts -> process.env.PORT || 2000)
EXPOSE 2000

# Comando que arranca el contenedor
CMD ["node", "dist/index.js"]
