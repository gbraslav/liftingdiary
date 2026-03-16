"use client";

import { useState, useTransition } from "react";
import { getWorkoutsByDate, WorkoutData } from "@/app/actions/workouts";

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function WorkoutList({
  initialDate,
  initialWorkouts,
}: {
  initialDate: string;
  initialWorkouts: WorkoutData[];
}) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [isPending, startTransition] = useTransition();

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const date = e.target.value;
    setSelectedDate(date);
    startTransition(async () => {
      const data = await getWorkoutsByDate(date);
      setWorkouts(data);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <label htmlFor="date-picker" className="text-sm font-medium text-foreground/70">
          Date
        </label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-background border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {isPending && <span className="text-sm text-foreground/50">Loading...</span>}
      </div>

      {workouts.length === 0 ? (
        <p className="text-foreground/50 text-sm">No workouts logged for this date.</p>
      ) : (
        <div className="space-y-6">
          {workouts.map((workout) => (
            <div key={workout.id} className="rounded-lg border border-border bg-card p-5 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">{workout.name}</h2>
                {workout.notes && (
                  <p className="text-sm text-foreground/60 mt-1">{workout.notes}</p>
                )}
              </div>

              {workout.sessions.length > 0 && (
                <div className="space-y-4">
                  {workout.sessions.map((session) => (
                    <div key={session.id}>
                      <h3 className="text-sm font-medium text-foreground/80 mb-2">
                        {session.exerciseName}
                      </h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-foreground/50 border-b border-border">
                            <th className="pb-1 pr-4 font-normal">Set</th>
                            <th className="pb-1 pr-4 font-normal">Weight</th>
                            <th className="pb-1 font-normal">Reps</th>
                          </tr>
                        </thead>
                        <tbody>
                          {session.sets.map((set) => (
                            <tr key={set.id} className="border-b border-border/40 last:border-0">
                              <td className="py-1 pr-4 text-foreground/70">{set.setNumber}</td>
                              <td className="py-1 pr-4">{set.weight} kg</td>
                              <td className="py-1">{set.reps}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
