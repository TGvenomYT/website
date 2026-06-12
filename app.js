/* =====================================================
   NIRANJAN · Data Scientist & AI Builder
   Notion-style UI on old paper.
   ===================================================== */

// ----- DATA -----

const GITHUB_USER = 'TGvenomYT';

const featuredProjects = [
  {
    emoji: '🧠',
    eyebrow: 'Featured · AI + ML product',
    title: 'CAREN — AI Email Command Center',
    repo: 'https://github.com/TGvenomYT/CAREN-agent',
    description:
      'A full-stack AI dashboard that runs your inbox: local LLM summarization via <strong>Ollama</strong>, a <strong>scikit-learn logistic-regression spam classifier</strong>, AI-composed outbound emails, and a real-time voice interface (Moonshine STT + Kokoro TTS) — all wrapped in a React UI.',
    tech: ['Python', 'FastAPI', 'scikit-learn', 'Ollama', 'LangChain', 'React', 'FastRTC'],
    live: {
      url: 'https://tgvenomyt.github.io/CAREN-agent/',
      img: 'assets/preview-caren.jpg',
      title: 'CAREN — live demo',
      desc: 'The command center in your browser, gated behind an access key like a real product.'
    },
    term: {
      title: 'caren — api',
      lines: [
        { t: 'cmd',  x: 'uvicorn caren.api:app --port 7860' },
        { t: 'ok',   x: '✓ ollama connected — local llm online' },
        { t: 'ok',   x: '✓ spam classifier loaded · logistic regression' },
        { t: 'dim',  x: '▸ voice bridge: moonshine stt ⇄ kokoro tts' },
        { t: 'live', x: 'neural hub live — listening' }
      ]
    }
  },
  {
    emoji: '☎️',
    eyebrow: 'Featured · Real-time voice AI',
    title: 'AI Phone Agent on Exotel',
    repo: 'https://github.com/TGvenomYT/Exotel-with-Pipecat',
    description:
      'An outbound calling bot that talks to real people over a real phone line. FastAPI orchestrates <strong>Exotel telephony</strong> with a <strong>Pipecat pipeline</strong> — Deepgram speech-to-text, an OpenAI LLM for reasoning, Cartesia text-to-speech — with audio bridged live over WebSockets.',
    tech: ['Python', 'Pipecat', 'FastAPI', 'Deepgram', 'OpenAI', 'Cartesia', 'WebSockets'],
    term: {
      title: 'exotel — outbound',
      lines: [
        { t: 'cmd',  x: 'curl -X POST /start -d \'{"to": "+91•••"}\'' },
        { t: 'ok',   x: '✓ exotel connect api — bot line answered' },
        { t: 'dim',  x: '⇄ websocket audio bridge established' },
        { t: 'out',  x: 'deepgram → llm → cartesia' },
        { t: 'live', x: 'call connected — streaming audio' }
      ]
    }
  },
  {
    emoji: '🏫',
    eyebrow: 'Featured · Production client work',
    title: 'KVMTCC — Live Client Website',
    repo: 'https://github.com/TGvenomYT/KVM-Website',
    description:
      'A production marketing site for a real tuition centre serving Class 8–12 students. <strong>Next.js 15</strong> static export with a <strong>Google-Sheets-backed CMS</strong>, so non-technical admins update the live site without touching code — deployed automatically via GitHub Actions.',
    tech: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Framer Motion', 'Google Sheets CMS', 'GitHub Actions'],
    live: {
      url: 'https://tgvenomyt.github.io/KVM-Website/',
      img: 'assets/preview-kvm.jpg',
      title: 'KVMTCC — Shaping Future Minds',
      desc: 'The production site, live today for a real tuition centre and its students.'
    },
    term: {
      title: 'kvmtcc — deploy',
      lines: [
        { t: 'cmd',  x: 'next build' },
        { t: 'ok',   x: '✓ static export complete — 0 errors' },
        { t: 'dim',  x: '⟳ google sheets cms → content synced' },
        { t: 'ok',   x: '✓ ci/cd — github actions → pages' },
        { t: 'live', x: 'in production for a real client' }
      ]
    }
  }
];

