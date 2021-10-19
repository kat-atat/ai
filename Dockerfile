FROM node:fermium-alpine3.14 AS ai

COPY ./package.json ./yarn.lock ./tsconfig.json /
COPY ./src /src

RUN apk add --no-cache \
  alpine-sdk \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  pixman-dev \
  python3 \
	&& yarn install \
  && yarn build


FROM alpine:3.14 AS mecab

ARG _ARM_ARCH="arm-unknown-linux-gnu"
ARG _MECAB_SRC="https://github.com/taku910/mecab/archive/master.tar.gz"

RUN apk add --no-cache alpine-sdk \
    && wget --no-check-certificate ${_MECAB_SRC} \
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
    && make install \
		&& tar czf /mecab.tar.gz /usr/local/lib/libmecab* \
		/usr/local/lib/mecab \
		/usr/local/bin/mecab \
		/usr/local/etc/mecabrc


FROM node:fermium-alpine3.14 AS runner

COPY --from=ai /package.json /
COPY --from=ai /built /built
COPY --from=ai /node_modules /node_modules
COPY --from=mecab /mecab.tar.gz /

RUN apk add --no-cache \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  && tar xf mecab.tar.gz \
  && rm mecab.tar.gz

CMD ["yarn", "start"]
