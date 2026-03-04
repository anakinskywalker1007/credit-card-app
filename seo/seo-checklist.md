# CardTier.com — SEO Checklist by Page Type
**Version:** 1.0  
**Date:** March 2026  
**Purpose:** Before any page goes live, every item for its page type must be checked. No exceptions.

> **YMYL Note:** Credit card content is "Your Money, Your Life" content. Google holds YMYL pages to a higher standard for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Every page must demonstrate author credentials, cite primary sources, and include a "Last Updated" date.

---

## HOW TO USE THIS CHECKLIST

1. Identify your page type (card page / category / blog / comparison)
2. Work through every item in order
3. ✅ = Done | ⚠️ = Needs attention | ❌ = Blocking (do not publish)
4. Re-run this checklist when making major content updates

---

## PAGE TYPE 1: INDIVIDUAL CARD PAGES (`/cards/[slug]/`)

### A. Title Tag
- [ ] **Format:** `[Card Name] Review ([Year]): Rewards, Fees, and Our Verdict | CardTier`
- [ ] **Example:** `Chase Sapphire Preferred® Review (2026): Rewards, Fees, and Our Verdict | CardTier`
- [ ] **Length:** 50–60 characters (including brand). Use the year to signal freshness.
- [ ] **Primary keyword placement:** Card name first. Do NOT start with "CardTier".
- [ ] **Do NOT use:** Click-bait adjectives ("Amazing", "Best Ever") in title tags — use in H1.

### B. Meta Description
- [ ] **Format:** `Earn [top reward rate] with the [Card Name]. [Welcome bonus]. Annual fee: $[X]. Full breakdown of rewards, fees, and who should apply. Updated [Month Year].`
- [ ] **Example:** `Earn 3x on dining with the Chase Sapphire Preferred®. 60,000-point welcome bonus. Annual fee: $95. Full breakdown of rewards, benefits, and who should apply. Updated March 2026.`
- [ ] **Length:** 145–158 characters
- [ ] **Must include:** Top reward rate, welcome bonus or key perk, annual fee, "Updated [date]"
- [ ] **Must NOT include:** Clickbait, all-caps words, misleading claims

### C. H1 Rule
- [ ] **One H1 per page — no exceptions**
- [ ] **Format:** `[Full Card Name]: Full Review, Rewards Breakdown, and Our Verdict`
- [ ] **Example:** `Chase Sapphire Preferred® Card: Full Review, Rewards Breakdown, and Our Verdict`
- [ ] **Contains primary keyword:** Card name in full (with ® if applicable)
- [ ] **NOT the same as title tag** — variation is fine, keyword match is what matters

### D. Header Hierarchy
- [ ] H2 for major sections: "Rewards Breakdown", "Fees", "Welcome Bonus", "Who Should Apply", "FAQ"
- [ ] H3 for subsections under each H2
- [ ] No H4+ unless absolutely necessary
- [ ] No skipping levels (H1 → H3 without H2)

### E. Schema Markup
- [ ] `FinancialProduct` schema with `brand`, `offers` (annual fee), `image`
- [ ] `AggregateRating` schema (only add when real ratings exist — do not fake)
- [ ] `Review` schema with `reviewRating`, `author`, `datePublished`, `dateModified`
- [ ] `BreadcrumbList` schema: Home > Credit Cards > [Card Name]
- [ ] `FAQPage` schema (if FAQ section is present)
- [ ] All schemas validated at https://search.google.com/test/rich-results

### F. Content Requirements
- [ ] **"Last Updated" date** prominently displayed at top of page (required for YMYL)
- [ ] **Author byline** with link to author bio page (required for E-E-A-T)
- [ ] **Advertiser Disclosure** link above the fold or in consistent site header
- [ ] **Affiliate link disclosure** on the page (FTC requirement — not optional)
- [ ] Word count: 1,500–2,500 words
- [ ] Comparison table vs. top competitors
- [ ] Clear "Who Should Apply" and "Who Should Skip" sections
- [ ] FAQ section (minimum 3 questions targeting common search queries)
- [ ] Apply Now CTA with affiliate link (above the fold AND within content)

