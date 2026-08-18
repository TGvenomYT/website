/* =========================================================
   niranjan@arch — Hyprland desktop portfolio
   ========================================================= */

// ---------- UTIL ----------
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ---------- DATA ----------
const USER = 'niranjan';
const HOST = 'arch';
const GITHUB = 'https://github.com/TGvenomYT';

const PROJECTS = [
  {
    id: 'caren', emoji: '🧠', accent: 'var(--mauve)',
    eyebrow: 'Featured · AI + ML product',
    title: 'CAREN — AI Email Command Center',
    repo: 'https://github.com/TGvenomYT/CAREN-agent',
    live: 'https://tgvenomyt.github.io/CAREN-agent/',
    desc: 'A full-stack AI dashboard that runs your inbox: local LLM summarization via <b>Ollama</b>, a scikit-learn logistic-regression spam classifier, AI-composed outbound emails, and a real-time voice interface (Moonshine STT + Kokoro TTS).',
    tech: ['Python', 'FastAPI', 'scikit-learn', 'Ollama', 'LangChain', 'React']
  },
  {
    id: 'exotel', emoji: '☎️', accent: 'var(--peach)',
    eyebrow: 'Featured · Real-time voice AI',
    title: 'AI Phone Agent on Exotel',
    repo: 'https://github.com/TGvenomYT/Exotel-with-Pipecat',
    desc: 'An outbound calling bot that talks to real people over a real phone line. FastAPI orchestrates <b>Exotel telephony</b> with a <b>Pipecat pipeline</b> — Deepgram STT, OpenAI LLM, Cartesia TTS — bridged live over WebSockets.',
    tech: ['Python', 'Pipecat', 'FastAPI', 'Deepgram', 'OpenAI', 'WebSockets']
  },
  {
    id: 'kvm', emoji: '🏫', accent: 'var(--teal)',
    eyebrow: 'Featured · Production client',
    title: 'KVMTCC — Live Client Website',
    repo: 'https://github.com/TGvenomYT/KVM-Website',
    live: 'https://tgvenomyt.github.io/KVM-Website/',
    desc: 'A production marketing site for a real tuition centre. <b>Next.js 15</b> static export backed by a <b>Google-Sheets CMS</b> — non-technical admins update content, GitHub Actions deploys.',
    tech: ['Next.js 15', 'React 19', 'Tailwind', 'Framer Motion', 'GitHub Actions']
  },
  {
    id: 'mail', emoji: '📨', accent: 'var(--blue)',
    eyebrow: 'Automation',
    title: 'Mailing Agent',
    repo: 'https://github.com/TGvenomYT/Mailing_Agent',
    desc: 'Python email automation: send mail with attachments, summarize unread Gmail with an LLM, flag spam with an ML classifier, auto-draft bodies.',
    tech: ['scikit-learn', 'SMTP/IMAP', 'LLM']
  },
  {
    id: 'gemini', emoji: '🎙️', accent: 'var(--pink)',
    eyebrow: 'Voice AI',
    title: 'Gemini Speech Assistant',
    repo: 'https://github.com/TGvenomYT/Gemini-chatbot',
    desc: 'A voice assistant that hears you, thinks with Gemini 2.5 Flash, and talks back — speech recognition in, gTTS out. Cross-platform.',
    tech: ['Gemini API', 'SpeechRecognition', 'gTTS']
  },
  {
    id: 'jarvis', emoji: '🤖', accent: 'var(--red)',
    eyebrow: 'Voice AI',
    title: 'DeepSeek Jarvis',
    repo: 'https://github.com/TGvenomYT/Deepseek-Jarvis',
    desc: 'A Jarvis-style personal assistant powered by the DeepSeek API, with conversational voice interaction and 130+ TTS voices.',
    tech: ['DeepSeek API', 'TTS', 'Voice']
  },
  {
    id: 'wiki', emoji: '📚', accent: 'var(--yellow)',
    eyebrow: 'Desktop app',
    title: 'Wikipedia Search Assistant',
    repo: 'https://github.com/TGvenomYT/Wikipedia-Search-Assistant',
    desc: 'Desktop GUI for Wikipedia — instant search, quick summaries, distraction-free full-article reading.',
    tech: ['Tkinter', 'Wikipedia API']
  },
  {
    id: 'pwd', emoji: '🔐', accent: 'var(--green)',
    eyebrow: 'Security',
    title: 'Password Manager MK IV',
    repo: 'https://github.com/TGvenomYT/password-manager',
    desc: 'Local-first password vault with Fernet encryption and MySQL storage. Dual CLI + GUI, key generated on first run.',
    tech: ['MySQL', 'Cryptography', 'GUI']
  }
];

// ---------- WM CORE ----------
const WM = {
  windows: new Map(),
  z: 20,
  focused: null,
  currentWs: 1,
  spawn(id, def) {
    if (this.windows.has(id)) { this.focus(id); this.windows.get(id).el.classList.remove('minimized'); return; }
    const win = createWindow(id, def);
    win.ws = this.currentWs;
    win.el.dataset.ws = win.ws;
    win.el.classList.add('on-ws');
    this.windows.set(id, win);
    document.getElementById('windows').appendChild(win.el);
    this.focus(id);
    updateDockState();
    renderWorkspaces();
  },
  get(id) { return this.windows.get(id); },
  focus(id) {
    const w = this.windows.get(id); if (!w) return;
    this.z += 1;
    w.el.style.zIndex = this.z;
    this.windows.forEach((v, k) => v.el.classList.toggle('blurred', k !== id));
    this.focused = id;
    document.getElementById('wb-title').textContent = w.def.title || id;
  },
  close(id) {
    const w = this.windows.get(id); if (!w) return;
    w.el.classList.add('closing');
    setTimeout(() => {
      w.el.remove();
      this.windows.delete(id);
      updateDockState();
      renderWorkspaces();
    }, 160);
  },
  toggleMax(id) {
    const w = this.windows.get(id); if (!w) return;
    const el = w.el;
    if (!el.classList.contains('maximized')) {
      w._prev = { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height };
      el.classList.add('maximized');
      Object.assign(el.style, { left: '10px', top: '54px', width: 'calc(100vw - 20px)', height: 'calc(100vh - 130px)' });
    } else {
      el.classList.remove('maximized');
      Object.assign(el.style, w._prev || {});
    }
  },
  minimize(id) {
    const w = this.windows.get(id); if (!w) return;
    w.el.classList.add('minimized');
    updateDockState();
  },
  moveToWs(id, ws) {
    const w = this.windows.get(id); if (!w) return;
    w.ws = ws; w.el.dataset.ws = ws;
    applyWsVisibility(); renderWorkspaces();
    notify('Window moved', `Sent to workspace ${ws}`);
  },
  switchWs(ws) {
    if (ws === this.currentWs) return;
    this.currentWs = ws;
    applyWsVisibility();
    renderWorkspaces();
  }
};

function applyWsVisibility() {
  WM.windows.forEach(w => w.el.classList.toggle('on-ws', w.ws === WM.currentWs));
}
function renderWorkspaces() {
  const host = document.getElementById('wb-workspaces');
  if (!host) return;
  const occupied = new Set([...WM.windows.values()].map(w => w.ws));
  host.innerHTML = [1,2,3,4].map(n => {
    const cls = ['ws', n === WM.currentWs ? 'active' : '', occupied.has(n) ? 'has-window' : ''].filter(Boolean).join(' ');
    return `<button class="${cls}" data-ws="${n}" title="Workspace ${n}">${n}</button>`;
  }).join('');
  host.querySelectorAll('[data-ws]').forEach(b => b.addEventListener('click', () => WM.switchWs(+b.dataset.ws)));
}

function createWindow(id, def) {
  const el = document.createElement('div');
  el.className = 'win';
  const stage = document.getElementById('windows');
  const stageRect = stage.getBoundingClientRect();
  const w = def.width || 720, h = def.height || 480;
  const cx = Math.max(20, Math.min(stageRect.width - w - 20, (stageRect.width - w) / 2 + (WM.windows.size * 26 - 60)));
  const cy = Math.max(60, Math.min(stageRect.height - h - 60, (stageRect.height - h) / 2 + (WM.windows.size * 26 - 40)));
  Object.assign(el.style, { left: cx + 'px', top: cy + 'px', width: w + 'px', height: h + 'px' });

  el.innerHTML = `
    <header class="win-header" data-drag>
      <div class="win-traffic">
        <button class="tl close" aria-label="close"></button>
        <button class="tl min"   aria-label="minimize"></button>
        <button class="tl max"   aria-label="maximize"></button>
      </div>
      <div class="win-title"><b>${def.title || id}</b> <span style="opacity:.6">— ${def.subtitle || id}</span></div>
      <div style="width:56px"></div>
    </header>
    <div class="win-body" data-body></div>
    <div class="win-resize" data-resize></div>
  `;

  const body = el.querySelector('[data-body]');
  if (def.mount) def.mount(body, () => WM.close(id));

  // controls
  el.querySelector('.tl.close').addEventListener('click', () => WM.close(id));
  el.querySelector('.tl.min').addEventListener('click', () => WM.minimize(id));
  el.querySelector('.tl.max').addEventListener('click', () => WM.toggleMax(id));
  el.querySelector('.win-header').addEventListener('dblclick', (e) => {
    if (e.target.closest('.tl')) return;
    WM.toggleMax(id);
  });

  makeDraggable(el);
  makeResizable(el);
  el.addEventListener('mousedown', () => WM.focus(id), true);

  return { el, def };
}

function makeDraggable(el) {
  const handle = el.querySelector('[data-drag]');
  let sx, sy, ox, oy, dragging = false, snapZone = null;
  const preview = () => document.getElementById('snap-preview');
  function detectSnap(x, y) {
    const W = window.innerWidth, H = window.innerHeight;
    const EDGE = 20;
    if (y < 54 + EDGE) return 'top';
    if (x < EDGE) return 'left';
    if (x > W - EDGE) return 'right';
    return null;
  }
  function snapRect(zone) {
    const topY = 46, topH = 'calc(100vh - 130px)';
    if (zone === 'top')   return { left: '10px', top: '54px',  width: 'calc(100vw - 20px)', height: topH };
    if (zone === 'left')  return { left: '10px', top: '54px',  width: 'calc(50vw - 15px)',  height: topH };
    if (zone === 'right') return { left: 'calc(50vw + 5px)', top: '54px', width: 'calc(50vw - 15px)', height: topH };
    return null;
  }
  handle.addEventListener('mousedown', (e) => {
    if (e.target.closest('.tl')) return;
    dragging = true;
    sx = e.clientX; sy = e.clientY;
    ox = el.offsetLeft; oy = el.offsetTop;
    document.body.style.userSelect = 'none';
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (el.classList.contains('maximized') && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      const id = [...WM.windows.entries()].find(([, w]) => w.el === el)?.[0];
      const w = id ? WM.windows.get(id) : null;
      const prev = w?._prev || {};
      const maxW = el.offsetWidth;
      const restoreW = parseInt(prev.width) || 720;
      const restoreH = parseInt(prev.height) || 480;
      el.classList.remove('maximized');
      Object.assign(el.style, { width: restoreW + 'px', height: restoreH + 'px' });
      const ratio = (e.clientX - el.offsetLeft) / maxW;
      ox = Math.round(e.clientX - ratio * restoreW);
      oy = Math.round(e.clientY - 18);
      sx = e.clientX; sy = e.clientY;
      el.style.left = ox + 'px';
      el.style.top  = Math.max(46, oy) + 'px';
      return;
    }
    el.style.left = Math.max(0, ox + dx) + 'px';
    el.style.top  = Math.max(46, oy + dy) + 'px';
    // snap detection
    const zone = detectSnap(e.clientX, e.clientY);
    const pv = preview();
    if (zone && zone !== snapZone) {
      snapZone = zone;
      const r = snapRect(zone);
      Object.assign(pv.style, r);
      pv.classList.add('show');
    } else if (!zone && snapZone) {
      snapZone = null;
      pv.classList.remove('show');
    }
  });
  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.userSelect = '';
    const pv = preview();
    if (snapZone) {
      const id = [...WM.windows.entries()].find(([, w]) => w.el === el)?.[0];
      const w = id ? WM.windows.get(id) : null;
      if (w) w._prev = { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height };
      Object.assign(el.style, snapRect(snapZone));
      snapZone = null;
    }
    pv.classList.remove('show');
  });
}
function makeResizable(el) {
  const grip = el.querySelector('[data-resize]');
  let sx, sy, ow, oh, r = false;
  grip.addEventListener('mousedown', (e) => {
    r = true; sx = e.clientX; sy = e.clientY;
    ow = el.offsetWidth; oh = el.offsetHeight;
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!r) return;
    el.style.width  = Math.max(320, ow + e.clientX - sx) + 'px';
    el.style.height = Math.max(220, oh + e.clientY - sy) + 'px';
  });
  window.addEventListener('mouseup', () => { r = false; });
}

function updateDockState() {
  document.querySelectorAll('.dock-btn[data-open]').forEach(b => {
    b.classList.toggle('active', WM.windows.has(b.dataset.open));
  });
}

// ---------- APPS ----------
const APPS = {
  terminal: {
    title: 'niranjan@arch: ~',
    subtitle: 'ghostty',
    width: 820, height: 500,
    mount: mountTerminal
  },
  projects: {
    title: 'Projects',
    subtitle: '~/projects',
    width: 900, height: 560,
    mount: mountProjects
  },
  about: {
    title: 'about.md',
    subtitle: 'nvim',
    width: 720, height: 560,
    mount: mountAbout
  },
  contact: {
    title: 'Contact',
    subtitle: '~/contact',
    width: 560, height: 420,
    mount: mountContact
  },
  files: {
    title: 'Files',
    subtitle: '~/',
    width: 760, height: 500,
    mount: mountFiles
  },
  neofetch: {
    title: 'neofetch',
    subtitle: 'fastfetch',
    width: 820, height: 460,
    mount: (body, close) => { body.innerHTML = '<div class="term" id="nf-term"></div>'; renderNeofetch(body.querySelector('.term')); }
  },
  playground: {
    title: 'Dataset Playground',
    subtitle: 'sklearn-live',
    width: 960, height: 620,
    mount: mountPlayground
  },
  editor: {
    title: 'Text Editor',
    subtitle: 'nvim',
    width: 780, height: 540,
    mount: mountEditor
  },
  htop: {
    title: 'htop — System Monitor',
    subtitle: 'live',
    width: 720, height: 520,
    mount: mountHtop
  },
  settings: {
    title: 'Settings',
    subtitle: 'hyprctl',
    width: 640, height: 480,
    mount: mountSettings
  }
};

function openApp(id) {
  if (!APPS[id]) return;
  WM.spawn(id, APPS[id]);
}

// ---------- TERMINAL ----------
function mountTerminal(body, close) {
  body.innerHTML = `<div class="term" data-term tabindex="0"></div>`;
  const term = body.querySelector('[data-term]');
  const state = { history: [], histIdx: -1, cwd: HOME };

  function print(html, cls = 'out') {
    const div = document.createElement('div');
    div.className = 'term-line ' + cls;
    div.innerHTML = html;
    term.appendChild(div);
    scroll();
  }
  function scroll() { term.scrollTop = term.scrollHeight; }

  function prompt() {
    const row = document.createElement('div');
    row.className = 'term-prompt';
    row.innerHTML = `
      <span class="p1">${USER}</span><span class="dim">@</span><span class="p2">${HOST}</span>
      <span class="dim">:</span><span class="p3">${displayPath(state.cwd)}</span>
      <span class="arrow">❯</span>
      <input class="term-input" autocomplete="off" autocapitalize="off" spellcheck="false" />
    `;
    term.appendChild(row);
    const input = row.querySelector('input');
    input.focus();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        input.disabled = true;
        row.querySelector('.arrow').after(document.createTextNode(' ' + cmd));
        input.remove();
        if (cmd) { state.history.push(cmd); state.histIdx = state.history.length; run(cmd); }
        prompt();
      } else if (e.key === 'ArrowUp') {
        if (state.histIdx > 0) { state.histIdx--; input.value = state.history[state.histIdx]; }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (state.histIdx < state.history.length - 1) { state.histIdx++; input.value = state.history[state.histIdx]; }
        else { state.histIdx = state.history.length; input.value = ''; }
        e.preventDefault();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const c = COMMANDS.filter(k => k.startsWith(input.value));
        if (c.length === 1) input.value = c[0] + ' ';
      } else if (e.ctrlKey && e.key === 'l') { e.preventDefault(); term.innerHTML = ''; prompt(); banner(); }
      else if (e.ctrlKey && e.key === 'c') { e.preventDefault(); input.value = ''; }
    });
    scroll();
  }

  term.addEventListener('click', () => {
    const lastInput = term.querySelector('.term-input');
    if (lastInput) lastInput.focus();
  });

  function banner() {
    print(`<span class="mauve">ghostty</span> <span class="dim">1.0.0</span> · <b>Arch Linux</b> <span class="dim">(rolling)</span> · Hyprland session`, 'info');
    print(`Last login: ${new Date().toDateString()} on tty1`, 'dim');
    print(`Type <b>help</b> for commands. Try <b>projects</b>, <b>play datasets</b>, <b>neofetch</b>, <b>matrix</b>, <b>fortune</b>, <b>cowsay hi</b>.`, 'dim');
  }

  function run(raw) {
    const [cmd, ...args] = raw.split(/\s+/);
    const fn = CMDS[cmd];
    if (!fn) { print(`zsh: command not found: <b>${escapeHtml(cmd)}</b>`, 'err'); return; }
    fn(args, print, close, state);
  }

  banner();
  prompt();
}

const COMMANDS = ['help','ls','cat','tree','projects','play','open','whoami','neofetch','clear','pwd','cd','uname','date','echo','sudo','man','github','contact','skills','exit','matrix','fortune','cowsay','coffee','weather','htop','ps','joke','banner','ai','pacman','history','uptime','mkdir','touch','rm','nano','edit','notify-send','hyprctl','workspace','settings','screenshot'];

