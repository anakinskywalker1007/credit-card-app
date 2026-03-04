# CardTier.com — JSON-LD Schema Markup Templates
**Version:** 1.0  
**Date:** March 2026  
**Purpose:** Copy-paste templates for every page type. Replace ALL `{{PLACEHOLDER}}` values with real data.

> **Implementation note:** Add all `<script type="application/ld+json">` blocks inside the `<head>` of each page. Multiple schemas on one page = use separate script tags or a single `@graph` array (both valid).

---

## 1. ORGANIZATION SCHEMA (Site-Wide / Homepage)

Drop this on the **homepage** and the **about page**. It tells Google who you are.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://cardtier.com/#organization",
  "name": "CardTier",
  "url": "https://cardtier.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://cardtier.com/images/logo.png",
    "width": 300,
    "height": 60
  },
  "description": "CardTier helps you find the best credit card for your spending habits with unbiased comparisons, rewards calculators, and expert reviews.",
  "foundingDate": "2026",
  "sameAs": [
    "https://twitter.com/cardtier",
    "https://www.facebook.com/cardtier",
    "https://www.reddit.com/r/cardtier"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@cardtier.com"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
}
</script>
```

---

## 2. WEBSITE SCHEMA (Homepage — enables Sitelinks Search Box eligibility)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://cardtier.com/#website",
  "name": "CardTier",
  "url": "https://cardtier.com",
  "description": "Unbiased credit card comparisons, rewards calculators, and expert reviews.",
  "publisher": {
    "@id": "https://cardtier.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://cardtier.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## 3. FINANCIAL PRODUCT SCHEMA (Individual Card Pages)

**Page type:** `/cards/[slug]/`  
**Schema type:** `FinancialProduct` (subtype of `Product`)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "@id": "https://cardtier.com/cards/{{CARD_SLUG}}/#product",
  "name": "{{FULL_CARD_NAME}}",
  "description": "{{META_DESCRIPTION_TEXT}}",
  "url": "https://cardtier.com/cards/{{CARD_SLUG}}/",
  "image": {
    "@type": "ImageObject",
    "url": "https://cardtier.com/images/cards/{{CARD_SLUG}}.png",
    "width": 375,
    "height": 240
  },
  "brand": {
    "@type": "Brand",
    "name": "{{CARD_ISSUER}}"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://cardtier.com/cards/{{CARD_SLUG}}/",
    "priceCurrency": "USD",
    "price": "{{ANNUAL_FEE_NUMBER}}",
    "description": "Annual fee: ${{ANNUAL_FEE_DISPLAY}}",
    "seller": {
      "@type": "Organization",
      "name": "{{CARD_ISSUER}}"
    }
  },
  "feesAndCommissionsSpecification": "https://cardtier.com/advertiser-disclosure/",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{RATING_VALUE}}",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "{{RATING_COUNT}}",
    "reviewCount": "{{REVIEW_COUNT}}"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "{{EDITOR_RATING}}",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "{{AUTHOR_NAME}}",
        "url": "https://cardtier.com/authors/{{AUTHOR_SLUG}}/"
      },
      "publisher": {
        "@id": "https://cardtier.com/#organization"
      },
      "datePublished": "{{REVIEW_DATE_ISO}}",
      "dateModified": "{{LAST_UPDATED_ISO}}",
      "reviewBody": "{{REVIEW_SUMMARY_TEXT}}"
    }
  ],
  "isRelatedTo": [
    {
      "@type": "FinancialProduct",
      "name": "{{RELATED_CARD_1_NAME}}",
      "url": "https://cardtier.com/cards/{{RELATED_CARD_1_SLUG}}/"
    },
    {
      "@type": "FinancialProduct",
      "name": "{{RELATED_CARD_2_NAME}}",
      "url": "https://cardtier.com/cards/{{RELATED_CARD_2_SLUG}}/"
    }
  ]
}
</script>
```

