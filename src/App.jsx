import { useEffect, useMemo, useRef, useState } from 'react';
import {
  browsers,
  countries,
  emails,
  fallbackBreaches,
  fallbackStats,
  incidents,
  news,
  protocols,
  quizQuestions,
  tickerItems,
  vpns
} from './data/content.js';
import { useApi } from './hooks/useApi.js';
import { useCountUp } from './hooks/useCountUp.js';

const breachFallback = { stats: fallbackStats, breaches: fallbackBreaches };
const toolsFallback = {
  tools: [
    { name: 'Bitwarden', category: 'Password Manager', verdict: 'Trusted', score: 92 },
    { name: 'Signal', category: 'Messaging', verdict: 'Trusted', score: 96 },
    { name: 'uBlock Origin', category: 'Tracker Blocker', verdict: 'Trusted', score: 89 },
    { name: 'Mullvad VPN', category: 'VPN', verdict: 'Trusted', score: 94 },
    { name: 'Tor Browser', category: 'Browser', verdict: 'High Privacy', score: 95 },
    { name: 'Proton Mail', category: 'Email', verdict: 'Trusted', score: 90 }
  ]
};

function Count({ value, className = 'big' }) {
  const [ref, current] = useCountUp(value);
  return (
    <div ref={ref} className={className}>
      {current}
    </div>
  );
}

function Badge({ children, tone = 'high' }) {
  return <span className={`badge ${tone.toLowerCase()}`}>{children}</span>;
}

function InfoStrip() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker" aria-label="Live privacy ticker">
      <div className="ticker-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
      <div className="ticker-live">
        <i className="dot" /> THREAT: <span>HIGH</span>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className={`nav ${open ? 'open' : ''}`}>
      <a className="logo" href="#top">
        0_ERASURE
      </a>
      <div className="nav-links">
        <a href="#surveillance">Surveillance</a>
        <a href="#tools">Privacy Tools</a>
        <a href="#breach">Breach Tracker</a>
        <a href="#encryption">Encryption</a>
        <a href="#manifesto">Manifesto</a>
      </div>
      <a className="btn primary nav-cta" href="#terminal">
        Report Incident -&gt;
      </a>
      <button className="menu-btn" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
        =
      </button>
    </nav>
  );
}

function CctvCanvas() {
  const ref = useRef(null);
  useCanvas(ref, (ctx, width, height, tick) => {
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 650; i += 1) {
      ctx.fillStyle = `rgba(${80 + Math.random() * 80},${80 + Math.random() * 80},${70 + Math.random() * 70},.06)`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
    ctx.strokeStyle = 'rgba(212,86,10,.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width * 0.52, height * 0.42, Math.min(width, height) * 0.16, 0, 7);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width * 0.52, height * 0.18);
    ctx.lineTo(width * 0.52, height * 0.68);
    ctx.moveTo(width * 0.28, height * 0.42);
    ctx.lineTo(width * 0.76, height * 0.42);
    ctx.stroke();
    ctx.fillStyle = 'rgba(180,180,160,.09)';
    ctx.beginPath();
    ctx.ellipse(width * 0.52, height * 0.43, width * 0.13, height * 0.22, 0, 0, 7);
    ctx.fill();
    ctx.fillStyle = 'rgba(212,86,10,.22)';
    ctx.fillRect(0, (tick * 130) % (height + 100) - 50, width, 3);
  });
  return <canvas ref={ref} />;
}

