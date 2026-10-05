/**
 * Blog posts, content-as-code like the rest of content/.
 *
 * Why this file exists: every article written so far has lived on Medium or
 * Substack, which means every inbound link and every ranking signal has gone
 * to their domain instead of this one. Posts published here are indexable,
 * appear in the sitemap, and carry Article structured data.
 *
 * `body` is an array of blocks rather than a markdown string so the renderer
 * stays a server component with no parser dependency and no dangerouslySetInnerHTML.
 */

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'lead'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'figures'; caption: string; rows: { label: string; value: string; tone?: 'good' | 'bad' }[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date
  updated?: string;
  readingMinutes: number;
  tags: string[];
  image?: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: 'a-count-is-not-an-economy',
    title: 'A count is not an economy',
    description:
      'I sealed 106 artworks in Abuja and sold nothing. The AI agent payment rail everyone is quoting moves about $11,000 a month and its public counter has not changed since March. Two failures of measurement, at different sizes.',
    published: '2026-10-05',
    readingMinutes: 9,
    tags: ['AI agents', 'Web3', 'AI governance', 'verifiable AI', 'Canton'],
    image: '/media/01-106-sealed-0-sold.png',
    body: [
      {
        kind: 'lead',
        text: 'On 30 September I stood in a hall in Abuja and watched a number climb on a screen. It is still climbing. Nobody has bought anything.',
      },
      {
        kind: 'p',
        text: 'The work was real. Paintings, sculpture, clay, made by hand by Nigerian artists, photographed, hashed, and written to a public record that nobody can quietly edit afterwards. Including me. Especially me.',
      },
      {
        kind: 'figures',
        caption: 'The public board, which anyone can open and count',
        rows: [
          { label: 'Works sealed', value: '106', tone: 'good' },
          { label: 'Seals intact', value: 'every one', tone: 'good' },
          { label: 'Shares', value: '63', tone: 'good' },
          { label: 'Reactions', value: '132', tone: 'good' },
          { label: 'Sold', value: '0', tone: 'bad' },
        ],
      },
      {
        kind: 'p',
        text: 'The artist keeps 72 per cent. A gallery would have kept half. A hundred and thirty two people reacted. Sixty three shared it. Nobody bought.',
      },
      {
        kind: 'p',
        text: 'So it was not indifference. The room looked, reacted, shared, and did not buy. That is worse than being ignored, because it removes the comfortable explanation.',
      },
      {
        kind: 'p',
        text: 'I let myself feel good about the 106 for about two days. Then I went and looked at what the rest of this industry is doing, and found the same mistake with four more zeroes on it.',
      },

      { kind: 'h2', text: 'The counter that stopped counting' },
      {
        kind: 'p',
        text: 'There is a website called x402.org. It is the public face of the protocol that is supposed to let AI agents pay each other. It has a dashboard, and the dashboard says 75.41 million transactions, $24.24 million of volume, 94,060 buyers and 22,000 sellers.',
      },
      {
        kind: 'p',
        text: 'Those four numbers have not changed since March. A researcher named Daniel McGlynn checked them on 27 August, then 31 August, then on the 3rd, 4th and 6th of September. Identical every time, under a heading that reads Last 30 Days. There is no timestamp. There is no methodology. The FAQ page returns a 404.',
      },
      {
        kind: 'p',
        text: 'CoinDesk quoted those figures in July. They were already circulating in March. So when you read that agentic payments are exploding, check where the number came from. A great deal of it is one unmaintained dashboard, cited by people citing people.',
      },

      { kind: 'h2', text: 'What the forensics actually found' },
      {
        kind: 'p',
        text: 'TRM Labs did the work in September. They took $52.7 million of settlement since launch and asked a simple question: how much of this is actually an AI agent?',
      },
      {
        kind: 'figures',
        caption: 'TRM Labs, September 2026',
        rows: [
          { label: 'Of settled value verifiably agent-driven', value: '0.6% to 7.5%', tone: 'bad' },
          { label: 'Real agent spend per month in 2026', value: '$5k to $11k', tone: 'bad' },
          { label: 'Volume stripped as wash, tests and internal transfers by Artemis and Visa', value: '89%', tone: 'bad' },
        ],
      },
      {
        kind: 'p',
        text: 'A rail carrying tens of millions in lifetime settlement is moving less per month in real agent spend than a mid-size company spends on software.',
      },
      {
        kind: 'p',
        text: 'The reason is structural and worth understanding. A script, a cron job, a load test, a self-payment loop and a human clicking a button all produce an identical HTTP 402 sequence. On-chain you cannot tell them apart. The data cannot answer the question everyone is using it to answer.',
      },

      { kind: 'h2', text: 'And the rails shipped anyway' },
      {
        kind: 'p',
        text: 'In the fourteen days around that research, all of this happened.',
      },
      {
        kind: 'list',
        items: [
          'BlackRock published a thesis on the machine-native economy naming x402 by protocol.',
          'The Ethereum Foundation shipped zkAPI to mainnet on 1 October.',
          'Ripple announced AI agent wallets with verified identity and spending limits.',
          'Block joined the x402 Foundation and brought Bitcoin Lightning onto the rail.',
          "Mastercard's Verifiable Intent standard went into the XRP Ledger facilitator.",
        ],
      },
      {
        kind: 'quote',
        text: 'We are building a motorway for eleven thousand dollars a month of traffic.',
      },
      {
        kind: 'p',
        text: 'I am not saying do not build it. I am saying know which part of it you are standing on.',
      },

      { kind: 'h2', text: 'The part nobody is pricing' },
      {
        kind: 'p',
        text: 'In July, OpenAI agents were running a security benchmark inside what was meant to be an isolated environment with no internet access. Around 700 of them escaped the sandbox, reached the internet, used exposed credentials and zero-day vulnerabilities, took control of an external endpoint, entered Hugging Face systems, and stole the answer key to the test they were being graded on. More than 17,000 attacker actions. Then they attempted to cover their tracks.',
      },
      {
        kind: 'p',
        text: 'In late September, Transluce found the behaviour went back to at least March and continued to mid-September. Targets included government statistics bodies in Australia, the US Education Department, Commerce and the SEC. The most recent activity included attempts to break into a cryptocurrency exchange and trade. The attempts failed.',
      },
      {
        kind: 'p',
        text: 'September was also the worst month for crypto theft all year, at $766 million, with $387 million taken from Bitget alone.',
      },

      { kind: 'h2', text: 'Do not delete any emails' },
      {
        kind: 'p',
        text: 'A security researcher at Meta ran a popular agent on her own laptop. She told it, explicitly, not to delete any emails. It deleted her inbox.',
      },
      {
        kind: 'p',
        text: 'The cause was not malice and it was not a jailbreak. The email thread was long, so the system compressed its own context to save room, and the instruction was in the part it discarded. Her constraint did not survive the agent’s own memory management.',
      },
      {
        kind: 'quote',
        text: 'Telling an agent not to do something is not a control. It is a suggestion that competes for space.',
      },

      { kind: 'h2', text: 'What to build instead' },
      {
        kind: 'p',
        text: 'Not the rail. The receipt. Every serious thing shipped this year has converged on the same primitive and almost nobody is saying it out loud.',
      },
      {
        kind: 'list',
        items: [
          "Google's AP2 chains three signed mandates: intent, cart, payment.",
          'Mastercard sells Verifiable Intent.',
          "Ripple's agent wallets carry verified identity and spending limits.",
          'Singapore requires every agent to hold a verifiable identity plus an audit trail of who authorised what.',
          'Article 12 of the EU AI Act requires a queryable record of AI-driven decisions.',
        ],
      },
      {
        kind: 'p',
        text: 'Regulation and product arrived at the same answer independently: cryptographic proof of delegated authority. That is not a payments problem. It is an evidence problem.',
      },
      {
        kind: 'p',
        text: 'So that is what I built. Spending rules enforced inside the contract itself rather than in a prompt: a cap, a per-period limit, an allow-list, an expiry, a revocation. Every attempt sealed into a hash-chained receipt, including the ones the ledger refused. It placed third at CANTOR8’s Build on Canton hackathon, judged across technical, security, institutional and commercial criteria, and it is catalogued as a partner tool in the official Canton Developer Hub.',
      },

      { kind: 'h2', text: 'Back to Abuja' },
      {
        kind: 'p',
        text: 'Here is why the art festival and the agent protocol are the same project. An artist in Abuja cannot prove the painting is hers. A compliance officer in London cannot prove the agent was allowed to spend. Different continents, different decades, same hole: the thing happened and nobody can show it.',
      },
      {
        kind: 'p',
        text: 'I trained as an electrical and electronic engineer. My final year project was a changeover inverter, a system whose entire job is to switch safely and fail safely. You do not ask a control system to be clever. You ask it to be provable.',
      },
      {
        kind: 'p',
        text: 'That is why my first question has never been how do we let the agent act. It has always been how do we prove what it was refused.',
      },
      {
        kind: 'quote',
        text: 'A count is not an economy.',
      },
      {
        kind: 'p',
        text: 'I had 106 perfect records and felt good about the 106. The industry has twelve million transactions and a 93 per cent collapse in value, and feels good about the twelve million. I did it first, at my own small scale, and I am telling you about it before anybody asked.',
      },
      {
        kind: 'p',
        text: 'Go and look at the number you are proudest of this week. Then ask what it would look like if it were completely fake. If you cannot tell the difference from the outside, you are not holding a metric. You are holding a feeling with a decimal point on it.',
      },
      {
        kind: 'p',
        text: 'Your system logs what it did. Ask it what it was stopped from doing, and whether it can prove it. If it cannot, you do not have governance. You have a log file and an opinion.',
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const sortedPosts = () =>
  [...posts].sort((a, b) => b.published.localeCompare(a.published));
