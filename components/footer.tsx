import Link from "next/link"

const today = new Date()

export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 border-t px-5 py-8 text-sm text-muted-foreground sm:px-8">
      <span>&copy; {today.getFullYear()} Zheng Ma</span>
      <div className="flex items-center gap-5">
        <Link href="mailto:zhengma@sjtu.edu.cn" className="transition-colors hover:text-foreground">
          Email
        </Link>
        <Link
          href="https://github.com/mazhengcn"
          className="transition-colors hover:text-foreground"
        >
          GitHub
        </Link>
      </div>
    </footer>
  )
}
