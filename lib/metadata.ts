import type { Metadata } from "next/types"

import { Page } from "./source"

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      siteName: "Zheng Ma",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      ...override.twitter,
    },
    alternates: override.alternates,
  }
}

export function getPageImage(page: Page) {
  const segments = [...page.slugs, "image.webp"]

  return {
    segments,
    url: `/og/${segments.join("/")}`,
  }
}

export const baseUrl =
  process.env.NODE_ENV === "development" || !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL("https://zheng-home.vercel.app")
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
