import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getWorkoutsByDate } from "@/app/actions/workouts";
import WorkoutList from "./WorkoutList";

function todayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const today = todayString();
  const workouts = await getWorkoutsByDate(today);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <WorkoutList initialDate={today} initialWorkouts={workouts} />
    </main>
  );
}
