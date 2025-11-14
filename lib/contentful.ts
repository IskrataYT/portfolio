// contentful.ts fetches project/testimonial entries and normalizes assets.
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID ?? "3cgvdcbhjm3k"
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT ?? "master"
const CONTENTFUL_ACCESS_TOKEN =
  process.env.CONTENTFUL_DELIVERY_TOKEN ?? "vODeZDq9eNyDthLSME7GrP85re6qc1S39cBux_eLYrY"
const CONTENTFUL_LOCALE = process.env.CONTENTFUL_LOCALE ?? "en-US"

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("Missing Contentful credentials")
}

const BASE_URL = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`

type ContentfulLink = {
  sys: {
    type: "Link"
    linkType: string
    id: string
  }
}

type LocalizedField<T> = {
  [locale: string]: T
}

type MaybeLocalized<T> = T | LocalizedField<T>

type ContentfulAsset = {
  sys: { id: string }
  fields?: {
    file?: MaybeLocalized<{
      url?: string
      contentType?: string
    }>
    title?: MaybeLocalized<string>
  }
}

type ContentfulEntry<T> = {
  sys: { id: string }
  fields: T
}

type ContentfulResponse<T> = {
  items: Array<ContentfulEntry<T>>
  includes?: {
    Asset?: ContentfulAsset[]
  }
}

const getFieldValue = <T,>(field?: MaybeLocalized<T>): T | undefined => {
  if (field === undefined || field === null) return undefined
  if (Array.isArray(field)) {
    return field as T
  }
  if (typeof field === "object") {
    if (CONTENTFUL_LOCALE in (field as Record<string, unknown>)) {
      const localized = field as LocalizedField<T>
      return localized[CONTENTFUL_LOCALE] ?? localized["en-US"]
    }
  }
  return field as T
}

const getAssetUrl = (asset?: ContentfulAsset) => {
  if (!asset?.fields?.file) return undefined
  const file = getFieldValue(asset.fields.file)
  if (!file?.url) return undefined
  return file.url.startsWith("http") ? file.url : `https:${file.url}`
}

async function contentfulFetch<T>(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`)
  url.searchParams.set("access_token", CONTENTFUL_ACCESS_TOKEN)
  url.searchParams.set("locale", CONTENTFUL_LOCALE)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    throw new Error(`Contentful request failed: ${response.statusText}`)
  }

  return (await response.json()) as T
}

type ProjectFields = {
  title?: MaybeLocalized<string>
  category?: MaybeLocalized<string>
  description?: MaybeLocalized<string>
  tags?: MaybeLocalized<string[]>
  link?: MaybeLocalized<string>
  image?: ContentfulLink
}

export type ProjectEntry = {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  imageUrl: string
  link?: string
}

export async function getProjects(): Promise<ProjectEntry[]> {
  const data = await contentfulFetch<ContentfulResponse<ProjectFields>>("entries", {
    content_type: "projects",
    include: "1",
    order: "-sys.createdAt",
  })

  const assetMap = new Map<string, string>()
  data.includes?.Asset?.forEach((asset) => {
    const url = getAssetUrl(asset)
    if (asset.sys.id && url) {
      assetMap.set(asset.sys.id, url)
    }
  })

  return data.items.map((item) => {
    const imageId = item.fields.image?.sys?.id
    const tagsValue = getFieldValue(item.fields.tags)
    const tags = Array.isArray(tagsValue)
      ? tagsValue.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0)
      : []
    return {
      id: item.sys.id,
      title: getFieldValue(item.fields.title) ?? "Untitled Project",
      category: getFieldValue(item.fields.category) ?? "General",
      description: getFieldValue(item.fields.description) ?? "",
      tags,
      imageUrl: imageId ? assetMap.get(imageId) ?? "/placeholder.svg" : "/placeholder.svg",
      link: getFieldValue(item.fields.link),
    }
  })
}

type TestimonialFields = {
  rating?: MaybeLocalized<number>
  personsJob?: MaybeLocalized<string>
  testimonialContent?: MaybeLocalized<string>
  personsName?: MaybeLocalized<string>
  partnershipYear?: MaybeLocalized<string>
  photo?: ContentfulLink
}

export type TestimonialEntry = {
  id: string
  rating: number
  job: string
  content: string
  name: string
  partnershipYear?: string
  photoUrl?: string
}

export async function getTestimonials(): Promise<TestimonialEntry[]> {
  const data = await contentfulFetch<ContentfulResponse<TestimonialFields>>("entries", {
    content_type: "testimonials",
    include: "1",
    order: "-sys.createdAt",
  })

  const assetMap = new Map<string, string>()
  data.includes?.Asset?.forEach((asset) => {
    const url = getAssetUrl(asset)
    if (asset.sys.id && url) {
      assetMap.set(asset.sys.id, url)
    }
  })

  return data.items.map((item) => {
    const photoId = item.fields.photo?.sys?.id
    return {
      id: item.sys.id,
      rating: getFieldValue(item.fields.rating) ?? 5,
      job: getFieldValue(item.fields.personsJob) ?? "",
      content: getFieldValue(item.fields.testimonialContent) ?? "",
      name: getFieldValue(item.fields.personsName) ?? "Anonymous",
      partnershipYear: getFieldValue(item.fields.partnershipYear),
      photoUrl: photoId ? assetMap.get(photoId) : undefined,
    }
  })
}
