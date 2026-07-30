import "@fontsource/geist-mono/latin-600.css";

/* Coverage in a Click — interactions
   Calm UI, light at the meaningful moments. Progressive enhancement only. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Partner shops: render the GreenTec Auto network + client-side filter.
   Addresses sourced from greentecauto.com/locations. */
const SHOP_STATES = {
  GA: "georgia", TX: "texas", MA: "massachusetts", NC: "north carolina",
  IL: "illinois", OH: "ohio", FL: "florida", CO: "colorado", MI: "michigan",
  KS: "kansas", NV: "nevada", NJ: "new jersey", CA: "california", WI: "wisconsin",
  MN: "minnesota", TN: "tennessee", OK: "oklahoma", PA: "pennsylvania",
  AZ: "arizona", OR: "oregon", UT: "utah", WA: "washington", MD: "maryland",
  BC: "british columbia",
};
const SHOPS = [
  { city: "Atlanta", state: "GA", address: "6594 GA-42, Rex, GA 30273" },
  { city: "Austin", state: "TX", address: "7696 183A #2B, Leander, TX 78641" },
  { city: "Bay Area", state: "CA", address: "988 Rufus Ct, Hayward, CA 94541" },
  { city: "Boston", state: "MA", address: "14 Perry Dr Unit D, Foxborough, MA 02035" },
  { city: "Bowie", state: "MD", address: "5711 Woodcliff Rd, Unit #102, Bowie, MD 20720" },
  { city: "Charlotte", state: "NC", address: "5980 Grand National Ln SW, Concord, NC 28027" },
  { city: "Chicago", state: "IL", address: "71 Sangra Court, Streamwood, IL 60107" },
  { city: "Cincinnati", state: "OH", address: "4820 Interstate Dr, West Chester Township, OH 45246" },
  { city: "Cleveland", state: "OH", address: "790 Ken Mar Industrial Pkwy, Broadview Heights, OH 44147" },
  { city: "Dallas", state: "TX", address: "13659 Jupiter Rd, Suite #205, Dallas, TX 75238" },
  { city: "Deerfield Beach", state: "FL", address: "3492 SW 15th St, Deerfield Beach, FL 33442" },
  { city: "Denver", state: "CO", address: "5454 Washington St Unit 4, Denver, CO 80216" },
  { city: "Detroit", state: "MI", address: "1888 Thunderbird St, Troy, MI 48084" },
  { city: "Houston", state: "TX", address: "5750 N Sam Houston Parkway East, Suite 112, Houston, TX 77032" },
  { city: "Jacksonville", state: "FL", address: "7540 103rd St Unit 215/216, Jacksonville, FL 32210" },
  { city: "Kansas City", state: "KS", address: "2930 S 44th St, Kansas City, KS 66106" },
  { city: "Las Vegas", state: "NV", address: "1967 Whitney Mesa Dr, Henderson, NV 89014" },
  { city: "Livingston", state: "NJ", address: "7 Industrial Pkwy Unit 11, Livingston, NJ 07039" },
  { city: "Los Angeles", state: "CA", address: "464 S Cataract Ave. Unit A, San Dimas, CA 91773" },
  { city: "Milwaukee", state: "WI", address: "9055 N 51st St B, Brown Deer, WI 53223" },
  { city: "Minneapolis", state: "MN", address: "407 W 60th Street, Suite 411, Minneapolis, MN 55419" },
  { city: "Nashville", state: "TN", address: "1109 Darbytown Dr, Nashville, TN 37207" },
  { city: "Oklahoma City", state: "OK", address: "4201 SW 29th St, Oklahoma City, OK 73108" },
  { city: "Orange County", state: "CA", address: "6348 Industry Way, Westminster, CA 92683" },
  { city: "Orlando", state: "FL", address: "207 Reece Way STE 1601, Casselberry, FL 32707" },
  { city: "Philadelphia", state: "PA", address: "2014 Ford Rd # M, Newportville, PA 19056" },
  { city: "Phoenix", state: "AZ", address: "2920 E Mohawk Ln STE 110, Phoenix, AZ 85050" },
  { city: "Portland", state: "OR", address: "8750 NE Emerson St, Portland, OR 97220" },
  { city: "Sacramento", state: "CA", address: "5437 Stationers Way, Sacramento, CA 95842" },
  { city: "Salt Lake City", state: "UT", address: "2411 Constitution Blvd Unit D, West Valley City, UT 84119" },
  { city: "San Antonio", state: "TX", address: "431 Isom Rd Suite 112, San Antonio, TX 78216" },
  { city: "San Diego", state: "CA", address: "4901 Morena Blvd, Suite 408, San Diego, CA 92117" },
  { city: "Seattle", state: "WA", address: "1721 W Valley Hwy N, Unit 8, Auburn, WA 98001" },
  { city: "Tampa", state: "FL", address: "1651 S Missouri Ave, Clearwater, FL 33756" },
  { city: "Vancouver", state: "BC", address: "1560 Booth Ave, Coquitlam, BC V3K 6V7" },
];

