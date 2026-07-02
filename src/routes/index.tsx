import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Music2,
  Sparkles,
  Ticket,
  Flame,
  Star,
  ChevronDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchEvents, formatDatePt, type ShowEvent } from "@/lib/events";
import logoTemplo from "@/assets/logo-templo.png";
import useEmblaCarousel from "embla-carousel-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Templo Bar de Fé — O Melhor Samba de São Paulo" },
      {
        name: "description",
        content:
          "Programação de shows ao vivo no Templo Bar de Fé, Alto da Mooca. Pagode, samba de raiz e a energia que move a noite paulistana.",
      },
      { property: "og:title", content: "Templo Bar de Fé — O Melhor Samba de SP" },
      {
        property: "og:description",
        content: "Confira a programação e garanta seu lugar no melhor samba paulistano.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const WHATSAPP_URL =
  "https://wa.me/5511949861693?text=" +
  encodeURIComponent("Olá! Quero saber mais sobre o Templo Bar de Fé.");

/* ---------------- NAV ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <a href="#topo" className="flex items-center gap-3 group">
          <img
            src={logoTemplo}
            alt="Templo Bar de Fé"
            className="h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </a>

        <div className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-[0.18em] font-semibold">
          <a href="#programacao" className="hover:text-secondary transition-colors">
            Programação
          </a>
          <a href="#sobre" className="hover:text-secondary transition-colors">
            Sobre
          </a>
          <a href="#localizacao" className="hover:text-secondary transition-colors">
            Localização
          </a>
          <a href="#contato" className="hover:text-secondary transition-colors">
            Contato
          </a>
        </div>

        <a
          href="#programacao"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-bold text-xs uppercase tracking-[0.15em] hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 shadow-sun"
        >
          <Ticket className="w-4 h-4" /> Garanta seu lugar!
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center"
        >
          <div className="flex flex-col gap-1">
            <span className="w-4 h-0.5 bg-foreground" />
            <span className="w-4 h-0.5 bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 py-6 flex flex-col gap-4 text-sm uppercase tracking-[0.2em] font-semibold">
          <a href="#programacao" onClick={() => setOpen(false)}>
            Programação
          </a>
          <a href="#sobre" onClick={() => setOpen(false)}>
            Sobre
          </a>
          <a href="#localizacao" onClick={() => setOpen(false)}>
            Localização
          </a>
          <a href="#contato" onClick={() => setOpen(false)}>
            Contato
          </a>
        </div>
      )}
    </nav>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section
      id="topo"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-24 pb-16"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src="https://www.youtube.com/embed/pqPDUrRTl7A?autoplay=1&mute=1&loop=1&playlist=pqPDUrRTl7A&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0"
          title="Templo Bar de Fé"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/35 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_85%)]" />
      </div>

      {/* Decorative sun ring */}
      <div className="absolute top-32 -right-24 w-96 h-96 rounded-full border-2 border-secondary/30 animate-spin-slow z-0" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-primary/30 animate-spin-slow z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-gradient border border-accent/40 mb-8 animate-float">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-foreground font-semibold">
            Alto da Mooca · São Paulo
          </span>
        </div>

        <h1 className="font-display text-[15vw] sm:text-[10vw] md:text-[8vw] lg:text-9xl leading-[0.85] mb-8">
          <span className="block text-foreground">O melhor</span>
          <span className="block text-gradient-sun italic">samba</span>
          <span className="block text-foreground">de São Paulo</span>
        </h1>

        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Pagode, samba de raiz e a energia que move a noite paulistana. Bem-vindo ao{" "}
          <span className="text-secondary font-semibold">Templo — Bar de Fé</span>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#programacao"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-sunset text-primary-foreground font-bold uppercase tracking-[0.15em] text-sm shadow-glow hover:scale-105 transition-transform"
          >
            <Ticket className="w-4 h-4" />
            Ver programação
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>
          <a
            href="#localizacao"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-secondary/60 text-secondary font-bold uppercase tracking-[0.15em] text-sm hover:bg-secondary hover:text-secondary-foreground transition-all"
          >
            <MapPin className="w-4 h-4" />
            Como chegar
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-float">
        <ChevronDown className="w-6 h-6 text-secondary/70" />
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = [
    "Samba de raiz",
    "Pagode ao vivo",
    "Roda de samba",
    "Energia paulistana",
    "Cerveja gelada",
    "Petiscos da casa",
  ];
  const loop = [...items, ...items];
  return (
    <div className="relative py-6 bg-sunset overflow-hidden border-y border-secondary/30">
      <div className="flex gap-12 whitespace-nowrap animate-marquee w-max">
        {loop.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-4 font-display text-3xl md:text-4xl text-primary-foreground tracking-tight"
          >
            <Star className="w-5 h-5 fill-current" />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- EVENT CARD ---------------- */
function EventCard({ event, index }: { event: ShowEvent; index: number }) {
  const hasPromo = event.promocao && event.promocao.trim() !== "";
  const fallbackImg =
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80";
  const accentTilt = index % 2 === 0 ? "-rotate-1" : "rotate-1";

  return (
    <article
      className={`group relative rounded-3xl overflow-hidden bg-card border border-border/60 shadow-deep hover:shadow-glow transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${
        hasPromo ? "ring-2 ring-secondary" : ""
      }`}
    >
      {hasPromo && (
        <div className={`absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-black uppercase tracking-[0.18em] shadow-sun flex items-center gap-1 ${accentTilt}`}>
          <Flame className="w-3 h-3" /> Promoção
        </div>
      )}

      <div className="aspect-square w-full overflow-hidden bg-muted relative">
        <img
          src={event.foto && event.foto.trim() !== "" ? event.foto : fallbackImg}
          alt={event.artista}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImg;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        <h3 className="absolute bottom-4 left-5 right-5 font-display text-3xl md:text-4xl leading-[0.95] text-foreground drop-shadow-lg">
          {event.artista}
        </h3>
      </div>

      <div className="p-5 space-y-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-full bg-muted/60 text-white text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-1.5 border border-secondary/30">
            <Calendar className="w-3 h-3" />
            {formatDatePt(event.dateObj, event.data)}
          </span>
          {event.horario && (
            <span className="px-3 py-1.5 rounded-full bg-muted/60 text-white text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-1.5 border border-border">
              <Clock className="w-3 h-3" /> {event.horario}
            </span>
          )}
        </div>

        {(event.entradaMasculina || event.entradaFeminina) && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {event.entradaMasculina && (
              <div className="rounded-xl bg-muted/60 px-3 py-2.5 border border-border/40">
                <div className="text-muted-foreground uppercase tracking-[0.18em] text-[9px] mb-0.5">
                  Homens
                </div>
                <div className="font-bold text-foreground text-sm">
                  {event.entradaMasculina}
                </div>
              </div>
            )}
            {event.entradaFeminina && (
              <div className="rounded-xl bg-muted/60 px-3 py-2.5 border border-border/40">
                <div className="text-muted-foreground uppercase tracking-[0.18em] text-[9px] mb-0.5">
                  Mulheres
                </div>
                <div className="font-bold text-foreground text-sm">
                  {event.entradaFeminina}
                </div>
              </div>
            )}
          </div>
        )}

        {!(event.entradaMasculina || event.entradaFeminina) && (
          <div className="rounded-xl bg-secondary/15 border border-secondary/40 px-3 py-2.5 text-xs text-secondary font-bold leading-relaxed">
            Show com venda de ingressos antecipada!
          </div>
        )}

        {hasPromo && (
          <div className="rounded-xl bg-secondary/15 border border-secondary/40 px-3 py-2.5 text-xs text-secondary font-medium leading-relaxed">
            ✨ {event.promocao}
          </div>
        )}

        <a
          href={event.link && event.link.trim() !== "" ? event.link : WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-2xl bg-sunset text-primary-foreground font-bold uppercase tracking-[0.15em] text-xs hover:scale-[1.02] transition-transform shadow-glow"
        >
          <Ticket className="w-4 h-4" />
          Garanta seu lugar!
        </a>
      </div>
    </article>
  );
}

/* ---------------- PROGRAMACAO ---------------- */
function Programacao() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section id="programacao" className="relative py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-[10px] uppercase tracking-[0.35em] text-secondary font-bold mb-5">
              <Sparkles className="w-3 h-3" /> Próximos Shows
            </div>
            <h2 className="font-display text-6xl md:text-8xl leading-[0.9]">
              <span className="block text-foreground">PROGRA-</span>
              <span className="block text-gradient-sun italic">mação</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
            Atualizada toda semana. Confira quem sobe ao palco do Templo e garanta sua
            presença na noite mais quente da Mooca.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl bg-card border border-border/50 overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-12 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-muted-foreground">
            <p>Não foi possível carregar a programação no momento.</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline mt-3 inline-block"
            >
              Fale conosco no WhatsApp
            </a>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>Nenhum show agendado no momento. Volte em breve!</p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((event, i) => (
              <EventCard
                key={`${event.data}-${event.artista}-${i}`}
                event={event}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- SOBRE ---------------- */
function SobreTemplo() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const fotos = [
    "https://lh3.googleusercontent.com/9_EicIyb47DM7UBBBRWrv5j-mN0ygb9JqQmmy1NN4H0BzSurn7SOJo8Uaq6JWNrv6AK9eF6zu_ZXlutt=w2116",
    "https://lh3.googleusercontent.com/FS8Rm6pW-x-BM8IaEdirGL4ZzTR84t6cNuoRbwJ-AQihLBAaohqsgi-Z0s3KM1lb5PG_rZyRudV5M8dj=w2116",
    "https://lh3.googleusercontent.com/1C3xewLY4Z9AGhD3JTHjOtUIZROOfMUbgZW7CV6iYTDN5Lg9yrRbCyUvRxidZICMdR9wKoKcaQDj_JQM=w2116",
    "https://lh3.googleusercontent.com/P5uOMZoyiyhWGswqWupz6_syLO4RiiGmvqnXpl7p7LZz16RvA3QnNr0Z6UbCm1lmS1upnJheHmhnAfKD=w2116",
  ];

  return (
    <section id="sobre" className="relative py-28 px-5 sm:px-8 border-y border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texto */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-[10px] uppercase tracking-[0.35em] text-secondary font-bold mb-5">
              <Music2 className="w-3 h-3" /> Nossa história
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-foreground mb-8">
              O Melhor Samba de São Paulo,{" "}
              <span className="text-gradient-sun italic">Abençoado</span> por Todos os Santos
            </h2>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Não é à toa que o <strong className="text-foreground">Templo – Bar de Fé</strong>{" "}
                figura sempre nas listas das principais revistas e guias culturais como o melhor
                samba de São Paulo. Mais do que um espaço para curtir grandes nomes da música e o
                bom pagode de roda, nós entregamos a verdadeira alma da noite paulistana, unindo
                alegria, tradição e uma atmosfera que você não encontra em nenhum outro lugar.
              </p>
              <p>
                O nosso maior diferencial vai além do palco: somos a única casa abençoada por todos
                os santos. Aqui, as boas energias, a devoção e a vibração contagiante do público se
                encontram em um ambiente sagrado e acolhedor, criando uma experiência única de fé e
                festa.
              </p>
              <p className="text-secondary font-semibold">
                Sinta a energia. Viva o verdadeiro samba. Bem-vindo ao seu Templo!
              </p>
            </div>
          </div>

          {/* Carrossel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border/60 shadow-deep" ref={emblaRef}>
              <div className="flex">
                {fotos.map((foto, i) => (
                  <div
                    key={i}
                    className="flex-[0_0_100%] min-w-0"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={foto}
                        alt={`Foto do Templo Bar de Fé ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-sunset hover:text-primary-foreground hover:border-transparent transition-all disabled:opacity-30"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {fotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className="w-2 h-2 rounded-full bg-muted-foreground/40 hover:bg-secondary transition-colors"
                    aria-label={`Ir para foto ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScrollNext}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-sunset hover:text-primary-foreground hover:border-transparent transition-all disabled:opacity-30"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- LOCALIZAÇÃO ---------------- */
function Localizacao() {
  return (
    <section
      id="localizacao"
      className="relative py-28 px-5 sm:px-8 border-y border-border/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-[10px] uppercase tracking-[0.35em] text-secondary font-bold mb-5">
            <MapPin className="w-3 h-3" /> Onde estamos
          </div>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9] text-gradient-sun italic">
            #vemtemplar
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          <div className="lg:col-span-2 rounded-3xl bg-card-glass border border-border p-8 shadow-deep flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-sunset shadow-glow flex items-center justify-center mb-8 rotate-3">
                <MapPin className="w-7 h-7 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-4xl text-foreground mb-5 leading-tight">
                Endereço
              </h3>
              <address className="not-italic text-muted-foreground space-y-1.5 text-lg leading-relaxed">
                <div className="text-foreground font-bold text-xl">Rua Guaimbé, 322</div>
                <div>Alto da Mooca</div>
                <div>São Paulo – SP</div>
                <div className="text-sm text-muted-foreground/80 pt-1">CEP 03118-030</div>
              </address>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Rua+Guaimbé,+322,+Alto+da+Mooca,+São+Paulo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-secondary text-secondary-foreground font-bold uppercase tracking-[0.15em] text-xs hover:bg-primary hover:text-primary-foreground transition-all shadow-sun"
              >
                <MapPin className="w-4 h-4" /> Traçar rota
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-secondary/60 text-secondary font-bold uppercase tracking-[0.15em] text-xs hover:bg-secondary hover:text-secondary-foreground transition-all"
              >
                Fale conosco
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-border shadow-deep min-h-[450px] relative">
            <iframe
              title="Mapa Templo Bar de Fé"
              src="https://www.google.com/maps?q=Rua+Guaimbé,+322,+Alto+da+Mooca,+São+Paulo,+SP,+03118-030&output=embed"
              className="w-full h-full min-h-[450px] border-0 grayscale-[0.2] contrast-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHATSAPP ICON ---------------- */
const WaIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer id="contato" className="relative pt-20 pb-32 px-5 sm:px-8 bg-background/60">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <div className="mb-5">
            <img
              src={logoTemplo}
              alt="Templo Bar de Fé"
              className="h-20 w-auto object-contain"
            />
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            A casa que pulsa samba no coração da Mooca. Pagode, roda de samba e a melhor
            energia paulistana.
          </p>
        </div>
        <div>
          <h4 className="font-display text-xl text-secondary mb-5 tracking-tight uppercase">
            Navegue
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="#topo"
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                Início
              </a>
            </li>
            <li>
              <a
                href="#programacao"
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                Programação
              </a>
            </li>
            <li>
              <a
                href="#localizacao"
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                Localização
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xl text-secondary mb-5 tracking-tight uppercase">
            Siga o Templo
          </h4>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/bartemplo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-sunset hover:border-transparent hover:text-primary-foreground transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/bartemplo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-sunset hover:border-transparent hover:text-primary-foreground transition-all"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="http://youtube.com/bartemplo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-sunset hover:border-transparent hover:text-primary-foreground transition-all"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Templo Bar de Fé. Todos os direitos reservados.
      </div>
    </footer>
  );
}

/* ---------------- WHATSAPP FLOAT ---------------- */
function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
      <span className="relative w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
        <WaIcon className="w-8 h-8" />
      </span>
    </a>
  );
}

/* ---------------- PAGE ---------------- */
function HomePage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <Programacao />
      <SobreTemplo />
      <Localizacao />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