const CMDS = {
  help: (a, p) => {
    p(`<b class="mauve">available commands</b> <span class="dim">— tab-complete works</span>`);
    const list = [
      ['help', 'this message'],
      ['projects', 'list all projects'],
      ['open <app|path>', 'launch app or open a file/dir'],
      ['play datasets', 'launch the dataset playground'],
      ['ls / tree / pwd / cd', 'browse the filesystem'],
      ['cat <file>', 'read a file'],
      ['nano / edit <file>', 'open in the text editor (writes save to VFS)'],
      ['mkdir / touch / rm', 'create / touch / remove files'],
      ['notify-send <t> <b>', 'send a desktop notification'],
      ['hyprctl [workspaces|clients]', 'inspect the compositor'],
      ['workspace <1-4>', 'switch workspace (also Super+1..4)'],
      ['settings', 'open the Settings app'],
      ['screenshot', 'capture the screen to ~/Pictures'],
      ['htop', 'system monitor (also GUI: open htop)'],
      ['neofetch', 'system info with Arch logo'],
      ['whoami / skills', 'about me / tech stack'],
      ['contact / github', 'contact card / open GitHub'],
      ['ai <prompt>', 'ask the resident AI (offline demo)'],
      ['matrix / fortune / joke', 'flair'],
      ['cowsay / coffee / weather', 'more flair'],
      ['pacman -Ss <q>', 'search packages (fake but fun)'],
      ['history / uptime / ps', 'session info'],
      ['banner <text> / date / uname / echo', 'the usual'],
      ['clear / exit', 'clear terminal / close it'],
    ];
    list.forEach(([k, v]) => p(`  <span class="teal">${k.padEnd(22, ' ')}</span> <span class="dim">${v}</span>`));
  },
  ls: (args, p, c, s) => {
    const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const target = args.find(a => !a.startsWith('-'));
    const path = normalizePath(target, s.cwd);
    const node = getNode(path);
    if (!node) return p(`ls: cannot access '${escapeHtml(target || '')}': No such file or directory`, 'err');
    if (node.type === 'file') return p(path.split('/').pop());
    const entries = Object.entries(node.children)
      .filter(([n]) => showAll || !n.startsWith('.'))
      .sort(([a, an], [b, bn]) => (bn.type === 'dir') - (an.type === 'dir') || a.localeCompare(b));
    const html = entries.map(([n, ch]) => {
      const cls = ch.type === 'dir' ? 'f-dir' : n.startsWith('.') ? 'dim' : 'f-md';
      const suf = ch.type === 'dir' ? '/' : '';
      return `<span class="${cls}">${n}${suf}</span>`;
    }).join('  ');
    p(`<div class="k-list">${html}</div>`);
  },
  pwd: (a, p, c, s) => p(s.cwd),
  cd: (a, p, c, s) => {
    const path = normalizePath(a[0] || '~', s.cwd);
    const node = getNode(path);
    if (!node) return p(`cd: no such file or directory: ${escapeHtml(a[0] || '')}`, 'err');
    if (node.type !== 'dir') return p(`cd: not a directory: ${escapeHtml(a[0])}`, 'err');
    s.cwd = path;
  },
  cat: (args, p, c, s) => {
    if (!args[0]) return p('cat: missing file', 'err');
    const path = normalizePath(args[0], s.cwd);
    const node = getNode(path);
    if (!node) return p(`cat: ${escapeHtml(args[0])}: No such file or directory`, 'err');
    if (node.type === 'dir') return p(`cat: ${escapeHtml(args[0])}: Is a directory`, 'err');
    p(node.content, node.catCls || 'out');
  },
  projects: (a, p) => {
    p(`<b class="mauve">projects/</b> <span class="dim">(${PROJECTS.length})</span>`);
    PROJECTS.forEach(pr => {
      p(`  <span class="peach">${pr.emoji}</span>  <b>${pr.title}</b>`);
      p(`      <span class="dim">${stripHtml(pr.desc).slice(0, 110)}…</span>`);
      p(`      <a href="${pr.repo}" target="_blank" rel="noopener">${pr.repo}</a>${pr.live ? ` · <a href="${pr.live}" target="_blank" rel="noopener">live</a>` : ''}`);
    });
    p(`\nTip: <b>open projects</b> for the GUI, or <b>play datasets</b>.`, 'dim');
  },
  play: (args, p) => {
    if (args[0] === 'datasets' || args[0] === 'playground') { openApp('playground'); p('launching dataset playground…', 'ok'); return; }
    p('usage: play datasets', 'err');
  },
  open: (args, p, c, s) => {
    const target = args[0];
    if (!target) return p('usage: open <path|app>', 'err');
    // 1. named app shortcut
    if (APPS[target]) { openApp(target); return p(`opened ${target}`, 'ok'); }
    // 2. vfs path
    const path = normalizePath(target, s.cwd);
    const node = getNode(path);
    if (!node) return p(`open: no such file or app: ${escapeHtml(target)}`, 'err');
    openFsItem(path);
    p(`opened ${displayPath(path)}`, 'ok');
  },
  whoami: (a, p) => p('niranjan — data scientist & AI engineer · currently interning at Hummingbird Digital', 'mauve'),
  skills: (a, p) => {
    p(`<b class="mauve">skills</b>`);
    p(`  <span class="teal">data</span>       Python · Pandas · NumPy · scikit-learn · SQL · Jupyter · EDA`);
    p(`  <span class="teal">ai</span>         LangChain · Ollama · OpenAI · Gemini · Pipecat · RAG · embeddings`);
    p(`  <span class="teal">product</span>    FastAPI · React · Next.js · Tailwind · Docker · GitHub Actions`);
    p(`  <span class="teal">voice</span>      Deepgram · Kokoro · gTTS · Cartesia · Moonshine · WebSockets`);
  },
  contact: (a, p) => { openApp('contact'); p('opened contact card', 'ok'); },
  github: (a, p) => { window.open(GITHUB, '_blank'); p(`opening ${GITHUB}…`, 'info'); },
  neofetch: (a, p) => {
    const term = document.querySelector('.term');
    const holder = document.createElement('div');
    holder.className = 'term-line';
    term.appendChild(holder);
    renderNeofetch(holder);
    requestAnimationFrame(() => { term.scrollTop = holder.offsetTop - 8; });
  },
  clear: (a, p, c, s) => {
    const t = document.querySelector('.term'); if (t) t.innerHTML = '';
  },
  uname: (a, p) => p('Linux arch 6.9.0-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'),
  date: (a, p) => p(new Date().toString()),
  echo: (a, p) => p(a.join(' ')),
  sudo: (a, p) => p(`niranjan is not in the sudoers file. This incident will be reported. <span class="dim">(nice try)</span>`, 'err'),
  man: (a, p) => p(`No manual entry for ${escapeHtml(a[0] || '')}. Try <b>help</b>.`, 'err'),
  exit: (a, p, close) => { close(); },

  // ---- fun / extras ----
  tree: (a, p, c, s) => {
    const start = normalizePath(a[0] || '.', s.cwd);
    const node = getNode(start);
    if (!node) return p(`tree: ${escapeHtml(a[0])}: No such directory`, 'err');
    let dirs = 0, files = 0;
    const lines = [`<span class="blue">${displayPath(start)}</span>`];
    const walk = (n, prefix) => {
      if (n.type !== 'dir') return;
      const entries = Object.entries(n.children).filter(([nn]) => !nn.startsWith('.'));
      entries.forEach(([name, child], i) => {
        const last = i === entries.length - 1;
        const branch = last ? '└── ' : '├── ';
        if (child.type === 'dir') { dirs++; lines.push(`${prefix}${branch}<span class="blue">${name}/</span>`); walk(child, prefix + (last ? '    ' : '│   ')); }
        else { files++; lines.push(`${prefix}${branch}${name}`); }
      });
    };
    walk(node, '');
    lines.push('', `<span class="dim">${dirs} directories, ${files} files</span>`);
    p(lines.join('\n'));
  },
  history: (a, p, c, s) => {
    if (!s.history.length) return p('(empty)', 'dim');
    s.history.forEach((h, i) => p(`  <span class="dim">${String(i + 1).padStart(4)}</span>  ${escapeHtml(h)}`));
  },
  uptime: (a, p) => {
    const s = Math.floor(performance.now() / 1000);
    p(` ${new Date().toTimeString().slice(0, 5)}  up ${s}s,  1 user,  load average: 0.42, 0.13, 0.07`);
  },
  ps: (a, p) => {
    p(`  <b>PID</b> TTY          TIME CMD`);
    p(`  1337 tty1     00:00:04 hyprland`);
    p(`  1338 tty1     00:00:02 ghostty`);
    p(`  1420 tty1     00:00:01 zsh`);
    p(`  1999 tty1     00:00:00 curiosity`);
    p(`  2077 tty1     00:00:00 ps`);
  },
  htop: (a, p) => {
    const bar = (pct, color) => {
      const n = Math.round(pct / 5);
      return `<span class="${color}">${'█'.repeat(n)}</span><span class="dim">${'░'.repeat(20 - n)}</span> ${pct}%`;
    };
    p(`<b>CPU</b>  ${bar(42, 'green')}`);
    p(`<b>MEM</b>  ${bar(31, 'blue')}`);
    p(`<b>SWP</b>  ${bar(4, 'mauve')}`);
    p(`  <b>PID USER      %CPU %MEM COMMAND</b>`);
    p(` 1337 niranjan   12.4  8.1 hyprland`);
    p(` 1338 niranjan    6.2  3.4 ghostty`);
    p(` 1420 niranjan    2.1  1.0 zsh`);
    p(` 1999 niranjan   99.9 42.0 <span class="peach">curiosity</span>`);
  },
  pacman: (a, p) => {
    if (a[0] === '-Ss' && a[1]) {
      const q = a.slice(1).join(' ');
      p(`<span class="green">extra/</span>${q}-tools <span class="dim">1.0-1</span>`);
      p(`    A community-maintained ${q} toolkit.`);
      p(`<span class="green">aur/</span>${q}-git <span class="dim">r420.deadbeef-1</span>`);
      p(`    Bleeding-edge ${q} from git HEAD.`);
      return;
    }
    p('usage: pacman -Ss <query>', 'err');
  },
  fortune: (a, p) => {
    const q = [
      'Data is the new oil — but you still have to refine it.',
      'A model is only as good as the question you point it at.',
      'Premature optimization is the root of all evil. — Knuth',
      '"It works on my machine" is not a deployment strategy.',
      'The best code is the code you did not have to write.',
      'Machines learn. Engineers ship.',
    ];
    p(`💭 <i>${q[Math.floor(Math.random() * q.length)]}</i>`, 'mauve');
  },
  joke: (a, p) => {
    const j = [
      'There are 10 kinds of people — those who understand binary and those who don\'t.',
      'A SQL query walks into a bar, walks up to two tables and asks: "Can I JOIN you?"',
      'Why do programmers prefer dark mode? Because light attracts bugs.',
      'I would tell you a UDP joke, but you might not get it.',
      'AI walked into a bar. Bartender said "we don\'t serve your kind". AI replied: "That\'s okay, I already trained on your reviews."',
    ];
    p(`😄 ${j[Math.floor(Math.random() * j.length)]}`, 'yellow');
  },
  cowsay: (a, p) => {
    const msg = a.join(' ') || 'moo';
    const line = '─'.repeat(msg.length + 2);
    p(`<pre style="margin:0;line-height:1.1"> ╭${line}╮
 │ ${escapeHtml(msg)} │
 ╰${line}╯
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||</pre>`);
  },
  coffee: (a, p) => {
    p(`<pre style="margin:0;line-height:1.1" class="peach">    ( (
     ) )
  ........
  |      |]   <span class="dim">brewing… ☕</span>
  \\      /
   \`----'</pre>`);
    setTimeout(() => p('☕ served. good luck out there.', 'ok'), 600);
  },
  weather: (a, p) => {
    const city = a.join(' ') || 'Chennai';
    p(`<b>${city}</b>: 🌤  29°C · humidity 68% · wind 12km/h · <span class="dim">perfect coding weather</span>`);
  },
  banner: (a, p) => {
    const t = (a.join(' ') || 'niranjan').toUpperCase();
    p(`<pre class="mauve" style="margin:0;line-height:1;font-weight:700;letter-spacing:2px">
╔${'═'.repeat(t.length + 4)}╗
║  ${t}  ║
╚${'═'.repeat(t.length + 4)}╝</pre>`);
  },
  ai: (a, p) => {
    const prompt = a.join(' ');
    if (!prompt) return p('usage: ai <your prompt>', 'err');
    p(`<span class="mauve">◆ ai</span> thinking…`, 'dim');
    const replies = [
      `On "${prompt}" — start with the data, not the model. 80% of the win is EDA.`,
      `"${prompt}" — try a baseline first (logistic regression), then justify complexity.`,
      `Re: "${prompt}" — ship the ugly v0 today. Iterate with real user signal.`,
      `"${prompt}"? Feature engineering usually beats fancier architectures on tabular data.`,
    ];
    setTimeout(() => p(`<span class="teal">◆</span> ${replies[Math.floor(Math.random() * replies.length)]}`, 'out'), 500);
  },
  matrix: (a, p) => {
    const term = document.querySelector('.term');
    const box = document.createElement('div');
    box.className = 'term-line';
    box.style.cssText = 'font-family:monospace;color:#7bff7b;white-space:pre;line-height:1.1';
    term.appendChild(box);
    const chars = 'ｱｲｳｴｵｶｷｸｹｺ01<>[]{}#$%&';
    let ticks = 0;
    const iv = setInterval(() => {
      let out = '';
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 60; c++) out += chars[Math.floor(Math.random() * chars.length)];
        out += '\n';
      }
      box.textContent = out;
      if (++ticks > 40) { clearInterval(iv); p('— disconnected from the matrix.', 'dim'); }
    }, 90);
  },

  // ---- filesystem writes ----
  mkdir: (a, p, c, s) => {
    if (!a[0]) return p('mkdir: missing operand', 'err');
    const path = normalizePath(a[0], s.cwd);
    const parent = getNode(path.replace(/\/[^/]+$/, '') || '/');
    const name = path.split('/').pop();
    if (!parent || parent.type !== 'dir') return p(`mkdir: cannot create '${escapeHtml(a[0])}': No such parent`, 'err');
    if (parent.children[name]) return p(`mkdir: cannot create '${escapeHtml(a[0])}': File exists`, 'err');
    parent.children[name] = D({});
    p(`created directory <b class="blue">${displayPath(path)}</b>`, 'ok');
  },
  touch: (a, p, c, s) => {
    if (!a[0]) return p('touch: missing operand', 'err');
    const path = normalizePath(a[0], s.cwd);
    const parent = getNode(path.replace(/\/[^/]+$/, '') || '/');
    const name = path.split('/').pop();
    if (!parent || parent.type !== 'dir') return p(`touch: cannot touch '${escapeHtml(a[0])}': No such parent`, 'err');
    if (!parent.children[name]) parent.children[name] = F('', { icon: '📄', openApp: 'editor' });
    p(`touched <b>${displayPath(path)}</b>`, 'ok');
  },
  rm: (a, p, c, s) => {
    const recursive = a.some(x => x === '-r' || x === '-rf' || x === '-fr');
    const target = a.find(x => !x.startsWith('-'));
    if (!target) return p('rm: missing operand', 'err');
    const path = normalizePath(target, s.cwd);
    const parent = getNode(path.replace(/\/[^/]+$/, '') || '/');
    const name = path.split('/').pop();
    if (!parent || !parent.children[name]) return p(`rm: cannot remove '${escapeHtml(target)}': No such file or directory`, 'err');
    if (parent.children[name].type === 'dir' && !recursive) return p(`rm: cannot remove '${escapeHtml(target)}': Is a directory (use -r)`, 'err');
    delete parent.children[name];
    p(`removed <b>${displayPath(path)}</b>`, 'ok');
  },
  nano: (a, p, c, s) => {
    if (!a[0]) return p('usage: nano <file>', 'err');
    const path = normalizePath(a[0], s.cwd);
    let node = getNode(path);
    if (!node) {
      // create new empty file
      const parent = getNode(path.replace(/\/[^/]+$/, '') || '/');
      const name = path.split('/').pop();
      if (!parent || parent.type !== 'dir') return p(`nano: cannot open '${escapeHtml(a[0])}'`, 'err');
      parent.children[name] = F('', { icon: '📄', openApp: 'editor' });
    } else if (node.type === 'dir') return p(`nano: ${escapeHtml(a[0])}: Is a directory`, 'err');
    openEditor(path);
    p(`opened <b>${displayPath(path)}</b> in editor`, 'ok');
  },
  edit: (a, p, c, s) => CMDS.nano(a, p, c, s),

  // ---- notifications & desktop ----
  'notify-send': (a, p) => {
    const title = a[0] || 'Notification';
    const body = a.slice(1).join(' ') || '';
    notify(title, body);
    p(`sent notification: <b class="mauve">${escapeHtml(title)}</b>`, 'ok');
  },
  hyprctl: (a, p) => {
    if (a[0] === 'workspaces') {
      p(`Workspaces: <b>4</b>, active: <b class="mauve">${WM.currentWs}</b>`);
      [1,2,3,4].map(n => {
        const wins = [...WM.windows.values()].filter(w => w.ws === n);
        p(`  workspace <b>${n}</b>${n === WM.currentWs ? ' <span class="green">(active)</span>' : ''} — ${wins.length} window(s)`);
      });
      return;
    }
    if (a[0] === 'clients') {
      [...WM.windows.entries()].forEach(([id, w]) => p(`  <b class="teal">${id}</b> · ws ${w.ws} · ${w.def.title}`));
      if (!WM.windows.size) p('(no clients)', 'dim');
      return;
    }
    if (a[0] === 'dispatch' && a[1] === 'workspace') { WM.switchWs(+a[2] || 1); return p(`switched to workspace ${a[2]}`, 'ok'); }
    p('usage: hyprctl [workspaces|clients|dispatch workspace <n>]', 'err');
  },
  workspace: (a, p) => {
    const n = +a[0];
    if (n >= 1 && n <= 4) { WM.switchWs(n); return p(`workspace ${n}`, 'ok'); }
    p('usage: workspace <1-4>', 'err');
  },
  settings: (a, p) => { openApp('settings'); p('opening settings…', 'ok'); },
  screenshot: (a, p) => {
    const name = `Screenshot-${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.png`;
    const pics = getNode(HOME + '/Pictures');
    if (pics) pics.children[name] = F('<i class="dim">(binary png data)</i>', { icon: '🖼️' });
    flashScreen();
    notify('Screenshot captured', `Saved to ~/Pictures/${name}`);
    p(`saved <b>~/Pictures/${name}</b>`, 'ok');
  }
};

const ABOUT_TXT = `<pre class="term-line" style="margin:0">
<span class="mauve"># about</span>

Hi — I'm <b>Niranjan</b>. I build AI products.

I write Python for a living: scikit-learn for the classical stuff,
LangChain / Ollama / Pipecat for the LLM-shaped stuff, FastAPI to
glue it into real services, React when it needs a face.

Right now I'm interning at <span class="teal">Hummingbird Digital</span>,
shipping code that real users touch.

<span class="mauve"># now</span>
- production AI email agent (<b>CAREN</b>)
- real-time voice bot on Exotel + Pipecat
- a live client website with a Google-Sheets CMS

<span class="mauve"># reach me</span>
type <b>contact</b> or <b>open contact</b>.
</pre>`;

const RESUME_TXT = `<pre class="term-line" style="margin:0">
NIRANJAN — Data Scientist & AI Engineer
════════════════════════════════════════

EXPERIENCE
  2026-now   AI Engineer Intern · Hummingbird Digital
  2025       Independent AI/ML projects (open-source)
  2024       Python fundamentals → first shipped apps

STACK
  Python · scikit-learn · FastAPI · LangChain · Ollama
  React · Next.js · Tailwind · MySQL · Docker · Linux

SHIPPED
  · CAREN — AI email command center (LLM + ML classifier)
  · Exotel × Pipecat — real-time AI phone agent
  · KVMTCC — Next.js site with Google-Sheets CMS (production)

<span class="dim">for the full list: run <b>projects</b></span>
</pre>`;

const SKILLS_JSON = `{
  "languages": ["Python", "JavaScript", "SQL"],
  "ml": ["scikit-learn", "Pandas", "NumPy", "Matplotlib"],
  "ai": ["LangChain", "Ollama", "OpenAI", "Gemini", "Pipecat"],
  "backend": ["FastAPI", "REST", "WebSockets", "MySQL"],
  "frontend": ["React", "Next.js", "Tailwind", "Framer Motion"],
  "devops": ["Docker", "GitHub Actions", "Linux"]
}`;

const ZSHRC = `# ~/.zshrc — starship + zoxide + fzf
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"
alias ll="eza -la --icons"
alias cat="bat"
alias v="nvim"`;

// ---------- VIRTUAL FILESYSTEM ----------
// One source of truth shared by terminal, Files app, and desktop icons.
const HOME = '/home/niranjan';

function projectMd(p) {
  const techLine = p.tech ? `\n**Stack:** ${p.tech.join(' · ')}\n` : '';
  const liveLine = p.live ? `\n**Live:** ${p.live}` : '';
  return `<pre class="term-line" style="margin:0"><span class="mauve"># ${p.title}</span>

<span class="dim">${p.eyebrow}</span>

${stripHtml(p.desc)}
${techLine}
<span class="teal">repo</span>  ${p.repo}${liveLine ? `\n<span class="teal">live</span>  ${p.live}` : ''}

<span class="dim">tip: <b>open projects</b> for the GUI card view.</span>
</pre>`;
}

const README_PG = `<pre class="term-line" style="margin:0"><span class="mauve"># playground/</span>

Tiny live sandbox for classical ML — no server, no setup.
Double-click any dataset to open the <b>Dataset Playground</b>.

  moons.csv    — two interlocking half-moons (kNN territory)
  blobs.csv    — three gaussian blobs (easy warmup)
  circles.csv  — nested rings (kernels or kNN)
  model.pkl    — a pickled sklearn pipeline (opens the playground)

Run <b>play datasets</b> from the terminal for the same thing.
</pre>`;

const EMAIL_VCF = `<pre class="term-line" style="margin:0">BEGIN:VCARD
VERSION:3.0
FN:Niranjan
TITLE:Data Scientist &amp; AI Engineer
ORG:Hummingbird Digital
URL:https://github.com/TGvenomYT
NOTE:type <b>contact</b> in the terminal for the full card.
END:VCARD</pre>`;

// File builder helpers
const F = (content, opts = {}) => ({ type: 'file', content, ...opts });
const D = (children) => ({ type: 'dir', children });