### G. On-Page SEO
- [ ] Primary keyword (card name) in first 100 words of body text
- [ ] Card image with descriptive `alt="[Card Issuer] [Card Name] credit card"` — no generic "card.png"
- [ ] Card image dimensions: min 375×240px (standard card aspect ratio), labeled with card name
- [ ] OG image (1200×630px) for social sharing
- [ ] `<link rel="canonical">` pointing to its own URL (prevent duplicate content from /apply/ URLs)
- [ ] No keyword stuffing — card name should appear naturally, ~5–10 times in body
- [ ] Page load speed: <3s on mobile (check PageSpeed Insights)

### H. Internal Linking
- [ ] Link to the card's **category pages** (e.g., travel card → `/best-credit-cards/travel/`)
- [ ] Link to **2–3 comparison pages** featuring this card (e.g., `/compare/chase-sapphire-preferred-vs-capital-one-venture-x/`)
- [ ] Link to **related blog posts** (e.g., "Chase Trifecta Guide")
- [ ] **DO NOT** link to competitor sites in the body — only cite issuer's official terms page
- [ ] Anchor text: use descriptive text, never "click here" or "read more"

### I. Technical
- [ ] URL is lowercase, hyphenated, no special characters: `/cards/chase-sapphire-preferred/`
- [ ] Trailing slash is consistent site-wide (pick one, 301 redirect the other)
- [ ] Page returns 200 status code
- [ ] No orphaned page (at least 2 internal links pointing to this card page)
- [ ] Added to `sitemap.xml`
- [ ] Not blocked by `robots.txt`

---

## PAGE TYPE 2: CATEGORY PAGES (`/best-credit-cards/[category]/`)

### A. Title Tag
- [ ] **Format:** `Best [Category] Credit Cards of [Month Year]: Our Top [N] Picks | CardTier`
- [ ] **Example:** `Best Travel Credit Cards of March 2026: Our Top 7 Picks | CardTier`
- [ ] **Length:** 55–65 characters
- [ ] **Update month/year** every time the page is refreshed (Google weighs freshness heavily)
- [ ] Primary keyword first: "Best [category] credit cards" must appear

### B. Meta Description
- [ ] **Format:** `Looking for the best [category] credit card? We ranked [N] cards for [Year]. Our top pick: [Card Name] for [key reason]. Compare rewards, fees, and apply.`
- [ ] **Example:** `Looking for the best travel credit card? We ranked 12 cards for 2026. Our top pick: Chase Sapphire Preferred for its 3x dining + 2x travel rewards. Compare and apply.`
- [ ] **Length:** 145–160 characters
- [ ] **Must include:** Category keyword, specific top pick card name, key differentiator, call-to-action

### C. H1 Rule
- [ ] **One H1**: `Best [Category] Credit Cards of [Month Year]: [Number] Expert Picks, Ranked`
- [ ] **Example:** `Best Travel Credit Cards of March 2026: 7 Expert Picks, Ranked`
- [ ] Includes year for freshness signal; includes category keyword

### D. Content Requirements
- [ ] **"Last Updated" date** at the very top — must match title tag month/year
- [ ] **Author byline** with credentials (brief 1-line bio minimum)
- [ ] **Methodology section** — explain how you scored/ranked the cards (critical for E-E-A-T)
- [ ] **Comparison table** at top (scannable: card name, rewards rate, annual fee, welcome bonus, best for)
- [ ] **Individual section for each card** with H2 header, pro/con bullets, and who-it's-for
- [ ] Minimum 5 cards featured
- [ ] FAQ section targeting category-level questions
- [ ] **Editorial independence note** (required for YMYL trustworthiness)
- [ ] Word count: 2,500–4,000 words

### E. Schema Markup
- [ ] `ItemList` schema listing all featured cards with position, name, URL
- [ ] `Article` or `WebPage` schema for the page itself
- [ ] `BreadcrumbList`: Home > Best Credit Cards > Best [Category] Cards
- [ ] `FAQPage` if FAQ section present

