/* =====================================================
   NIRANJAN · Portfolio
   ===================================================== */

// ----- DATA -----

const featuredProjects = [
  {
    eyebrow: "Featured project",
    title: "Conversational AI with RAG",
    description:
      "A context-aware chatbot that grounds answers in a private knowledge base. Built a sentence-transformer embedding pipeline, indexed documents in ChromaDB, and wired retrieval into prompt assembly — so the LLM stops hallucinating and starts citing.",
    tech: ["Python", "PyTorch", "Transformers", "ChromaDB", "LangChain"],
    glyph: "◆",
    links: [
      { label: "GitHub", href: "https://github.com/TGvenomYT", icon: "github" },
      { label: "Live demo", href: "https://github.com/TGvenomYT", icon: "external" }
    ]
  },
  {
    eyebrow: "Featured project",
    title: "Vision Transformer Classifier",
    description:
      "Fine-tuned a pretrained ViT on a custom dataset for multi-class image classification. Implemented mixed-precision training, augmentation pipelines, and evaluation on held-out data — getting clean confusion-matrix performance without overfitting.",
    tech: ["Python", "PyTorch", "Hugging Face", "ViT"],
    glyph: "◇",
    links: [
      { label: "GitHub", href: "https://github.com/TGvenomYT", icon: "github" }
    ]
  },
  {
    eyebrow: "Featured project",
    title: "Self-Hosted LLM Automation",
    description:
      "End-to-end content workflow powered by local Ollama models. Built n8n nodes that pull data, send it through a quantized LLM for summarization and rewriting, and ship structured output — all on-prem, no cloud API spend.",
    tech: ["n8n", "Ollama", "Python", "REST APIs"],
    glyph: "◈",
    links: [
      { label: "GitHub", href: "https://github.com/TGvenomYT", icon: "github" }
    ]
  }
];

const otherProjects = [
  {
    icon: "📊",
    title: "ML Data Pipeline",
    description:
      "ETL pipeline that collects, normalizes, and prepares training data for ML models — with schema validation, dedup, and pandas-based feature engineering.",
    tech: ["Python", "SQL", "Pandas"],
    links: [{ label: "GitHub", href: "https://github.com/TGvenomYT", icon: "github" }]
  },
  {
    icon: "🧠",
    title: "LLM Playground",
    description:
      "Unified front-end over multiple Ollama models. Switch models, stream tokens, and benchmark latency vs quality on consumer hardware.",
    tech: ["Ollama", "Python", "FastAPI"],
    links: [{ label: "GitHub", href: "https://github.com/TGvenomYT", icon: "github" }]
  },
  {
    icon: "🪄",
    title: "Tool-Using LLM Agent",
    description:
      "Experimental ReAct-style agent that decides when to call tools — search, calculator, file I/O — using a local LLM for full privacy.",
    tech: ["Python", "Ollama", "ReAct"],
    links: [{ label: "GitHub", href: "https://github.com/TGvenomYT", icon: "github" }]
  },
  {
    icon: "🔍",
    title: "Embedding Visualizer",
    description:
      "Projects sentence embeddings into 2D using UMAP and renders them interactively — making it easier to debug semantic search quality.",
    tech: ["Python", "UMAP", "Matplotlib"],
    links: [{ label: "GitHub", href: "https://github.com/TGvenomYT", icon: "github" }]
  },
  {
    icon: "⚡",
    title: "Fast Inference API",
    description:
      "FastAPI wrapper around local LLMs with streaming responses, request queuing, and basic rate limiting — production-grade ergonomics.",
    tech: ["FastAPI", "Python", "Async"],
    links: [{ label: "GitHub", href: "https://github.com/TGvenomYT", icon: "github" }]
  },
  {
    icon: "🐍",
    title: "Python Learning Notes",
    description:
      "Open-source notes and worked examples from my deep dive into ML fundamentals — tensors, autograd, transformer internals, attention mechanisms.",
    tech: ["Python", "PyTorch", "Notebooks"],
    links: [{ label: "GitHub", href: "https://github.com/TGvenomYT", icon: "github" }]
  }
];

const stackItems = [
  { icon: "🐍", name: "Python",       desc: "Primary language" },
  { icon: "🔥", name: "PyTorch",      desc: "Deep learning" },
  { icon: "🤗", name: "Transformers", desc: "Hugging Face" },
  { icon: "💎", name: "ChromaDB",     desc: "Vector store" },
  { icon: "🦙", name: "Ollama",       desc: "Local LLMs" },
  { icon: "🦜", name: "LangChain",    desc: "LLM orchestration" },
  { icon: "⚙️", name: "n8n",          desc: "Workflow automation" },
  { icon: "⚡", name: "FastAPI",      desc: "Python APIs" },
  { icon: "🐼", name: "Pandas",       desc: "Data wrangling" },
  { icon: "🐘", name: "PostgreSQL",   desc: "Relational DB" },
  { icon: "🔧", name: "Git",          desc: "Version control" },
  { icon: "🐧", name: "Linux",        desc: "Platform" }
];

