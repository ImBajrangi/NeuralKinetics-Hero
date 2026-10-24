export type ModalPanelId =
  | 'menu'
  | 'adaptive-systems'
  | 'features'
  | 'how-it-works'
  | 'tag-detail'
  | null;

export interface TagDetail {
  id: string;
  label: string;
  category: 'header' | 'footer';
  summary: string;
  metrics: { label: string; value: string }[];
}

export const BRAND_NAME = 'hardwithharsh';
export const INSTAGRAM_HANDLE = '@hardwithharsh';
export const INSTAGRAM_URL = 'https://www.instagram.com/hardwithharsh/';

export const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

export const HERO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ANIMATION_TIMINGS = {
  navbar: {
    initial: { y: -16, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: HERO_EASE },
  },
  video: {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.8, ease: HERO_EASE },
  },
  footerWrapper: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.5, duration: 1.0, ease: HERO_EASE },
  },
  subtitle: {
    initial: { y: 16, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.6, duration: 0.8, ease: HERO_EASE },
  },
  heading: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.8, duration: 0.8, ease: HERO_EASE },
  },
  buttons: {
    initial: { y: 16, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 1.0, duration: 0.8, ease: HERO_EASE },
  },
} as const;

export const HEADER_TAGS: string[] = ['Advanced Bionics', 'Cognitive AI'];

export const FOOTER_TAGS: string[] = ['Neuromorphic', 'AGI', 'Cybernetics'];

export const TAG_DETAILS: Record<string, TagDetail> = {
  'Advanced Bionics': {
    id: 'advanced-bionics',
    label: 'Advanced Bionics',
    category: 'header',
    summary:
      'Biometric hardware authentication linking tactile pulse-wave signatures directly to zero-latency payment settlement across 190+ countries.',
    metrics: [
      { label: 'Biometric Verification', value: '14 ms' },
      { label: 'False Acceptance Rate', value: '< 0.0001%' },
    ],
  },
  'Cognitive AI': {
    id: 'cognitive-ai',
    label: 'Cognitive AI',
    category: 'header',
    summary:
      'Real-time multi-currency routing engine that automatically selects the lowest interbank FX spread at the millisecond of tap.',
    metrics: [
      { label: 'Supported Currencies', value: '154' },
      { label: 'FX Markup', value: '0.00%' },
    ],
  },
  Neuromorphic: {
    id: 'neuromorphic',
    label: 'Neuromorphic',
    category: 'footer',
    summary:
      'Event-driven secure enclave architecture embedded inside the physical card substrate for offline cryptographic signing.',
    metrics: [
      { label: 'Enclave Power Draw', value: '0.4 mW' },
      { label: 'Key Standard', value: 'FIPS 140-3 L4' },
    ],
  },
  AGI: {
    id: 'agi',
    label: 'AGI',
    category: 'footer',
    summary:
      'Autonomous treasury allocation that balances checking liquidity, instant credit lines, and sovereign yield vaults.',
    metrics: [
      { label: 'Settlement Uptime', value: '99.999%' },
      { label: 'Cross-Border Speed', value: 'Instant' },
    ],
  },
  Cybernetics: {
    id: 'cybernetics',
    label: 'Cybernetics',
    category: 'footer',
    summary:
      'Closed-loop feedback control that locks or re-keys virtual card numbers the moment anomalous merchant telemetry is detected.',
    metrics: [
      { label: 'Virtual Cards', value: 'Unlimited' },
      { label: 'Fraud Interception', value: 'Real-Time' },
    ],
  },
};

export const CARD_FEATURES = [
  {
    id: 'zero-fx',
    title: 'Zero Foreign Exchange Limits',
    description:
      'Transact in 154 local currencies at true interbank spot rates with no weekend markups or hidden cross-border ceilings.',
    metric: '0% FX Fee',
  },
  {
    id: 'bionic-security',
    title: 'Neuromorphic Hardware Security',
    description:
      'Dynamic CVV rotation and biometric token binding protect every physical and virtual card transaction worldwide.',
    metric: 'FIPS 140-3',
  },
  {
    id: 'instant-liquidity',
    title: 'Adaptive Multi-Asset Settlement',
    description:
      'Hold, convert, and spend fiat and institutional treasury balances simultaneously from a single unified card.',
    metric: '190+ Countries',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Verify Identity in 60 Seconds',
    description:
      'Complete cryptographic onboarding with instant biometric attestation and zero paperwork.',
  },
  {
    step: '02',
    title: 'Issue Virtual & Titanium Cards',
    description:
      'Activate your virtual card immediately for Apple Pay & Google Pay while your precision-milled card ships worldwide.',
  },
  {
    step: '03',
    title: 'Spend Globally With Zero Limits',
    description:
      'Automatic local currency routing clears every transaction at interbank rates with instant telemetry controls.',
  },
];

export function getTagDetail(label: string): TagDetail | null {
  return TAG_DETAILS[label] ?? null;
}

export function isValidAnimationSequence(): boolean {
  const { footerWrapper, subtitle, heading, buttons } = ANIMATION_TIMINGS;
  return (
    footerWrapper.transition.delay < subtitle.transition.delay &&
    subtitle.transition.delay < heading.transition.delay &&
    heading.transition.delay < buttons.transition.delay
  );
}
