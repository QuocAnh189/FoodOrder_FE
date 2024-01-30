import './globals.css';

//components
import AppProvider from 'src/components/AppContext';
import Header from 'src/components/layout/Header';

//toast
import { Toaster } from 'react-hot-toast';

//fonts
import { Roboto } from 'next/font/google';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

//meta
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2024 All rights reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
