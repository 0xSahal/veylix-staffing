import { LenisProvider } from './LenisProvider'
import { MotionProvider } from './MotionProvider'
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

export { LenisProvider, PageTransition, MotionProvider }
