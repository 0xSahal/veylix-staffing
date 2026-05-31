export type NavItem = {
  label: string
  href: string
  children?: NavItem[]
}

export const navItems: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]
