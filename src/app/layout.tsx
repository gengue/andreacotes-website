import "./globals.css";

export const metadata = {
  title: "Andrea Cotes",
  description: "Biologist & dog lover. Based in Norway",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
