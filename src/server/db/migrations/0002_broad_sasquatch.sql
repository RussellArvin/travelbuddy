CREATE TABLE IF NOT EXISTS "conversation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT NOW(),
	"role" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "start_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "end_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "group_size" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "rating" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "currency" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plans" ADD CONSTRAINT "plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "plans" DROP COLUMN IF EXISTS "size";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
