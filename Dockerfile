FROM node:16-alpine as build-stage

WORKDIR /app

# 프론트엔드 애플리케이션의 종속성 설치
COPY package*.json ./
RUN npm install

# 프론트엔드 애플리케이션의 소스 코드 복사
COPY . ./

# 애플리케이션 빌드
RUN npm run build

# 두 번째 단계: 빌드된 정적 파일을 NGINX 컨테이너로 복사
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

# build-stage에서 생성된 정적 파일을 NGINX 서빙 디렉토리로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# NGINX 설정 파일 복사 (필요한 경우)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
