import { createFileRoute } from "@tanstack/react-router";
import pareja from "@/assets/jason-lucia-pareja.png";
import jason from "@/assets/polo-jason.jpeg";
import lucia from "@/assets/polo-lucia.jpeg";
import leonida from "@/assets/leonida.jpg";
import blanco from "@/assets/polo_blanco.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Games Clothes | Viste el mejor skin de GTA VI" },
      { name: "description", content: "Polos inspirados en GTA VI: combo pareja Jason & Lucia y diseños exclusivos de Leonida y Vice City." },
      { property: "og:title", content: "Games Clothes | Viste el mejor skin de GTA VI" },
      { property: "og:description", content: "Combo pareja Jason & Lucia y polos de Leonida. Lanzamiento 19 de noviembre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#pareja", label: "Pareja" },
  { href: "#individuales", label: "Individuales" },
  { href: "#contacto", label: "Contacto" },
];

const individuales = [
  { img: leonida, name: "Leonida Surf", desc: "Polo negro · Manatí surfer", price: "S/ 59" },
  { img: blanco, name: "Vice City Leonida", desc: "Polo blanco · Gator cocktail", price: "S/ 59" },
];

function Logo() {
  return (
    <a href="#top" className="font-display text-3xl leading-none tracking-tight text-vice" aria-label="Games Clothes">
      GC
    </a>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="flex gap-6 text-sm font-semibold uppercase tracking-widest">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-muted-foreground transition-colors hover:text-primary">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <iframe
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube-nocookie.com/embed/QdBZY2fkU-0?autoplay=1&mute=1&loop=1&playlist=QdBZY2fkU-0&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0"
            title="GTA VI trailer"
            allow="autoplay; encrypted-media"
          />
        </div>
        <div className="absolute inset-0 bg-sunset-fade" />
        <div className="relative z-10 px-6 text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-accent">19 · Noviembre · 2026</p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] md:text-8xl">
            Vive la mejor experiencia
            <br />
            del <span className="text-vice">GTA VI</span>
            <br />
            con el mejor <span className="text-vice">skin</span>
          </h1>
          <a href="#pareja" className="mt-10 inline-block rounded-sm bg-vice px-8 py-4 font-display text-lg uppercase tracking-widest text-primary-foreground shadow-glow transition-transform hover:scale-105">
            Ver colección
          </a>
        </div>
        <a href="#pareja" aria-label="Bajar" className="absolute bottom-8 z-10 animate-bounce text-3xl text-primary">▼</a>
      </section>

      <section id="pareja" className="mx-auto max-w-7xl px-6 py-28">
        <SectionTitle kicker="Jason & Lucia" title="Combo Pareja" />
        <div className="grid items-stretch gap-10 md:grid-cols-2">
          <figure className="group overflow-hidden rounded-md border border-border bg-card">
            <img src={pareja} alt="Jason y Lucia con los polos del combo" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </figure>
          <div className="grid gap-6 sm:grid-cols-2">
            {[{ img: jason, n: "Polo Jason" }, { img: lucia, n: "Polo Lucia" }].map((p) => (
              <figure key={p.n} className="group overflow-hidden rounded-md border border-border bg-card">
                <img src={p.img} alt={p.n} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <figcaption className="p-4 font-display text-xl uppercase">{p.n}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-3xl rounded-md border border-border bg-card p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-accent">Bonnie & Clyde edition</p>
          <h3 className="mt-3 font-display text-4xl uppercase">Ellos dos. <span className="text-vice">Tú y yo.</span></h3>
          <p className="mt-4 text-muted-foreground">Dos polos inspirados en los protagonistas de GTA VI. Ideal para el día del lanzamiento.</p>
          <p className="mt-6 font-display text-5xl">S/ 109</p>
          <a href="#contacto" className="mt-6 inline-block rounded-sm bg-vice px-10 py-4 font-display uppercase tracking-widest text-primary-foreground shadow-glow">Solicitar combo</a>
        </div>
      </section>

      <section id="individuales" className="mx-auto max-w-7xl px-6 py-28">
        <SectionTitle kicker="Welcome to Leonida" title="Individuales" />
        <div className="grid gap-10 sm:grid-cols-2">
          {individuales.map((p) => (
            <article key={p.name} className="group overflow-hidden rounded-md border border-border bg-card">
              <img src={p.img} alt={p.name} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="font-display text-2xl uppercase">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <p className="mt-2 font-display text-2xl text-vice">{p.price}</p>
                </div>
                <a href="#contacto" className="rounded-sm border border-primary px-6 py-3 font-display uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Solicitar</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer id="contacto" className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">Games Clothes. Ropa para gamers que viven el juego también fuera de la pantalla.</p>
          </div>
          <div>
            <h4 className="font-display uppercase tracking-widest text-accent">Menú</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((n) => (<li key={n.href}><a href={n.href} className="text-muted-foreground hover:text-primary">{n.label}</a></li>))}
            </ul>
          </div>
          <div>
            <h4 className="font-display uppercase tracking-widest text-accent">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>WhatsApp: +51 999 999 999</li>
              <li>ventas@gamesclothes.pe</li>
              <li>Lima, Perú</li>
              <li className="flex gap-4 pt-2"><a href="#" className="hover:text-primary">Instagram</a><a href="#" className="hover:text-primary">TikTok</a><a href="#" className="hover:text-primary">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © 2026 Games Clothes. Producto de fans, no afiliado a Rockstar Games.
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-14 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">{kicker}</p>
      <h2 className="mt-3 font-display text-5xl uppercase md:text-7xl">{title}</h2>
      <div className="mx-auto mt-6 h-1 w-24 bg-vice" />
    </div>
  );
}
