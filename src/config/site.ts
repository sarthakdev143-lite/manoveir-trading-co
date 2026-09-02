/**
 * SINGLE SOURCE OF TRUTH for all site content and real-world details.
 *
 * Anything still prefixed with `TODO:` is a placeholder awaiting real data.
 * Replace those strings here and every page picks up the change — no other
 * file should hardcode an address, phone number, email or map URL.
 */

export const site = {
  name: "Manoveir Trading CO",
  tagline: "Your Trusted Local Retail Partner",
  description:
    "A retail business engaged in the purchase and sale of various consumer goods and products, serving local customers through direct shop-based sales.",
  contact: {
    address: "TODO: Shop No., Street, Area, City, State - PIN",
    phone: "TODO: +91-XXXXXXXXXX",
    phoneDisplay: "TODO: +91 9XXXX XXXXX",
    email: "TODO: contact@manoveirtrading.example",
    hours: "TODO: Mon–Sat 9:00 AM – 9:00 PM, Sun 10:00 AM – 6:00 PM",
    mapEmbedUrl: "TODO: Google Maps embed URL",
    mapLink: "TODO: Google Maps share link",
  },

  /**
   * Address broken into components, used ONLY for the LocalBusiness structured
   * data in BaseLayout. Search engines rank a local shop far better with a
   * component address than with one free-text line, so fill these in as well as
   * `contact.address` above (which is what visitors actually read on the page).
   *
   * Any field left as a `TODO:` is omitted from the structured data rather than
   * published as a placeholder.
   */
  postalAddress: {
    streetAddress: "TODO: Shop No., Street, Area",
    addressLocality: "TODO: City",
    addressRegion: "TODO: State",
    postalCode: "TODO: PIN",
    addressCountry: "IN",
  },

  /**
   * Opening hours in schema.org format, e.g. ["Mo-Sa 09:00-21:00", "Su 10:00-18:00"].
   * Separate from the human-readable `contact.hours` string above. Leave empty to
   * omit from structured data.
   */
  openingHoursSpec: [] as string[],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  categories: [
    {
      title: "Groceries & Staples",
      desc: "Rice, flour, pulses, oils, spices, packaged food",
      icon: "🌾",
      examples: ["Rice, atta & pulses", "Cooking oils & ghee", "Whole and ground spices", "Packaged & ready-to-cook food"],
    },
    {
      title: "Household Essentials",
      desc: "Cleaning supplies, detergents, kitchenware, storage",
      icon: "🧹",
      examples: ["Detergents & floor cleaners", "Brooms, mops & brushes", "Everyday kitchenware", "Storage boxes & containers"],
    },
    {
      title: "Personal Care",
      desc: "Soaps, shampoos, skincare, oral care, grooming",
      icon: "🧴",
      examples: ["Bathing soaps & handwash", "Shampoos & hair oils", "Toothpaste & oral care", "Shaving & grooming basics"],
    },
    {
      title: "Beverages & Snacks",
      desc: "Soft drinks, juices, tea, coffee, biscuits, confectionery",
      icon: "🥤",
      examples: ["Tea, coffee & health drinks", "Soft drinks & packaged juices", "Biscuits, namkeen & chips", "Chocolates & confectionery"],
    },
    {
      title: "Stationery & Sundries",
      desc: "Notebooks, pens, batteries, small daily-use items",
      icon: "✏️",
      examples: ["Notebooks & registers", "Pens, pencils & geometry", "Batteries & bulbs", "Tape, glue & small hardware"],
    },
    {
      title: "Seasonal & Festive Goods",
      desc: "Gift items, decorations, festival-specific products",
      icon: "🎁",
      examples: ["Festive gift packs", "Diyas, lights & decorations", "Rangoli & puja essentials", "Season-specific specials"],
    },
  ],
  whyChooseUs: [
    {
      title: "Wide Selection",
      desc: "Six broad categories under one roof, so a single trip covers the whole list instead of three separate stops.",
      icon: "🛒",
    },
    {
      title: "Quality Assured",
      desc: "We check stock on arrival and rotate it regularly, so what reaches your basket is fresh and in date.",
      icon: "✅",
    },
    {
      title: "Fair & Transparent Pricing",
      desc: "Clear prices on the shelf and at the counter. No surprises, no haggling required.",
      icon: "🏷️",
    },
    {
      title: "Friendly Local Service",
      desc: "We know our regulars by name, and we are happy to source something specific if you ask for it.",
      icon: "🤝",
    },
  ],
  values: [
    {
      title: "Quality",
      desc: "We stock brands and goods we would happily use at home, and we would rather leave a shelf empty than fill it with something we cannot stand behind.",
      icon: "⭐",
    },
    {
      title: "Honesty",
      desc: "Straight prices, honest weights and clear answers about what we do and do not have in stock today.",
      icon: "⚖️",
    },
    {
      title: "Community",
      desc: "We are a neighbourhood shop first. The people who walk through the door are neighbours, not transactions.",
      icon: "🏘️",
    },
  ],
  stats: [
    { value: "6+", label: "Product Categories" },
    { value: "1000+", label: "Products Stocked" },
    { value: "Daily", label: "Fresh Stock Rotation" },
    { value: "Local", label: "Families Served" },
  ],
  testimonials: [
    {
      quote:
        "I get my whole month's groceries here in one trip. The staff always help me find what I need, and they will order it in if it is not on the shelf.",
      name: "TODO: Customer Name",
      detail: "TODO: Regular customer",
    },
    {
      quote:
        "Prices are clearly marked and fair, which matters when you are shopping for a family every week. No guesswork at the counter.",
      name: "TODO: Customer Name",
      detail: "TODO: Local resident",
    },
    {
      quote:
        "During festival season they stock everything in one place — gifts, decorations, puja items. It saves me running around the market.",
      name: "TODO: Customer Name",
      detail: "TODO: Neighbourhood customer",
    },
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