function WorldMapCanvas() {
  const ref = useRef(null);
  useCanvas(ref, (ctx, width, height, tick) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(212,86,10,.18)';
    for (let i = 0; i < 10; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, (i * height) / 10);
      ctx.lineTo(width, (i * height) / 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo((i * width) / 10, 0);
      ctx.lineTo((i * width) / 10, height);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(212,86,10,.12)';
    [
      [0.12, 0.35, 0.28, 0.28],
      [0.32, 0.48, 0.18, 0.22],
      [0.49, 0.34, 0.18, 0.24],
      [0.66, 0.48, 0.25, 0.2],
      [0.72, 0.25, 0.16, 0.14]
    ].forEach(([x, y, w, h]) => ctx.fillRect(x * width, y * height, w * width, h * height));
    [
      [0.24, 0.38, '#cc2200'],
      [0.55, 0.42, '#d4560a'],
      [0.72, 0.55, '#cc2200'],
      [0.42, 0.62, '#22c55e'],
      [0.83, 0.32, '#d4560a']
    ].forEach(([x, y, color], index) => {
      const radius = 8 + Math.sin(tick * 4 + index) * 6;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8;
      ctx.arc(x * width, y * height, radius, 0, 7);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    ctx.fillStyle = 'rgba(212,86,10,.25)';
    ctx.fillRect(0, (tick * 95) % height, width, 2);
  });
  return <canvas ref={ref} />;
}

function RadarCanvas() {
  const ref = useRef(null);
  useCanvas(ref, (ctx, width, height, tick) => {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.36;
    ctx.strokeStyle = 'rgba(212,86,10,.28)';
    for (let i = 1; i < 5; i += 1) {
      ctx.beginPath();
      ctx.arc(cx, cy, (radius * i) / 4, 0, 7);
      ctx.stroke();
    }
    ctx.strokeStyle = '#d4560a';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(tick) * radius, cy + Math.sin(tick) * radius);
    ctx.stroke();
    ctx.fillStyle = 'rgba(240,240,240,.08)';
    ctx.beginPath();
    ctx.arc(cx, cy - 25, 32, 0, 7);
    ctx.fill();
    ctx.fillRect(cx - 34, cy + 10, 68, 100);
    for (let i = 0; i < 18; i += 1) {
      const angle = tick + i * 0.7;
      const orbit = radius * (0.45 + (i % 5) / 8);
      ctx.fillStyle = i % 4 ? '#d4560a' : '#cc2200';
      ctx.beginPath();
      ctx.arc(cx + Math.cos(angle) * orbit, cy + Math.sin(angle) * orbit, 4, 0, 7);
      ctx.fill();
    }
  });
  return <canvas ref={ref} />;
}

function useCanvas(ref, draw) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    let frame;
    let tick = 0;

    const size = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
    };

    const render = () => {
      tick += 0.016;
      draw(context, canvas.width, canvas.height, tick);
      frame = requestAnimationFrame(render);
    };

    size();
    window.addEventListener('resize', size);
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', size);
    };
  }, [draw, ref]);
}

