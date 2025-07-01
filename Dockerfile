FROM node:22-bookworm

RUN apt install git

COPY ./ /usr/src/poinz

WORKDIR /usr/src/poinz/server

RUN cd /usr/src/poinz && \
    rm -rf .git && \
    git init && \
    git config user.name git && \
    git config user.email git@git.git && \
    git add . && \
    git commit -m "Initial commit" && \
    npm install && \
    (cd client && npm run build) && \
    mv client/dist /usr/src/poinz/server/public && \
    rm -rf client node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
