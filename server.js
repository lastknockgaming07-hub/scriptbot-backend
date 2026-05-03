const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ============== NICHE KNOWLEDGE BASE ==============
const NICHE_PROFILES = {
  general: {
    description: "General mixed audience content",
    viralPatterns: "trending topics, broad appeal, relatable everyday moments",
    hashtags: "#reels #viral #trending #explore",
    pacing: "balanced — universal pacing",
  },
  finance: {
    description: "Personal finance, investing, money habits — Indian context",
    viralPatterns:
      "shocking statistics ('did you know 90% of Indians...'), wealth-building hacks, money mistakes, salary breakdowns, side hustle ideas, FIRE concept, mutual funds vs FD",
    hashtags:
      "#personalfinance #moneytips #investing #financialfreedom #moneymanagement #financebro #stocks #mutualfunds",
    hooks:
      "What if I told you... / The richest 1% do this... / Stop doing X if you want to be rich / I lost ₹X teaching you this lesson",
    pacing: "fast, data-heavy, with on-screen numbers",
  },
  fitness: {
    description: "Fitness, gym, nutrition, health transformation",
    viralPatterns:
      "transformation reveals, common mistakes, exercise demos, diet myths, motivation moments",
    hashtags:
      "#fitness #gymmotivation #workout #fitindia #healthylifestyle #transformation #fittips",
    hooks:
      "Stop doing this exercise / 90 days transformation / I tried X for 30 days / The secret to abs is...",
    pacing: "energetic, demo-heavy",
  },
  fashion: {
    description: "Fashion, styling, beauty, GRWM, hauls",
    viralPatterns:
      "outfit transitions, GRWM, styling hacks, before/after, trend reactions, designer dupes",
    hashtags:
      "#fashion #ootd #styletips #grwm #beauty #trendingfashion #stylehacks",
    hooks:
      "POV: you have a date in 1 hour / 5 outfits 1 jacket / Stop styling X like this",
    pacing: "aesthetic transitions, music-driven",
  },
  tech: {
    description: "Tech reviews, gadgets, AI, productivity tools",
    viralPatterns:
      "gadget reveals, AI tool demos, comparison tests, hidden features, productivity hacks",
    hashtags: "#tech #gadgets #ai #productivity #techreview #lifehack",
    hooks:
      "This AI just replaced my X / Hidden iPhone trick / I tested 5 AI tools so you don't have to",
    pacing: "punchy, demo-focused",
  },
  food: {
    description: "Food, cooking, recipes, restaurant reviews",
    viralPatterns:
      "POV cooking, recipe transitions, food hacks, restaurant reveals, mukbang reactions",
    hashtags:
      "#food #foodie #recipes #foodreels #cooking #indianfood #streetfood",
    hooks:
      "POV: 5-minute breakfast / This recipe broke the internet / Mom's secret recipe",
    pacing: "ASMR-style, satisfying transitions",
  },
  travel: {
    description: "Travel vlogs, destinations, budget travel, hidden gems",
    viralPatterns:
      "destination reveals, budget breakdowns, hidden spots, POV experiences, comparison",
    hashtags:
      "#travel #wanderlust #travelreels #incredibleindia #travelvlog #budgettravel",
    hooks:
      "₹5000 budget trip / This hidden spot in [city] / Don't visit X go here instead",
    pacing: "cinematic, music-led",
  },
  education: {
    description: "Career advice, study tips, exam prep, college life",
    viralPatterns:
      "study hacks, career mistakes, salary discussions, college vs reality, life lessons",
    hashtags:
      "#education #careeradvice #studentlife #studytips #careergrowth #college",
    hooks:
      "Things I wish I knew at 21 / This skill pays ₹50K+/month / College vs reality",
    pacing: "clear, structured, with examples",
  },
  comedy: {
    description: "Comedy, skits, observational humor, mimicry",
    viralPatterns:
      "relatable skits, character impressions, exaggeration, situational comedy, family jokes",
    hashtags:
      "#comedy #funny #relatable #standupcomedy #funnyreels #indiancomedy",
    hooks:
      "When you tell mom you have an exam / Indians be like / POV: you're the only sober one",
    pacing: "punchline-driven, exaggerated",
  },
  motivation: {
    description: "Self-improvement, mindset, success habits",
    viralPatterns:
      "morning routines, mindset shifts, success quotes, productivity, discipline content",
    hashtags:
      "#motivation #mindset #selfimprovement #success #grindset #discipline",
    hooks:
      "Stop being average / What 5am did to me / If you're 25 and broke watch this",
    pacing: "intense, gradual build, music-driven",
  },
  relationships: {
    description: "Dating, relationships, breakups, friendships",
    viralPatterns:
      "POV scenarios, red flags, green flags, situationship content, breakup advice",
    hashtags:
      "#relationship #dating #relatable #couplegoals #love #relationshipadvice",
    hooks:
      "Red flags I missed / POV: he texts you 'we need to talk' / Things only girls understand",
    pacing: "emotional, dialogue-heavy",
  },
  parenting: {
    description: "Parenting, kids, family moments",
    viralPatterns:
      "kid moments, parenting hacks, raising kids advice, family dynamics",
    hashtags: "#parenting #momlife #dadlife #parentinghacks #familytime",
    hooks:
      "Things only parents will get / If your kid does X / Indian moms be like",
    pacing: "warm, observational",
  },
  business: {
    description: "Startup, entrepreneurship, business strategy",
    viralPatterns:
      "founder stories, startup mistakes, business hacks, hiring/firing, growth tips",
    hashtags: "#business #entrepreneur #startup #businesstips #founder #hustle",
    hooks:
      "How I made my first ₹1L / Stop doing X if you run a business / The truth about being your own boss",
    pacing: "confident, story-driven",
  },
  psychology: {
    description: "Psychology, mindset, mental health, behavior",
    viralPatterns:
      "psychology facts, behavior patterns, mental health awareness, cognitive biases",
    hashtags: "#psychology #mindset #mentalhealth #selfaware #psychologyfacts",
    hooks:
      "Did you know your brain... / The reason you're anxious is... / People who do X are usually...",
    pacing: "thoughtful, slow reveal",
  },
  storytelling: {
    description: "Story-driven content, drama, romance, suspense",
    viralPatterns:
      "POV stories, plot twists, emotional moments, character-driven narratives",
    hashtags: "#storytime #pov #drama #storyreels #fiction",
    hooks:
      "I never told anyone this... / The day I... / My ex did something weird",
    pacing: "narrative-driven, dialogue-heavy",
  },
};

