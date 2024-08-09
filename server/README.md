# 准备工作


~~~bash
JDK >= 17 (推荐17版本)

Mysql >= 8.0 (推荐8.0版本)

Redis >= 3.0

Maven >= 3.0
~~~

# 运行系统

1. 导入到`IDEA`或`Eclipse`中。
2. 打开项目运行`com.udeve.StartApplication.java`，出现如下界面则启动成功。

~~~bash
 __    __   _______  ____    ____  __  ___
|  |  |  | |       \ \   \  /   / |  |/  /
|  |  |  | |  .--.  | \   \/   /  |  '  /
|  |  |  | |  |  |  |  \_    _/   |    <
|  `--'  | |  '--'  |    |  |     |  .  \
 \______/  |_______/     |__|     |__|\__\
 
友得云客:        https://www.youdeyunke.com
~~~

> **管理端用户名**：`admin@example.com`
>
> **管理端密码**：`8个8`


# 必要配置

1. 修改数据库连接，编辑`resources`目录下的`application.properties`

~~~properties
# 数据源配置 - MySQL数据库连接
spring.datasource.url=数据库地址
spring.datasource.driver-class-name=com.p6spy.engine.spy.P6SpyDriver
spring.datasource.username=数据库账号
spring.datasource.password=数据库密码
~~~

2. 修改服务器配置，编辑`resources`目录下的`application.properties`

~~~properties
# 服务器端口配置# 服务器端口配置
server.port=8080
~~~


# 部署

## 自定义部署，配置灵活

1. 打包工程文件


    使用命令：`mvn clean package`


2. 部署工程文件


    使用命令行：`java –jar xxxx.jar`

# nginx配置

~~~
server {
        listen       80;
        server_name  localhost;
		charset utf-8;

		location / {
            root   /www/wwwroot/udyk/panel;
			try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
		
		location /api/ {
			proxy_set_header Host $http_host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header REMOTE-HOST $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_pass http://localhost:8080/;
		}

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
~~~

## docker快速部署

1. 下载[docker-compose.yml](https://tcdn.udeve.net/install-ce-1.0.0/docker-compose.yml)文件

    - 可修改端口号
    - 可修改暴露端口
    - 可修改挂载目录
    - ……

2. 使用命令或其他方式启动（宝塔、1panel等）

    ```shell
    docker-compose up -d
    ```

3. 快速访问
    
    - 开放`docker-compose`中`app`的宿主机端口，使用IP+端口的形式访问
    - 将域名解析至服务器ip，使用`nginx`反向代理将`80`端口映射到`app`的宿主机端口



如遇到无法解决的问题请到`Issues`反馈，会不定时进行解答。


# 后端技术
## SpringBoot框架
### 介绍
Spring Boot是一款开箱即用框架，提供各种默认配置来简化项目配置。让我们的Spring应用变的更轻量化、更快的入门。 在主程序执行main函数就可以运行。你也可以打包你的应用为jar并通过使用java -jar来运行你的Web应用。它遵循"约定优先于配置"的原则， 使用SpringBoot只需很少的配置，大部分的时候直接使用默认的配置即可。同时可以与Spring Cloud的微服务无缝结合。

>提示：
> 
>Spring Boot2.x版本环境要求必须是jdk8或以上版本，服务器Tomcat8或以上版本

### 优点

- 使编码变得简单： 推荐使用注解。
- 使配置变得简单： 自动配置、快速集成新技术能力 没有冗余代码生成和XML配置的要求
- 使部署变得简单： 内嵌Tomcat、Jetty、Undertow等web容器，无需以war包形式部署
- 使监控变得简单： 提供运行时的应用监控
- 使集成变得简单： 对主流开发框架的无配置集成。
- 使开发变得简单： 极大地提高了开发快速构建项目、部署效率。


## sa-token

[Sa-Token](https://sa-token.cc/) 是一个轻量级 Java 权限认证框架，主要解决：登录认证、权限认证、单点登录、OAuth2.0、分布式Session会话、微服务网关鉴权 等一系列权限相关问题。

Sa-Token 旨在以简单、优雅的方式完成系统的权限认证部分，以登录认证为例，你只需要一句静态代码的调用：`StpUtil.login(1001);`，便可以完成会话登录认证。

