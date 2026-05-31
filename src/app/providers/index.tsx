import { LenisProvider } from './LenisProvider'
import { PageTransition } from './PageTransition'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps): React.ReactNode {
  return (
    <LenisProvider>
      <PageTransition>{children}</PageTransition>
    </LenisProvider>
  )
}

export { LenisProvider, PageTransition }
