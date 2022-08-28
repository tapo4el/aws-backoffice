FROM node:12-alpine AS build

WORKDIR app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
USER node

FROM node:12-alpine AS production

COPY package*.json ./
RUN npm install --only=production && npm cache clean --force
COPY --from=build app/dist ./dist

EXPOSE 4000
ENTRYPOINT ["node", "dist/main.js"]