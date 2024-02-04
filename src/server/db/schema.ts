import { sql } from "drizzle-orm";
import { int } from "drizzle-orm/mysql-core";
import { 
    pgTable, 
    text, 
    timestamp, 
    uuid,
    integer
} from "drizzle-orm/pg-core";


export const user = pgTable("users",{
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    createdAt: timestamp("created_at").default(sql`NOW()`)
})

export const plan = pgTable("plans",{
    id: uuid("id").primaryKey().notNull(),
    budget: integer("budget").notNull(),
    groupSize: integer("size").notNull(),
})