// Same card as the Open Graph image; X/Twitter reads its own meta tags.
import OgImage, { generateStaticParams } from "./opengraph-image";
import { ogSize } from "@/lib/og";

export const alt = "Preview card for a project by Derrick Omanwa";
export const size = ogSize;
export const contentType = "image/png";

export { generateStaticParams };
export default OgImage;
