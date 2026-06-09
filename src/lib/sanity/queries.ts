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
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }
`

export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    ${postFields}
  }
`

export const recentPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    ${postFields}
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`

export const allPostSlugsQuery = `
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`
