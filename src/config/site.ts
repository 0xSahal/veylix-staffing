/**
 * Phone contact is temporarily hidden site-wide. The real values are parked in
 * `src/config/contact-archive.ts` — restore them into `phone` and
 * `whatsappNumber` below and flip this to true to bring it back.
 */
export const CONTACT_PHONE_ENABLED: boolean = false

export const siteConfig = {
  name: 'Veylix Staffing',
  shortName: 'Veylix',
  logoSrc: '/icon/Logo.webp',
  description:
    'Staffing for teams that care who they hire. Permanent placement, contract staffing, and executive search across the United States and Canada.',
  url: 'https://www.veylixstaffing.com',
  email: 'contact@veylixstaffing.com',
  phone: '',
  whatsappNumber: '',
  address: 'Cheyenne, Wyoming, USA',
  foundedYear: 2016,
  officeHours: 'Monday – Friday, 9:00 AM – 6:00 PM EST',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.0!2d-106.956!3d44.797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQ3JzQ5LjIiTiAxMDbCsDU3JzIxLjYiVw!5e0!3m2!1sen!2sus!4v1',
  socials: {
    linkedin: 'https://linkedin.com/company/veylix-staffing',
    twitter: 'https://twitter.com/veylixstaffing',
    instagram:
      'https://www.instagram.com/veylix_staffing?utm_source=qr&igsh=MTB1dXV1Z3I2bGlqNQ==',
    facebook: 'https://www.facebook.com/profile.php?id=61590816692391',
  },
} as const
