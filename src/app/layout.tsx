import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TVMaze Explorer',
  description: 'Explorez des séries, acteurs et épisodes avec l’API TVMaze.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <header className="bg-[var(--primary)] text-white px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold hover:underline">Vouatch</Link>

          <form
            action="/search"
            method="GET"
            className="flex relative lg:w-1/2 lg:mr-6"
          >
            <input
              type="text"
              name="query"
              placeholder="Game of Thrones, Breaking bad..."
              className="pl-3 pr-10 py-1 rounded-lg text-white bg-[var(--primarySoft)] lg:w-full"
              required
            />
            <button type="submit" className="bg-[var(--secondary)] ml-[-2rem] text-black px-3 py-1 rounded-full font-semibold">
              🔍
            </button>
          </form>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