### Example — Fully Populated (Chase Sapphire Preferred)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "@id": "https://cardtier.com/cards/chase-sapphire-preferred/#product",
  "name": "Chase Sapphire Preferred® Card",
  "description": "Earn 3x on dining, 2x on travel, and a 60,000-point welcome bonus. Our top pick for travel beginners with a $95 annual fee.",
  "url": "https://cardtier.com/cards/chase-sapphire-preferred/",
  "image": {
    "@type": "ImageObject",
    "url": "https://cardtier.com/images/cards/chase-sapphire-preferred.png",
    "width": 375,
    "height": 240
  },
  "brand": {
    "@type": "Brand",
    "name": "Chase"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://cardtier.com/cards/chase-sapphire-preferred/",
    "priceCurrency": "USD",
    "price": "95",
    "description": "Annual fee: $95",
    "seller": {
      "@type": "Organization",
      "name": "Chase"
    }
  },
  "feesAndCommissionsSpecification": "https://cardtier.com/advertiser-disclosure/",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "1247",
    "reviewCount": "1247"
  }
}
</script>
```

---

## 4. REVIEW SCHEMA (Card Review Pages — standalone or embedded)

**Use when:** The page is primarily a review of a single card.  
**Can combine with** FinancialProduct schema above using `@graph`.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "@id": "https://cardtier.com/cards/{{CARD_SLUG}}/#review",
  "itemReviewed": {
    "@type": "FinancialProduct",
    "@id": "https://cardtier.com/cards/{{CARD_SLUG}}/#product",
    "name": "{{FULL_CARD_NAME}}",
    "image": "https://cardtier.com/images/cards/{{CARD_SLUG}}.png"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "{{RATING_0_TO_5}}",
    "bestRating": "5",
    "worstRating": "1"
  },
  "name": "{{CARD_NAME}} Review — CardTier",
  "author": {
    "@type": "Person",
    "name": "{{AUTHOR_FULL_NAME}}",
    "url": "https://cardtier.com/authors/{{AUTHOR_SLUG}}/",
    "jobTitle": "Credit Card Expert",
    "worksFor": {
      "@id": "https://cardtier.com/#organization"
    }
  },
  "publisher": {
    "@id": "https://cardtier.com/#organization"
  },
  "datePublished": "{{PUBLISH_DATE_ISO}}",
  "dateModified": "{{LAST_UPDATED_ISO}}",
  "reviewBody": "{{FIRST_2_3_PARAGRAPHS_OF_REVIEW}}",
  "positiveNotes": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "{{PRO_1}}"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "{{PRO_2}}"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "{{PRO_3}}"
      }
    ]
  },
  "negativeNotes": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "{{CON_1}}"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "{{CON_2}}"
      }
    ]
  }
}
</script>
```

---

## 5. ARTICLE SCHEMA (Blog Posts)

