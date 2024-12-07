FROM --platform=linux/amd64 node:18

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
ENV PORT 3000
COPY . .
CMD ["npm","run", "start"]