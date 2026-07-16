import Link from 'next/link'
import { ArrowRight, Dot, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableExcerpt, getEditablePostImage, getEditableCategory, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'
const isProfileHref = (href: string) => href === '/profile' || href.startsWith('/profile/')

function brandWord() {
  return SITE_CONFIG.domain?.split('.')[0] || SITE_CONFIG.name || 'site'
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function heroPool(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
}

function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-4 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="overflow-hidden rounded-[1.4rem] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full min-h-[260px] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-col justify-between p-2">
        <div>
          <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Featured card</p>
          <h3 className="editable-display mt-4 text-3xl font-semibold leading-[0.95] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p>
        </div>
        {!isProfileHref(href) ? (
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
            Open feature <ArrowRight className="h-4 w-4" />
          </span>
        ) : null}
      </div>
    </Link>
  )
}

function HorizontalCard({ post, href, label }: { post: SitePost; href: string; label: string }) {
  return (
    <Link href={href} className="group grid gap-4 rounded-[1.6rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 sm:grid-cols-[190px_minmax(0,1fr)]">
      <div className="overflow-hidden rounded-[1.1rem] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full min-h-[180px] w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0">
        <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{label}</p>
        <h3 className="editable-display mt-3 text-2xl font-semibold leading-tight">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 150)}</p>
      </div>
    </Link>
  )
}

function CompactCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
      <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{getEditableCategory(post)}</p>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
      <div className="aspect-[4/4.6] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Image first</p>
        <h3 className="mt-3 text-xl font-semibold leading-tight">{post.title}</h3>
      </div>
    </Link>
  )
}

function EditorialRow({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-4 border-b border-[var(--editable-border)] py-4 sm:grid-cols-[56px_minmax(0,1fr)]">
      <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{String(index + 1).padStart(2, '0')}</p>
      <div>
        <h3 className="text-lg font-semibold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}

export function EditableHomeHero(_props: HomeSectionProps) {
  return (
    <section className="px-3 pb-6 pt-2 sm:px-5">
      <div className={`${container} editable-paper rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16`}>
        <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{brandWord()}</p>
        <h1 className="editable-display mt-5 max-w-4xl text-[3rem] font-semibold leading-[0.92] text-[var(--slot4-page-text)] sm:text-[4.4rem] lg:text-[5.4rem]">
          Find businesses and useful stories.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)]">
          Search the directory by name, category, or topic.
        </p>
        <form action="/search" className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.2rem] border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-3">
            <Search className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder={pagesContent.home.hero.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
          </label>
          <button className="rounded-[1.2rem] bg-[var(--slot4-dark-bg)] px-6 py-3 text-sm font-semibold text-[var(--slot4-dark-text)]">
            Search
          </button>
        </form>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = heroPool(posts, timeSections).slice(0, 8)
  if (!pool.length) return null

  return (
    <section className={container}>
      <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Browse notes</p>
            <h2 className="editable-display mt-3 text-4xl font-semibold">A friendly directory of current highlights.</h2>
          </div>
          {!isProfileHref(primaryRoute) ? (
            <Link href={primaryRoute} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]">
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').map((task) => (
            <Link key={task.key} href={task.route} className="rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
              {task.label}
            </Link>
          ))}
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {pool[0] ? <FeaturedCard post={pool[0]} href={postHref(primaryTask, pool[0], primaryRoute)} /> : null}
          <div className="grid gap-4">
            {pool.slice(1, 3).map((post) => (
              <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
          <div className="grid gap-4">
            {pool.slice(3, 5).map((post) => (
              <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = heroPool(posts, timeSections).slice(0, 9)
  if (!pool.length) return null

  return (
    <section className={`${container} py-6`}>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--slot4-accent)]" />
            <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Featured rail</p>
          </div>
          <div className="mt-5 grid gap-4">
            {pool.slice(0, 3).map((post, index) => (
              <HorizontalCard
                key={post.id || post.slug || index}
                post={post}
                href={postHref(primaryTask, post, primaryRoute)}
                label={index === 0 ? 'Horizontal card' : 'Compact feature'}
              />
            ))}
          </div>
        </div>

        <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
          <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Journal list</p>
          <div className="mt-4">
            {pool.slice(3, 8).map((post, index) => (
              <EditorialRow key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'latest', posts: posts.slice(0, 4), href: primaryRoute },
          { key: 'popular', posts: posts.slice(4, 8), href: primaryRoute },
        ] as Array<Pick<HomeTimeSection, 'key' | 'posts' | 'href'>>)

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <section className={`${container} py-2`}>
      <div className="grid gap-6">
        {visible.map((section, sectionIndex) => (
          <div key={section.key} className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{section.key}</p>
                <h2 className="editable-display mt-3 text-3xl font-semibold">
                  {sectionIndex % 2 === 0 ? 'Editorial picks with visual variety.' : 'More profiles, visuals, and practical reads.'}
                </h2>
              </div>
              {!isProfileHref(section.href || primaryRoute) ? (
                <Link href={section.href || primaryRoute} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--slot4-accent)]">
                  View section <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>

            <div className={`mt-6 grid gap-4 ${sectionIndex % 2 === 0 ? 'lg:grid-cols-[1.2fr_0.8fr_0.8fr]' : 'lg:grid-cols-[0.8fr_0.8fr_1.2fr]'}`}>
              {section.posts[0] ? (
                <div className={sectionIndex % 2 === 0 ? '' : 'lg:order-3'}>
                  <FeaturedCard post={section.posts[0]} href={postHref(primaryTask, section.posts[0], primaryRoute)} />
                </div>
              ) : null}
              <div className={sectionIndex % 2 === 0 ? '' : 'lg:order-1'}>
                {section.posts[1] ? <ImageFirstCard post={section.posts[1]} href={postHref(primaryTask, section.posts[1], primaryRoute)} /> : null}
              </div>
              <div className={`grid gap-4 ${sectionIndex % 2 === 0 ? '' : 'lg:order-2'}`}>
                {section.posts.slice(2, 5).map((post) => (
                  <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="px-3 pb-8 pt-4 sm:px-5">
      <div className={`${container} editable-paper rounded-[2rem] px-5 py-8 text-center sm:px-8 sm:py-10`}>
        <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{pagesContent.home.cta.badge}</p>
        <h2 className="editable-display mx-auto mt-3 max-w-4xl text-4xl font-semibold leading-[0.95] sm:text-5xl">
          {pagesContent.home.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--slot4-muted-text)]">
          {pagesContent.home.cta.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-[1.2rem] border border-[var(--editable-border)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)]">
            {pagesContent.home.cta.secondaryCta.label}
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-[var(--slot4-soft-muted-text)]">
          <Dot className="h-5 w-5" />
          <span className="text-xs">Responsive, image-first, and powered by your existing live content.</span>
        </div>
      </div>
    </section>
  )
}
