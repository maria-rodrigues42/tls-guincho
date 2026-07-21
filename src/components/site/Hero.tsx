import BotaoZap from "@/components/ui/BotaoZap";
import { LINHAS, linkWhatsapp } from "@/lib/contact";

/**
 * O herói é a chamada, e só ela. Um único botão verde domina a dobra —
 * copy curto de propósito, para o CTA caber na tela sem rolar, já que
 * quase todo acesso é celular. A linha reserva vira um link discreto
 * abaixo: um CTA por vez converte mais que dois competindo.
 */
export default function Hero() {
  const principal = LINHAS[0];
  const reserva = LINHAS[1];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:pt-14">
      <span className="sobrancelha text-asfalto/60">
        24 horas · Três Lagoas e região · MS
      </span>

      <h1 className="display mt-3 max-w-4xl text-[clamp(2.75rem,12vw,6.5rem)] text-asfalto">
        Parou?
        <br />
        A gente vai.
      </h1>

      <p className="mt-5 max-w-md text-lg leading-relaxed text-asfalto/70">
        Reboque de moto, carro, utilitário e pesado — a qualquer hora, em Três
        Lagoas e região.
      </p>

      <div className="mt-7">
        <BotaoZap linha={principal} className="w-full sm:w-auto">
          Chamar no WhatsApp agora
        </BotaoZap>

        <p className="mt-3 text-sm text-asfalto/60">
          Linha principal não atendeu?{" "}
          <a
            href={linkWhatsapp(reserva)}
            className="font-semibold text-asfalto underline underline-offset-2"
          >
            Chame {reserva.numeroExibido}
          </a>
        </p>
      </div>
    </section>
  );
}