const shopsGrid = document.querySelector("[data-shops-grid]");
if (shopsGrid) {
  const searchInput = document.querySelector("[data-shop-search]");
  const emptyMsg = document.querySelector("[data-shops-empty]");
  const countEl = document.querySelector("[data-shops-count]");

  const arrow =
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>';

  SHOPS.forEach((shop) => {
    const label = shop.state ? `${shop.city}, ${shop.state}` : shop.city;
    const query = shop.address || `GreenTec Auto ${label}`;
    const tokens = [
      shop.city,
      shop.state || "",
      shop.state ? SHOP_STATES[shop.state] || "" : "",
      shop.address || "",
    ]
      .join(" ")
      .toLowerCase();

    const card = document.createElement("a");
    card.className = "shop-card";
    card.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.dataset.tokens = tokens;
    card.setAttribute(
      "aria-label",
      `${label}. ${shop.address}. Opens in Google Maps in a new tab.`
    );
    card.innerHTML =
      `<span class="shop-city">${label}</span>` +
      `<span class="shop-meta">${shop.address}${arrow}</span>`;
    shopsGrid.appendChild(card);
  });

  const cards = [...shopsGrid.querySelectorAll(".shop-card")];
  const setCount = (n) => {
    if (countEl) countEl.textContent = n === SHOPS.length ? `${n} shops` : `${n} of ${SHOPS.length}`;
  };
  setCount(SHOPS.length);

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      let shown = 0;
      cards.forEach((card) => {
        const match = !q || card.dataset.tokens.includes(q);
        card.hidden = !match;
        if (match) shown += 1;
      });
      setCount(shown);
      if (emptyMsg) emptyMsg.hidden = shown !== 0;
    });
  }
}

/* ---- Circular customer testimonials ------------------------------------ */
const circularTestimonials = document.querySelector("[data-circular-testimonials]");
if (circularTestimonials) {
  const cards = [...circularTestimonials.querySelectorAll("[data-index]")];
  const quote = circularTestimonials.querySelector("[data-testimonial-quote]");
  const name = circularTestimonials.querySelector("[data-testimonial-name]");
  const vehicle = circularTestimonials.querySelector("[data-testimonial-vehicle]");
  const previous = circularTestimonials.querySelector("[data-testimonial-prev]");
  const next = circularTestimonials.querySelector("[data-testimonial-next]");
  let activeIndex = 0;
  let timer;

  const renderTestimonial = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      const offset = (cardIndex - activeIndex + cards.length) % cards.length;
      card.classList.toggle("is-active", offset === 0);
      card.classList.toggle("is-previous", offset === cards.length - 1);
      card.classList.toggle("is-next", offset === 1);
      card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
    });
    const active = cards[activeIndex];
    quote.textContent = `“${active.dataset.quote}”`;
    name.textContent = active.dataset.name;
    vehicle.textContent = active.dataset.vehicle;
  };
  const restart = () => {
    window.clearInterval(timer);
    if (!reduceMotion) timer = window.setInterval(() => renderTestimonial(activeIndex + 1), 5000);
  };
  previous?.addEventListener("click", () => { renderTestimonial(activeIndex - 1); restart(); });
  next?.addEventListener("click", () => { renderTestimonial(activeIndex + 1); restart(); });
  circularTestimonials.addEventListener("mouseenter", () => window.clearInterval(timer));
  circularTestimonials.addEventListener("mouseleave", restart);
  circularTestimonials.addEventListener("focusin", () => window.clearInterval(timer));
  circularTestimonials.addEventListener("focusout", (event) => {
    if (!circularTestimonials.contains(event.relatedTarget)) restart();
  });
  renderTestimonial(0);
  restart();
}

