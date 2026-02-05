import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PrestaInstallPdf({
  className,
}: {
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "bg-[oklch(1_0_0)] text-[oklch(0.13_0.028_261.692)] border-border ",
        className,
      )}
    ></Card>
  );
}