// ============== CREATOR VOICE STYLES ==============
const VOICE_STYLES = {
  auto: "Choose the best voice style for the niche and tone.",
  carryminati:
    "Sarcastic, roasting, fast-paced Hinglish. Direct address to camera. Heavy use of expressions like 'Bhai dekho', 'Ye banda dekho', dramatic pauses for punchlines. Gen-Z slang mixed with hindi. Energy: high, aggressive humor.",
  bbkivines:
    "Family-relatable Hindi humor. Slow build to punchline. Multiple character voices. Observational comedy about middle-class Indian families. Energy: warm, slow, climaxing in punchline.",
  dhruvrathee:
    "Calm, measured, factual. Educational tone with simple analogies. Uses data and examples. Hindi mixed with English technical terms. Energy: thoughtful, even-paced, authoritative.",
  ranveer:
    "Motivational, philosophical, deep. Slow-paced with dramatic pauses. Uses big concepts simplified. Energy: serious, intense, inspiring.",
  ankur:
    "Direct, no-nonsense, advice-driven. Numbered lists, clear structure. 'I'll tell you 3 things' format. Energy: efficient, knowledgeable, confident.",
  raj: "Thoughtful, podcast-style, interviewer energy. Asks questions, builds curiosity. Energy: introspective, conversational.",
  komal:
    "Fashion-forward, confident, aspirational. Quick transitions, styling tips, GRWM energy. Energy: chic, fast-paced, music-driven.",
  kusha:
    "Sharp wit, observational comedy, character voices. Sarcastic and quick. Energy: fast, punchy, observational.",
  mostlysane:
    "GenZ relatable, casual storytelling, dramatic facial expressions. Energy: bubbly, expressive, story-driven.",
  "finance-bro":
    "Confident, data-driven, 'let me break this down for you'. Lots of numbers and percentages. Energy: smart, clear, almost teacher-like.",
  "genz-storyteller":
    "Trendy slang ('bestie', 'lowkey', 'no cap'), dramatic emotional, fast-paced. Energy: emotional, expressive, modern.",
  storytime:
    "First-person POV, immersive narrative voice. 'So this happened...', dramatic pauses, emotional beats. Energy: confessional, gripping.",
  luxury:
    "Slow, aesthetic, premium. Minimal words, lots of ambient visuals. Whisper-like delivery. Energy: refined, sophisticated, ASMR-adjacent.",
};

