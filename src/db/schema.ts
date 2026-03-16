import { integer, pgTable, varchar, timestamp, numeric } from "drizzle-orm/pg-core";

export const workoutsTable = pgTable("workouts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  date: timestamp().notNull(),
  notes: varchar({ length: 1000 }),
  createdAt: timestamp().notNull().defaultNow(),
});

export const sessionsTable = pgTable("sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  workoutId: integer().notNull().references(() => workoutsTable.id, { onDelete: "cascade" }),
  exerciseName: varchar({ length: 255 }).notNull(),
  order: integer().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const setsTable = pgTable("sets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: integer().notNull().references(() => sessionsTable.id, { onDelete: "cascade" }),
  setNumber: integer().notNull(),
  weight: numeric({ precision: 6, scale: 2 }).notNull(),
  reps: integer().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
