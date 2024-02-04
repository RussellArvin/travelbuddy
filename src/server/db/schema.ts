import { sql } from "drizzle-orm";
import { 
    pgTable, 
    text, 
    timestamp, 
    uuid,
    integer,
    date
} from "drizzle-orm/pg-core";


export const user = pgTable("users",{
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    createdAt: timestamp("created_at").default(sql`NOW()`),
    currency: text("currency"),
})

export const plan = pgTable("plans",{
    id: uuid("id").primaryKey().notNull(),
    userId: text("user_id").notNull().references(() => user.id),
    budget: integer("budget").notNull(),
    city: text("city").notNull(),
    startDate:date("start_date").notNull(),
    endDate:date("end_date").notNull(),
    groupSize: integer("group_size").notNull(),
    rating: integer("rating")
})

export const planItems = pgTable("plan_items",{
    id: uuid("id").primaryKey().notNull(),
    planId: uuid("plan_id").notNull().references(() => plan.id),
    startDate:date("start_date").notNull(),
    endDate:date("end_date").notNull(),
    location: text("location").notNull()
})

export const conversation = pgTable("conversation",{
    id: uuid("id").primaryKey().notNull().default(sql`gen_random_uuid()`),
    planId: uuid("plan_id").notNull().references(() => plan.id),
    createdAt: timestamp("created_at").default(sql`NOW()`),
    role: text("role").notNull(),
    content: text("content").notNull()
})