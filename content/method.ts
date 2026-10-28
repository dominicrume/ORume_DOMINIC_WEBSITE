/** "The Rume Method" - mirrors the spec-first execution workflow. */

export type MethodStep = {
  step: number;
  title: string;
  tagline: string;
  body: string;
};

export const method: MethodStep[] = [
  {
    step: 1,
    title: 'Visualise',
    tagline: 'Spec before code',
    body: 'We map how everything connects and study the design first. Most bad software comes from missing context, so we deal with that before writing a single line.',
  },
  {
    step: 2,
    title: 'Plan & Test',
    tagline: 'Test-driven intent',
    body: 'We agree the tests that define “done” before we build anything. That keeps the scope honest. No made-up features. No throwaway demos.',
  },
  {
    step: 3,
    title: 'Stitch & Deploy',
    tagline: 'Cloud-ready, observable',
    body: 'We join the pieces into a real, deployed system you can watch and update, so it runs in production, not just on a laptop.',
  },
];