const VFS = {
  '/': D({
    home: D({
      niranjan: D({
        'about.md':     F(ABOUT_TXT,   { openApp: 'about',    icon: '📄' }),
        'resume.txt':   F(RESUME_TXT,  { icon: '📄' }),
        'skills.json':  F(SKILLS_JSON, { icon: '⚙️', catCls: 'yellow' }),
        '.zshrc':       F(ZSHRC,       { icon: '📜', catCls: 'dim' }),
        projects:   D(Object.fromEntries(PROJECTS.map(p => [
          `${p.id}.md`,
          F(projectMd(p), { icon: p.emoji, href: p.repo, live: p.live, openApp: 'projects' })
        ]))),
        playground: D({
          'README.md':   F(README_PG, { icon: '📄', openApp: 'playground' }),
          'moons.csv':   F('x1,x2,label\n0.42,0.11,0\n...', { icon: '📊', openApp: 'playground' }),
          'blobs.csv':   F('x1,x2,label\n1.2,0.4,2\n...',   { icon: '📊', openApp: 'playground' }),
          'circles.csv': F('x1,x2,label\n0.9,0.0,1\n...',   { icon: '📊', openApp: 'playground' }),
          'model.pkl':   F('<binary>', { icon: '🧠', openApp: 'playground' }),
        }),
        contact: D({
          'email.vcf':    F(EMAIL_VCF, { icon: '✉️', openApp: 'contact' }),
          'github.url':   F(`[InternetShortcut]\nURL=${GITHUB}`,
                             { icon: '🌐', href: GITHUB }),
          'linkedin.url': F(`[InternetShortcut]\nURL=https://linkedin.com/in/niranjan`,
                             { icon: '🌐', href: 'https://linkedin.com/in/niranjan' }),
        }),
        notes: D({
          'ideas.md':    F(`# ideas\n\n- more three.js in projects page\n- retro CRT terminal mode\n- MDX blog posts\n- pipecat pipeline visualizer\n\n_double-click to edit — changes save in memory._`, { icon: '📝', openApp: 'editor' }),
          'todo.md':     F(`# todo\n\n- [x] boot sequence\n- [x] terminal\n- [x] dataset playground\n- [ ] blog\n- [ ] contact form (functional)\n`, { icon: '✅', openApp: 'editor' }),
        }),
        Pictures: D({
          'wallpaper.jpg': F('<i class="dim">(current desktop wallpaper)</i>', { icon: '🖼️' }),
        }),
      })
    })
  })
};

// path utils
function normalizePath(p, cwd) {
  if (!p) return cwd;
  if (p === '~') return HOME;
  if (p.startsWith('~/')) p = HOME + p.slice(1);
  if (!p.startsWith('/')) p = cwd.replace(/\/$/, '') + '/' + p;
  const out = [];
  for (const seg of p.split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') out.pop();
    else out.push(seg);
  }
  return '/' + out.join('/');
}
function getNode(path) {
  if (path === '/' || path === '') return VFS['/'];
  const parts = path.split('/').filter(Boolean);
  let n = VFS['/'];
  for (const s of parts) {
    if (!n || n.type !== 'dir' || !n.children[s]) return null;
    n = n.children[s];
  }
  return n;
}
function displayPath(p) {
  if (p === HOME) return '~';
  if (p.startsWith(HOME + '/')) return '~' + p.slice(HOME.length);
  return p;
}
function iconFor(name, node) {
  if (!node) return '❔';
  if (node.type === 'dir') return '📁';
  if (node.icon) return node.icon;
  if (name.endsWith('.md') || name.endsWith('.txt')) return '📄';
  if (name.endsWith('.csv')) return '📊';
  if (name.endsWith('.json')) return '⚙️';
  if (name.endsWith('.pkl')) return '🧠';
  if (name.endsWith('.url')) return '🌐';
  return '📄';
}
function openFsItem(path) {
  const node = getNode(path);
  if (!node) return false;
  if (node.type === 'dir') { openApp('files'); window.__filesGo?.(path); return true; }
  const name = path.split('/').pop();
  const editable = /\.(md|txt|json|csv|url|vcf|log|py|js|ts|css|html|yml|yaml|conf)$/i.test(name) || name.startsWith('.');
  if (node.openApp === 'editor') { openEditor(path); return true; }
  if (node.openApp)  { openApp(node.openApp); return true; }
  if (node.href)     { window.open(node.href, '_blank'); return true; }
  if (editable && typeof node.content === 'string') { openEditor(path); return true; }
  openViewer(path, node);
  return true;
}
function openViewer(path, node) {
  const id = 'viewer:' + path;
  WM.spawn(id, {
    title: path.split('/').pop(),
    subtitle: displayPath(path),
    width: 640, height: 480,
    mount: (body) => {
      body.innerHTML = `<div class="term" style="padding:16px;overflow:auto;height:100%">
        ${node.content || '<span class="dim">(empty)</span>'}
      </div>`;
    }
  });
}

function renderNeofetch(host) {
  const ascii = `                   <span class="teal">-\`</span>
                  <span class="teal">.o+\`</span>
                 <span class="teal">\`ooo/</span>
                <span class="teal">\`+oooo:</span>
               <span class="teal">\`+oooooo:</span>
               <span class="teal">-+oooooo+:</span>
             <span class="teal">\`/:-:++oooo+:</span>
            <span class="teal">\`/++++/+++++++:</span>
           <span class="teal">\`/++++++++++++++:</span>
          <span class="teal">\`/+++ooooooooooooo/\`</span>
         <span class="teal">./ooosssso++osssssso+\`</span>
        <span class="teal">.oossssso-\`\`\`\`/ossssss+\`</span>
       <span class="teal">-osssssso.      :ssssssso.</span>
      <span class="teal">:osssssss/        osssso+++.</span>
     <span class="teal">/ossssssss/        +ssssooo/-</span>
   <span class="teal">\`/ossssso+/:-        -:/+osssso+-</span>
  <span class="teal">\`+sso+:-\`                 \`.-/+oso:</span>
 <span class="teal">\`++:.                           \`-/+/</span>
 <span class="teal">.\`                                 \`/</span>`;
  host.innerHTML = `
    <div class="nf-wrap">
      <pre class="ascii-arch">${ascii}</pre>
      <div class="nf-info">
        <div><b>niranjan@arch</b></div>
        <div class="dim">─────────────</div>
        <div><b>OS</b>: Arch Linux x86_64</div>
        <div><b>Host</b>: portfolio 1.0</div>
        <div><b>Kernel</b>: 6.9.0-arch1-1</div>
        <div><b>Uptime</b>: <span id="nf-up">just booted</span></div>
        <div><b>Packages</b>: 1337 (pacman)</div>
        <div><b>Shell</b>: zsh 5.9</div>
        <div><b>WM</b>: Hyprland 0.42</div>
        <div><b>Theme</b>: Catppuccin Mocha</div>
        <div><b>Terminal</b>: ghostty 1.0</div>
        <div><b>CPU</b>: 13th Gen Curiosity (16) @ 4.8GHz</div>
        <div><b>Memory</b>: 3.2 GiB / 16 GiB</div>
        <div class="nf-colors">
          <span style="background:var(--red)"></span>
          <span style="background:var(--peach)"></span>
          <span style="background:var(--yellow)"></span>
          <span style="background:var(--green)"></span>
          <span style="background:var(--sky)"></span>
          <span style="background:var(--blue)"></span>
          <span style="background:var(--mauve)"></span>
          <span style="background:var(--pink)"></span>
        </div>
      </div>
    </div>`;
  const start = Date.now();
  const upEl = host.querySelector('#nf-up');
  const tick = () => {
    if (!upEl.isConnected) return;
    const s = Math.floor((Date.now() - start) / 1000);
    upEl.textContent = `${Math.floor(s/60)}m ${s%60}s`;
    requestAnimationFrame(() => setTimeout(tick, 1000));
  };
  tick();
}

// ---------- PROJECTS ----------
function mountProjects(body) {
  body.innerHTML = `
    <div class="app-scroll">
      <h1>projects <span class="accent">// niranjan</span></h1>
      <p class="app-sub">A working set. Every card links to real source and, where relevant, a live deployment.</p>
      <div class="proj-grid">
        ${PROJECTS.map(p => `
          <article class="proj-card" style="--accent:${p.accent}">
            <div class="pc-head"><span class="pc-icon">${p.emoji}</span>
              <div><div class="pc-eyebrow">${p.eyebrow}</div><div class="pc-title">${p.title}</div></div>
            </div>
            <p class="pc-desc">${p.desc}</p>
            <div class="pc-tech">${p.tech.map(t => `<span class="chip">${t}</span>`).join('')}</div>
            <div class="pc-links">
              <a class="pc-link" href="${p.repo}" target="_blank" rel="noopener"> code</a>
              ${p.live ? `<a class="pc-link" href="${p.live}" target="_blank" rel="noopener"> live</a>` : ''}
            </div>
          </article>
        `).join('')}
      </div>
    </div>`;
}

function mountAbout(body) {
  body.innerHTML = `
    <div class="md-body">
      <div class="stamp">~/about.md · read-only</div>
      <h1>hey — I'm Niranjan.</h1>
      <p class="lead">I build AI products. Data science with scikit-learn, LLM systems with LangChain and Ollama, real-time voice with Pipecat, and the FastAPI + React glue that makes it feel like a product instead of a demo.</p>

      <h2>## now</h2>
      <p>Interning at <a href="https://github.com/HBDigital" target="_blank" rel="noopener">Hummingbird Digital</a>, shipping code real users touch. Between that: <a href="https://github.com/TGvenomYT/CAREN-agent" target="_blank" rel="noopener">CAREN</a> — an AI email command center — and a real-time AI phone agent on Exotel × Pipecat.</p>

      <h2>## how I work</h2>
      <ul>
        <li>Prototype fast, ship faster. Static-hosted whenever possible.</li>
        <li>Local-first models when they work; API-first when they don't.</li>
        <li>Voice is a first-class interface, not a demo feature.</li>
        <li>If it takes an admin more than 10 seconds, I automate it.</li>
      </ul>

      <h2>## tools of choice</h2>
      <p><code>Python</code> · <code>scikit-learn</code> · <code>FastAPI</code> · <code>LangChain</code> · <code>Ollama</code> · <code>React</code> · <code>Next.js</code> · <code>Tailwind</code> · <code>MySQL</code> · <code>Linux</code></p>

      <h2>## elsewhere</h2>
      <p>Code: <a href="${GITHUB}" target="_blank" rel="noopener">github.com/TGvenomYT</a> · Or just <code>type contact</code> in the terminal.</p>
    </div>`;
}

function mountContact(body) {
  body.innerHTML = `
    <div class="contact-body">
      <h1>get in touch</h1>
      <p class="lead">The fastest ways to reach me. Email is best for anything long.</p>
      <div class="contact-list">
        <a href="mailto:niranjan.tgvenom@gmail.com">
          <span class="cico">✉</span>
          <div><div class="clabel">Email</div><div>niranjan.tgvenom@gmail.com</div></div>
        </a>
        <a href="${GITHUB}" target="_blank" rel="noopener">
          <span class="cico">󰊤</span>
          <div><div class="clabel">GitHub</div><div>github.com/TGvenomYT</div></div>
        </a>
        <a href="https://www.linkedin.com/in/niranjan-tg" target="_blank" rel="noopener">
          <span class="cico">in</span>
          <div><div class="clabel">LinkedIn</div><div>linkedin.com/in/niranjan-tg</div></div>
        </a>
        <a href="https://tgvenomyt.github.io/CAREN-agent/" target="_blank" rel="noopener">
          <span class="cico">🧠</span>
          <div><div class="clabel">Try CAREN</div><div>tgvenomyt.github.io/CAREN-agent</div></div>
        </a>
      </div>
    </div>`;
}

function mountFiles(body) {
  let cwd = HOME;
  const history = [HOME];
  let hIdx = 0;

  body.innerHTML = `
    <div class="files-app">
      <aside class="files-side">
        <div class="fs-h">Places</div>
        <div class="fs-item" data-p="${HOME}">  Home</div>
        <div class="fs-item" data-p="${HOME}/projects">  Projects</div>
        <div class="fs-item" data-p="${HOME}/playground"> 󰄨 Playground</div>
        <div class="fs-item" data-p="${HOME}/contact">  Contact</div>
        <div class="fs-h" style="margin-top:14px">Devices</div>
        <div class="fs-item">  /dev/nvme0n1</div>
      </aside>
      <section class="files-main">
        <div class="files-toolbar">
          <button class="fs-nav" data-nav="back" title="Back">◀</button>
          <button class="fs-nav" data-nav="fwd"  title="Forward">▶</button>
          <button class="fs-nav" data-nav="up"   title="Up">▲</button>
          <button class="fs-nav" data-nav="home" title="Home">⌂</button>
          <div class="files-crumb" data-crumb></div>
        </div>
        <div class="files-grid" data-grid></div>
        <div class="files-status" data-status></div>
      </section>
    </div>`;

  const crumb = body.querySelector('[data-crumb]');
  const grid  = body.querySelector('[data-grid]');
  const status = body.querySelector('[data-status]');

  function renderCrumb(path) {
    const disp = displayPath(path);
    const parts = disp.split('/').filter(Boolean);
    const prefix = disp.startsWith('~') ? '~' : '/';
    let acc = prefix === '~' ? HOME : '';
    const chunks = [`<a class="crumb-part" data-p="${prefix === '~' ? HOME : '/'}">${prefix === '~' ? '~' : '/'}</a>`];
    parts.slice(prefix === '~' ? 1 : 0).forEach(seg => {
      acc = acc + '/' + seg;
      chunks.push(`<span class="crumb-sep">/</span><a class="crumb-part" data-p="${acc}">${seg}</a>`);
    });
    crumb.innerHTML = chunks.join('');
    crumb.querySelectorAll('.crumb-part').forEach(a => {
      a.addEventListener('click', () => render(a.dataset.p, true));
    });
  }

  function render(path, pushHist) {
    const node = getNode(path);
    if (!node || node.type !== 'dir') return;
    cwd = path;
    if (pushHist) { history.splice(hIdx + 1); history.push(path); hIdx = history.length - 1; }
    body.querySelectorAll('.fs-item[data-p]').forEach(el => el.classList.toggle('active', el.dataset.p === path));
    renderCrumb(path);
    const entries = Object.entries(node.children)
      .filter(([n]) => !n.startsWith('.'))
      .sort(([a, an], [b, bn]) => (bn.type === 'dir') - (an.type === 'dir') || a.localeCompare(b));
    grid.innerHTML = entries.map(([name, child]) => {
      const isDir = child.type === 'dir';
      return `<div class="file-tile" data-name="${name}" data-dir="${isDir}" tabindex="0" title="${name}">
        <span class="ico">${iconFor(name, child)}</span><span class="fname">${name}</span>
      </div>`;
    }).join('') || '<div class="dim" style="padding:20px;color:var(--overlay1);font-family:var(--mono);font-size:12px">empty directory</div>';

    status.textContent = `${entries.length} item${entries.length === 1 ? '' : 's'}`;

    grid.querySelectorAll('.file-tile').forEach(t => {
      const activate = () => {
        const child = node.children[t.dataset.name];
        const childPath = path + '/' + t.dataset.name;
        if (t.dataset.dir === 'true') return render(childPath, true);
        openFsItem(childPath);
      };
      t.addEventListener('dblclick', activate);
      t.addEventListener('keydown', (e) => { if (e.key === 'Enter') activate(); });
      t.addEventListener('click', () => {
        grid.querySelectorAll('.file-tile.sel').forEach(x => x.classList.remove('sel'));
        t.classList.add('sel');
      });
    });
  }

  body.querySelectorAll('.fs-item[data-p]').forEach(el => {
    el.addEventListener('click', () => render(el.dataset.p, true));
  });
  body.querySelectorAll('.fs-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.dataset.nav;
      if (a === 'back' && hIdx > 0)  { hIdx--; render(history[hIdx], false); }
      else if (a === 'fwd' && hIdx < history.length - 1) { hIdx++; render(history[hIdx], false); }
      else if (a === 'up')   { const parent = cwd.replace(/\/[^/]+$/, '') || '/'; render(parent, true); }
      else if (a === 'home') { render(HOME, true); }
    });
  });

  // expose so `open` from terminal can navigate this window
  window.__filesGo = (p) => render(p, true);

  render(HOME, false);
}

// ---------- DATASET PLAYGROUND ----------
function mountPlayground(body) { mountClassifier(body); }

