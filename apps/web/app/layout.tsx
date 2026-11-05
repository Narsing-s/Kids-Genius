import "./globals.css";
export const metadata = {title:"Kids Genius | Learn, Play & Grow",description:"A bilingual learning world for children aged 1–10."};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
