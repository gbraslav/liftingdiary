"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { workoutsTable, sessionsTable, setsTable } from "@/db/schema";
import { eq, and, gte, lt } from "drizzle-orm";

export type SetData = {
  id: number;
  setNumber: number;
  weight: string;
  reps: number;
};

export type SessionData = {
  id: number;
  exerciseName: string;
  order: number;
  sets: SetData[];
};

export type WorkoutData = {
  id: number;
  name: string;
  date: Date;
  notes: string | null;
  sessions: SessionData[];
};

export async function getWorkoutsByDate(date: string): Promise<WorkoutData[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);

  const workouts = await db
    .select()
    .from(workoutsTable)
    .where(
      and(
        eq(workoutsTable.userId, userId),
        gte(workoutsTable.date, start),
        lt(workoutsTable.date, end)
      )
    );

  const result: WorkoutData[] = [];

  for (const workout of workouts) {
    const sessions = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.workoutId, workout.id))
      .orderBy(sessionsTable.order);

    const sessionsWithSets: SessionData[] = [];

    for (const session of sessions) {
      const sets = await db
        .select()
        .from(setsTable)
        .where(eq(setsTable.sessionId, session.id))
        .orderBy(setsTable.setNumber);

      sessionsWithSets.push({
        id: session.id,
        exerciseName: session.exerciseName,
        order: session.order,
        sets: sets.map((s) => ({
          id: s.id,
          setNumber: s.setNumber,
          weight: s.weight,
          reps: s.reps,
        })),
      });
    }

    result.push({
      id: workout.id,
      name: workout.name,
      date: workout.date,
      notes: workout.notes ?? null,
      sessions: sessionsWithSets,
    });
  }

  return result;
}
