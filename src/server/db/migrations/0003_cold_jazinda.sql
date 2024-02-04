CREATE TABLE IF NOT EXISTS "plan_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"plan_id" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "plans" RENAME COLUMN "budget" TO "start_budget";--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "end_budget" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plan_items" ADD CONSTRAINT "plan_items_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
