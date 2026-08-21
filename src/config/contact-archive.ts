/**
 * Parked phone contact details. Nothing imports this file, so these values
 * never reach a build output. Phone contact is currently hidden site-wide;
 * to bring it back, copy the values into `phone` and `whatsappNumber` in
 * `src/config/site.ts` and set `CONTACT_PHONE_ENABLED` there to true.
 */
export const archivedContact = {
  phone: '+1 (484) 964-9338',
  whatsappNumber: '14849649338',
} as const
