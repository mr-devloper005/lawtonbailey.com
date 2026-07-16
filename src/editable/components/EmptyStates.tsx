import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing published here yet',
  description = 'Fresh posts will appear here automatically once this section has content to show.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('editable-paper rounded-[2rem] p-8 text-center', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="editable-display mt-5 text-3xl font-semibold tracking-[-0.04em]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--slot4-muted-text)]">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 rounded-[1.2rem] bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-semibold text-[var(--slot4-dark-text)]">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} from the site feed will appear here automatically when new entries are available.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been captured and routed through the contact flow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