/* ---- Hero video: play only while Get coverage is hovered/focused -------- */
const heroVideo = document.querySelector("[data-hero-video]");
const getCoverage = document.querySelector('[data-action="getCoverage"]');

if (heroVideo && getCoverage) {
  heroVideo.playbackRate = 2;

  const resetHeroVideo = () => {
    heroVideo.pause();
    try {
      heroVideo.currentTime = 0;
    } catch (_) {
      // Metadata may not have loaded yet; the poster remains visible.
    }
  };

  const playHeroVideo = () => {
    if (reduceMotion) return;
    const playback = heroVideo.play();
    if (playback && typeof playback.catch === "function") playback.catch(() => {});
  };

  resetHeroVideo();
  getCoverage.addEventListener("pointerenter", playHeroVideo);
  getCoverage.addEventListener("pointerleave", resetHeroVideo);
  getCoverage.addEventListener("focus", playHeroVideo);
  getCoverage.addEventListener("blur", resetHeroVideo);
}

/* ---- CTA video: fade in once the browser can actually play it (avoids a
   stalled poster on slow networks) and nudge .play() explicitly, since some
   browsers stall the first autoplay until a script call. */
document.querySelectorAll("[data-cta-video]").forEach((video) => {
  if (reduceMotion) return; // reduced-motion CSS also hides it; belt-and-braces
  const start = () => {
    video.classList.add("is-ready");
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => {}); // silently ignore autoplay policy rejections
  };
  if (video.readyState >= 3) start();
  else video.addEventListener("canplay", start, { once: true });
});

/* ---- Mobile nav ---------------------------------------------------------- */
const menuButton = document.querySelector("[data-menu-button]");
const navLinks = document.querySelector("[data-nav-links]");

if (menuButton && navLinks) {
  const navAnchors = [...navLinks.querySelectorAll("a")];
  const mobileNavQuery = window.matchMedia("(max-width: 899px)");
  const isMobileNav = () => mobileNavQuery.matches;

  const unlockDesktopNav = () => {
    navLinks.classList.remove("open");
    navLinks.inert = false;
    navLinks.removeAttribute("aria-hidden");
    navAnchors.forEach((link) => link.removeAttribute("tabindex"));
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  };

  const setOpen = (open, { restoreFocus = true } = {}) => {
    if (!isMobileNav()) {
      unlockDesktopNav();
      return;
    }
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navLinks.classList.toggle("open", open);
    if ("inert" in navLinks) {
      navLinks.inert = !open;
    } else {
      navLinks.setAttribute("aria-hidden", String(!open));
      navAnchors.forEach((link) => {
        if (open) link.removeAttribute("tabindex");
        else link.setAttribute("tabindex", "-1");
      });
    }
    if (!restoreFocus) return;
    if (open) navAnchors[0]?.focus();
    else menuButton.focus();
  };

  // Mobile starts closed; desktop stays interactive
  setOpen(false, { restoreFocus: false });

  menuButton.addEventListener("click", () => {
    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    setOpen(willOpen);
  });
  navAnchors.forEach((link) =>
    link.addEventListener("click", () => setOpen(false))
  );
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (menuButton.getAttribute("aria-expanded") !== "true") return;
    setOpen(false);
  });
  document.addEventListener("pointerdown", (event) => {
    if (menuButton.getAttribute("aria-expanded") !== "true") return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (navLinks.contains(target) || menuButton.contains(target)) return;
    setOpen(false, { restoreFocus: false });
  });
  const syncNavMode = () => setOpen(false, { restoreFocus: false });
  if (typeof mobileNavQuery.addEventListener === "function") {
    mobileNavQuery.addEventListener("change", syncNavMode);
  } else {
    mobileNavQuery.addListener(syncNavMode);
  }
}

