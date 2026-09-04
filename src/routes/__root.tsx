import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { CreatedWithGrokBanner } from "@/components/created-with-grok-banner";
import appCss from "../styles.css?url";

const APP_NAME = "Spirit Breath — Dan Brulé";
const host = import.meta.env.VITE_PUBLIC_HOSTNAME;
const ogImage = host
  ? `https://${host}/covers/hero-wide.jpg`
  : "/covers/hero-wide.jpg";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        name: "description",
        content:
          "Interactive Spiritual Breathing guided by the teachings of Dan Brulé — techniques, journey, and practice.",
      },
      { title: APP_NAME },
      { name: "theme-color", content: "#000000" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Spirit Breath" },
      { name: "application-name", content: "Spirit Breath" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: "Breathe yourself awake." },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1792" },
      { property: "og:image:height", content: "1008" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Outfit:wght@300;400;500;600&display=swap",
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "apple-touch-icon", href: "/icons/icon-512.png" },
      { rel: "preload", as: "image", href: "/covers/app-cover.jpg" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased bg-bg text-fg">
        <CreatedWithGrokBanner />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