function mountClassifier(body) {
  // Scenarios: real-world, plain-language framings of a 2D classifier.
  const SCENARIOS = {
    fruit: {
      title: 'Fruit sorter',
      story: "Teach the computer to tell apples from oranges just by looking at them.",
      xLabel: 'Size  →', xLo: 'tiny', xHi: 'huge',
      yLabel: '↑ Sweetness', yLo: 'sour', yHi: 'sweet',
      classes: [
        { name: 'Apple',  emoji: '🍎', color: '#f38ba8' },
        { name: 'Orange', emoji: '🍊', color: '#fab387' },
      ],
      hint: "Click on the canvas to drop an example. Small & sour? Probably a green apple. Big & sweet? A juicy orange."
    },
    pets: {
      title: 'Cat or dog?',
      story: "Show the computer some cats and dogs. Then let it guess a new pet.",
      xLabel: 'Loudness  →', xLo: 'purr', xHi: 'BARK',
      yLabel: '↑ Size', yLo: 'tiny', yHi: 'huge',
      classes: [
        { name: 'Cat', emoji: '🐱', color: '#cba6f7' },
        { name: 'Dog', emoji: '🐶', color: '#89b4fa' },
      ],
      hint: "Cats are usually small and quiet. Dogs come in every size — but they bark a lot."
    },
    spam: {
      title: 'Spam filter',
      story: "Train an email filter. Show it real messages and junk mail.",
      xLabel: 'Number of links  →', xLo: '0', xHi: 'lots',
      yLabel: '↑ ALL-CAPS words', yLo: 'few', yHi: 'SCREAMING',
      classes: [
        { name: 'Real',  emoji: '📧', color: '#a6e3a1' },
        { name: 'Spam',  emoji: '🗑️', color: '#f38ba8' },
      ],
      hint: "Real emails are usually calm and link-light. Spam screams and links everywhere."
    }
  };

  body.innerHTML = `
    <div class="pg-root pg-game">
      <aside class="pg-side">
        <div class="pg-scenario-pick">
          <div class="pg-h">Scenario</div>
          <div class="pg-scn-grid">
            <button class="pg-scn active" data-scn="classify"><span>🍎🐱📧</span><b>Classify things</b></button>
            <button class="pg-scn" data-scn="regress"><span>📈</span><b>Predict a number</b></button>
            <button class="pg-scn" data-scn="descent"><span>🎢</span><b>How AI learns</b></button>
            <button class="pg-scn" data-scn="vision"><span>🖼️</span><b>Teach your camera</b></button>
            <button class="pg-scn" data-scn="sklearn"><span>🐍</span><b>Real sklearn</b></button>
          </div>
        </div>

        <div class="pg-subtabs">
          <button class="pg-sub active" data-sub="fruit">🍎🍊 Fruit sorter</button>
          <button class="pg-sub" data-sub="pets">🐱🐶 Cat or dog?</button>
          <button class="pg-sub" data-sub="spam">📧🗑️ Spam filter</button>
        </div>

        <div class="pg-story" data-story></div>

        <div>
          <div class="pg-h"><span class="pg-step">1</span> Show examples</div>
          <div class="pg-group" data-classes></div>
          <div class="pg-tiny">Click on the canvas to drop the selected item. Right-click to delete. Drag to move.</div>
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">2</span> Teach the AI</div>
          <button class="pg-btn primary big" data-teach>🧠  Let the AI learn</button>
          <button class="pg-btn warn" data-clear>↺  Start over</button>
        </div>

        <div class="pg-result" data-result hidden>
          <div class="pg-h"><span class="pg-step">3</span> How smart is it?</div>
          <div class="pg-score"><span data-score-emoji>🎯</span> <b data-score>—</b></div>
          <div class="pg-tiny" data-score-line>Teach the AI to see the score.</div>
        </div>
      </aside>

      <div class="pg-canvas-wrap">
        <canvas id="pg-canvas"></canvas>
        <div class="pg-axis pg-axis-x"><span data-xlo></span><span data-xlabel></span><span data-xhi></span></div>
        <div class="pg-axis pg-axis-y"><span data-yhi></span><span data-ylabel></span><span data-ylo></span></div>
        <div class="pg-legend" data-legend></div>
        <div class="pg-guess" data-guess hidden></div>
        <div class="pg-toast" data-toast></div>
      </div>
    </div>`;

  const canvas = body.querySelector('#pg-canvas');
  const ctx = canvas.getContext('2d');
  const toast = body.querySelector('[data-toast]');
  const guessEl = body.querySelector('[data-guess]');

  const state = {
    scnKey: 'fruit',
    scn: SCENARIOS.fruit,
    points: [],       // {x, y, cls, pred?}
    selectedClass: 0,
    field: null,
    trained: false,
    dragging: null,
  };

  function showToast(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function loadScenario(key) {
    if (key === 'descent') { mountDescent(body); return; }
    if (key === 'regress') { mountRegression(body); return; }
    if (key === 'vision') { mountVision(body); return; }
    if (key === 'sklearn') { mountSklearn(body); return; }
    if (key === 'classify') key = state.scnKey || 'fruit';
    state.scnKey = key;
    state.scn = SCENARIOS[key];
    state.points = []; state.field = null; state.trained = false;
    state.selectedClass = 0;
    body.querySelectorAll('[data-sub]').forEach(b => b.classList.toggle('active', b.dataset.sub === key));
    body.querySelector('[data-story]').textContent = state.scn.story;
    body.querySelector('[data-xlabel]').textContent = state.scn.xLabel;
    body.querySelector('[data-ylabel]').textContent = state.scn.yLabel;
    body.querySelector('[data-xlo]').textContent = state.scn.xLo;
    body.querySelector('[data-xhi]').textContent = state.scn.xHi;
    body.querySelector('[data-ylo]').textContent = state.scn.yLo;
    body.querySelector('[data-yhi]').textContent = state.scn.yHi;
    // legend
    const legend = body.querySelector('[data-legend]');
    legend.innerHTML = state.scn.classes.map(c =>
      `<span class="pg-legend-item"><i style="background:${c.color}"></i>${c.emoji} ${c.name}</span>`
    ).join('');
    body.querySelector('[data-result]').hidden = true;
    body.querySelector('[data-score]').textContent = '—';
    body.querySelector('[data-score-line]').textContent = 'Teach the AI to see the score.';
    renderClassPicker();
    seedExamples();
    draw();
  }

  function renderClassPicker() {
    const wrap = body.querySelector('[data-classes]');
    wrap.innerHTML = '';
    state.scn.classes.forEach((c, i) => {
      const b = document.createElement('button');
      b.className = 'pg-cls' + (i === state.selectedClass ? ' active' : '');
      b.style.setProperty('--cc', c.color);
      b.innerHTML = `<span class="pg-cls-em">${c.emoji}</span><span class="pg-cls-name">Place ${c.name.toLowerCase()}s</span>`;
      b.addEventListener('click', () => { state.selectedClass = i; renderClassPicker(); });
      wrap.appendChild(b);
    });
  }

  function seedExamples() {
    // give a couple of examples so the canvas isn't empty
    const w = canvas.clientWidth || 600, h = canvas.clientHeight || 400;
    const jit = () => (Math.random() - 0.5) * 30;
    const spots = [
      { cls: 0, x: w * 0.28, y: h * 0.68 },
      { cls: 0, x: w * 0.22, y: h * 0.55 },
      { cls: 0, x: w * 0.35, y: h * 0.72 },
      { cls: 1, x: w * 0.72, y: h * 0.28 },
      { cls: 1, x: w * 0.78, y: h * 0.42 },
      { cls: 1, x: w * 0.65, y: h * 0.22 },
    ];
    state.points = spots.map(s => ({ x: s.x + jit(), y: s.y + jit(), cls: s.cls }));
    state.field = null; state.trained = false;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  function draw() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    // grid
    ctx.strokeStyle = 'rgba(205,214,244,0.05)'; ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    // decision field
    if (state.field) {
      const cell = 14;
      for (let y = 0; y < h; y += cell) {
        for (let x = 0; x < w; x += cell) {
          const idx = (Math.floor(y / cell) * Math.ceil(w / cell) + Math.floor(x / cell)) * 4;
          const r = state.field[idx], g = state.field[idx+1], b = state.field[idx+2], a = state.field[idx+3];
          ctx.fillStyle = `rgba(${r},${g},${b},${a/255})`;
          ctx.fillRect(x, y, cell, cell);
        }
      }
    }
    // points as emoji chips
    ctx.font = '20px system-ui, "Apple Color Emoji", "Segoe UI Emoji"';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const p of state.points) {
      const cls = state.scn.classes[p.cls];
      const wrong = state.trained && p.pred !== undefined && p.pred !== p.cls;
      // halo
      ctx.beginPath(); ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
      ctx.fillStyle = cls.color + (wrong ? 'aa' : '55');
      ctx.fill();
      if (wrong) { ctx.strokeStyle = '#f38ba8'; ctx.lineWidth = 2; ctx.stroke(); }
      ctx.fillStyle = '#000';
      ctx.fillText(cls.emoji, p.x, p.y + 1);
    }
  }

  function pointAt(x, y) {
    for (let i = state.points.length - 1; i >= 0; i--) {
      const p = state.points[i];
      if ((p.x - x) ** 2 + (p.y - y) ** 2 < 220) return { p, i };
    }
    return null;
  }

  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const hit = pointAt(e.clientX - rect.left, e.clientY - rect.top);
    if (hit) { state.points.splice(hit.i, 1); state.field = null; state.trained = false; draw(); }
  });

  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const hit = pointAt(x, y);
    if (hit) { state.dragging = hit.p; }
    else {
      state.points.push({ x, y, cls: state.selectedClass });
      state.field = null; state.trained = false;
      body.querySelector('[data-result]').hidden = true;
      draw();
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (state.dragging) {
      const rect = canvas.getBoundingClientRect();
      state.dragging.x = Math.max(0, Math.min(canvas.clientWidth, e.clientX - rect.left));
      state.dragging.y = Math.max(0, Math.min(canvas.clientHeight, e.clientY - rect.top));
      state.field = null; state.trained = false; draw();
    }
  });
  window.addEventListener('mouseup', () => { state.dragging = null; });

  // Hover after training → live guess for a "mystery" position
  canvas.addEventListener('mousemove', (e) => {
    if (!state.trained || state.dragging) { guessEl.hidden = true; return; }
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    if (pointAt(x, y)) { guessEl.hidden = true; return; }
    const { cls, conf } = predictWithConfidence(x, y);
    const c = state.scn.classes[cls];
    guessEl.hidden = false;
    guessEl.style.left = (x + 18) + 'px';
    guessEl.style.top  = (y + 18) + 'px';
    guessEl.innerHTML = `<b>AI guess:</b> ${c.emoji} ${c.name} <span class="pg-conf">${Math.round(conf * 100)}% sure</span>`;
  });
  canvas.addEventListener('mouseleave', () => { guessEl.hidden = true; });

  // ---- The "AI" (k-Nearest-Neighbours — the friendliest model) ----
  function predictWithConfidence(x, y) {
    const K = Math.min(5, state.points.length);
    const ds = state.points.map(p => ({ d: Math.hypot(p.x - x, p.y - y), c: p.cls }));
    ds.sort((a, b) => a.d - b.d);
    const votes = {};
    for (let i = 0; i < K; i++) votes[ds[i].c] = (votes[ds[i].c] || 0) + 1;
    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    return { cls: +sorted[0][0], conf: sorted[0][1] / K };
  }

  function teach() {
    if (state.points.length < 4) return showToast('Give the AI at least 4 examples first!');
    const classesPresent = new Set(state.points.map(p => p.cls));
    if (classesPresent.size < 2) return showToast(`Show it examples of BOTH ${state.scn.classes.map(c=>c.name).join(' AND ')}.`);

    // decision surface
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const cell = 14;
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
    const buf = new Uint8ClampedArray(cols * rows * 4);
    for (let ry = 0; ry < rows; ry++) {
      for (let rx = 0; rx < cols; rx++) {
        const cx = rx * cell + cell/2, cy = ry * cell + cell/2;
        const { cls } = predictWithConfidence(cx, cy);
        const rgb = hexToRgb(state.scn.classes[cls].color);
        const i = (ry * cols + rx) * 4;
        buf[i] = rgb[0]; buf[i+1] = rgb[1]; buf[i+2] = rgb[2]; buf[i+3] = 70;
      }
    }
    state.field = buf;

    // leave-one-out accuracy
    let correct = 0;
    state.points.forEach((p, idx) => {
      const K = Math.min(5, state.points.length - 1);
      const ds = state.points.filter((_, j) => j !== idx)
        .map(q => ({ d: Math.hypot(q.x - p.x, q.y - p.y), c: q.cls }));
      ds.sort((a, b) => a.d - b.d);
      const votes = {};
      for (let i = 0; i < K; i++) votes[ds[i].c] = (votes[ds[i].c] || 0) + 1;
      const pred = +Object.entries(votes).sort((a,b) => b[1]-a[1])[0][0];
      p.pred = pred; if (pred === p.cls) correct++;
    });
    state.trained = true;

    const total = state.points.length;
    const pct = correct / total;
    body.querySelector('[data-result]').hidden = false;
    body.querySelector('[data-score]').textContent = `${correct} out of ${total}`;
    const emoji = pct === 1 ? '🏆' : pct >= 0.85 ? '🎯' : pct >= 0.6 ? '👍' : '🤔';
    body.querySelector('[data-score-emoji]').textContent = emoji;
    const line = pct === 1
      ? "Perfect! The AI figured out the pattern."
      : pct >= 0.85
        ? "Great — the AI has a clear picture."
        : pct >= 0.6
          ? "Not bad. Give it more examples where it got confused (circled in red)."
          : "It's guessing wildly. Try giving cleaner examples of each side.";
    body.querySelector('[data-score-line]').textContent = line;

    draw();
    showToast('🧠  The AI learned! Now hover over the canvas to test it.');
  }

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  }

  // ---- wire up ----
  body.querySelectorAll('[data-scn]').forEach(b => b.addEventListener('click', () => loadScenario(b.dataset.scn)));
  body.querySelectorAll('[data-sub]').forEach(b => b.addEventListener('click', () => loadScenario(b.dataset.sub)));
  body.querySelector('[data-teach]').addEventListener('click', teach);
  body.querySelector('[data-clear]').addEventListener('click', () => loadScenario(state.scnKey));

  setTimeout(() => loadScenario('fruit'), 60);
}

// ================== HOW AI LEARNS — gradient descent ==================
function mountDescent(body) {
  body.innerHTML = `
    <div class="pg-root pg-game">
      <aside class="pg-side">
        <div class="pg-scenario-pick">
          <div class="pg-h">Scenario</div>
          <div class="pg-scn-grid">
            <button class="pg-scn" data-scn="classify"><span>🍎🐱📧</span><b>Classify things</b></button>
            <button class="pg-scn" data-scn="regress"><span>📈</span><b>Predict a number</b></button>
            <button class="pg-scn active" data-scn="descent"><span>🎢</span><b>How AI learns</b></button>
            <button class="pg-scn" data-scn="vision"><span>🖼️</span><b>Teach your camera</b></button>
            <button class="pg-scn" data-scn="sklearn"><span>🐍</span><b>Real sklearn</b></button>
          </div>
        </div>

        <div class="pg-story">
          Every AI learns the same way: it makes a guess, checks how wrong it is,
          and then <b>takes a tiny step in a better direction</b>. It repeats this
          thousands of times until it can't get any better. That's called
          <b>gradient descent</b> — literally, rolling down a hill.
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">1</span> Drop the AI on the hill</div>
          <div class="pg-tiny">Click anywhere on the landscape to place the ball. Blue valleys = good answers. Red peaks = terrible answers.</div>
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">2</span> How big a step?</div>
          <div class="pg-row"><span>Step size</span>
            <input type="range" min="1" max="60" step="1" value="18" data-lr />
            <b data-lrv>0.18</b></div>
          <div class="pg-tiny">Too small → learns forever. Too big → overshoots and bounces around.</div>
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">3</span> Watch it learn</div>
          <button class="pg-btn primary big" data-play>▶  Start learning</button>
          <button class="pg-btn" data-step>➜  One step at a time</button>
          <button class="pg-btn" data-newland>🎲  New landscape</button>
        </div>

        <div class="pg-result">
          <div class="pg-h">Live progress</div>
          <div class="pg-row"><span>Step</span><b data-m-step>0</b></div>
          <div class="pg-row"><span>How wrong (loss)</span><b data-m-loss>—</b></div>
          <div class="pg-tiny" data-m-note>Drop the ball to begin.</div>
        </div>
      </aside>

      <div class="pg-canvas-wrap">
        <canvas id="pg-canvas"></canvas>
        <div class="pg-legend">
          <span class="pg-legend-item"><i style="background:#89b4fa"></i>low loss (good)</span>
          <span class="pg-legend-item"><i style="background:#f38ba8"></i>high loss (bad)</span>
        </div>
        <div class="pg-toast" data-toast></div>
      </div>
    </div>`;

  const canvas = body.querySelector('#pg-canvas');
  const ctx = canvas.getContext('2d');
  const toast = body.querySelector('[data-toast]');

  const state = {
    ball: null,   // {x, y} in canvas coords
    path: [],
    lr: 0.18,
    seed: Math.random() * 1000,
    playing: false,
    step: 0,
    field: null,  // ImageData for the loss landscape
  };

  // ---- The "loss landscape" — a smooth bumpy function ----
  // Coordinates normalized to [-3, 3]. Multiple gaussian bumps + valleys.
  let bumps = [];
  function newLandscape() {
    bumps = [];
    // 2-3 valleys (attractors) and 2-3 hills (repellers)
    const n = 5 + Math.floor(Math.random() * 2);
    for (let i = 0; i < n; i++) {
      bumps.push({
        x: (Math.random() * 2 - 1) * 2.4,
        y: (Math.random() * 2 - 1) * 2.4,
        s: 0.6 + Math.random() * 0.9,
        a: (Math.random() < 0.55 ? -1 : 1) * (0.6 + Math.random() * 0.9),
      });
    }
    // Ensure at least one deep valley near center-ish
    bumps.push({ x: (Math.random()-0.5)*1.2, y: (Math.random()-0.5)*1.2, s: 0.9, a: -1.4 });
    state.field = null;
  }
  newLandscape();

  function loss(nx, ny) {
    let z = 0.06 * (nx*nx + ny*ny); // gentle bowl so edges are always "bad"
    for (const b of bumps) {
      const dx = nx - b.x, dy = ny - b.y;
      z += b.a * Math.exp(-(dx*dx + dy*dy) / (2 * b.s * b.s));
    }
    return z;
  }
  function grad(nx, ny) {
    const h = 0.01;
    return [ (loss(nx+h,ny)-loss(nx-h,ny))/(2*h), (loss(nx,ny+h)-loss(nx,ny-h))/(2*h) ];
  }

  function toNorm(x, y) {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    return [ (x / w) * 6 - 3, (y / h) * 6 - 3 ];
  }
  function toPx(nx, ny) {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    return [ (nx + 3) / 6 * w, (ny + 3) / 6 * h ];
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.field = null;
    draw();
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas);

  function buildField() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const cell = 6;
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
    // find range
    let lo = Infinity, hi = -Infinity;
    const vals = new Float32Array(cols * rows);
    for (let ry = 0; ry < rows; ry++) {
      for (let rx = 0; rx < cols; rx++) {
        const [nx, ny] = toNorm(rx * cell + cell/2, ry * cell + cell/2);
        const v = loss(nx, ny);
        vals[ry * cols + rx] = v;
        if (v < lo) lo = v; if (v > hi) hi = v;
      }
    }
    state.field = { cell, cols, rows, vals, lo, hi };
  }

  function lerpColor(t) {
    // t: 0 (blue/good) → 1 (red/bad), via green/yellow
    const stops = [
      [0.00, [69, 89, 175]],   // deep blue
      [0.35, [137, 180, 250]], // blue
      [0.55, [166, 227, 161]], // green
      [0.75, [249, 226, 175]], // yellow
      [1.00, [243, 139, 168]], // red
    ];
    for (let i = 0; i < stops.length - 1; i++) {
      const [t0, c0] = stops[i], [t1, c1] = stops[i+1];
      if (t <= t1) {
        const u = (t - t0) / (t1 - t0);
        return [c0[0]+(c1[0]-c0[0])*u, c0[1]+(c1[1]-c0[1])*u, c0[2]+(c1[2]-c0[2])*u];
      }
    }
    return stops[stops.length-1][1];
  }

  function draw() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    if (!state.field) buildField();
    const { cell, cols, rows, vals, lo, hi } = state.field;
    const range = hi - lo || 1;
    for (let ry = 0; ry < rows; ry++) {
      for (let rx = 0; rx < cols; rx++) {
        const t = (vals[ry * cols + rx] - lo) / range;
        const c = lerpColor(t);
        ctx.fillStyle = `rgb(${c[0]|0},${c[1]|0},${c[2]|0})`;
        ctx.fillRect(rx * cell, ry * cell, cell + 1, cell + 1);
      }
    }
    // contour lines
    ctx.strokeStyle = 'rgba(17,17,27,0.25)'; ctx.lineWidth = 1;
    for (let lvl = 1; lvl < 10; lvl++) {
      const target = lo + (range * lvl / 10);
      ctx.beginPath();
      for (let ry = 0; ry < rows - 1; ry++) {
        for (let rx = 0; rx < cols - 1; rx++) {
          const v = vals[ry * cols + rx], vr = vals[ry * cols + rx + 1];
          if ((v - target) * (vr - target) < 0) {
            ctx.moveTo(rx * cell + cell, ry * cell); ctx.lineTo(rx * cell + cell, ry * cell + cell);
          }
        }
      }
      ctx.stroke();
    }
    // path
    if (state.path.length > 1) {
      ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 2;
      ctx.beginPath();
      state.path.forEach((p, i) => { const [px, py] = toPx(p.nx, p.ny); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
      ctx.stroke();
      // step dots
      state.path.forEach(p => {
        const [px, py] = toPx(p.nx, p.ny);
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fill();
      });
    }
    // ball
    if (state.ball) {
      const [px, py] = toPx(state.ball.nx, state.ball.ny);
      ctx.beginPath(); ctx.arc(px, py, 11, 0, Math.PI * 2);
      ctx.fillStyle = '#11111b'; ctx.fill();
      ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(px-2, py-3, 1, px, py, 8);
      g.addColorStop(0, '#f5e0dc'); g.addColorStop(1, '#cba6f7');
      ctx.fillStyle = g; ctx.fill();
    }
  }

  function setBall(x, y) {
    const [nx, ny] = toNorm(x, y);
    state.ball = { nx, ny };
    state.path = [{ nx, ny }];
    state.step = 0;
    updateMetrics();
    draw();
  }

  function updateMetrics() {
    body.querySelector('[data-m-step]').textContent = state.step;
    if (state.ball) {
      const v = loss(state.ball.nx, state.ball.ny);
      body.querySelector('[data-m-loss]').textContent = v.toFixed(3);
    }
  }

  function doStep() {
    if (!state.ball) { showToast('Click on the hill to drop the ball first.'); return false; }
    const [gx, gy] = grad(state.ball.nx, state.ball.ny);
    const nnx = state.ball.nx - state.lr * gx;
    const nny = state.ball.ny - state.lr * gy;
    const moved = Math.hypot(nnx - state.ball.nx, nny - state.ball.ny);
    state.ball.nx = Math.max(-3, Math.min(3, nnx));
    state.ball.ny = Math.max(-3, Math.min(3, nny));
    state.path.push({ nx: state.ball.nx, ny: state.ball.ny });
    state.step++;
    updateMetrics();
    draw();
    if (moved < 0.0015) {
      body.querySelector('[data-m-note]').textContent = "Stuck! The AI can't get any better from here — that's a local minimum.";
      return false;
    }
    return true;
  }

  function play() {
    if (state.playing) { state.playing = false; body.querySelector('[data-play]').textContent = '▶  Start learning'; return; }
    if (!state.ball) return showToast('Click on the hill to drop the ball first.');
    state.playing = true;
    body.querySelector('[data-play]').textContent = '⏸  Pause';
    body.querySelector('[data-m-note]').textContent = 'Learning… each step nudges it downhill.';
    const tick = () => {
      if (!state.playing) return;
      const alive = doStep();
      if (!alive || state.step > 400) {
        state.playing = false;
        body.querySelector('[data-play]').textContent = '▶  Start learning';
        return;
      }
      setTimeout(tick, 40);
    };
    tick();
  }

  function showToast(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(showToast._t); showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  // ---- wire up ----
  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    const rect = canvas.getBoundingClientRect();
    setBall(e.clientX - rect.left, e.clientY - rect.top);
    body.querySelector('[data-m-note]').textContent = 'Ready. Hit "Start learning" and watch the trail.';
  });
  const lrIn = body.querySelector('[data-lr]');
  const lrVal = body.querySelector('[data-lrv]');
  lrIn.addEventListener('input', () => { state.lr = +lrIn.value / 100; lrVal.textContent = state.lr.toFixed(2); });
  body.querySelector('[data-step]').addEventListener('click', () => doStep());
  body.querySelector('[data-play]').addEventListener('click', play);
  body.querySelector('[data-newland]').addEventListener('click', () => {
    state.playing = false;
    body.querySelector('[data-play]').textContent = '▶  Start learning';
    newLandscape(); state.ball = null; state.path = []; state.step = 0;
    body.querySelector('[data-m-loss]').textContent = '—';
    body.querySelector('[data-m-note]').textContent = 'New hill! Drop the ball anywhere.';
    updateMetrics(); draw();
  });
  body.querySelectorAll('[data-scn]').forEach(b => b.addEventListener('click', () => {
    const key = b.dataset.scn;
    if (key === 'descent') return;
    if (key === 'regress') { mountRegression(body); return; }
    if (key === 'vision') { mountVision(body); return; }
    if (key === 'sklearn') { mountSklearn(body); return; }
    if (key === 'classify') { mountClassifier(body); return; }
  }));

  setTimeout(() => { resize(); draw(); }, 30);
}


