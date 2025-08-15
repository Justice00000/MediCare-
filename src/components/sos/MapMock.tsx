import React, { useMemo } from "react"

type Coords = { lat: number; lng: number }

interface MapMockProps {
  coords: Coords
  className?: string
}

const MapMock: React.FC<MapMockProps> = ({ coords, className }) => {
  // Map lat/lng fractional parts to a 10% - 90% range for pin position
  const { topPct, leftPct } = useMemo(() => {
    const latFrac = ((coords.lat % 1) + 1) % 1
    const lngFrac = ((coords.lng % 1) + 1) % 1
    const left = 10 + lngFrac * 80
    const top = 10 + (1 - latFrac) * 80
    return { topPct: top, leftPct: left }
  }, [coords])

  return (
    <div
      role="img"
      aria-label={`Map view of approximate location at latitude ${coords.lat.toFixed(4)}, longitude ${coords.lng.toFixed(4)}`}
      className={
        "relative w-full h-64 md:h-72 rounded-lg border bg-muted overflow-hidden " +
        (className ?? "")
      }
    >
      {/* Simple grid background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.06), rgba(0,0,0,0.06) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.06) 1px, transparent 1px, transparent 24px)",
        }}
      />

      {/* Pin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-full"
        style={{ top: `${topPct}%`, left: `${leftPct}%` }}
      >
        <div className="h-5 w-5 rounded-full bg-primary shadow-md ring-2 ring-primary/30" />
        <div className="mx-auto h-3 w-1 bg-primary/70" />
      </div>

      {/* Coordinates overlay */}
      <div className="absolute bottom-2 right-2 rounded-md bg-background/80 px-2 py-1 text-xs shadow">
        <span className="tabular-nums">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span>
      </div>
    </div>
  )
}

export default MapMock
