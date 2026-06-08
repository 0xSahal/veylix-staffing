export type PlacementCompany = {
  name: string
  logoSrc: string
  alt: string
  width: number
  height: number
}

export const PLACEMENT_COMPANIES: PlacementCompany[] = [
  {
    name: 'Infosys',
    logoSrc: '/images/companies/infosys.webp',
    alt: 'Infosys logo',
    width: 96,
    height: 96,
  },
  {
    name: 'Accenture',
    logoSrc: '/images/companies/accenture.webp',
    alt: 'Accenture logo',
    width: 96,
    height: 96,
  },
  {
    name: 'Capgemini',
    logoSrc: '/images/companies/capgemini.webp',
    alt: 'Capgemini logo',
    width: 411,
    height: 96,
  },
  {
    name: 'CVS Health',
    logoSrc: '/images/companies/cvs-health.webp',
    alt: 'CVS Health logo',
    width: 722,
    height: 96,
  },
  {
    name: 'Dell Technologies',
    logoSrc: '/images/companies/dell.webp',
    alt: 'Dell Technologies logo',
    width: 96,
    height: 96,
  },
  {
    name: 'Comcast',
    logoSrc: '/images/companies/comcast.webp',
    alt: 'Comcast logo',
    width: 272,
    height: 96,
  },
  {
    name: 'Wipro',
    logoSrc: '/images/companies/wipro.webp',
    alt: 'Wipro logo',
    width: 96,
    height: 96,
  },
  {
    name: 'Amazon',
    logoSrc: '/images/companies/amazon.webp',
    alt: 'Amazon logo',
    width: 96,
    height: 96,
  },
  {
    name: 'Salesforce',
    logoSrc: '/images/companies/salesforce.webp',
    alt: 'Salesforce logo',
    width: 96,
    height: 96,
  },
  {
    name: 'Meta',
    logoSrc: '/images/companies/meta.webp',
    alt: 'Meta logo',
    width: 96,
    height: 96,
  },
  {
    name: 'Walmart',
    logoSrc: '/images/companies/walmart.webp',
    alt: 'Walmart logo',
    width: 96,
    height: 96,
  },
  {
    name: 'Oracle',
    logoSrc: '/images/companies/oracle.webp',
    alt: 'Oracle logo',
    width: 740,
    height: 96,
  },
]

/** Rendered logo height in the marquee (px) */
export const COMPANY_LOGO_DISPLAY_HEIGHT = 40

export function companyLogoDisplayWidth(company: PlacementCompany): number {
  return Math.round((company.width / company.height) * COMPANY_LOGO_DISPLAY_HEIGHT)
}
