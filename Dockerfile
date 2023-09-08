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
#ENV
ENV AT_SECRET="at-secret"
ENV DATABASE_URL='postgres://postgres:postgrespw@localhost:55000'
ENV DIRECT_URL='postgres://edmundchan70:WxlBtneqmg05@ep-solitary-brook-55631772.us-east-2.aws.neon.tech/neondb'
ENV OPENAI_API_KEY_TEST="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"
ENV pinecone_api_key="f35cff20-452d-477a-bef2-2c75ff0de693"
ENV pinecone_env='us-west4-gcp-free'
ENV PROD_DB_URL='postgres://edmundchan70:WxlBtneqmg05@ep-solitary-brook-55631772-pooler.us-east-2.aws.neon.tech/neondb'
ENV RT_SECRET='rt-secret'
ENV S3_ACCESS_KEY='AKIASC2K7IHCBSVRFKR5'
ENV S3_BUCKET_NAME='chatpdfedmundchan70'
ENV S3_BUCKET_REGION='us-east-2'
ENV S3_SECRETE_KEY='JUW+ypnu5tp4VVQqijPp5+NlQotrZbJ6zhMoc4OV'
RUN npx  prisma generate
COPY --from=build /app/dist ./dist
CMD npm run start:prod