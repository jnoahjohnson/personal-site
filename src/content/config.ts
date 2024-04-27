import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const photo = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    source: z.string(),
    alt: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    tags: z.array(z.string()),
    device: z.string(),
  }),
});

export const collections = { blog, photo };
