import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon } from "lucide-react";

const schema = z.object({
  type: z.enum(["home-visit", "video"], { required_error: "Please choose a consultation type" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Select a time"),
  address: z.string().optional(),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface BookingFormProps {
  professionalName: string;
}

export default function BookingForm({ professionalName }: BookingFormProps) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "video",
      date: undefined,
      time: "",
      address: "",
      note: "",
    },
  });

  const watchType = form.watch("type");

  function onSubmit(values: FormValues) {
    toast({
      title: "Booking request sent",
      description: `${professionalName} • ${values.type === "video" ? "Video" : "Home visit"} on ${values.date ? format(values.date, "PPP") : ""} at ${values.time}`,
    });
    form.reset({ ...values });
  }

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM", "04:00 PM",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Book a consultation</h2>
        <p className="text-sm text-muted-foreground">Choose type, date and time. You can add a note for {professionalName}.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consultation type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="video">Video consultation</SelectItem>
                    <SelectItem value="home-visit">Home visit</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select how you want to meet.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchType === "home-visit" && (
            <div className="space-y-2">
              <Label htmlFor="address">Home address</Label>
              <Input id="address" placeholder="Street, City" {...form.register("address")} />
              <p className="text-xs text-muted-foreground">Only required for home visits.</p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(d) => { field.onChange(d); setOpen(false); }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Select any available day.</FormDescription>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note to professional (optional)</Label>
            <Input id="note" placeholder="Briefly describe your concern" {...form.register("note")} />
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="min-w-40">Confirm booking</Button>
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
