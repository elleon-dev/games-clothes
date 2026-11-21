import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import pareja from "@/assets/jason-lucia-pareja.png";
import jason from "@/assets/polo-jason.jpeg";
import lucia from "@/assets/polo-lucia.jpeg";
import poloNegro from "@/assets/polonegro.png";
import poloBlanco from "@/assets/poloblanco.png";
import viceCityNegro from "@/assets/polo_negro.png";
import blanco from "@/assets/polo_blanco.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Games Clothes | Viste el mejor skin de GTA VI" },
      {
        name: "description",
        content:
          "Compra polos inspirados en GTA VI en Perú. Diseños Leonida y Vice City, tallas S a XL, combo para pareja y pedidos por WhatsApp.",
      },
      {
        name: "keywords",
        content:
          "polos GTA VI, ropa gamer Perú, polos Leonida, polos Vice City, Games Clothes",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#241026" },
      { name: "application-name", content: "Games Clothes" },
      {
        property: "og:title",
        content: "Games Clothes | Viste el mejor skin de GTA VI",
      },
      {
        property: "og:description",
        content:
          "Polos inspirados en GTA VI con tallas S a XL. Compra individual o el combo Jason & Lucia.",
      },
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

type ColorVariant = "Blanco" | "Negro";

type IndividualProduct = {
  img: string;
  name: string;
  desc: string;
  price: string;
  hasColorVariants?: boolean;
  colorImages?: Record<ColorVariant, string>;
};

const individuales: IndividualProduct[] = [
  {
    img: jason,
    name: "Polo Jason",
    desc: "Polo inspirado en Jason, protagonista de GTA VI",
    price: "S/ 99",
  },
  {
    img: lucia,
    name: "Polo Lucia",
    desc: "Polo inspirado en Lucia, protagonista de GTA VI",
    price: "S/ 99",
  },
  {
    img: poloNegro,
    name: "Leonida Surf",
    desc: "Polo negro · Manatí surfer",
    price: "S/ 99",
    hasColorVariants: true,
    colorImages: { Blanco: poloBlanco, Negro: poloNegro },
  },
  {
    img: blanco,
    name: "Vice City Leonida",
    desc: "Polo blanco · Gator cocktail",
    price: "S/ 99",
    hasColorVariants: true,
    colorImages: { Blanco: blanco, Negro: viceCityNegro },
  },
];

type OrderProduct = {
  name: string;
  price: string;
  isCombo?: boolean;
  size?: string;
  color?: string;
  jasonSize?: string;
  luciaSize?: string;
};

const sizes = ["S", "M", "X", "XL"];
const whatsappNumber = "51972332824";
const colorOptions: Array<{ label: ColorVariant; className: string }> = [
  { label: "Blanco", className: "border-border bg-white text-black" },
  { label: "Negro", className: "border-white/30 bg-black text-white" },
];

function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  const headerHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 0;

  if (section) {
    const position =
      window.scrollY + section.getBoundingClientRect().top - headerHeight;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: Math.max(0, position),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }
}

function Logo() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection("top")}
      className="font-display text-3xl leading-none tracking-tight text-vice"
      aria-label="Volver al inicio"
    >
      GC
    </button>
  );
}

function LaunchCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const launchTime = new Date("2026-11-19T00:00:00-05:00").getTime();
    const updateCountdown = () =>
      setRemaining(Math.max(0, launchTime - Date.now()));

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (remaining === null || remaining === 0) return null;

  const totalSeconds = Math.floor(remaining / 1000);
  const units = [
    { label: "Días", value: Math.floor(totalSeconds / 86_400) },
    { label: "Horas", value: Math.floor((totalSeconds % 86_400) / 3_600) },
    { label: "Min", value: Math.floor((totalSeconds % 3_600) / 60) },
    { label: "Seg", value: totalSeconds % 60 },
  ];

  return (
    <div
      className="mt-8"
      aria-label="Cuenta regresiva para el lanzamiento del 19 de noviembre a medianoche"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
        Lanzamiento en
      </p>
      <div
        className="mx-auto mt-3 flex max-w-sm justify-center gap-2"
        aria-hidden="true"
      >
        {units.map((unit) => (
          <div
            key={unit.label}
            className="min-w-14 rounded-sm border border-primary/40 bg-background/70 px-2 py-2 text-center backdrop-blur"
          >
            <p className="font-display text-2xl leading-none text-primary">
              {String(unit.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const [selectedProduct, setSelectedProduct] = useState<OrderProduct | null>(
    null,
  );
  const [individualSizes, setIndividualSizes] = useState<
    Record<string, string>
  >({
    "Polo Jason": "M",
    "Polo Lucia": "M",
    "Leonida Surf": "M",
    "Vice City Leonida": "M",
  });
  const [individualColors, setIndividualColors] = useState<
    Record<string, ColorVariant>
  >({
    "Leonida Surf": "Blanco",
    "Vice City Leonida": "Negro",
  });
  const [jasonSize, setJasonSize] = useState("M");
  const [luciaSize, setLuciaSize] = useState("M");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <nav
            aria-label="Navegación principal"
            className="hidden gap-6 font-display text-base uppercase tracking-[0.12em] md:flex"
          >
            {nav.map((n) => (
              <button
                key={n.href}
                type="button"
                onClick={() => scrollToSection(n.href.slice(1))}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            className="rounded-sm p-2 text-primary md:hidden"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Navegación móvil"
            className="border-t border-border bg-card px-6 py-4 md:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2 font-display text-xl uppercase tracking-[0.12em]">
              {nav.map((n) => (
                <button
                  key={n.href}
                  type="button"
                  onClick={() => {
                    scrollToSection(n.href.slice(1));
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-sm px-3 py-3 text-left text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </nav>
        )}
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
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-accent">
            19 · Noviembre · 2026
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] md:text-8xl">
            Vive la mejor experiencia
            <br />
            del <span className="text-vice">GTA VI</span>
            <br />
            con el mejor <span className="text-vice">skin</span>
          </h1>
          <LaunchCountdown />
          <button
            type="button"
            onClick={() => scrollToSection("pareja")}
            className="mt-10 inline-block rounded-sm bg-vice px-8 py-4 font-display text-lg uppercase tracking-widest text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Ver colección
          </button>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection("pareja")}
          aria-label="Ir a la sección Combo Pareja"
          className="absolute bottom-8 z-10 animate-bounce text-3xl text-primary"
        >
          ▼
        </button>
      </section>

      <main>
        <section
          id="pareja"
          className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28"
          aria-labelledby="pareja-title"
        >
          <SectionTitle
            id="pareja-title"
            kicker="Jason & Lucia"
            title="Combo Pareja"
          />
          <div className="grid items-stretch gap-10 md:grid-cols-2">
            <figure className="group overflow-hidden rounded-md border border-border bg-card">
              <img
                src={pareja}
                alt="Jason y Lucia con los polos del combo"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </figure>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { img: jason, n: "Polo Jason" },
                { img: lucia, n: "Polo Lucia" },
              ].map((p) => (
                <figure
                  key={p.n}
                  className="group overflow-hidden rounded-md border border-border bg-card"
                >
                  <img
                    src={p.img}
                    alt={p.n}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="p-4">
                    <p className="font-display text-xl uppercase">{p.n}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Tallas: S · M · L · XL
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-md border border-border bg-card p-8 text-center">
            <p className="text-sm uppercase tracking-widest text-accent">
              Bonnie & Clyde edition
            </p>
            <h3 className="mt-3 font-display text-4xl uppercase">
              Ellos dos. <span className="text-vice">Tú y yo.</span>
            </h3>
            <p className="mt-4 text-muted-foreground">
              Dos polos inspirados en los protagonistas de GTA VI. Ideal para el
              día del lanzamiento.
            </p>
            <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
              <CardSizePicker
                label="Talla Jason"
                value={jasonSize}
                onChange={setJasonSize}
              />
              <CardSizePicker
                label="Talla Lucia"
                value={luciaSize}
                onChange={setLuciaSize}
              />
            </div>
            <p className="mt-6 font-display text-5xl">S/ 179</p>
            <button
              type="button"
              onClick={() =>
                setSelectedProduct({
                  name: "Combo Pareja Jason & Lucia",
                  price: "S/ 179",
                  isCombo: true,
                  jasonSize,
                  luciaSize,
                })
              }
              className="mt-6 inline-block rounded-sm bg-vice px-10 py-4 font-display uppercase tracking-widest text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Solicitar combo
            </button>
          </div>
        </section>

        <section
          id="individuales"
          className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28"
          aria-labelledby="individuales-title"
        >
          <SectionTitle
            id="individuales-title"
            kicker="Welcome to Leonida"
            title="Individuales"
          />
          <div className="grid gap-10 sm:grid-cols-2">
            {individuales.map((p) => {
              const selectedColor = individualColors[p.name] ?? "Negro";
              const selectedImage = p.colorImages?.[selectedColor] ?? p.img;

              return (
                <article
                  key={p.name}
                  className="group overflow-hidden rounded-md border border-border bg-card"
                >
                  <img
                    src={selectedImage}
                    alt={`${p.name} · color ${selectedColor}`}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="w-full">
                      <h3 className="font-display text-2xl uppercase">
                        {p.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{p.desc}</p>
                      <div className="mt-4">
                        {p.hasColorVariants && (
                          <ColorPicker
                            value={selectedColor}
                            onChange={(color) =>
                              setIndividualColors((current) => ({
                                ...current,
                                [p.name]: color,
                              }))
                            }
                          />
                        )}
                        <CardSizePicker
                          label="Elige tu talla"
                          value={individualSizes[p.name] ?? "M"}
                          onChange={(size) =>
                            setIndividualSizes((current) => ({
                              ...current,
                              [p.name]: size,
                            }))
                          }
                        />
                      </div>
                      <p className="mt-2 font-display text-2xl text-vice">
                        {p.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProduct({
                          name: p.name,
                          price: p.price,
                          size: individualSizes[p.name] ?? "M",
                          ...(p.hasColorVariants
                            ? { color: selectedColor }
                            : {}),
                        })
                      }
                      className="w-full rounded-sm border border-primary px-6 py-3 font-display uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
                    >
                      Solicitar
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer
        id="contacto"
        className="scroll-mt-24 border-t border-border bg-card"
        aria-label="Contacto"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Games Clothes. Ropa para gamers que viven el juego también fuera
              de la pantalla.
            </p>
          </div>
          <div>
            <h4 className="font-display uppercase tracking-widest text-accent">
              Menú
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(n.href.slice(1))}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display uppercase tracking-widest text-accent">
              Contacto
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>WhatsApp: +51 972 332 824</li>
              <li>Yape: +51 972 332 824</li>
              <li>Envios a todo el Perú</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © 2026 Games Clothes. Producto de Fans.
          <span className="mt-1 block opacity-70">
            No estamos afiliados, patrocinados ni respaldados por Take-Two
            Interactive ni Rockstar Games.
          </span>
        </div>
      </footer>
      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

function OrderModal({
  product,
  onClose,
}: {
  product: OrderProduct;
  onClose: () => void;
}) {
  const detail = product.isCombo
    ? `Tallas: Jason ${product.jasonSize}, Lucia ${product.luciaSize}`
    : `Talla: ${product.size}`;
  const colorDetail = product.color ? `\nColor: ${product.color}` : "";
  const message = encodeURIComponent(
    `Hola, quiero solicitar: ${product.name}\nPrecio: ${product.price}${colorDetail}\n${detail}\n\nPagaré por Yape al +51 972 332 824.`,
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-title"
      aria-describedby="order-description"
      onMouseDown={onClose}
    >
      <div
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-md border border-border bg-card p-6 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
          aria-label="Cerrar"
        >
          <X size={22} />
        </button>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Tu pedido
        </p>
        <h2
          id="order-title"
          className="mt-2 pr-10 font-display text-3xl uppercase"
        >
          {product.name}
        </h2>
        <p className="mt-2 font-display text-3xl text-vice">{product.price}</p>

        <div className="mt-6 rounded-sm border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Talla seleccionada
          </p>
          <p className="mt-2 font-display text-xl uppercase">{detail}</p>
          {product.color && (
            <p className="mt-2 text-sm text-muted-foreground">
              Color: {product.color}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-sm border border-accent/40 bg-background p-4">
          <p className="font-display text-lg uppercase text-accent">
            Pago por Yape
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pedidos abiertos en cualquier fecha. Coordinamos la entrega por
            WhatsApp.
          </p>
          <p
            id="order-description"
            className="mt-3 text-sm text-muted-foreground"
          >
            Realiza el pago al siguiente número y envía la constancia por
            WhatsApp.
          </p>
          <div className="mx-auto mt-4 h-56 w-56 overflow-hidden rounded-md bg-white p-1">
            <img
              src="/qryape.png"
              alt="Código QR de Yape para pagar a Noel Moriano Quispe"
              className="h-full w-full scale-150 object-cover object-center"
            />
          </div>
          <p className="mt-3 text-center text-sm font-semibold">
            Noel Moriano Quispe
          </p>
          <p className="mt-3 font-display text-2xl tracking-wide">
            +51 972 332 824
          </p>
        </div>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-vice px-6 py-4 font-display uppercase tracking-widest text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
        >
          <FaWhatsapp size={22} aria-hidden="true" /> Enviar pedido por WhatsApp
        </a>
      </div>
    </div>
  );
}

function ColorPicker({
  value,
  onChange,
}: {
  value: ColorVariant;
  onChange: (color: ColorVariant) => void;
}) {
  return (
    <fieldset className="mb-4">
      <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Elige color
      </legend>
      <div className="flex gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.label}
            type="button"
            onClick={() => onChange(color.label)}
            className={`rounded-sm border px-3 py-1.5 text-sm font-semibold transition-transform ${color.className} ${value === color.label ? "ring-2 ring-vice ring-offset-2 ring-offset-card" : "opacity-65 hover:opacity-100"}`}
            aria-pressed={value === color.label}
          >
            {color.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function CardSizePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (size: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            className={`rounded-sm border px-2 py-1.5 font-display text-base transition-colors ${value === size ? "border-vice bg-vice text-primary-foreground" : "border-border hover:border-primary"}`}
            aria-pressed={value === size}
          >
            {size}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function SectionTitle({
  id,
  kicker,
  title,
}: {
  id: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-14 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">
        {kicker}
      </p>
      <h2 id={id} className="mt-3 font-display text-5xl uppercase md:text-7xl">
        {title}
      </h2>
      <div className="mx-auto mt-6 h-1 w-24 bg-vice" />
    </div>
  );
}
