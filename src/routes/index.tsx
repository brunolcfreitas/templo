import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Instagram, Facebook, Music, Sparkles, Ticket } from "lucide-react";
import { fetchEvents, formatDatePt, type ShowEvent } from "@/lib/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Templo Bar de Fé — O Melhor Samba de São Paulo" },
      { name: "description", content: "Programação de shows ao vivo no Templo Bar de Fé, Alto da Mooca. Pagode, samba e a melhor energia de SP." },
      { property: "og:title", content: "Templo Bar de Fé — O Melhor Samba de SP" },
      { property: "og:description", content: "Confira a programação e garanta seu lugar no melhor samba paulistano." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const WHATSAPP_URL = "https://wa.me/5511949861693?text=" + encodeURIComponent("Olá! Quero saber mais sobre o Templo Bar de Fé.");

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-card-deep" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#topo" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-hero-gradient flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Music className="w-5 h-5 text-background" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wider text-gradient-gold">TEMPLO</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Bar de Fé</div>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-semibold">
          <a href="#programacao" className="hover:text-secondary transition-colors">Programação</a>
          <a href="#localizacao" className="hover:text-secondary transition-colors">Localização</a>
          <a href="#contato" className="hover:text-secondary transition-colors">Contato</a>
        </div>
        <a href="#programacao" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105 shadow-glow">
          <Ticket className="w-4 h-4" /> Garanta seu lugar
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="topo" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src="https://www.youtube.com/embed/pqPDUrRTl7A?autoplay=1&mute=1&loop=1&playlist=pqPDUrRTl7A&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0"
          title="Templo Bar de Fé"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-sm mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold">Alto da Mooca • São Paulo</span>
        </div>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] mb-6">
          <span className="block text-foreground">O MELHOR</span>
          <span className="block text-gradient-gold">SAMBA</span>
          <span className="block text-foreground">DE SÃO PAULO</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
          Pagode, samba de raiz e a energia que move a noite paulistana.
          Bem-vindo ao <span className="text-secondary font-semibold">Templo — Bar de Fé</span>.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#programacao" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-hero-gradient text-background font-bold uppercase tracking-wider shadow-glow hover:scale-105 transition-transform animate-pulse-glow">
            <Ticket className="w-5 h-5" />
            Ver programação
          </a>
          <a href="#localizacao" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-secondary text-secondary font-bold uppercase tracking-wider hover:bg-secondary hover:text-secondary-foreground transition-all">
            <MapPin className="w-5 h-5" />
            Como chegar
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-secondary/60 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-secondary" />
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: ShowEvent }) {
  const hasPromo = event.promocao && event.promocao.trim() !== "";
  const fallbackImg = "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80";
  return (
    <article className={`group relative rounded-2xl overflow-hidden bg-card-gradient border border-border shadow-card-deep hover:shadow-glow transition-all duration-500 hover:-translate-y-2 ${hasPromo ? "ring-2 ring-secondary/60" : ""}`}>
      {hasPromo && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-widest shadow-lg">
          🔥 Promoção
        </div>
      )}
      <div className="aspect-square w-full overflow-hidden bg-muted relative">
        <img
          src={event.foto && event.foto.trim() !== "" ? event.foto : fallbackImg}
          alt={event.artista}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImg; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs uppercase tracking-wider font-bold">
          <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground flex items-center gap-1.5">
            <Calendar className="w-3 h-3" /> {formatDatePt(event.dateObj, event.data)}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-foreground flex items-center gap-1.5">
            <Clock className="w-3 h-3" /> {event.horario}
          </span>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <h3 className="font-display text-2xl leading-tight text-foreground group-hover:text-secondary transition-colors">
          {event.artista}
        </h3>
        {(event.entradaMasculina || event.entradaFeminina) && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {event.entradaMasculina && (
              <div className="rounded-lg bg-muted/60 px-3 py-2">
                <div className="text-muted-foreground uppercase tracking-wider text-[10px]">Masc.</div>
                <div className="font-semibold text-foreground">{event.entradaMasculina}</div>
              </div>
            )}
            {event.entradaFeminina && (
              <div className="rounded-lg bg-muted/60 px-3 py-2">
                <div className="text-muted-foreground uppercase tracking-wider text-[10px]">Fem.</div>
                <div className="font-semibold text-foreground">{event.entradaFeminina}</div>
              </div>
            )}
          </div>
        )}
        {hasPromo && (
          <div className="rounded-lg bg-secondary/15 border border-secondary/30 px-3 py-2 text-sm text-secondary font-medium">
            ✨ {event.promocao}
          </div>
        )}
        <a
          href={event.link && event.link.trim() !== "" ? event.link : WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-hero-gradient text-background font-bold uppercase tracking-wider text-sm hover:scale-[1.02] transition-transform shadow-glow"
        >
          <Ticket className="w-4 h-4" />
          Garanta seu lugar!
        </a>
      </div>
    </article>
  );
}

