CREATE DATABASE `auth_example`;
CREATE TABLE `auth_example`.`users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `email` longtext NOT NULL,
  `password` longtext NOT NULL,
  `role` longtext NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

#plain text password: admin123
INSERT INTO `auth_example`.`users`
(`name`,
`surname`,
`email`,
`password`,
`role`)
VALUES
('Admin', 'Administrator', 'admin@example.com', 'pbkdf2:sha1:1000$AnTWJcfU$f5411cf1b21586e69e60fbe3d4e173013fbdd888', 'admin');

#plain text password: test123
INSERT INTO `auth_example`.`users`
(`name`,
`surname`,
`email`,
`password`,
`role`)
VALUES
('Test', 'Tester', 'test@example.com', 'pbkdf2:sha1:1000$fVbSJxSL$07ca023bfd503edc2e0682e72187ca5e990f2388', 'user');