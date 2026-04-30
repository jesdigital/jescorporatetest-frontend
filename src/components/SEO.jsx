
import { Helmet } from "react-helmet-async"  // ← Add this line!

// ✅ Better version
const SEO = ({ title, description, image, canonical }) => (
  <Helmet>
    {/* Basic */}
    <title>{title} | JES</title>
    <meta name="description" content={description || "Empowering people to access and deliver justice globally."} />

    {/* Open Graph (Facebook, LinkedIn, WhatsApp preview) */}
    <meta property="og:title" content={`${title} | JES`} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image || "/default-og-image.jpg"} />
    <meta property="og:type" content="website" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${title} | JES`} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image || "/default-og-image.jpg"} />

    {/* Canonical URL */}
    {canonical && <link rel="canonical" href={canonical} />}
  </Helmet>
)

export default SEO