### F. Internal Linking
- [ ] **Hub link:** Link UP to parent `/best-credit-cards/` page
- [ ] **Spoke links:** Link to each featured card's individual `/cards/[slug]/` page
- [ ] **Cross-category links:** Link to 2–3 related category pages (e.g., travel page → airline page)
- [ ] **Comparison links:** Link to relevant comparison pages (e.g., top 2 picks → their comparison page)
- [ ] **Blog links:** Link to relevant guides (e.g., travel category → Chase Trifecta Guide)
- [ ] All card names are linked — never mention a card name without linking to its card page

### G. Technical
- [ ] URL: `/best-credit-cards/[category]/` — lowercase, hyphenated
- [ ] In `sitemap.xml` with `changefreq: weekly`
- [ ] Canonical tag points to itself
- [ ] Not blocked in `robots.txt`
- [ ] At least 5 internal links pointing TO this page from other pages

---

## PAGE TYPE 3: BLOG POSTS (`/blog/[slug]/`)

### A. Title Tag
- [ ] **Format for comparison posts:** `[Card A] vs. [Card B] ([Year]): [Punchy verdict/angle] | CardTier`
- [ ] **Format for guide posts:** `Best [Keyword] ([Year]): [N] Picks, Ranked | CardTier` OR `[How/Why + topic] ([Year]) | CardTier`
- [ ] **Examples:**
  - `Citi Double Cash vs. Chase Freedom Unlimited (2026): Which Cash Back Card Actually Wins? | CardTier`
  - `Best Credit Card for Nurses (2026): 6 Cards Worth Carrying | CardTier`
- [ ] **Length:** 55–65 characters
- [ ] **Primary keyword FIRST** — not CardTier, not "The"
- [ ] Year included for freshness

### B. Meta Description
- [ ] **Format for comparison:** `[Card A] offers [key differentiator]. [Card B] offers [key differentiator]. Here's who wins for cash back / travel / [category] — based on real spending math. Updated [Month Year].`
- [ ] **Format for guide:** `[Opening hook that mirrors searcher intent]. We reviewed [N] options and ranked the best [keyword] for [year]. [Specific top pick + reason]. Updated [Month Year].`
- [ ] **Length:** 145–160 characters
- [ ] **Must mirror searcher intent** — if they're searching "citi double cash vs chase freedom unlimited," they want a verdict, not a description

### C. H1 Rule
- [ ] **Exactly one H1** — same as the title tag OR a close variant (not identical)
- [ ] Must contain the primary target keyword verbatim or near-verbatim
- [ ] For comparison posts: Both card names must appear in H1
- [ ] For occupation posts: Occupation name + "credit card" must appear in H1

