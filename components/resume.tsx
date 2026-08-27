import Link from "next/link"

const experiences = [
  {
    title: "Tenure-Track Associate Professor",
    company: "Shanghai Jiao Tong University",
    period: "2020 - Present",
    description:
      "Developing full-stack AI for science—from theory to algorithms and engineering—with an emphasis on kinetic theory and full-waveform inversion.",
    tags: ["DeepRTE", "APNNs", "Inverse Problems"],
  },
  {
    title: "Golomb Visiting Assistant Professor",
    company: "Purdue University",
    period: "2017 - 2020",
    description:
      "Conducted research in applied mathematics, focusing on numerical methods for partial differential equations and scientific computing.",
    tags: ["Fast Spectral Algorithms", "Model Reduction", "Deep Learning"],
  },
  {
    title: "Ph.D. in Computational Mathematics",
    company: "Shanghai Jiao Tong University",
    period: "2012 - 2017",
    description: (
      <>
        Supervised by{" "}
        <Link
          href="https://ins.sjtu.edu.cn/people/shijin/"
          className="font-medium text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prof. Shi Jin
        </Link>
        . Dissertation:{" "}
        <Link
          href="/thesis.pdf"
          className="font-medium text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Numerical Methods for Kinetic Equations in the Diffusive Regimes
        </Link>
        .
      </>
    ),
    tags: ["APUQ", "Conservation Laws"],
  },
  {
    title: "B.S. in Mathematics, Minor in Applied Physics",
    company: "Shanghai Jiao Tong University",
    period: "2008 - 2012",
    description: (
      <>
        Graduated from the the first &quot;Class of Science (Math and Physics)&quot; which is the
        predecessor of the{" "}
        <Link
          href="https://zhiyuan.sjtu.edu.cn/html/zhiyuan"
          className="font-medium text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zhiyuan College
        </Link>{" "}
        at SJTU.
      </>
    ),
    tags: [],
  },
]

export default function Resume() {
  return (
    <ol className="divide-y border-y">
      {experiences.map(({ company, description, period, tags, title }) => (
        <li key={title} className="grid gap-3 py-7 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
          <p className="font-mono text-sm text-muted-foreground">{period}</p>
          <div className="flex max-w-2xl flex-col gap-2">
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
            <div className="text-sm leading-6 text-pretty text-muted-foreground">{description}</div>
            {tags.length > 0 ? (
              <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                {tags.join(" · ")}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
