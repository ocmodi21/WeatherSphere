FROM node:20-alpine

WORKDIR /WeatherSphere

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 4173

RUN pnpm run build

CMD ["pnpm", "run", "preview"]
