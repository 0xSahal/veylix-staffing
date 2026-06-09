// Exclude Sanity draft documents (ids like "drafts.*") — they share slugs with
// published docs and cause duplicate cards when the API token is configured.
export const publishedPostFilter = `_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)`

export const postFields = `
  _id,
  title,
  slug,
  publishedAt,
  category,
  readTime,
  excerpt,
  coverImage,
  author,
  featured
`

export const allPostsQuery = `
  *[${publishedPostFilter}] | order(publishedAt desc) {
    ${postFields}
  }
`

export const postSlugsQuery = `
  array::unique(
    *[${publishedPostFilter} && ($category == "all" || category == $category)]
    | order(publishedAt desc).slug.current
  )
`

export const postsBySlugsQuery = `
  *[${publishedPostFilter} && slug.current in $slugs] | order(publishedAt desc) {
    ${postFields}
  }
`

export const featuredPostsQuery = `
  *[${publishedPostFilter} && featured == true] | order(publishedAt desc)[0...3] {
    ${postFields}
  }
`

export const recentPostsQuery = `
  *[${publishedPostFilter}] | order(publishedAt desc)[0...10] {
    ${postFields}
  }
`

export const relatedPostsQuery = `
  *[${publishedPostFilter} && slug.current != $slug] | order(publishedAt desc)[0...6] {
    ${postFields}
  }
`

export const postBySlugQuery = `
  *[${publishedPostFilter} && slug.current == $slug][0] {
    ${postFields},
    body
  }
`

export const allPostSlugsQuery = `
  array::unique(*[${publishedPostFilter}].slug.current)
`