// ================== PREDICT A NUMBER — regression scatterplot ==================
function mountRegression(body) {
  const SCENARIOS = {
    study: {
      title: 'Study hours → exam score',
      story: "How much does studying really help? Drop dots for students you know. The AI draws the best line — then predicts anyone's score.",
      xLabel: 'Hours studied  →', xLo: '0h', xHi: '10h',
      yLabel: '↑ Exam score', yLo: '0', yHi: '100',
      xMin: 0, xMax: 10, yMin: 0, yMax: 100,
      seed: [[1,35],[2,48],[3,52],[4,60],[5,68],[6,72],[7,78],[8,85],[9,88]],
      unit: { x: 'h', y: ' pts' },
    },
    house: {
      title: 'House size → price',
      story: "Bigger house, bigger price — usually. Add real listings and the AI learns the market.",
      xLabel: 'Size (100 sq ft)  →', xLo: '5', xHi: '40',
      yLabel: '↑ Price ($1000s)', yLo: '50', yHi: '900',
      xMin: 5, xMax: 40, yMin: 50, yMax: 900,
      seed: [[8,140],[12,210],[15,260],[18,320],[22,410],[26,510],[30,620],[35,760]],
      unit: { x: '00 sqft', y: 'k' },
    },
    icecream: {
      title: 'Temperature → ice-cream sales',
      story: "Hotter days = more cones. But it's not perfectly straight — try a curve.",
      xLabel: 'Temperature (°C)  →', xLo: '10', xHi: '38',
      yLabel: '↑ Cones sold', yLo: '0', yHi: '500',
      xMin: 10, xMax: 38, yMin: 0, yMax: 500,
      seed: [[12,40],[15,70],[18,110],[21,170],[24,240],[27,320],[30,380],[33,430],[36,460]],
      unit: { x: '°C', y: ' cones' },
    },
  };

  body.innerHTML = `
    <div class="pg-root pg-game">
      <aside class="pg-side">
        <div class="pg-scenario-pick">
          <div class="pg-h">Scenario</div>
          <div class="pg-scn-grid">
            <button class="pg-scn" data-scn="classify"><span>🍎🐱📧</span><b>Classify things</b></button>
            <button class="pg-scn active" data-scn="regress"><span>📈</span><b>Predict a number</b></button>
            <button class="pg-scn" data-scn="descent"><span>🎢</span><b>How AI learns</b></button>
            <button class="pg-scn" data-scn="vision"><span>🖼️</span><b>Teach your camera</b></button>
            <button class="pg-scn" data-scn="sklearn"><span>🐍</span><b>Real sklearn</b></button>
          </div>
        </div>

        <div class="pg-h">Pick a story</div>
        <div class="pg-group pg-reg-stories">
          <button class="pg-btn" data-story-key="study">🎓 Study → score</button>
          <button class="pg-btn" data-story-key="house">🏠 Size → price</button>
          <button class="pg-btn" data-story-key="icecream">🍦 Temp → sales</button>
        </div>

        <div class="pg-story" data-story></div>

        <div>
          <div class="pg-h"><span class="pg-step">1</span> Add data points</div>
          <div class="pg-tiny">Click the canvas to drop a dot. Right-click to remove. Or start from real-looking sample data.</div>
          <div class="pg-group">
            <button class="pg-btn" data-seed>✨  Load sample data</button>
            <button class="pg-btn warn" data-clear>↺  Clear all</button>
          </div>
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">2</span> How wiggly a line?</div>
          <div class="pg-row"><span>Curve</span>
            <input type="range" min="1" max="5" step="1" value="1" data-deg />
            <b data-degv>straight</b></div>
          <div class="pg-tiny">1 = straight line. Higher = more bends. Too wiggly and it just memorises the dots.</div>
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">3</span> Let the AI fit</div>
          <button class="pg-btn primary big" data-fit>📈  Draw the best line</button>
        </div>

        <div class="pg-result" data-result hidden>
          <div class="pg-h">How good is the fit?</div>
          <div class="pg-row"><span>Accuracy (R²)</span><b data-r2>—</b></div>
          <div class="pg-row"><span>Typical error</span><b data-err>—</b></div>
          <div class="pg-tiny" data-verdict>Add some points and hit "Draw the best line".</div>
        </div>
      </aside>

      <div class="pg-canvas-wrap">
        <canvas id="pg-canvas"></canvas>
        <div class="pg-axis pg-axis-x"><span data-xlo></span><span data-xlabel></span><span data-xhi></span></div>
        <div class="pg-axis pg-axis-y"><span data-yhi></span><span data-ylabel></span><span data-ylo></span></div>
        <div class="pg-guess" data-guess hidden></div>
        <div class="pg-toast" data-toast></div>
      </div>
    </div>`;

  const canvas = body.querySelector('#pg-canvas');
  const ctx = canvas.getContext('2d');
  const toast = body.querySelector('[data-toast]');
  const guessEl = body.querySelector('[data-guess]');

  const state = { key: 'study', scn: SCENARIOS.study, points: [], coef: null, deg: 1, hoverX: null };

  function showToast(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(showToast._t); showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function loadStory(key) {
    state.key = key; state.scn = SCENARIOS[key];
    state.points = []; state.coef = null;
    body.querySelectorAll('[data-story-key]').forEach(b => b.classList.toggle('active', b.dataset.storyKey === key));
    body.querySelector('[data-story]').textContent = state.scn.story;
    body.querySelector('[data-xlabel]').textContent = state.scn.xLabel;
    body.querySelector('[data-ylabel]').textContent = state.scn.yLabel;
    body.querySelector('[data-xlo]').textContent = state.scn.xLo;
    body.querySelector('[data-xhi]').textContent = state.scn.xHi;
    body.querySelector('[data-ylo]').textContent = state.scn.yLo;
    body.querySelector('[data-yhi]').textContent = state.scn.yHi;
    body.querySelector('[data-result]').hidden = true;
    draw();
  }

  function toPx(x, y) {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const s = state.scn;
    return [ (x - s.xMin) / (s.xMax - s.xMin) * w, h - (y - s.yMin) / (s.yMax - s.yMin) * h ];
  }
  function toData(px, py) {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const s = state.scn;
    return [ s.xMin + (px / w) * (s.xMax - s.xMin), s.yMin + ((h - py) / h) * (s.yMax - s.yMin) ];
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas);

  // Polynomial regression via normal equations (deg 1..5). Uses normalized x for numeric stability.
  function fit() {
    if (state.points.length < 2) { showToast('Add at least 2 points first.'); return; }
    const s = state.scn;
    const n = state.points.length, d = state.deg;
    const xn = state.points.map(p => (p.x - s.xMin) / (s.xMax - s.xMin));
    const ys = state.points.map(p => p.y);
    // Build normal matrix (d+1)x(d+1)
    const m = d + 1;
    const A = Array.from({length: m}, () => new Array(m).fill(0));
    const b = new Array(m).fill(0);
    for (let i = 0; i < n; i++) {
      const powers = [1];
      for (let k = 1; k <= 2*d; k++) powers.push(powers[k-1] * xn[i]);
      for (let r = 0; r < m; r++) {
        for (let c = 0; c < m; c++) A[r][c] += powers[r + c];
        b[r] += powers[r] * ys[i];
      }
    }
    // Gauss-Jordan
    for (let i = 0; i < m; i++) {
      let piv = i;
      for (let k = i+1; k < m; k++) if (Math.abs(A[k][i]) > Math.abs(A[piv][i])) piv = k;
      [A[i], A[piv]] = [A[piv], A[i]]; [b[i], b[piv]] = [b[piv], b[i]];
      const div = A[i][i] || 1e-9;
      for (let c = 0; c < m; c++) A[i][c] /= div;
      b[i] /= div;
      for (let r = 0; r < m; r++) if (r !== i) {
        const f = A[r][i];
        for (let c = 0; c < m; c++) A[r][c] -= f * A[i][c];
        b[r] -= f * b[i];
      }
    }
    state.coef = b; // coefficients in normalized x

    // Metrics
    const mean = ys.reduce((a,c)=>a+c,0) / n;
    let ssRes = 0, ssTot = 0, absSum = 0;
    for (let i = 0; i < n; i++) {
      const yh = predictNorm(xn[i]);
      ssRes += (ys[i]-yh)**2;
      ssTot += (ys[i]-mean)**2;
      absSum += Math.abs(ys[i]-yh);
    }
    const r2 = ssTot < 1e-9 ? 1 : Math.max(0, 1 - ssRes/ssTot);
    const mae = absSum / n;
    const yRange = s.yMax - s.yMin;
    body.querySelector('[data-result]').hidden = false;
    body.querySelector('[data-r2]').textContent = (r2*100).toFixed(1) + '%';
    body.querySelector('[data-err]').textContent = '±' + mae.toFixed(1) + (s.unit?.y || '');
    const v = body.querySelector('[data-verdict]');
    if (r2 > 0.9) v.textContent = "Excellent fit! The line explains the pattern almost perfectly.";
    else if (r2 > 0.7) v.textContent = "Solid fit. There's a clear trend and the AI captured it.";
    else if (r2 > 0.4) v.textContent = "Rough trend, but lots of scatter. Try more points or a bit more curve.";
    else v.textContent = "Not much of a pattern yet — add more data or try a curve.";
    draw();
  }

  function predictNorm(xn) {
    if (!state.coef) return null;
    let y = 0, p = 1;
    for (let i = 0; i < state.coef.length; i++) { y += state.coef[i]*p; p *= xn; }
    return y;
  }
  function predict(x) {
    const s = state.scn;
    return predictNorm((x - s.xMin) / (s.xMax - s.xMin));
  }

  function draw() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    // grid
    ctx.strokeStyle = 'rgba(205,214,244,0.08)'; ctx.lineWidth = 1;
    for (let i = 1; i < 10; i++) {
      ctx.beginPath(); ctx.moveTo(w*i/10, 0); ctx.lineTo(w*i/10, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, h*i/10); ctx.lineTo(w, h*i/10); ctx.stroke();
    }
    // axes
    ctx.strokeStyle = 'rgba(205,214,244,0.35)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, h-0.5); ctx.lineTo(w, h-0.5); ctx.moveTo(0.5, 0); ctx.lineTo(0.5, h); ctx.stroke();

    // regression curve
    if (state.coef) {
      ctx.strokeStyle = '#f9e2af'; ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(249,226,175,0.5)'; ctx.shadowBlur = 8;
      ctx.beginPath();
      const s = state.scn, steps = 120;
      for (let i = 0; i <= steps; i++) {
        const x = s.xMin + (s.xMax - s.xMin) * i / steps;
        const y = predict(x);
        const [px, py] = toPx(x, y);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke(); ctx.shadowBlur = 0;

      // residuals
      ctx.strokeStyle = 'rgba(243,139,168,0.5)'; ctx.lineWidth = 1;
      for (const p of state.points) {
        const [px, py] = toPx(p.x, p.y);
        const [, pyh] = toPx(p.x, predict(p.x));
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, pyh); ctx.stroke();
      }
    }

    // points
    for (const p of state.points) {
      const [px, py] = toPx(p.x, p.y);
      ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI*2);
      ctx.fillStyle = '#89b4fa'; ctx.fill();
      ctx.strokeStyle = '#11111b'; ctx.lineWidth = 1.5; ctx.stroke();
    }

    // hover prediction marker
    if (state.coef && state.hoverX != null) {
      const s = state.scn;
      const y = predict(state.hoverX);
      const [px, py] = toPx(state.hoverX, y);
      ctx.strokeStyle = 'rgba(249,226,175,0.7)'; ctx.setLineDash([4,4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI*2);
      ctx.fillStyle = '#f9e2af'; ctx.fill();
      ctx.strokeStyle = '#11111b'; ctx.lineWidth = 2; ctx.stroke();
    }
  }

  // ---- wire up ----
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const [x, y] = toData(e.clientX - rect.left, e.clientY - rect.top);
    if (e.button === 2) {
      // remove nearest
      let best = -1, bd = 15;
      state.points.forEach((p, i) => {
        const [px, py] = toPx(p.x, p.y);
        const d = Math.hypot(px - (e.clientX-rect.left), py - (e.clientY-rect.top));
        if (d < bd) { bd = d; best = i; }
      });
      if (best >= 0) { state.points.splice(best, 1); if (state.coef) fit(); else draw(); }
      return;
    }
    state.points.push({ x, y });
    if (state.coef) fit(); else draw();
  });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const [x] = toData(e.clientX - rect.left, e.clientY - rect.top);
    state.hoverX = x;
    if (state.coef) {
      const y = predict(x);
      const s = state.scn;
      guessEl.hidden = false;
      guessEl.innerHTML = `AI predicts: <b>${x.toFixed(1)}${s.unit?.x || ''}</b> → <b>${y.toFixed(1)}${s.unit?.y || ''}</b>`;
    }
    draw();
  });
  canvas.addEventListener('mouseleave', () => { state.hoverX = null; guessEl.hidden = true; draw(); });

  body.querySelectorAll('[data-story-key]').forEach(b => b.addEventListener('click', () => loadStory(b.dataset.storyKey)));
  body.querySelector('[data-seed]').addEventListener('click', () => {
    state.points = state.scn.seed.map(([x,y]) => ({
      x: x + (Math.random()-0.5) * (state.scn.xMax-state.scn.xMin)*0.02,
      y: y + (Math.random()-0.5) * (state.scn.yMax-state.scn.yMin)*0.04,
    }));
    state.coef = null; body.querySelector('[data-result]').hidden = true; draw();
  });
  body.querySelector('[data-clear]').addEventListener('click', () => {
    state.points = []; state.coef = null; body.querySelector('[data-result]').hidden = true; draw();
  });
  const degIn = body.querySelector('[data-deg]');
  const degLabel = body.querySelector('[data-degv]');
  const degName = ['straight', 'gentle curve', 'S-curve', 'wavy', 'very wiggly'];
  degIn.addEventListener('input', () => {
    state.deg = +degIn.value; degLabel.textContent = degName[state.deg-1];
    if (state.coef) fit();
  });
  body.querySelector('[data-fit]').addEventListener('click', fit);

  body.querySelectorAll('[data-scn]').forEach(b => b.addEventListener('click', () => {
    const key = b.dataset.scn;
    if (key === 'regress') return;
    if (key === 'descent') { mountDescent(body); return; }
    if (key === 'vision') { mountVision(body); return; }
    if (key === 'sklearn') { mountSklearn(body); return; }
    if (key === 'classify') { mountClassifier(body); return; }
  }));

  loadStory('study');
  setTimeout(() => { resize(); draw(); }, 30);
}

// ================== TEACH YOUR CAMERA — webcam + MobileNet + KNN ==================
let _tfDepsPromise = null;
function loadTfDeps() {
  if (_tfDepsPromise) return _tfDepsPromise;
  _tfDepsPromise = (async () => {
    const load = (src) => new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = src; s.async = true;
      s.onload = res; s.onerror = () => rej(new Error('failed to load ' + src));
      document.head.appendChild(s);
    });
    await load('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js');
    await Promise.all([
      load('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js'),
      load('https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier@1.2.4/dist/knn-classifier.min.js'),
    ]);
    return { tf: window.tf, mobilenet: window.mobilenet, knnClassifier: window.knnClassifier };
  })();
  return _tfDepsPromise;
}

