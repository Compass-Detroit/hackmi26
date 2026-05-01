/**
 * Central Sanity client + image-URL builder.
 *
 * Everything elsewhere in the app imports from here, never from
 * `sanity:client` directly. This keeps the virtual module confined to one
 * file and makes mocking (e.g. in tests) trivial.
 */
import { sanityClient } from "sanity:client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "./schemas";

export { sanityClient };

const builder = createImageUrlBuilder(sanityClient);

/** Build an image URL for a Sanity image reference. */
export function urlFor(source: SanityImage) {
  return builder.image(source);
}