**Page type:** `/blog/[slug]/`  
**Schema type:** `Article` (for comparison posts) or `BlogPosting` (for opinion/guide posts)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://cardtier.com/blog/{{POST_SLUG}}/#article",
  "headline": "{{H1_TITLE_TEXT}}",
  "description": "{{META_DESCRIPTION}}",
  "url": "https://cardtier.com/blog/{{POST_SLUG}}/",
  "image": {
    "@type": "ImageObject",
    "url": "https://cardtier.com/images/blog/{{POST_SLUG}}-hero.jpg",
    "width": 1200,
    "height": 630
  },
  "datePublished": "{{PUBLISH_DATE_ISO}}",
  "dateModified": "{{LAST_UPDATED_ISO}}",
  "author": {
    "@type": "Person",
    "name": "{{AUTHOR_FULL_NAME}}",
    "url": "https://cardtier.com/authors/{{AUTHOR_SLUG}}/",
    "jobTitle": "Credit Card Expert",
    "worksFor": {
      "@id": "https://cardtier.com/#organization"
    }
  },
  "publisher": {
    "@id": "https://cardtier.com/#organization"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://cardtier.com/blog/{{POST_SLUG}}/"
  },
  "keywords": ["{{KEYWORD_1}}", "{{KEYWORD_2}}", "{{KEYWORD_3}}"],
  "articleSection": "{{CATEGORY_NAME}}",
  "wordCount": {{WORD_COUNT_INTEGER}},
  "about": [
    {
      "@type": "FinancialProduct",
      "name": "{{CARD_MENTIONED_1}}",
      "url": "https://cardtier.com/cards/{{CARD_SLUG_1}}/"
    },
    {
      "@type": "FinancialProduct",
      "name": "{{CARD_MENTIONED_2}}",
      "url": "https://cardtier.com/cards/{{CARD_SLUG_2}}/"
    }
  ]
}
</script>
```

### Example — Fully Populated (Citi Double Cash vs Chase Freedom Unlimited)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://cardtier.com/blog/citi-double-cash-vs-chase-freedom-unlimited/#article",
  "headline": "Citi Double Cash vs. Chase Freedom Unlimited (2026): Which Cash Back Card Actually Wins?",
  "description": "We compare the Citi Double Cash and Chase Freedom Unlimited side-by-side on rewards, fees, and the Chase ecosystem advantage. Find out which card wins for your wallet.",
  "url": "https://cardtier.com/blog/citi-double-cash-vs-chase-freedom-unlimited/",
  "image": {
    "@type": "ImageObject",
    "url": "https://cardtier.com/images/blog/citi-double-cash-vs-chase-freedom-unlimited-hero.jpg",
    "width": 1200,
    "height": 630
  },
  "datePublished": "2026-03-04",
  "dateModified": "2026-03-04",
  "author": {
    "@type": "Person",
    "name": "CardTier Editorial Team",
    "url": "https://cardtier.com/authors/editorial-team/",
    "jobTitle": "Credit Card Experts",
    "worksFor": {
      "@id": "https://cardtier.com/#organization"
    }
  },
  "publisher": {
    "@id": "https://cardtier.com/#organization"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://cardtier.com/blog/citi-double-cash-vs-chase-freedom-unlimited/"
  },
  "keywords": ["citi double cash vs chase freedom unlimited", "best cash back credit card", "2% cash back card", "chase freedom unlimited review"],
  "articleSection": "Card Comparisons",
  "about": [
    {
      "@type": "FinancialProduct",
      "name": "Citi Double Cash® Card",
      "url": "https://cardtier.com/cards/citi-double-cash/"
    },
    {
      "@type": "FinancialProduct",
      "name": "Chase Freedom Unlimited®",
      "url": "https://cardtier.com/cards/chase-freedom-unlimited/"
    }
  ]
}
</script>
```

---

## 6. BREADCRUMBLIST SCHEMA (All Pages Except Homepage)

**Page type:** Every non-homepage page  
**Purpose:** Enables breadcrumb rich results in SERPs

### Card Page Breadcrumb

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://cardtier.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Credit Cards",
      "item": "https://cardtier.com/best-credit-cards/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{FULL_CARD_NAME}} Review",
      "item": "https://cardtier.com/cards/{{CARD_SLUG}}/"
    }
  ]
}
</script>
```

### Category Page Breadcrumb

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://cardtier.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Best Credit Cards",
      "item": "https://cardtier.com/best-credit-cards/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Best {{CATEGORY_NAME}} Credit Cards",
      "item": "https://cardtier.com/best-credit-cards/{{CATEGORY_SLUG}}/"
    }
  ]
}
</script>
```

### Blog Post Breadcrumb

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://cardtier.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://cardtier.com/blog/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{POST_TITLE}}",
      "item": "https://cardtier.com/blog/{{POST_SLUG}}/"
    }
  ]
}
</script>
```

### Comparison Page Breadcrumb

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://cardtier.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Compare Cards",
      "item": "https://cardtier.com/compare/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{CARD_A_NAME}} vs {{CARD_B_NAME}}",
      "item": "https://cardtier.com/compare/{{CARD_A_SLUG}}-vs-{{CARD_B_SLUG}}/"
    }
  ]
}
</script>
```

---

## 7. ITEMLIST SCHEMA (Category Pages — "Best Of" Lists)

