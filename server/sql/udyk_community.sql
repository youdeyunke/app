DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`
(
    `id`                 bigint NOT NULL AUTO_INCREMENT,
    `mobile`             varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `name`               varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `online_time`        datetime                                               DEFAULT NULL,
    `offline_time`       datetime                                               DEFAULT NULL,
    `is_online`          tinyint(1) DEFAULT '0',
    `ban`                tinyint(1) DEFAULT '0',
    `created_at`         datetime                                               DEFAULT NULL,
    `current_login_time` datetime                                               DEFAULT NULL,
    `last_login_time`    datetime                                               DEFAULT NULL,
    `country_code`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '86',
    `avatar`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `pwd`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `uname`              varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `ip`                 varchar(20) COLLATE utf8mb4_bin                        DEFAULT NULL COMMENT 'ip地址',
    `ip_region`          varchar(50) COLLATE utf8mb4_bin                        DEFAULT NULL COMMENT 'ip归属地',
    `uid`                varchar(50) COLLATE utf8mb4_bin                        DEFAULT NULL COMMENT '用户唯一标识',
    `remark`             varchar(100) COLLATE utf8mb4_bin                       DEFAULT NULL COMMENT '备注',
    PRIMARY KEY (`id`),
    KEY                  `index_users_on_mobile` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='用户';



DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users`
(
    `id`                     bigint                                                        NOT NULL AUTO_INCREMENT,
    `email`                  varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  NOT NULL DEFAULT '' COMMENT '账号',
    `encrypted_password`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
    `reset_password_token`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci          DEFAULT NULL,
    `reset_password_sent_at` datetime                                                               DEFAULT NULL,
    `remember_created_at`    datetime                                                               DEFAULT NULL,
    `sign_in_count`          int                                                           NOT NULL DEFAULT '0' COMMENT '登录次数',
    `current_sign_in_at`     datetime                                                               DEFAULT NULL COMMENT '最后登录时间',
    `last_sign_in_at`        datetime                                                               DEFAULT NULL,
    `current_sign_in_ip`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci          DEFAULT NULL COMMENT '当前登录ip',
    `created_at`             datetime                                                      NOT NULL,
    `updated_at`             datetime                                                      NOT NULL,
    `avatar`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci          DEFAULT NULL COMMENT '头像',
    `name`                   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci          DEFAULT NULL COMMENT '姓名',
    `desc`                   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci          DEFAULT NULL COMMENT '备注',
    `is_forever`             tinyint(1) DEFAULT NULL COMMENT '永久可用',
    `expired_at`             date                                                                   DEFAULT NULL COMMENT '到期时间',
    `mobile`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci          DEFAULT NULL COMMENT '绑定手机号码',
    `is_delete`              tinyint(1) DEFAULT '0' COMMENT '删除',
    `api_key`                varchar(255) COLLATE utf8mb4_unicode_ci                                DEFAULT NULL COMMENT '用来保存秘钥',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员账号';



DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `enable`     tinyint(1) DEFAULT NULL,
    `icon`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `color`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `key`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色';


DROP TABLE IF EXISTS `admin_user_roles`;
CREATE TABLE `admin_user_roles`
(
    `id`            bigint   NOT NULL AUTO_INCREMENT,
    `role_id`       bigint DEFAULT NULL,
    `admin_user_id` bigint DEFAULT NULL,
    `created_at`    datetime NOT NULL,
    `updated_at`    datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY             `index_admin_user_roles_on_role_id` (`role_id`),
    KEY             `index_admin_user_roles_on_admin_user_id` (`admin_user_id`),
    CONSTRAINT `fk_rails_4a5d8cb055` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
    CONSTRAINT `fk_rails_fd39deb99f` FOREIGN KEY (`admin_user_id`) REFERENCES `admin_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员角色';



DROP TABLE IF EXISTS `admin_logs`;
CREATE TABLE `admin_logs`
(
    `id`             bigint                                                       NOT NULL AUTO_INCREMENT,
    `admin_user_id`  bigint                                                        DEFAULT NULL,
    `operation_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `operation`      text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `is_delete`      tinyint(1) DEFAULT NULL,
    `created_at`     datetime                                                     NOT NULL,
    `updated_at`     datetime                                                     NOT NULL,
    `ip`             varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `admin`          varchar(50) COLLATE utf8mb4_unicode_ci                        DEFAULT '' COMMENT '用户名(管理员账号)',
    `ip_region`      varchar(50) COLLATE utf8mb4_unicode_ci                        DEFAULT NULL COMMENT 'ip归属地',
    PRIMARY KEY (`id`),
    KEY              `index_admin_logs_on_admin_user_id` (`admin_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='操作日志';


DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions`
(
    `id`              bigint NOT NULL AUTO_INCREMENT,
    `user_id`         bigint                                                        DEFAULT NULL,
    `content`         text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `answer`          text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `created_at`      datetime                                                      DEFAULT NULL,
    `updated_at`      datetime                                                      DEFAULT NULL,
    `public`          tinyint(1) DEFAULT NULL,
    `like_nums_base`  int                                                           DEFAULT NULL,
    `like_nums`       int                                                           DEFAULT NULL,
    `send_message_at` datetime                                                      DEFAULT NULL,
    `target_type`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `target_id`       int                                                           DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY               `index_questions_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='提问';



DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers`
(
    `id`          bigint   NOT NULL AUTO_INCREMENT,
    `content`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `user_id`     bigint                                                        DEFAULT NULL,
    `question_id` bigint                                                        DEFAULT NULL,
    `is_delete`   tinyint(1) DEFAULT NULL,
    `created_at`  datetime NOT NULL,
    `updated_at`  datetime NOT NULL,
    `likes`       int                                                           DEFAULT NULL,
    `is_public`   tinyint(1) DEFAULT '0' COMMENT '是否公开回答，1公开，0不公开',
    PRIMARY KEY (`id`),
    KEY           `index_answers_on_user_id` (`user_id`),
    KEY           `index_answers_on_question_id` (`question_id`),
    CONSTRAINT `fk_rails_3d5ed4418f` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
    CONSTRAINT `fk_rails_584be190c2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='回答';


DROP TABLE IF EXISTS `booking_configs`;
CREATE TABLE `booking_configs`
(
    `id`         bigint       NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
    `post_id`    bigint       NOT NULL COMMENT '楼盘id，不做外键',
    `week`       int          NOT NULL COMMENT '可预约周（周一或周二……）',
    `hours`      varchar(200) NOT NULL COMMENT '可预约时间点（8:00,9:00,10:00,14:00……）',
    `status`     tinyint(1) DEFAULT '1' COMMENT '状态（0关闭预约，1开启预约）',
    `remark`     varchar(500) DEFAULT NULL COMMENT '备注',
    `created_at` datetime     NOT NULL COMMENT '创建时间',
    `updated_at` datetime     NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `sale_status_items`;
CREATE TABLE `sale_status_items`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `color`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `icon`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `module_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='销售状态';

DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities`
(
    `id`           bigint NOT NULL AUTO_INCREMENT,
    `name`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `is_public`    tinyint(1) DEFAULT NULL,
    `adcode`       int                                                           DEFAULT NULL,
    `default`      tinyint(1) DEFAULT '0',
    `home_page_id` int                                                           DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='城市';


DROP TABLE IF EXISTS `districts`;
CREATE TABLE `districts`
(
    `id`        bigint NOT NULL AUTO_INCREMENT,
    `name`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `city_id`   bigint                                                        DEFAULT NULL,
    `is_public` tinyint(1) DEFAULT '1',
    `number`    int                                                           DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY         `index_districts_on_city_id` (`city_id`),
    CONSTRAINT `fk_rails_92c48f7cf2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='行政区';

DROP TABLE IF EXISTS `media_cats`;
CREATE TABLE `media_cats`
(
    `id`          bigint   NOT NULL AUTO_INCREMENT,
    `name`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '相册名称',
    `created_at`  datetime NOT NULL,
    `updated_at`  datetime NOT NULL,
    `number`      int                                                           DEFAULT NULL COMMENT '排序',
    `cover_id`    int                                                           DEFAULT NULL COMMENT '封面',
    `items_count` int                                                           DEFAULT '0' COMMENT '楼盘数量',
    `target_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '关联对象类型',
    `target_id`   int                                                           DEFAULT NULL COMMENT '关联对象id',
    `is_system`   tinyint(1) DEFAULT '0' COMMENT '系统内置',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘相册';

DROP TABLE IF EXISTS `media_items`;
CREATE TABLE `media_items`
(
    `id`           bigint   NOT NULL AUTO_INCREMENT,
    `media_cat_id` bigint                                                        DEFAULT NULL,
    `url`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `filetype`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'image',
    `name`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `number`       int                                                           DEFAULT NULL,
    `created_at`   datetime NOT NULL,
    `updated_at`   datetime NOT NULL,
    `size`         int                                                           DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY            `index_media_items_on_media_cat_id` (`media_cat_id`),
    CONSTRAINT `fk_rails_038cde7cc8` FOREIGN KEY (`media_cat_id`) REFERENCES `media_cats` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='相册中的照片';


DROP TABLE IF EXISTS `detail_contents`;
CREATE TABLE `detail_contents`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `value`      longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='详细内容';

DROP TABLE IF EXISTS `fitments`;
CREATE TABLE `fitments`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `key`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='装修';


DROP TABLE IF EXISTS `meta_contents`;
CREATE TABLE `meta_contents`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `value`      longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘参数';


DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`
(
    `id`                  bigint   NOT NULL AUTO_INCREMENT,
    `title`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '楼盘标题',
    `street`              varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '街道地址',
    `share_title`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '转发分享标题',
    `latitude`            decimal(18, 15)                                               DEFAULT NULL COMMENT '经纬度',
    `longitude`           decimal(18, 15)                                               DEFAULT NULL COMMENT '经纬度',
    `average_price`       float                                                         DEFAULT NULL COMMENT '均价最小值',
    `total_price_min`     float                                                         DEFAULT NULL COMMENT '总价最小值',
    `total_price_max`     float                                                         DEFAULT NULL COMMENT '总价最大值',
    `area_max`            float                                                         DEFAULT NULL COMMENT '面积最大值',
    `area_min`            float                                                         DEFAULT NULL COMMENT '面积最小值',
    `unknow_price`        tinyint(1) DEFAULT '0' COMMENT '价格待定',
    `unknow_total_price`  tinyint(1) DEFAULT '0' COMMENT '总价待定',
    `unknow_area`         tinyint(1) DEFAULT '0' COMMENT '面积待定',
    `like_nums_base`      bigint                                                        DEFAULT '0' COMMENT '点赞起始数',
    `view_nums_base`      bigint                                                        DEFAULT '0' COMMENT '浏览量起始数',
    `like_nums`           bigint                                                        DEFAULT '0' COMMENT '当前点赞数',
    `view_nums`           bigint                                                        DEFAULT '0' COMMENT '当前浏览数',
    `qa_nums`             bigint                                                        DEFAULT '0' COMMENT '问题数量',
    `comment_nums`        bigint                                                        DEFAULT '0' COMMENT '评论数量',
    `phone`               varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '联系电话',
    `sub_phone`           varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci   DEFAULT NULL COMMENT '分机号',
    `cover`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'post-cover-none.jpg' COMMENT '封面图',
    `qr`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '小程序二维码',
    `remark`              text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '备注',
    `is_delete`           tinyint(1) DEFAULT '0' COMMENT '已删除',
    `is_public`           tinyint(1) DEFAULT '0' COMMENT '已上架',
    `is_top`              tinyint(1) DEFAULT '0' COMMENT '已置顶',
    `created_at`          datetime NOT NULL COMMENT '创建时间',
    `updated_at`          datetime NOT NULL COMMENT '更新时间',
    `comment_enable`      tinyint(1) DEFAULT '1' COMMENT '开启评论',
    `city_id`             bigint                                                        DEFAULT NULL COMMENT '城市',
    `district_id`         bigint                                                        DEFAULT NULL COMMENT '行政区',
    `sale_status_item_id` bigint                                                        DEFAULT NULL COMMENT '销售状态',
    `fitment_id`          bigint                                                        DEFAULT NULL COMMENT '装修情况',
    `media_cat_id`        bigint                                                        DEFAULT NULL COMMENT '默认相册【？】',
    `meta_content_id`     bigint                                                        DEFAULT NULL COMMENT '参数',
    `detail_content_id`   bigint                                                        DEFAULT NULL COMMENT '？',
    `point_title`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '卖点',
    `search_nums`         int                                                           DEFAULT '0' COMMENT '搜索次数',
    `average_price_max`   float                                                         DEFAULT NULL COMMENT '均价最大值',
    `admin_user_id`       bigint                                                        DEFAULT NULL,
    `map_tabs`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '周边配套',
    `flash_image`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '开屏广告',
    `flash_enable`        tinyint(1) DEFAULT '0' COMMENT '开屏广告',
    `review_enable`       tinyint(1) DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY                   `index_posts_on_city_id` (`city_id`),
    KEY                   `index_posts_on_district_id` (`district_id`),
    KEY                   `index_posts_on_sale_status_item_id` (`sale_status_item_id`),
    KEY                   `index_posts_on_fitment_id` (`fitment_id`),
    KEY                   `index_posts_on_media_cat_id` (`media_cat_id`),
    KEY                   `index_posts_on_meta_content_id` (`meta_content_id`),
    KEY                   `index_posts_on_detail_content_id` (`detail_content_id`),
    KEY                   `index_posts_on_admin_user_id` (`admin_user_id`),
    CONSTRAINT `fk_rails_2a283e81ab` FOREIGN KEY (`sale_status_item_id`) REFERENCES `sale_status_items` (`id`),
    CONSTRAINT `fk_rails_3e73622a21` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
    CONSTRAINT `fk_rails_775c9b1dcc` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`),
    CONSTRAINT `fk_rails_85c8966599` FOREIGN KEY (`media_cat_id`) REFERENCES `media_cats` (`id`),
    CONSTRAINT `fk_rails_a6922e366f` FOREIGN KEY (`detail_content_id`) REFERENCES `detail_contents` (`id`),
    CONSTRAINT `fk_rails_c245fd6044` FOREIGN KEY (`fitment_id`) REFERENCES `fitments` (`id`),
    CONSTRAINT `fk_rails_c9f8ba6d38` FOREIGN KEY (`admin_user_id`) REFERENCES `admin_users` (`id`),
    CONSTRAINT `fk_rails_dc7a9e44a7` FOREIGN KEY (`meta_content_id`) REFERENCES `meta_contents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘';


DROP TABLE IF EXISTS `booking_logs`;
CREATE TABLE `booking_logs`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `post_id`    bigint                                                        DEFAULT NULL COMMENT '绑定到楼盘，可为空',
    `user_id`    bigint                                                        DEFAULT NULL COMMENT '用户',
    `remark`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '留言',
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `status`     int                                                           DEFAULT NULL COMMENT '状态',
    `date`       date                                                          DEFAULT NULL COMMENT '预约日期',
    `time`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '时间',
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '客户姓名',
    `mobile`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电话',
    PRIMARY KEY (`id`),
    KEY          `index_booking_logs_on_post_id` (`post_id`),
    KEY          `index_booking_logs_on_user_id` (`user_id`),
    CONSTRAINT `fk_rails_c87d1994ba` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
    CONSTRAINT `fk_rails_fc66de8b80` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预约看房';


DROP TABLE IF EXISTS `broker_profiles`;
CREATE TABLE `broker_profiles`
(
    `id`            bigint   NOT NULL AUTO_INCREMENT,
    `mobile`        varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `avatar`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `name`          varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `sex`           tinyint                                                       DEFAULT '-1',
    `wechat`        varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `wechat_qr`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `namecard`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `desc`          tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `team_name`     varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '团队名称',
    `user_id`       bigint                                                        DEFAULT NULL,
    `post_id`       bigint                                                        DEFAULT NULL,
    `level`         smallint                                                      DEFAULT '1',
    `status`        smallint                                                      DEFAULT '0',
    `post_title`    varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `like_nums`     bigint                                                        DEFAULT '0',
    `view_nums`     bigint                                                        DEFAULT '0',
    `reject_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at`    datetime NOT NULL,
    `updated_at`    datetime NOT NULL,
    `tags`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `qr`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY             `index_broker_profiles_on_mobile` (`mobile`),
    KEY             `index_broker_profiles_on_user_id` (`user_id`),
    KEY             `index_broker_profiles_on_post_id` (`post_id`),
    CONSTRAINT `fk_rails_3c20ed2ba4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_rails_6f88969e90` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='置业顾问资料表';


DROP TABLE IF EXISTS `cats`;
CREATE TABLE `cats`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='物业类型';




DROP TABLE IF EXISTS `dynamic_subscription`;
CREATE TABLE `dynamic_subscription`
(
    `id`          bigint      NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
    `target_id`   bigint      NOT NULL COMMENT '订阅的目标id（可以是土拍的id，其他新功能的id）土拍为特殊情况，值为0时代表土拍的全部',
    `target_type` varchar(50) NOT NULL COMMENT '订阅的类型',
    `user_id`     bigint      NOT NULL COMMENT '用户的id',
    `created_at`  datetime    NOT NULL COMMENT '创建时间',
    `updated_at`  datetime    NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `enumerations`;
CREATE TABLE `enumerations`
(
    `id`          bigint   NOT NULL AUTO_INCREMENT,
    `name`        varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT '',
    `number`      int                                                           DEFAULT '0',
    `is_default`  tinyint(1) DEFAULT '0',
    `cat`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `active`      tinyint(1) NOT NULL DEFAULT '1',
    `parent_id`   int                                                           DEFAULT NULL,
    `parent_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `created_at`  datetime NOT NULL,
    `updated_at`  datetime NOT NULL,
    `value`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0',
    `is_delete`   tinyint(1) DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='枚举值';



DROP TABLE IF EXISTS `event_cats`;
CREATE TABLE `event_cats`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `value`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘动态分类';



DROP TABLE IF EXISTS `events`;
CREATE TABLE `events`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `content`    text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `post_id`    bigint                                                        DEFAULT NULL,
    `cat_id`     int                                                           DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `is_public`  tinyint(1) DEFAULT '0',
    `pub_time`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `title`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `author`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `images`     text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `pub_from`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `status`     int      NOT NULL                                             DEFAULT '0',
    `push_done`  tinyint(1) DEFAULT '0' COMMENT '是否已经推送系统消息',
    PRIMARY KEY (`id`),
    KEY          `index_events_on_post_id` (`post_id`),
    CONSTRAINT `fk_rails_b29cc80f41` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘动态';



DROP TABLE IF EXISTS `favs`;
CREATE TABLE `favs`
(
    `id`          bigint NOT NULL AUTO_INCREMENT,
    `user_id`     bigint                                                        DEFAULT NULL,
    `updated_at`  datetime                                                      DEFAULT NULL,
    `target_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `target_id`   int                                                           DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY           `index_favs_on_user_id` (`user_id`),
    CONSTRAINT `fk_rails_346c791d0c` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收藏夹';



DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`
(
    `id`            bigint       NOT NULL AUTO_INCREMENT COMMENT '主键',
    `uid`           varchar(50) DEFAULT NULL COMMENT '用户唯一标识',
    `feedback_type` varchar(100) NOT NULL COMMENT '反馈类型（数据缺失/错误，优化建议，程序错误，其他）',
    `content`       text         NOT NULL COMMENT '问题描述',
    `images`        text COMMENT '相关图片的url，多张图为逗号分隔',
    `contact`       varchar(50) DEFAULT NULL COMMENT '联系方式(手机号，微信号，邮箱)',
    `is_delete`     tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已删除（0未删除，1已删除）',
    `created_at`    datetime     NOT NULL COMMENT '创建时间',
    `updated_at`    datetime     NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `first_screen_adds`;
CREATE TABLE `first_screen_adds`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `image`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `link`       text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `view_nums`  int                                                           DEFAULT NULL,
    `click_nums` int                                                           DEFAULT NULL,
    `skip_nums`  int                                                           DEFAULT NULL,
    `public`     tinyint(1) DEFAULT NULL,
    `starts_at`  datetime                                                      DEFAULT NULL,
    `ends_at`    datetime                                                      DEFAULT NULL,
    `platform`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `time`       int                                                           DEFAULT '10',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='开屏广告';



DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `color`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '#1989fa',
    `number`     int                                                           DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `module_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='标签';

DROP TABLE IF EXISTS `houses`;
CREATE TABLE `houses`
(
    `id`                bigint                                                       NOT NULL AUTO_INCREMENT,
    `title`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `qr`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '二维码',
    `sub_district_id`   bigint                                                        DEFAULT NULL,
    `admin_user_id`     bigint                                                        DEFAULT NULL,
    `user_id`           bigint                                                        DEFAULT NULL,
    `is_public`         tinyint(1) DEFAULT '0',
    `is_delete`         tinyint(1) DEFAULT '0',
    `is_top`            tinyint(1) DEFAULT '0',
    `fav_nums`          int                                                           DEFAULT '0',
    `view_nums`         int                                                           DEFAULT '0',
    `search_nums`       int                                                           DEFAULT '0',
    `refresh_at`        int                                                           DEFAULT '0',
    `remark`            text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `created_at`        datetime                                                     NOT NULL,
    `updated_at`        datetime                                                     NOT NULL,
    `cover`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '房源列表显示的封面图片',
    `city_id`           bigint                                                        DEFAULT NULL,
    `district_id`       bigint                                                        DEFAULT NULL,
    `internal_id`       varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '内部编号',
    `owner_wechat`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `sub_district_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `seller`            varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT '经纪人' COMMENT '挂售方式：经纪人、业主',
    `pub_date`          date                                                          DEFAULT NULL,
    `address`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `latitude`          decimal(18, 15)                                               DEFAULT NULL,
    `longitude`         decimal(18, 15)                                               DEFAULT NULL,
    `price_label`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '总价' COMMENT '价格名称：总价、单价、月租',
    `price_value`       float                                                         DEFAULT NULL COMMENT '价格数字',
    `price_unit`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '万元' COMMENT '价格单位',
    `type_name`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `category`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '住宅',
    `tags`              varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '字符串标签，逗号分割',
    `business`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '出售' COMMENT '交易类型：出售、出租',
    `position`          varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '朝向',
    `video`             varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `vr`                varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `publish_status`    varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '审核状态：审核中、已发布、未通过、已下架、已成交',
    `fitment`           varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '装修情况',
    `contact_name`      varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `contact_mobile`    varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `area_label`        varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `area_value`        float                                                         DEFAULT NULL,
    `content`           text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `images`            text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `type_image`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                 `index_houses_on_sub_district_id` (`sub_district_id`),
    KEY                 `index_houses_on_admin_user_id` (`admin_user_id`),
    KEY                 `index_houses_on_user_id` (`user_id`),
    KEY                 `city_id` (`city_id`),
    KEY                 `district_id` (`district_id`),
    CONSTRAINT `fk_rails_da9c5cc6d2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_rails_feafd8a528` FOREIGN KEY (`admin_user_id`) REFERENCES `admin_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='二手房';



DROP TABLE IF EXISTS `media_files`;
CREATE TABLE `media_files`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `filename`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `size`       int                                                           DEFAULT NULL,
    `filetype`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `url`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `parent_id`  int                                                           DEFAULT NULL,
    `user`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `is_delete`  tinyint(1) DEFAULT '0',
    `platform`   varchar(32) COLLATE utf8mb4_unicode_ci                        DEFAULT NULL COMMENT '存储平台',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文件管理';



DROP TABLE IF EXISTS `myconfigs`;
CREATE TABLE `myconfigs`
(
    `id`                         bigint   NOT NULL AUTO_INCREMENT,
    `xcx_app_id`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `xcx_secret`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `company_name`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `company_desc`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `service_mobile`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `service_wechat`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `is_saas`                    tinyint(1) DEFAULT '0',
    `is_trial`                   tinyint(1) DEFAULT '0',
    `expire_time`                datetime                                                      DEFAULT NULL,
    `instance_status`            int                                                           DEFAULT '0',
    `instance_id`                int                                                           DEFAULT '0',
    `instance_name`              varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'unknow',
    `admin_auth_codforce_logine` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `project_id`                 int                                                           DEFAULT NULL,
    `login_method`               tinyint(1) DEFAULT NULL,
    `force_login`                tinyint(1) DEFAULT '0',
    `adv_link`                   tinyint(1) DEFAULT NULL,
    `server_stop`                tinyint(1) DEFAULT NULL,
    `fenxiao_enable`             tinyint(1) DEFAULT '1',
    `cdn_domain`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'qiniucdn.udeve.cn',
    `cdn_https`                  tinyint(1) DEFAULT '1',
    `eventsub_enable`            tinyint(1) DEFAULT '1',
    `tour_enable`                tinyint(1) DEFAULT '1',
    `xcx_name`                   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `xcx_qr`                     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `xcx_qr_test`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `xcx_version`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `xcx_status`                 int                                                           DEFAULT NULL,
    `xcx_status_desc`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `project_uid`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `qq_map_key`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `oversea_enable`             tinyint(1) DEFAULT '0',
    `tim_app_id`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `tim_app_secret`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `logo`                       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `lpr_rate`                   float                                                         DEFAULT NULL,
    `created_at`                 datetime NOT NULL,
    `updated_at`                 datetime NOT NULL,
    `service_wechat_qr`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `xcx_copyright`              varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `xcx_updated_at`             date                                                          DEFAULT NULL,
    `about_us`                   text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `statement`                  text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `watermark`                  tinyint(1) DEFAULT NULL,
    `protected_days`             smallint                                                      DEFAULT '7',
    `confirm_hours`              int                                                           DEFAULT '48',
    `report_rule`                text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `protected_hours`            int                                                           DEFAULT '0',
    `confirm_days`               int                                                           DEFAULT '0',
    `msg_tpl_id`                 varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `server_init`                tinyint                                                       DEFAULT '0' COMMENT '0未初始化，1初始化',
    `upload_allowed_extension`   varchar(200) COLLATE utf8mb4_unicode_ci                       DEFAULT NULL COMMENT '允许上传的文件扩展名',
    `api_host`                   varchar(100) COLLATE utf8mb4_unicode_ci                       DEFAULT NULL COMMENT '服务端域名',
    `weapp_init`                 tinyint                                                       DEFAULT '0' COMMENT '0未初始化，1初始化',
    `email_host`                 varchar(50) COLLATE utf8mb4_unicode_ci                        DEFAULT NULL COMMENT '邮件平台地址',
    `email_port`                 int                                                           DEFAULT NULL COMMENT '发送邮件的端口号',
    `email_protocol`             varchar(20) COLLATE utf8mb4_unicode_ci                        DEFAULT 'smtp' COMMENT '发送邮件的协议',
    `email_username`             varchar(50) COLLATE utf8mb4_unicode_ci                        DEFAULT NULL COMMENT '发送邮件的账号',
    `email_password`             varchar(100) COLLATE utf8mb4_unicode_ci                       DEFAULT NULL COMMENT '发送邮件的账号的授权码',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置';



DROP TABLE IF EXISTS `myhistories`;
CREATE TABLE `myhistories`
(
    `id`          bigint   NOT NULL AUTO_INCREMENT,
    `target_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `target_id`   bigint                                                        DEFAULT NULL,
    `date`        date                                                          DEFAULT NULL COMMENT '可删除',
    `user_id`     bigint                                                        DEFAULT NULL,
    `created_at`  datetime NOT NULL,
    `updated_at`  datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY           `index_myhistories_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='历史浏览';



DROP TABLE IF EXISTS `needs`;
CREATE TABLE `needs`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `mobile`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `city_id`    bigint                                                        DEFAULT NULL,
    `position`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `points`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `budget_min` int                                                           DEFAULT NULL,
    `budget_max` int                                                           DEFAULT NULL,
    `area`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `housetype`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `city_name`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY          `index_needs_on_city_id` (`city_id`),
    CONSTRAINT `fk_rails_1c20fb4c18` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户需求单';

DROP TABLE IF EXISTS `news_cats`;
CREATE TABLE `news_cats`
(
    `id`     bigint NOT NULL AUTO_INCREMENT,
    `name`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `public` tinyint(1) DEFAULT NULL,
    `number` int                                                           DEFAULT NULL,
    `icon`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章分类';


DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`
(
    `id`                bigint NOT NULL AUTO_INCREMENT,
    `news_cat_id`       bigint                                                        DEFAULT NULL COMMENT '分类',
    `title`             varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
    `content_type`      varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '类型',
    `author`            varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '作者',
    `summary`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '摘要',
    `cover`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '封面图片',
    `url`               varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '跳转url',
    `view_nums`         int                                                           DEFAULT '0' COMMENT '浏览数',
    `like_nums`         int                                                           DEFAULT '0' COMMENT '点赞数',
    `source`            varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `content`           text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '内容',
    `has_posts`         tinyint(1) DEFAULT '0' COMMENT '是否绑定楼盘',
    `is_top`            tinyint(1) DEFAULT '0' COMMENT '置顶',
    `is_public`         tinyint(1) DEFAULT '0' COMMENT '发布',
    `updated_at`        datetime                                                      DEFAULT NULL,
    `created_at`        datetime                                                      DEFAULT NULL,
    `detail_content_id` bigint                                                        DEFAULT NULL COMMENT '详细内容',
    `date`              date                                                          DEFAULT NULL COMMENT '日期',
    `city_id`           int                                                           DEFAULT NULL COMMENT '所属城市',
    `avatar`            varchar(255) COLLATE utf8mb4_unicode_ci                       DEFAULT NULL COMMENT '作者头像',
    PRIMARY KEY (`id`),
    KEY                 `index_news_on_news_cat_id` (`news_cat_id`),
    KEY                 `index_news_on_detail_content_id` (`detail_content_id`),
    CONSTRAINT `fk_rails_a2f75b4ac2` FOREIGN KEY (`news_cat_id`) REFERENCES `news_cats` (`id`),
    CONSTRAINT `fk_rails_e2e893f116` FOREIGN KEY (`detail_content_id`) REFERENCES `detail_contents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章';



DROP TABLE IF EXISTS `news_posts`;
CREATE TABLE `news_posts`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `post_id`    bigint DEFAULT NULL,
    `news_id`    bigint DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY          `index_news_posts_on_post_id` (`post_id`),
    KEY          `index_news_posts_on_news_id` (`news_id`),
    CONSTRAINT `fk_rails_b2be54b4e9` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
    CONSTRAINT `fk_rails_d7d614231a` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章绑定楼盘';



DROP TABLE IF EXISTS `permission_items`;
CREATE TABLE `permission_items`
(
    `id`             bigint   NOT NULL AUTO_INCREMENT,
    `title`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `icon`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `path`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `component_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `component_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Layout',
    `hidden`         tinyint(1) DEFAULT '0',
    `cat`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `order`          int                                                           DEFAULT NULL,
    `father_id`      int                                                           DEFAULT NULL,
    `key`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at`     datetime NOT NULL,
    `updated_at`     datetime NOT NULL,
    `enable`         tinyint(1) NOT NULL DEFAULT '1',
    `redirect`       char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci     DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限菜单';

DROP TABLE IF EXISTS `role_permission_items`;
CREATE TABLE `role_permission_items`
(
    `id`                 bigint   NOT NULL AUTO_INCREMENT,
    `role_id`            bigint DEFAULT NULL,
    `permission_item_id` bigint DEFAULT NULL,
    `created_at`         datetime NOT NULL,
    `updated_at`         datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY                  `index_role_permission_items_on_role_id` (`role_id`),
    KEY                  `index_role_permission_items_on_permission_item_id` (`permission_item_id`),
    CONSTRAINT `fk_rails_274bd76197` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
    CONSTRAINT `fk_rails_6b1fa4002d` FOREIGN KEY (`permission_item_id`) REFERENCES `permission_items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色包含的权限表';


DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
    `key`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `cover`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '转发封面',
    `cat`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'default' COMMENT '类型',
    `content`    text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '介绍',
    `title`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '转发标题',
    `number`     int                                                           DEFAULT NULL COMMENT '排序',
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `can_delete` tinyint(1) DEFAULT '0' COMMENT '可否删除',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘分类';


DROP TABLE IF EXISTS `album_posts`;
CREATE TABLE `album_posts`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `post_id`    bigint DEFAULT NULL,
    `album_id`   bigint DEFAULT NULL,
    `number`     int    DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY          `index_album_posts_on_post_id` (`post_id`),
    KEY          `index_album_posts_on_album_id` (`album_id`),
    CONSTRAINT `fk_rails_904896b371` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`),
    CONSTRAINT `fk_rails_ed2edb3889` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘分类关系表';

DROP TABLE IF EXISTS `post_banners`;
CREATE TABLE `post_banners`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `image`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `cat`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `url`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `remark`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `post_id`    bigint                                                        DEFAULT NULL,
    `number`     int                                                           DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY          `index_post_banners_on_post_id` (`post_id`),
    CONSTRAINT `fk_rails_98f55b7cf9` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘轮播图';



DROP TABLE IF EXISTS `post_brokers`;
CREATE TABLE `post_brokers`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `user_id`    bigint DEFAULT NULL COMMENT '置业顾问的userid',
    `number`     int    DEFAULT '0' COMMENT '排序',
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `post_id`    bigint DEFAULT NULL COMMENT '所属楼盘',
    PRIMARY KEY (`id`),
    KEY          `index_post_brokers_on_user_id` (`user_id`),
    KEY          `post_id` (`post_id`),
    CONSTRAINT `fk_custom_post_id_to_posts` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘绑定置业顾问';



DROP TABLE IF EXISTS `post_cats`;
CREATE TABLE `post_cats`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `post_id`    bigint DEFAULT NULL,
    `cat_id`     bigint DEFAULT NULL,
    `number`     int    DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY          `index_post_cats_on_post_id` (`post_id`),
    KEY          `index_post_cats_on_cat_id` (`cat_id`),
    CONSTRAINT `fk_rails_258a6629f2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
    CONSTRAINT `fk_rails_68392580d1` FOREIGN KEY (`cat_id`) REFERENCES `cats` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘的类型';



DROP TABLE IF EXISTS `post_points`;
CREATE TABLE `post_points`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `post_id`    bigint                                                        DEFAULT NULL,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `cat`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `desc`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `image`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `icon`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY          `index_post_points_on_post_id` (`post_id`),
    CONSTRAINT `fk_rails_c49237930f` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘两点';



DROP TABLE IF EXISTS `post_tags`;
CREATE TABLE `post_tags`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `post_id`    bigint DEFAULT NULL,
    `tag_id`     bigint DEFAULT NULL,
    `number`     int    DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY          `index_post_tags_on_post_id` (`post_id`),
    KEY          `index_post_tags_on_tag_id` (`tag_id`),
    CONSTRAINT `fk_rails_c9d8c5063e` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
    CONSTRAINT `fk_rails_fdf74b486b` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='楼盘标签';



DROP TABLE IF EXISTS `poster_templates`;
CREATE TABLE `poster_templates`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `is_default` tinyint(1) DEFAULT '0',
    `bg`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `font_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '#ffffff',
    `cover`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `can_delete` tinyint(1) DEFAULT '1',
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `number`     int                                                           DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='海报背景';



DROP TABLE IF EXISTS `posts_review`;
CREATE TABLE `posts_review`
(
    `id`      bigint NOT NULL AUTO_INCREMENT COMMENT '主键非空自增长',
    `name`    varchar(255)  DEFAULT NULL COMMENT '评测点',
    `score`   decimal(2, 1) DEFAULT NULL COMMENT '评分',
    `content` text COMMENT '摘要',
    `remark`  text COMMENT '评测简介',
    `icon`    varchar(255)  DEFAULT NULL COMMENT '图标',
    `post_id` bigint NOT NULL COMMENT '关联房盘',
    PRIMARY KEY (`id`),
    KEY       `post_id` (`post_id`),
    CONSTRAINT `posts_review_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='评测表';



DROP TABLE IF EXISTS `qrs`;
CREATE TABLE `qrs`
(
    `id`         bigint                                                        NOT NULL AUTO_INCREMENT,
    `title`      varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `url`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `data`       text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `view_nums`  bigint                                                        DEFAULT '0',
    `created_at` datetime                                                      NOT NULL,
    `updated_at` datetime                                                      NOT NULL,
    `path`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='二维码';



DROP TABLE IF EXISTS `question_followers`;
CREATE TABLE `question_followers`
(
    `id`          bigint   NOT NULL AUTO_INCREMENT,
    `question_id` bigint DEFAULT NULL,
    `user_id`     bigint DEFAULT NULL,
    `created_at`  datetime NOT NULL,
    `updated_at`  datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY           `index_question_followers_on_question_id` (`question_id`),
    KEY           `index_question_followers_on_user_id` (`user_id`),
    CONSTRAINT `fk_rails_08e4119c56` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_rails_bccd01e177` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='问题关注者';



DROP TABLE IF EXISTS `shares`;
CREATE TABLE `shares`
(
    `id`               bigint                                                        NOT NULL AUTO_INCREMENT,
    `user_id`          bigint                                                        DEFAULT NULL COMMENT '谁转发',
    `title`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '转发页面或对象的名称',
    `visitors`         int                                                           DEFAULT NULL COMMENT '本次转发带来了多少访客',
    `created_at`       datetime                                                      NOT NULL,
    `updated_at`       datetime                                                      NOT NULL,
    `score_config_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `target`           varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '转发的对象，例如：post.9',
    `uid`              varchar(100) COLLATE utf8mb4_unicode_ci                       DEFAULT NULL COMMENT '分享人的uid，有可能他还没有登录',
    PRIMARY KEY (`id`),
    KEY                `index_shares_on_user_id` (`user_id`),
    CONSTRAINT `fk_rails_d671d25093` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='转发记录';




DROP TABLE IF EXISTS `sys_configs`;
CREATE TABLE `sys_configs`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `key`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `value`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `desc`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `can_delete` tinyint(1) DEFAULT '0',
    `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `public`     tinyint(1) DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置参数';



DROP TABLE IF EXISTS `sys_messages`;
CREATE TABLE `sys_messages`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `title`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `content`    text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `cat`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `receiver`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `url`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `unread`     tinyint(1) DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `tours`;
CREATE TABLE `tours`
(
    `id`         bigint   NOT NULL AUTO_INCREMENT,
    `cover`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '封面图',
    `title`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '活动标题',
    `is_public`  tinyint(1) DEFAULT '1' COMMENT '是否公开',
    `starts_at`  datetime                                                      DEFAULT NULL COMMENT '开始时间',
    `ends_at`    datetime                                                      DEFAULT NULL COMMENT '结束时间',
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `is_delete`  tinyint(1) DEFAULT NULL COMMENT '删除',
    `cat`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '类型',
    `master`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '活动主办方',
    `is_top`     tinyint(1) DEFAULT '0' COMMENT '置顶',
    `join_btn`   varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT '立即参加' COMMENT '按钮',
    `post_ids`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
    `weapp_id`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '跳转小程序',
    `weapp_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '跳转路径',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='活动';



DROP TABLE IF EXISTS `types`;
CREATE TABLE `types`
(
    `id`                  bigint                                                        NOT NULL AUTO_INCREMENT,
    `name`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '户型名',
    `s`                   int                                                           DEFAULT NULL COMMENT '室',
    `t`                   int                                                           DEFAULT NULL COMMENT '厅',
    `w`                   int                                                           DEFAULT NULL COMMENT '卫',
    `desc`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '介绍',
    `images`              mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '图片，多图分割',
    `post_id`             bigint                                                        DEFAULT NULL COMMENT '所属楼盘',
    `position`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '朝向',
    `area`                float                                                         DEFAULT NULL COMMENT '面积',
    `number`              int                                                           DEFAULT '0' COMMENT '排序（从小打到）',
    `total_price`         float                                                         DEFAULT NULL COMMENT '总价',
    `average_price`       int                                                           DEFAULT NULL COMMENT '均价',
    `unknow_price`        tinyint(1) DEFAULT '0' COMMENT '价格待定',
    `tags`                varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标签，逗号分割',
    `created_at`          datetime                                                      NOT NULL,
    `updated_at`          datetime                                                      NOT NULL,
    `sale_status_item_id` bigint                                                        DEFAULT NULL COMMENT '销售状态',
    `post_title`          varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '楼盘标题，冗余字段',
    `code`                varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '编码',
    `vr`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'vr链接',
    `main_tag`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '【？】',
    PRIMARY KEY (`id`),
    KEY                   `index_types_on_post_id` (`post_id`),
    KEY                   `index_types_on_sale_status_item_id` (`sale_status_item_id`),
    CONSTRAINT `fk_rails_1efc5ac766` FOREIGN KEY (`sale_status_item_id`) REFERENCES `sale_status_items` (`id`),
    CONSTRAINT `fk_rails_7e8706492d` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='户型';



DROP TABLE IF EXISTS `user_profiles`;
CREATE TABLE `user_profiles`
(
    `id`               bigint   NOT NULL AUTO_INCREMENT,
    `mobile`           varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `wechat`           varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `name`             varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL,
    `sex`              tinyint                                                       DEFAULT '-1',
    `last_follow_time` datetime                                                      DEFAULT NULL,
    `next_follow_time` datetime                                                      DEFAULT NULL,
    `remark`           text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `user_id`          bigint                                                        DEFAULT NULL,
    `broker_id`        bigint                                                        DEFAULT NULL,
    `created_at`       datetime NOT NULL,
    `updated_at`       datetime NOT NULL,
    `budget`           varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '预算',
    `avatar`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `last_broker_id`   int                                                           DEFAULT NULL,
    `first_broker_id`  int                                                           DEFAULT NULL,
    `source_name`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                `index_user_profiles_on_mobile` (`mobile`),
    KEY                `index_user_profiles_on_user_id` (`user_id`),
    KEY                `index_user_profiles_on_assign_to_id` (`broker_id`),
    CONSTRAINT `fk_rails_45586b46f4` FOREIGN KEY (`broker_id`) REFERENCES `broker_profiles` (`id`),
    CONSTRAINT `fk_rails_87a6352e58` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户资料';



DROP TABLE IF EXISTS `videos`;
CREATE TABLE `videos`
(
    `id`            bigint NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
    `title`         varchar(100)                                                  DEFAULT NULL COMMENT '视频标题',
    `url`           varchar(255)                                                  DEFAULT NULL COMMENT 'url',
    `is_wxvideo`    tinyint(1) DEFAULT '0' COMMENT '是否为视频号（根据此字段来决定是否跳转视频号）',
    `wxauthor_id`   varchar(100)                                                  DEFAULT NULL COMMENT '视频号作者ID（跳转视频号时使用）',
    `author_name`   varchar(100)                                                  DEFAULT '优得好房' COMMENT '作者名称',
    `wxvideo_id`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '视频ID（跳转视频号时使用）',
    `author_avatar` varchar(255)                                                  DEFAULT 'https://qiniucdn.udeve.cn/default-avatar.png' COMMENT '作者头像',
    `is_public`     tinyint(1) DEFAULT '0' COMMENT '发布状态（隐藏、发布）',
    `view_nums`     int                                                           DEFAULT '0' COMMENT '浏览量',
    `created_at`    datetime                                                      DEFAULT NULL COMMENT '创建时间（视频创建时间）',
    `updated_at`    datetime                                                      DEFAULT NULL COMMENT '更新时间',
    `cover`         varchar(255)                                                  DEFAULT NULL COMMENT '视频封面图',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `xcx_users`;
CREATE TABLE `xcx_users`
(
    `id`                 bigint NOT NULL AUTO_INCREMENT,
    `openid`             varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `avatar`             varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `nickname`           varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `city`               varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `province`           varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `country`            varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `gender`             tinyint                                                DEFAULT NULL,
    `user_id`            bigint                                                 DEFAULT NULL,
    `session_key`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `session_key_gen_at` datetime                                               DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                  `index_xcx_users_on_user_id` (`user_id`),
    CONSTRAINT `fk_rails_b28e6b1316` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
