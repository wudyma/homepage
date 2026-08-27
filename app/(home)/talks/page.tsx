import type { TalkMetadata, TalksCollection } from "@/types/talks-metadata"

import { TalksList } from "@/components/talks-list"

interface TalkInfo {
  dirname: string
  metadata: {
    title?: string
    date?: string
    event?: string
    location?: string
    description?: string
    tags?: string[]
    theme?: string
    layout?: string
    conferenceUrl?: string
  }
  html_url: string
  displayDate?: string
  previewImage?: string
  pdfUrl?: string
  sourceUrl?: string
}

async function getTalksMetadata(): Promise<TalksCollection> {
  const res = await fetch("https://zheng-talks.netlify.app/talks-metadata.json", {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!res.ok) {
    throw new Error("Failed to fetch talks metadata")
  }

  return res.json()
}

function transformTalkMetadata(talk: TalkMetadata): TalkInfo {
  // Type guard for custom string fields
  const getCustomString = (key: string): string | undefined => {
    const value = talk.custom?.[key]
    return typeof value === "string" ? value : undefined
  }

  const slidesUrl = talk.slidesUrl || `https://zheng-talks.netlify.app/${talk.id}`

  // Generate preview image URL (Slidev exports og-image.png with 16:9 ratio)
  const previewImage = `${slidesUrl}/og-image.png`

  return {
    dirname: talk.id,
    metadata: {
      title: talk.title,
      date: talk.date,
      event: talk.conference,
      location: talk.location,
      description: talk.description,
      tags: talk.tags,
      theme: getCustomString("theme"),
      layout: getCustomString("layout"),
      conferenceUrl: talk.conferenceUrl,
    },
    html_url: slidesUrl,
    displayDate: talk.date,
    previewImage,
    pdfUrl: talk.pdfUrl,
    sourceUrl: talk.sourceUrl,
  }
}

async function getTalksInfo(): Promise<TalkInfo[]> {
  const collection = await getTalksMetadata()

  // Filter only published talks and transform to TalkInfo format
  const talks = collection.talks
    .filter((talk) => talk.published !== false)
    .map(transformTalkMetadata)

  // Sort by date in descending order (newest first)
  return talks.sort((a, b) => {
    const dateA = a.metadata.date || a.dirname
    const dateB = b.metadata.date || b.dirname
    return dateB.localeCompare(dateA)
  })
}

export default async function Page() {
  const talks = await getTalksInfo()

  return (
    <div className="flex flex-col gap-10 py-12 sm:py-20">
      <section className="flex max-w-2xl flex-col gap-4">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Seminars · Conferences · Lectures
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">Talks</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Slides and materials from selected research presentations.
        </p>
      </section>
      <TalksList talks={talks} />
    </div>
  )
}
