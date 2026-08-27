import { PublicationList } from "@/components/publication-list"
import pubs from "@/lib/db/publications.json"

const publications = [...pubs].sort((a, b) => {
  const yearA = (a.issued?.["date-parts"]?.[0]?.[0] as number) || 0
  const yearB = (b.issued?.["date-parts"]?.[0]?.[0] as number) || 0
  return yearB - yearA
})

export default function PublicationsPage() {
  return (
    <div className="flex flex-col gap-10 py-12 sm:py-20">
      <section className="flex max-w-2xl flex-col gap-4">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Articles · Preprints · Proceedings
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">Publications</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Research in computational mathematics, kinetic theory, inverse problems, and scientific
          machine learning.
        </p>
      </section>
      <section aria-label="Publication list">
        <PublicationList publications={publications} />
      </section>
    </div>
  )
}
