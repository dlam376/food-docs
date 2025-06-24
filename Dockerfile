# 使用官方 Node.js 镜像作为基础
FROM node:latest

# 添加镜像元数据
LABEL org.opencontainers.image.authors="J-Ming"
LABEL org.opencontainers.image.description="food文档"
LABEL org.opencontainers.image.source="https://github.com/dlam376/food-docs"

# 为项目创建并设置工作目录
WORKDIR /docsify-project

# 将项目的文件复制到容器中
COPY . .

# 安装 docsify-cli
RUN npm install -g docsify-cli@latest

# 暴露必要的端口
EXPOSE 3000

# 安装依赖并启动服务
CMD ["docsify", "serve", "./docs"]