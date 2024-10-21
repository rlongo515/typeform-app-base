import Image from 'next/image';
import { TokenGate } from '@/components/TokenGate';
import { getSession } from '@/utils/session';

/**
 * The revalidate property determines the cache TTL for this page and
 * all fetches that occur within it. This value is in seconds.
 */
export const revalidate = 180;

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const data = await getSession(searchParams);
  console.log("Session data:", data);

  // Dynamic Typeform URL with user details
  const typeformUrl = `https://b4uqo8iqk82.typeform.com/to/gPmK99f7#email=${encodeURIComponent(data.client?.email || 'example@example.com')}&first_name=${encodeURIComponent(data.client?.givenName || 'John')}&last_name=${encodeURIComponent(data.client?.familyName || 'Doe')}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-0 m-0"> {/* Remove padding and margin for full screen */}
      {/* Fullscreen Typeform Iframe Section */}
      <div className="relative w-full h-screen bg-white"> {/* Full screen wrapper */}
        <iframe
          title="Typeform Survey"
          src={typeformUrl}
          frameBorder="0"
          width="100%" // Full width
          height="100%" // Full height
          style={{ border: 'none', position: 'absolute', top: 0, left: 0 }} // Remove border and ensure iframe covers the entire screen
          allow="geolocation; microphone; camera; fullscreen"
          scrolling="no" // Disable iframe scrolling
        />
      </div>
    </main>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
