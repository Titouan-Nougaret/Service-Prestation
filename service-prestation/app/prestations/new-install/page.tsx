import PrestaInstallForm from "@/components/smart-document/presta-install/form";
import PrestaInstallPdf from "@/components/smart-document/presta-install/pdf-template";

export default function NewInstall() {
  return (
    <div className="flex h-full gap-4 justify-around">
      <PrestaInstallForm className="w-2/5" />
      <PrestaInstallPdf className="w-3/5" />
    </div>
  );
}
