import Link from 'next/link'

export default function NotFound(): React.ReactNode {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="heading-h2 text-vx-navy">Page not found</h1>
      <Link href="/" className="btn-primary">
        Return home
      </Link>
    </main>
  )
}
