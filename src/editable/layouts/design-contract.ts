import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#d6b08b',
  '--slot4-page-text': '#151515',
  '--slot4-panel-bg': '#f3efe7',
  '--slot4-surface-bg': '#f7f3eb',
  '--slot4-muted-text': '#676056',
  '--slot4-soft-muted-text': '#8a8176',
  '--slot4-accent': '#ff623f',
  '--slot4-accent-fill': '#ff623f',
  '--slot4-accent-soft': '#ffe6dd',
  '--slot4-on-accent': '#fffaf6',
  '--slot4-dark-bg': '#1c1a18',
  '--slot4-dark-text': '#fffaf6',
  '--slot4-media-bg': '#d8c2ab',
  '--slot4-cream': '#fbf8f2',
  '--slot4-warm': '#ead9c8',
  '--slot4-lavender': '#efe8de',
  '--slot4-gray': '#ebe4da',
  '--slot4-body-gradient':
    'linear-gradient(90deg, rgba(255,255,255,0.08) 0 3%, transparent 3% 22%, rgba(93,48,18,0.08) 22% 24%, transparent 24% 47%, rgba(255,255,255,0.08) 47% 50%, transparent 50% 73%, rgba(93,48,18,0.08) 73% 75%, transparent 75% 100%), linear-gradient(180deg, rgba(244,232,216,0.84) 0%, rgba(213,168,127,0.94) 100%)',
  '--editable-page-bg': '#d6b08b',
  '--editable-page-text': '#151515',
  '--editable-container': '1240px',
  '--editable-border': 'rgba(33, 26, 21, 0.12)',
  '--editable-nav-bg': '#f7f3eb',
  '--editable-nav-text': '#151515',
  '--editable-nav-active': '#ff623f',
  '--editable-nav-active-text': '#fffaf6',
  '--editable-cta-bg': '#151515',
  '--editable-cta-text': '#fffaf6',
  '--editable-search-bg': '#efe7db',
  '--editable-footer-bg': '#f7f3eb',
  '--editable-footer-text': '#151515',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-black/10',
  shadow: 'shadow-[0_24px_70px_rgba(57,31,13,0.12)]',
  shadowStrong: 'shadow-[0_28px_90px_rgba(57,31,13,0.2)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(20,18,16,0.02),rgba(20,18,16,0.78))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-10 sm:py-12 lg:py-14',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-7 lg:grid-cols-[1.15fr_0.85fr]',
    rail: 'flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[220px] shrink-0 snap-start sm:w-[250px]',
  },
  type: {
    eyebrow: 'text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-soft-muted-text)]',
    heroTitle: 'text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-[7rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl',
    body: 'text-base leading-7',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary:
      'inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-[var(--slot4-dark-bg)] px-6 py-3 text-sm font-semibold tracking-[-0.01em] text-[var(--slot4-dark-text)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(28,26,24,0.22)]',
    secondary:
      'inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold tracking-[-0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]',
    accent:
      'inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold tracking-[-0.01em] text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(255,98,63,0.24)]',
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.6rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(57,31,13,0.16)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep edits inside src/editable only and preserve every exported component/function name.',
  'Use the warm wood-and-paper variable system in editableRootStyle so the whole site stays visually coherent.',
  'Preserve all real post data flows; do not replace fetched posts with mock content.',
  'Use multiple card shapes across home and archive surfaces instead of repeating one template.',
  'Use postHref() for homepage/detail links so task-specific routes keep working.',
] as const
