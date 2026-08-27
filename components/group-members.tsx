import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { type Student, students } from "@/lib/db/students"

function MemberList({ people }: { people: Student[] }) {
  return (
    <ItemGroup>
      {people.map((person, index) => (
        <div key={person.name}>
          <Item className="px-0 py-4">
            <ItemMedia className="group-has-[[data-slot=item-description]]/item:translate-y-0 group-has-[[data-slot=item-description]]/item:self-center">
              <Avatar className="size-11">
                <AvatarImage src={person.avatar} alt={`Portrait of ${person.name}`} />
                <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent className="gap-1 sm:grid sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-center sm:gap-x-6">
              <ItemTitle className="text-base">{person.name}</ItemTitle>
              <ItemDescription className="sm:col-start-1">{person.position}</ItemDescription>
              <ItemDescription className="sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:text-right">
                {person.period}
              </ItemDescription>
            </ItemContent>
          </Item>
          {index !== people.length - 1 ? <ItemSeparator /> : null}
        </div>
      ))}
    </ItemGroup>
  )
}

export default function GroupMembers() {
  const currentPhDs = students.filter(
    (person) => person.type === "phd" && person.status === "current",
  )
  const formerPhDs = students.filter(
    (person) => person.type === "phd" && person.status === "former",
  )
  const formerPostdocs = students.filter(
    (person) => person.type === "postdoc" && person.status === "former",
  )
  const groups = [
    { id: "current-phd", title: "Current Ph.D. students", people: currentPhDs },
    { id: "former-phd", title: "Former Ph.D. students", people: formerPhDs },
    { id: "former-postdocs", title: "Former postdocs", people: formerPostdocs },
  ]

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">People</h2>
        <p className="text-muted-foreground">Students and researchers I have supervised.</p>
      </div>
      <div className="divide-y border-y">
        {groups.map(({ id, people, title }) => (
          <section
            key={id}
            aria-labelledby={`people-${id}`}
            className="grid gap-3 py-7 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10"
          >
            <h3 id={`people-${id}`} className="text-sm font-medium">
              {title}
            </h3>
            <MemberList people={people} />
          </section>
        ))}
      </div>
    </section>
  )
}
