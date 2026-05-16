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

/** True when a Sanity image field has a resolvable asset (optional fields may be unset or empty). */
export function hasSanityImage(
  image: SanityImage | null | undefined,
): image is SanityImage {
  if (!image || typeof image !== "object") return false;
  const asset = (image as { asset?: { _ref?: string; _id?: string } }).asset;
  if (!asset || typeof asset !== "object") return false;
  return Boolean(asset._ref ?? asset._id);
}