**Page type:** `/best-credit-cards/[category]/`  
**Purpose:** Helps Google understand ranked lists; eligible for list-style rich results

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://cardtier.com/best-credit-cards/{{CATEGORY_SLUG}}/#list",
  "name": "Best {{CATEGORY_NAME}} Credit Cards of 2026",
  "description": "{{META_DESCRIPTION}}",
  "url": "https://cardtier.com/best-credit-cards/{{CATEGORY_SLUG}}/",
  "numberOfItems": {{NUMBER_OF_CARDS_LISTED}},
  "itemListOrder": "https://schema.org/ItemListOrderDescending",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "{{CARD_1_NAME}}",
      "url": "https://cardtier.com/cards/{{CARD_1_SLUG}}/",
      "description": "{{CARD_1_ONE_LINE_WHY}}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{{CARD_2_NAME}}",
      "url": "https://cardtier.com/cards/{{CARD_2_SLUG}}/",
      "description": "{{CARD_2_ONE_LINE_WHY}}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{CARD_3_NAME}}",
      "url": "https://cardtier.com/cards/{{CARD_3_SLUG}}/",
      "description": "{{CARD_3_ONE_LINE_WHY}}"
    }
  ]
}
</script>
```

---

## 8. FAQPAGE SCHEMA (Blog Posts and Card Pages with FAQ Sections)

**Use when:** Page has an FAQ section (which all blog posts should have per checklist).

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{QUESTION_1}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ANSWER_1_PLAIN_TEXT_NO_HTML}}"
      }
    },
    {
      "@type": "Question",
      "name": "{{QUESTION_2}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ANSWER_2_PLAIN_TEXT_NO_HTML}}"
      }
    },
    {
      "@type": "Question",
      "name": "{{QUESTION_3}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ANSWER_3_PLAIN_TEXT_NO_HTML}}"
      }
    }
  ]
}
</script>
```

---

## 9. PERSON SCHEMA (Author Pages — E-E-A-T Critical for YMYL)

**Page type:** `/authors/[slug]/`  
**Why it matters:** YMYL (Your Money, Your Life) content requires demonstrable author expertise.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://cardtier.com/authors/{{AUTHOR_SLUG}}/#person",
  "name": "{{AUTHOR_FULL_NAME}}",
  "url": "https://cardtier.com/authors/{{AUTHOR_SLUG}}/",
  "image": {
    "@type": "ImageObject",
    "url": "https://cardtier.com/images/authors/{{AUTHOR_SLUG}}.jpg"
  },
  "jobTitle": "{{TITLE_E.G._Senior_Credit_Card_Analyst}}",
  "description": "{{BIO_1_2_SENTENCES}}",
  "worksFor": {
    "@id": "https://cardtier.com/#organization"
  },
  "sameAs": [
    "https://www.linkedin.com/in/{{LINKEDIN_HANDLE}}",
    "https://twitter.com/{{TWITTER_HANDLE}}"
  ],
  "knowsAbout": ["Credit Cards", "Personal Finance", "Travel Rewards", "Cash Back Rewards"]
}
</script>
```

---

## MULTI-SCHEMA @graph PATTERN (Recommended for card pages)

Instead of multiple `<script>` tags, combine into one using `@graph`. This is the preferred approach for card pages:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialProduct",
      "@id": "https://cardtier.com/cards/{{CARD_SLUG}}/#product",
      "name": "{{FULL_CARD_NAME}}",
      "description": "{{META_DESCRIPTION_TEXT}}",
      "url": "https://cardtier.com/cards/{{CARD_SLUG}}/",
      "brand": { "@type": "Brand", "name": "{{CARD_ISSUER}}" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "{{ANNUAL_FEE_NUMBER}}",
        "description": "Annual fee"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "{{RATING}}",
        "bestRating": "5",
        "ratingCount": "{{COUNT}}"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cardtier.com/" },
        { "@type": "ListItem", "position": 2, "name": "Credit Cards", "item": "https://cardtier.com/best-credit-cards/" },
        { "@type": "ListItem", "position": 3, "name": "{{FULL_CARD_NAME}}", "item": "https://cardtier.com/cards/{{CARD_SLUG}}/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{FAQ_Q1}}",
          "acceptedAnswer": { "@type": "Answer", "text": "{{FAQ_A1}}" }
        }
      ]
    }
  ]
}
</script>
```

---

## VALIDATION

Test all schema at: https://search.google.com/test/rich-results  
Reference: https://schema.org/FinancialProduct

**Common errors to avoid:**
- `ratingValue` must be a string number between `worstRating` and `bestRating`
- `datePublished` and `dateModified` must be ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ`
- `image` on Article schema must be at least 1200px wide for Google Discover eligibility
- FAQ answers must not contain HTML — plain text only
- `price` in Offer must be a number string, not "$95" — use `"95"` and set `priceCurrency`
- Do NOT use `AggregateRating` unless you have real user reviews; Google can penalize fake ratings
