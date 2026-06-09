import { routes } from '@/config/routes'
import type { BlogFilter } from '@/types/blog'

type BuildBlogUrlOptions = {
  page?: number
  category?: BlogFilter
}

export function buildBlogUrl({
  page = 1,
  category = 'All',
}: BuildBlogUrlOptions = {}): string {
  const params = new URLSearchParams()

  if (page > 1) {
    params.set('page', String(page))
  }

  if (category !== 'All') {
    params.set('category', category)
  }

  const query = params.toString()
  return query ? `${routes.blog}?${query}` : routes.blog
}
