CREATE TABLE `conversionEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`eventType` varchar(100) NOT NULL,
	`eventValue` int DEFAULT 0,
	`utmSource` varchar(255),
	`utmMedium` varchar(255),
	`utmCampaign` varchar(255),
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversionEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userAcquisition` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`utmSource` varchar(255),
	`utmMedium` varchar(255),
	`utmCampaign` varchar(255),
	`utmTerm` varchar(255),
	`utmContent` varchar(255),
	`gclid` varchar(255),
	`matchType` varchar(50),
	`device` varchar(50),
	`network` varchar(50),
	`adPosition` varchar(50),
	`referrer` text,
	`landingPage` text,
	`userAgent` text,
	`ipAddress` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userAcquisition_id` PRIMARY KEY(`id`),
	CONSTRAINT `userAcquisition_userId_unique` UNIQUE(`userId`)
);
