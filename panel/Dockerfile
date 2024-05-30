# Install dependencies only when needed
#FROM node:14.17.0
FROM node:14.18.1
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apk add --no-cache libc6-compat
RUN mkdir -p /panel
WORKDIR /panel

COPY package.json   ./
COPY yarn.lock ./
RUN yarn install 

COPY . /panel

EXPOSE 3000
ENV PORT 300

#CMD ["yarn", "dev"]
