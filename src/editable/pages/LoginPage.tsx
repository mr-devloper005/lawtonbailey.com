import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div className="editable-paper grid overflow-hidden rounded-[2rem] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex min-h-[430px] flex-col justify-between p-7 sm:p-10 lg:min-h-[590px] lg:p-12">
              <div>
                <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{pagesContent.auth.login.badge}</p>
                <h1 className="editable-display mt-6 max-w-lg text-5xl font-semibold leading-[0.92] sm:text-6xl">{pagesContent.auth.login.title}</h1>
                <p className="mt-6 max-w-md text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.auth.login.description}</p>
              </div>
              <div className="mt-12 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5">
                  <p className="editable-mono text-[9px] text-[var(--slot4-soft-muted-text)]">Member space</p>
                  <p className="mt-3 text-sm font-semibold leading-6">Access your publishing workspace.</p>
                </div>
                <div className="rounded-[1.4rem] border border-[var(--editable-border)] p-5">
                  <p className="editable-mono text-[9px] text-[var(--slot4-soft-muted-text)]">Secure return</p>
                  <p className="mt-3 text-sm font-semibold leading-6">Continue with your saved account.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center bg-[var(--slot4-dark-bg)] p-5 text-[var(--slot4-dark-text)] sm:p-8 lg:p-12">
              <div className="w-full rounded-[1.8rem] border border-white/15 bg-white/[0.06] p-6 sm:p-8">
                <p className="editable-mono text-[9px] text-white/50">Welcome back</p>
                <h2 className="editable-display mt-3 text-3xl font-semibold">{pagesContent.auth.login.formTitle}</h2>
                <EditableLocalLoginForm />
                <p className="mt-6 border-t border-white/15 pt-5 text-sm text-white/65">New here? <Link href="/signup" className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">{pagesContent.auth.login.createCta}</Link></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
