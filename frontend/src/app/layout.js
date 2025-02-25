import { ClerkProvider } from '@clerk/nextjs';
import './globals.css'; // Import your global styles

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
