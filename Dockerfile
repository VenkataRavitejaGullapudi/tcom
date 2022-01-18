FROM node:lts-alpine
ENV NODE_ENV=production
ENV PORT=4000
ENV API_SECRET=ITSASECRETKEY
ENV MONGODB_URL=mongodb+srv://user:pass@cluster0.jjgyu.mongodb.net/db
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 4000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
