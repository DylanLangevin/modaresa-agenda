FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache openssl

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx ts-node prisma/seed.ts && npm run dev"]