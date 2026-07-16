import { cn } from '@/lib/utils'

type LoadingStateProps = {
  label?: string
  className?: string
}

function PulseBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-[1.4rem] bg-black/8', className)} />
}

export function PageLoadingState({ label = 'Loading page', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8', className)} aria-live="polite" aria-busy="true">
      <div className="editable-paper rounded-[2rem] p-6 sm:p-8">
        <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{label}</p>
        <PulseBlock className="mt-5 h-16 w-3/4 max-w-3xl" />
        <PulseBlock className="mt-4 h-5 w-2/3 max-w-2xl" />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
              <PulseBlock className="h-48 w-full" />
              <PulseBlock className="mt-4 h-6 w-4/5" />
              <PulseBlock className="mt-3 h-4 w-3/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CardGridLoadingState({ count = 6, className }: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)} aria-live="polite" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
          <PulseBlock className="h-44 w-full" />
          <PulseBlock className="mt-4 h-5 w-5/6" />
          <PulseBlock className="mt-3 h-4 w-2/3" />
        </div>
      ))}
    </div>
  )
}

export function DetailLoadingState({ label = 'Loading detail', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8', className)} aria-live="polite" aria-busy="true">
      <div className="editable-paper grid gap-6 rounded-[2rem] p-6 lg:grid-cols-[0.95fr_1.05fr]">
        <PulseBlock className="h-96 w-full" />
        <div>
          <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{label}</p>
          <PulseBlock className="mt-5 h-16 w-4/5" />
          <PulseBlock className="mt-5 h-4 w-full" />
          <PulseBlock className="mt-3 h-4 w-5/6" />
          <PulseBlock className="mt-3 h-4 w-2/3" />
        </div>
      </div>
    </div>
  )
}
