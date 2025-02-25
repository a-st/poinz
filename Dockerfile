FROM node:22-alpine

RUN apk add git

COPY ./ /usr/src/poinz

WORKDIR /usr/src/poinz

RUN cd /usr/src/poinz && \
    rm -rf .git && \
    git init && \
    git config user.name git && \
    git config user.email git@git.git && \
    git add . && \
    git commit -m "Initial commit" && \
    npm install && \
    npm run build && \
    cp -r deploy/* ./ && \
    npm install --omit=dev

EXPOSE 3000

CMD npm start
