-- MySQL dump 10.13  Distrib 5.6.16, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: assetMng
-- ------------------------------------------------------
-- Server version	5.6.16-1~exp1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `deviceDetial`
--

DROP TABLE IF EXISTS `deviceDetial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deviceDetial` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `type` int(8) DEFAULT NULL,
  `reciverMacAdd` varchar(32) DEFAULT NULL,
  `serial` varchar(32) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `uid` int(32) NOT NULL,
  `bleType` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `deviceDetial_fk0` (`uid`),
  CONSTRAINT `deviceDetial_fk0` FOREIGN KEY (`uid`) REFERENCES `userInfo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deviceDetial`
--

LOCK TABLES `deviceDetial` WRITE;
/*!40000 ALTER TABLE `deviceDetial` DISABLE KEYS */;
/*!40000 ALTER TABLE `deviceDetial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userInfo`
--

DROP TABLE IF EXISTS `userInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userInfo` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(64) DEFAULT NULL,
  `lastName` varchar(64) DEFAULT NULL,
  `contactno` bigint(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `userType` int(8) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `tokenKey` varchar(64) DEFAULT NULL,
  `fcmtokenKey` varchar(256) DEFAULT NULL,
  `loginTime` int(100) DEFAULT NULL,
  `creatorid` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userInfo`
--

LOCK TABLES `userInfo` WRITE;
/*!40000 ALTER TABLE `userInfo` DISABLE KEYS */;
INSERT INTO `userInfo` VALUES (1,'Admin','Wavenet',8826644268,'Plot no 105 sec-44 Gurgaon',0,'admin@wavenetcorp.com','ff9830c42660c1dd1942844f8069b74a',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `userInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone_device`
--

DROP TABLE IF EXISTS `zone_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zone_device` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `zid` int(32) NOT NULL,
  `did` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `zone_device_fk0` (`zid`),
  KEY `zone_device_fk1` (`did`),
  CONSTRAINT `zone_device_fk0` FOREIGN KEY (`zid`) REFERENCES `zones` (`id`),
  CONSTRAINT `zone_device_fk1` FOREIGN KEY (`did`) REFERENCES `deviceDetial` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_device`
--

LOCK TABLES `zone_device` WRITE;
/*!40000 ALTER TABLE `zone_device` DISABLE KEYS */;
/*!40000 ALTER TABLE `zone_device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zones`
--

DROP TABLE IF EXISTS `zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zones` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `zoneName` varchar(80) DEFAULT NULL,
  `active` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones`
--

LOCK TABLES `zones` WRITE;
/*!40000 ALTER TABLE `zones` DISABLE KEYS */;
INSERT INTO `zones` VALUES (11,'wavenet11',0),(12,'wavenet12',1),(13,'wavenet13',1),(14,'wavenet14',1),(15,'wavenet15',1),(16,'wavenet16',1),(17,'wavenet17',1),(18,'wavenet165',0),(19,'wavenet19',1),(20,'wavenet10',1);
/*!40000 ALTER TABLE `zones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-09 12:54:11
