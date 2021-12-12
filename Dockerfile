FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["export", "NODE_OPTIONS=--openssl-legacy-provider"]
CMD ["npm", "run", "start-local"]
EXPOSE 3000