function Hero() {
  const [coords, setCoords] = useState('');
  const [remaining, setRemaining] = useState('00:00:00:00');

  useEffect(() => {
    const text = '37.7749 N, 122.4194 W / YOU ARE BEING OBSERVED';
    let cursor = 0;
    const interval = setInterval(() => {
      setCoords(text.slice(0, cursor));
      cursor += 1;
      if (cursor > text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const deadline = Date.now() + 85632000;
    const interval = setInterval(() => {
      let seconds = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      const days = Math.floor(seconds / 86400);
      seconds %= 86400;
      const hours = Math.floor(seconds / 3600);
      seconds %= 3600;
      const minutes = Math.floor(seconds / 60);
      seconds %= 60;
      setRemaining([days, hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero section" id="top">
      <div className="wrap hero-grid">
        <div>
          <div className="tiny coords">{coords}</div>
          <h1 className="glitch" data-text="Privacy is not a feature.">
            Privacy is not a <span className="orange">feature.</span>
          </h1>
          <p className="copy">
            It is a fundamental human right. Take control. Protect your data. Reclaim your digital identity before your
            shadow becomes a permanent record.
          </p>
          <div className="actions">
            <a className="btn primary" href="#quiz">
              Protect Yourself -&gt;
            </a>
            <a className="btn" href="#manifesto">
              Read The Manifesto
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="tiny">Session Expires In</div>
              <div className="big">{remaining}</div>
              <div className="tiny">Days Hrs Min Sec</div>
            </div>
            <div className="stat">
              <div className="tiny">Privacy Score</div>
              <div className="big">62 / 100</div>
              <div className="bar">
                <i />
              </div>
            </div>
            <div className="stat">
              <div className="tiny">Threat Level</div>
              <div className="big orange">
                HIGH <i className="dot" />
              </div>
              <div className="tiny">Global surveillance active</div>
            </div>
          </div>
        </div>
        <div className="panel cctv">
          <CctvCanvas />
          <div className="meta tiny">
            <span>CAM 031</span>
            <span>
              <i className="dot" /> REC E:R
            </span>
          </div>
          <div className="breach-card">
            <div className="tiny">
              <i className="dot" /> Live Breach Feed
            </div>
            <div className="breach-grid">
              <div>
                <Count value={18249104} />
                <div className="tiny">Passwords leaked today</div>
              </div>
              <div>
                <Count value={1203} />
                <div className="tiny">Data breaches today</div>
              </div>
              <div className="col-span-full">
                <Count value={4700000000} />
                <div className="tiny">Records exposed today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BreachTracker({ breachData, apiStatus }) {
  const stats = breachData.stats;
  return (
    <section id="breach" className="section pad">
      <div className="wrap">
        <div className="label">02 Live Breach Tracker</div>
        <div className="sub">Real-time global breach feed - API status: {apiStatus}</div>
        <div className="grid tracker mt-6">
          <div className="panel">
            <div className="stat-list">
              <StatBox label="Total breaches" value={stats.totalBreaches} />
              <StatBox label="Records exposed" value={stats.recordsExposed} />
              <StatBox label="Compromised accounts" value={stats.compromisedAccounts} />
              <StatBox label="Data leaks" value={stats.dataLeaks} />
            </div>
            <div className="feed">
              {breachData.breaches.map((breach) => (
                <button className="feed-row" type="button" key={`${breach.time}-${breach.name}`}>
                  <span className="orange tiny">{breach.time}</span>
                  <strong>{breach.name}</strong>
                  <span>{breach.records}</span>
                  <Badge tone={breach.severity}>{breach.severity}</Badge>
                </button>
              ))}
            </div>
          </div>
          <div className="panel map">
            <WorldMapCanvas />
            <button className="btn primary map-action" type="button">
              Scan Again -&gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="stat-box">
      <div className="tiny">{label}</div>
      <Count value={value} />
    </div>
  );
}

function Footprint() {
  const [counts, setCounts] = useState(() => randomTrackerCounts());
  return (
    <section id="surveillance" className="section pad">
      <div className="wrap two">
        <div>
          <div className="label">03 Digital Footprint Map</div>
          <h2>See who is tracking you.</h2>
          <p className="mt-5">
            Advertising networks, analytics scripts, social pixels, and fingerprinting probes combine browsing patterns
            into a marketable identity.
          </p>
          <div className="panel radar mt-6">
            <RadarCanvas />
          </div>
        </div>
        <div className="panel self-end">
          {counts.map(([label, value]) => (
            <div className="cat" key={label}>
              <strong>{label}</strong>
              <b>{value}</b>
            </div>
          ))}
          <button className="btn primary m-5" type="button" onClick={() => setCounts(randomTrackerCounts())}>
            Scan Again -&gt;
          </button>
        </div>
      </div>
    </section>
  );
}

function randomTrackerCounts() {
  return ['AD TRACKERS', 'ANALYTICS SCRIPTS', 'SOCIAL PLUGINS', 'FINGERPRINT ATTEMPTS', 'GEO TRACKERS'].map(
    (label) => [label, Math.floor(Math.random() * 120) + 7]
  );
}

function Encryption() {
  const hex = useMemo(
    () =>
      Array.from({ length: 180 }, () =>
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' ')
      ).join('\n'),
    []
  );

  return (
    <section id="encryption" className="section pad">
      <div className="wrap grid">
        <div className="span-4">
          <div className="label">04 Encryption Explainer</div>
          <h2>Encryption is your shield.</h2>
          <p className="mt-5">
            Encryption turns readable information into protected ciphertext. Without the key, intercepted data becomes
            expensive noise.
          </p>
          <a className="btn mt-6" href="#tools">
            Learn More -&gt;
          </a>
        </div>
        <div className="panel flow span-5">
          <svg viewBox="0 0 620 300" aria-label="Encryption flow diagram">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#d4560a" />
              </marker>
            </defs>
            <rect x="24" y="55" width="130" height="70" fill="#141414" stroke="#2a2a2a" />
            <text x="48" y="96" fill="#f0f0f0" fontFamily="monospace" fontSize="14">
              YOUR DATA
            </text>
            <rect x="244" y="55" width="140" height="70" fill="#141414" stroke="#d4560a" />
            <text x="270" y="96" fill="#d4560a" fontFamily="monospace" fontSize="14">
              ENCRYPT
            </text>
            <rect x="464" y="55" width="130" height="70" fill="#141414" stroke="#2a2a2a" />
            <text x="480" y="96" fill="#f0f0f0" fontFamily="monospace" fontSize="14">
              CIPHERTEXT
            </text>
            <path
              d="M158 90 H238 M388 90 H458"
              stroke="#d4560a"
              strokeWidth="2"
              strokeDasharray="8 8"
              markerEnd="url(#arrow)"
            />
            <rect x="254" y="180" width="120" height="52" fill="#080808" stroke="#6b2a05" />
            <text x="284" y="212" fill="#d97706" fontFamily="monospace" fontSize="13">
              PRIVATE KEY
            </text>
            <path d="M314 178 V130" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow)" />
          </svg>
        </div>
        <div className="panel hex span-3">
          <div className="tiny orange">Encrypted Data</div>
          <pre>{hex}</pre>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="section pad">
      <div className="wrap two">
        <div>
          <div className="label">05 Privacy Manifesto</div>
          <h2>The right to privacy is the right to liberty.</h2>
          <p className="mt-5">
            Technology should serve people, not profile them. Privacy must be the default, not a luxury hidden behind
            paid plans and dark patterns.
          </p>
          <p className="mt-4">We fight surveillance. We expose exploitation. We build tools. We educate. We resist.</p>
          <a className="btn mt-6" href="#terminal">
            Read The Full Manifesto -&gt;
          </a>
        </div>
        <div className="poster">
          <h2>
            Privacy
            <br />
            <span className="orange">is power.</span>
            <br />
            Protect it.
          </h2>
          <p className="tiny mt-7 text-head">No surveillance. No exploitation. No exceptions.</p>
        </div>
      </div>
    </section>
  );
}

function Protocols() {
  return (
    <section className="section pad">
      <div className="wrap">
        <div className="label">06 Security Protocols</div>
        <div className="protocols panel">
          {protocols.map(([icon, title, body]) => (
            <div className="protocol" key={title}>
              <div className="icon">{icon}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SortableTable({ caption, columns, rows }) {
  const [sort, setSort] = useState({ index: 0, direction: 1 });
  const sortedRows = useMemo(
    () =>
      [...rows].sort((a, b) =>
        String(a[sort.index]).localeCompare(String(b[sort.index]), undefined, { numeric: true }) * sort.direction
      ),
    [rows, sort]
  );

  const toggleSort = (index) => {
    setSort((current) => ({
      index,
      direction: current.index === index ? current.direction * -1 : 1
    }));
  };

  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column} onClick={() => toggleSort(index)}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <tr key={row.join('-')}>
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Toolkit({ toolsData, apiStatus }) {
  return (
    <section id="tools" className="section pad">
      <div className="wrap">
        <div className="label">08 Toolkit</div>
        <h2>Privacy tools we trust.</h2>
        <p className="sub mt-3">API status: {apiStatus}</p>
        <div className="cards mt-6">
          {toolsData.tools.map((tool) => (
            <article className="panel card" key={tool.name}>
              <Badge tone="secure">{tool.verdict}</Badge>
              <h3 className="mt-5">{tool.name}</h3>
              <p className="mt-3">
                {tool.category}. Reviewed for privacy posture, transparency, and practical defensive value.
              </p>
              <div className="tiny mt-5">Trust score: {tool.score}/100</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineAndNews() {
  return (
    <>
      <section className="section pad">
        <div className="wrap">
          <div className="label">12 Incident Timeline</div>
          <div className="timeline">
            {incidents.map((incident) => (
              <article className="panel card time-card" key={incident}>
                <Badge tone="critical">Incident</Badge>
                <h3 className="mt-5">{incident}</h3>
                <a className="btn mt-5" href="#terminal">
                  Read More -&gt;
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section pad">
        <div className="wrap">
          <div className="label">13 Latest Security News</div>
          <div className="cards mt-6">
            {news.map((item, index) => (
              <article className="panel card" key={item}>
                <Badge tone={index % 3 ? 'high' : 'critical'}>{index % 3 ? 'Guide' : 'Breach'}</Badge>
                <h3 className="mt-5">{item}</h3>
                <p className="mt-3">A practical field note for reducing exposure and making better decisions.</p>
                <a className="btn mt-5" href="#terminal">
                  Read More -&gt;
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Terminal({ breaches }) {
  const [lines, setLines] = useState(['[OK] 0_ERASURE terminal initialized. Type help.']);
  const [input, setInput] = useState('');

  const commands = {
    help: 'help, scan, whoami, trackers, breach, encrypt <text>, decrypt <base64>, status, manifesto, vpn, score, clear',
    scan: '[INFO] scan complete: 47 trackers blocked, 3 exposed headers, DNS encrypted: yes',
    trackers: 'doubleclick.net, analytics.google.com, connect.facebook.net, ads.linkedin.com',
    breach: breaches.map((breach) => `${breach.time} | ${breach.name} | ${breach.records} | ${breach.severity}`).join('\n'),
    status: '[OK] encryption active\n[WARN] threat level high\n[OK] no cookies set',
    manifesto: 'Privacy is power. Default surveillance is a design failure.',
    vpn: 'Use a trustworthy no-log VPN for hostile networks. It does not make you anonymous by itself.',
    score: 'Open the Privacy Score Quiz section below.'
  };

  const runCommand = (event) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    setInput('');
    if (command === 'clear') {
      setLines([]);
      return;
    }
    let response = commands[command] || '[ERR] unknown command. Type help.';
    if (command === 'whoami') {
      response = `[INFO] platform=${navigator.platform}; languages=${navigator.languages.join(',')}; screen=${screen.width}x${screen.height}`;
    }
    if (command.startsWith('encrypt ')) {
      response = btoa(unescape(encodeURIComponent(command.slice(8))));
    }
    if (command.startsWith('decrypt ')) {
      try {
        response = decodeURIComponent(escape(atob(command.slice(8))));
      } catch {
        response = '[ERR] invalid base64';
      }
    }
    setLines((current) => [...current, `root@0-erasure:~$ ${command}`, response]);
  };

  return (
    <section id="terminal" className="section pad">
      <div className="wrap">
        <div className="label">14 Secure Terminal</div>
        <div className="terminal" role="application" aria-label="Interactive security terminal">
          <div className="term-head">
            <i className="light" />
            <i className="light" />
            <i className="light" />
            <span className="tiny">0_ERASURE shell</span>
          </div>
          <div className="term-body">
            {lines.map((line, index) => (
              <pre key={`${line}-${index}`}>{line}</pre>
            ))}
          </div>
          <form onSubmit={runCommand}>
            <input
              className="term-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              autoComplete="off"
              spellCheck="false"
              aria-label="Terminal command input"
              placeholder="type help and press enter"
            />
          </form>
        </div>
      </div>
    </section>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(false));
  const [result, setResult] = useState(null);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      if (!response.ok) throw new Error('score api failed');
      setResult(await response.json());
    } catch {
      const score = Math.max(
        0,
        Math.min(100, quizQuestions.reduce((total, [, weight], index) => total + (answers[index] ? weight : 0), 50))
      );
      const risk =
        score > 80
          ? 'STRONG - STAY VIGILANT'
          : score > 60
            ? 'MODERATE - ROOM TO IMPROVE'
            : score > 30
              ? 'HIGH RISK - TAKE ACTION'
              : 'CRITICAL - YOU ARE EXPOSED';
      setResult({ score, risk });
    }
  };

  return (
    <section id="quiz" className="section pad">
      <div className="wrap two">
        <div>
          <div className="label">15 Privacy Score Quiz</div>
          <h2>Check your exposure.</h2>
          <p className="mt-5">Ten operational questions produce a conservative risk score.</p>
          {result && (
            <div className="panel quiz-result">
              <h3>{result.score}/100</h3>
              <p className="orange">{result.risk}</p>
              <p>Start with a password manager, 2FA, ad blocking, private email, and encrypted messaging.</p>
            </div>
          )}
        </div>
        <form className="quiz" onSubmit={submit}>
          {quizQuestions.map(([question], index) => (
            <fieldset className="question" key={question}>
              <legend>
                {index + 1}. {question}
              </legend>
              <label>
                <input
                  type="radio"
                  name={`q${index}`}
                  checked={answers[index]}
                  onChange={() => setAnswers((current) => current.map((value, i) => (i === index ? true : value)))}
                />{' '}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name={`q${index}`}
                  checked={!answers[index]}
                  onChange={() => setAnswers((current) => current.map((value, i) => (i === index ? false : value)))}
                />{' '}
                No
              </label>
            </fieldset>
          ))}
          <button className="btn primary" type="submit">
            Calculate Score
          </button>
        </form>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="section pad cta">
      <div className="wrap two">
        <div>
          <div className="label">16 Join The Movement</div>
          <h2>Take back your digital life.</h2>
          <p className="mt-5">Join 125,000+ people reclaiming control of their data.</p>
          <div className="actions mt-6">
            <a className="btn primary" href="#quiz">
              Join The Movement -&gt;
            </a>
            <a className="btn" href="#manifesto">
              Support Our Work
            </a>
          </div>
        </div>
        <div className="cta-stats">
          <StatCard label="People protected" value={125000} />
          <StatCard label="Trackers blocked" value={8400000} />
          <StatCard label="Tools deployed" value={3200000} />
          <StatCard label="Countries reached" value={100} />
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="panel card">
      <Count value={value} />
      <div className="tiny">{label}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer section">
      <div className="wrap">
        <div className="footer-alert">WARNING: THIS WEBSITE USES NO TRACKING. NO COOKIES. NO ADS. NO SURVEILLANCE.</div>
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">0_ERASURE</div>
            <p className="mt-5">Fighting surveillance capitalism. One tool at a time.</p>
          </div>
          {[
            ['Learn', 'Surveillance 101', 'Tracking Works', 'Encryption Guide', 'Privacy Laws'],
            ['Tools', 'Browser Guide', 'VPN Reviews', 'Email Services', 'Password Managers'],
            ['Tracker', 'Live Breach Feed', 'Incident Archive', 'Submit a Tip', 'Threat Map'],
            ['About', 'Methodology', 'Transparency', 'Press', 'Careers']
          ].map(([title, ...links]) => (
            <div className="footer-col" key={title}>
              <h3>{title}</h3>
              {links.map((link) => (
                <a href="#top" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="bottom">
          <span>0_ERASURE - 2026. Built with privacy in mind.</span>
          <span>
            Encryption: Active <i className="dot" />
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { data: breachData, status: breachStatus } = useApi('/api/breaches', breachFallback);
  const { data: toolsData, status: toolsStatus } = useApi('/api/tools', toolsFallback);

  return (
    <>
      <InfoStrip />
      <Navbar />
      <main>
        <Hero />
        <BreachTracker breachData={breachData} apiStatus={breachStatus} />
        <Footprint />
        <Encryption />
        <Manifesto />
        <Protocols />
        <section className="section pad">
          <div className="wrap">
            <div className="label">07 Surveillance Index</div>
            <SortableTable
              caption="07 Surveillance Index"
              columns={['Country', 'Privacy Score', 'Surveillance Level', 'Data Protection', 'Notes']}
              rows={countries}
            />
          </div>
        </section>
        <Toolkit toolsData={toolsData} apiStatus={toolsStatus} />
        <section className="section pad">
          <div className="wrap">
            <SortableTable
              caption="09 Browser Comparison"
              columns={['Browser', 'Open Source', 'Default Tracking', 'Fingerprinting', 'Privacy Score', 'Verdict']}
              rows={browsers}
            />
          </div>
        </section>
        <section className="section pad">
          <div className="wrap">
            <SortableTable
              caption="10 VPN Comparison"
              columns={['VPN', 'Jurisdiction', 'Logs', 'Audit', 'Price', 'Verdict']}
              rows={vpns}
            />
          </div>
        </section>
        <section className="section pad">
          <div className="wrap">
            <SortableTable
              caption="11 Email Services"
              columns={['Service', 'Jurisdiction', 'E2E', 'Open Source', 'Metadata', 'Verdict']}
              rows={emails}
            />
          </div>
        </section>
        <TimelineAndNews />
        <Terminal breaches={breachData.breaches} />
        <Quiz />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