function mountVision(body) {
  const PALETTE = ['#89b4fa', '#f9e2af', '#a6e3a1', '#f38ba8'];
  const state = {
    classes: [
      { name: 'Class A', count: 0 },
      { name: 'Class B', count: 0 },
    ],
    net: null, knn: null, tf: null,
    stream: null, running: false, predicting: false,
    lastPred: null,
  };

  body.innerHTML = `
    <div class="pg-root pg-game pg-vision">
      <aside class="pg-side">
        <div class="pg-scenario-pick">
          <div class="pg-h">Scenario</div>
          <div class="pg-scn-grid">
            <button class="pg-scn" data-scn="classify"><span>🍎🐱📧</span><b>Classify things</b></button>
            <button class="pg-scn" data-scn="regress"><span>📈</span><b>Predict a number</b></button>
            <button class="pg-scn" data-scn="descent"><span>🎢</span><b>How AI learns</b></button>
            <button class="pg-scn active" data-scn="vision"><span>🖼️</span><b>Teach your camera</b></button>
            <button class="pg-scn" data-scn="sklearn"><span>🐍</span><b>Real sklearn</b></button>
          </div>
        </div>

        <div class="pg-story">
          A real image classifier — running entirely in your browser. MobileNet
          extracts a feature vector from every frame, then a k-NN classifier
          learns to tell your classes apart. No server, no upload.
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">1</span> Name your classes</div>
          <div class="pg-vc-list" data-classes></div>
          <button class="pg-btn" data-add-class>＋ Add class</button>
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">2</span> Show examples</div>
          <div class="pg-tiny">Hold the "Capture" button on a class to add frames while you move the object around. Aim for 20-50 per class.</div>
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">3</span> Live prediction</div>
          <div class="pg-tiny" data-status>Loading MobileNet…</div>
          <button class="pg-btn warn" data-reset>↺  Reset training</button>
        </div>
      </aside>

      <div class="pg-canvas-wrap pg-vc-stage">
        <video autoplay playsinline muted data-video></video>
        <div class="pg-vc-overlay">
          <div class="pg-vc-top" data-toplabel>Waiting for camera…</div>
          <div class="pg-vc-bars" data-bars></div>
        </div>
        <div class="pg-toast" data-toast></div>
      </div>
    </div>`;

  const video = body.querySelector('[data-video]');
  const statusEl = body.querySelector('[data-status]');
  const toast = body.querySelector('[data-toast]');
  const topLabel = body.querySelector('[data-toplabel]');
  const barsEl = body.querySelector('[data-bars]');

  function showToast(m) {
    toast.textContent = m; toast.classList.add('show');
    clearTimeout(showToast._t); showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function renderClasses() {
    const list = body.querySelector('[data-classes]');
    list.innerHTML = state.classes.map((c, i) => `
      <div class="pg-vc-row" style="--cc:${PALETTE[i % PALETTE.length]}">
        <span class="pg-vc-dot"></span>
        <input class="pg-vc-name" data-name="${i}" value="${escapeHtml(c.name)}" />
        <span class="pg-vc-count" data-count="${i}">${c.count}</span>
        <button class="pg-btn tiny primary" data-cap="${i}">Capture</button>
        ${state.classes.length > 2 ? `<button class="pg-btn tiny" data-del="${i}" title="Remove">×</button>` : ''}
      </div>
    `).join('');
    list.querySelectorAll('[data-name]').forEach(inp => inp.addEventListener('input', e => {
      state.classes[+e.target.dataset.name].name = e.target.value || 'Class';
      renderBars();
    }));
    list.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', () => {
      const i = +btn.dataset.del;
      state.classes.splice(i, 1);
      // rebuild KNN without that class's examples
      rebuildKnn();
      renderClasses(); renderBars();
    }));
    list.querySelectorAll('[data-cap]').forEach(btn => {
      const i = +btn.dataset.cap;
      const hold = { on: false, timer: null };
      const start = (e) => { e.preventDefault(); hold.on = true; btn.classList.add('active'); tick(); };
      const stop = () => { hold.on = false; btn.classList.remove('active'); };
      const tick = async () => {
        if (!hold.on) return;
        await captureExample(i);
        hold.timer = setTimeout(tick, 90);
      };
      btn.addEventListener('mousedown', start);
      btn.addEventListener('touchstart', start);
      ['mouseup','mouseleave','touchend','touchcancel'].forEach(ev => btn.addEventListener(ev, stop));
      // single click also captures one
      btn.addEventListener('click', () => { if (!hold.on) captureExample(i); });
    });
  }

  function renderBars() {
    barsEl.innerHTML = state.classes.map((c, i) => {
      const pred = state.lastPred && state.lastPred.confidences[i] != null ? state.lastPred.confidences[i] : 0;
      return `<div class="pg-vc-bar" style="--cc:${PALETTE[i % PALETTE.length]}">
        <span class="pg-vc-blabel">${escapeHtml(c.name)}</span>
        <div class="pg-vc-btrack"><div class="pg-vc-bfill" style="width:${(pred*100).toFixed(0)}%"></div></div>
        <span class="pg-vc-bpct">${(pred*100).toFixed(0)}%</span>
      </div>`;
    }).join('');
  }

  async function captureExample(classIdx) {
    if (!state.net || !state.knn) return showToast('Model still loading…');
    if (video.readyState < 2) return;
    const activation = state.net.infer(video, true);
    state.knn.addExample(activation, classIdx);
    activation.dispose();
    state.classes[classIdx].count++;
    body.querySelector(`[data-count="${classIdx}"]`).textContent = state.classes[classIdx].count;
    statusEl.textContent = totalExamples() + ' examples trained. Move the object around and add more.';
  }

  function totalExamples() { return state.classes.reduce((a,c) => a + c.count, 0); }

  function rebuildKnn() {
    // Simplest correct reset — clear and require user to re-capture. Warn once.
    if (state.knn && totalExamples() > 0) {
      state.knn.clearAllClasses();
      state.classes.forEach(c => c.count = 0);
      showToast('Class removed — training reset.');
    }
  }

  async function predictLoop() {
    if (state.predicting) return;
    state.predicting = true;
    while (state.running) {
      if (state.net && state.knn && state.knn.getNumClasses() > 0 && video.readyState >= 2) {
        const act = state.net.infer(video, true);
        try {
          const res = await state.knn.predictClass(act, Math.min(5, Math.max(1, Math.min(...state.classes.filter(c=>c.count>0).map(c=>c.count)))));
          // res.classIndex, res.confidences {0: 0.7, 1: 0.3}
          state.lastPred = res;
          const idx = +res.label;
          const cls = state.classes[idx];
          if (cls) topLabel.textContent = `${cls.name}  ·  ${(res.confidences[idx]*100).toFixed(0)}%`;
          renderBars();
        } catch (e) { /* ignore transient */ }
        act.dispose();
      } else if (state.knn && state.knn.getNumClasses() === 0) {
        topLabel.textContent = 'Capture examples to start predicting';
      }
      await new Promise(r => setTimeout(r, 100));
    }
    state.predicting = false;
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 }, audio: false });
      state.stream = stream;
      video.srcObject = stream;
      await new Promise(r => video.onloadedmetadata = r);
      await video.play();
    } catch (e) {
      statusEl.textContent = 'Camera blocked. Allow webcam access and reopen this scenario.';
      topLabel.textContent = 'Camera unavailable';
      throw e;
    }
  }

  async function init() {
    try {
      renderClasses(); renderBars();
      statusEl.textContent = 'Loading TensorFlow.js + MobileNet (~5MB, first time only)…';
      const deps = await loadTfDeps();
      state.tf = deps.tf;
      await startCamera();
      state.net = await deps.mobilenet.load({ version: 2, alpha: 1.0 });
      state.knn = deps.knnClassifier.create();
      statusEl.textContent = 'Ready. Hold "Capture" on a class while showing it to the camera.';
      topLabel.textContent = 'Ready — show me something';
      state.running = true;
      predictLoop();
    } catch (e) {
      console.error(e);
      statusEl.textContent = 'Setup failed: ' + (e?.message || 'unknown error');
    }
  }

  // wire top-level controls
  body.querySelector('[data-add-class]').addEventListener('click', () => {
    if (state.classes.length >= 4) return showToast('Max 4 classes.');
    state.classes.push({ name: 'Class ' + String.fromCharCode(65 + state.classes.length), count: 0 });
    renderClasses(); renderBars();
  });
  body.querySelector('[data-reset]').addEventListener('click', () => {
    if (state.knn) state.knn.clearAllClasses();
    state.classes.forEach(c => c.count = 0);
    state.lastPred = null;
    renderClasses(); renderBars();
    statusEl.textContent = 'Training cleared. Add examples again.';
    topLabel.textContent = 'Ready — show me something';
  });

  body.querySelectorAll('[data-scn]').forEach(b => b.addEventListener('click', () => {
    const key = b.dataset.scn;
    if (key === 'vision') return;
    // cleanup before leaving
    state.running = false;
    if (state.stream) state.stream.getTracks().forEach(t => t.stop());
    if (key === 'descent') { mountDescent(body); return; }
    if (key === 'regress') { mountRegression(body); return; }
    if (key === 'sklearn') { mountSklearn(body); return; }
    if (key === 'classify') { mountClassifier(body); return; }
  }));

  // stop camera if window closed
  const win = body.closest('.win');
  if (win) {
    const obs = new MutationObserver(() => {
      if (!document.body.contains(win)) {
        state.running = false;
        if (state.stream) state.stream.getTracks().forEach(t => t.stop());
        obs.disconnect();
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  init();
}

// ================== REAL SKLEARN — Pyodide + California housing ==================
let _pyodidePromise = null;
function loadPyodideOnce(onProgress) {
  if (_pyodidePromise) return _pyodidePromise;
  _pyodidePromise = (async () => {
    onProgress && onProgress('Downloading Pyodide runtime (~10 MB)…');
    await new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
      s.onload = res; s.onerror = () => rej(new Error('Failed to load Pyodide script'));
      document.head.appendChild(s);
    });
    onProgress && onProgress('Booting Python interpreter…');
    const py = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
    onProgress && onProgress('Installing numpy, pandas, scikit-learn…');
    await py.loadPackage(['numpy', 'pandas', 'scikit-learn']);
    return py;
  })();
  return _pyodidePromise;
}

const SKLEARN_CODE = `import numpy as np, pandas as pd, json
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# 1. Load the diabetes dataset — 442 patients, 10 features.
#    Ships inside scikit-learn, so no network fetch is needed.
data = load_diabetes(as_frame=True)
X, y = data.data, data.target

# 2. Train / test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. Fit a plain linear regression (closed-form OLS)
model = LinearRegression()
model.fit(X_train, y_train)

# 4. Predict + evaluate
y_pred = model.predict(X_test)
rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
r2   = float(r2_score(y_test, y_pred))

coefs = sorted(
    [{"feature": f, "weight": float(w)} for f, w in zip(X.columns, model.coef_)],
    key=lambda d: abs(d["weight"]), reverse=True
)

# Scatter of predicted vs actual on the test set
scatter = [[float(a), float(p)] for a, p in zip(y_test.tolist(), y_pred.tolist())]

json.dumps({
    "dataset": "sklearn.datasets.load_diabetes",
    "n_train": len(X_train), "n_test": len(X_test),
    "rmse": rmse, "r2": r2,
    "intercept": float(model.intercept_),
    "coefs": coefs, "scatter": scatter,
    "features": list(X.columns),
})
`;

function mountSklearn(body) {
  body.innerHTML = `
    <div class="pg-root pg-game pg-sklearn">
      <aside class="pg-side">
        <div class="pg-scenario-pick">
          <div class="pg-h">Scenario</div>
          <div class="pg-scn-grid">
            <button class="pg-scn" data-scn="classify"><span>🍎🐱📧</span><b>Classify things</b></button>
            <button class="pg-scn" data-scn="regress"><span>📈</span><b>Predict a number</b></button>
            <button class="pg-scn" data-scn="descent"><span>🎢</span><b>How AI learns</b></button>
            <button class="pg-scn" data-scn="vision"><span>🖼️</span><b>Teach your camera</b></button>
            <button class="pg-scn active" data-scn="sklearn"><span>🐍</span><b>Real sklearn</b></button>
          </div>
        </div>

        <div class="pg-story">
          <b>This is not a simulation.</b> A real Python interpreter runs
          <code>scikit-learn</code> in your browser via Pyodide. It loads the
          California housing dataset, trains a <b>LinearRegression</b>, and
          returns the metrics you see on the right — the exact same code as a
          Jupyter notebook.
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">1</span> Load Python</div>
          <button class="pg-btn primary big" data-load>🐍  Load Python + sklearn</button>
          <div class="pg-tiny" data-status>~10 MB one-time download. Cached after first run.</div>
        </div>

        <div>
          <div class="pg-h"><span class="pg-step">2</span> Train the model</div>
          <button class="pg-btn primary big" data-run disabled>▶  Run script</button>
          <div class="pg-tiny">Fits <code>LinearRegression()</code> on 16,512 rows in ~1 s.</div>
        </div>
      </aside>

      <main class="pg-main pg-sk-main">
        <div class="pg-sk-grid">
          <section class="pg-sk-card pg-sk-code">
            <header>california_housing.py</header>
            <pre><code data-code></code></pre>
          </section>
          <section class="pg-sk-card pg-sk-out">
            <header>Output</header>
            <div class="pg-sk-metrics" data-metrics>
              <div class="pg-sk-empty">Load Python, then run the script.</div>
            </div>
            <canvas data-scatter width="520" height="360"></canvas>
          </section>
        </div>
      </main>
    </div>
  `;

  body.querySelector('[data-code]').textContent = SKLEARN_CODE;

  const statusEl = body.querySelector('[data-status]');
  const loadBtn  = body.querySelector('[data-load]');
  const runBtn   = body.querySelector('[data-run]');
  const metrics  = body.querySelector('[data-metrics]');
  const canvas   = body.querySelector('[data-scatter]');
  const ctx      = canvas.getContext('2d');

  let py = null;

  loadBtn.addEventListener('click', async () => {
    loadBtn.disabled = true;
    try {
      py = await loadPyodideOnce(msg => { statusEl.textContent = msg; });
      statusEl.textContent = 'Python ready. scikit-learn loaded.';
      loadBtn.textContent = '✓  Python loaded';
      runBtn.disabled = false;
    } catch (e) {
      statusEl.textContent = 'Failed to load Python: ' + e.message;
      loadBtn.disabled = false;
    }
  });

  runBtn.addEventListener('click', async () => {
    if (!py) return;
    runBtn.disabled = true;
    metrics.innerHTML = '<div class="pg-sk-empty">Running… fitting model on 16,512 samples.</div>';
    const t0 = performance.now();
    try {
      const raw = await py.runPythonAsync(SKLEARN_CODE);
      const r = JSON.parse(raw);
      const ms = (performance.now() - t0).toFixed(0);
      renderResults(r, ms);
    } catch (e) {
      metrics.innerHTML = '<div class="pg-sk-empty" style="color:#f38ba8">Error: ' + escapeHtml(e.message) + '</div>';
    }
    runBtn.disabled = false;
    runBtn.textContent = '▶  Run again';
  });

  function renderResults(r, ms) {
    metrics.innerHTML = `
      <div class="pg-sk-stats">
        <div class="pg-sk-stat"><b>${r.r2.toFixed(3)}</b><span>R² score</span></div>
        <div class="pg-sk-stat"><b>${r.rmse.toFixed(3)}</b><span>RMSE ($100k)</span></div>
        <div class="pg-sk-stat"><b>${r.n_train.toLocaleString()}</b><span>train rows</span></div>
        <div class="pg-sk-stat"><b>${ms} ms</b><span>fit + predict</span></div>
      </div>
      <div class="pg-sk-coefs">
        <div class="pg-h" style="margin:8px 0 6px">Feature weights (by magnitude)</div>
        ${r.coefs.map(c => {
          const max = Math.max(...r.coefs.map(x => Math.abs(x.weight)));
          const pct = (Math.abs(c.weight) / max) * 100;
          const pos = c.weight >= 0;
          return `<div class="pg-sk-bar">
            <span class="pg-sk-feat">${c.feature}</span>
            <span class="pg-sk-track"><span class="pg-sk-fill ${pos?'pos':'neg'}" style="width:${pct}%"></span></span>
            <span class="pg-sk-w">${c.weight.toFixed(3)}</span>
          </div>`;
        }).join('')}
      </div>
    `;
    drawScatter(r.scatter);
  }

  function drawScatter(pts) {
    const W = canvas.width, H = canvas.height, pad = 36;
    ctx.clearRect(0,0,W,H);
    // bg
    ctx.fillStyle = '#181825'; ctx.fillRect(0,0,W,H);
    // find range
    const all = pts.flat();
    const lo = Math.min(...all), hi = Math.max(...all);
    const sx = v => pad + (v - lo) / (hi - lo) * (W - pad*2);
    const sy = v => H - pad - (v - lo) / (hi - lo) * (H - pad*2);
    // axes
    ctx.strokeStyle = '#313244'; ctx.lineWidth = 1;
    ctx.strokeRect(pad, pad, W-pad*2, H-pad*2);
    // y=x reference
    ctx.strokeStyle = '#585b70'; ctx.setLineDash([4,4]);
    ctx.beginPath(); ctx.moveTo(sx(lo), sy(lo)); ctx.lineTo(sx(hi), sy(hi)); ctx.stroke();
    ctx.setLineDash([]);
    // points
    ctx.fillStyle = 'rgba(137,180,250,0.55)';
    pts.forEach(([a,p]) => { ctx.beginPath(); ctx.arc(sx(a), sy(p), 2.5, 0, Math.PI*2); ctx.fill(); });
    // labels
    ctx.fillStyle = '#a6adc8'; ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText('actual →', W - 70, H - 12);
    ctx.save(); ctx.translate(12, pad + 60); ctx.rotate(-Math.PI/2);
    ctx.fillText('predicted →', 0, 0); ctx.restore();
    ctx.fillStyle = '#6c7086'; ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('dashed line = perfect prediction', pad + 6, pad + 14);
  }

  body.querySelectorAll('[data-scn]').forEach(b => b.addEventListener('click', () => {
    const key = b.dataset.scn;
    if (key === 'sklearn') return;
    if (key === 'descent') { mountDescent(body); return; }
    if (key === 'regress') { mountRegression(body); return; }
    if (key === 'vision') { mountVision(body); return; }
    if (key === 'classify') { mountClassifier(body); return; }
  }));
}

function stripHtml(s) { const d = document.createElement('div'); d.innerHTML = s; return d.textContent || ''; }

// ---------- BOOT ----------
const BOOT_LINES = [
  { t: 'ok',  s: 'Started Load Kernel Modules.' },
  { t: 'ok',  s: 'Reached target System Initialization.' },
  { t: 'ok',  s: 'Mounted /home/niranjan.' },
  { t: 'ok',  s: 'Started Network Manager.' },
  { t: 'info',s: 'Loading Hyprland compositor…' },
  { t: 'ok',  s: 'Started waybar, hypridle, hyprpaper.' },
  { t: 'info',s: 'Applying Catppuccin Mocha theme.' },
  { t: 'ok',  s: 'Welcome to Arch Linux, niranjan.' }
];

function runBoot() {
  const boot = document.getElementById('boot');
  const log = document.getElementById('bootlog');
  const desktop = document.getElementById('desktop');
  let i = 0;
  const step = () => {
    if (i >= BOOT_LINES.length) {
      setTimeout(() => {
        boot.classList.add('gone');
        desktop.classList.add('up');
        desktop.setAttribute('aria-hidden', 'false');
        setTimeout(() => boot.remove(), 700);
        openApp('terminal');
      }, 400);
      return;
    }
    const l = BOOT_LINES[i++];
    const ok = l.t === 'ok' ? '<span class="ok">  OK  </span>' : l.t === 'no' ? '<span class="no"> FAIL </span>' : '<span class="info">  ..  </span>';
    log.insertAdjacentHTML('beforeend', `[${ok}] ${l.s}\n`);
    setTimeout(step, 180 + Math.random() * 120);
  };
  step();
}

// ---------- WIRING ----------
function tickClock() {
  const el = document.getElementById('wb-clock');
  if (!el) return;
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  el.textContent = `${hh}:${mm}`;
}
setInterval(tickClock, 1000); tickClock();

document.addEventListener('DOMContentLoaded', () => {
  // ================== LANDING & VIEW SWITCHING ==================
  const landing = document.getElementById('landing');
  const simple = document.getElementById('simple');
  const boot = document.getElementById('boot');
  const desktop = document.getElementById('desktop');

  // Check if user has a saved preference
  const savedView = localStorage.getItem('portfolioView'); // 'desktop' | 'simple' | null

  // Mobile detection
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const forceDesktop = localStorage.getItem('forceDesktop') === '1';

  // If mobile and not forcing desktop, show mobile view (CSS handles this)
  if (isMobile && !forceDesktop) {
    if (landing) landing.classList.add('hidden');
    return; // mobile view rendered via CSS
  }

  // If user previously chose "simple", skip landing and show simple portfolio
  if (savedView === 'simple') {
    if (landing) landing.classList.add('hidden');
    if (boot) boot.style.display = 'none';
    if (desktop) desktop.style.display = 'none';
    if (simple) { simple.classList.add('active'); simple.setAttribute('aria-hidden', 'false'); }
    document.body.classList.add('view-simple');
    initSimpleView();
    return;
  }

  // If user previously chose "desktop", skip landing and boot directly
  if (savedView === 'desktop') {
    if (landing) landing.classList.add('hidden');
    runBoot();
    initDesktop();
    return;
  }

  // Otherwise, show the landing screen for user to choose
  if (landing) {
    // Landing screen buttons
    const landingDesktop = document.getElementById('landingDesktop');
    const landingSimple = document.getElementById('landingSimple');

    if (landingDesktop) {
      landingDesktop.addEventListener('click', () => {
        localStorage.setItem('portfolioView', 'desktop');
        landing.classList.add('gone');
        setTimeout(() => {
          landing.classList.add('hidden');
          runBoot();
          initDesktop();
        }, 400);
      });
    }

    if (landingSimple) {
      landingSimple.addEventListener('click', () => {
        localStorage.setItem('portfolioView', 'simple');
        landing.classList.add('gone');
        setTimeout(() => {
          landing.classList.add('hidden');
          if (boot) boot.style.display = 'none';
          if (desktop) desktop.style.display = 'none';
          if (simple) { simple.classList.add('active'); simple.setAttribute('aria-hidden', 'false'); }
          document.body.classList.add('view-simple');
          initSimpleView();
        }, 400);
      });
    }
  }

  function initSimpleView() {
    // Switch to desktop button in simple view
    const sSwitchDesktop = document.getElementById('sSwitchDesktop');
    if (sSwitchDesktop) {
      sSwitchDesktop.addEventListener('click', () => {
        localStorage.setItem('portfolioView', 'desktop');
        location.reload();
      });
    }
  }

  function initDesktop() {
    // Persistent "force desktop" override for mobile users who want the full OS.
    if (localStorage.getItem('forceDesktop') === '1') {
      document.body.classList.add('force-desktop');
    }
    const forceBtn = document.getElementById('mForceDesktop');
    if (forceBtn) {
      forceBtn.addEventListener('click', () => {
        localStorage.setItem('forceDesktop', '1');
        location.reload();
      });
    }

    document.querySelectorAll('[data-open]').forEach(b => {
      b.addEventListener('click', () => openApp(b.dataset.open));
    });

    // context menu on desktop
    const ctx = document.getElementById('ctxmenu');
    const desk = document.getElementById('desktop');
    desk.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.win') || e.target.closest('.dock') || e.target.closest('.waybar')) return;
      e.preventDefault();
      ctx.innerHTML = `
        <li data-a="terminal">Open Terminal <kbd>Super+↵</kbd></li>
        <li data-a="launcher">App Launcher <kbd>Super+Space</kbd></li>
        <li data-a="files">Files</li>
        <li class="sep"></li>
        <li data-a="projects">Projects</li>
        <li data-a="playground">Dataset Playground</li>
        <li data-a="about">About Me</li>
        <li data-a="contact">Contact</li>
        <li class="sep"></li>
        <li data-a="editor">New Note</li>
        <li data-a="htop">System Monitor</li>
        <li data-a="settings">Settings</li>
        <li class="sep"></li>
        <li data-a="screenshot">Screenshot</li>
        <li data-a="github">GitHub ↗</li>
        <li class="sep"></li>
        <li data-a="simple">Switch to Simple View</li>
      `;
      ctx.classList.add('show');
      ctx.style.left = Math.min(e.clientX, window.innerWidth - 240) + 'px';
      ctx.style.top = Math.min(e.clientY, window.innerHeight - 400) + 'px';
      ctx.querySelectorAll('li[data-a]').forEach(li => {
        li.addEventListener('click', () => {
          ctx.classList.remove('show');
          const a = li.dataset.a;
          if (a === 'simple') {
            localStorage.setItem('portfolioView', 'simple');
            location.reload();
          } else if (a === 'terminal') openApp('terminal');
          else if (a === 'launcher') { document.getElementById('launcher').classList.add('show'); document.getElementById('launcher-input').focus(); }
          else if (a === 'files') openApp('files');
          else if (a === 'projects') openApp('projects');
          else if (a === 'playground') openApp('playground');
          else if (a === 'about') openApp('about');
          else if (a === 'contact') openApp('contact');
          else if (a === 'editor') openApp('editor');
          else if (a === 'htop') openApp('htop');
          else if (a === 'settings') openApp('settings');
          else if (a === 'screenshot') takeScreenshot();
          else if (a === 'github') window.open(GITHUB, '_blank');
        });
      });
    });
  }

  // Initialize based on user choice or saved preference
  // (landing screen logic is above - if we reach here, we're initializing desktop or simple)

  // launcher
  document.getElementById('wb-launcher')?.addEventListener('click', openLauncher);
  wireLauncher();
  // calendar
  document.getElementById('wb-clock')?.addEventListener('click', toggleCalendar);
  document.addEventListener('click', (e) => {
    const cp = document.getElementById('calpop');
    if (cp && !e.target.closest('#calpop') && !e.target.closest('#wb-clock')) cp.classList.remove('show');
  });
  // workspaces UI
  renderWorkspaces();

  // shortcuts
  window.addEventListener('keydown', (e) => {
    const isLauncherOpen = document.getElementById('launcher')?.classList.contains('show');
    // Super+Enter → terminal
    if ((e.metaKey || e.altKey) && e.key === 'Enter') { e.preventDefault(); openApp('terminal'); return; }
    // Super+Space → launcher
    if ((e.metaKey || e.altKey) && e.code === 'Space') { e.preventDefault(); openLauncher(); return; }
    // Super+1..4 → workspace switch
    if ((e.metaKey || e.altKey) && ['1','2','3','4'].includes(e.key)) { e.preventDefault(); WM.switchWs(+e.key); return; }
    // Super+Shift+1..4 → move focused window to workspace
    if ((e.metaKey || e.altKey) && e.shiftKey && ['!','@','#','$'].includes(e.key)) {
      e.preventDefault();
      const map = {'!':1,'@':2,'#':3,'$':4};
      if (WM.focused) WM.moveToWs(WM.focused, map[e.key]);
      return;
    }
    // Super+D → toggle-all-minimize
    if ((e.metaKey || e.altKey) && (e.key === 'd' || e.key === 'D')) {
      e.preventDefault();
      WM.windows.forEach((w, k) => WM.minimize(k));
      return;
    }
    // Escape closes launcher/calendar first, then focused window
    if (e.key === 'Escape') {
      if (isLauncherOpen) { closeLauncher(); return; }
      const cp = document.getElementById('calpop');
      if (cp?.classList.contains('show')) { cp.classList.remove('show'); return; }
      if (WM.focused && !e.target.closest('input,textarea')) WM.close(WM.focused);
    }
  });
});

