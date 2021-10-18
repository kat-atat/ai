FROM alpine:3.13.6 AS mecab

ARG _ARM_ARCH="arm-unknown-linux-gnu"

RUN apk add --no-cache alpine-sdk 

RUN wget --no-check-certificate https://github.com/taku910/mecab/archive/master.tar.gz \
    && tar xf master.tar.gz \
    && rm master.tar.gz

WORKDIR /mecab-master/mecab

RUN if [ `uname -m` =  "aarch64" ]; then \
      ./configure --enable-utf8-only --with-charset=utf8 --build=${_ARM_ARCH} --host=${_ARM_ARCH} --target=${_ARM_ARCH}; \
    else \
      ./configure --enable-utf8-only --with-charset=utf8; \
    fi \
    && make \
    && make install

WORKDIR /mecab-master/mecab-ipadic

RUN ./configure --with-charset=utf8 \
    && make \
    && make install


FROM node:15.11.0-alpine3.10 AS ai

RUN apk add --no-cache \
  alpine-sdk \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  pixman-dev \
  python3

COPY ./package.json ./yarn.lock ./tsconfig.json /

COPY ./src /src/

RUN yarn install \
  && yarn build


FROM node:15.11.0-alpine3.10 AS runner

RUN apk add --no-cache \
  cairo-dev \
  jpeg-dev \
  pango-dev

COPY --from=mecab /usr/local/bin/mecab /usr/local/bin/mecab

COPY --from=mecab /usr/local/lib/mecab/dic/ipadic /usr/local/lib/mecab/dic/ipadic

COPY --from=ai /node_modules /built /package.json /

CMD ["yarn", "start"]
