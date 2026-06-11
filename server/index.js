import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 4174;

app.use(cors());
app.use(express.json());

const breaches = [
  { time: '10:42', name: 'HealthCare DB', records: '54M records', severity: 'CRITICAL' },
  { time: '10:37', name: 'FinTech Corp', records: '8.1M records', severity: 'HIGH' },
  { time: '10:20', name: 'Social Network', records: '3.4M records', severity: 'HIGH' },
  { time: '10:15', name: 'Government Portal', records: '901K records', severity: 'MEDIUM' },
  { time: '10:05', name: 'E-commerce Site', records: '440K records', severity: 'MEDIUM' }
];

const tools = [
  { name: 'Bitwarden', category: 'Password Manager', verdict: 'Trusted', score: 92 },
  { name: 'Signal', category: 'Messaging', verdict: 'Trusted', score: 96 },
  { name: 'uBlock Origin', category: 'Tracker Blocker', verdict: 'Trusted', score: 89 },
  { name: 'Mullvad VPN', category: 'VPN', verdict: 'Trusted', score: 94 },
  { name: 'Tor Browser', category: 'Browser', verdict: 'High Privacy', score: 95 },
  { name: 'Proton Mail', category: 'Email', verdict: 'Trusted', score: 90 }
];

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: '0_ERASURE API', timestamp: new Date().toISOString() });
});

app.get('/api/breaches', (_req, res) => {
  res.json({
    stats: {
      totalBreaches: 1203,
      recordsExposed: 4761231809,
      compromisedAccounts: 2981902,
      dataLeaks: 553
    },
    breaches
  });
});

app.get('/api/tools', (_req, res) => {
  res.json({ tools });
});

app.post('/api/score', (req, res) => {
  const answers = Array.isArray(req.body.answers) ? req.body.answers : [];
  const weights = [-15, -10, -10, 10, 10, 8, 7, 10, 8, 7];
  const score = Math.max(
    0,
    Math.min(100, answers.reduce((total, answer, index) => total + (answer ? weights[index] : 0), 50))
  );

  const risk =
    score > 80
      ? 'STRONG - STAY VIGILANT'
      : score > 60
        ? 'MODERATE - ROOM TO IMPROVE'
        : score > 30
          ? 'HIGH RISK - TAKE ACTION'
          : 'CRITICAL - YOU ARE EXPOSED';

  res.json({ score, risk });
});

app.listen(port, () => {
  console.log(`0_ERASURE API listening on http://localhost:${port}`);
});
