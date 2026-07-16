import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, ChevronDown, MapPin, Phone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getTaskTheme, taskThemeStyle } from '@/editable/theme/task-themes'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)
const placeholder = '/placeholder.svg?height=900&width=1200'

const stripHtml = (value: string) =>
  value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const single = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...single].filter(Boolean).slice(0, 8)
}

const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getSummary = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body))
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskGrid: Record<TaskKey, string> = {
  article: 'grid gap-5 lg:grid-cols-2',
  listing: 'grid gap-5',
  classified: 'grid gap-5 lg:grid-cols-2',
  image: 'columns-1 gap-5 [column-fill:_balance] sm:columns-2 xl:columns-3',
  sbm: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
  pdf: 'grid gap-5 lg:grid-cols-2',
  profile: 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3',
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const theme = getTaskTheme(task)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const feature = posts[0]

  return (
    <EditableSiteShell>
      <main style={taskThemeStyle(task)} className="min-h-screen text-[var(--tk-text)]">
        <section className="px-3 pb-6 pt-2 sm:px-5">
          <div className="mx-auto max-w-[var(--editable-container)]">
            <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8 sm:py-8">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{theme.kicker}</p>
                  <h1 className="editable-display mt-3 text-4xl font-semibold leading-[0.9] sm:text-5xl lg:text-6xl">
                    {voice?.headline || `Browse ${label}`}
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--tk-muted)]">{voice?.description || theme.note}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(voice?.chips || CATEGORY_OPTIONS.slice(0, 4).map((item) => item.name)).slice(0, 6).map((chip) => (
                      <span key={chip} className="rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm text-[var(--tk-text)]">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span>{posts.length} {posts.length === 1 ? 'entry' : 'entries'}</span>
                    <span>{categoryLabel}</span>
                  </div>
                  <form action={basePath} className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                      <select
                        name="category"
                        defaultValue={category}
                        className="h-12 w-full appearance-none rounded-[1.1rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] pl-4 pr-10 text-sm outline-none"
                        aria-label={voice?.filterLabel || 'Filter category'}
                      >
                        <option value="all">All categories</option>
                        {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--tk-muted)]" />
                    </div>
                    <button className="rounded-[1.1rem] bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-semibold text-[var(--slot4-dark-text)]">Apply</button>
                  </form>
                  <Link href={basePath} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--slot4-accent)]">
                    Reset filters <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {feature ? (
                <Link href={`${basePath}/${feature.slug}`} className="group mt-7 grid gap-5 rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-warm)] p-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="overflow-hidden rounded-[1.4rem] bg-[var(--slot4-media-bg)]">
                    <img src={getImage(feature)} alt={feature.title} className="h-full min-h-[260px] w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-between p-2">
                    <div>
                      <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Featured {label.toLowerCase()}</p>
                      <h2 className="editable-display mt-3 text-3xl font-semibold leading-[0.95]">{feature.title}</h2>
                      <p className="mt-4 text-sm leading-7 text-[var(--tk-muted)]">{getSummary(feature)}</p>
                    </div>
                    {task !== 'profile' ? (
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                        Open entry <ArrowRight className="h-4 w-4" />
                      </span>
                    ) : null}
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-8 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={taskGrid[task]}>
              {posts.map((post, index) => (
                <ArchivePostCard key={post.id || post.slug || index} post={post} task={task} basePath={basePath} index={index} />
              ))}
            </div>
          ) : (
            <div className="editable-paper rounded-[2rem] px-6 py-12 text-center">
              <Search className="mx-auto h-6 w-6 text-[var(--tk-muted)]" />
              <h2 className="editable-display mt-4 text-3xl font-semibold">Nothing here yet</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--tk-muted)]">Try another category, or check back after new {label.toLowerCase()} are published.</p>
            </div>
          )}

          {posts.length ? (
            <nav className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {pagination.hasPrevPage ? (
                <Link href={pageHref(basePath, category, page - 1)} className="rounded-[1.1rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-3 text-sm font-semibold">
                  Previous
                </Link>
              ) : null}
              <span className="rounded-[1.1rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-5 py-3 text-sm">
                Page {page} of {pagination.totalPages || 1}
              </span>
              {pagination.hasNextPage ? (
                <Link href={pageHref(basePath, category, page + 1)} className="rounded-[1.1rem] bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-semibold text-[var(--slot4-dark-text)]">
                  Next
                </Link>
              ) : null}
            </nav>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}`
  if (task === 'listing') return <ListingCard post={post} href={href} />
  if (task === 'image') return <ImageCard post={post} href={href} index={index} />
  if (task === 'profile') return <ProfileCard post={post} href={href} />
  return <EditorialCard post={post} href={href} index={index} task={task} />
}

function EditorialCard({ post, href, index, task }: { post: SitePost; href: string; index: number; task: TaskKey }) {
  if (index % 3 === 0) {
    return (
      <Link href={href} className="group overflow-hidden rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
        <div className="aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{getCategory(post, task)}</p>
          <h2 className="editable-display mt-3 text-2xl font-semibold leading-tight">{post.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--tk-muted)]">{getSummary(post)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group grid gap-4 rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 sm:grid-cols-[180px_minmax(0,1fr)]">
      <div className="overflow-hidden rounded-[1.2rem] bg-[var(--slot4-media-bg)]">
        <img src={getImage(post)} alt={post.title} className="h-full min-h-[180px] w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0">
        <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Entry {String(index + 1).padStart(2, '0')}</p>
        <h2 className="editable-display mt-3 text-2xl font-semibold leading-tight">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--tk-muted)]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  return (
    <Link href={href} className="group grid gap-4 rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 sm:grid-cols-[96px_minmax(0,1fr)]">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
        {image ? <img src={image} alt={post.title} className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-8 w-8 text-[var(--tk-muted)]" />}
      </div>
      <div className="min-w-0">
        <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Directory listing</p>
        <h2 className="editable-display mt-3 text-2xl font-semibold leading-tight">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--tk-muted)]">{getSummary(post)}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--tk-muted)]">
          {location ? <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {location}</span> : null}
          {phone ? <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {phone}</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ImageCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
      <div className={`${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'} overflow-hidden bg-[var(--slot4-media-bg)]`}>
        <img src={getImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Image story</p>
        <h2 className="mt-2 text-lg font-semibold leading-snug">{post.title}</h2>
      </div>
    </Link>
  )
}

function ProfileCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 text-center">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
        {image ? <img src={image} alt={post.title} className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-[var(--tk-muted)]" />}
      </div>
      <p className="editable-mono mt-4 text-[10px] text-[var(--slot4-soft-muted-text)]">Profile</p>
      <h2 className="editable-display mt-2 text-2xl font-semibold leading-tight">{post.title}</h2>
      {role ? <p className="mt-2 text-sm text-[var(--tk-muted)]">{role}</p> : null}
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--tk-muted)]">{getSummary(post)}</p>
    </Link>
  )
}
