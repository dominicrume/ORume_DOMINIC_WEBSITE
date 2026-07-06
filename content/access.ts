/**
 * Instant-access resources delivered the moment someone signs up. URLs come from
 * env so they can be swapped without a code change. Fallbacks keep every link
 * alive (never a dead button) until the real free-resource links are set.
 */

export const access = {
  heading: 'You’re in. Here’s your instant access.',
  sub: 'Your free AI course and book are ready right now. No waiting on email. We’ve also saved your details and will send updates.',
  resources: [
    {
      tag: 'Free book',
      title: 'From Code to Consciousness',
      desc: 'Bridging the gap between AI and humans, with insights from 51,000+ hours of development.',
      cta: 'Download the book (PDF)',
      // `||` so an empty env value falls back to the hosted PDF, not a broken link.
      href: process.env.NEXT_PUBLIC_BOOK_URL || '/from-code-to-consciousness.pdf',
    },
    {
      tag: 'Free course',
      title: 'Master AI in 9 Days',
      desc: 'Go from total beginner to confident with AI in nine short, practical days.',
      cta: 'Start the course',
      href: process.env.NEXT_PUBLIC_COURSE_URL || 'https://www.youtube.com/@rumedominic',
    },
  ],
  courseAccess: {
    title: 'How to access your free course',
    note: 'The course lives inside Vorem. It takes about a minute to set up:',
    steps: [
      'Register and log in at vorem.co with your email.',
      'Confirm your account from the email Vorem sends you. If you don’t see it, check your spam or junk folder for the confirmation code.',
      'Once confirmed, open Explore Courses, then Free Courses, and start “Master AI in 9 Days”.',
    ],
  },
  nextStep: {
    title: 'Want to go further, faster?',
    body: 'Book a strategy call and leave with a clear, actionable plan for your AI or Web3 goal.',
  },
} as const;
