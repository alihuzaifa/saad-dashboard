import React from "react"
type prop = {
  title: string;
  subtitle: string;
}

export const Subtitle = ({ description }: { description: string }) => {
  return (
    <div className="mt-4 space-y-6">
      <p className="text-base text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
export const Title = ({ title }: { title: string }) => {
  return (
    <h1 className="text-xl font-bold tracking-tight sm:text-xl">
      {title}
    </h1>
  )
}
export default function PolicyTitleSubtitle({ title, subtitle }: prop) {
  return (
    <div>
      <Title title={title} />
      <Subtitle description={subtitle} />
    </div>
  )
}
