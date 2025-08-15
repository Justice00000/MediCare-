import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number; // 0-5
  outOf?: number;
  className?: string;
}

export default function RatingStars({ rating, outOf = 5, className }: RatingStarsProps) {
  const filled = Math.round(rating);
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Rating ${rating} out of ${outOf}`}>
      {Array.from({ length: outOf }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < filled ? "text-primary" : "text-muted-foreground")}
          fill="currentColor"
        />
      ))}
      <span className="sr-only">{rating} out of {outOf} stars</span>
    </div>
  );
}
