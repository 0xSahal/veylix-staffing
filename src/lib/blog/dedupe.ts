import type { SanityPostPreview } from '@/types/blog'

function isDraftId(id: string): boolean {
  return id.startsWith('drafts.')
}

/**
 * Collapse duplicate posts that share a slug. When both a draft and published
 * document exist for the same slug, keep the published one. Preserves the
 * original query order (e.g. publishedAt desc).
 */
export function dedupePostsBySlug(posts: SanityPostPreview[]): SanityPostPreview[] {
  const bestBySlug = new Map<string, SanityPostPreview>()

  for (const post of posts) {
    const slug = post.slug?.current
    if (!slug) continue

    const existing = bestBySlug.get(slug)
    if (!existing || (isDraftId(existing._id) && !isDraftId(post._id))) {
      bestBySlug.set(slug, post)
    }
  }

  const seen = new Set<string>()
  const result: SanityPostPreview[] = []

  for (const post of posts) {
    const slug = post.slug?.current
    if (!slug || seen.has(slug)) continue

    if (bestBySlug.get(slug)?._id === post._id) {
      result.push(post)
      seen.add(slug)
    }
  }

  return result
}

export function resolvePostsForSlugs(
  pageSlugs: string[],
  rawPosts: SanityPostPreview[]
): SanityPostPreview[] {
  const bySlug = new Map(
    dedupePostsBySlug(rawPosts).map((post) => [post.slug.current, post])
  )

  return pageSlugs
    .map((slug) => bySlug.get(slug))
    .filter((post): post is SanityPostPreview => post !== undefined)
}
