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
  | { kind: 'cta'; href: string; label: string; note?: string }
  | { kind: 'image'; src: string; alt: string; caption?: string }
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
    "slug": "one-move-a-week",
    "title": "One move a week is a life a year",
    "description": "You are not short of advice. You are drowning in it. Here is a different idea: one move, once a week, from a real mentor, and the nerve to make it.",
    "published": "2026-11-10",
    "readingMinutes": 3,
    "tags": [
      "mentorship",
      "decisions",
      "focus",
      "AI",
      "VOREM"
    ],
    "image": "/media/more-ai-mentors.png",
    "body": [
      {
        "kind": "lead",
        "text": "You are one move away from the week you keep postponing. Not ten moves. One."
      },
      {
        "kind": "p",
        "text": "I want to tell you about something I am part of, because it answers a problem I see in almost everyone I mentor. The problem is not that you lack advice. You are drowning in it. Every time you open your phone it hands you ten more things you should be doing. So you freeze, and the week you meant to change slips past again."
      },
      {
        "kind": "h2",
        "text": "The fix is less, not more"
      },
      {
        "kind": "p",
        "text": "MORE AI does one thing. Each Sunday it sends you a single move. You pick a mentor, you write one line about what is stuck, and you get one clear thing to do that week, in that mentor's voice. Then you do it. No app, no login, no dashboard to keep up with. One email, one reply, one move."
      },
      {
        "kind": "p",
        "text": "I am one of the four mentors you can choose. I have built companies across continents, and my lane is the builder's questions: what to build, what to drop, what to ship this week. The other three cover money and career, network and opportunity, and the long game. Four real people, each in their own lane, and the move comes back in the voice of the one you picked."
      },
      {
        "kind": "h2",
        "text": "Why one move matters"
      },
      {
        "kind": "p",
        "text": "A week is small. A single move inside a week is smaller still. But the one move you make this week is the one that compounds. Do that fifty-two times and you look up a year later at a life you actually recognise. One move a week is a life a year. That is the whole idea, and it is why the service refuses to hand you a list."
      },
      {
        "kind": "quote",
        "text": "You do not need more advice. You need the next move, and the nerve to make it."
      },
      {
        "kind": "h2",
        "text": "How to start"
      },
      {
        "kind": "p",
        "text": "Your first move is free. After that it is less than a dollar a day, with no lock-in, and if a week does not move, that week is on us. You give an email or a WhatsApp number and nothing else. We never ask your name."
      },
      {
        "kind": "p",
        "text": "So here is the only question worth sitting with tonight. What is the one thing you keep postponing, and what will it cost you to still be postponing it next Sunday?"
      },
      {
        "kind": "cta",
        "href": "https://moreai.eaglesden.online/",
        "label": "Take my first move",
        "note": "First move free. No sign up. One email each Sunday, and you can leave any week."
      }
    ]
  },
  {
    "slug": "your-ai-agent-needs-a-constitution",
    "title": "Your AI agent needs a constitution, not just a test pass",
    "description": "The agent passed its tests. That tells you it worked once. It does not tell you what the agent is allowed to do when no one is watching. For that you need rules it cannot step outside.",
    "published": "2026-11-08",
    "readingMinutes": 5,
    "tags": [
      "agentic AI",
      "AI governance",
      "AI assurance",
      "KYA",
      "AI agents",
      "risk and compliance"
    ],
    "body": [
      {
        "kind": "lead",
        "text": "Your AI agent passed its tests. Good. That tells you it worked once, on the cases you thought of. It does not tell you what the agent is allowed to do on a quiet Tuesday when no one is watching. For that you do not need more tests. You need a constitution."
      },
      {
        "kind": "p",
        "text": "A country does not run on the fact that its leaders behaved well in one meeting. It runs on rules that say who may do what, what has to go to a vote, and what happens when someone breaks them. An agent that touches real money, real customers or real decisions needs the same thing. Not a longer test suite. A set of rules it cannot step outside."
      },
      {
        "kind": "h2",
        "text": "A test is a moment. A rule holds all the time."
      },
      {
        "kind": "p",
        "text": "A test checks one path at one time. The agent runs, you look at the answer, you move on. A rule holds on every path, including the ones you never imagined. That is the difference between an agent that is safe to leave running and one that is only safe to demo."
      },
      {
        "kind": "h2",
        "text": "What a constitution for an agent actually contains"
      },
      {
        "kind": "p",
        "text": "Every agent I have watched stall in review was missing the same handful of rules. Not features. Rules:"
      },
      {
        "kind": "list",
        "items": [
          "Powers. A plain list of what the agent may decide on its own, with a ceiling on each one, a spend cap, a rate, a scope.",
          "Separation. What the agent must hand to a human before it acts, and who that human is.",
          "A record. A log of what it did, and just as important, what it was refused, that someone can read six months later.",
          "Amendment. A safe way to change the rules, so a limit is never quietly loosened by one person in a hurry.",
          "Accountability. A named owner for each rule, so when something goes wrong there is a person, not a shrug."
        ]
      },
      {
        "kind": "p",
        "text": "None of these make the agent smarter. They make it answerable. That is what the people signing it off are really asking for."
      },
      {
        "kind": "h2",
        "text": "Where a limit belongs"
      },
      {
        "kind": "p",
        "text": "Here is the mistake I see most. The limit lives in the prompt. Do not spend more than this. Always ask before sending. A limit in a prompt is a suggestion the agent can talk itself out of. A limit in the system is a wall it cannot walk through. If a rule matters, it does not belong in the words you give the agent. It belongs in the code around it."
      },
      {
        "kind": "h2",
        "text": "Why this is the thing that gets you to yes"
      },
      {
        "kind": "p",
        "text": "When an agent has a constitution, the hard meeting changes. Instead of a vague fear nobody can name, there is a clear picture. Here is what it may do. Here is what it may not. Here is the record. Here is who owns each gap. That is something a risk team, a board or a regulator can actually say yes to. A pile of green tests is not."
      },
      {
        "kind": "h2",
        "text": "How I help"
      },
      {
        "kind": "p",
        "text": "I check your agent against a standard I call Know Your AgenticAi, or KYA. You get a verdict on whether it is ready, every gap written in plain words, and a named owner for each one, the thing you can carry into the room and get cleared. It is a patent-pending framework, and the measuring tool underneath it is free and open source, so you can start proving your own agent today."
      },
      {
        "kind": "p",
        "text": "If you have built an agent and it is stuck in review, that is the exact problem I solve. Come and see the engagement, or look at the evidence behind every claim first. Either way the goal is the same: your agent, cleared to run, with rules you can defend."
      }
    ]
  },
  {
    "slug": "say-it-simply",
    "title": "If you cannot say it simply, you do not understand it yet",
    "description": "The hardest part of my work is not the model or the contract. It is saying, in plain words, what the thing actually does. Plain language is not dumbing down. It is finished thinking made visible.",
    "published": "2026-11-08",
    "readingMinutes": 4,
    "tags": [
      "plain language",
      "communication",
      "engineering",
      "AI literacy",
      "craft",
      "leadership"
    ],
    "body": [
      {
        "kind": "lead",
        "text": "The hardest part of my work is not training the model or writing the contract. It is saying, in plain words, what the thing actually does. I have come to believe that if I cannot say it simply, I do not yet understand it. And neither do you."
      },
      {
        "kind": "p",
        "text": "There is an old idea that you only truly know something when you can explain it to a child. I would put it harder. If the only way you can describe your work is in the private words of your field, you are not explaining it. You are hiding inside it."
      },
      {
        "kind": "h2",
        "text": "Jargon is where understanding goes to hide"
      },
      {
        "kind": "p",
        "text": "Big words feel safe. They sound expert. They also let you skip the part where you work out what you really mean. Every time I reach for a technical word, I stop and ask whether I am using it because it is the most exact word, or because it saves me the harder job of being clear. Usually it is the second one."
      },
      {
        "kind": "h2",
        "text": "The test I use"
      },
      {
        "kind": "p",
        "text": "Before anything I write goes out, a page, a proposal, a line on a product, I run it through four simple checks:"
      },
      {
        "kind": "list",
        "items": [
          "Can a tired person read it once, at the end of a long day, and know what to do next.",
          "Have I said it without the words only my field would know.",
          "Does each sentence carry one idea, not three.",
          "Would I actually say it out loud to a friend, or only type it to impress a stranger."
        ]
      },
      {
        "kind": "p",
        "text": "If a sentence fails, the problem is almost never the sentence. It is that I had not finished thinking. Clear writing is just finished thinking made visible."
      },
      {
        "kind": "h2",
        "text": "This is not dumbing down"
      },
      {
        "kind": "p",
        "text": "Simple is not the easy version. Simple is the last draft, not the first. It takes longer, because you have to understand the thing well enough to throw away everything that does not matter. Anyone can make a thing sound complicated. Making it plain is the expensive part, and it is the part worth paying for."
      },
      {
        "kind": "h2",
        "text": "Why this matters more with AI"
      },
      {
        "kind": "p",
        "text": "If you cannot explain in plain words what your AI system does, you cannot govern it, you cannot get it signed off, and you cannot sell it. The teams that win with AI are not the ones with the most impressive words. They are the ones who can say, simply, what their system does, what it will not do, and why you can trust it."
      },
      {
        "kind": "p",
        "text": "So that is the standard I hold my own work to, and the one I would offer you. Say it simply. If you cannot yet, that is not a writing problem. It is a sign there is one more thing to understand. Go and understand it. The plain words will follow."
      }
    ]
  },
  {
    "slug": "why-your-ai-agent-wont-pass-sign-off",
    "title": "Why your AI agent will not pass sign-off",
    "description": "The agent works in the demo. Then risk, legal or the board asks one question and it stops dead. Here is the question, why your tests do not answer it, and how to get the agent cleared to go live.",
    "published": "2026-11-03",
    "readingMinutes": 5,
    "tags": [
      "agentic AI",
      "AI governance",
      "AI assurance",
      "KYA",
      "risk and compliance",
      "AI agents"
    ],
    "body": [
      {
        "kind": "lead",
        "text": "Your AI agent works in the demo. Everyone nods. Then it goes to risk, legal or the board, someone asks one question, and the whole thing stops dead for months. I see it again and again, so let me tell you what the question is and how to get past it."
      },
      {
        "kind": "p",
        "text": "The question is simple: can you prove what the agent did, and what it was stopped from doing? Most teams cannot answer it. Not because the agent is bad, but because nobody built the part that proves it."
      },
      {
        "kind": "h2",
        "text": "Your tests answer the wrong question"
      },
      {
        "kind": "p",
        "text": "Tests tell you the agent ran and gave an answer. They do not tell you it did only what you asked and nothing you did not. They do not give you a record you can show a regulator six months later. So the agent passes every test and still fails the one meeting that matters, because the people signing it off are not asking does it work. They are asking can we defend this if it goes wrong."
      },
      {
        "kind": "h2",
        "text": "What sign-off actually needs"
      },
      {
        "kind": "p",
        "text": "Every stalled agent I have seen is missing the same four things. Not more features. These:"
      },
      {
        "kind": "list",
        "items": [
          "A clear map of what the agent can decide on its own, and what has to go to a human.",
          "A record of every action it took, including the ones it was refused, that an auditor can read later.",
          "A verdict on whether it is ready, in language your risk, legal and the regulators will accept.",
          "A named person who owns each gap, so there is accountability, not a shrug."
        ]
      },
      {
        "kind": "p",
        "text": "Get those four right and the sign-off meeting changes. Instead of a vague worry nobody can name, there is a verdict, a list of gaps, and an owner for each one. That is a decision people can actually make."
      },
      {
        "kind": "h2",
        "text": "The small things are usually the whole problem"
      },
      {
        "kind": "p",
        "text": "It is rarely one big flaw. It is small, boring things. The agent can quietly spend without a cap. There is no log of what it refused to do. No one wrote down who approves what. A limit lives in a prompt instead of inside the system, where it can be bypassed. None of these are hard to fix. They are just invisible until someone asks, and by then the release is already stuck."
      },
      {
        "kind": "h2",
        "text": "How I help"
      },
      {
        "kind": "p",
        "text": "I check your agent against a clear standard I call Know Your AgenticAi. In a few weeks you get the verdict, every gap, and a plain plan to close each one, the thing you can take into the room and get a yes. It is a patent-pending framework, and the measurement tool underneath it is free and open source, so you can start proving your own work today."
      },
      {
        "kind": "p",
        "text": "If you have an agent built and it is stuck getting signed off, that is exactly the problem I solve. Come and see the engagement, or check the evidence behind every claim first. Either way, the goal is the same: your agent, cleared to go live, with a verdict you can defend."
      }
    ]
  },
  {
    "slug": "the-engineer-and-the-storyteller",
    "title": "The engineer and the storyteller",
    "description": "Two people from two different worlds in front of one backdrop in London. I build AI. Victor Okafor builds storytellers. We think those two worlds need each other, and this is why.",
    "published": "2026-10-25",
    "readingMinutes": 4,
    "tags": [
      "agentic AI",
      "creator economy",
      "storytelling",
      "AI literacy",
      "collaboration",
      "community"
    ],
    "image": "/media/rume-victor.jpg",
    "body": [
      {
        "kind": "lead",
        "text": "Two people from two different worlds, standing in front of one backdrop in London. I build AI. Victor Okafor builds storytellers. We stood there together because we think those two worlds need each other more than either side admits."
      },
      {
        "kind": "p",
        "text": "Here is the fear I hear from creators, writers and founders almost every week: that AI is going to flatten everything. That it will drown out their voice, make everyone sound the same, and quietly replace the human in the work. It is a real fear, and brushing it off does nobody any good."
      },
      {
        "kind": "h2",
        "text": "AI should carry your voice, not replace it"
      },
      {
        "kind": "p",
        "text": "But that is not the only way this goes. Used well, AI does not take your voice away, it carries it further. It takes the heavy, repetitive parts off your plate, the editing, the formatting, the first rough pass, so you have more time and energy for the one thing only you can do: the idea, the taste, the story that is actually yours."
      },
      {
        "kind": "p",
        "text": "That is the whole difference, and it is the reason Victor and I ended up in the same room. He spends his days helping creators and founders tell stories that land. I spend mine building AI and teaching people how to use it without being used by it. Put those together and you get the useful version: creators who keep their voice and get their time back."
      },
      {
        "kind": "quote",
        "text": "AI used well does not replace your voice. It gives you back the time to use it."
      },
      {
        "kind": "image",
        "src": "/media/rume-speaking.jpg",
        "alt": "Rume Dominic speaking on stage",
        "caption": "Teaching is half the work. A tool nobody understands helps nobody."
      },
      {
        "kind": "h2",
        "text": "Why bother teaching it"
      },
      {
        "kind": "p",
        "text": "Because the gap is real. When a powerful tool arrives and only a few people understand it, those few pull ahead and everyone else is left guessing. For creators, that gap could mean a generation of genuine voices getting buried under cheaper, faster, emptier noise. I do not want that, and neither does Victor."
      },
      {
        "kind": "p",
        "text": "So the work is simple to say and slow to do: sit with people, in plain language, and show them how to make the tool serve their craft instead of swallowing it. No hype, no fear, just the honest middle, which is where almost all of the real value lives."
      },
      {
        "kind": "h2",
        "text": "The point"
      },
      {
        "kind": "p",
        "text": "This is not about a product. It is about making sure the people who tell the stories, who build the things, who carry the culture, are not left behind by the very tools that are supposed to help them. That is service, and it is worth driving forward."
      },
      {
        "kind": "p",
        "text": "If you create, and you are quietly worried that AI is going to outrun you, that is exactly the conversation we are trying to have. You do not have to choose between your voice and the tools. The whole point is to keep both."
      }
    ]
  },  {
    "slug": "a-room-in-birmingham-and-agentic-ai",
    "title": "A room in Birmingham, and why I teach agentic AI",
    "description": "On a Saturday in June, a room of people in Birmingham gave up their weekend to learn how AI agents really work. I led the session. This is why I keep doing it, and why the teaching matters as much as the building.",
    "published": "2026-10-24",
    "readingMinutes": 4,
    "tags": [
      "agentic AI",
      "AI literacy",
      "AI education",
      "Birmingham",
      "AI governance",
      "community"
    ],
    "image": "/media/agentic-ai-birmingham.png",
    "body": [
      {
        "kind": "lead",
        "text": "On a Saturday in June, a room of people in Birmingham gave up their weekend to learn how AI agents really work. I led the session. This is why I keep doing it."
      },
      {
        "kind": "p",
        "text": "The people in that photo did not all come from tech. Students, builders, business owners, a few who had never written a line of code. What they had in common was a feeling I hear everywhere now: that AI is moving fast, everyone keeps shouting about it, and almost nobody will sit down and show you, in plain words, what it actually does and where it still falls short."
      },
      {
        "kind": "h2",
        "text": "The hype is loud. The teaching is quiet."
      },
      {
        "kind": "p",
        "text": "That gap is the problem. When a powerful tool arrives and only a small group understands it, that group pulls ahead and everyone else is left guessing. I did not want that for the people around me, so I ran a masterclass: agentic AI explained without the jargon, hands on, honest about the limits as well as the magic."
      },
      {
        "kind": "p",
        "text": "We kept it simple. What an AI agent is. What it can be trusted to do on its own, and what it cannot. How to give it a job and check its work. The whole day came back to one idea: you should never hand a tool real responsibility until you understand what it does when nobody is watching."
      },
      {
        "kind": "quote",
        "text": "When only a few people understand a powerful tool, the few pull ahead and the rest are left guessing."
      },
      {
        "kind": "h2",
        "text": "Why the teaching matters as much as the building"
      },
      {
        "kind": "p",
        "text": "My day job is building the parts that hold AI to account: tools that measure how it performs and prove what it was allowed to do. But building the safeguards is only half the work. If people cannot understand the technology, they cannot ask it the right questions, and they cannot tell when it has let them down."
      },
      {
        "kind": "p",
        "text": "So I treat the teaching as the same job as the building. One makes AI trustworthy. The other makes sure people can actually use that trust. Both are about the same thing: making a powerful technology serve people instead of leaving them behind."
      },
      {
        "kind": "h2",
        "text": "A small room, a bigger reason"
      },
      {
        "kind": "p",
        "text": "The session was held in Birmingham with MCKI Solutions, and it was a small room by any measure. But driving humanity forward does not always start big. It starts with one person who understands something today that they did not understand yesterday, and who walks out able to use it."
      },
      {
        "kind": "p",
        "text": "That is the whole reason. Not a product, not a pitch. Service. If you want to learn this, or you want a session like it for your community or your team, reach out. I would rather teach ten people to use AI well than let a hundred be left behind by it."
      }
    ]
  },    {
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
        "text": "A weekend result is a weekend. What you do after is the only part worth trusting. In the weeks since, three of my pull requests have been merged into the community Canton Developer Hub, the canton-network-devs catalogue, where the tool is listed under AI Tools, and the refusal-record format has hardened into a written spec with independent implementations that agree with each other. All of it is public, and all of it is meant to be checked rather than believed."
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
            "label": "Pull requests merged into the community Canton Developer Hub",
            "value": "three",
            "tone": "good"
          },
          {
            "label": "Status of the tool in that catalogue",
            "value": "a listing under AI Tools",
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
        text: 'So that is what I built. Spending rules enforced inside the contract itself rather than in a prompt: a cap, a per-period limit, an allow-list, an expiry, a revocation. Every attempt sealed into a hash-chained receipt, including the ones the ledger refused. It placed third at CANTOR8’s Build on Canton hackathon, judged across technical, security, institutional and commercial criteria, and it is catalogued in the community Canton Developer Hub, the canton-network-devs catalogue.',
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