function Programacao() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section id="programacao" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4">
            Próximos Shows
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-gradient-gold mb-4">PROGRAMAÇÃO</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Atualizada toda semana. Confira quem sobe ao palco do Templo e garanta sua presença.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-card-gradient border border-border overflow-hidden animate-pulse">
                <div className="aspect-square bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16 text-muted-foreground">
            <p>Não foi possível carregar a programação no momento.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-secondary underline mt-2 inline-block">
              Fale conosco no WhatsApp
            </a>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p>Nenhum show agendado no momento. Volte em breve!</p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((event, i) => <EventCard key={`${event.data}-${event.artista}-${i}`} event={event} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function Localizacao() {
  return (
    <section id="localizacao" className="relative py-24 px-6 bg-gradient-to-b from-transparent via-card/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4">
            Onde estamos
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-gradient-gold mb-4">LOCALIZAÇÃO</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-2 rounded-2xl bg-card-gradient border border-border p-8 shadow-card-deep flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-hero-gradient flex items-center justify-center shadow-glow mb-6">
                <MapPin className="w-7 h-7 text-background" />
              </div>
              <h3 className="font-display text-3xl text-foreground mb-4">VENHA NOS VISITAR</h3>
              <address className="not-italic text-muted-foreground space-y-1 text-lg leading-relaxed">
                <div className="text-foreground font-semibold">Rua Guaimbé, 322</div>
                <div>Alto da Mooca</div>
                <div>São Paulo – SP</div>
                <div>CEP: 03118-030</div>
              </address>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Rua+Guaimbé,+322,+Alto+da+Mooca,+São+Paulo"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs hover:bg-accent hover:text-accent-foreground transition-all shadow-glow"
              >
                <MapPin className="w-4 h-4" /> Traçar rota
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-secondary text-secondary font-bold uppercase tracking-wider text-xs hover:bg-secondary hover:text-secondary-foreground transition-all"
              >
                Fale conosco
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-border shadow-card-deep min-h-[400px]">
            <iframe
              title="Mapa Templo Bar de Fé"
              src="https://www.google.com/maps?q=Rua+Guaimbé,+322,+Alto+da+Mooca,+São+Paulo,+SP,+03118-030&output=embed"
              className="w-full h-full min-h-[400px] border-0"
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

const waSvg = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);

function Footer() {
  return (
    <footer id="contato" className="relative pt-20 pb-32 px-6 border-t border-border bg-background/60">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-hero-gradient flex items-center justify-center shadow-glow">
              <Music className="w-6 h-6 text-background" />
            </div>
            <div>
              <div className="font-display text-2xl text-gradient-gold tracking-wider">TEMPLO</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Bar de Fé</div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A casa que pulsa samba no coração da Mooca. Pagode, roda de samba e a melhor energia paulistana.
          </p>
        </div>
        <div>
          <h4 className="font-display text-xl text-secondary mb-4 tracking-wider">NAVEGUE</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#topo" className="text-muted-foreground hover:text-secondary transition-colors">Início</a></li>
            <li><a href="#programacao" className="text-muted-foreground hover:text-secondary transition-colors">Programação</a></li>
            <li><a href="#localizacao" className="text-muted-foreground hover:text-secondary transition-colors">Localização</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xl text-secondary mb-4 tracking-wider">SIGA O TEMPLO</h4>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/templobardefe" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-hero-gradient hover:border-transparent transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/templobardefe" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-hero-gradient hover:border-transparent transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-hero-gradient hover:border-transparent transition-all">
              {waSvg}
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">+55 11 94986-1693</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Templo Bar de Fé. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse-glow"
    >
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

function HomePage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Programacao />
      <Localizacao />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
