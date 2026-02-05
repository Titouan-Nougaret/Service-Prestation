"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PDFViewer, Font } from "@react-pdf/renderer";
import { useSyncExternalStore, ReactElement } from "react";

// Register fonts once
Font.register({
  family: "Teko",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/teko/v23/LYjYdG7kmE0gV69VVPPdFl06VN9JG4S11zY.ttf",
      fontWeight: 300,
    },
    {
      src: "https://fonts.gstatic.com/s/teko/v23/LYjYdG7kmE0gV69VVPPdFl06VN8XG4S11zY.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/teko/v23/LYjYdG7kmE0gV69VVPPdFl06VN8lG4S11zY.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/teko/v23/LYjYdG7kmE0gV69VVPPdFl06VN_JHIS11zY.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/teko/v23/LYjYdG7kmE0gV69VVPPdFl06VN_wHIS11zY.ttf",
      fontWeight: 700,
    },
  ],
});

interface PdfViewerWrapperProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any>;
  className?: string;
}

export default function PdfViewerWrapper({
  children,
  className,
}: PdfViewerWrapperProps) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient) {
    return (
      <Card
        className={cn(
          "bg-[oklch(1_0_0)] text-[oklch(0.13_0.028_261.692)]",
          className,
        )}
      >
        <div className="m-2 border border-solid border-pdf-border h-[600px] flex items-center justify-center">
          Chargement de l&apos;aperçu...
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "bg-[oklch(1_0_0)] text-[oklch(0.13_0.028_261.692)] h-full p-3",
        className,
      )}
    >
      <PDFViewer className="w-full h-full border-none">{children}</PDFViewer>
    </Card>
  );
}
