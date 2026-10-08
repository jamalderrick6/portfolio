// Same card as the Open Graph image; X/Twitter reads its own meta tags.
import OgImage from "./opengraph-image";
import { ogSize } from "@/lib/og";
import { site } from "@/data/site";

export const alt = `${site.name}, ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default OgImage;
