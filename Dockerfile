FROM node:20 as build 
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
RUN npm run build  

FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install --only=production --force 

COPY --from=build /app/dist ./dist
CMD npm run start:prod