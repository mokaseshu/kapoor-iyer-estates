(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const missingImages = new Set();

  const LOGO_FALLBACK = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><circle cx="44" cy="44" r="43" fill="#1E1E1E" stroke="#B8955A" stroke-width="2"/><circle cx="44" cy="44" r="36" fill="none" stroke="#B8955A" stroke-width="0.8"/><text x="44" y="54" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#D9BF8E" letter-spacing="1">K&amp;I</text></svg>'
  );

  function fileName(src) {
    return (src || "").split("?")[0].split("/").pop();
  }

  function placeholderFor(src) {
    const name = fileName(src);
    const ratio = (typeof IMAGE_RATIOS !== "undefined" && IMAGE_RATIOS[name]) || "1200x900";
    const label = name.replace(/\.(jpe?g|png|webp)$/i, "").replace(/-/g, " ");
    return "https://placehold.co/" + ratio + "/2F5D62/F7F3EC?font=playfair-display&text=" + encodeURIComponent(label);
  }

  function handleBrokenImage(img) {
    if (!img || img.dataset.fallback) return;
    const original = img.getAttribute("src");
    if (!original || original.indexOf("images/") === -1) return;
    img.dataset.fallback = "1";
    missingImages.add(fileName(original));
    img.src = img.hasAttribute("data-logo") ? LOGO_FALLBACK : placeholderFor(original);
  }

  document.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG") handleBrokenImage(e.target);
  }, true);

  function sweepBrokenImages() {
    $$("img").forEach((img) => {
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) handleBrokenImage(img);
    });
  }

  function img(src, alt, opts) {
    const o = opts || {};
    return '<img src="images/' + src + '" alt="' + alt.replace(/"/g, "&quot;") + '"' +
      (o.eager ? "" : ' loading="lazy"') + ' decoding="async"' +
      (o.w ? ' width="' + o.w + '" height="' + o.h + '"' : "") + ">";
  }

  function waLink(text) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  }

  const icons = {
    arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'
  };

  function renderProperties() {
    const grid = $("#propertyGrid");
    grid.innerHTML = LISTINGS.map((p, i) =>
      '<article class="property-card reveal" data-tag="' + p.tag + '" style="--delay:' + (i % 3) * 0.12 + 's">' +
        '<div class="card-media">' + img(p.image, p.title + " in " + p.area, { w: 1200, h: 900 }) +
          '<span class="card-tag">' + p.area + "</span>" +
          '<span class="card-type">' + p.tag + "</span>" +
        "</div>" +
        '<div class="card-body">' +
          '<h3 class="card-title">' + p.title + "</h3>" +
          '<p class="card-price">' + p.price + "</p>" +
          '<p class="card-specs">' + p.bhk + '<span class="dot" aria-hidden="true"></span>' + p.size + "</p>" +
          '<button class="card-link" data-open="' + p.id + '" aria-label="View details of ' + p.title + '">View Details ' + icons.arrow + "</button>" +
        "</div>" +
      "</article>"
    ).join("");
  }

  function renderNeighbourhoods() {
    $("#hoodTrack").innerHTML = NEIGHBOURHOODS.map((n, i) =>
      '<article class="hood-card reveal" style="--delay:' + i * 0.1 + 's">' +
        img(n.image, n.name + ", Mumbai", { w: 800, h: 1200 }) +
        '<div class="hood-info">' +
          '<p class="hood-index">0' + (i + 1) + "</p>" +
          '<h3 class="hood-name">' + n.name + "</h3>" +
          '<p class="hood-line">' + n.line + "</p>" +
        "</div>" +
      "</article>"
    ).join("");
  }

  function renderTestimonials() {
    $("#testiTrack").innerHTML = TESTIMONIALS.map((t, i) =>
      '<figure class="testi-slide' + (i === 0 ? " is-active" : "") + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + " of " + TESTIMONIALS.length + '"' + (i === 0 ? "" : ' aria-hidden="true"') + ">" +
        '<span class="testi-mark" aria-hidden="true">“</span>' +
        '<blockquote class="testi-quote">' + t.quote + "</blockquote>" +
        "<figcaption>" +
          '<p class="testi-name">' + t.name + "</p>" +
          '<p class="testi-place">' + t.place + "</p>" +
        "</figcaption>" +
      "</figure>"
    ).join("");
    $("#testiDots").innerHTML = TESTIMONIALS.map((t, i) =>
      '<button class="testi-dot' + (i === 0 ? " is-active" : "") + '" role="tab" aria-selected="' + (i === 0) + '" aria-label="Testimonial ' + (i + 1) + " from " + t.name + '" data-index="' + i + '"></button>'
    ).join("");
  }

  function renderTeam() {
    $("#teamGrid").innerHTML = TEAM.map((m, i) =>
      '<article class="team-card reveal" style="--delay:' + i * 0.1 + 's">' +
        '<div class="team-photo">' + img(m.image, "Portrait of " + m.name + ", " + m.role, { w: 800, h: 1000 }) + "</div>" +
        '<h3 class="team-name">' + m.name + "</h3>" +
        '<p class="team-role">' + m.role + "</p>" +
        '<div class="team-actions">' +
          '<a class="icon-btn" href="tel:' + m.phone + '" aria-label="Call ' + m.name + '">' + icons.phone + "</a>" +
          '<a class="icon-btn" href="mailto:' + m.email + '" aria-label="Email ' + m.name + '">' + icons.mail + "</a>" +
        "</div>" +
      "</article>"
    ).join("");
  }

  function renderJournal() {
    $("#journalGrid").innerHTML = JOURNAL.map((j, i) =>
      '<article class="journal-card reveal" style="--delay:' + i * 0.12 + 's">' +
        '<div class="journal-media">' + img(j.image, j.title, { w: 1200, h: 800 }) + "</div>" +
        '<p class="journal-meta">' + j.category + " · " + j.date + "</p>" +
        '<h3 class="journal-title">' + j.title + "</h3>" +
        '<p class="journal-excerpt">' + j.excerpt + "</p>" +
        '<a href="#journal" class="card-link" aria-label="Read: ' + j.title + '">Read · ' + j.read + " " + icons.arrow + "</a>" +
      "</article>"
    ).join("");
  }

  function initHeader() {
    const header = $("#siteHeader");
    const backTop = $("#backToTop");
    const navLinks = $$(".main-nav a");
    const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    let ticking = false;

    function update() {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      backTop.classList.toggle("is-visible", y > window.innerHeight * 0.9);
      const probe = y + window.innerHeight * 0.35;
      let current = null;
      sections.forEach((s) => { if (s.offsetTop <= probe && (!current || s.offsetTop > current.offsetTop)) current = s; });
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = $("#contact");
      navLinks.forEach((a) => {
        const active = current && a.getAttribute("href") === "#" + current.id;
        a.classList.toggle("is-active", !!active);
        if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();

    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  function initMobileMenu() {
    const toggle = $("#menuToggle");
    const menu = $("#mobileMenu");
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("menu-open", open);
      document.body.classList.toggle("is-locked", open);
      $$("a", menu).forEach((a) => (a.tabIndex = open ? 0 : -1));
      if (open) $("a", menu).focus();
    }
    $$("a", menu).forEach((a) => (a.tabIndex = -1));
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 900 && menu.classList.contains("is-open")) setOpen(false); });
  }

  function initHeroMedia() {
    const hero = $(".hero");
    const video = $("#heroVideo");
    const probe = new Image();
    probe.onerror = () => {
      missingImages.add("hero.webp");
      video.removeAttribute("poster");
      $(".hero-fallback").src = placeholderFor("images/hero.webp");
      $(".hero-fallback").dataset.fallback = "1";
    };
    probe.src = "images/hero.webp";

    const fallback = () => hero.classList.add("no-video");
    if (reduceMotion) { video.pause(); video.removeAttribute("autoplay"); fallback(); return; }
    video.addEventListener("playing", () => hero.classList.remove("no-video"));
    $("source", video).addEventListener("error", fallback);
    const attempt = video.play();
    if (attempt && attempt.catch) attempt.catch(() => {
      setTimeout(() => { if (video.paused || video.error) fallback(); }, 600);
    });
    document.addEventListener("visibilitychange", () => {
      if (hero.classList.contains("no-video")) return;
      if (document.hidden) video.pause(); else video.play().catch(() => {});
    });
  }

  function initParticles() {
    const canvas = $("#heroParticles");
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    const hero = $(".hero");
    let w = 0, h = 0, dpr = 1, raf = null, inView = true;
    const particles = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(p, initial) {
      p.x = Math.random() * w;
      p.y = initial ? Math.random() * h : h + 10;
      p.r = 0.8 + Math.random() * 2.4;
      p.vx = (Math.random() - 0.5) * 0.18;
      p.vy = -(0.12 + Math.random() * 0.32);
      p.a = 0.18 + Math.random() * 0.5;
      p.t = Math.random() * Math.PI * 2;
      return p;
    }

    resize();
    for (let i = 0; i < 40; i++) particles.push(spawn({}, true));

    function frame() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.t += 0.01;
        p.x += p.vx + Math.sin(p.t) * 0.12;
        p.y += p.vy;
        if (p.y < -10 || p.x < -10 || p.x > w + 10) spawn(p, false);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, "rgba(217, 191, 142," + p.a + ")");
        glow.addColorStop(1, "rgba(184, 149, 90, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf && inView && !document.hidden) raf = requestAnimationFrame(frame); }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      inView ? start() : stop();
    }).observe(hero);
    start();
  }

  function initReveal() {
    const els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
  }

  function initCounters() {
    const counters = $$(".counter");
    const format = (n, el) => el.dataset.format === "comma" ? n.toLocaleString("en-IN") : String(n);
    function run(el) {
      const target = Number(el.dataset.target);
      if (reduceMotion) { el.textContent = format(target, el); return; }
      const duration = 2000;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = format(Math.round(target * eased), el);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  }

  function initFilters() {
    const chips = $$(".chip");
    chips.forEach((chip) => chip.addEventListener("click", () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      $$(".property-card").forEach((card, i) => {
        const show = f === "All" || card.dataset.tag === f;
        card.classList.toggle("is-hidden", !show);
        if (show && !reduceMotion) {
          card.classList.remove("is-visible");
          card.style.setProperty("--delay", "0s");
          requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add("is-visible")));
        }
      });
    }));
  }

  const modal = { el: null, lastFocus: null };

  function openModal(id) {
    const p = LISTINGS.find((l) => l.id === Number(id));
    if (!p) return;
    const el = modal.el;
    modal.lastFocus = document.activeElement;
    const gallery = [p.image, "interior-1.webp", "interior-2.webp", "interior-3.webp"];
    const altFor = (src, i) => i === 0 ? p.title + " in " + p.area : p.title + " — interior view " + i;
    const main = $("#modalMainImg");
    function show(i) {
      main.removeAttribute("data-fallback");
      main.src = "images/" + gallery[i];
      main.alt = altFor(gallery[i], i);
      $$(".modal-thumb", el).forEach((t, j) => {
        t.classList.toggle("is-active", j === i);
        t.setAttribute("aria-pressed", String(j === i));
      });
    }
    $("#modalThumbs").innerHTML = gallery.map((src, i) =>
      '<button class="modal-thumb" data-index="' + i + '" aria-label="Show image ' + (i + 1) + ' of ' + gallery.length + '">' +
        '<img src="images/' + src + '" alt="" decoding="async"></button>'
    ).join("");
    $$(".modal-thumb", el).forEach((t) => t.addEventListener("click", () => show(Number(t.dataset.index))));
    show(0);
    $("#modalArea").textContent = p.area + " · " + p.tag;
    $("#modalTitle").textContent = p.title;
    $("#modalPrice").textContent = p.price;
    $("#modalSpecs").textContent = p.bhk + " · " + p.size;
    $("#modalDesc").textContent = p.description;
    $("#modalAmenities").innerHTML = p.amenities.map((a) => "<li>" + a + "</li>").join("");
    $("#modalWhatsApp").href = waLink("Hi, I'm interested in the " + p.title + " in " + p.area + " (" + p.price + "). Could you share more details?");
    el.hidden = false;
    document.body.classList.add("is-locked");
    $(".modal-panel", el).scrollTop = 0;
    requestAnimationFrame(() => $(".modal-close", el).focus());
  }

  function closeModal() {
    if (!modal.el || modal.el.hidden) return;
    modal.el.hidden = true;
    document.body.classList.remove("is-locked");
    if (modal.lastFocus && modal.lastFocus.focus) modal.lastFocus.focus();
  }

  function initModal() {
    modal.el = $("#propertyModal");
    document.addEventListener("click", (e) => {
      const opener = e.target.closest("[data-open]");
      if (opener) { e.preventDefault(); openModal(opener.dataset.open); return; }
      if (e.target.closest("[data-close]") && !modal.el.hidden) closeModal();
    });
    $$(".property-card .card-media").forEach((m) => {
      m.style.cursor = "pointer";
      m.addEventListener("click", () => openModal($("[data-open]", m.parentElement).dataset.open));
    });
    document.addEventListener("keydown", (e) => {
      if (modal.el.hidden) return;
      if (e.key === "Escape") { closeModal(); return; }
      if (e.key === "Tab") {
        const focusables = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', $(".modal-panel", modal.el))
          .filter((f) => !f.disabled && f.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!modal.el.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function initNeighbourhoodCarousel() {
    const track = $("#hoodTrack");
    const step = () => {
      const card = $(".hood-card", track);
      return card ? card.getBoundingClientRect().width + 22 : 300;
    };
    $("#hoodPrev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }));
    $("#hoodNext").addEventListener("click", () => track.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); track.scrollBy({ left: step() }); }
      if (e.key === "ArrowLeft") { e.preventDefault(); track.scrollBy({ left: -step() }); }
    });
  }

  function initMap() {
    const container = $("#leafletMap");
    if (typeof L === "undefined") {
      container.innerHTML = '<p style="padding:24px">The map could not load. Please check your connection.</p>';
      return;
    }
    const map = L.map(container, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      className: "soft-tiles",
      maxZoom: 19
    }).addTo(map);

    const pinIcon = (cls) => L.divIcon({ className: "", html: '<div class="pin ' + (cls || "") + '"></div>', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -10] });
    const markers = {};
    const latlngs = [];

    LISTINGS.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: pinIcon(), title: p.title, alt: p.title, riseOnHover: true }).addTo(map);
      marker.bindPopup(
        '<div class="popup">' + img(p.image, p.title, { eager: true }) +
          '<div class="popup-body">' +
            '<h3 class="popup-title">' + p.title + "</h3>" +
            '<p class="popup-area">' + p.area + " · " + p.bhk + "</p>" +
            '<p class="popup-price">' + p.price + "</p>" +
            '<button class="btn btn-gold popup-btn" data-open="' + p.id + '">View Property</button>' +
          "</div></div>",
        { maxWidth: 240, minWidth: 240 }
      );
      marker.on("popupopen", (e) => {
        $$("img", e.popup.getElement()).forEach((im) => {
          if (im.complete && im.naturalWidth === 0) handleBrokenImage(im);
        });
      });
      markers[p.id] = marker;
      latlngs.push([p.lat, p.lng]);
    });

    L.marker([OFFICE.lat, OFFICE.lng], { icon: L.divIcon({ className: "", html: '<div class="pin pin-office"></div>', iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12] }), title: "Kapoor & Iyer office", alt: "Kapoor & Iyer office" })
      .addTo(map)
      .bindPopup('<div class="popup popup-office"><div class="popup-body"><h3 class="popup-title">Kapoor &amp; Iyer Estates</h3><p class="popup-area">' + OFFICE.address + '</p><a class="btn btn-dark popup-btn" href="#contact">Visit Us</a></div></div>', { maxWidth: 240, minWidth: 240 });
    latlngs.push([OFFICE.lat, OFFICE.lng]);

    const fit = () => map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });
    fit();

    map.on("click", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());
    container.addEventListener("click", (e) => { if (e.target.closest(".popup a[href='#contact']")) map.closePopup(); });

    const list = $("#mapList");
    list.innerHTML = LISTINGS.map((p) =>
      '<li><button class="map-item" data-id="' + p.id + '">' +
        img(p.image, "", { w: 76, h: 64 }) +
        '<span><span class="map-item-title">' + p.title + "</span>" +
        '<span class="map-item-meta">' + p.area + " · <strong>" + p.price + "</strong></span></span>" +
      "</button></li>"
    ).join("");

    function highlight(id, on) {
      const m = markers[id];
      if (!m || !m.getElement()) return;
      $(".pin", m.getElement()).classList.toggle("is-highlight", on);
      m.getElement().classList.toggle("is-front", on);
    }
    $$(".map-item", list).forEach((btn) => {
      const id = Number(btn.dataset.id);
      btn.addEventListener("mouseenter", () => highlight(id, true));
      btn.addEventListener("mouseleave", () => highlight(id, false));
      btn.addEventListener("focus", () => highlight(id, true));
      btn.addEventListener("blur", () => highlight(id, false));
      btn.addEventListener("click", () => {
        map.flyTo(markers[id].getLatLng(), 14, { duration: reduceMotion ? 0 : 0.9 });
        map.once("moveend", () => markers[id].openPopup());
        $$(".map-item", list).forEach((b) => b.classList.toggle("is-active", b === btn));
      });
    });

    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { map.invalidateSize(); fit(); obs.disconnect(); }
    }).observe(container);
    window.addEventListener("resize", () => map.invalidateSize());
  }

  function initLifestyle() {
    const section = $("#lifestyle");
    const media = $("#lifestyleMedia");
    const video = $("#lifestyleVideo");
    if (!reduceMotion) {
      video.addEventListener("playing", () => video.classList.add("is-playing"));
      new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) video.play().catch(() => {});
        else video.pause();
      }, { threshold: 0.15 }).observe(section);

      let ticking = false;
      const update = () => {
        const r = section.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          media.style.transform = "translate3d(0," + (progress * -12).toFixed(2) + "%,0)";
        }
        ticking = false;
      };
      window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
      update();
    }
  }

  function initTestimonials() {
    const slides = $$(".testi-slide");
    const dots = $$(".testi-dot");
    const slider = $("#testiSlider");
    let index = 0, timer = null;
    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, j) => {
        s.classList.toggle("is-active", j === index);
        if (j === index) s.removeAttribute("aria-hidden"); else s.setAttribute("aria-hidden", "true");
      });
      dots.forEach((d, j) => {
        d.classList.toggle("is-active", j === index);
        d.setAttribute("aria-selected", String(j === index));
      });
    }
    function play() { if (!reduceMotion) { stop(); timer = setInterval(() => go(index + 1), 7000); } }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    $("#testiPrev").addEventListener("click", () => { go(index - 1); play(); });
    $("#testiNext").addEventListener("click", () => { go(index + 1); play(); });
    dots.forEach((d) => d.addEventListener("click", () => { go(Number(d.dataset.index)); play(); }));
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", play);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", play);
    let startX = null;
    slider.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); play(); }
      startX = null;
    });
    play();
  }

  function initForm() {
    const form = $("#contactForm");
    const success = $("#formSuccess");
    const rules = {
      fName: (v) => v.trim().length >= 2 || "Please enter your name.",
      fPhone: (v) => /^[+\d][\d\s-]{7,15}$/.test(v.trim()) || "Please enter a valid phone number.",
      fEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address.",
      fInterest: (v) => !!v || "Please choose what you are interested in.",
      fBudget: (v) => !!v || "Please choose a budget range."
    };
    function validate(id) {
      const input = $("#" + id);
      const result = rules[id](input.value);
      const field = input.closest(".field");
      const err = $("#" + id + "Err");
      const ok = result === true;
      field.classList.toggle("has-error", !ok);
      err.textContent = ok ? "" : result;
      input.setAttribute("aria-invalid", String(!ok));
      if (!ok) input.setAttribute("aria-describedby", id + "Err"); else input.removeAttribute("aria-describedby");
      return ok;
    }
    Object.keys(rules).forEach((id) => {
      const input = $("#" + id);
      input.addEventListener("blur", () => { if (input.value) validate(id); });
      input.addEventListener("input", () => { if (input.closest(".field").classList.contains("has-error")) validate(id); });
      input.addEventListener("change", () => { if (input.closest(".field").classList.contains("has-error")) validate(id); });
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = Object.keys(rules).map(validate);
      if (results.includes(false)) {
        const firstBad = Object.keys(rules)[results.indexOf(false)];
        $("#" + firstBad).focus();
        return;
      }
      const btn = $("button[type=submit]", form);
      btn.disabled = true;
      btn.textContent = "Sending…";
      setTimeout(() => {
        form.hidden = true;
        success.hidden = false;
        success.focus();
        btn.disabled = false;
        btn.textContent = "Send Enquiry";
      }, 900);
    });
    $("#formReset").addEventListener("click", () => {
      form.reset();
      $$(".field", form).forEach((f) => f.classList.remove("has-error"));
      success.hidden = true;
      form.hidden = false;
      $("#fName").focus();
    });
  }

  function init() {
    renderProperties();
    renderNeighbourhoods();
    renderTestimonials();
    renderTeam();
    renderJournal();
    sweepBrokenImages();
    initHeader();
    initMobileMenu();
    initHeroMedia();
    initParticles();
    initReveal();
    initCounters();
    initFilters();
    initModal();
    initNeighbourhoodCarousel();
    initMap();
    initLifestyle();
    initTestimonials();
    initForm();
    $("#year").textContent = new Date().getFullYear();
    window.addEventListener("load", () => {
      sweepBrokenImages();
      if (missingImages.size) console.info("Kapoor & Iyer: using placeholders for missing images:", Array.from(missingImages).sort().join(", "));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