const journey = [
  {
    key: "ai-builder",
    label: "AI Builder",
    title: "AI/ML Engineer",
    where: "Independent",
    period: "2024 — Present",
    points: [
      "Building and shipping end-to-end AI systems — RAG-grounded chatbots, vision transformers, and agentic LLM tools.",
      "Working with PyTorch, Hugging Face Transformers, ChromaDB, Ollama, and LangChain to turn ideas into production-ready applications.",
      "Sharing notes, experiments, and source code publicly on GitHub as I learn."
    ]
  },
  {
    key: "deep-dive",
    label: "ML Deep Dive",
    title: "Deep Learning Self-Study",
    where: "Self-directed",
    period: "2022 — Present",
    points: [
      "Working through PyTorch fundamentals — tensors, autograd, training loops, mixed precision.",
      "Studying transformer architecture, attention mechanisms, embeddings, and modern fine-tuning techniques.",
      "Reading papers on arXiv and reproducing key results to build intuition, not just vocabulary."
    ]
  },
  {
    key: "school",
    label: "School",
    title: "School Education",
    where: "Science Stream",
    period: "2021 — Present",
    points: [
      "Pursuing formal school education with focus on physics, math, and computer science.",
      "Building the mathematical foundation — linear algebra, calculus, probability — that machine learning depends on.",
      "Balancing academic curriculum with self-directed engineering projects."
    ]
  },
  {
    key: "origin",
    label: "Origin",
    title: "Discovering Programming",
    where: "Before 2021",
    period: "Before 2021",
    points: [
      "First contact with Python and the joy of making computers do things.",
      "Worked through basic algorithms, data structures, and the foundations of computer science.",
      "The spark that turned a curious kid into someone who couldn't stop building."
    ]
  }
];

// SVG icons used in feature links
const ICONS = {
  github: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
  external: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'
};

// =====================================================
// APP
// =====================================================

class Portfolio {
  constructor() {
    this.renderFeatured();
    this.renderOther();
    this.renderStack();
    this.renderTabs();

    this.spotlight();
    this.scrollHeader();
    this.smoothScroll();
    this.activeSection();
    this.hamburger();
    this.scrollReveal();
  }

  // ---------- Featured ----------
  renderFeatured() {
    const root = document.getElementById('featuredList');
    if (!root) return;
    root.innerHTML = featuredProjects.map(p => `
      <article class="feat reveal">
        <a class="feat-visual" href="${p.links[0]?.href || '#'}" target="_blank" rel="noopener" aria-label="${p.title}">
          <div class="feat-pattern"></div>
          <span class="feat-glyph" aria-hidden="true">${p.glyph}</span>
        </a>
        <div class="feat-content">
          <p class="feat-eyebrow">${p.eyebrow}</p>
          <h3 class="feat-title">${p.title}</h3>
          <p class="feat-desc">${p.description}</p>
          <ul class="feat-tech">
            ${p.tech.map(t => `<li>${t}</li>`).join('')}
          </ul>
          <div class="feat-links">
            ${p.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener" aria-label="${l.label}">${ICONS[l.icon] || ''}</a>`).join('')}
          </div>
        </div>
      </article>
    `).join('');
  }

  // ---------- Other projects ----------
  renderOther() {
    const root = document.getElementById('otherList');
    if (!root) return;
    root.innerHTML = otherProjects.map(p => `
      <article class="other-card reveal">
        <div class="other-head">
          <span class="other-icon" aria-hidden="true">${p.icon}</span>
          <div class="other-links">
            ${p.links.map(l => `<a class="other-link" href="${l.href}" target="_blank" rel="noopener" aria-label="${l.label}">${ICONS[l.icon] || ''}</a>`).join('')}
          </div>
        </div>
        <h4 class="other-title">${p.title}</h4>
        <p class="other-desc">${p.description}</p>
        <ul class="other-tech">
          ${p.tech.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </article>
    `).join('');
  }

  // ---------- Stack ----------
  renderStack() {
    const root = document.getElementById('stackGrid');
    if (!root) return;
    root.innerHTML = stackItems.map(s => `
      <div class="stack-item">
        <div class="stack-item-head">
          <span class="stack-icon" aria-hidden="true">${s.icon}</span>
          <span class="stack-name">${s.name}</span>
        </div>
        <span class="stack-desc">${s.desc}</span>
      </div>
    `).join('');
  }

  // ---------- Tabs ----------
  renderTabs() {
    const list  = document.getElementById('tabList');
    const panel = document.getElementById('tabPanel');
    if (!list || !panel) return;

    list.innerHTML = journey.map((j, i) => `
      <button class="tab-btn${i === 0 ? ' active' : ''}" role="tab" data-key="${j.key}">${j.label}</button>
    `).join('');

    const renderPanel = (key) => {
      const j = journey.find(x => x.key === key);
      if (!j) return;
      panel.innerHTML = `
        <div class="tab-content">
          <h3 class="tab-title">${j.title} <span class="tab-title-where">· ${j.where}</span></h3>
          <p class="tab-period">${j.period}</p>
          <ul class="tab-points">
            ${j.points.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      `;
    };

    renderPanel(journey[0].key);

    list.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        list.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPanel(btn.dataset.key);
      });
    });
  }

  // ---------- Mouse spotlight ----------
  spotlight() {
    const sp = document.querySelector('.spotlight');
    if (!sp) return;
    if (window.matchMedia('(hover: none)').matches) return;

    document.addEventListener('mousemove', e => {
      sp.style.setProperty('--mx', `${e.clientX}px`);
      sp.style.setProperty('--my', `${e.clientY}px`);
    }, { passive: true });
  }

  // ---------- Header scroll ----------
  scrollHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Smooth scroll ----------
  smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        document.getElementById('nav')?.classList.remove('open');
        document.getElementById('navToggle')?.classList.remove('open');
      });
    });
  }

  // ---------- Active section in nav ----------
  activeSection() {
    const links = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = sections[0].id;
      for (const s of sections) {
        if (s.offsetTop <= y) current = s.id;
      }
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Hamburger ----------
  hamburger() {
    const toggle = document.getElementById('navToggle');
    const nav    = document.getElementById('nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }

  // ---------- Scroll reveal ----------
  scrollReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 400)}ms`;
      io.observe(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new Portfolio());