/* ---- Sticky header state ------------------------------------------------- */
const header = document.querySelector("[data-header]");
if (header) {
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---- OEM logo ticker: wait for images, then run a gapless loop ---------- */
const vehicleTicker = document.querySelector("[data-vehicle-ticker]");
if (vehicleTicker) {
  const track = vehicleTicker.querySelector(".vehicle-ticker__track");
  const group = vehicleTicker.querySelector("[data-ticker-group]");
  const imgs = [...(group?.querySelectorAll("img") || [])];

  const measureShift = () => {
    if (!track || !group) return;
    // Exact group width avoids % rounding gaps that flash empty on mobile.
    track.style.setProperty("--ticker-shift", `${group.getBoundingClientRect().width}px`);
  };

  const markReady = () => {
    measureShift();
    vehicleTicker.classList.add("is-ready");
  };

  const whenDecoded = (img) => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    if (typeof img.decode === "function") {
      return img.decode().catch(() => {});
    }
    return new Promise((resolve) => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  };

  Promise.all(imgs.map(whenDecoded)).then(markReady);
  // Failsafe so a hung decode never leaves the rail invisible.
  window.setTimeout(markReady, 1800);

  window.addEventListener("resize", measureShift, { passive: true });
  if (reduceMotion) markReady();
}

/* ---- Scroll reveal ------------------------------------------------------- */
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // stagger children if requested
        const stagger = el.querySelector("[data-stagger]") || (el.matches("[data-stagger]") ? el : null);
        if (stagger) {
          [...stagger.children].forEach((child, i) =>
            child.style.setProperty("--i", i)
          );
        }
        el.classList.add("in");
        obs.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ---- Count-up stats ------------------------------------------------------ */
const counters = document.querySelectorAll("[data-count]");
if (counters.length) {
  const runCount = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion || !target) {
      el.textContent = String(target);
      return;
    }
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => countObserver.observe(el));
  } else {
    counters.forEach(runCount);
  }
}

/* ---- Quote form: cascading vehicle → mileage → charge reveal ------------- */
/* Curated EV + hybrid catalog. Not exhaustive — v1 covers the common ones.
   Keyed by make so cascades are trivial; year range applied at build time. */