### D. Content Structure Requirements
- [ ] **Quick Answer Box** near top (targets featured snippets) — 2–4 sentence direct answer
- [ ] **"Last Updated"** timestamp visible at top
- [ ] **Author byline** with finance credentials (for E-E-A-T)
- [ ] **Advertiser disclosure** link near top (required, not optional)
- [ ] **Comparison table** for any post featuring multiple cards
- [ ] **FAQ section** at bottom (minimum 3 questions from People Also Ask / real searches)
- [ ] **CTA to CardTier comparison tool** — at least once mid-article + once at end
- [ ] Word count: 2,000–3,500 words (match or beat top-ranking competitor's word count)
- [ ] All cards mentioned are internally linked to their card page
- [ ] Statistics cited with source links (link to issuer's site or official data — not other affiliates)

### E. Schema Markup
- [ ] `Article` schema with `headline`, `datePublished`, `dateModified`, `author`, `image`, `about` (linked card schemas)
- [ ] `BreadcrumbList`: Home > Blog > [Post Title]
- [ ] `FAQPage` schema for the FAQ section
- [ ] **Comparison posts additionally:** Consider `Table` markup for comparison tables

### F. Internal Linking Rules
- [ ] Every card name mentioned → linked to its `/cards/[slug]/` page
- [ ] Every category mentioned → linked to its `/best-credit-cards/[category]/` page
- [ ] Link to 1–2 related blog posts
- [ ] Link to the comparison page if one exists for the cards discussed
- [ ] **No links to competitor sites** (NerdWallet, TPG, Bankrate) in the body text
- [ ] **Outbound links** only to primary sources: card issuer sites, Federal Reserve data, official government data
- [ ] Minimum 3 internal links per post; maximum ~8 (don't over-link)

### G. Images
- [ ] **Hero image:** 1200×630px minimum (required for Google Discover and social share)
- [ ] All card images: 375×240px minimum, descriptive alt text
- [ ] Comparison chart or infographic (optional but improves time-on-page and shareability)
- [ ] No stock photo of people holding credit cards — these are overused and generic
- [ ] All images compressed (WebP preferred, <200KB per image)

### H. Technical
- [ ] URL: `/blog/[short-descriptive-slug]/` — use primary keyword, under 60 characters
- [ ] Canonical tag points to itself
- [ ] OG tags: `og:title`, `og:description`, `og:image` (1200×630px)
- [ ] Added to `sitemap.xml`
- [ ] Not blocked by `robots.txt`

---

## PAGE TYPE 4: COMPARISON PAGES (`/compare/[card-a]-vs-[card-b]/`)

### A. Title Tag
- [ ] **Format:** `[Card A Full Name] vs. [Card B Full Name] (2026): Head-to-Head Comparison | CardTier`
- [ ] **Example:** `Chase Sapphire Preferred vs. Capital One Venture X (2026): Head-to-Head Comparison | CardTier`
- [ ] **Length:** 60–70 characters (these naturally run long — acceptable)
- [ ] Both card names MUST be in the title tag — this is what people are searching
- [ ] Year for freshness

### B. Meta Description
- [ ] **Format:** `[Card A] earns [rate/perk]. [Card B] earns [rate/perk]. We run the numbers to find the winner for [use case]. See our verdict. Updated [Month Year].`
- [ ] **Example:** `Chase Sapphire Preferred earns 3x on dining. Capital One Venture X earns 2x on everything. We run the numbers to find the winner for travel rewards. Updated March 2026.`
- [ ] **Length:** 148–160 characters
- [ ] Both card names appear — people scan meta descriptions for their exact cards

### C. H1 Rule
- [ ] **Format:** `[Card A] vs. [Card B]: Which Is Better in [Year]?`
- [ ] Both card names exactly as they appear in common searches
- [ ] Year for freshness signal
- [ ] Question format ("Which Is Better?") captures featured snippet opportunities

### D. Content Requirements
- [ ] **Quick Verdict Box** at very top (2–3 sentences: "Choose Card A if X. Choose Card B if Y.")
- [ ] **Side-by-side comparison table** — the core of the page. Must include:
  - Rewards rates (all categories)
  - Annual fee
  - Welcome bonus
  - Foreign transaction fee
  - Key perks
  - Redemption options
  - Who it's best for
- [ ] **Detailed section for each card** explaining strengths
- [ ] **Head-to-head breakdown** by spending scenario (dining, travel, everyday, etc.)
- [ ] **Real earnings calculator example** (e.g., "$3,000/month spender earns $X with Card A, $Y with Card B")
- [ ] **Clear winner declaration** — don't be wishy-washy. Pick a winner with caveats.
- [ ] **"Get Both" option** mentioned if applicable (trifecta strategy, etc.)
- [ ] **FAQ section** — minimum 3 questions
- [ ] **"Last Updated"** timestamp
- [ ] **Author byline**
- [ ] **Advertiser disclosure**
- [ ] Word count: 2,000–3,000 words

### E. Schema Markup
- [ ] `Article` schema (headline, author, dates)
- [ ] `BreadcrumbList`: Home > Compare Cards > [Card A] vs [Card B]
- [ ] `FAQPage` for FAQ section
- [ ] `FinancialProduct` schema for each card (can use `@graph`)
- [ ] Consider `Table` schema for the main comparison table

### F. Internal Linking
- [ ] Both card names linked to their `/cards/[slug]/` pages (at every first mention in each section)
- [ ] Link to each card's category page(s)
- [ ] Link to relevant blog post if one covers this comparison
- [ ] Link to `/compare/` hub page
- [ ] Cross-link to 2–3 other comparison pages (e.g., Chase Sapphire Preferred vs Venture X → also link to Chase Sapphire Reserve vs Amex Platinum)
- [ ] CTA to CardTier's comparison tool

### G. Technical
- [ ] URL: `/compare/[card-a-slug]-vs-[card-b-slug]/` — alphabetical order preferred for consistency
- [ ] Canonical: points to itself
- [ ] Added to `sitemap.xml`
- [ ] Not blocked by `robots.txt`

---

## GLOBAL SEO REQUIREMENTS (ALL PAGE TYPES)

These apply to every single page on CardTier. Not optional.

### E-E-A-T (Google's Quality Signals for YMYL)

| Signal | Requirement |
|--------|------------|
| **Experience** | Author has real experience using or reviewing financial products |
| **Expertise** | Author bio lists credentials (personal finance background, journalism, CFA, etc.) |
| **Authoritativeness** | Pages link to primary sources (issuer sites, CFPB, Federal Reserve) |
| **Trustworthiness** | Advertiser disclosure present, methodology published, no fake reviews |

### Metadata Checklist (Every Page)
- [ ] `<title>` tag present, under 65 chars, contains primary keyword
- [ ] `<meta name="description">` present, 145–160 chars
- [ ] `<meta name="robots" content="index, follow">` (or handled via sitemap/default)
- [ ] `<link rel="canonical" href="...">` pointing to self
- [ ] Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

### Core Web Vitals Targets
- [ ] LCP (Largest Contentful Paint): < 2.5 seconds
- [ ] FID/INP (Interaction to Next Paint): < 200ms
- [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] Mobile-friendly (passes Google Mobile-Friendly Test)

### Content Freshness (YMYL Critical)
- [ ] "Last Updated" date displayed on every page
- [ ] Card pages refreshed minimum **monthly** (card terms change constantly)
- [ ] Category pages refreshed minimum **monthly**
- [ ] Blog posts refreshed minimum **quarterly** (or when card terms change significantly)
- [ ] Sitemap `<lastmod>` updated whenever content is updated

### Link Quality
- [ ] No broken internal links (run monthly crawl)
- [ ] No links to penalized or low-quality sites
- [ ] Affiliate links: `rel="nofollow sponsored"` on all affiliate links (FTC + Google requirement)
- [ ] External links to authoritative sources only: issuer sites, CFPB, Federal Reserve, major news outlets

---

## LAUNCH CHECKLIST (New Pages)

Before any new page is published:

- [ ] All page-type checklist items above: ✅
- [ ] Schema validated at https://search.google.com/test/rich-results
- [ ] Page tested on mobile (Chrome DevTools, iOS Safari)
- [ ] PageSpeed Insights score: 85+ mobile
- [ ] No duplicate content (check with Copyscape or similar)
- [ ] At least 2 internal links from existing pages pointing to the new page
- [ ] URL added to `sitemap.xml`
- [ ] Google Search Console: Submit URL for indexing after publishing

---

## MONTHLY MAINTENANCE CHECKLIST

Run this every first Monday of the month:

- [ ] Update "Last Updated" dates on all card pages (even if content unchanged — card terms may have changed)
- [ ] Verify all welcome bonus amounts are current (check issuer sites directly)
- [ ] Verify all annual fee amounts are current
- [ ] Check for any affiliate program changes (dead links, program pauses)
- [ ] Run internal link audit (any broken links?)
- [ ] Update sitemap `<lastmod>` for any updated pages
- [ ] Review Google Search Console: any crawl errors? Any new impressions/clicks worth acting on?
- [ ] Check Core Web Vitals report in Search Console

---

*Last updated: March 2026*  
*Owner: CardTier SEO Team*
