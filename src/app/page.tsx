import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-foreground px-4">
      <h1 className="text-4xl font-bold tracking-tight">Lifting Diary</h1>
      <p className="text-muted-foreground text-lg">Track your workouts and progress.</p>
      <div className="flex gap-3">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </main>
  );
}
