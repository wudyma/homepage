import type * as PageTree from "fumadocs-core/page-tree"

import Image from "next/image"
import Link from "next/link"

const coverImages = {
  kinetic: "/research/reentry.png",
  inverse: "/research/rad-therapy.jpg",
  fusion: "/research/icf.png",
}

const researchOrder = {
  kinetic: 0,
  inverse: 1,
  fusion: 2,
}

export default function ResearchAreas({ metas }: { metas: PageTree.Node[] }) {
  const sortedMetas = metas.toSorted((a: PageTree.Node, b: PageTree.Node) => {
    const indexA = researchOrder[(a.$id ? a.$id.split(":")[1] : "") as keyof typeof researchOrder]
    const indexB = researchOrder[(b.$id ? b.$id.split(":")[1] : "") as keyof typeof researchOrder]
    return indexA - indexB
  })
  return (
    <section aria-labelledby="directions-heading" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 id="directions-heading" className="text-2xl font-semibold tracking-tight">
          Directions
        </h2>
        <p className="text-muted-foreground">Three connected areas shape my current work.</p>
      </div>
      <div className="grid border-y md:grid-cols-3 md:divide-x">
        {sortedMetas.map((meta) => {
          const id = meta.$id
          return (
            <Link
              key={id}
              href={`/docs/${id}`}
              className="group flex flex-col gap-5 border-b py-7 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
            >
              {meta.$id ? (
                <div className="overflow-hidden bg-muted">
                  <Image
                    src={coverImages[id as keyof typeof coverImages]}
                    alt={`Illustration for ${meta.name}`}
                    width={640}
                    height={640}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">{meta.name}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {/* @ts-expect-error description is supplied by the page tree metadata */}
                  {meta.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
