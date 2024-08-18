import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function Page({ Component, pageProps }: AppProps) {
  return <p>Dashboard Page</p>;
  // return (
  //   <SessionProvider session={pageProps.session}>
  //     <Component {...pageProps} />
  //   </SessionProvider>
  // );
}