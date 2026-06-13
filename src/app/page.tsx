import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-3xl font-bold">💰 CashCoach</h1>
      <p className="max-w-md text-muted-foreground">
        Tu coach financiero con IA. Setup completo — listo para construir las
        siguientes etapas.
      </p>
      <Button>Empezar</Button>
    </main>
  );
}
