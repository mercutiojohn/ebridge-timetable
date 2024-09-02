FROM denoland/deno:1.33.2

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY deps.ts .

# 缓存依赖
RUN deno cache deps.ts

# 复制其余源代码
COPY . .

# 编译应用
RUN deno cache server.ts

# 暴露端口
EXPOSE 8000

# 运行应用
CMD ["run", "--allow-net", "server.ts"]