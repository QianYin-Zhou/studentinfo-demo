/*
Navicat MySQL Data Transfer

Source Server         : Cissy
Source Server Version : 50557
Source Host           : localhost:3306
Source Database       : demo01

Target Server Type    : MYSQL
Target Server Version : 50557
File Encoding         : 65001

Date: 2020-04-21 15:31:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `cid` char(5) NOT NULL COMMENT '班级号',
  `name` varchar(18) DEFAULT NULL COMMENT '班级名称',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('85670', '软件工程5班');
INSERT INTO `class` VALUES ('85671', '软件工程6班');
INSERT INTO `class` VALUES ('85680', '工业工程与决策分析');
INSERT INTO `class` VALUES ('85690', '国际新闻');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '表主键',
  `account` varchar(12) NOT NULL DEFAULT '' COMMENT '学生学号',
  `name` varchar(9) NOT NULL COMMENT '学生姓名',
  `password` varchar(255) NOT NULL DEFAULT '' COMMENT '学生登录密码',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '学生头像',
  `create_time` datetime DEFAULT NULL COMMENT '注册时间',
  `isVerify` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户是否认证',
  `cid` char(5) NOT NULL COMMENT '班级号',
  PRIMARY KEY (`sid`),
  KEY `cid` (`cid`),
  CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `class` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', '201802004468', '周茜茵', '$2a$10$R5BLg160HgvY5iN8lSxz5.LlvOBTyTowOPBuv4vwGSBauCxCieZq6', 'img/avatar.png', '2020-04-14 06:34:37', '1', '85670');
INSERT INTO `student` VALUES ('2', '201802004407', '张嘻嘻', '$2a$10$1XpEACtF71KC7ERbaLqaYunKqJmOSjw7MV6da8C1hCKfu6QViAWQG', 'img/avatar.png', '2020-04-20 03:05:47', '1', '85671');
INSERT INTO `student` VALUES ('3', '201802004447', '熊二', '$2a$10$91SBHdjyWltqyy1j1560M.I0PIl1xVdlqyhe4Fk68wDvhcHhF68rm', 'img/avatar.png', '2020-04-21 03:46:00', '1', '85670');
INSERT INTO `student` VALUES ('5', '201802004388', '熊大', '$2a$10$3Ke/4CvlrmCA8Gm5DmJ0N.nJmHHrapt6Y4Fp0q/RhCLqhQTL8Y4B.', 'img/avatar.png', '2020-04-21 05:12:01', '1', '85680');
INSERT INTO `student` VALUES ('6', '201802004469', '光头强', '$2a$10$0vMZx3W/GH8/opwI7qyDAOvmewfqp55WeBn5mhtioNjIwiynjlmKu', 'img/avatar.png', '2020-04-21 05:12:39', '1', '85690');
INSERT INTO `student` VALUES ('7', '201802004377', '赵琳', '$2a$10$GdfamRcqvJ1VxWL9HdZNKe2R7qPFLFHwq/NmempHyuQYPR1QNZ0BK', 'img/avatar.png', '2020-04-21 05:13:05', '1', '85680');
INSERT INTO `student` VALUES ('8', '201802004277', '萝卜头', '$2a$10$FCFd.W2JXhRtK4rVzBBzn.8ih9NdsNWyDjrxqd6AbXPjiQmgurJta', 'img/avatar.png', '2020-04-21 05:13:40', '1', '85671');
INSERT INTO `student` VALUES ('9', '201802004378', '涂涂', '$2a$10$OgR58L5Km0YEQHU0zXdxLOT4G/eK06WmWkWuMqVwmIGbI9lb18ENW', 'img/avatar.png', '2020-04-21 05:14:14', '1', '85670');
INSERT INTO `student` VALUES ('10', '201802004380', '肥波', '$2a$10$HoYwXPwLtd0FnW8wuy59Iuq4VO.VC0PNiXMtxjDCyrkXipm5S6292', 'img/avatar.png', '2020-04-21 05:14:39', '1', '85671');
INSERT INTO `student` VALUES ('11', '201802004445', '吉吉', '$2a$10$rQ5BHlFS4Qpa7wzu.yDneeqBEIeHt4giD1bqrGkdgRnjhYNtvw97m', 'img/avatar.png', '2020-04-21 05:15:34', '1', '85671');
INSERT INTO `student` VALUES ('12', '201802004444', '毛毛', '$2a$10$JpYHIRs16Ne9X/FY0.0NYOHUHVP4LLjDnVwdkJDfjeOID1pba/Iia', 'img/avatar.png', '2020-04-21 05:16:06', '1', '85680');
INSERT INTO `student` VALUES ('13', '201802004555', '蹦蹦', '$2a$10$Z1Ytjk3ZN3IR.cVNyLjAbe/UVyAALlh7QQaqCg.tSJ7kiAV8i7kDy', 'img/avatar.png', '2020-04-21 05:16:32', '1', '85671');
