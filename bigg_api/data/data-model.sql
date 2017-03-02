DROP DATABASE IF EXISTS `PdbMapping`;
CREATE SCHEMA IF NOT EXISTS `PdbMapping` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `PdbMapping` ;


-- -----------------------------------------------------
-- Table `Authorization`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `Authorization` ;
--
-- CREATE  TABLE IF NOT EXISTS `Authorization` (
--   `id` BIGINT NOT NULL AUTO_INCREMENT ,
--   `serviceName` VARCHAR(255) NOT NULL ,
--   `key` VARCHAR(255) NOT NULL ,
--   `secret` VARCHAR(255) NOT NULL ,
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB;
--
-- INSERT INTO Authorization (`serviceName`, `key`, `secret`) VALUES ('testService', 'key', SHA2('secret',256));


DROP TABLE IF EXISTS `PdbMapping` ;
CREATE  TABLE IF NOT EXISTS `PdbMapping` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `reactionName` VARCHAR(255) NOT NULL,
  `gene` VARCHAR(255) NULL,
  `pdbName` VARCHAR(255) NOT NULL,
  `best_pdb_chain` VARCHAR(255) NOT NULL,
  `lastUpdated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;
