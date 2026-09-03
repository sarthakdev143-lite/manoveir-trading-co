/**
 * SINGLE SOURCE OF TRUTH for all site content and real-world details.
 *
 * Only two values are still placeholders: `contact.phone` and `contact.email`.
 * They are prefixed with `TODO:` — replace them here and every page, the
 * enquiry form and the structured data pick up the change. Nothing else in the
 * site is provisional, and no other file hardcodes a contact detail.
 *
 * Deliberately NOT modelled here: a street address, opening hours, a map embed
 * and customer testimonials. Publishing invented or placeholder versions of
 * those made the site read as unfinished, so they are simply absent until real
 * ones exist. See README "Adding your address, hours or a map" for how to
 * reintroduce them.
 */

export const site = {
  name: "Manoveir Trading CO",
  tagline: "Your Trusted Local Retail Partner",
  description:
    "A retail business engaged in the purchase and sale of various consumer goods and products, serving local customers through direct shop-based sales.",
  contact: {
    phone: "TODO: +91-XXXXXXXXXX",
    phoneDisplay: "TODO: +91 9XXXX XXXXX",
    email: "TODO: contact@manoveirtrading.example",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],

  /**
   * `icon` values are names in src/components/Icon.astro — not emoji. Add the
   * icon there first if you introduce a new category.
   */
  categories: [
    {
      title: "Groceries & Staples",
      desc: "Rice, flour, pulses, oils, spices, packaged food",
      icon: "grain",
      examples: [
        "Rice, atta & pulses",
        "Cooking oils & ghee",
        "Whole and ground spices",
        "Packaged & ready-to-cook food",
      ],
    },
    {
      title: "Household Essentials",
      desc: "Cleaning supplies, detergents, kitchenware, storage",
      icon: "spray",
      examples: [
        "Detergents & floor cleaners",
        "Brooms, mops & brushes",
        "Everyday kitchenware",
        "Storage boxes & containers",
      ],
    },
    {
      title: "Personal Care",
      desc: "Soaps, shampoos, skincare, oral care, grooming",
      icon: "care",
      examples: [
        "Bathing soaps & handwash",
        "Shampoos & hair oils",
        "Toothpaste & oral care",
        "Shaving & grooming basics",
      ],
    },
    {
      title: "Beverages & Snacks",
      desc: "Soft drinks, juices, tea, coffee, biscuits, confectionery",
      icon: "cup",
      examples: [
        "Tea, coffee & health drinks",
        "Soft drinks & packaged juices",
        "Biscuits, namkeen & chips",
        "Chocolates & confectionery",
      ],
    },
    {
      title: "Stationery & Sundries",
      desc: "Notebooks, pens, batteries, small daily-use items",
      icon: "pencil",
      examples: [
        "Notebooks & registers",
        "Pens, pencils & geometry",
        "Batteries & bulbs",
        "Tape, glue & small hardware",
      ],
    },
    {
      title: "Seasonal & Festive Goods",
      desc: "Gift items, decorations, festival-specific products",
      icon: "gift",
      examples: [
        "Festive gift packs",
        "Diyas, lights & decorations",
        "Rangoli & puja essentials",
        "Season-specific specials",
      ],
    },
  ],
  whyChooseUs: [
    {
      title: "Wide Selection",
      desc: "Six broad categories under one roof, so a single trip covers the whole list instead of three separate stops.",
      icon: "basket",
    },
    {
      title: "Quality Assured",
      desc: "We check stock on arrival and rotate it regularly, so what reaches your basket is fresh and in date.",
      icon: "verified",
    },
    {
      title: "Fair & Transparent Pricing",
      desc: "Clear prices on the shelf and at the counter. No surprises, no haggling required.",
      icon: "tag",
    },
    {
      title: "Friendly Local Service",
      desc: "We know our regulars by name, and we are happy to source something specific if you ask for it.",
      icon: "people",
    },
  ],
  values: [
    {
      title: "Quality",
      desc: "We stock brands and goods we would happily use at home, and we would rather leave a shelf empty than fill it with something we cannot stand behind.",
      icon: "star",
    },
    {
      title: "Honesty",
      desc: "Straight prices, honest weights and clear answers about what we do and do not have in stock today.",
      icon: "scales",
    },
    {
      title: "Community",
      desc: "We are a neighbourhood shop first. The people who walk through the door are neighbours, not transactions.",
      icon: "neighbourhood",
    },
  ],
  stats: [
    { value: "6", label: "Product categories" },
    { value: "Daily", label: "Stock rotation" },
    { value: "Direct", label: "Counter service" },
    { value: "Local", label: "Families served" },
  ],
  trustBar: ["Serving local customers", "Quality goods", "Fair prices"],
};

/** True when a config string is still an unfilled placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.trimStart().startsWith("TODO:");
}

/** Strips the `TODO:` marker for display, so pages read cleanly while still obviously provisional. */
export function displayValue(value: string): string {
  return isPlaceholder(value) ? value.trimStart().slice("TODO:".length).trim() : value;
}
