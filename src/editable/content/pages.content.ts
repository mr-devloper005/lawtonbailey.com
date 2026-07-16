import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Profiles, images, and practical directory notes',
      description: 'Explore images, profiles, listings, and helpful posts through a warm, editorial directory experience.',
      openGraphTitle: 'Profiles, images, and practical directory notes',
      openGraphDescription: 'Discover image-led posts, profiles, and practical directory content in one distinctive browsing experience.',
      keywords: ['business directory', 'profiles', 'image discovery', 'editorial listings'],
    },
    hero: {
      badge: 'Playful directory',
      title: ['A bright front door for', 'profiles, visuals, and useful notes.'],
      description:
        'Explore fresh profiles, image-led highlights, and practical posts arranged like a warm studio noticeboard.',
      secondaryCta: { label: 'See visuals', href: '/image' },
      searchPlaceholder: 'Search names, categories, visuals, and topics',
      focusLabel: 'Focus',
      featureCardBadge: 'featured selection',
      featureCardTitle: 'A homepage built around live posts, portraits, and image-led discovery.',
      featureCardDescription: 'The layout stays expressive while continuing to render real post data from the existing feed.',
    },
    intro: {
      badge: 'About the directory',
      title: 'Designed to feel personal, visual, and easy to explore.',
      paragraphs: [
        'This site combines image-led browsing, profile highlights, and structured posts in one warm browsing flow.',
        'Visitors can move between people, visuals, listings, and articles without losing context or momentum.',
        'The result feels less like a template and more like a real public-facing studio directory.',
      ],
      sideBadge: 'What stands out',
      sidePoints: [
        'A search-first hero that stays connected to live post data.',
        'Mixed card layouts so different content types feel more human.',
        'Profile, image, listing, and article routes all keep their existing behavior.',
        'A warm editorial system that works on desktop and mobile.',
      ],
      primaryLink: { label: 'Browse listings', href: '/listing' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Browse visual stories, business profiles, and practical resources in one place.',
      description:
        'Move through profiles, image posts, articles, and directory-style entries with a clearer and more distinctive rhythm.',
      secondaryCta: { label: 'Contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About',
    title: 'A warmer way to present public-facing content.',
    description: `${slot4BrandConfig.siteName} brings together profiles, visuals, listings, and articles inside one approachable browsing experience.`,
    paragraphs: [
      'The goal is to make discovery feel natural, visual, and easy to trust.',
      'Whether someone starts with a profile, an image, or a practical post, they can keep exploring without friction.',
    ],
    values: [
      {
        title: 'Visual clarity',
        description: 'Pages are built to highlight people, imagery, and useful context without clutter.',
      },
      {
        title: 'Connected discovery',
        description: 'Different post types remain linked together so visitors can keep browsing naturally.',
      },
      {
        title: 'Public-ready presentation',
        description: 'Copy and layout stay broad, natural, and suitable for a real business-facing website.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A contact page that feels like part of the site, not an afterthought.',
    description: 'Share your question, request, or idea and we will route it through the right lane.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the directory',
      title: 'Find profiles, visuals, and useful posts faster.',
      description: 'Use keywords and categories to discover content from every active section.',
      placeholder: 'Search by name, category, title, or topic',
    },
    resultsTitle: 'Search results',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create a new post.',
      description: 'Use your account to open the publishing workspace and add content to the active sections.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for the site.',
      description: 'Choose the content type, add details, and prepare a post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back.',
      description: 'Login to continue browsing, managing submissions, and creating new content.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit site',
    },
  },
} as const
