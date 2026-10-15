/**
 * SINGLE SOURCE OF TRUTH for all site content and real-world details.
 *
 * No placeholders remain: every value below is final. The placeholder
 * machinery is retained — prefix a value with `TODO:` here and every page,
 * the enquiry form and the structured data treat it as unfilled. No other
 * file hardcodes a contact detail.
 *
 * Deliberately NOT modelled here: a phone number, a street address, opening
 * hours, a map embed and customer testimonials. Publishing invented or
 * placeholder versions of those made the site read as unfinished, so they are
 * simply absent until real ones exist.
 */

export const site = {
  name: "Manoveir Trading CO",
  tagline: "IT services and staff augmentation",
  description:
    "Manoveir Trading Co delivers IT services for client teams: staff augmentation, software development, consulting and managed support.",
  contact: {
    email: "hr@manoveirtrading.com",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/it-services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  /**
   * `icon` values are names in src/components/Icon.astro — not emoji. Add the
   * icon there first if you introduce a new category.
   */
  trustBar: ["Staff augmentation", "Software delivery", "IT consulting", "Managed support"],

  whyChooseUs: [
    {
      title: "Right fit, not first available",
      desc: "Every profile we put forward is matched to the role, stack and timeline rather than the first person on our bench.",
      icon: "verified",
    },
    {
      title: "Fast turnaround",
      desc: "Shortlists within days, with people who can join your sprint, your tools and your process quickly.",
      icon: "tag",
    },
    {
      title: "Retention-minded",
      desc: "We stay close to both sides during the engagement, which keeps placements stable long after onboarding.",
      icon: "people",
    },
    {
      title: "Flexible engagement terms",
      desc: "Scale the team up or stand it down as the work changes; no fixed commitment beyond what the role needs.",
      icon: "basket",
    },
  ],
  values: [
    {
      title: "Quality",
      desc: "We represent people we would happily hire into our own teams, and we would rather leave a role open than fill it badly.",
      icon: "star",
    },
    {
      title: "Honesty",
      desc: "Clear about skills, limits and timelines — in the shortlist, in the interview and throughout the engagement.",
      icon: "scales",
    },
    {
      title: "Partnership",
      desc: "We work alongside your delivery leads, not outside them; your process and goals stay yours.",
      icon: "neighbourhood",
    },
  ],
  stats: [
    { value: "4", label: "Service lines" },
    { value: "Days", label: "Typical shortlist" },
    { value: "Direct", label: "Line to our team" },
    { value: "Flexible", label: "Engagement terms" },
  ],

  /**
   * The IT services practice — now the primary business line of the company.
   * Own page at /it-services.
   */
  itServices: {
    eyebrow: "IT services · Staff augmentation",
    heading: "Technology teams, on demand",
    tagline: "Flexible engineering capacity",
    description:
      "We place skilled technology professionals with client teams and take on focused software, consulting and support engagements.",
    services: [
      {
        title: "Staff Augmentation",
        desc: "Experienced developers, testers and IT professionals embedded directly into your team, for as long as the engagement needs them.",
        icon: "people",
      },
      {
        title: "Software Development",
        desc: "Web and internal tooling built to a brief, from a first prototype through to a maintained production release.",
        icon: "code",
      },
      {
        title: "IT Consulting & Advisory",
        desc: "Independent advice on tooling, architecture and hiring decisions from people who have shipped the alternative approaches.",
        icon: "briefcase",
      },
      {
        title: "Managed IT Support",
        desc: "Ongoing maintenance, monitoring and support for systems already in production, so problems get caught before they reach your users.",
        icon: "shield",
      },
    ],
    process: [
      {
        title: "Scope the need",
        desc: "A short conversation about the role, the stack and the timeline, so we know exactly who to look for.",
      },
      {
        title: "Match the right people",
        desc: "We put forward people who match the brief, not the first available profile.",
      },
      {
        title: "Deploy & onboard",
        desc: "Engineers join your team, your tools and your process — augmentation, not a separate silo.",
      },
      {
        title: "Support the engagement",
        desc: "We stay involved for the life of the engagement, handling anything from scheduling to scope changes.",
      },
    ],
  },
};

/** True when a config string is still an unfilled placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.trimStart().startsWith("TODO:");
}

/** Strips the `TODO:` marker for display, so pages read cleanly while still obviously provisional. */
export function displayValue(value: string): string {
  return isPlaceholder(value) ? value.trimStart().slice("TODO:".length).trim() : value;
}