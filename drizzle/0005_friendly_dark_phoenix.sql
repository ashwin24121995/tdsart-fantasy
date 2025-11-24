CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`session_id` varchar(64) NOT NULL,
	`user_id` int,
	`path` varchar(512) NOT NULL,
	`referrer` varchar(512),
	`user_agent` text,
	`ip_address` varchar(45),
	`device_type` varchar(20),
	`browser` varchar(50),
	`utm_source` varchar(255),
	`utm_medium` varchar(255),
	`utm_campaign` varchar(255),
	`utm_term` varchar(255),
	`utm_content` varchar(255),
	`gclid` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`session_id` varchar(64) NOT NULL,
	`user_id` int,
	`entry_page` varchar(512) NOT NULL,
	`exit_page` varchar(512),
	`page_view_count` int NOT NULL DEFAULT 1,
	`duration` int,
	`bounced` int NOT NULL DEFAULT 0,
	`utm_source` varchar(255),
	`utm_medium` varchar(255),
	`utm_campaign` varchar(255),
	`gclid` varchar(255),
	`device_type` varchar(20),
	`browser` varchar(50),
	`started_at` timestamp NOT NULL DEFAULT (now()),
	`ended_at` timestamp,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `sessions_session_id_unique` UNIQUE(`session_id`)
);
--> statement-breakpoint
CREATE INDEX `session_idx` ON `page_views` (`session_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `page_views` (`user_id`);--> statement-breakpoint
CREATE INDEX `path_idx` ON `page_views` (`path`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `page_views` (`created_at`);--> statement-breakpoint
CREATE INDEX `session_id_idx` ON `sessions` (`session_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `started_at_idx` ON `sessions` (`started_at`);