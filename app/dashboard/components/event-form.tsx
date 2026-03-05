"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createEvent, updateEvent } from "../actions";

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.string().min(1, "Type is required"),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: {
    id: string;
    title: string;
    description: string;
    date: string;
    venues: string[];
    type: string;
  };
}

export function EventForm({ open, onOpenChange, event }: EventFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <EventFormContent
          event={event}
          onOpenChange={onOpenChange}
        />
      )}
    </Dialog>
  );
}

function EventFormContent({
  event,
  onOpenChange,
}: {
  event: EventFormProps["event"];
  onOpenChange: (open: boolean) => void;
}) {
  const isEditing = !!event;

  const getInitialFormValues = (): EventFormValues => {
    if (event) {
      const eventDate = new Date(event.date);
      return {
        title: event.title,
        description: event.description ?? "",
        date: eventDate.toISOString().split("T")[0],
        time: eventDate.toTimeString().slice(0, 5),
        type: event.type,
      };
    }
    return { title: "", description: "", date: "", time: "", type: "" };
  };

  const [venues, setVenues] = useState<string[]>(
    event?.venues?.length ? event.venues : [""]
  );

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: getInitialFormValues(),
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const addVenue = () => {
    setVenues([...venues, ""]);
  };

  const removeVenue = (index: number) => {
    setVenues(venues.filter((_, i) => i !== index));
  };

  const updateVenue = (index: number, value: string) => {
    const newVenues = [...venues];
    newVenues[index] = value;
    setVenues(newVenues);
  };

  const onSubmit = async (values: EventFormValues) => {
    const filteredVenues = venues.filter((v) => v.trim() !== "");
    if (filteredVenues.length === 0) {
      toast.error("At least one venue is required");
      return;
    }

    const localDate = new Date(`${values.date}T${values.time}:00`);
    const formData = {
      title: values.title,
      description: values.description ?? "",
      date: localDate.toISOString(),
      venues: filteredVenues,
      type: values.type,
    };

    const result = isEditing
      ? await updateEvent(event.id, formData)
      : await createEvent(formData);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success(result.message ?? (isEditing ? "Event updated" : "Event created"));
    handleClose();
  };

  return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Event description (optional)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Venues</FormLabel>
              {venues.map((venue, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Event venue"
                    value={venue}
                    onChange={(e) => updateVenue(index, e.target.value)}
                  />
                  {venues.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeVenue(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addVenue}
                className="mt-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Venue
              </Button>
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Event type (e.g., Golf, Basketball)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
  );
}