const VEHICLE_CATALOG = {
  Audi: ["e-tron", "e-tron GT", "Q4 e-tron", "Q8 e-tron"],
  BMW: ["i3", "i4", "i5", "i7", "iX", "iX3"],
  Chevrolet: ["Bolt EV", "Bolt EUV", "Volt", "Blazer EV", "Equinox EV"],
  Chrysler: ["Pacifica Hybrid"],
  Fiat: ["500e"],
  Ford: [
    "Mustang Mach-E",
    "F-150 Lightning",
    "Escape Hybrid",
    "Escape Plug-in Hybrid",
    "Fusion Hybrid",
    "Maverick Hybrid",
  ],
  Genesis: ["Electrified G80", "GV60", "Electrified GV70"],
  Honda: ["Accord Hybrid", "CR-V Hybrid", "Clarity", "Insight", "Prologue"],
  Hyundai: [
    "Kona Electric",
    "Ioniq 5",
    "Ioniq 6",
    "Ioniq Hybrid",
    "Ioniq Plug-in Hybrid",
    "Sonata Hybrid",
    "Tucson Hybrid",
  ],
  Jaguar: ["I-PACE"],
  Kia: [
    "Soul EV",
    "Niro EV",
    "Niro Hybrid",
    "EV6",
    "EV9",
    "Optima Hybrid",
    "Sorento Hybrid",
  ],
  Lexus: ["ES Hybrid", "NX Hybrid", "RX Hybrid", "RZ"],
  Lucid: ["Air"],
  Mazda: ["MX-30", "CX-90 PHEV"],
  "Mercedes-Benz": ["EQB", "EQE", "EQE SUV", "EQS", "EQS SUV"],
  Mini: ["Cooper SE"],
  Nissan: ["Leaf", "Ariya"],
  Polestar: ["Polestar 2", "Polestar 3"],
  Porsche: ["Taycan"],
  Rivian: ["R1T", "R1S"],
  Subaru: ["Solterra", "Crosstrek Hybrid"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
  Toyota: [
    "Prius",
    "Prius Prime",
    "RAV4 Hybrid",
    "RAV4 Prime",
    "Camry Hybrid",
    "Highlander Hybrid",
    "Corolla Hybrid",
    "bZ4X",
  ],
  Volkswagen: ["ID.4", "ID.7", "e-Golf"],
  Volvo: ["XC40 Recharge", "XC60 Recharge", "XC90 Recharge", "C40 Recharge"],
};

const CURRENT_YEAR = 2026;
const OLDEST_YEAR = 2011;

const quoteForm = document.querySelector("[data-quote-form]");
if (quoteForm) {
  const yearSel = quoteForm.querySelector("[data-qf-year]");
  const makeSel = quoteForm.querySelector("[data-qf-make]");
  const makePicker = quoteForm.querySelector("[data-qf-make-picker]");
  const makeTrigger = quoteForm.querySelector("[data-qf-make-trigger]");
  const makeValue = quoteForm.querySelector("[data-qf-make-value]");
  const makeList = quoteForm.querySelector("[data-qf-make-list]");
  const quoteSheetElement = quoteForm.closest("[data-quote-sheet]");
  const modelSel = quoteForm.querySelector("[data-qf-model]");
  const milesInput = quoteForm.querySelector("[data-qf-miles]");
  const nextBtn = quoteForm.querySelector("[data-qf-next]");
  const backBtn = quoteForm.querySelector("[data-qf-back]");
  const submitBtn = quoteForm.querySelector("[data-qf-submit]");
  const restartBtn = quoteForm.querySelector("[data-qf-restart]");
  const activateLink = quoteForm.querySelector("[data-qf-activate]");
  const activateLabel = quoteForm.querySelector("[data-qf-activate-label]");
  const steps = [...quoteForm.querySelectorAll(".qf-step")];
  const dots = [...quoteForm.querySelectorAll(".qf-dot")];
  const recap = quoteForm.querySelector("[data-qf-recap]");
  const quoteHead = quoteForm.querySelector("[data-qf-quote-head]");
  const quoteVehicle = quoteForm.querySelector("[data-qf-quote-vehicle]");
  const quoteMileage = quoteForm.querySelector("[data-qf-quote-mileage]");
  const priceEl = quoteForm.querySelector("[data-qf-price]");
  const standardBlock = quoteForm.querySelector("[data-qf-quote-standard]");
  const checkBlock = quoteForm.querySelector("[data-qf-quote-check]");
  const planTabs = [...quoteForm.querySelectorAll("[data-qf-plan]")];
  const srLive = quoteForm.querySelector("[data-qf-sr]");

  let currentStep = 0;
  let selectedPlan = "monthly";
  const state = { year: "", make: "", model: "", miles: 0 };
  const makeNames = Object.keys(VEHICLE_CATALOG).sort();
  const logoUrlFor = (make) =>
    `https://www.carlogos.org/car-logos/${make.toLowerCase().replaceAll(" ", "-")}-logo.png`;

  quoteSheetElement?.appendChild(makeList);

  const closeMakeList = ({ restoreFocus = false } = {}) => {
    makeList.hidden = true;
    makeTrigger.setAttribute("aria-expanded", "false");
    if (restoreFocus) makeTrigger.focus({ preventScroll: true });
  };

  const syncMakePicker = (placeholder = "Choose make") => {
    makeTrigger.disabled = makeSel.disabled;
    makeValue.replaceChildren();

    if (state.make) {
      const logo = document.createElement("img");
      logo.src = logoUrlFor(state.make);
      logo.alt = "";
      logo.width = 32;
      logo.height = 24;
      logo.addEventListener("error", () => logo.remove());
      const text = document.createElement("span");
      text.textContent = state.make;
      makeValue.append(logo, text);
    } else {
      makeValue.textContent = placeholder;
    }

    makeList.querySelectorAll("[role='option']").forEach((option) => {
      option.setAttribute("aria-selected", String(option.dataset.value === state.make));
    });
  };

  const chooseMake = (make) => {
    makeSel.value = make;
    makeSel.dispatchEvent(new Event("change", { bubbles: true }));
    closeMakeList({ restoreFocus: true });
  };

  const renderMakeOptions = () => {
    makeList.replaceChildren();
    makeNames.forEach((make) => {
      const option = document.createElement("div");
      option.className = "qf-make-option";
      option.dataset.value = make;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(make === state.make));
      option.tabIndex = -1;

      const logo = document.createElement("img");
      logo.src = logoUrlFor(make);
      logo.alt = "";
      logo.width = 32;
      logo.height = 24;
      logo.loading = "lazy";
      logo.addEventListener("error", () => logo.remove());

      const label = document.createElement("span");
      label.textContent = make;
      option.append(logo, label);
      option.addEventListener("click", () => chooseMake(make));
      makeList.appendChild(option);
    });
  };

  const openMakeList = (edge = "start") => {
    if (makeTrigger.disabled) return;
    makeList.hidden = false;
    makeTrigger.setAttribute("aria-expanded", "true");

    const triggerRect = makeTrigger.getBoundingClientRect();
    const sheetRect = quoteSheetElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - triggerRect.bottom - 16;
    const spaceAbove = triggerRect.top - 16;
    const openBelow = spaceBelow >= 176 || spaceBelow >= spaceAbove;
    const availableHeight = Math.max(132, Math.min(272, openBelow ? spaceBelow : spaceAbove));
    const listTop = openBelow
      ? triggerRect.bottom - sheetRect.top + 4
      : triggerRect.top - sheetRect.top - availableHeight - 4;

    makeList.style.left = `${triggerRect.left - sheetRect.left}px`;
    makeList.style.top = `${listTop}px`;
    makeList.style.width = `${triggerRect.width}px`;
    makeList.style.maxHeight = `${availableHeight}px`;

    const options = [...makeList.querySelectorAll("[role='option']")];
    const selected = options.find((option) => option.dataset.value === state.make);
    const target = selected || (edge === "end" ? options.at(-1) : options[0]);
    target?.focus({ preventScroll: true });
  };

  makeTrigger.addEventListener("click", () => {
    if (makeList.hidden) openMakeList();
    else closeMakeList({ restoreFocus: true });
  });
  makeTrigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMakeList(event.key === "ArrowUp" ? "end" : "start");
    }
  });
  makeList.addEventListener("keydown", (event) => {
    const options = [...makeList.querySelectorAll("[role='option']")];
    const index = options.indexOf(document.activeElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const offset = event.key === "ArrowDown" ? 1 : -1;
      options[(index + offset + options.length) % options.length]?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (index >= 0) chooseMake(options[index].dataset.value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMakeList({ restoreFocus: true });
    } else if (event.key === "Tab") {
      closeMakeList();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (
      !makeList.hidden &&
      !makePicker.contains(event.target) &&
      !makeList.contains(event.target)
    ) {
      closeMakeList();
    }
  });

  /* populate years newest → oldest */
  for (let y = CURRENT_YEAR; y >= OLDEST_YEAR; y--) {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = String(y);
    yearSel.appendChild(opt);
  }

  const setPlaceholder = (sel, text) => {
    sel.innerHTML = "";
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = text;
    sel.appendChild(opt);
  };

  const populateMakes = () => {
    setPlaceholder(makeSel, "Choose make");
    makeNames.forEach((make) => {
        const opt = document.createElement("option");
        opt.value = make;
        opt.textContent = make;
        makeSel.appendChild(opt);
      });
    makeSel.disabled = false;
    renderMakeOptions();
    syncMakePicker();
  };
  const populateModels = (make) => {
    setPlaceholder(modelSel, "Choose model");
    (VEHICLE_CATALOG[make] || []).forEach((model) => {
      const opt = document.createElement("option");
      opt.value = model;
      opt.textContent = model;
      modelSel.appendChild(opt);
    });
    modelSel.disabled = !make;
  };
  const resetMake = () => {
    setPlaceholder(makeSel, "Choose year first");
    makeSel.disabled = true;
    state.make = "";
    closeMakeList();
    makeList.replaceChildren();
    syncMakePicker("Choose year first");
  };
  const resetModel = (msg = "Choose make first") => {
    setPlaceholder(modelSel, msg);
    modelSel.disabled = true;
    state.model = "";
  };

  const refreshNextEnabled = () => {
    nextBtn.disabled = !(state.year && state.make && state.model);
  };

  yearSel.addEventListener("change", () => {
    state.year = yearSel.value;
    if (state.year) populateMakes();
    else resetMake();
    resetModel();
    refreshNextEnabled();
  });
  makeSel.addEventListener("change", () => {
    state.make = makeSel.value;
    if (state.make) populateModels(state.make);
    else resetModel();
    syncMakePicker();
    refreshNextEnabled();
  });
  modelSel.addEventListener("change", () => {
    state.model = modelSel.value;
    refreshNextEnabled();
  });

  /* mileage: format with commas as they type */
  const formatMiles = (n) =>
    Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
  milesInput.addEventListener("input", (e) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const n = raw === "" ? 0 : parseInt(raw, 10);
    state.miles = n;
    e.target.value = raw === "" ? "" : formatMiles(n);
    submitBtn.disabled = !(state.miles > 0 && state.miles < 400000);
  });

  /* step transitions */
  const setStep = (target, direction = "forward") => {
    if (target === currentStep) return;
    const outgoing = steps[currentStep];
    const incoming = steps[target];
    if (!incoming) return;

    outgoing.hidden = true;
    incoming.classList.remove("qf-step-back");
    if (direction === "back") incoming.classList.add("qf-step-back");
    incoming.hidden = false;
    // force reflow so the entry animation always replays
    void incoming.offsetWidth;

    currentStep = target;
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-current", i === target);
      dot.classList.toggle("is-past", i < target);
    });

    const focusables = incoming.querySelectorAll(
      "select:not([disabled]), input, button:not([disabled])"
    );
    if (focusables[0]) {
      setTimeout(() => focusables[0].focus({ preventScroll: true }), 60);
    }
  };

  nextBtn.addEventListener("click", () => {
    if (nextBtn.disabled) return;
    recap.innerHTML = `<strong>${state.year} ${state.make} ${state.model}</strong>`;
    setStep(1, "forward");
    submitBtn.disabled = !(state.miles > 0);
  });
  backBtn.addEventListener("click", () => setStep(0, "back"));

  /* pricing: placeholder rate table until real data lands */
  const PRICING = { monthly: 39, once: 1290 };
  const BATTERY4LIFE_URL = "https://www.repairwise.pro/battery4life";
  const isOldVehicle = () => {
    const age = CURRENT_YEAR - Number(state.year || CURRENT_YEAR);
    return age > 6 || state.miles > 75000;
  };
  const paintPrice = () => {
    if (selectedPlan === "monthly") {
      priceEl.innerHTML = `$${PRICING.monthly}<span>/mo</span>`;
    } else {
      priceEl.innerHTML = `$${PRICING.once.toLocaleString("en-US")}<span>one-time</span>`;
    }
  };
  planTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      selectedPlan = tab.dataset.qfPlan;
      planTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-checked", String(active));
      });
      paintPrice();
      srLive.textContent =
        selectedPlan === "monthly"
          ? `Monthly plan selected, $${PRICING.monthly} per month.`
          : `Pay once selected, $${PRICING.once.toLocaleString("en-US")} one-time.`;
    });
  });

  /* submit → the charge moment */
  const revealQuote = () => {
    quoteVehicle.textContent = `${state.year} ${state.make} ${state.model}`;
    quoteMileage.textContent = `${formatMiles(state.miles)} mi`;
    quoteHead.textContent = "Quote ready";
    standardBlock.hidden = false;
    checkBlock.hidden = !isOldVehicle();
    activateLabel.textContent = "Continue to Battery4Life";
    activateLink.setAttribute("href", BATTERY4LIFE_URL);
    activateLink.setAttribute("target", "_blank");
    activateLink.setAttribute("rel", "noopener noreferrer");
    selectedPlan = "monthly";
    planTabs.forEach((t) => {
      const active = t.dataset.qfPlan === "monthly";
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });
    paintPrice();
    srLive.textContent = isOldVehicle()
      ? `Rough estimate ready. ${state.year} ${state.make} ${state.model}. About $${PRICING.monthly} per month. A free battery health report may be required before activation.`
      : `Rough estimate ready. ${state.year} ${state.make} ${state.model}. About $${PRICING.monthly} per month.`;

    setStep(2, "forward");
    // fire the beam once, on the actual meaningful moment
    if (reduceMotion) {
      quoteForm.classList.add("is-charged");
    } else {
      setTimeout(() => quoteForm.classList.add("is-charged"), 120);
    }
  };

  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;
    revealQuote();
  });

  restartBtn.addEventListener("click", () => {
    quoteForm.classList.remove("is-charged");
    state.year = "";
    state.make = "";
    state.model = "";
    state.miles = 0;
    yearSel.value = "";
    resetMake();
    resetModel();
    milesInput.value = "";
    nextBtn.disabled = true;
    submitBtn.disabled = true;
    setStep(0, "back");
  });
}

