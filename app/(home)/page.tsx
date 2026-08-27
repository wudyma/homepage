import { ArrowUpRight, BookOpen, FileText, FlaskConical, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import Resume from "@/components/resume"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import PortraitImage from "@/public/portrait.jpg"

const areas = [
  "Scientific machine learning",
  "Kinetic equations",
  "Inverse problems",
  "Fusion confinement",
]

const destinations = [
  {
    href: "/research",
    title: "Research",
    description: "Current directions, research notes, and the people I work with.",
    icon: FlaskConical,
  },
  {
    href: "/publications",
    title: "Publications",
    description: "Peer-reviewed articles, preprints, and conference papers.",
    icon: FileText,
  },
  {
    href: "/docs",
    title: "Research notes",
    description: "Long-form notes on inverse problems, kinetic theory, and fusion.",
    icon: BookOpen,
  },
]

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-16 py-12 sm:gap-20 sm:py-20">
      <section
        aria-labelledby="intro-heading"
        className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_13rem] md:gap-16"
      >
        <div className="order-2 flex max-w-2xl flex-col items-start gap-7 md:order-1">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Computational Mathematics · AI for Science
            </p>
            <h1
              id="intro-heading"
              className="text-5xl leading-none font-semibold tracking-[-0.045em] sm:text-7xl"
            >
              Zheng Ma <span className="font-cn text-muted-foreground">马征</span>
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            Associate Professor at Shanghai Jiao Tong University. I work across mathematical theory,
            algorithms, and engineering for scientific machine learning.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Research areas">
            {areas.map((area) => (
              <li key={area} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-muted-foreground" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/cv.pdf">
                <FileText data-icon="inline-start" />
                Curriculum vitae
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="mailto:zhengma@sjtu.edu.cn">
                <Mail data-icon="inline-start" />
                zhengma@sjtu.edu.cn
              </Link>
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Image
            src={PortraitImage}
            alt="Portrait of Zheng Ma"
            className="size-32 rounded-full object-cover sm:size-40 md:size-52"
            priority
            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 208px"
          />
        </div>
      </section>

      <section aria-labelledby="explore-heading" className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 id="explore-heading" className="text-2xl font-semibold tracking-tight">
            Explore my work
          </h2>
          <p className="text-muted-foreground">Research, papers, and working notes.</p>
        </div>
        <div className="grid border-y md:grid-cols-3 md:divide-x">
          {destinations.map(({ description, href, icon: Icon, title }) => (
            <Link
              key={href}
              href={href}
              className="group flex min-h-52 flex-col gap-5 border-b py-7 transition-colors last:border-b-0 hover:bg-muted/40 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-muted-foreground" />
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="journey-heading" className="flex flex-col gap-8">
        <Separator />
        <div className="flex flex-col gap-2">
          <h2 id="journey-heading" className="text-2xl font-semibold tracking-tight">
            Academic journey
          </h2>
          <p className="text-muted-foreground">Appointments and education.</p>
        </div>
        <Resume />
      </section>
    </div>
  )
}
