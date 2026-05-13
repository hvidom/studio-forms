ALTER TABLE `users` RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE `users` ADD `last_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `phone_number` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `date_of_birth` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `city` text;--> statement-breakpoint
ALTER TABLE `users` ADD `zipcode` text;