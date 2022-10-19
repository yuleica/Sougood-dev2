FROM node:12 AS development

RUN mkdir -p /sougood
WORKDIR ./sougood
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
RUN npm run build