const otherProjects = [
  {
    emoji: '📨',
    color: 'blue',
    title: 'Mailing Agent',
    repo: 'https://github.com/TGvenomYT/Mailing_Agent',
    description:
      'Python email automation suite: send mail with attachments, summarize unread Gmail with an LLM, flag spam with an ML classifier, and auto-draft email bodies.',
    tech: ['scikit-learn', 'SMTP/IMAP', 'LLM'],
    lang: 'Python'
  },
  {
    emoji: '🎙️',
    color: 'purple',
    title: 'Gemini Speech Assistant',
    repo: 'https://github.com/TGvenomYT/Gemini-chatbot',
    description:
      'A voice assistant that hears you, thinks with Gemini 2.5 Flash, and talks back — speech recognition in, gTTS out. Works across Windows, Linux and macOS.',
    tech: ['Gemini API', 'SpeechRecognition', 'gTTS'],
    lang: 'Python'
  },
  {
    emoji: '🤖',
    color: 'red',
    title: 'DeepSeek Jarvis',
    repo: 'https://github.com/TGvenomYT/Deepseek-Jarvis',
    description:
      'A Jarvis-style personal assistant powered by the DeepSeek API, with conversational voice interaction and 130+ selectable TTS voices.',
    tech: ['DeepSeek API', 'TTS', 'Voice'],
    lang: 'Python'
  },
  {
    emoji: '📚',
    color: 'yellow',
    title: 'Wikipedia Search Assistant',
    repo: 'https://github.com/TGvenomYT/Wikipedia-Search-Assistant',
    description:
      'Desktop GUI for Wikipedia: instant search, quick summaries, and distraction-free full-article reading without opening a browser.',
    tech: ['Tkinter', 'Wikipedia API'],
    lang: 'Python'
  },
  {
    emoji: '🔐',
    color: 'green',
    title: 'Password Manager MARK IV',
    repo: 'https://github.com/TGvenomYT/password-manager',
    description:
      'Local-first password vault with Fernet encryption and MySQL storage. Dual CLI + GUI interfaces, with the encryption key generated on first run.',
    tech: ['MySQL', 'Cryptography', 'GUI'],
    lang: 'Python'
  },
  {
    emoji: '📄',
    color: 'orange',
    title: 'This Portfolio',
    repo: 'https://github.com/TGvenomYT/website',
    description:
      'The page you are reading — vanilla HTML, CSS and JavaScript styled after Notion, resting on an old-paper desk. Live GitHub stats, zero frameworks.',
    tech: ['Vanilla JS', 'GitHub API'],
    lang: 'JavaScript'
  }
];

const skillGroups = [
  {
    emoji: '📊',
    name: 'Data science',
    chips: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Matplotlib', 'MySQL / SQL', 'Jupyter', 'EDA & feature engineering', 'Model evaluation']
  },
  {
    emoji: '🤖',
    name: 'AI engineering',
    chips: ['LangChain', 'Ollama · local LLMs', 'OpenAI · Gemini · DeepSeek', 'Pipecat voice pipelines', 'STT / TTS (Deepgram, Kokoro, gTTS)', 'RAG & embeddings', 'Prompt engineering']
  },
  {
    emoji: '🚢',
    name: 'Product & delivery',
    chips: ['FastAPI', 'REST & WebSockets', 'React · Next.js', 'Tailwind CSS', 'Docker', 'Git & GitHub Actions', 'Linux', 'CI/CD → GitHub Pages']
  }
];

const journey = [
  {
    year: '2024',
    title: 'Hello, world',
    desc: 'Started building in public: Python fundamentals, automation scripts, and a Fernet-encrypted password manager backed by MySQL — with both CLI and GUI.'
  },
  {
    year: '2025',
    title: 'From scripts to assistants',
    desc: 'Went deep on applied AI: a Gemini-powered speech assistant, a Wikipedia desktop app, and an email agent that summarizes your inbox and flags spam with an ML classifier.'
  },
  {
    year: '2026',
    title: 'Shipping AI products',
    desc: 'Leveled up to production: CAREN, a full-stack AI email command center; a real-time AI phone agent on Exotel; and a live client website with a Google-Sheets CMS and CI/CD. Now interning at <a class="ulink" href="https://github.com/HBDigital" target="_blank" rel="noopener">Hummingbird Digital</a>, building for real users.'
  }
];

const TOOLS = ['Python', 'Pandas', 'scikit-learn', 'FastAPI', 'LangChain', 'Ollama', 'React', 'MySQL'];

