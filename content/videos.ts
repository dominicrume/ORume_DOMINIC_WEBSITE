/**
 * Media & Press — TV appearances and features. Rendered as click-to-play
 * facades (thumbnail first, player loads only on click) to keep the page fast.
 */

export type Video = {
  id: string;
  title: string;
  source: string;
};

export const videos: Video[] = [
  { id: 'NyBVmswf3vM', title: 'Navigating the Crypto Market After the Bitcoin Halving', source: 'Channels Television' },
  { id: 'Yf3SmR4J37M', title: 'The Future of Crypto Transactions in Nigeria', source: 'Channels Television' },
  { id: 'UAM2iuBQp5Q', title: 'Crypto Industry: VC Funding Hits $2.4bn in Q1 2024', source: 'Channels Television' },
  { id: 'pWNUtDlT9rM', title: 'Ethereum Shines as US SEC Halts Investigations', source: 'Channels Television' },
  { id: 'frzSlvd2qJw', title: 'Bitcoin Not Impacted by Fed Rate Cut Projections', source: 'Channels Television' },
  { id: 'BvLY39mq2Bo', title: 'Meme Mania Returns to US Markets', source: 'Channels Television' },
  { id: 'AKKcsac8DyE', title: 'Shiba Overtakes Cardano; FTX Exec Gets Seven Years', source: 'Channels Television' },
  { id: '2uFi1CcZxlQ', title: 'German Government Offloads 900 Bitcoins', source: 'Channels Television' },
  { id: '-UpGUzM70fA', title: 'KuCoin Set to Charge Nigerian Users VAT', source: 'Channels Television' },
  { id: 'OtbbR0Wb9vo', title: 'The Breakfast: Naira in the Parallel Market', source: 'Plus TV Africa' },
  { id: 'VyU97YPOrzI', title: 'Forex Scarcity and the Exchange Rate', source: 'Plus TV Africa' },
  { id: 'llhauM4iZ18', title: 'Nigeria on the African ICT Development Index', source: 'Plus TV Africa' },
];
