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
  
  // Dynamic Typeform URL with user details
  const typeformUrl = `https://b4uqo8iqk82.typeform.com/to/gPmK99f7#email=${encodeURIComponent(data.client?.email || 'example@example.com')}&first_name=${encodeURIComponent(data.client?.givenName || 'John')}&last_name=${encodeURIComponent(data.client?.familyName || 'Doe')}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {/* Typeform Iframe Section */}
      <div className="relative flex flex-col items-center w-full h-full bg-white mt-10"> {/* Added margin for spacing */}
        <iframe
          title="Typeform Survey"
          src={typeformUrl}
          frameBorder="0"
          width="100%"
          height="1000px" // Adjust height as needed
          style={{ border: 'none' }} // Remove border for a clean look
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