const ROTATOR_WORDS = ['decisions', 'products', 'agents', 'insight'];

// ----- NOTION TAG PALETTE -----

const TAG_COLORS = ['gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'];
const TAG_OVERRIDES = { Python: 'blue', JavaScript: 'yellow', React: 'blue', FastAPI: 'green' };

function tagColor(name) {
  if (TAG_OVERRIDES[name]) return TAG_OVERRIDES[name];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return TAG_COLORS[h % TAG_COLORS.length];
}

function tag(name, small = false) {
  return `<span class="tag t-${tagColor(name)}${small ? ' tag-sm' : ''}">${name}</span>`;
}

// ----- ICONS -----

const ICONS = {
  github: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
  external: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>',
  globe: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"/></svg>',
  triangle: '<svg class="jt-tri" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M9 5.5l8 6.5-8 6.5z"/></svg>'
};

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// =====================================================
// APP
// =====================================================

class Portfolio {
  constructor() {
    this.toastTimer = null;

    this.renderTools();
    this.renderFeatured();
    this.renderOther();
    this.renderSkills();
    this.renderJourney();

    // content is rendered after the browser's initial anchor jump,
    // so deep links (/#journey) need a re-anchor once layout settles
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView();
    }

    this.sidebar();
    this.share();
    this.quickFind();
    this.rotator();
    this.smoothScroll();
    this.activeSection();
    this.scrollReveal();
    this.countUpStats();
    this.copyButtons();
    this.clock();
    this.liveGitHub();

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    this.intro();
  }

  // ---------- Wax-sealed envelope intro ----------
  intro() {
    const scene = document.getElementById('envScene');
    if (!scene) return;
    if (REDUCED_MOTION) { scene.remove(); return; }

    const app = document.getElementById('app');
    const seal = document.getElementById('seal');
    const letter = document.getElementById('letter');
    const skip = document.getElementById('envSkip');
    let finished = false;
    let opened = false;

    app?.setAttribute('inert', '');

    const finish = () => {
      if (finished) return;
      finished = true;
      app?.removeAttribute('inert');
      document.removeEventListener('keydown', onKey);
      scene.remove();
      document.getElementById('top')?.focus({ preventScroll: true });
    };

    const skipNow = () => {
      if (finished) return;
      scene.classList.add('is-skipping');
      this.replayEntrance();
      setTimeout(finish, 300);
    };

    const onKey = e => { if (e.key === 'Escape') skipNow(); };
    document.addEventListener('keydown', onKey);
    skip?.addEventListener('click', skipNow);

    seal?.addEventListener('click', () => {
      if (opened || finished) return;
      opened = true;

      scene.classList.add('is-breaking');                            // wax cracks in two
      setTimeout(() => scene.classList.add('is-opening'), 430);      // flap lifts
      setTimeout(() => scene.classList.add('is-rising'), 1000);      // letter rises out
      setTimeout(() => scene.classList.add('is-unfolding'), 1650);   // letter unfolds
      setTimeout(() => {                                             // letter becomes the app
        const r = letter.getBoundingClientRect();
        const scale = Math.max(
          (window.innerWidth * 1.06) / r.width,
          (window.innerHeight * 1.08) / r.height
        );
        const dx = window.innerWidth / 2 - (r.left + r.width / 2);
        const dy = window.innerHeight / 2 - (r.top + r.height / 2);
        letter.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        scene.classList.add('is-expanding');
        this.replayEntrance();
      }, 2450);
      setTimeout(() => scene.classList.add('is-done'), 3080);        // crossfade to the site
      setTimeout(finish, 3450);
    });

    seal?.focus({ preventScroll: true });
  }

  // re-run the page-head entrance animation after the intro clears
  replayEntrance() {
    document.querySelectorAll('.anim').forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
  }

  // ---------- Toast ----------
  toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  async copyText(text, msg) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* no-op */ }
      ta.remove();
    }
    this.toast(msg);
  }

  // ---------- Render: tool pills ----------
  renderTools() {
    const root = document.getElementById('toolTags');
    if (!root) return;
    root.innerHTML = TOOLS.map(t => tag(t)).join('');
  }

  // ---------- Render: featured projects ----------
  renderFeatured() {
    const root = document.getElementById('featuredList');
    if (!root) return;
    root.innerHTML = featuredProjects.map(p => {
      const cmd = (p.term.lines.find(l => l.t === 'cmd') || p.term.lines[0]).x;
      const bookmark = p.live ? `
        <a class="bookmark" href="${p.live.url}" target="_blank" rel="noopener">
          <span class="bm-text">
            <span class="bm-title">${p.live.title}</span>
            <span class="bm-desc">${p.live.desc}</span>
            <span class="bm-url">${ICONS.globe}${p.live.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
          </span>
          <span class="bm-img"><img src="${p.live.img}" alt="Live preview of ${p.title}" loading="lazy"></span>
        </a>` : '';
      const liveLink = p.live
        ? `<a class="feat-link" href="${p.live.url}" target="_blank" rel="noopener">${ICONS.globe}<span>Live site</span>${ICONS.external}</a>`
        : '';
      return `
      <article class="feat reveal" id="${slug(p.title)}">
        <p class="feat-eyebrow">${p.eyebrow}</p>
        <h3 class="feat-title"><span class="h-emoji" aria-hidden="true">${p.emoji}</span><a href="${p.repo}" target="_blank" rel="noopener">${p.title}</a></h3>
        <p class="feat-desc">${p.description}</p>
        <div class="tags">${p.tech.map(t => tag(t)).join('')}</div>
        ${bookmark}
        <div class="code">
          <div class="code-bar">
            <span class="code-lang">shell</span>
            <span class="code-title">${p.term.title}</span>
            <button class="code-copy" type="button" data-copy="${cmd.replace(/"/g, '&quot;')}">Copy</button>
          </div>
          <div class="code-body">
            ${p.term.lines.map((l, i) => `<p class="t-${l.t}" style="--i:${i}">${l.x}</p>`).join('')}
          </div>
        </div>
        <div class="feat-links">
          <a class="feat-link" href="${p.repo}" target="_blank" rel="noopener">${ICONS.github}<span>View the code</span>${ICONS.external}</a>
          ${liveLink}
        </div>
      </article>`;
    }).join('');
  }

  // ---------- Render: gallery database ----------
  renderOther() {
    const root = document.getElementById('otherList');
    if (!root) return;
    root.innerHTML = otherProjects.map(p => `
      <a class="card reveal" id="${slug(p.title)}" href="${p.repo}" target="_blank" rel="noopener" aria-label="${p.title} on GitHub">
        <span class="card-cover cv-${p.color}" aria-hidden="true">${p.emoji}</span>
        <span class="card-body">
          <span class="card-title">${p.title}</span>
          <span class="card-desc">${p.description}</span>
          <span class="tags">${tag(p.lang, true)}${p.tech.slice(0, 2).map(t => tag(t, true)).join('')}</span>
        </span>
      </a>
    `).join('');
  }

  // ---------- Render: skills table ----------
  renderSkills() {
    const root = document.getElementById('skillsGrid');
    if (!root) return;
    root.innerHTML = `
      <thead>
        <tr>
          <th><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>Area</th>
          <th><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M7 7h.01M7 12h.01M7 17h.01M11 7h6M11 12h6M11 17h6"/></svg>Toolkit</th>
        </tr>
      </thead>
      <tbody>
        ${skillGroups.map(g => `
          <tr class="reveal">
            <td class="cell-area"><span class="h-emoji" aria-hidden="true">${g.emoji}</span>${g.name}</td>
            <td><span class="tags">${g.chips.map(c => tag(c, true)).join('')}</span></td>
          </tr>
        `).join('')}
      </tbody>`;
  }

  // ---------- Render: journey toggles ----------
  renderJourney() {
    const root = document.getElementById('journeyTrack');
    if (!root) return;
    root.innerHTML = journey.map(j => `
      <details class="jt reveal" open>
        <summary>${ICONS.triangle}<span class="jt-year">${j.year}</span> — ${j.title}</summary>
        <p>${j.desc}</p>
      </details>
    `).join('');
  }

  // ---------- Sidebar: drawer (mobile) + collapse (desktop) ----------
  sidebar() {
    const app = document.getElementById('app');
    const toggle = document.getElementById('navToggle');
    const collapse = document.getElementById('sidebarCollapse');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (!app || !toggle) return;

    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

    const closeDrawer = () => {
      app.classList.remove('sb-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    this.closeNav = closeDrawer;

    toggle.addEventListener('click', () => {
      if (isMobile()) {
        const open = app.classList.toggle('sb-open');
        toggle.setAttribute('aria-expanded', String(open));
      } else {
        app.classList.remove('sb-collapsed');
      }
    });

    collapse?.addEventListener('click', () => {
      if (isMobile()) closeDrawer();
      else app.classList.add('sb-collapsed');
    });

    backdrop?.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && app.classList.contains('sb-open')) closeDrawer();
    });

    window.addEventListener('resize', () => {
      if (!isMobile()) closeDrawer();
    }, { passive: true });
  }

  // ---------- Share = copy page link ----------
  share() {
    document.getElementById('shareBtn')?.addEventListener('click', () =>
      this.copyText(location.href, 'Page link copied to clipboard ✓'));
  }

  // ---------- Quick find (⌘K) — real search over sections & projects ----------
  quickFind() {
    const overlay = document.getElementById('qf');
    const input = document.getElementById('qfInput');
    const list = document.getElementById('qfList');
    if (!overlay || !input || !list) return;

    const sections = [
      { emoji: '🙋‍♂️', title: 'About me',                target: '#about' },
      { emoji: '🚀',   title: 'Featured projects',       target: '#projects' },
      { emoji: '🧰',   title: "More things I've built",  target: '#more-projects' },
      { emoji: '🛠️',  title: 'Skills',                  target: '#skills' },
      { emoji: '🧭',   title: 'Journey',                 target: '#journey' },
      { emoji: '✉️',   title: "Let's build something",   target: '#contact' }
    ].map(s => ({ ...s, sub: 'Section', hay: s.title.toLowerCase() }));

    const projects = [...featuredProjects, ...otherProjects].map(p => ({
      emoji: p.emoji,
      title: p.title,
      target: `#${slug(p.title)}`,
      sub: 'Project',
      hay: `${p.title} ${(p.tech || []).join(' ')} ${p.lang || ''}`.toLowerCase()
    }));

    const items = [...sections, ...projects];
    let filtered = items;
    let sel = 0;

    const render = () => {
      if (!filtered.length) {
        list.innerHTML = '<p class="qf-empty">No results — it\'s probably on GitHub</p>';
        return;
      }
      list.innerHTML = filtered.map((it, i) => `
        <button class="qf-item${i === sel ? ' sel' : ''}" type="button" data-i="${i}">
          <span class="qf-emoji" aria-hidden="true">${it.emoji}</span>
          <span class="qf-title">${it.title}</span>
          <span class="qf-sub">${it.sub}</span>
        </button>`).join('');
    };

    const updateSel = () => {
      list.querySelectorAll('.qf-item').forEach((el, i) => {
        el.classList.toggle('sel', i === sel);
        if (i === sel) el.scrollIntoView({ block: 'nearest' });
      });
    };

    const open = () => {
      this.closeNav?.();
      overlay.classList.add('open');
      input.value = '';
      filtered = items;
      sel = 0;
      render();
      input.focus();
    };
    const close = () => {
      overlay.classList.remove('open');
      input.blur();
    };

    const activate = it => {
      if (!it) return;
      close();
      const el = document.querySelector(it.target);
      if (!el) return;
      el.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth', block: 'start' });
      el.classList.remove('flash');
      void el.offsetWidth;
      el.classList.add('flash');
      setTimeout(() => el.classList.remove('flash'), 1500);
    };

    document.getElementById('sbSearch')?.addEventListener('click', open);

    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        overlay.classList.contains('open') ? close() : open();
      }
    });

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      filtered = q ? items.filter(it => it.hay.includes(q)) : items;
      sel = 0;
      render();
    });

    overlay.addEventListener('keydown', e => {
      if (e.key === 'Escape') { close(); return; }
      if (!filtered.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % filtered.length; updateSel(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + filtered.length) % filtered.length; updateSel(); }
      else if (e.key === 'Enter') { e.preventDefault(); activate(filtered[sel]); }
    });

    list.addEventListener('click', e => {
      const item = e.target.closest('.qf-item');
      if (item) activate(filtered[parseInt(item.dataset.i, 10)]);
    });
    list.addEventListener('mouseover', e => {
      const item = e.target.closest('.qf-item');
      if (!item) return;
      sel = parseInt(item.dataset.i, 10);
      updateSel();
    });

    overlay.addEventListener('mousedown', e => {
      if (e.target === overlay) close();
    });
  }

  // ---------- Word rotator ----------
  rotator() {
    const el = document.getElementById('rotator');
    if (!el || REDUCED_MOTION) return;
    let i = 0;
    setInterval(() => {
      el.classList.add('swap');
      setTimeout(() => {
        i = (i + 1) % ROTATOR_WORDS.length;
        el.textContent = ROTATOR_WORDS[i];
        el.classList.remove('swap');
      }, 260);
    }, 2800);
  }

  // ---------- Smooth anchor scroll ----------
  smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth', block: 'start' });
        this.closeNav?.();
      });
    });
  }

  // ---------- Active page in sidebar ----------
  activeSection() {
    const scroller = document.getElementById('pageScroll');
    const links = document.querySelectorAll('.sb-page');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!scroller || !sections.length) return;

    const onScroll = () => {
      const y = scroller.scrollTop + 150;
      let current = '';
      for (const s of sections) {
        if (s.offsetTop <= y) current = s.id;
      }
      // the last section is too short to reach the top of the viewport,
      // so scrolling to the bottom counts as being in it
      if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 60) {
        current = sections[sections.length - 1].id;
      }
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Reveal on scroll ----------
  scrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (REDUCED_MOTION) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => {
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'))
        : [];
      const idx = Math.max(siblings.indexOf(el), 0);
      el.style.transitionDelay = `${Math.min(idx, 6) * 60}ms`;
      io.observe(el);
    });

    // safety pass: deep links land mid-page, so reveal anything
    // already at or above the viewport once layout settles
    setTimeout(() => {
      els.forEach(el => {
        if (!el.classList.contains('visible') &&
            el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible');
        }
      });
    }, 80);
  }

  // ---------- Count-up stats ----------
  countUpStats() {
    const strip = document.getElementById('statStrip');
    if (!strip) return;
    const nums = strip.querySelectorAll('.stat-num');

    const animate = el => {
      const target = parseInt(el.dataset.count, 10) || 0;
      if (REDUCED_MOTION) { el.textContent = target; return; }
      const dur = 1100;
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      nums.forEach(animate);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(strip);
  }

  // ---------- Copy buttons (email + code blocks) ----------
  copyButtons() {
    const btn = document.getElementById('copyEmail');
    btn?.addEventListener('click', () =>
      this.copyText(btn.dataset.email, 'Email copied to clipboard ✓'));

    document.addEventListener('click', e => {
      const copy = e.target.closest('.code-copy');
      if (!copy) return;
      this.copyText(copy.dataset.copy, 'Command copied to clipboard ✓');
    });
  }

  // ---------- Footer IST clock ----------
  clock() {
    const footer = document.getElementById('localTime');
    if (!footer) return;
    const fmt = new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata'
    });
    const tick = () => { footer.textContent = `${fmt.format(new Date())} IST`; };
    tick();
    setInterval(tick, 30000);
  }

  // ---------- Relative date for the "Edited" label ----------
  relTime(date) {
    const days = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (days <= 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 7) return `${days} days ago`;
    const opts = { month: 'short', day: 'numeric' };
    if (date.getFullYear() !== new Date().getFullYear()) opts.year = 'numeric';
    return new Intl.DateTimeFormat('en', opts).format(date);
  }

  // ---------- Live GitHub stats ----------
  liveGitHub() {
    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data || !data.public_repos) return;
        const repoStat = document.getElementById('statRepos');
        if (repoStat) {
          repoStat.dataset.count = data.public_repos;
          // if the count-up already ran, update in place
          if (parseInt(repoStat.textContent, 10) > 0) {
            repoStat.textContent = data.public_repos;
          }
        }
        const ghRepos = document.getElementById('ghRepos');
        if (ghRepos) ghRepos.textContent = data.public_repos;
      })
      .catch(() => { /* offline or rate-limited — static fallbacks stay */ });

    // The "Edited" label shows the repo's real last-push date
    fetch(`https://api.github.com/repos/${GITHUB_USER}/website`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data || !data.pushed_at) return;
        const edited = document.getElementById('editedTime');
        if (edited) edited.textContent = `Edited ${this.relTime(new Date(data.pushed_at))}`;
      })
      .catch(() => { /* keep "Edited recently" */ });
  }
}

document.addEventListener('DOMContentLoaded', () => new Portfolio());
