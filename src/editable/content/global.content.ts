import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'A warm directory for images, profiles, and useful finds',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'A warm directory for images, profiles, and useful finds',
    primaryLinks: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse now', href: '/' },
      secondary: { label: 'Get in touch', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Directory notes, image stories, profiles, and curated public-facing posts',
    description:
      'A playful browsing surface for business owners who want to explore people, visuals, listings, and practical reads in one place.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Images', href: '/image' },
          { label: 'Listings', href: '/listing' },
          { label: 'Articles', href: '/article' },
        ],
      },
      {
        title: 'Pages',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Thoughtful browsing for public-facing stories and directories.',
  },
  commonLabels: {
    readMore: 'Open entry',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
