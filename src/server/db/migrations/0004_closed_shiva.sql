ALTER TABLE "plan_items" ADD COLUMN "activity" text NOT NULL;--> statement-breakpoint
ALTER TABLE "plan_items" ADD COLUMN "is_halal" boolean DEFAULT false NOT NULL;