// ============== ⭐ NEW: NATIVE LANGUAGE GUIDES ==============
const LANGUAGE_GUIDES = {
  English: `LANGUAGE: ENGLISH
- Use clean, conversational English
- Use modern slang where appropriate (lowkey, deadass, no cap, bestie, vibe, slay)
- Avoid formal/textbook phrases
- Sound like a 22-year-old creator, not a news anchor`,

  Hindi: `LANGUAGE: HINDI (NATIVE — CRITICAL)
- Write in NATURAL spoken Hindi like real creators speak — NOT formal/translated Hindi
- Use everyday spoken words: "matlab", "yaar", "bro", "literally", "actually", "abey"
- Avoid pure Sanskrit-Hindi or news-anchor Hindi (e.g., AVOID "vyakti", "samajh", "mahatva" — USE "banda", "samajh aaya?", "important")
- Code-switch with English where natural — Hindi creators mix English words constantly
- Examples of NATIVE delivery:
  ✅ "Bhai sun, ye scene dekh"
  ✅ "Yaar tu literally pagal hai"
  ✅ "Wait wait wait, ek minute"
  ❌ "Mitra, is drishya ko avalokit kariye" (way too formal)
  ❌ "Bhaiya yeh dekha jaaye" (Google translate vibe)
- Use natural exclamations: "abey!", "are bhai!", "haila!", "kya baat hai!", "uff!"
- Match how real Mumbai/Delhi 20-something creators speak on Instagram TODAY`,

  Hinglish: `LANGUAGE: HINGLISH (NATIVE — CRITICAL)
- Hinglish is NOT translating English to Hindi. It's how urban Indians actually speak.
- Mix English and Hindi naturally — code-switch within sentences
- Use English words for: technical terms, modern concepts, emotional expressions
- Use Hindi words for: emotions, family, cultural references, casual flow
- Examples of NATIVE Hinglish:
  ✅ "Bhai literally main shocked tha when she said yes"
  ✅ "Yaar ye toh next level hai, I can't even"
  ✅ "Mom ne deadass roast kar diya mujhe yesterday"
  ✅ "Wait, ye actually genius idea hai"
  ❌ "Bhai sach mein main hairaan tha jab usne haan kahi" (too pure Hindi)
  ❌ "Brother, this is actually a wonderful idea" (too pure English)
- Use GenZ Hinglish slang: "lowkey", "highkey", "literally", "deadass", "no cap", "vibe", "tea", "slay"
- Match how creators like Kusha Kapila, Prajakta Koli, Ranveer Allahbadia ACTUALLY speak on camera`,

  Tamil: `LANGUAGE: TAMIL
- Use natural Tamil with English code-switching where common
- Avoid formal/literary Tamil — use spoken everyday Tamil
- Mix in English words naturally where Tamil creators do (especially tech/modern terms)`,

  Telugu: `LANGUAGE: TELUGU
- Use natural Telugu with English code-switching where common
- Avoid formal/literary Telugu — use spoken everyday Telugu
- Mix in English words naturally`,

  Punjabi: `LANGUAGE: PUNJABI
- Use natural spoken Punjabi
- Mix Hindi/English naturally where Punjabi creators do
- Energetic, expressive delivery typical of Punjabi creators`,

  Bengali: `LANGUAGE: BENGALI
- Use natural spoken Bengali
- Mix English naturally where common
- Avoid overly formal Bengali`,
};

const CREATIVE_SEEDS = [
  "an unexpected weather change",
  "a misplaced object",
  "a wrong-number text",
  "a forgotten name",
  "an overheard conversation",
  "a stuck elevator",
  "a power cut",
  "a shared umbrella",
  "a borrowed charger",
  "a wrong order at a cafe",
  "a printer jam",
  "a missed bus",
  "a ringing phone left behind",
  "a sudden silence",
  "an unread message",
  "a Monday morning",
  "spilled water bottle",
  "a broken pen",
  "a notification at 3am",
  "a familiar perfume",
  "a song playing somewhere",
  "a déjà vu moment",
  "a lost wallet",
  "a bookmarked page",
  "an unsent voice note",
  "a half-eaten meal",
  "a parking lot meeting",
  "a delayed flight",
  "a wrong floor in the elevator",
  "a sticky note on a desk",
  "shared earphones",
  "a falling pen",
  "a question with no answer",
  "a rainy bus stop",
  "a quiet library moment",
];

