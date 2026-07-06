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
    body: 'We map every dependency and study the architecture first. Missing context is the number one cause of bad software, so we kill it before writing a single line.',
  },
  {
    step: 2,
    title: 'Plan & Test',
    tagline: 'Test-driven intent',
    body: 'We propose the tests that define “done” before we build. Strict governance keeps scope honest. No feature hallucination. No throwaway demos.',
  },
  {
    step: 3,
    title: 'Stitch & Deploy',
    tagline: 'Cloud-ready, observable',
    body: 'Modular building blocks get stitched into a deployed system with CI/CD and observability, so it runs in production, not just on a laptop.',
  },
];
