import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatPlaceholderProps {
  professionalName: string;
}

export default function ChatPlaceholder({ professionalName }: ChatPlaceholderProps) {
  return (
    <Card aria-label="Chat placeholder">
      <CardHeader>
        <CardTitle>Chat with {professionalName}</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[360px] flex-col">
        <div className="flex-1 space-y-3 overflow-auto rounded-md border bg-muted/30 p-3 text-sm">
          <div className="max-w-[80%] rounded-md bg-accent px-3 py-2 text-accent-foreground">Hello! This is a chat preview. Real-time messaging will appear here.</div>
          <div className="ml-auto max-w-[80%] rounded-md bg-primary px-3 py-2 text-primary-foreground">Great, I will be ready for our consultation.</div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Input placeholder="Messaging coming soon..." disabled aria-disabled />
          <Button disabled>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
