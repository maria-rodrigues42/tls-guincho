import { Truck } from "lucide-react";
import PhoneBlock from "@/components/ui/PhoneBlock";
import { LINHAS } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="border-t border-refletivo/15 pb-28 pt-20 sm:pb-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <Truck className="size-6 text-farol" aria-hidden="true" />
            <span className="display text-xl text-cal">TLS Auto Guincho</span>
          </div>
          <p className="sobrancelha mt-4 text-cal/50">
            Três Lagoas · MS · 24 horas
          </p>
          <p className="mt-8 text-sm text-cal/40">
            © {new Date().getFullYear()} TLS Auto Guincho
          </p>
        </div>

        <div className="grid gap-4">
          {LINHAS.map((linha) => (
            <PhoneBlock key={linha.id} linha={linha} />
          ))}
        </div>
      </div>
    </footer>
  );
}
