'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="px-3 pb-6 pt-2 sm:px-5">
      <div className="mx-auto max-w-[var(--editable-container)]">
        <div className="editable-paper rounded-[2rem] px-5 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr_0.95fr]">
            <div>
              <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Directory studio</p>
              <Link href="/" className="editable-display mt-2 block text-4xl font-semibold text-[var(--slot4-page-text)] sm:text-5xl">
                {SITE_CONFIG.name}
              </Link>
              <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">
                {globalContent.footer?.description || SITE_CONFIG.description}
              </p>
            </div>

            <div>
              <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Explore</p>
              <div className="mt-3 grid gap-2">
                {taskLinks.slice(0, 5).map((task) => (
                  <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm text-[var(--slot4-page-text)] underline-offset-4 hover:text-[var(--slot4-accent)] hover:underline">
                    {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Site</p>
              <div className="mt-3 grid gap-2">
                {[
                  ['About', '/about'],
                  ['Contact', '/contact'],
                  ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="text-sm text-[var(--slot4-page-text)] underline-offset-4 hover:text-[var(--slot4-accent)] hover:underline">
                    {label}
                  </Link>
                ))}
                {session ? (
                  <button type="button" onClick={logout} className="text-left text-sm text-[var(--slot4-page-text)] underline-offset-4 hover:text-[var(--slot4-accent)] hover:underline">
                    Logout
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--editable-border)] pt-5 text-xs text-[var(--slot4-muted-text)] sm:flex-row sm:items-center sm:justify-between">
            <p>{globalContent.footer.bottomNote}</p>
            <p>{year} {SITE_CONFIG.name}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
