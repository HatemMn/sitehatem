import { rssSchema } from "@astrojs/rss";
import { defineCollection, z } from "astro:content";

export const collections = {
	blog: defineCollection({
		schema: ({ image }) =>
			rssSchema.extend({
				description: z.string(),
				download: z.string().optional(),
				image: z.object({
					alt: z.string(),
					src: image(),
				}),
				pubDate: z.coerce.date(),
				title: z.string(),
			}),
	}),
};
