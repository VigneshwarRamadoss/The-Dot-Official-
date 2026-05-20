import { LucideIcon, Zap, Heart, Sparkles, BookOpen, Layers } from 'lucide-react';

export interface CaseStudySection {
  heading: string;
  content: string[];
  quote?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  img: string;
  subtitle: string;
  tone: string;
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'vedalife',
    title: 'Vedalife Health',
    category: 'Digital Health Platform',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'A unified digital platform built for a premier multi-specialty wellness clinic to streamline patient journeys.',
    tone: 'professional-warm',
    sections: [
      {
        heading: 'Project Overview',
        content: [
          'Vedalife Health is a renowned multi-specialty wellness clinic based in Bengaluru, coordinating holistic patient care across physical, psychological, and preventative healthcare domains. Despite their outstanding medical reputation, their digital presence was deeply fragmented, relying on archaic third-party booking tools, paper-based medical files, and disconnected communication channels.',
          'This friction resulted in a significant 35% drop-off rate during online patient scheduling, frustrated clinic coordinators, and restricted patients from actively engaging with their clinical records. The agency was tasked with designing a unified digital ecosystem — bridging a conversion-driven marketing website, a state-of-the-art patient portal, and a dedicated mobile health application.'
        ]
      },
      {
        heading: 'Discovery & Research',
        content: [
          'Our team initiated the project with deep qualitative research, conducting patient journey mapping across a diverse demographic spectrum—ranging from tech-savvy millennials managing preventative health to elderly patients seeking chronic disease therapies. Simultaneously, we completed a robust competitor audit of standard private clinical networks.',
          'The research uncovered three critical patient pain points:',
          '1. Booking Friction: The booking funnel was cluttered with multi-page forms, confusing specialty terminologies, and opaque pricing models, leading to high drop-outs.',
          '2. Trust Gaps: Patients expressed high anxiety regarding doctor credentials, lacking transparent, easy-to-read expert profiles detailing clinical philosophies.',
          '3. Health Literacy Barriers: Clinical summaries, test reports, and prescription dosages were presented in clinical jargon, making it incredibly difficult for patients to understand their recovery pathways.'
        ],
        quote: '“I want to feel like a person being cared for, not a ticket number in a massive clinical database.” — User Research Interview, Patient aged 54'
      },
      {
        heading: 'Simultaneous Strategy',
        content: [
          'To overcome these hurdles, we established a dual-path strategy: rebuilding Vedalife’s brand identity while simultaneously developing the patient-facing product. By unifying the brand strategy and the product design, we ensured that the feelings of warmth, credibility, and care experienced in the physical clinic translated natively into every pixel of the mobile app and website.',
          'This synchronized approach meant that the calming color systems, tone of voice, and accessibility considerations were hardcoded directly into the UI design tokens from day one, allowing for an incredibly cohesive end-to-end patient experience.'
        ]
      },
      {
        heading: 'Design Process',
        content: [
          'We established a curated brand system tailored specifically for modern healthcare. The color palette features a calming sage green and warm gentle creams, avoiding clinical cold blues. The typography pairs a warm, rounded display face for headers with highly readable sans-serif for medical data.',
          'For the Web UX, we redesigned the clinical discovery funnel, creating an intuitive, search-first interface optimized for SEO and conversion. Patients can easily search by symptom, doctor name, or specialty with real-time slot previews.',
          'For the Patient App, we engineered a simplified 3-step booking flow (Select Doctor -> Pick Slot -> Confirm). Medical records were translated into visual timelines with color-coded wellness metrics, enabling patients to track their health progression over time without needing medical degrees.'
        ]
      },
      {
        heading: 'Technical Build',
        content: [
          'The platform was developed from the ground up to support strict healthcare compliance, utilizing React Native for cross-platform mobile efficiency and Next.js for the public marketing application. We integrated the frontend with secure regional Electronic Health Record (EHR) APIs to sync prescriptions and diagnostic files in real-time.',
          'Key integrations included a fully secure, regional payment gateway supporting modular billing and automated WhatsApp notifications, ensuring patients receive instant confirmation details and diagnostic alerts. Offline-first local storage was implemented for crucial health records, guaranteeing patients can access their prescriptions even in low-connectivity underground clinics.'
        ]
      },
      {
        heading: 'Results & Impact',
        content: [
          'Following the full digital launch, Vedalife witnessed an immediate 42% reduction in online booking drop-offs, vastly relieving administrative call-center loads. Within the first six months, the patient mobile application achieved an extraordinary 84% adoption rate among active clinic patients.',
          'Most importantly, the streamlined medical records and transparent patient portal boosted Vedalife’s overall Patient Net Promoter Score (NPS) to an industry-leading +74, demonstrating the immense power of patient-centric design.'
        ],
        quote: '“The new platform has completely transformed how we interact with our patients, reducing administrative stress by 50%.” — Dr. Ananya Rao, Chief Medical Director'
      },
      {
        heading: 'Key Learnings',
        content: [
          'We realized that patient autonomy is highly empowering. Giving users control over their records dramatically increased clinical trust. Furthermore, we learned the value of continuous micro-iterations—such as updating the calendar layout to display real-time doctor shifts—which eliminated accidental overbooking.',
          'Building for accessibility from the beginning (e.g. contrast controls and adjustable text sizes) was not just a checklist item, but a fundamental success driver for older patients managing chronic conditions.'
        ]
      }
    ]
  },
  {
    id: 'mitti-masala',
    title: 'Mitti & Masala',
    category: 'D2C Brand & E-Commerce',
    img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'Transforming a beloved local restaurant into a national direct-to-consumer artisanal food brand.',
    tone: 'craft-forward',
    sections: [
      {
        heading: 'The Brand Story',
        content: [
          'Mitti & Masala began as a small, beloved neighborhood restaurant in Jaipur, celebrated for its slow-cooked clay-pot recipes and authentic regional spices. The founder’s ambition was to take these traditional flavors nationwide, translating an intimate, sensory dining experience into a high-scale Direct-to-Consumer (D2C) retail brand.',
          'The challenge lay in preserving the emotional and cultural weight of their heritage. In a crowded marketplace filled with industrial food products, Mitti & Masala needed to stand out as a premium, soul-satisfying culinary experience.'
        ]
      },
      {
        heading: 'Brand Identity Design',
        content: [
          'Our identity design honors the soul of traditional Indian culinary craft while embracing contemporary minimalism. The name itself reflects this connection: Mitti (representing the organic clay pots) and Masala (representing the vibrant regional spices).',
          'We curated a palette of warm terracotta, rich mustard yellow, and deep charcoal. The typography pairs a classic custom-crafted Indian block-print inspired headline face with clean sans-serif body text. For the packaging, we developed a system using recycled kraft paper adorned with elegant hand-drawn illustrations of local botanicals, ensuring every unboxing feels deeply personal and artisanal.'
        ],
        quote: '“We wanted every jar of spice to feel like a handcrafted gift from a grandmother’s kitchen, yet look beautiful on a modern metropolitan countertop.” — Studio Design Director'
      },
      {
        heading: 'D2C Strategy',
        content: [
          'To scale the brand effectively, we identified key e-commerce opportunities beyond standard restaurant delivery. We conceptualized and launched a dedicated product line tailored for online retail: premium ready-to-use regional cooking sauces, slow-roasted spice blends, and signature meal kits.',
          'The pricing strategy was designed to reflect the premium, chemical-free nature of the ingredients, positioning Mitti & Masala as an aspirational yet accessible brand for urban home cooks looking for authentic culinary experiences.'
        ]
      },
      {
        heading: 'Website & Store Build',
        content: [
          'The digital storefront was engineered to tell an immersive, sensory-led story. We designed an elegant, content-rich homepage featuring high-definition, warm-toned food photography and cinemagraphs showcasing bubbling clay pots and hand-pounded spices.',
          'The e-commerce engine was built on Shopify with a headless architecture to allow absolute design flexibility. We optimized the checkout flow with dynamic bundle builders, automated shipping calculators, and integrated seamless cold-chain logistics providers to guarantee fresh, temperature-controlled delivery to 24 states.'
        ]
      },
      {
        heading: 'Marketing Foundation',
        content: [
          'We established a warm, highly expressive brand voice for social media, focusing on storytelling, recipe education, and the histories behind regional spices. Rather than aggressive discount-based marketing, we launched the brand through a curated launch campaign.',
          'We distributed bespoke, hand-stamped culinary chests to prominent regional food critics and independent chefs. This unboxing experience went viral, generating immense organic reach and establishing the brand’s credibility from day one.'
        ]
      },
      {
        heading: 'Results',
        content: [
          'The launch of Mitti & Masala surpassed all commercial expectations. Within the first 90 days, the D2C platform generated over ₹45 Lakhs in Gross Merchandise Value (GMV), with a phenomenal 32% repeat customer rate.',
          'Orders spread rapidly across Tier 1 and Tier 2 cities, with national media outlets celebrating the brand’s unique artisanal storytelling and exceptional culinary quality.'
        ],
        quote: '“Mitti & Masala didn’t just sell me spices; they brought the warmth of Jaipur’s traditional kitchens directly into my Mumbai apartment.” — National Food Critic Review'
      },
      {
        heading: 'What Made This Hard',
        content: [
          'Translating a rich, sensory, and highly aromatic dining experience onto a flat, digital glass screen was an incredible challenge. We had to rely heavily on evocative editorial writing, macro food videography, and highly textured packaging design to stimulate the user’s senses.',
          'We iterated the checkout page repeatedly to overcome regional courier anxieties, introducing detailed delivery timelines and proactive ingredient transparency cards to build unwavering customer trust.'
        ]
      }
    ]
  },
  {
    id: 'orea',
    title: 'Oréa Studio',
    category: 'Luxury Slow-Fashion DTC',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'Repositioning a premium slow-fashion boutique into a high-craft global digital flagship.',
    tone: 'luxury-refined',
    sections: [
      {
        heading: 'Brief & Context',
        content: [
          'Oréa Studio is a luxury slow-fashion label specializing in timeless, ethically sourced, and high-craft capsule collections. Possessing an elite local boutique presence, their ambition was to scale globally, targeting conscious high-fashion consumers across Europe and North America.',
          'The goal was to position Oréa as a formidable player alongside sustainable luxury giants like Cuyana, Nanushka, and Totême, requiring a complete digital repositioning that balanced sustainability narratives with high-conversion luxury retail UX.'
        ]
      },
      {
        heading: 'Brand Repositioning',
        content: [
          'We established a brand strategy centered on the concept of "quiet confidence." The visual identity evolved to reflect structural elegance, featuring a bespoke, high-contrast serif logotype paired with an organic, sand-and-slate color palette inspired by raw natural linen and earth.',
          'We crafted an editorial photography brief focusing on dramatic, warm natural light and raw textures, capturing the garments in motion. This elevated, cinematic art direction set a new standard for their digital footprint.'
        ],
        quote: '“Luxury is in the details we choose to leave out. We designed Oréa’s digital flagship to breathe, letting the craftsmanship of the fabrics tell the story.” — Luxury Brand Strategist'
      },
      {
        heading: 'Website Design',
        content: [
          'The e-commerce experience was designed to feel like a premium printed editorial lookbook. We abandoned standard crowded product grids in favor of asymmetrical, fluid collection layouts that showcase garment drape and tailored details.',
          'The Product Detail Page (PDP) was re-architected to incorporate interactive sustainability tabs, explaining the ethical sourcing of every thread, alongside a seamless, single-click international checkout flow supporting localized currencies and customs handling.'
        ]
      },
      {
        heading: 'Personalised Style App',
        content: [
          'To extend the luxury boutique service into the digital realm, we conceived and designed the Oréa Style App. The application features a highly interactive Style Onboarding flow, allowing users to build a digital twin of their wardrobe.',
          'The app includes an intelligent Capsule Wardrobe Builder that suggests tailored outfit combinations based on items they own, paired with non-intrusive, weather-responsive styling recommendations pushed directly to their devices.'
        ]
      },
      {
        heading: 'Technology Choices',
        content: [
          'We deployed a cutting-edge headless Shopify architecture, combining a highly optimized Next.js frontend with a headless CMS to publish rich editorial stories and collection lookbooks fluidly.',
          'The style app was built using React Native to preserve native iOS and Android fluid animations, coupled with a robust personalization engine that dynamically updates homepages based on historical user interactions and geographical locations.'
        ]
      },
      {
        heading: 'Launch & Results',
        content: [
          'The launch of the global flagship immediately elevated the brand’s commercial profile, securing a magnificent 58% year-over-year DTC revenue lift. The newly introduced style app logged over 120,000 active downloads within the first four months.',
          'Crucially, the interactive outfit recommendations and accurate size-finding tooling reduced product return rates by a significant 45%, maximizing overall operational efficiency.'
        ]
      },
      {
        heading: 'Craft Notes',
        content: [
          'We paid extreme attention to typography scale and micro-interactions. The hover states on collection grids feature organic, slow-motion video loops of the garments in movement, simulating a real fabric feel.',
          'Additionally, we introduced an elegant, custom-designed page transition effect that mimics the gentle turning of a heavy luxury magazine page, elevating the entire browsing ritual.'
        ]
      }
    ]
  },
  {
    id: 'pathshala',
    title: 'Pathshala Pro',
    category: 'Bharat-First EdTech',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'Re-engineering K-12 learning for Tier 2/3 India through a high-performance, vernacular-first education ecosystem.',
    tone: 'empathetic-data',
    sections: [
      {
        heading: 'Market Context',
        content: [
          'Pathshala Pro was founded to capture the massive, underserved K-12 educational opportunity across Tier 2 and Tier 3 cities in India (collectively known as Bharat). While urban edtech relied on high-end devices and hyper-fast internet, Pathshala’s audience faced severe hardware constraints, low-bandwidth networks, and shared household devices.',
          'To build a truly impactful platform, we had to treat vernacular language and ultra-light architecture not as auxiliary features, but as the core product strategy, navigating the critical tension between the parent-as-buyer and child-as-user.'
        ]
      },
      {
        heading: 'Research & Discovery',
        content: [
          'Our design and product teams spent weeks conducting fieldwork across semi-urban and rural schools, interviewing teachers, hosting parent focus groups, and mapping child learning journeys at home.',
          'We identified two crucial constraints:',
          '1. Device Sharing: In most households, there is only one smartphone, typically owned by the working father and available to the child for only 1.5 hours in the evening.',
          '2. Bandwidth Scarcity: High-definition video streaming is highly unreliable, requiring robust offline capabilities to prevent study interruptions.',
          '3. Trust Barriers: Parents, though highly aspirational, were skeptical of abstract online learning, demanding tangible board alignments and native language updates.'
        ],
        quote: '“If the video keeps loading, my child loses focus, and I feel like my hard-earned money is being wasted on technology that doesn’t work.” — Fieldwork Interview, Father of Grade 7 Student'
      },
      {
        heading: 'Product Strategy',
        content: [
          'We designed a freemium product strategy structured entirely around regional school boards and vernacular dialects. The curriculum was split into ultra-bite-sized modules that can be pre-downloaded, ensuring offline-first resilience.',
          'To build trust with the parent-as-buyer, we developed a dedicated SMS and low-data Whatsapp report pipeline, giving them daily, language-customized summaries of their child’s progress and academic milestones without requiring them to navigate the app.'
        ]
      },
      {
        heading: 'Learning App Design',
        content: [
          'The learning app features an incredibly lightweight onboarding flow, minimizing complex text inputs by utilizing intuitive visual icons for grade and subject selection.',
          'The video lesson interface was customized to run alongside interactive micro-quizzes, designed to keep students engaged during brief study windows. We engineered the entire interface to support dual-language toggle options (e.g. Hindi/English), allowing students to shift languages seamlessly whenever they encounter difficult concepts.'
        ]
      },
      {
        heading: 'Parent-Facing Website',
        content: [
          'The public-facing marketing website was optimized to convert skeptical parents. We built high-trust landing pages showcasing localized teacher credentials, official state-board curriculum alignments, and video testimonials from local parents whose children achieved academic success.',
          'We integrated a simplified, single-tap lead capture form that automatically routed inquiries to regional counselors speaking local dialects, streamlining enrollment.'
        ]
      },
      {
        heading: 'Engineering Highlights',
        content: [
          'Built using React Native to guarantee flawless performance on budget Android smartphones, the app’s package size was kept under an impressive 14MB. We implemented an automated video compression pipeline that formats content dynamically based on network speeds, dropping to lightweight vector slides in extreme low-connectivity environments.'
        ]
      },
      {
        heading: 'Impact',
        content: [
          'Pathshala Pro scaled rapidly to over 1.2 Million Monthly Active Users (MAUs), boasting an extraordinary 78% average course completion rate—more than double the industry average.',
          'The localized trust signals and accessible lead flows helped convert free-tier trialists to premium subscriptions at a phenomenal 6.8% rate, demonstrating the commercial viability of designing specifically for Bharat.'
        ],
        quote: '“Pathshala Pro has made quality education accessible to my daughter despite our limited resources. She looks forward to her daily studies.” — Local Parent, Grade 9 Student'
      },
      {
        heading: 'What “Bharat-First” Actually Means',
        content: [
          'Designing for Bharat meant abandoning standard design trends like heavy motion graphics, parallax screens, and glowing gradients. Every design trade-off was made in favor of raw performance, extreme readability, and hardware efficiency.',
          'We proved that premium design is not about complex decorations; it is about absolute empathy, accessibility, and solving real-world constraints for the end user.'
        ]
      }
    ]
  },
  {
    id: 'kerno',
    title: 'Kerno',
    category: 'Enterprise B2B SaaS',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'Designing an enterprise-grade supply chain intelligence platform for global logistics visibility.',
    tone: 'enterprise-precise',
    sections: [
      {
        heading: 'Problem Space',
        content: [
          'Global enterprise supply chains are notoriously complex, operating across fragmented shipping portals, legacy ERP databases, and massive, uncoordinated spreadsheets. Procurement and operations teams frequently operate in a state of reactive firefighting, lacking real-time visibility into transit delays, supplier risks, and customs compliance.',
          'Kerno was founded to bridge this supply chain visibility gap, seeking to deliver a precise, high-performance, and unified SaaS intelligence dashboard tailored for multi-national supply chain directors and enterprise buyers.'
        ]
      },
      {
        heading: 'Buyer & User Research',
        content: [
          'Our research team mapped the complex B2B buying committee (consisting of Chief Procurement Officers, Logistics Directors, and IT Compliance Admins) alongside daily ops users.',
          'We discovered that while B2B buyers demanded strict regulatory adherence (SOC 2, ISO) and seamless enterprise integrations, operational users demanded extreme data density, lightning-fast search filters, and actionable exception alerts that fit within their busy multi-tasking workflows.'
        ],
        quote: '“I don’t need beautiful empty white space. I need to see 150 shipping rows simultaneously and know exactly which container is stuck at customs.” — Supply Chain Operator Interview'
      },
      {
        heading: 'Product Strategy',
        content: [
          'We defined a product strategy focused on four core pillars: real-time container tracking, predictive supplier risk scoring, automated compliance tracking, and instant exception alerts.',
          'We engineered an integration architecture that connects natively with standard legacy ERP systems and major global carrier APIs, aggregating disparate data into a single, cohesive timeline view.'
        ]
      },
      {
        heading: 'Web App UI Design',
        content: [
          'The web application UI was designed for extreme high-density efficiency. We developed a highly structured dashboard utilizing custom-coded SVG data visualizations that communicate complex logistics paths and risk levels instantly.',
          'We created a multi-role workspace navigation structure allowing procurement leads to view overall financial risk profiles, while logistics operators can drill deep into container-level tracking details. Onboarding and empty states were carefully designed to lead operators through their first API setups smoothly.'
        ]
      },
      {
        heading: 'Marketing Website',
        content: [
          'The marketing website was built to convey absolute enterprise credibility. We focused the copy on direct business outcomes: cost reduction, lead time optimization, and operational resilience.',
          'We placed high-visibility compliance banners (SOC 2, GDPR) and active partner integration logos directly above the fold, designing a frictionless demo funnel that qualified prospective buyers based on annual logistics volume, leading to high-value leads.'
        ]
      },
      {
        heading: 'Design System & Scalability',
        content: [
          'To ensure seamless engineering handoffs across global developer squads, we built a comprehensive, token-driven component library in Figma and React.',
          'Every component—from data tables to status timeline pills—was meticulously documented with clear interactive states and design tokens, facilitating rapid product iteration and maintaining visual consistency across the platform.'
        ]
      },
      {
        heading: 'Results',
        content: [
          'Following launch, Kerno immediately captured enterprise interest, directly influencing over $40 Million in sales pipeline. The optimized marketing website drove a 24% boost in qualified demo requests, with pilot campaigns logging a phenomenal 82% demo-to-trial conversion rate.',
          'Ops users rated the dashboard with an exceptional System Usability Scale (SUS) score of 88, confirming the power of combining data density with clean UX.'
        ],
        quote: '“Kerno has finally given us a single source of truth for our global supply chain operations, saving us millions in delayed shipping penalties.” — VP of Global Logistics, Enterprise Client'
      },
      {
        heading: 'Enterprise Design Trade-offs',
        content: [
          'Designing for B2B SaaS required adapting standard consumer-grade UX habits. Rather than chasing minimalist design trends with vast white space, we optimized for data density and tabular efficiency.',
          'We learned that in enterprise contexts, true premium design is defined by utility, speed, and reliability—making massive datasets highly scannable and actionable under high-stress operating conditions.'
        ]
      }
    ]
  }
];
