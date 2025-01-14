FROM node:18-alpine

COPY ./ /usr/src/poinz

WORKDIR /usr/src/poinz

RUN apk add git && \
    cd /usr/src/poinz && \
    npm install && \
    npm run build && \
    cp -r deploy/* ./ && \
    npm install --omit=dev

EXPOSE 3000

CMD npm start
