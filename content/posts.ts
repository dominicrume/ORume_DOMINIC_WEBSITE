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
    "slug": "a-measuring-instrument-for-ai",
    "title": "A measuring instrument for AI",
    "description": "People, companies and governments are all circling the same fear: that AI cannot be trusted. So we built a way to hold it accountable. Think of it as a measuring instrument for AI agents.",
    "published": "2026-10-23",
    "readingMinutes": 4,
    "tags": [
      "agentic AI",
      "code generation",
      "large language models",
      "software quality metrics",
      "specification fidelity",
      "AI governance",
      "empirical software engineering"
    ],
    "image": "/media/ai-measuring-instrument.png",
    "body": [
      {
        "kind": "lead",
        "text": "People, companies and governments are all circling the same fear: that AI cannot be trusted. So we built a way to hold it accountable."
      },
      {
        "kind": "p",
        "text": "Here is the problem, plainly. You cannot trust what you cannot measure. Right now most AI is judged on a good demo and a confident promise. That is a feeling, not a fact, and a feeling is not enough when real decisions are on the line."
      },
      {
        "kind": "h2",
        "text": "Think of a measuring instrument"
      },
      {
        "kind": "p",
        "text": "A thermometer does not argue with you. It gives you a number you can check. A set of scales does not take your word for your weight, it shows you. That is what has been missing for AI: a plain instrument that measures how it actually performs, so trust rests on a reading anyone can see, not on who is doing the talking."
      },
      {
        "kind": "p",
        "text": "So that is what we built. An instrument that measures where AI gets it right and where it falls short: where its work is weak, where it cuts corners, and where it drifts from what it was actually asked to do. It gives you a number, taken the same way every time, that you or anyone else can check."
      },
      {
        "kind": "quote",
        "text": "You cannot trust what you cannot measure."
      },
      {
        "kind": "h2",
        "text": "Why this matters now"
      },
      {
        "kind": "p",
        "text": "AI is starting to make choices with real consequences. Money moves. Documents get signed. People are affected. When one of them gets it wrong, trust us is not an answer a regulator, a board or a customer will accept. They will want a measurement they can check, taken the same way for everyone."
      },
      {
        "kind": "p",
        "text": "And most AI today is graded by the people selling it. A measuring instrument does not care who built the thing it is pointed at. It takes the same reading every time. That is the whole point: the number does not bend to suit the person holding it."
      },
      {
        "kind": "h2",
        "text": "Trust is something you measure"
      },
      {
        "kind": "p",
        "text": "Trust is not a feeling you ask people for. It is something you can measure and show. We are not promising that AI will always behave. We built the instrument that measures whether it does, in a form anyone can check, so the answer never comes down to taking someone's word for it."
      },
      {
        "kind": "p",
        "text": "If your organisation is putting AI anywhere near real decisions, and you need to measure what it is actually doing rather than hope, that is the problem we work on. I would like to hear how it shows up for you."
      }
    ]
  },
  {
    "slug": "can-an-agent-prove-it-was-told-no",
    "title": "The question in the room: can an AI agent prove it was told no?",
    "description": "In a London hackathon judged by a panel that included the Canton Foundation's founding chairman, the real contest was not about features. It was about accountability. As institutions move real money onto these rails, that question is about to matter to everyone.",
    "published": "2026-10-22",
    "readingMinutes": 5,
    "tags": [
      "Canton",
      "AI agents",
      "auditability",
      "institutional finance",
      "agentic AI"
    ],
    "image": "/media/cantor8-winners-group.jpg",
    "body": [
      {
        "kind": "lead",
        "text": "This is a room of people who, a few hours before the photo, were strangers and competitors. By the time it was taken we were holding cheques and arguing happily about how money should move. I am the one in the Cantor8 shirt holding the one that says Vorem. It says third place. I want to tell you why the third place is the least interesting thing in the picture."
      },
      {
        "kind": "p",
        "text": "On 29 August, Cantor8 ran the largest in-person Canton Network hackathon of the year in London. Nearly a hundred builders, more than twenty teams, people flown in from Oxford, Cambridge, Imperial and a lot further. Three tracks. We took the hardest one: a wallet for AI agents, with real limits on what they are allowed to spend."
      },
      {
        "kind": "p",
        "text": "I will be honest in the way the good journalists are honest, which is to tell you the part that is not flattering first. I arrived late. We were a small team. We came third, not first. First went to a team called Mandate, second to Lattice Scan. I did not win the room."
      },
      {
        "kind": "h2",
        "text": "What the room was actually arguing about"
      },
      {
        "kind": "p",
        "text": "Strip away the tracks and the scoreboard and every serious team was circling the same question. When you hand an AI agent a wallet, and it decides not to spend, where does that decision go? Most systems can tell you what an agent did. Almost none can prove what it was stopped from doing."
      },
      {
        "kind": "p",
        "text": "That gap sounds academic until you put real money behind it. An agent that is blocked by a spending cap, a counterparty rule, a compliance check, leaves behind a silence. And you cannot audit a silence. You cannot hand a regulator the absence of a transaction and call it governance."
      },
      {
        "kind": "quote",
        "text": "You cannot audit a silence."
      },
      {
        "kind": "p",
        "text": "The thing we built turns that silence into a fact. The spending limits sit inside the part that actually moves the money, not in the app on top, so nobody can quietly switch them off. And every time the agent tries to spend, including every time it is stopped, it leaves a signed record anyone can check in a browser. The judges' note on our entry was that it earned its place for its emphasis on security and the smart application of restrictions and checks. That sentence is the whole point of the work."
      },
      {
        "kind": "h2",
        "text": "Why this is news and not just my weekend"
      },
      {
        "kind": "p",
        "text": "Here is the part that should interest you even if you have never heard of Canton. The people judging that room were not students. The panel included the founding chairman of the Canton Foundation, alongside engineering and security leads from firms building the institutional internet of finance. These are the people laying the rails."
      },
      {
        "kind": "p",
        "text": "And the money is already moving onto those rails. This month the DTCC, the plumbing behind most of the world's share trading, is launching a service that moves real financial assets onto Canton. The London Stock Exchange Group joined in September to help run the network. This is not a future conference slide. It is happening now, with institutions whose names you know."
      },
      {
        "kind": "p",
        "text": "So put the two things together. Real money, run increasingly by agents, is landing on a network built for institutions. And a room of the people building it spent a day deciding whose work best answered one question: when the agent is told no, can you prove it. That is the story. The podium is just where I happened to be standing when it became obvious."
      },
      {
        "kind": "h2",
        "text": "What I am doing about it"
      },
      {
        "kind": "p",
        "text": "A weekend result is a weekend. What you do after is the only part worth trusting. In the weeks since, three of my pull requests have been merged into the official Canton Developer Hub, the tool is listed there as a partner tool, and the refusal-record format has hardened into a written spec with independent implementations that agree with each other. All of it is public, and all of it is meant to be checked rather than believed."
      },
      {
        "kind": "p",
        "text": "I build the controls that decide whether value is allowed to move, and the record that proves what was refused. If you are putting agents anywhere near real money, you are going to need both, and you are going to need to prove the second one to someone who was not in the room. That is the work. If it is your problem too, I would like to hear how it shows up for you."
      }
    ]
  },
  {
    "slug": "third-at-the-canton-hackathon",
    "title": "We came third at the biggest Canton hackathon. The judges are why it matters.",
    "description": "Vorem placed third at Cantor8's Build on Canton hackathon in London, judged by a panel that included the Canton Foundation's founding chairman. The ranking is the least interesting part. This is the idea that placed, and what happened in the six weeks after.",
    "published": "2026-10-22",
    "readingMinutes": 6,
    "tags": [
      "Canton",
      "Daml",
      "hackathon",
      "AI agents",
      "auditability",
      "blockchain"
    ],
    "image": "/media/cantor8-3rd-place.jpg",
    "body": [
      {
        "kind": "lead",
        "text": "On Saturday 29 August I arrived late to a hackathon in Shoreditch and left with a third-place cheque made out to Vorem. The placing is not why I am writing this. The panel that awarded it is."
      },
      {
        "kind": "p",
        "text": "Cantor8's Build on Canton was the largest in-person Canton Network hackathon of the year: nearly a hundred builders at 83 Rivington Street, more than twenty teams, with people flown in from Oxford, Cambridge, Imperial and well beyond the UK. Three tracks. We took the hardest one, the Daml track: a wallet built for AI agents, with real limits on what they are allowed to spend."
      },
      {
        "kind": "h2",
        "text": "What we built"
      },
      {
        "kind": "p",
        "text": "The idea was simple to say and awkward to do properly. A spending mandate should be enforced on the ledger itself, inside the Daml choice body, so the control cannot be bypassed by whatever service is calling it. Cap, per-period limit, allow-list, expiry, revocation, all living where the money moves rather than in the application that asks."
      },
      {
        "kind": "p",
        "text": "The part I cared about most was the refusal. When the agent is told no, that no becomes a fact on the ledger: a receipt you can hand an auditor, not a line in a log file you have to take on trust. Most systems can tell you what they did. Almost none can prove what they were stopped from doing."
      },
      {
        "kind": "quote",
        "text": "A refused action should be evidence, not an absence."
      },
      {
        "kind": "p",
        "text": "The judges' note on our entry was that it was awarded a podium position for its emphasis on security and the smart application of restrictions and checks. That sentence is the whole thesis, and it is the reason the placing is worth writing about at all."
      },
      {
        "kind": "h2",
        "text": "Who judged it"
      },
      {
        "kind": "p",
        "text": "A hackathon ranking means whatever the room means. This room meant something, because of who was in it. The panel included Dr Jorgen Ouaknine, the Canton Foundation's founding chairman, alongside a managing director from 7RIDGE, an engineering lead from Alchemy, a technology lead from C7, a security lead from Dedge Security, and Cantor8's own founder and senior engineers. These are the people building the institutional rails Canton exists to carry."
      },
      {
        "kind": "p",
        "text": "I will be honest about the result, because the whole point of what I build is that claims should survive a check. We came third, of more than twenty teams. First place went to a different team, Team Mandate; second went to Lattice Scan. I did not win. I placed, on the hardest track, in front of a panel that knows exactly what it is looking at."
      },
      {
        "kind": "figures",
        "caption": "The podium, Build on Canton, London, 29 August 2026",
        "rows": [
          {
            "label": "First place, Team Mandate",
            "value": "not us",
            "tone": "bad"
          },
          {
            "label": "Second place, Lattice Scan",
            "value": "not us",
            "tone": "bad"
          },
          {
            "label": "Third place, Vorem",
            "value": "us",
            "tone": "good"
          }
        ]
      },
      {
        "kind": "h2",
        "text": "The six weeks after, which is the real signal"
      },
      {
        "kind": "p",
        "text": "A weekend result is a weekend. What you do with it afterwards is the thing worth trusting. So here is what happened between that Saturday and now, all of it public and checkable."
      },
      {
        "kind": "figures",
        "caption": "After the cheque",
        "rows": [
          {
            "label": "Pull requests merged into the official Canton Developer Hub",
            "value": "three",
            "tone": "good"
          },
          {
            "label": "Status of the tool in that catalogue",
            "value": "listed partner tool, AI Tools",
            "tone": "good"
          },
          {
            "label": "The refusal format, with conformance vectors",
            "value": "spec plus three agreeing implementations",
            "tone": "good"
          },
          {
            "label": "Developer Fund proposal on refused-action records",
            "value": "open",
            "tone": "good"
          }
        ]
      },
      {
        "kind": "p",
        "text": "The hackathon did not make the work real. It pointed at a direction, in front of people whose opinion of that direction is worth having, and then I kept walking in it. The merges and the listing are the part that matters, because anyone can clone the repository and watch the tests refuse to pass when a control is quietly removed."
      },
      {
        "kind": "h2",
        "text": "Why refusals, still"
      },
      {
        "kind": "p",
        "text": "Agents are about to move real value on networks built for institutions. When one of them is stopped, by a spending cap, a counterparty rule, a compliance check, the stopping has to be provable to someone who was not in the room. If the only record of a refusal is the silence where an action did not happen, you do not have governance. You have a log file and an opinion."
      },
      {
        "kind": "p",
        "text": "That is the work. Building the controls that decide whether value is allowed to move, and the record that proves what was refused. A panel of people building the institutional internet of finance looked at that idea and put it on the podium. I intend to make them right."
      },
      {
        "kind": "p",
        "text": "If you are building agents that move value and you need to prove what they were stopped from doing, that is exactly what I do. The instrument is open and the proof is public; the signed and dated version is the work you can hire."
      }
    ]
  },
  {
    slug: 'a-funnel-with-no-exit',
    title: 'I had 4,500 installs and no way for anyone to pay me',
    description:
      'A catalogued listing in an institutional directory, two published packages, a priced offer written months ago, and the page carrying that offer had never been on the website. The audit of my own distribution, with the numbers.',
    published: '2026-10-10',
    readingMinutes: 7,
    tags: ['distribution', 'pricing', 'open source', 'AI governance', 'go to market'],
    image: '/media/04-worked-perfectly.png',
    body: [
      {
        kind: 'lead',
        text: 'Last week I wrote that I sealed 106 artworks in Abuja and sold nothing. A reader asked a fair question: fine, but what are you selling, and where. I went to look. The answer was worse than the Abuja one.',
      },
      {
        kind: 'p',
        text: 'I have a productised offer. Three tiers, written months ago, priced, with a guarantee attached. The component that renders it on the website is called Offer.tsx. It is finished. It was imported by nothing.',
      },
      {
        kind: 'p',
        text: 'Not a broken link. Not a bad call to action. The page a buyer would land on had never existed. I had been publishing, speaking and shipping for months into a website with no door.',
      },

      { kind: 'h2', text: 'What the audit found' },
      {
        kind: 'p',
        text: 'I traced every asset I own and asked one question of each: if somebody is convinced by this, what do they do next?',
      },
      {
        kind: 'figures',
        caption: 'Where each asset sent a convinced reader, before this week',
        rows: [
          { label: 'Catalogue listing in an institutional developer hub', value: 'a code repository', tone: 'bad' },
          { label: 'Package installs across two published libraries', value: 'a command line', tone: 'bad' },
          { label: 'Project README, after the case study', value: 'nowhere', tone: 'bad' },
          { label: 'Last week\u2019s essay, 2,000 words', value: 'another page of claims', tone: 'bad' },
          { label: 'Pages where the offer appeared', value: '0', tone: 'bad' },
        ],
      },
      {
        kind: 'p',
        text: 'Five surfaces. Five dead ends. The catalogue entry offered five links and every one of them pointed at source code, because the only thing I had ever thought to publish was the work.',
      },

      { kind: 'h2', text: 'The mistake is the same one' },
      {
        kind: 'p',
        text: 'In Abuja I built a tamper-evident record for an artwork and nobody bought anything, because an artist does not want a seal. They want to sell a painting.',
      },
      {
        kind: 'p',
        text: 'Here I built a measurement instrument, gave it away, and watched the installs climb. An engineer does not want a measurement either. They want to stop being the reason the release is late.',
      },
      {
        kind: 'quote',
        text: 'Nobody buys proof. They buy what proof makes possible.',
      },
      {
        kind: 'p',
        text: 'My own offer had the disease in its copy. The tiers were called Audit, Retainer and Licensing. The summaries promised an assessment, a report, an auditability score, a dashboard. Every one of those words describes proof. Not one of them describes a thing a buyer wanted to be able to do on Monday.',
      },

      { kind: 'h2', text: 'What changed' },
      {
        kind: 'p',
        text: 'The tiers are now named after the outcome rather than the artefact.',
      },
      {
        kind: 'list',
        items: [
          'Ship the agent. The agent is built, risk will not sign it off, and nobody can say precisely what would change their mind. Three weeks later you have the verdict, the gaps and the owner of each one.',
          'Keep shipping. For teams releasing continuously, so sign-off stops being the thing that holds a release.',
          'Sell it as your own. For consultancies that want their own name on the verdict.',
        ],
      },
      {
        kind: 'p',
        text: 'The deliverables did not disappear. They moved down into the detail, where they belong, as evidence the outcome will actually arrive rather than as the thing being bought.',
      },
      {
        kind: 'p',
        text: 'Then every dead end got an exit, and each one sits in the same place: immediately after the thing admits its own limit. The browser verifier already said that a chain which verifies proves nothing was edited, and that a wholly forged chain verifies just as green. That is the honest moment to say the rest, which is that a chain cannot tell a risk function whether this agent should hold a wallet, or who answers when it spends wrongly.',
      },
      {
        kind: 'p',
        text: 'The command line now prints one line after a scan, and only when the scan found something. A clean result says nothing, because a team with nothing to fix is not a buyer and interrupting them is noise.',
      },

      { kind: 'h2', text: 'What it stays free' },
      {
        kind: 'p',
        text: 'The instrument, the format, the verifier and the library are open source and stay that way. That is not generosity. A measurement you have to pay for is a measurement you cannot check, and the entire argument of this work is that a claim nobody can verify is worth nothing.',
      },
      {
        kind: 'p',
        text: 'So the commercial line has to sit underneath that sentence rather than on top of it. Run the thing on your own code first. If it tells you nothing you did not already know, you do not need me.',
      },

      { kind: 'h2', text: 'The part worth stealing' },
      {
        kind: 'p',
        text: 'Open every asset you own. The repository, the package page, the directory listing, the last thing you published. Ask one question of each: if a reader is convinced right here, what do they do next?',
      },
      {
        kind: 'p',
        text: 'Count the ones where the honest answer is nothing. I had five. Five surfaces built over months, each one working exactly as designed, and collectively a funnel with no exit.',
      },
      {
        kind: 'quote',
        text: 'A reader you convinced and then abandoned is more expensive than one you never reached.',
      },
      {
        kind: 'p',
        text: 'Last week I said a count is not an economy. This week the same thing in a different register: distribution is not demand, and installing something is not buying it. I spent months confusing the two, and the only reason I know the exact number is that I went and counted.',
      },
    ],
  },
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
