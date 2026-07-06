/** Credibility bar - affiliations & recognition. */

export type Credential = {
  name: string;
  detail: string;
  href?: string;
};

export const credentials: Credential[] = [
  { name: 'VOREM', detail: 'Chairman & Founder', href: 'https://ng.linkedin.com/company/vorem-co' },
  { name: 'Aston University', detail: 'MSc AI (UK)', href: 'https://www.aston.ac.uk' },
  { name: 'SIBAN', detail: 'Executive Member' },
  { name: 'Covenant University', detail: 'BEng, Electrical Eng.' },
  { name: 'ForbesBLK', detail: 'Community Member' },
  { name: 'Rotary International', detail: 'Member' },
];
