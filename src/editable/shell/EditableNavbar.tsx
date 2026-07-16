'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

function brandName() {
  return SITE_CONFIG.name || SITE_CONFIG.domain?.split('.')[0] || 'site'
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const taskLinks = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').map((task) => ({ label: task.label, href: task.route })),
    [],
  )
  const navItems = globalContent.nav.primaryLinks

  return (
    <header className="sticky top-0 z-50 px-3 pb-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-[var(--editable-container)]">
        <div className="editable-paper rounded-[2rem] px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex items-start justify-between gap-4 lg:items-center">
            <Link href="/" className="min-w-0 pr-4 lg:shrink-0">
              <p className="editable-mono text-[8px] tracking-[0.12em] text-[var(--slot4-soft-muted-text)]">Studio directory</p>
              <div className="editable-display mt-1 text-[2rem] font-semibold leading-none tracking-[-0.06em] text-[var(--slot4-accent)] sm:text-[2.35rem] lg:text-[2.5rem] xl:text-[2.65rem]">
                {brandName()}
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-between gap-8 lg:flex">
              <nav className="ml-auto flex min-w-0 items-center gap-8 xl:gap-10">
                {navItems.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`shrink-0 text-[1.05rem] font-medium leading-none underline-offset-4 transition xl:text-[1.1rem] ${
                        active ? 'text-[var(--slot4-page-text)] underline' : 'text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="flex shrink-0 items-center gap-3">
                <form action="/search" className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-2.5">
                  <Search className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                  <input
                    name="q"
                    type="search"
                    placeholder="Search"
                    className="w-36 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)] xl:w-40"
                  />
                </form>
                <div className="flex items-center gap-2">
                  {session ? (
                    <>
                      <Link href="/create" className="inline-flex items-center gap-2 rounded-[1rem] bg-[var(--slot4-dark-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--slot4-dark-text)]">
                        <PlusCircle className="h-4 w-4" /> Create
                      </Link>
                      <button type="button" onClick={logout} className="rounded-[1rem] border border-[var(--editable-border)] px-4 py-2.5 text-sm font-semibold">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="inline-flex items-center gap-2 rounded-[1rem] border border-[var(--editable-border)] px-4 py-2.5 text-sm font-semibold">
                        <LogIn className="h-4 w-4" /> Login
                      </Link>
                      <Link href="/signup" className="inline-flex items-center gap-2 rounded-[1rem] bg-[var(--slot4-dark-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--slot4-dark-text)]">
                        <UserPlus className="h-4 w-4" /> Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="rounded-[1rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-3"
                aria-label="Toggle menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[var(--editable-border)] pt-4 lg:hidden">
            <form action="/search" className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-2">
              <Search className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
              <input name="q" type="search" placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
            </form>
            {session ? <Link href="/create" className="inline-flex items-center gap-2 rounded-[1rem] bg-[var(--slot4-dark-bg)] px-4 py-2 text-sm font-semibold text-[var(--slot4-dark-text)]"><PlusCircle className="h-4 w-4" /> Create</Link> : null}
          </div>

          {open ? (
            <div className="mt-4 grid gap-3 border-t border-[var(--editable-border)] pt-4 lg:hidden">
              {[{ label: 'Home', href: '/' }, ...navItems, ...taskLinks.slice(0, 4), ...(session ? [{ label: 'Create', href: '/create' }, { label: 'Logout', href: '#' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
                const active = item.href !== '#' && (pathname === item.href || pathname.startsWith(`${item.href}/`))
                if (item.label === 'Logout') {
                  return (
                    <button
                      key="logout"
                      type="button"
                      onClick={logout}
                      className="rounded-[1.2rem] border border-[var(--editable-border)] px-4 py-3 text-left text-sm font-semibold"
                    >
                      Logout
                    </button>
                  )
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-[1.2rem] border px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                        : 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-page-text)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