/* ---- Quote bottom sheet ------------------------------------------------- */
const quoteSheet = document.querySelector("[data-quote-sheet]");
const quoteOpeners = [...document.querySelectorAll("[data-quote-open]")];

if (quoteSheet && quoteOpeners.length) {
  const closeButton = quoteSheet.querySelector("[data-quote-close]");
  const activateLink = quoteSheet.querySelector("[data-qf-activate]");
  let lastTrigger = null;
  let closeTimer = 0;

  const focusCurrentStep = () => {
    const currentStep = quoteSheet.querySelector(".qf-step:not([hidden])");
    const target = currentStep?.querySelector(
      "select:not([disabled]), input:not([disabled]), button:not([disabled]), a[href]"
    );
    (target || closeButton)?.focus({ preventScroll: true });
  };

  const openQuoteSheet = (trigger) => {
    window.clearTimeout(closeTimer);
    lastTrigger = trigger;
    if (!quoteSheet.open) quoteSheet.showModal();
    document.documentElement.classList.add("has-quote-sheet");
    requestAnimationFrame(() => {
      quoteSheet.classList.add("is-open");
      window.setTimeout(focusCurrentStep, reduceMotion ? 0 : 80);
    });
  };

  const closeQuoteSheet = (restoreFocus = true) => {
    if (!quoteSheet.open) return;
    quoteSheet.classList.remove("is-open");
    const finish = () => {
      if (quoteSheet.open) quoteSheet.close();
      document.documentElement.classList.remove("has-quote-sheet");
      if (restoreFocus && lastTrigger) lastTrigger.focus({ preventScroll: true });
    };
    if (reduceMotion) finish();
    else closeTimer = window.setTimeout(finish, 240);
  };

  quoteOpeners.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openQuoteSheet(trigger);
    });
  });

  closeButton?.addEventListener("click", () => closeQuoteSheet());
  quoteSheet.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeQuoteSheet();
  });
  quoteSheet.addEventListener("click", (event) => {
    if (event.target === quoteSheet) closeQuoteSheet();
  });
  quoteSheet.addEventListener("close", () => {
    quoteSheet.classList.remove("is-open");
    document.documentElement.classList.remove("has-quote-sheet");
  });
  activateLink?.addEventListener("click", () => closeQuoteSheet(false));
}

