import GroupMembers from "@/components/group-members"
import ResearchAreas from "@/components/research-areas"
import { source } from "@/lib/source"

export default function ResearchPage() {
  const pageTreeMeta = source.pageTree.children
  return (
    <div className="flex flex-col gap-14 py-12 sm:gap-20 sm:py-20">
      <section className="flex max-w-3xl flex-col gap-5">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Mathematics · Computation · Learning
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">Research</h1>
        <p className="text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
          I study computational mathematics and scientific machine learning, with particular
          interest in how mathematical structure can guide reliable methods for scientific and
          engineering problems.
        </p>
      </section>
      <ResearchAreas metas={pageTreeMeta} />
      <GroupMembers />
    </div>
  )
}
