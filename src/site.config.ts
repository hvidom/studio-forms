export const siteConfig = {
  // Basic site info
  title: 'Studio Form',
  author: 'hvidom',
  description: 'My project for Create a forms in astro project',
  url: 'https://studio-forms.devopsick.workers.dev/',

  // SEO & Metadata
  defaultLocale: 'en',
  twitter: {
    creator: undefined,
    site: undefined,
  },
  defaultOgImage: '/og-image.png',

  // Contact Information
  contact: {
    phone: '(123) 456-7890',
    email: 'devopsick@pm.me',
  },

  // Navigation
  navigation: [
    { href: '/contact', label: 'Contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
