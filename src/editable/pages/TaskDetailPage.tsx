import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink, FileText, Mail, Phone, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableArticleComments } from '@/editable/components/EditableArticleComments'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { taskThemeStyle } from '@/editable/theme/task-themes'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const single = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...single].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) =>
  asText(getContent(post).body) || asText(getContent(post).description) || asText(getContent(post).details) || post.summary || 'Details will appear here once available.'

const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const leadText = (post: SitePost) => {
  const lead = stripHtml(summaryText(post))
  return lead && lead !== stripHtml(getBody(post)) ? lead : ''
}

const safeUrl = (value: string) => (/^https?:\/\//i.test(value) ? value : '#')
const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
const linkifyText = (value: string) =>
  value.replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)
const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return value
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--tk-muted)] hover:text-[var(--tk-text)]">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function BodyContent({ post }: { post: SitePost }) {
  return <div className="article-content mt-8 max-w-none text-[1rem] leading-8 text-[var(--tk-text)]" dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoList({ items }: { items: Array<[string, string]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value]) => (
        <div key={label} className="rounded-[1.4rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
          <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">{label}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--tk-text)]">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ActionRow({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="flex flex-wrap gap-3">
      {website ? (
        <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[1.1rem] bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-semibold text-[var(--slot4-dark-text)]">
          Visit site <ExternalLink className="h-4 w-4" />
        </Link>
      ) : null}
      {phone ? (
        <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-[1.1rem] border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold">
          <Phone className="h-4 w-4" /> Call
        </a>
      ) : null}
      {email ? (
        <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-[1.1rem] border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold">
          <Mail className="h-4 w-4" /> Email
        </a>
      ) : null}
    </div>
  )
}

function Gallery({ images }: { images: string[] }) {
  if (!images.length) return null
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((image, index) => (
        <div key={`${image}-${index}`} className="overflow-hidden rounded-[1.6rem] border border-[var(--editable-border)] bg-[var(--slot4-media-bg)]">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  )
}

function RelatedStrip({ task, related }: { task: TaskKey; related: SitePost[] }) {
  if (!related.length) return null
  const route = getTaskConfig(task)?.route || `/${task}`
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-8 sm:px-6 lg:px-8">
      <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Related</p>
            <h2 className="editable-display mt-2 text-3xl font-semibold">More to explore</h2>
          </div>
          {task !== 'profile' ? (
            <Link href={route} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--slot4-accent)]">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {related.map((item) => (
            <Link key={item.id || item.slug} href={`${route}/${item.slug}`} className="rounded-[1.6rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4">
              <div className="aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-[var(--slot4-media-bg)]">
                {getImages(item)[0] ? <img src={getImages(item)[0]} alt={item.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><FileText className="h-6 w-6 text-[var(--tk-muted)]" /></div>}
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--tk-muted)]">{stripHtml(summaryText(item))}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <>
      <section className="px-3 pb-6 pt-2 sm:px-5">
        <div className="mx-auto max-w-[var(--editable-container)]">
          <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
            <BackLink task="article" />
            <p className="editable-mono mt-6 text-[10px] text-[var(--slot4-soft-muted-text)]">Article</p>
            <h1 className="editable-display mt-3 max-w-4xl text-4xl font-semibold leading-[0.92] sm:text-5xl lg:text-6xl">{post.title}</h1>
            {leadText(post) ? <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tk-muted)]">{leadText(post)}</p> : null}
            {images[0] ? (
              <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-media-bg)]">
                <img src={images[0]} alt={post.title} className="h-full w-full object-cover" />
              </div>
            ) : null}
            <BodyContent post={post} />
            <EditableArticleComments slug={post.slug} comments={comments} />
          </div>
        </div>
      </section>
      <RelatedStrip task="article" related={related} />
    </>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const website = getField(post, ['website', 'url'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  return (
    <>
      <section className="px-3 pb-6 pt-2 sm:px-5">
        <div className="mx-auto max-w-[var(--editable-container)]">
          <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
            <BackLink task="listing" />
            <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Directory listing</p>
                <h1 className="editable-display mt-3 text-4xl font-semibold leading-[0.92] sm:text-5xl">{post.title}</h1>
                {leadText(post) ? <p className="mt-5 text-base leading-8 text-[var(--tk-muted)]">{leadText(post)}</p> : null}
                <div className="mt-6">
                  <ActionRow website={website} phone={phone} email={email} />
                </div>
                <div className="mt-6">
                  <InfoList items={[['Location', getField(post, ['address', 'location', 'city'])], ['Phone', phone], ['Email', email], ['Website', website]]} />
                </div>
              </div>
              <div>
                <Gallery images={images.slice(0, 4)} />
              </div>
            </div>
            <BodyContent post={post} />
          </div>
        </div>
      </section>
      <RelatedStrip task="listing" related={related} />
    </>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget']) || 'Open offer'
  return (
    <>
      <section className="px-3 pb-6 pt-2 sm:px-5">
        <div className="mx-auto max-w-[var(--editable-container)]">
          <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
            <BackLink task="classified" />
            <div className="mt-6 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6">
                <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Classified</p>
                <h1 className="editable-display mt-3 text-3xl font-semibold leading-tight">{post.title}</h1>
                <p className="mt-6 text-4xl font-semibold text-[var(--slot4-accent)]">{price}</p>
                <div className="mt-6">
                  <InfoList items={[['Condition', getField(post, ['condition', 'availability', 'type'])], ['Location', getField(post, ['location', 'address', 'city'])]]} />
                </div>
              </div>
              <div>
                <Gallery images={images.slice(0, 4)} />
              </div>
            </div>
            <BodyContent post={post} />
          </div>
        </div>
      </section>
      <RelatedStrip task="classified" related={related} />
    </>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const gallery = images.length ? images : ['/placeholder.svg?height=900&width=1200']
  return (
    <>
      <section className="px-3 pb-6 pt-2 sm:px-5">
        <div className="mx-auto max-w-[var(--editable-container)]">
          <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
            <BackLink task="image" />
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="columns-1 gap-4 [column-fill:_balance] sm:columns-2">
                {gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="mb-4 break-inside-avoid overflow-hidden rounded-[1.6rem] border border-[var(--editable-border)] bg-[var(--slot4-media-bg)]">
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="editable-mono text-[10px] text-[var(--slot4-soft-muted-text)]">Image story</p>
                <h1 className="editable-display mt-3 text-4xl font-semibold leading-[0.92] sm:text-5xl">{post.title}</h1>
                {leadText(post) ? <p className="mt-5 text-base leading-8 text-[var(--tk-muted)]">{leadText(post)}</p> : null}
                <BodyContent post={post} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedStrip task="image" related={related} />
    </>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <>
      <section className="px-3 pb-6 pt-2 sm:px-5">
        <div className="mx-auto max-w-[var(--editable-container)]">
          <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
            <BackLink task="sbm" />
            <p className="editable-mono mt-6 text-[10px] text-[var(--slot4-soft-muted-text)]">Saved resource</p>
            <h1 className="editable-display mt-3 text-4xl font-semibold leading-[0.92] sm:text-5xl">{post.title}</h1>
            {leadText(post) ? <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tk-muted)]">{leadText(post)}</p> : null}
            <div className="mt-6">
              <ActionRow website={website} />
            </div>
            <BodyContent post={post} />
          </div>
        </div>
      </section>
      <RelatedStrip task="sbm" related={related} />
    </>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <>
      <section className="px-3 pb-6 pt-2 sm:px-5">
        <div className="mx-auto max-w-[var(--editable-container)]">
          <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
            <BackLink task="pdf" />
            <p className="editable-mono mt-6 text-[10px] text-[var(--slot4-soft-muted-text)]">Document</p>
            <h1 className="editable-display mt-3 text-4xl font-semibold leading-[0.92] sm:text-5xl">{post.title}</h1>
            <div className="mt-6">
              <ActionRow website={fileUrl} />
            </div>
            <BodyContent post={post} />
            {fileUrl ? (
              <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
                <div className="flex items-center justify-between gap-3 border-b border-[var(--editable-border)] px-4 py-3">
                  <span className="text-sm font-semibold">Document preview</span>
                  <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--slot4-accent)]">
                    Open file <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
                <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[70vh] w-full bg-white" />
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <RelatedStrip task="pdf" related={related} />
    </>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <>
      <section className="px-3 pb-6 pt-2 sm:px-5">
        <div className="mx-auto max-w-[var(--editable-container)]">
          <div className="editable-paper rounded-[2rem] px-5 py-7 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="rounded-[1.8rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 text-center">
                <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
                  {images[0] ? <img src={images[0]} alt={post.title} className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-[var(--tk-muted)]" />}
                </div>
                <h1 className="editable-display mt-5 text-3xl font-semibold leading-tight">{post.title}</h1>
                {role ? <p className="mt-2 text-sm text-[var(--tk-muted)]">{role}</p> : null}
                <div className="mt-6">
                  <ActionRow website={website} email={email} />
                </div>
              </div>
              <div>
                {leadText(post) ? <p className="text-base leading-8 text-[var(--tk-muted)]">{leadText(post)}</p> : null}
                <BodyContent post={post} />
                <div className="mt-8">
                  <Gallery images={images.slice(1, 5)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedStrip task="profile" related={related} />
    </>
  )
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <EditableSiteShell>
      <main style={taskThemeStyle(task)} className="min-h-screen text-[var(--tk-text)]">
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
      </main>
    </EditableSiteShell>
  )
}
