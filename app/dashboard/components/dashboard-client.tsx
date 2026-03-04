"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventForm } from "./event-form";
import { FilterBar } from "./filter-bar";
import { LogoutButton } from "./logout-button";

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  type: string;
}

interface DashboardClientProps {
  items: DashboardItem[];
  sportTypes: string[];
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function DashboardClient({ items, sportTypes }: DashboardClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Fastbreak</h1>
          <LogoutButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>

        <FilterBar sportTypes={sportTypes} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="font-medium text-card-foreground">{item.title}</h3>
              {item.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                {formatDateTime(item.date)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{item.venue}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.type}</p>
            </div>
          ))}
        </div>
      </main>

      <EventForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}
