import "./globals.css";
import SiteChrome from "../components/SiteChrome";

export const metadata = {
  title: "Vorixa - Premium Corporate Gifting & Custom Merchandise",
  description:
    "Custom promotional products, corporate gifting, branded merchandise, and bulk order support across India.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <SiteChrome>{children}</SiteChrome>
        </div>
      </body>
    </html>
  );
}
