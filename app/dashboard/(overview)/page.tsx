import { lusitana } from '@/app/ui/fonts';
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';
import type { AppProps } from 'next/app';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';

//export default function Page({ Component, pageProps }: AppProps) {
export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <CardWrapper />
        </Suspense>
      </div>
    </main>
  );
  // return (
  //   <SessionProvider session={pageProps.session}>
  //     <Component {...pageProps} />
  //   </SessionProvider>
  // );
}