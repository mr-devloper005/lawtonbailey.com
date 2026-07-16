import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif"
const BODY_FONT = "'IBM Plex Sans', 'Inter', system-ui, sans-serif"

const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#d6b08b',
  surface: '#f7f3eb',
  raised: '#f3efe7',
  text: '#151515',
  muted: '#676056',
  line: 'rgba(33, 26, 21, 0.12)',
  accent: '#ff623f',
  accentSoft: '#ffe6dd',
  onAccent: '#fffaf6',
  glow: 'rgba(255,98,63,0.08)',
  radius: '1.5rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Journal', note: 'Stories, notes, and practical reading with a softer editorial pace.' },
  listing: { ...base, kicker: 'Directory', note: 'Browse businesses, services, and public-facing listings with clearer context.' },
  classified: { ...base, kicker: 'Listings', note: 'Open offers, notices, and opportunity-led posts arranged like a bulletin wall.' },
  image: { ...base, kicker: 'Visuals', note: 'Image-led posts presented as a playful gallery of current highlights.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Saved resources and useful links in a friendlier editorial format.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides and references presented like part of the same site.' },
  profile: { ...base, kicker: 'Profiles', note: 'Meet people, brands, and public-facing profiles through a warmer layout.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
