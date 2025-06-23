# 使用官方 Node.js 镜像作为基础
FROM node:latest

# 为项目创建并设置工作目录
WORKDIR /docsify-project

# 将项目的文件复制到容器中
COPY docs ./

# 安装 docsify-cli
RUN npm install -g docsify-cli@latest

# 安装依赖并启动服务
CMD ["docsify", "serve", "./docs"]