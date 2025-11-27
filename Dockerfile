FROM node:25-bookworm

RUN apt -y update && \
    apt -y install git supervisor pip

RUN pip install --break-system-packages \
        pip \
        setuptools

RUN pip install --break-system-packages \
        supervisord-dependent-startup

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
    rm -rf client node_modules && \
    mkdir -p /etc/supervisor/conf.d/

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ENV NODE_ENV=production
ENV KEEPALIVE_URL=http://localhost:3000
ENV KEEPALIVE_TIMEOUT=15m

EXPOSE 3000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