// ============================================================
// TEXT EDITOR
// ============================================================
function openEditor(path) {
  const id = 'editor:' + path;
  const node = getNode(path);
  if (node && node.type === 'dir') return;
  WM.spawn(id, {
    title: (path ? path.split('/').pop() : 'untitled') + ' — nvim',
    subtitle: displayPath(path),
    width: 780, height: 540,
    mount: (body, close) => mountEditor(body, close, path)
  });
}

function mountEditor(body, close, path) {
  // Fallback: no explicit path (from launcher) → open a scratch buffer
  path = path || (HOME + '/notes/scratch-' + Date.now() + '.md');
  let node = getNode(path);
  if (!node) {
    const parent = getNode(path.replace(/\/[^/]+$/, '') || '/');
    const name = path.split('/').pop();
    if (parent && parent.type === 'dir') {
      parent.children[name] = F('', { icon: '📄', openApp: 'editor' });
      node = parent.children[name];
    }
  }
  const rawContent = node ? stripHtml(node.content || '') : '';
  body.innerHTML = `
    <div class="editor-app">
      <div class="editor-toolbar">
        <span class="ed-path"><b>${escapeHtml(path.split('/').pop())}</b> <span style="opacity:.6">— ${escapeHtml(displayPath(path))}</span> <span class="ed-dirty" data-dirty></span></span>
        <button class="editor-btn" data-act="save">Save <kbd style="opacity:.7">⌘S</kbd></button>
        <button class="editor-btn" data-act="close">Close</button>
      </div>
      <textarea class="editor-area" spellcheck="false" data-ta></textarea>
    </div>`;
  const ta = body.querySelector('[data-ta]');
  const dirty = body.querySelector('[data-dirty]');
  ta.value = rawContent;
  let clean = ta.value;
  const markDirty = () => { dirty.textContent = ta.value === clean ? '' : '● unsaved'; };
  ta.addEventListener('input', markDirty);
  const save = () => {
    if (node) {
      node.content = ta.value;
      // strip openApp on saved files so double-click keeps opening in editor
      node.openApp = 'editor';
    }
    clean = ta.value;
    markDirty();
    notify('Saved', displayPath(path));
  };
  body.querySelector('[data-act="save"]').addEventListener('click', save);
  body.querySelector('[data-act="close"]').addEventListener('click', close);
  ta.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); save(); }
  });
  setTimeout(() => ta.focus(), 50);
}

// ============================================================
// HTOP (GUI)
// ============================================================
function mountHtop(body, close) {
  body.innerHTML = `
    <div class="htop-app">
      <div class="htop-bars" id="htop-bars"></div>
      <table class="htop-table">
        <thead><tr><th>PID</th><th>USER</th><th>%CPU</th><th>%MEM</th><th>COMMAND</th></tr></thead>
        <tbody id="htop-tbody"></tbody>
      </table>
    </div>`;
  const bars = body.querySelector('#htop-bars');
  const tbody = body.querySelector('#htop-tbody');
  const cores = 4;
  const procs = [
    { pid: 1337, user: 'niranjan', cmd: 'hyprland',  base: 12 },
    { pid: 1338, user: 'niranjan', cmd: 'ghostty',    base: 6 },
    { pid: 1420, user: 'niranjan', cmd: 'zsh',        base: 2 },
    { pid: 1999, user: 'niranjan', cmd: 'curiosity',  base: 42 },
    { pid: 2001, user: 'niranjan', cmd: 'python (sklearn)', base: 18 },
    { pid: 2077, user: 'niranjan', cmd: 'firefox',    base: 22 },
    { pid: 2100, user: 'niranjan', cmd: 'code',       base: 9 },
    { pid: 2200, user: 'root',     cmd: 'systemd',    base: 1 },
  ];
  const state = { alive: true };
  function tick() {
    if (!state.alive) return;
    const cpus = Array.from({length: cores}, () => Math.max(4, Math.min(98, 30 + Math.random() * 55)));
    const mem = 22 + Math.random() * 18;
    const swp = 3 + Math.random() * 4;
    bars.innerHTML = cpus.map((c, i) => `
      <div class="htop-row"><span class="lbl">CPU${i}</span><div class="htop-bar"><div class="fill" style="width:${c.toFixed(0)}%"></div></div><span class="val">${c.toFixed(0)}%</span></div>`).join('') +
      `<div class="htop-row mem"><span class="lbl">MEM</span><div class="htop-bar"><div class="fill" style="width:${mem.toFixed(0)}%"></div></div><span class="val">${mem.toFixed(1)}%</span></div>` +
      `<div class="htop-row mem"><span class="lbl">SWP</span><div class="htop-bar"><div class="fill" style="width:${swp.toFixed(0)}%"></div></div><span class="val">${swp.toFixed(1)}%</span></div>`;
    const rows = procs.map(pr => {
      const cpu = Math.max(0.1, pr.base + (Math.random() - 0.5) * 8);
      const mem = Math.max(0.1, pr.base / 3 + Math.random() * 4);
      const hi = cpu > 40 ? 'p' : '';
      return `<tr><td>${pr.pid}</td><td>${pr.user}</td><td class="${hi}">${cpu.toFixed(1)}</td><td>${mem.toFixed(1)}</td><td>${pr.cmd}</td></tr>`;
    }).join('');
    tbody.innerHTML = rows;
    setTimeout(tick, 1200);
  }
  tick();
  // stop on close
  const win = body.closest('.win');
  const obs = new MutationObserver(() => { if (!document.body.contains(win)) { state.alive = false; obs.disconnect(); } });
  obs.observe(document.body, { childList: true, subtree: true });
}

// ============================================================
// SETTINGS
// ============================================================
const ACCENTS = {
  Blue:   '#89b4fa',
  Mauve:  '#cba6f7',
  Pink:   '#f5c2e7',
  Teal:   '#94e2d5',
  Green:  '#a6e3a1',
  Peach:  '#fab387',
  Red:    '#f38ba8',
  Yellow: '#f9e2af',
};
const SETTINGS_KEY = 'niranjan.settings.v1';
const DEFAULT_SETTINGS = {
  theme: 'dark',        // 'dark' or 'light'
  accent: '',           // css color, '' means keep theme default
  wallpaper: 'default', // 'default' keeps the original image wallpaper
  animations: true,
  spotlight: false,
  reducedMotion: false,
  showSkipPill: true,
  clock24: true,
};
function loadSettings() {
  try { return { ...DEFAULT_SETTINGS, ...(JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')) }; }
  catch { return { ...DEFAULT_SETTINGS }; }
}
function saveSettings(s) { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }

const DEFAULT_WP_CSS = "var(--base) url('assets/wallpaper.jpg') center/cover no-repeat fixed";
const WALLPAPERS = {
  default:{ name: 'Default',    css: DEFAULT_WP_CSS },
  mocha:  { name: 'Mocha',      css: 'radial-gradient(1200px 800px at 20% 10%, #1e1e2e 0%, #181825 55%, #11111b 100%)' },
  peach:  { name: 'Peach dusk', css: 'radial-gradient(1200px 800px at 20% 10%, #3a2a2e 0%, #241b25 55%, #14101b 100%)' },
  blue:   { name: 'Deep blue',  css: 'radial-gradient(1200px 800px at 20% 10%, #1a2340 0%, #131a2e 55%, #0b1020 100%)' },
  green:  { name: 'Forest',     css: 'radial-gradient(1200px 800px at 20% 10%, #1a2e24 0%, #131f19 55%, #0b1611 100%)' },
};

function applySettings(s) {
  const theme = s.theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  if (s.accent) document.documentElement.style.setProperty('--mauve', s.accent);
  else document.documentElement.style.removeProperty('--mauve');
  if (s.wallpaper && s.wallpaper !== 'default') {
    document.body.style.background = WALLPAPERS[s.wallpaper]?.css || DEFAULT_WP_CSS;
  } else {
    document.body.style.background = '';
  }

  document.documentElement.classList.toggle('no-anim', !s.animations || s.reducedMotion);
  document.documentElement.classList.toggle('reduce-motion', s.reducedMotion);
  const spot = document.getElementById('spotlight');
  if (spot) spot.style.display = s.spotlight ? '' : 'none';
  const skip = document.getElementById('skipPill');
  if (skip) skip.style.display = s.showSkipPill ? '' : 'none';
  window.__clock24 = s.clock24;
  const wbTheme = document.getElementById('wb-theme');
  if (wbTheme) wbTheme.textContent = theme === 'light' ? '☀️' : '🌙';
}

// Waybar theme quick-toggle
document.addEventListener('click', (e) => {
  const btn = e.target.closest && e.target.closest('#wb-theme');
  if (!btn) return;
  const s = loadSettings();
  s.theme = s.theme === 'light' ? 'dark' : 'light';
  applySettings(s); saveSettings(s);
  if (typeof notify === 'function') notify('Theme updated', s.theme === 'light' ? 'Light mode (Latte)' : 'Dark mode (Mocha)');
});

// Apply persisted settings ASAP on load (migrate legacy wallpaper default)
try {
  const _s = loadSettings();
  if (['mocha','peach','blue','green'].includes(_s.wallpaper) && !localStorage.getItem(SETTINGS_KEY + '.migrated')) {
    _s.wallpaper = 'default';
    saveSettings(_s);
    localStorage.setItem(SETTINGS_KEY + '.migrated', '1');
  }
  applySettings(_s);
} catch {}


function mountSettings(body) {
  const s = loadSettings();
  const currentAccent = (s.accent || getComputedStyle(document.documentElement).getPropertyValue('--mauve').trim());
  const row = (label, hint, control) => `
    <div class="set-row">
      <div><div class="set-lbl">${label}</div><div class="set-hint">${hint}</div></div>
      <div>${control}</div>
    </div>`;
  const toggle = (key, on) => `<button class="set-toggle ${on ? 'on' : ''}" data-toggle="${key}" role="switch" aria-checked="${on}"><span class="knob"></span></button>`;

  body.innerHTML = `
    <div class="set-wrap">
      <aside class="set-nav">
        <button class="set-tab active" data-tab="appearance">🎨 Appearance</button>
        <button class="set-tab" data-tab="behavior">⚙️ Behavior</button>
        <button class="set-tab" data-tab="keyboard">⌨️ Keyboard</button>
        <button class="set-tab" data-tab="about">ℹ️ About</button>
      </aside>
      <section class="set-body">
        <div class="set-pane" data-pane="appearance">
          <h2>Appearance</h2>
          ${row('Light mode', 'Switch the desktop between Catppuccin Mocha and Latte', toggle('themeLight', s.theme === 'light'))}
          ${row('Accent color', 'Tint used across the desktop', '<div id="acc-swatches" class="set-swatches"></div>')}
          ${row('Wallpaper', 'Desktop background gradient', '<div id="wp-swatches" class="set-swatches"></div>')}
          ${row('Cursor spotlight', 'Soft glow that follows your pointer', toggle('spotlight', s.spotlight))}
        </div>
        <div class="set-pane" data-pane="behavior" hidden>
          <h2>Behavior</h2>
          ${row('Window animations', 'Fade & slide on open/close', toggle('animations', s.animations))}
          ${row('Reduced motion', 'Disable all non-essential motion', toggle('reducedMotion', s.reducedMotion))}
          ${row('Quick-access pill', 'Show Résumé / Projects / Contact shortcut', toggle('showSkipPill', s.showSkipPill))}
          ${row('24-hour clock', 'Waybar clock format', toggle('clock24', s.clock24))}
          <div class="set-row"><div><div class="set-lbl">Reset layout</div><div class="set-hint">Close all windows, clear icon positions</div></div>
            <div><button class="set-btn" data-reset>Reset</button></div></div>
          <div class="set-row"><div><div class="set-lbl">Switch to Simple View</div><div class="set-hint">View portfolio without the OS experience</div></div>
            <div><button class="set-btn" data-simple>Switch</button></div></div>
          <div class="set-row"><div><div class="set-lbl">Back to Landing</div><div class="set-hint">Show the choice screen again on next visit</div></div>
            <div><button class="set-btn" data-landing>Clear</button></div></div>
        </div>
        <div class="set-pane" data-pane="keyboard" hidden>
          <h2>Keyboard shortcuts</h2>
          <table class="set-kbd">
            <tr><td>Super + Enter</td><td>Open terminal</td></tr>
            <tr><td>Super + Space</td><td>App launcher</td></tr>
            <tr><td>Super + 1..4</td><td>Switch workspace</td></tr>
            <tr><td>Super + Shift + 1..4</td><td>Move window to workspace</td></tr>
            <tr><td>Super + D</td><td>Minimize all</td></tr>
            <tr><td>Drag to edge</td><td>Snap left / right / top</td></tr>
            <tr><td>Double-click header</td><td>Maximize / restore</td></tr>
            <tr><td>?</td><td>Show cheatsheet</td></tr>
          </table>
        </div>
        <div class="set-pane" data-pane="about" hidden>
          <h2>About</h2>
          <div class="set-about">
            <div><b>niranjan@arch</b></div>
            <div class="dim">Hyprland 0.42 · Catppuccin Mocha · Waybar 0.10</div>
            <div class="dim" style="margin-top:10px">Built as an interactive portfolio using vanilla JS, CSS, and a pinch of Pyodide for the live sklearn playground.</div>
            <div style="margin-top:14px"><a href="${GITHUB}" target="_blank" rel="noopener" class="set-link">↗ github.com/TGvenomYT</a></div>
          </div>
        </div>
      </section>
    </div>`;

  // tab switching
  body.querySelectorAll('.set-tab').forEach(t => t.addEventListener('click', () => {
    body.querySelectorAll('.set-tab').forEach(x => x.classList.toggle('active', x === t));
    body.querySelectorAll('.set-pane').forEach(p => p.hidden = p.dataset.pane !== t.dataset.tab);
  }));

  // accent swatches
  const accHost = body.querySelector('#acc-swatches');
  accHost.innerHTML = Object.entries(ACCENTS).map(([n, c]) =>
    `<button data-c="${c}" title="${n}" class="sw" style="background:${c};box-shadow:0 0 12px ${c};${c === currentAccent ? 'outline:2px solid #fff' : ''}"></button>`
  ).join('');
  accHost.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => {
    s.accent = b.dataset.c;
    accHost.querySelectorAll('.sw').forEach(x => x.style.outline = 'none');
    b.style.outline = '2px solid #fff';
    applySettings(s); saveSettings(s);
    notify('Accent updated', b.title);
  }));

  // wallpaper swatches
  const wpHost = body.querySelector('#wp-swatches');
  wpHost.innerHTML = Object.entries(WALLPAPERS).map(([k, w]) =>
    `<button data-wp="${k}" title="${w.name}" class="sw" style="background:${w.css};${k === s.wallpaper ? 'outline:2px solid #fff' : ''}"></button>`
  ).join('');
  wpHost.querySelectorAll('[data-wp]').forEach(b => b.addEventListener('click', () => {
    s.wallpaper = b.dataset.wp;
    wpHost.querySelectorAll('.sw').forEach(x => x.style.outline = 'none');
    b.style.outline = '2px solid #fff';
    applySettings(s); saveSettings(s);
    notify('Wallpaper', WALLPAPERS[b.dataset.wp].name);
  }));

  // toggles
  body.querySelectorAll('[data-toggle]').forEach(btn => btn.addEventListener('click', () => {
    const k = btn.dataset.toggle;
    if (k === 'themeLight') {
      s.theme = s.theme === 'light' ? 'dark' : 'light';
      const isLight = s.theme === 'light';
      btn.classList.toggle('on', isLight);
      btn.setAttribute('aria-checked', isLight);
      notify('Theme updated', isLight ? 'Light mode' : 'Dark mode');
    } else {
      s[k] = !s[k];
      btn.classList.toggle('on', s[k]);
      btn.setAttribute('aria-checked', s[k]);
    }
    applySettings(s); saveSettings(s);
  }));

  // reset
  body.querySelector('[data-reset]')?.addEventListener('click', () => {
    [...WM.windows.keys()].forEach(id => WM.close(id));
    localStorage.removeItem('niranjan.deskicons.v1');
    notify('Layout reset', 'Reload to see fresh icon positions');
  });

  // switch to simple view
  body.querySelector('[data-simple]')?.addEventListener('click', () => {
    localStorage.setItem('portfolioView', 'simple');
    location.reload();
  });

  // clear preference to show landing again
  body.querySelector('[data-landing]')?.addEventListener('click', () => {
    localStorage.removeItem('portfolioView');
    notify('Preference cleared', 'You\'ll see the landing screen on your next visit');
  });
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function notify(title, body = '', timeout = 4000) {
  const host = document.getElementById('notifications');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'notif';
  el.innerHTML = `<div class="n-title">${escapeHtml(title)}</div>${body ? `<div class="n-body">${escapeHtml(body)}</div>` : ''}`;
  host.appendChild(el);
  const close = () => { el.classList.add('closing'); setTimeout(() => el.remove(), 220); };
  el.addEventListener('click', close);
  setTimeout(close, timeout);
}

function flashScreen() {
  const f = document.createElement('div');
  f.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:99999;pointer-events:none;opacity:.85;transition:opacity .35s ease;';
  document.body.appendChild(f);
  requestAnimationFrame(() => f.style.opacity = '0');
  setTimeout(() => f.remove(), 400);
}

// ============================================================
// CALENDAR POPUP
// ============================================================
let calViewDate = new Date();
function toggleCalendar() {
  const cp = document.getElementById('calpop');
  if (cp.classList.contains('show')) { cp.classList.remove('show'); return; }
  calViewDate = new Date();
  renderCalendar();
  cp.classList.add('show');
}
function renderCalendar() {
  const cp = document.getElementById('calpop');
  const now = new Date();
  const view = calViewDate;
  const y = view.getFullYear(), m = view.getMonth();
  const first = new Date(y, m, 1).getDay();
  const daysIn = new Date(y, m + 1, 0).getDate();
  const monthName = view.toLocaleString('en', { month: 'long' });
  const cells = [];
  for (let i = 0; i < first; i++) cells.push({ dim: true, n: '' });
  for (let d = 1; d <= daysIn; d++) {
    const today = d === now.getDate() && m === now.getMonth() && y === now.getFullYear();
    cells.push({ n: d, today });
  }
  const time = now.toTimeString().slice(0, 5);
  const dateStr = now.toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  cp.innerHTML = `
    <div class="cal-time">${time}</div>
    <div class="cal-date">${dateStr}</div>
    <div class="cal-head">
      <button class="cal-nav" data-nav="-1">‹</button>
      <div class="cal-month">${monthName} ${y}</div>
      <button class="cal-nav" data-nav="1">›</button>
    </div>
    <div class="cal-grid">
      ${['S','M','T','W','T','F','S'].map(d => `<div class="cal-dow">${d}</div>`).join('')}
      ${cells.map(c => `<div class="cal-day ${c.today ? 'today' : ''} ${c.dim ? 'dim' : ''}">${c.n}</div>`).join('')}
    </div>`;
  cp.querySelectorAll('.cal-nav').forEach(b => b.addEventListener('click', () => {
    calViewDate = new Date(y, m + (+b.dataset.nav), 1);
    renderCalendar();
  }));
}

// ============================================================
// APP LAUNCHER
// ============================================================
const LAUNCHER_ITEMS = () => {
  const apps = [
    { id: 'terminal',   ico: '', t: 'Terminal',        s: 'ghostty' },
    { id: 'files',      ico: '🗂',  t: 'Files',           s: 'file manager' },
    { id: 'projects',   ico: '📁', t: 'Projects',        s: 'portfolio' },
    { id: 'playground', ico: '🧪', t: 'Dataset Playground', s: 'sklearn-live' },
    { id: 'editor',     ico: '📝', t: 'Text Editor',     s: 'nvim' },
    { id: 'about',      ico: '📄', t: 'About Me',        s: 'about.md' },
    { id: 'contact',    ico: '✉️', t: 'Contact',         s: 'get in touch' },
    { id: 'htop',       ico: '📊', t: 'System Monitor',  s: 'htop' },
    { id: 'settings',   ico: '⚙️', t: 'Settings',        s: 'appearance & shortcuts' },
    { id: 'neofetch',   ico: '🐧', t: 'Neofetch',        s: 'system info' },
  ];
  // recent files from VFS
  const recent = [];
  const walk = (node, path) => {
    if (!node || node.type !== 'dir') return;
    for (const [n, ch] of Object.entries(node.children)) {
      if (n.startsWith('.')) continue;
      if (ch.type === 'file') recent.push({ id: 'file:' + path + '/' + n, ico: ch.icon || '📄', t: n, s: displayPath(path + '/' + n), _path: path + '/' + n });
      else if (recent.length < 40) walk(ch, path + '/' + n);
    }
  };
  walk(getNode(HOME), HOME);
  return [...apps, ...recent];
};

let launcherState = { items: [], filtered: [], sel: 0 };

function wireLauncher() {
  const input = document.getElementById('launcher-input');
  input.addEventListener('input', () => filterLauncher(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); launcherState.sel = Math.min(launcherState.filtered.length - 1, launcherState.sel + 1); renderLauncherList(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); launcherState.sel = Math.max(0, launcherState.sel - 1); renderLauncherList(); }
    else if (e.key === 'Enter') { e.preventDefault(); activateLauncher(); }
  });
  document.getElementById('launcher').addEventListener('click', (e) => {
    if (e.target.id === 'launcher') closeLauncher();
  });
}