const STRUCTURE_VARIATIONS = [
  "Hook → Context → Conflict → Twist → Clear Resolution",
  "Question → Promise → Story → Reveal → Strong CTA",
  "Statement → Doubt → Evidence → Surprise → Punchline",
  "Memory → Present → Realization → Decision → Final beat",
  "Action → Reaction → Backstory → Climax → Aftermath",
  "Observation → Curiosity → Investigation → Discovery → Closure",
];

function pickRandom(arr, count = 1) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return count === 1 ? shuffled[0] : shuffled.slice(0, count);
}

function buildSystemPrompt(opts, versionLabel = "A") {
  const {
    mode,
    platform,
    lang,
    duration,
    tone,
    goal,
    audience,
    persona,
    speaker,
    niche,
    voiceStyle,
    parts,
    storyReels,
    storyType,
    useVisual,
    isContinue,
    previousScript,
  } = opts;

  const nicheData = NICHE_PROFILES[niche] || NICHE_PROFILES.general;
  const voiceData = VOICE_STYLES[voiceStyle] || VOICE_STYLES.auto;
  const langGuide = LANGUAGE_GUIDES[lang] || LANGUAGE_GUIDES.English;
  const randomSeeds = pickRandom(CREATIVE_SEEDS, 5);
  const randomStructure = pickRandom(STRUCTURE_VARIATIONS);

  let modeSection = "";
  if (mode === "single") {
    modeSection = `MODE: SINGLE REEL — Generate ONE COMPLETE viral reel.

CRITICAL COMPLETENESS:
- Clear ending — never stop mid-thought
- Final 1-3 seconds MUST be: a satisfying punchline, clear resolution, or strong CTA
- Last line should feel CONCLUSIVE`;
  } else if (mode === "series") {
    modeSection = `MODE: SERIES — Create ${parts} connected parts.
Part 1: Strong hook + Setup + Cliffhanger
Each next part: Escalation + new twist + cliffhanger
Final part: COMPLETE PAYOFF + clear resolution + CTA`;
  } else if (mode === "story") {
    modeSection = `MODE: STORY — Break ONE complete short story into ${storyReels} connected reels.
Story Type: ${storyType}
- Maintain SAME characters throughout
- Each reel ends with cliffhanger
- Final reel MUST have proper resolution`;
  }

  const versionInstruction =
    versionLabel === "B"
      ? `
============================================
VERSION B INSTRUCTIONS (CRITICAL)
============================================
This is Version B. It MUST be COMPLETELY DIFFERENT from Version A in:
- Opening angle / hook approach
- Narrative perspective
- Structure
- Tone variations
- Punchline / payoff

Use a DIFFERENT structure than typical: ${randomStructure}
Use a DIFFERENT creative seed for the opening.
This must feel like a completely fresh take on the same topic.
============================================
`
      : "";

  const nicheSection = `
============================================
NICHE SPECIALIZATION: ${niche.toUpperCase()}
============================================
${nicheData.description}

VIRAL PATTERNS for this niche:
${nicheData.viralPatterns}

HOOK PATTERNS that work in this niche:
${nicheData.hooks || "Use general viral hook patterns"}

PACING: ${nicheData.pacing}

USE THESE HASHTAGS in caption section: ${nicheData.hashtags}
============================================`;

  const voiceSection = `
============================================
CREATOR VOICE STYLE
============================================
${voiceData}

CRITICAL: The script's audio/dialogue MUST sound like this creator's voice. Not Claude's voice. Not generic. Match their cadence, vocabulary, energy.
============================================`;

  // ⭐ NEW: NATIVE LANGUAGE SECTION
  const languageSection = `
============================================
NATIVE LANGUAGE AUTHENTICITY (CRITICAL)
============================================
${langGuide}

GOLDEN RULE FOR LANGUAGE:
The script must sound like a REAL Indian creator on Instagram speaking — NOT like a translated foreign script. If you're writing in Hindi or Hinglish, EVERY line should feel like something a 22-year-old Mumbai/Delhi creator would actually say to camera. Read each AUDIO line aloud — if it sounds like Google Translate or a textbook, REWRITE it.

Be especially careful with:
- Don't translate English idioms literally
- Use natural conjunctions ("toh", "aur", "phir", "matlab")
- Use real exclamations ("abey", "yaar", "bhai", "uff")
- Match the way creators ACTUALLY talk on camera, not how they write essays
============================================`;

  const antiRepetition = `
============================================
ANTI-REPETITION (CRITICAL)
============================================
NEVER use these clichés:
- Hand reaching for coffee mug
- Eye contact across office
- "POV: you..." opening
- "Wait..." or "So..." opening
- Bumping into someone in hallway
- Two people reaching for same thing

Build opening around ONE of these (or invent fresh):
${randomSeeds.map((s) => `- ${s}`).join("\n")}

STRUCTURE: ${randomStructure}
Random seed: ${Math.random().toString(36).slice(2, 10).toUpperCase()}
============================================`;

  let speakerSection = "";
  if (speaker && speaker.trim()) {
    speakerSection = `SPEAKER / CHARACTER: ${speaker}
- Write FROM THIS PERSPECTIVE
- Multiple characters? Label each line with name
- Match vocabulary to character`;
  }

  let formatSection = "";
  if (useVisual) {
    formatSection = `SCREENPLAY FORMAT (mandatory):
For each timestamp use EXACTLY:

[0-2s] HOOK
SPEAKER: ${speaker ? "(specific character name)" : "(name or describe)"}
VISUAL: (specific detailed shot — NOT cliché)
AUDIO: (exact words spoken in the creator's voice style — in NATIVE ${lang})
ON-SCREEN TEXT: (text overlay, or "None")
SPEAKER TONE: (specific delivery direction)

Use section names: HOOK, SETUP, CONTEXT, BUILD, TENSION, TWIST, REVEAL, PAYOFF, RESOLUTION, CTA`;
  }

  let continueSection = "";
  if (isContinue && previousScript) {
    continueSection = `CONTINUATION MODE: Match exact style of previous reel.
PREVIOUS REEL:
${previousScript}
`;
  }

  return `You are an elite short-form content strategist specializing in ${platform}.

You are NOT a generic script writer. You are a niche-specialized, voice-aware, NATIVE-language-fluent viral content engine for Indian creators.

${versionInstruction}

${modeSection}

${continueSection}

${speakerSection}

${nicheSection}

${voiceSection}

${languageSection}

${antiRepetition}

CORE RULES:
1. Retention first — strong hook in first 1-2 seconds. Pattern interrupts every 3-5 seconds.
2. Specific to ${niche} niche — use niche-appropriate references, not generic.
3. EVERY SCRIPT MUST BE COMPLETE with proper resolution.
4. Match the chosen creator voice style — not generic AI voice.
5. NATIVE LANGUAGE — sound like a real creator, not a translation.
${speaker ? "6. Always write from perspective of: " + speaker : ""}

${formatSection}

OUTPUT FORMAT — use these EXACT section headers in plain text (no emojis, no markdown):

MAIN SCRIPT
${mode === "story" || mode === "series" ? `(Each reel/part separately with header "REEL 1: [TITLE]" or "PART 1: [TITLE]")` : "(Time-stamped flow with hook, body, climax, AND resolution)"}

HOOK QUALITY SCORE
(Self-assess your own hook on scale of 1-100. Format as "85/100" then a 1-2 line explanation of why this score. Be honest. A 95+ hook MUST be genuinely scroll-stopping. A 70 is decent but improvable.)

HOOK VARIATIONS
(3 different hook styles — Option 1, Option 2, Option 3. Each in NATIVE ${lang}. Each uses different angle.)

SHOT SUGGESTIONS
(Specific camera angles, B-roll, transitions for ${niche} niche)

CAPTION AND HASHTAGS
(${mode === "story" || mode === "series" ? "Caption per reel" : "One caption"} matching ${niche} niche, written in NATIVE ${lang}. Use these hashtags: ${nicheData.hashtags})

TRENDING AUDIO SUGGESTIONS
(3-4 audio types appropriate for ${niche}. Describe vibe + when to use it. Be specific to platform.)

THUMBNAIL COVER FRAME IDEAS
(2-3 first-frame ideas with specific expression, color, text)

GEAR AND PRODUCTION CHECKLIST
(Format as sections like:
EQUIPMENT NEEDED:
- [item 1]
- [item 2]

LOCATION:
- [location idea 1]
- [location idea 2]

PROPS:
- [prop 1]
- [prop 2]

PEOPLE NEEDED:
- [role 1]
- [role 2]
)

PERFORMANCE IMPROVEMENTS
(SPECIFIC actionable tips for THIS script — not generic. Where retention drops + niche-specific fixes. Use bullets.)

EXTRA IDEAS
(3 follow-up content ideas specific to ${niche} niche)

QUALITY CHECK:
- Hook genuinely scroll-stopping?
- Voice matches ${voiceStyle}?
- LANGUAGE FEELS NATIVE — not translated?
- Niche-specific not generic?
- Complete with resolution?
- All sections present?

CRITICAL FINAL CHECK FOR HINDI/HINGLISH:
Before outputting, re-read every AUDIO line. If ANY line feels like Google Translate or formal news-anchor Hindi, REWRITE it to sound like how a real Mumbai/Delhi 22-year-old creator speaks on camera RIGHT NOW.

DO NOT use markdown # or ##. NO emojis in section headers.`;
}

