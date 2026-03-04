"use client";

import { useState } from "react";
import { Calendar, Clock, Info, MapPin, Pencil, Plus, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EventForm } from "./event-form";
import { FilterBar } from "./filter-bar";
import { LogoutButton } from "./logout-button";
import { deleteEvent } from "../actions";
import { toast } from "sonner";

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  date: string;
  venues: string[];
  type: string;
}

interface DashboardClientProps {
  items: DashboardItem[];
  sportTypes: string[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getBorderColorClass(type: string): string {
  const typeMap: Record<string, string> = {
    golf: "border-green-500",
    basketball: "border-orange-500",
    baseball: "border-blue-500",
    football: "border-amber-700",
    soccer: "border-gray-400",
    tennis: "border-green-700",
  };
  return typeMap[type.toLowerCase()] ?? "";
}

export function DashboardClient({ items, sportTypes }: DashboardClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DashboardItem | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<DashboardItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (item: DashboardItem) => {
    setEditingEvent(item);
    setIsFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingEvent(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEvent) return;
    setIsDeleting(true);
    const result = await deleteEvent(deletingEvent.id);
    setIsDeleting(false);
    setDeletingEvent(null);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Event deleted");
    }
  };

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
              className={`relative flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md ${getBorderColorClass(item.type)}`}
            >
              <div className="absolute right-2 top-2 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => setDeletingEvent(item)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(item.date)}</span>
              </div>
              <h3 className="mt-1 font-medium text-card-foreground">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {item.description || ""}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(item.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {item.venues.length === 1 ? (
                    <span>{item.venues[0]}</span>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex cursor-default items-center gap-1">
                          Multiple
                          <Info className="h-3 w-3" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <ul className="list-none">
                          {item.venues.map((venue, idx) => (
                            <li key={idx}>{venue}</li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>{item.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <EventForm
        open={isFormOpen}
        onOpenChange={handleFormClose}
        event={editingEvent ?? undefined}
      />

      <AlertDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletingEvent?.title}&quot;? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