function openLauncher() {
  const el = document.getElementById('launcher');
  launcherState.items = LAUNCHER_ITEMS();
  launcherState.filtered = launcherState.items;
  launcherState.sel = 0;
  const input = document.getElementById('launcher-input');
  input.value = '';
  renderLauncherList();
  el.classList.add('show');
  setTimeout(() => input.focus(), 30);
}
function closeLauncher() { document.getElementById('launcher').classList.remove('show'); }

function filterLauncher(q) {
  q = q.toLowerCase().trim();
  if (!q) launcherState.filtered = launcherState.items;
  else launcherState.filtered = launcherState.items.filter(it => (it.t + ' ' + it.s).toLowerCase().includes(q));
  launcherState.sel = 0;
  renderLauncherList();
}
function renderLauncherList() {
  const list = document.getElementById('launcher-list');
  list.innerHTML = launcherState.filtered.slice(0, 40).map((it, i) => `
    <li class="launcher-item ${i === launcherState.sel ? 'sel' : ''}" data-i="${i}">
      <span class="li-ico">${it.ico}</span>
      <div><div class="li-t">${escapeHtml(it.t)}</div><div class="li-s">${escapeHtml(it.s)}</div></div>
    </li>`).join('') || '<li style="padding:14px;color:var(--overlay1);font:500 12px monospace">no results</li>';
  list.querySelectorAll('.launcher-item').forEach(li => {
    li.addEventListener('click', () => { launcherState.sel = +li.dataset.i; activateLauncher(); });
    li.addEventListener('mouseenter', () => { launcherState.sel = +li.dataset.i; renderLauncherList(); });
  });
  const sel = list.querySelector('.launcher-item.sel');
  if (sel) sel.scrollIntoView({ block: 'nearest' });
}
function activateLauncher() {
  const it = launcherState.filtered[launcherState.sel];
  if (!it) return;
  closeLauncher();
  if (it._path) openFsItem(it._path);
  else openApp(it.id);
}

// ============================================================
// WOW + POLISH + RECRUITER SHORTCUTS
// ============================================================
(function initWowLayer() {
  const ready = () => {
    initSpotlight();
    initParallax();
    initDraggableDesktopIcons();
    initSkipPill();
    initCheatsheet();
    initQuickKeys();
    initWelcome();
    initConfettiTriggers();
    hookWindowFocusGlow();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();

  // ---- Cursor spotlight ----
  function initSpotlight() {
    const sp = document.getElementById('spotlight');
    const desk = document.querySelector('.desktop');
    if (!sp || !desk) return;
    let raf = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        sp.style.setProperty('--mx', tx + 'px');
        sp.style.setProperty('--my', ty + 'px');
        raf = 0;
      });
    }, { passive: true });
  }

  // ---- Wallpaper parallax ----
  function initParallax() {
    const desk = document.querySelector('.desktop');
    if (!desk) return;
    let raf = 0, mx = 0, my = 0;
    window.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        desk.style.setProperty('--px', (50 + mx * 2.5) + '%');
        desk.style.setProperty('--py', (50 + my * 2.5) + '%');
        raf = 0;
      });
    }, { passive: true });
  }

  // ---- Draggable desktop icons w/ persistence ----
  function initDraggableDesktopIcons() {
    const grid = document.getElementById('deskIcons');
    if (!grid) return;
    const KEY = 'lv.deskIconPos.v1';
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch {}
    const icons = [...grid.querySelectorAll('.dicon')];
    icons.forEach((ic, i) => {
      const name = ic.dataset.open || ('i' + i);
      ic.dataset.n = name;
      const pos = saved[name];
      if (pos) {
        ic.style.position = 'absolute';
        ic.style.left = pos.x + 'px';
        ic.style.top = pos.y + 'px';
        grid.style.position = 'relative';
        grid.style.width = 'calc(100vw - 40px)';
        grid.style.height = 'calc(100vh - 80px)';
        grid.style.display = 'block';
      }
      let dragging = false, sx, sy, ox, oy, moved = false;
      ic.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        dragging = true; moved = false;
        sx = e.clientX; sy = e.clientY;
        const r = ic.getBoundingClientRect();
        const gr = grid.getBoundingClientRect();
        ox = r.left - gr.left; oy = r.top - gr.top;
        ic.style.zIndex = '20';
      });
      window.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        if (!moved && Math.hypot(dx, dy) < 5) return;
        if (!moved) {
          moved = true;
          grid.style.position = 'relative';
          grid.style.width = 'calc(100vw - 40px)';
          grid.style.height = 'calc(100vh - 80px)';
          grid.style.display = 'block';
          ic.style.position = 'absolute';
          ic.style.left = ox + 'px';
          ic.style.top = oy + 'px';
        }
        ic.style.left = Math.max(0, ox + dx) + 'px';
        ic.style.top  = Math.max(0, oy + dy) + 'px';
      });
      window.addEventListener('mouseup', () => {
        if (!dragging) return;
        dragging = false;
        ic.style.zIndex = '';
        if (moved) {
          saved[ic.dataset.n] = { x: parseInt(ic.style.left), y: parseInt(ic.style.top) };
          try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch {}
        }
      });
      // suppress click if it was a drag
      ic.addEventListener('click', (e) => { if (moved) { e.stopImmediatePropagation(); e.preventDefault(); moved = false; } }, true);
    });
    // Right-click on desktop → "Reset icons"
    window.addEventListener('desk-reset-icons', () => {
      localStorage.removeItem(KEY);
      icons.forEach(ic => { ic.style.position = ''; ic.style.left = ''; ic.style.top = ''; });
      grid.style.position = ''; grid.style.width = ''; grid.style.height = ''; grid.style.display = '';
      if (typeof notify === 'function') notify('Desktop', 'Icon positions reset');
    });
  }

  // ---- Skip pill ----
  function initSkipPill() {
    const pill = document.getElementById('skipPill');
    if (!pill) return;
    const dismissed = localStorage.getItem('lv.skipPill.dismissed') === '1';
    setTimeout(() => { if (!dismissed) pill.classList.add('show'); }, 2200);
    pill.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-skip]'); if (!btn) return;
      const a = btn.dataset.skip;
      if (a === 'dismiss') { pill.classList.remove('show'); localStorage.setItem('lv.skipPill.dismissed', '1'); return; }
      if (a === 'resume')   openResume();
      if (a === 'projects') openApp('projects');
      if (a === 'contact')  openApp('contact');
      if (a === 'tour')     startTour();
    });
  }

  function openResume() {
    // Prefer opening resume.txt in editor if present
    if (typeof getNode === 'function') {
      const n = getNode('~/resume.txt') || getNode('~/about.md');
      if (n && typeof openFsItem === 'function') { openFsItem('~/resume.txt'); return; }
    }
    openApp('about');
  }

  // ---- Cheatsheet ----
  function initCheatsheet() {
    const cs = document.getElementById('cheatsheet');
    if (!cs) return;
    cs.querySelector('.cs-close')?.addEventListener('click', () => cs.classList.remove('show'));
    cs.addEventListener('click', (e) => { if (e.target === cs) cs.classList.remove('show'); });
  }
  function toggleCheatsheet() {
    const cs = document.getElementById('cheatsheet');
    cs?.classList.toggle('show');
  }

  // ---- Quick keys for recruiters (unmodified single-letter) ----
  function initQuickKeys() {
    window.addEventListener('keydown', (e) => {
      if (e.target.closest('input,textarea,[contenteditable="true"]')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // ? = cheatsheet
      if (e.key === '?') { e.preventDefault(); toggleCheatsheet(); return; }
      const map = {
        r: openResume,
        R: openResume,
        p: () => openApp('projects'),
        P: () => openApp('projects'),
        c: () => openApp('contact'),
        C: () => openApp('contact'),
        t: () => openApp('terminal'),
        T: () => openApp('terminal'),
        g: () => window.open('https://github.com/tgvenomyt', '_blank', 'noopener'),
        G: () => window.open('https://github.com/tgvenomyt', '_blank', 'noopener'),
      };
      const fn = map[e.key];
      if (fn) { e.preventDefault(); fn(); }
    });
  }

  // ---- First-visit welcome ----
  function initWelcome() {
    if (localStorage.getItem('lv.welcome.seen') === '1') return;
    setTimeout(() => {
      if (typeof WM === 'undefined') return;
      WM.spawn('welcome', {
        title: 'welcome.md',
        subtitle: 'read me first',
        width: 560, height: 420,
        mount: (body, close) => {
          body.innerHTML = `
            <div class="welcome-body">
              <h1>Hey — welcome 👋</h1>
              <div class="wel-sub">You've landed on Niranjan's portfolio, disguised as an Arch Linux + Hyprland desktop.</div>
              <p>Everything here is real: drag windows, use workspaces, run terminal commands. Nothing is a screenshot.</p>
              <p>Not a Linux person? Just press <kbd>?</kbd> for the cheatsheet, or use the pill in the top-right to jump straight to my résumé, projects or contact.</p>
              <p style="color:var(--overlay1);font-size:12px;margin-top:14px">Try: <kbd>Super</kbd>+<kbd>Space</kbd> to launch apps · type <code style="color:var(--green)">matrix</code> in the terminal · <kbd>?</kbd> for shortcuts.</p>
              <div class="welcome-cta">
                <button data-w="resume">📄 View résumé</button>
                <button data-w="projects">📁 See projects</button>
                <button data-w="tour" class="wc-ghost">✨ Take the tour</button>
                <button data-w="close" class="wc-ghost">Explore on my own</button>
              </div>
            </div>`;
          body.addEventListener('click', (e) => {
            const b = e.target.closest('[data-w]'); if (!b) return;
            const a = b.dataset.w;
            if (a === 'resume') { openResume(); close(); }
            else if (a === 'projects') { openApp('projects'); close(); }
            else if (a === 'tour') { close(); startTour(); }
            else close();
          });
        }
      });
      localStorage.setItem('lv.welcome.seen', '1');
    }, 1200);
  }

  // ---- Guided tour ----
  function startTour() {
    const steps = [
      { sel: '.waybar', text: 'This is Waybar — workspaces on the left, clock in the middle, system stats on the right.' },
      { sel: '#wb-workspaces', text: 'Four workspaces. Click them or press Super+1..4 to switch.' },
      { sel: '.desk-icons', text: 'Desktop icons — click to open, drag to rearrange (positions save).' },
      { sel: '#skipPill', text: 'Recruiter mode: one click to my résumé, projects, or contact.' },
      { sel: '.hyprwidget', text: 'System widget with a shortcuts hint. Press ? anytime for the full cheatsheet.' },
    ];
    let i = 0;
    const tip = document.createElement('div');
    tip.style.cssText = 'position:fixed;z-index:600;padding:12px 16px;max-width:280px;border-radius:10px;background:color-mix(in oklab,var(--base) 92%,transparent);border:1px solid color-mix(in oklab,var(--mauve) 45%,transparent);backdrop-filter:blur(14px);box-shadow:0 30px 60px -20px rgba(0,0,0,.7),0 0 40px -10px color-mix(in oklab,var(--mauve) 50%,transparent);font-family:var(--sans);color:var(--text);font-size:13px;line-height:1.5;transition:all .3s ease;';
    document.body.appendChild(tip);
    const ring = document.createElement('div');
    ring.style.cssText = 'position:fixed;z-index:599;pointer-events:none;border:2px solid var(--mauve);border-radius:12px;box-shadow:0 0 0 9999px rgba(0,0,0,.55),0 0 30px color-mix(in oklab,var(--mauve) 60%,transparent);transition:all .35s cubic-bezier(.2,.9,.3,1.2);';
    document.body.appendChild(ring);
    function show() {
      const s = steps[i]; const el = document.querySelector(s.sel);
      if (!el) { next(); return; }
      const r = el.getBoundingClientRect();
      const pad = 8;
      ring.style.left = (r.left - pad) + 'px';
      ring.style.top = (r.top - pad) + 'px';
      ring.style.width = (r.width + pad*2) + 'px';
      ring.style.height = (r.height + pad*2) + 'px';
      tip.innerHTML = `<div style="color:var(--mauve);font-family:var(--mono);font-size:11px;margin-bottom:6px">Step ${i+1} / ${steps.length}</div>
        <div>${s.text}</div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
          <button data-t="skip" style="background:transparent;border:0;color:var(--overlay1);cursor:pointer;font-size:12px">Skip</button>
          <button data-t="next" style="background:var(--mauve);color:var(--base);border:0;border-radius:6px;padding:6px 12px;cursor:pointer;font-size:12px;font-weight:600">${i === steps.length-1 ? 'Done' : 'Next →'}</button>
        </div>`;
      // Position tip below or above ring
      const tipY = r.bottom + 14 > window.innerHeight - 100 ? r.top - 120 : r.bottom + 14;
      const tipX = Math.min(window.innerWidth - 310, Math.max(20, r.left));
      tip.style.left = tipX + 'px';
      tip.style.top = Math.max(60, tipY) + 'px';
    }
    function next() { i++; if (i >= steps.length) end(); else show(); }
    function end() { tip.remove(); ring.remove(); if (typeof notify === 'function') notify('Tour complete', 'Press ? anytime for shortcuts'); }
    tip.addEventListener('click', (e) => {
      if (e.target.dataset.t === 'next') next();
      else if (e.target.dataset.t === 'skip') end();
    });
    show();
  }

  // ---- Window focus glow ----
  function hookWindowFocusGlow() {
    if (typeof WM === 'undefined' || !WM.focus) return;
    const orig = WM.focus.bind(WM);
    WM.focus = function (id) {
      orig(id);
      document.querySelectorAll('.win').forEach(w => w.classList.remove('focus'));
      const w = WM.windows.get(id); if (w) w.el.classList.add('focus');
    };
  }

  // ---- Confetti ----
  function confettiBurst(opts) {
    const c = document.getElementById('confetti'); if (!c) return;
    const ctx = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    const N = (opts && opts.count) || 160;
    const colors = ['#cba6f7','#f9e2af','#a6e3a1','#f38ba8','#89b4fa','#fab387','#94e2d5'];
    const parts = Array.from({ length: N }, () => ({
      x: window.innerWidth/2, y: window.innerHeight/2,
      vx: (Math.random()-0.5) * 14,
      vy: (Math.random()-0.5) * 14 - 4,
      g: 0.28 + Math.random()*0.15,
      s: 4 + Math.random()*4,
      r: Math.random()*Math.PI, vr: (Math.random()-0.5)*0.3,
      c: colors[(Math.random()*colors.length)|0],
      life: 90 + Math.random()*40
    }));
    let t = 0;
    (function tick() {
      ctx.clearRect(0,0,c.width,c.height);
      parts.forEach(p => {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life--;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s/2, -p.s/2, p.s, p.s*1.5);
        ctx.restore();
      });
      t++;
      if (t < 160) requestAnimationFrame(tick);
      else ctx.clearRect(0,0,c.width,c.height);
    })();
  }
  window.confettiBurst = confettiBurst;

  function initConfettiTriggers() {
    // Intercept terminal easter eggs via CMDS.sudo if it exists
    if (typeof CMDS === 'object' && CMDS) {
      const origSudo = CMDS.sudo;
      CMDS.sudo = function (args, p, c, s) {
        const line = (args || []).join(' ').toLowerCase();
        if (line.includes('hire') && (line.includes('niranjan') || line.includes('me'))) {
          p('<b class="mauve">✓ Access granted.</b> Deploying celebratory particles… 🎉', 'ok');
          confettiBurst();
          setTimeout(() => confettiBurst({ count: 120 }), 400);
          return;
        }
        if (origSudo) return origSudo(args, p, c, s);
        p('[sudo] password for niranjan: ' + '•'.repeat(8), 'dim');
        setTimeout(() => p('Sorry, try `sudo hire niranjan` 😉', 'err'), 500);
      };
      // party command
      CMDS.party = (a, p) => { p('🎉 partying…', 'ok'); confettiBurst(); };
    }
  }
})();