app.post("/generate", async (req, res) => {
  const opts = req.body;
  if (!opts.topic) return res.status(400).json({ error: "Topic is required" });

  const generateAB = opts.generateAB !== false;

  try {
    const promptA = buildSystemPrompt(opts, "A");
    const userMsg = `Create a complete viral content package:

Topic: ${opts.topic}
Platform: ${opts.platform}
Language: ${opts.lang} (CRITICAL: write in NATIVE ${opts.lang} — sound like real creator, not translated)
Duration: ${opts.duration}
Tone: ${opts.tone}
Goal: ${opts.goal}
Niche: ${opts.niche}
Voice Style: ${opts.voiceStyle}
Audience: ${opts.audience || "General"}
Speaker: ${opts.speaker || "Auto"}
Mode: ${opts.mode === "single" ? "Single Reel" : opts.mode === "series" ? `Series — ${opts.parts} parts` : `Story — ${opts.storyReels} reels of ${opts.storyType}`}

Make it niche-specific, voice-matched, COMPLETE with resolution, ORIGINAL, and 100% NATIVE in ${opts.lang}.`;

    const resA = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 5000,
        temperature: 1.0,
        system: promptA,
        messages: [{ role: "user", content: userMsg }],
      }),
    });
    const dataA = await resA.json();
    if (!resA.ok)
      return res
        .status(500)
        .json({ error: dataA.error?.message || "API error" });
    const versionA = dataA.content[0].text;

    let versionB = null;
    if (generateAB) {
      const promptB = buildSystemPrompt(opts, "B");
      const resB = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 5000,
          temperature: 1.0,
          system: promptB,
          messages: [
            {
              role: "user",
              content:
                userMsg +
                "\n\nThis is Version B — must be a COMPLETELY DIFFERENT take from typical approach. Different opening, different structure, different angle. Same NATIVE language quality.",
            },
          ],
        }),
      });
      const dataB = await resB.json();
      if (resB.ok) versionB = dataB.content[0].text;
    }

    res.json({ versionA, versionB });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/edit", async (req, res) => {
  const { script, instruction } = req.body;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 5000,
        temperature: 0.9,
        system:
          "You are ScriptBot, an elite content editor for Indian creators. Edit the script based on instruction. Keep ALL section headers intact (MAIN SCRIPT, HOOK QUALITY SCORE, HOOK VARIATIONS, SHOT SUGGESTIONS, CAPTION AND HASHTAGS, TRENDING AUDIO SUGGESTIONS, THUMBNAIL COVER FRAME IDEAS, GEAR AND PRODUCTION CHECKLIST, PERFORMANCE IMPROVEMENTS, EXTRA IDEAS). Keep [time] SECTION format and SPEAKER/VISUAL/AUDIO/ON-SCREEN TEXT/SPEAKER TONE labels. Avoid clichés. Ensure complete ending. Update HOOK QUALITY SCORE. CRITICAL: Maintain NATIVE language quality — Hindi/Hinglish must sound like real creator speech, not translation. Return FULL package in plain text, no emojis, no markdown.",
        messages: [
          {
            role: "user",
            content: `Original:\n${script}\n\nInstruction: ${instruction}`,
          },
        ],
      }),
    });
    const data = await response.json();
    if (!response.ok)
      return res
        .status(500)
        .json({ error: data.error?.message || "API error" });
    res.json({ versionA: data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("ScriptBot backend v4.1 (Native Language) is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    "ScriptBot server v4.1 (Native Language) running on port " + PORT,
  );
});
