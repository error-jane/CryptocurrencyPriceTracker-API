FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci 

RUN npm run build


FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder /app/build ./

COPY --from=builder /app/prisma ./prisma

COPY package*.json ./

RUN npm ci --omit=dev

RUN npx prisma generate

CMD ["node", "index.js"]