/* ---- FAQ accordion ------------------------------------------------------- */
const faq = document.querySelector("[data-faq]");
if (faq) {
  const items = [...faq.querySelectorAll(".faq-item")];
  items.forEach((item, index) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;
    const panelId = panel.id || `faq-panel-${index + 1}`;
    panel.id = panelId;
    panel.setAttribute("role", "region");
    btn.setAttribute("aria-controls", panelId);
    if (!btn.id) btn.id = `faq-trigger-${index + 1}`;
    panel.setAttribute("aria-labelledby", btn.id);
    panel.hidden = !item.classList.contains("open");

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      items.forEach((other) => {
        if (other === item) return;
        const otherBtn = other.querySelector(".faq-q");
        const otherPanel = other.querySelector(".faq-a");
        other.classList.remove("open");
        otherBtn?.setAttribute("aria-expanded", "false");
        if (otherPanel) {
          otherPanel.hidden = true;
          otherPanel.style.height = "0px";
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        panel.hidden = true;
        panel.style.height = "0px";
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        panel.style.height = panel.firstElementChild.offsetHeight + "px";
      }
    });
  });
  window.addEventListener("resize", () => {
    const open = faq.querySelector(".faq-item.open");
    if (!open) return;
    const panel = open.querySelector(".faq-a");
    if (panel?.firstElementChild) {
      panel.style.height = panel.firstElementChild.offsetHeight + "px";
    }
  });
}
