import type { TeachingMetadata, TeachingsCollection } from "@/types/teachings-metadata"

import { TeachingsList } from "@/components/teachings-list"

interface TeachingInfo {
  id: string
  title: string
  date: string
  language?: string
  slidesUrl: string
  slidesPdfUrl: string
  notesPdfUrl: string
  previewImage?: string
}

async function getTeachingsMetadata(): Promise<TeachingsCollection> {
  const res = await fetch("https://zheng-teachings.netlify.app/teachings-metadata.json", {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!res.ok) {
    throw new Error("Failed to fetch teachings metadata")
  }

  return res.json()
}

function transformTeachingMetadata(teaching: TeachingMetadata): TeachingInfo {
  const slidesUrl = teaching.slidesUrl || `https://zheng-teachings.netlify.app/${teaching.id}`

  // Derive PDF URLs from the slides base URL
  const slidesPdfUrl = teaching.pdfUrl || `${slidesUrl}assets/${teaching.id}.pdf`
  const notesPdfUrl = `${slidesUrl}assets/notes.pdf`

  // Generate preview image URL (Slidev exports og-image.png with 16:9 ratio)
  const previewImage = `${slidesUrl}og-image.png`

  return {
    id: teaching.id,
    title: teaching.title,
    date: teaching.date,
    language: teaching.language,
    slidesUrl,
    slidesPdfUrl,
    notesPdfUrl,
    previewImage,
  }
}

async function getTeachingsInfo(): Promise<TeachingInfo[]> {
  const collection = await getTeachingsMetadata()

  const teachings = collection.teachings
    .filter((teaching) => teaching.published !== false)
    .map(transformTeachingMetadata)

  // Sort by date in descending order (newest first)
  return teachings.sort((a, b) => b.date.localeCompare(a.date))
}

export default async function Page() {
  const teachings = await getTeachingsInfo()

  return (
    <div className="flex flex-col gap-10 py-12 sm:py-20">
      <section className="flex max-w-2xl flex-col gap-4">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Courses · Notes · Slides
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">Teaching</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Course materials in applied mathematics and scientific computing.
        </p>
      </section>
      <TeachingsList teachings={teachings} />
    </div>
  )
}
