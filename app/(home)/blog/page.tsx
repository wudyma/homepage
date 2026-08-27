import { PathUtils } from "fumadocs-core/source"
import Link from "next/link"

import { blog } from "@/lib/source"

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path))
}

export default function Page() {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? getName(b.path)).getTime() -
      new Date(a.data.date ?? getName(a.path)).getTime(),
  )

  return (
    <main className="flex flex-col gap-12 py-12 sm:py-20">
      <section className="flex max-w-2xl flex-col gap-4">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Notes · Updates · Ideas
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">Blog</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Occasional notes on research, teaching, and ongoing work.
        </p>
      </section>
      <div className="divide-y border-y">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="group grid gap-3 py-7 transition-colors hover:bg-muted/40 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8"
          >
            <time className="font-mono text-xs text-muted-foreground">
              {new Date(post.data.date ?? getName(post.path)).toDateString()}
            </time>
            <div className="flex flex-col gap-2">
              <h2 className="font-medium group-hover:underline">{post.data.title}</h2>
              <p className="text-sm leading-6 text-muted-foreground">{post.data.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
