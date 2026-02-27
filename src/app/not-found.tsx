import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-6xl mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/misc/ghostface-mask.svg"
          alt=""
          width={80}
          height={120}
          className="mx-auto opacity-30"
        />
      </div>
      <h1 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-[var(--text-primary)] mb-2">
        Wrong number.
      </h1>
      <p className="text-[var(--text-secondary)] mb-6">
        The page you&rsquo;re looking for doesn&rsquo;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
      >
        Back to the franchise
      </Link>
    </div>
  );
}
