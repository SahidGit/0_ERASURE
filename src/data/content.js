export const tickerItems = [
  'LIVE - GLOBAL PRIVACY INDEX UPDATED',
  '18M PASSWORDS LEAKED TODAY',
  'END-TO-END ENCRYPTION ACTIVE',
  'TRACKERS BLOCKED: 4,203',
  'LAST BREACH: 09:14 GMT',
  'CURRENT THREAT LEVEL: ELEVATED'
];

export const fallbackBreaches = [
  { time: '10:42', name: 'HealthCare DB', records: '54M records', severity: 'CRITICAL' },
  { time: '10:37', name: 'FinTech Corp', records: '8.1M records', severity: 'HIGH' },
  { time: '10:20', name: 'Social Network', records: '3.4M records', severity: 'HIGH' },
  { time: '10:15', name: 'Government Portal', records: '901K records', severity: 'MEDIUM' },
  { time: '10:05', name: 'E-commerce Site', records: '440K records', severity: 'MEDIUM' }
];

export const fallbackStats = {
  totalBreaches: 1203,
  recordsExposed: 4761231809,
  compromisedAccounts: 2981902,
  dataLeaks: 553
};

export const protocols = [
  ['KEY', 'Strong Passwords', 'Use unique 20+ character passwords and a password manager.'],
  ['2FA', 'Two-Factor Auth', 'Use authenticator apps or hardware keys, not SMS.'],
  ['E2E', 'Encrypt Comms', 'Prefer Signal and privacy-preserving email providers.'],
  ['PATCH', 'Keep Updated', 'Enable auto-updates to close known vulnerabilities.'],
  ['LIMIT', 'Limit Sharing', 'Question permissions and remove unused apps.']
];

export const countries = [
  ['Iceland', '91/100', 'LOW', 'STRONG', 'Best-in-class privacy laws'],
  ['Switzerland', '85/100', 'LOW', 'STRONG', 'Strict secrecy laws'],
  ['Germany', '78/100', 'MEDIUM', 'STRONG', 'GDPR leader'],
  ['Norway', '75/100', 'MEDIUM', 'STRONG', 'Good laws'],
  ['United States', '42/100', 'HIGH', 'WEAK', 'FISA and broker exposure'],
  ['United Kingdom', '38/100', 'HIGH', 'WEAK', 'Investigatory Powers Act'],
  ['India', '34/100', 'HIGH', 'WEAK', 'Expanded surveillance'],
  ['China', '12/100', 'EXTREME', 'VERY WEAK', 'State surveillance']
];

export const browsers = [
  ['Tor', 'Yes', 'Minimal', 'Strong', '95', 'BEST'],
  ['LibreWolf', 'Yes', 'Minimal', 'Strong', '88', 'EXCELLENT'],
  ['Brave', 'Yes', 'Blocked', 'Medium', '82', 'STRONG'],
  ['Firefox', 'Yes', 'Moderate', 'Medium', '74', 'GOOD'],
  ['Safari', 'Partial', 'Some', 'Medium', '62', 'ACCEPTABLE'],
  ['Edge', 'No', 'Heavy', 'Weak', '34', 'AVOID'],
  ['Chrome', 'Partial', 'Heavy', 'Weak', '22', 'AVOID']
];

export const vpns = [
  ['Mullvad', 'Sweden', 'No', 'Yes', '$5/mo', 'BEST'],
  ['Proton VPN', 'Switzerland', 'No', 'Yes', '$10/mo', 'EXCELLENT'],
  ['ExpressVPN', 'BVI', 'Claims zero', 'Partial', '$13/mo', 'ACCEPTABLE'],
  ['NordVPN', 'Panama', 'Claims zero', 'Partial', '$13/mo', 'ACCEPTABLE'],
  ['Surfshark', 'Netherlands', 'Claims zero', 'No', '$2.50/mo', 'CAUTION'],
  ['Hola VPN', 'Israel', 'Sells bandwidth', 'No', 'Free', 'DANGEROUS']
];

export const emails = [
  ['ProtonMail', 'Switzerland', 'Always', 'Yes', 'Minimal', 'BEST'],
  ['Tutanota', 'Germany', 'Always', 'Yes', 'Minimal', 'EXCELLENT'],
  ['Skiff Mail', 'USA', 'Yes', 'Yes', 'Minimal', 'GOOD'],
  ['Fastmail', 'Australia', 'No', 'No', 'Some', 'PASSABLE'],
  ['Outlook', 'USA', 'No', 'No', 'Scanned', 'AVOID'],
  ['Gmail', 'USA', 'No', 'No', 'Ads profile', 'AVOID']
];

export const incidents = [
  'Jan 2026 - AI facial recognition deployed in 40+ airports',
  'Nov 2025 - Hospital network breach exposes 120M records',
  'Sep 2025 - Chat scanning law threatens encryption',
  'Jul 2025 - Password vault exposure incident',
  'May 2025 - Platform sells DMs to advertisers',
  'Mar 2025 - Surveillance program exposed',
  'Jan 2025 - Browser zero-day affects major vendors',
  'Nov 2024 - Data broker leak exposes 3.8B records'
];

export const news = [
  'How to Disappear From the Internet',
  'The 10 Worst Password Habits',
  'What Your ISP Actually Knows',
  'Public WiFi Without a VPN',
  'Signal vs WhatsApp vs Telegram',
  'Advertisers and Shadow Profiles',
  'Secure Your Email in 2026',
  'Browser Fingerprinting Explained',
  'Data After Company Acquisitions'
];

export const quizQuestions = [
  ['Do you use the same password on multiple sites?', -15],
  ['Is your browser Chrome or Edge?', -10],
  ['Do you use Gmail as your primary email?', -10],
  ['Do you use a VPN regularly?', 10],
  ['Do you use 2FA on important accounts?', 10],
  ['Do you use an ad blocker?', 8],
  ['Do you review app permissions regularly?', 7],
  ['Do you use Signal or E2E messaging?', 10],
  ['Is your device disk encrypted?', 8],
  ['Do you use a private search engine?', 7]
];
