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
    pacing: "balanced — universal pacing"
  },
  finance: {
    description: "Personal finance, investing, money habits — Indian context",
    viralPatterns: "shocking statistics ('did you know 90% of Indians...'), wealth-building hacks, money mistakes, salary breakdowns, side hustle ideas, FIRE concept, mutual funds vs FD",
    hashtags: "#personalfinance #moneytips #investing #financialfreedom #moneymanagement #financebro #stocks #mutualfunds",
    hooks: "What if I told you... / The richest 1% do this... / Stop doing X if you want to be rich / I lost ₹X teaching you this lesson",
    pacing: "fast, data-heavy, with on-screen numbers"
  },
  fitness: {
    description: "Fitness, gym, nutrition, health transformation",
    viralPatterns: "transformation reveals, common mistakes, exercise demos, diet myths, motivation moments",
    hashtags: "#fitness #gymmotivation #workout #fitindia #healthylifestyle #transformation #fittips",
    hooks: "Stop doing this exercise / 90 days transformation / I tried X for 30 days / The secret to abs is...",
    pacing: "energetic, demo-heavy"
  },
  fashion: {
    description: "Fashion, styling, beauty, GRWM, hauls",
    viralPatterns: "outfit transitions, GRWM, styling hacks, before/after, trend reactions, designer dupes",
    hashtags: "#fashion #ootd #styletips #grwm #beauty #trendingfashion #stylehacks",
    hooks: "POV: you have a date in 1 hour / 5 outfits 1 jacket / Stop styling X like this",
    pacing: "aesthetic transitions, music-driven"
  },
  tech: {
    description: "Tech reviews, gadgets, AI, productivity tools",
    viralPatterns: "gadget reveals, AI tool demos, comparison tests, hidden features, productivity hacks",
    hashtags: "#tech #gadgets #ai #productivity #techreview #lifehack",
    hooks: "This AI just replaced my X / Hidden iPhone trick / I tested 5 AI tools so you don't have to",
    pacing: "punchy, demo-focused"
  },
  food: {
    description: "Food, cooking, recipes, restaurant reviews",
    viralPatterns: "POV cooking, recipe transitions, food hacks, restaurant reveals, mukbang reactions",
    hashtags: "#food #foodie #recipes #foodreels #cooking #indianfood #streetfood",
    hooks: "POV: 5-minute breakfast / This recipe broke the internet / Mom's secret recipe",
    pacing: "ASMR-style, satisfying transitions"
  },
  travel: {
    description: "Travel vlogs, destinations, budget travel, hidden gems",
    viralPatterns: "destination reveals, budget breakdowns, hidden spots, POV experiences, comparison",
    hashtags: "#travel #wanderlust #travelreels #incredibleindia #travelvlog #budgettravel",
    hooks: "₹5000 budget trip / This hidden spot in [city] / Don't visit X go here instead",
    pacing: "cinematic, music-led"
  },
  education: {
    description: "Career advice, study tips, exam prep, college life",
    viralPatterns: "study hacks, career mistakes, salary discussions, college vs reality, life lessons",
    hashtags: "#education #careeradvice #studentlife #studytips #careergrowth #college",
    hooks: "Things I wish I knew at 21 / This skill pays ₹50K+/month / College vs reality",
    pacing: "clear, structured, with examples"
  },
  comedy: {
    description: "Comedy, skits, observational humor, mimicry",
    viralPatterns: "relatable skits, character impressions, exaggeration, situational comedy, family jokes",
    hashtags: "#comedy #funny #relatable #standupcomedy #funnyreels #indiancomedy",
    hooks: "When you tell mom you have an exam / Indians be like / POV: you're the only sober one",
    pacing: "punchline-driven, exaggerated"
  },
  motivation: {
    description: "Self-improvement, mindset, success habits",
    viralPatterns: "morning routines, mindset shifts, success quotes, productivity, discipline content",
    hashtags: "#motivation #mindset #selfimprovement #success #grindset #discipline",
    hooks: "Stop being average / What 5am did to me / If you're 25 and broke watch this",
    pacing: "intense, gradual build, music-driven"
  },
  relationships: {
    description: "Dating, relationships, breakups, friendships",
    viralPatterns: "POV scenarios, red flags, green flags, situationship content, breakup advice",
    hashtags: "#relationship #dating #relatable #couplegoals #love #relationshipadvice",
    hooks: "Red flags I missed / POV: he texts you 'we need to talk' / Things only girls understand",
    pacing: "emotional, dialogue-heavy"
  },
  parenting: {
    description: "Parenting, kids, family moments",
    viralPatterns: "kid moments, parenting hacks, raising kids advice, family dynamics",
    hashtags: "#parenting #momlife #dadlife #parentinghacks #familytime",
    hooks: "Things only parents will get / If your kid does X / Indian moms be like",
    pacing: "warm, observational"
  },
  business: {
    description: "Startup, entrepreneurship, business strategy",
    viralPatterns: "founder stories, startup mistakes, business hacks, hiring/firing, growth tips",
    hashtags: "#business #entrepreneur #startup #businesstips #founder #hustle",
    hooks: "How I made my first ₹1L / Stop doing X if you run a business / The truth about being your own boss",
    pacing: "confident, story-driven"
  },
  psychology: {
    description: "Psychology, mindset, mental health, behavior",
    viralPatterns: "psychology facts, behavior patterns, mental health awareness, cognitive biases",
    hashtags: "#psychology #mindset #mentalhealth #selfaware #psychologyfacts",
    hooks: "Did you know your brain... / The reason you're anxious is... / People who do X are usually...",
    pacing: "thoughtful, slow reveal"
  },
  storytelling: {
    description: "Story-driven content, drama, romance, suspense",
    viralPatterns: "POV stories, plot twists, emotional moments, character-driven narratives",
    hashtags: "#storytime #pov #drama #storyreels #fiction",
    hooks: "I never told anyone this... / The day I... / My ex did something weird",
    pacing: "narrative-driven, dialogue-heavy"
  }
};

// ============== CREATOR VOICE STYLES ==============
const VOICE_STYLES = {
  auto: "Choose the best voice style for the niche and tone.",
  carryminati: "Sarcastic, roasting, fast-paced Hinglish. Direct address to camera. Heavy use of expressions like 'Bhai dekho', 'Ye banda dekho', dramatic pauses for punchlines. Gen-Z slang mixed with hindi. Energy: high, aggressive humor.",
  bbkivines: "Family-relatable Hindi humor. Slow build to punchline. Multiple character voices. Observational comedy about middle-class Indian families. Energy: warm, slow, climaxing in punchline.",
  dhruvrathee: "Calm, measured, factual. Educational tone with simple analogies. Uses data and examples. Hindi mixed with English technical terms. Energy: thoughtful, even-paced, authoritative.",
  ranveer: "Motivational, philosophical, deep. Slow-paced with dramatic pauses. Uses big concepts simplified. Energy: serious, intense, inspiring.",
  ankur: "Direct, no-nonsense, advice-driven. Numbered lists, clear structure. 'I'll tell you 3 things' format. Energy: efficient, knowledgeable, confident.",
  raj: "Thoughtful, podcast-style, interviewer energy. Asks questions, builds curiosity. Energy: introspective, conversational.",
  komal: "Fashion-forward, confident, aspirational. Quick transitions, styling tips, GRWM energy. Energy: chic, fast-paced, music-driven.",
  kusha: "Sharp wit, observational comedy, character voices. Sarcastic and quick. Energy: fast, punchy, observational.",
  mostlysane: "GenZ relatable, casual storytelling, dramatic facial expressions. Energy: bubbly, expressive, story-driven.",
  "finance-bro": "Confident, data-driven, 'let me break this down for you'. Lots of numbers and percentages. Energy: smart, clear, almost teacher-like.",
  "genz-storyteller": "Trendy slang ('bestie', 'lowkey', 'no cap'), dramatic emotional, fast-paced. Energy: emotional, expressive, modern.",
  storytime: "First-person POV, immersive narrative voice. 'So this happened...', dramatic pauses, emotional beats. Energy: confessional, gripping.",
  luxury: "Slow, aesthetic, premium. Minimal words, lots of ambient visuals. Whisper-like delivery. Energy: refined, sophisticated, ASMR-adjacent."
};

// ============== NATIVE LANGUAGE GUIDES ==============
const LANGUAGE_GUIDES = {
  English: `LANGUAGE: ENGLISH
- Use clean, conversational English
- Use modern slang where appropriate (lowkey, deadass, no cap, bestie, vibe, slay)
- Avoid formal/textbook phrases
- Sound like a 22-year-old creator, not a news anchor`,

  Hindi: `LANGUAGE: HINDI (NATIVE — CRITICAL)
- Write in NATURAL spoken Hindi like real creators speak — NOT formal/translated Hindi
- Use everyday spoken words: "matlab", "yaar", "bro", "literally", "actually", "abey"
- Avoid pure Sanskrit-Hindi or news-anchor Hindi
- Code-switch with English where natural — Hindi creators mix English words constantly
- Use natural exclamations: "abey!", "are bhai!", "haila!", "kya baat hai!", "uff!"
- Match how real Mumbai/Delhi 20-something creators speak on Instagram TODAY`,

  Hinglish: `LANGUAGE: HINGLISH (NATIVE — CRITICAL)
- Hinglish is NOT translating English to Hindi. It's how urban Indians actually speak.
- Mix English and Hindi naturally — code-switch within sentences
- Use English words for: technical terms, modern concepts, emotional expressions
- Use Hindi words for: emotions, family, cultural references, casual flow
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
- Avoid overly formal Bengali`
};

const CREATIVE_SEEDS = [
  "an unexpected weather change", "a misplaced object", "a wrong-number text", "a forgotten name",
  "an overheard conversation", "a stuck elevator", "a power cut", "a shared umbrella",
  "a borrowed charger", "a wrong order at a cafe", "a printer jam", "a missed bus",
  "a ringing phone left behind", "a sudden silence", "an unread message", "a Monday morning"
];

const STRUCTURE_VARIATIONS = [
  "Hook → Context → Conflict → Twist → Clear Resolution",
  "Question → Promise → Story → Reveal → Strong CTA",
  "Statement → Doubt → Evidence → Surprise → Punchline",
  "Memory → Present → Realization → Decision → Final beat",
  "Action → Reaction → Backstory → Climax → Aftermath",
  "Observation → Curiosity → Investigation → Discovery → Closure"
];

function pickRandom(arr, count = 1) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return count === 1 ? shuffled[0] : shuffled.slice(0, count);
}

function buildSystemPrompt(opts, versionLabel = 'A') {
  const { mode, platform, lang, duration, tone, goal, audience, persona, speaker, niche, voiceStyle, parts, storyReels, storyType, useVisual, isContinue, previousScript } = opts;

  const nicheData = NICHE_PROFILES[niche] || NICHE_PROFILES.general;
  const voiceData = VOICE_STYLES[voiceStyle] || VOICE_STYLES.auto;
  const langGuide = LANGUAGE_GUIDES[lang] || LANGUAGE_GUIDES.English;
  const randomSeeds = pickRandom(CREATIVE_SEEDS, 5);
  const randomStructure = pickRandom(STRUCTURE_VARIATIONS);

  let modeSection = '';
  if (mode === 'single') {
    modeSection = `MODE: SINGLE REEL — Generate ONE COMPLETE viral reel.

CRITICAL COMPLETENESS:
- Clear ending — never stop mid-thought
- Final 1-3 seconds MUST be: a satisfying punchline, clear resolution, or strong CTA
- Last line should feel CONCLUSIVE`;
  } else if (mode === 'series') {
    modeSection = `MODE: SERIES — Create ${parts} connected parts.
Part 1: Strong hook + Setup + Cliffhanger
Each next part: Escalation + new twist + cliffhanger
Final part: COMPLETE PAYOFF + clear resolution + CTA`;
  } else if (mode === 'story') {
    modeSection = `MODE: STORY — Break ONE complete short story into ${storyReels} connected reels.
Story Type: ${storyType}
- Maintain SAME characters throughout
- Each reel ends with cliffhanger
- Final reel MUST have proper resolution`;
  }

  const versionInstruction = versionLabel === 'B' ? `
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
` : '';

  const nicheSection = `
============================================
NICHE SPECIALIZATION: ${niche.toUpperCase()}
============================================
${nicheData.description}

VIRAL PATTERNS for this niche:
${nicheData.viralPatterns}

HOOK PATTERNS that work in this niche:
${nicheData.hooks || 'Use general viral hook patterns'}

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

  const languageSection = `
============================================
NATIVE LANGUAGE AUTHENTICITY (CRITICAL)
============================================
${langGuide}

GOLDEN RULE FOR LANGUAGE:
The script must sound like a REAL Indian creator on Instagram speaking — NOT like a translated foreign script. If you're writing in Hindi or Hinglish, EVERY line should feel like something a 22-year-old Mumbai/Delhi creator would actually say to camera. Read each AUDIO line aloud — if it sounds like Google Translate or a textbook, REWRITE it.
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
${randomSeeds.map(s => `- ${s}`).join('\n')}

STRUCTURE: ${randomStructure}
Random seed: ${Math.random().toString(36).slice(2, 10).toUpperCase()}
============================================`;

  let speakerSection = '';
  if (speaker && speaker.trim()) {
    speakerSection = `SPEAKER / CHARACTER: ${speaker}
- Write FROM THIS PERSPECTIVE
- Multiple characters? Label each line with name
- Match vocabulary to character`;
  }

  let formatSection = '';
  if (useVisual) {
    formatSection = `SCREENPLAY FORMAT (mandatory):

═══════════════════════════════════════════════════════════
THE VIRAL STRUCTURE — ALL SCRIPTS MUST FOLLOW THIS EXACT ARC
═══════════════════════════════════════════════════════════

Every script breaks into 5 functional zones. Label each zone clearly.
The viewer's brain experiences this journey:

1. HOOK (0-3s) — Stop the scroll
   Function: Pattern-break their feed. Create curiosity gap or shock.
   
2. PATTERN INTERRUPT (3-5s) — Break visual monotony
   Function: Fast cut, location change, angle shift. Re-grab attention.
   
3. STORY / VALUE DELIVERY (5s to ~75% of duration) — Earn the watch
   Function: Deliver on hook's promise. Build through 2-3 layered beats.
   Each beat opens a mini-loop ("but here's the thing...") to hold them.
   
4. RETENTION LOOP (~75-90% of duration) — Engineer the save/share
   Function: Open a NEW question right before the end. Forces save/rewatch.
   Critical: This is what turns views into SAVES.
   
5. CTA (last 2-3s) — Convert
   Function: Specific action tied to GOAL (${goal || 'engagement'}).
   NEVER generic "follow for more". Specific value next time.

═══════════════════════════════════════════════════════════
SECTION FORMAT
═══════════════════════════════════════════════════════════

Each timestamp block uses this label structure (never add new labels, but make each label DENSE and SPECIFIC):

[0-3s] HOOK · [name the hook pattern: e.g., "Shock + Specific Number" / "Confession" / "Curiosity Gap"]
SPEAKER: (concrete character — age, wardrobe, posture, energy. Example: "Rohan, 19, oversized hoodie, sitting cross-legged on unmade bed")
VISUAL: (DENSE — location + lighting + camera move + action. Example: "Cluttered teenage bedroom, golden hour light through half-closed blinds. Push-in from medium to close-up, slight handheld shake. He looks up suddenly from screen.")
AUDIO: (exact words in NATIVE ${lang} + ambient sound. Example: "Bhai... yeh real hai? [pause, holds phone toward camera]" + "Faint laptop fan hum. NO music yet")
ON-SCREEN TEXT: (specific text + animation, or "None")
SPEAKER TONE: (delivery direction + subtext — what they MEAN beneath what they SAY)
WHY IT WORKS: (1 sentence — explain the psychological mechanism)

[3-5s] PATTERN INTERRUPT
(Same label structure. Add a clear visual/audio break — whip-pan, cut to new location, sudden silence, dramatic angle change)

[5-Xs] STORY · BEAT 1 / BEAT 2 / BEAT 3
(Same label structure. Each beat = one new piece of value or one twist. Each beat ends with an open loop hook for next beat. Number them: BEAT 1, BEAT 2, etc.)

[X-Ys] RETENTION LOOP
(Same label structure. Open a NEW curiosity loop here — "but the biggest mistake is..." — and then CUT before resolving it. This drives saves & rewatches.)

[last 2-3s] CTA · GOAL: ${goal || 'engagement'}
(Same label structure. Tie CTA directly to the goal. Promise specific value. NEVER "follow for more". Use formats like "Tomorrow's reel: [specific topic]" or "Save this for when you need it" or "DM me '[keyword]' for the template")

═══════════════════════════════════════════════════════════
DENSITY RULES (CRITICAL)
═══════════════════════════════════════════════════════════

- VISUAL must include: location specific + lighting + camera move + action — never just "boy looks at camera"
- SPEAKER must include character traits: age + wardrobe + posture + energy
- AUDIO must include ambient/sound design notes alongside dialogue (silence is also a choice)
- SPEAKER TONE must include subtext — what they MEAN beneath what they SAY
- WHY IT WORKS must explain the psychology — not generic "this is engaging"
- Use specific concrete details: real time of day, real wardrobe, real prop, real number — not vague placeholders
- Each scene should feel like a real creator + DOP planned it together

CRITICAL: The 5 zones (HOOK, PATTERN INTERRUPT, STORY, RETENTION LOOP, CTA) must ALL be present. This is non-negotiable. Even in a 15-second reel.`;
  }

  let continueSection = '';
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
${speaker ? '6. Always write from perspective of: ' + speaker : ''}

${formatSection}

OUTPUT FORMAT — use these EXACT section headers in plain text (no emojis, no markdown):

MAIN SCRIPT
${mode === 'story' || mode === 'series' ? `(Each reel/part separately with header "REEL 1: [TITLE]" or "PART 1: [TITLE]")` : '(Time-stamped flow with hook, body, climax, AND resolution)'}

HOOK QUALITY SCORE
(Self-assess your own hook on scale of 1-100. Format as "85/100" then a 1-2 line explanation. Be honest.)

HOOK VARIATIONS
(3 different hook styles — Option 1, Option 2, Option 3. Each in NATIVE ${lang}.)

SHOT SUGGESTIONS
(Specific camera angles, B-roll, transitions for ${niche} niche)

CAPTION AND HASHTAGS
(${mode === 'story' || mode === 'series' ? 'Caption per reel' : 'One caption'} matching ${niche} niche, written in NATIVE ${lang}. Use these hashtags: ${nicheData.hashtags})

TRENDING AUDIO SUGGESTIONS
(3-4 audio types appropriate for ${niche}.)

THUMBNAIL COVER FRAME IDEAS
(2-3 first-frame ideas with specific expression, color, text)

GEAR AND PRODUCTION CHECKLIST
(Format as sections like:
EQUIPMENT NEEDED:
- [item 1]

LOCATION:
- [location idea 1]

PROPS:
- [prop 1]

PEOPLE NEEDED:
- [role 1]
)

PERFORMANCE IMPROVEMENTS
(SPECIFIC actionable tips for THIS script.)

EXTRA IDEAS
(3 follow-up content ideas specific to ${niche} niche)

DO NOT use markdown # or ##. NO emojis in section headers.`;
}

// ============== AUTO-RETRY LOGIC ==============
// Retries up to 3 times when Anthropic API returns "overloaded" errors
async function callAnthropicWithRetry(payload, maxRetries = 3) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Attempt ${attempt}/${maxRetries}] Calling Anthropic API...`);

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        if (attempt > 1) {
          console.log(`✓ Success on attempt ${attempt}`);
        }
        return { ok: true, data };
      }

      // Check if it's a retryable error (overloaded, rate limit, server errors)
      const errorMsg = (data.error?.message || '').toLowerCase();
      const errorType = (data.error?.type || '').toLowerCase();
      const isRetryable =
        errorMsg.includes('overloaded') ||
        errorMsg.includes('rate limit') ||
        errorMsg.includes('server error') ||
        errorType.includes('overloaded') ||
        errorType.includes('rate_limit') ||
        response.status === 429 ||
        response.status === 500 ||
        response.status === 502 ||
        response.status === 503 ||
        response.status === 529;

      lastError = data.error?.message || `API error (status ${response.status})`;

      if (!isRetryable) {
        console.log(`✗ Non-retryable error: ${lastError}`);
        return { ok: false, error: lastError };
      }

      if (attempt < maxRetries) {
        // Exponential backoff: 2s, 4s, 8s
        const waitMs = Math.pow(2, attempt) * 1000;
        console.log(`⏳ Retryable error: ${lastError}. Waiting ${waitMs}ms before retry...`);
        await new Promise(r => setTimeout(r, waitMs));
      } else {
        console.log(`✗ All ${maxRetries} attempts failed`);
      }
    } catch (err) {
      lastError = err.message;
      console.log(`✗ Network error on attempt ${attempt}: ${err.message}`);
      if (attempt < maxRetries) {
        const waitMs = Math.pow(2, attempt) * 1000;
        await new Promise(r => setTimeout(r, waitMs));
      }
    }
  }

  return { ok: false, error: lastError || "Service is temporarily busy. Please try again in a moment." };
}

app.post("/generate", async (req, res) => {
  const opts = req.body;
  if (!opts.topic) return res.status(400).json({ error: "Topic is required" });

  const generateAB = opts.generateAB !== false;

  try {
    const promptA = buildSystemPrompt(opts, 'A');
    const userMsg = `Create a complete viral content package:

Topic: ${opts.topic}
Platform: ${opts.platform}
Language: ${opts.lang} (CRITICAL: write in NATIVE ${opts.lang} — sound like real creator, not translated)
Duration: ${opts.duration}
Tone: ${opts.tone}
Goal: ${opts.goal}
Niche: ${opts.niche}
Voice Style: ${opts.voiceStyle}
Audience: ${opts.audience || 'General'}
Speaker: ${opts.speaker || 'Auto'}
Mode: ${opts.mode === 'single' ? 'Single Reel' : opts.mode === 'series' ? `Series — ${opts.parts} parts` : `Story — ${opts.storyReels} reels of ${opts.storyType}`}

Make it niche-specific, voice-matched, COMPLETE with resolution, ORIGINAL, and 100% NATIVE in ${opts.lang}.`;

    // Version A with retry
    const resultA = await callAnthropicWithRetry({
      model: "claude-sonnet-4-5",
      max_tokens: 6500,
      temperature: 1.0,
      system: promptA,
      messages: [{ role: "user", content: userMsg }]
    });

    if (!resultA.ok) {
      return res.status(503).json({
        error: `${resultA.error}. Our AI is busy right now — please try again in 30 seconds.`
      });
    }

    const versionA = resultA.data.content[0].text;
    let versionB = null;

    if (generateAB) {
      const promptB = buildSystemPrompt(opts, 'B');
      const resultB = await callAnthropicWithRetry({
        model: "claude-sonnet-4-5",
        max_tokens: 6500,
        temperature: 1.0,
        system: promptB,
        messages: [{ role: "user", content: userMsg + '\n\nThis is Version B — must be a COMPLETELY DIFFERENT take from typical approach. Different opening, different structure, different angle. Same NATIVE language quality.' }]
      });

      // If Version B fails, still return Version A (don't fail the whole request)
      if (resultB.ok) {
        versionB = resultB.data.content[0].text;
      } else {
        console.log(`Version B failed but returning Version A anyway: ${resultB.error}`);
      }
    }

    res.json({ versionA, versionB });
  } catch (err) {
    console.error("Generate endpoint error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/edit", async (req, res) => {
  const { script, instruction } = req.body;
  try {
    const result = await callAnthropicWithRetry({
      model: "claude-sonnet-4-5",
      max_tokens: 6500,
      temperature: 0.9,
      system: "You are ScriptBot, an elite content editor for Indian creators. Edit the script based on instruction. Keep ALL section headers intact (MAIN SCRIPT, HOOK QUALITY SCORE, HOOK VARIATIONS, SHOT SUGGESTIONS, CAPTION AND HASHTAGS, TRENDING AUDIO SUGGESTIONS, THUMBNAIL COVER FRAME IDEAS, GEAR AND PRODUCTION CHECKLIST, PERFORMANCE IMPROVEMENTS, EXTRA IDEAS). Keep [time] SECTION format and SPEAKER/VISUAL/AUDIO/ON-SCREEN TEXT/SPEAKER TONE/WHY IT WORKS labels. PRESERVE THE 5-ZONE VIRAL STRUCTURE: HOOK, PATTERN INTERRUPT, STORY (with BEAT 1/2/3), RETENTION LOOP, CTA. Avoid clichés. Ensure complete ending. Update HOOK QUALITY SCORE based on the edit. CRITICAL: Maintain NATIVE language quality — Hindi/Hinglish must sound like real creator speech, not translation. Maintain DENSITY in VISUAL, SPEAKER, AUDIO, SPEAKER TONE descriptions. Return FULL package in plain text, no emojis, no markdown.",
      messages: [{ role: "user", content: `Original:\n${script}\n\nInstruction: ${instruction}` }]
    });

    if (!result.ok) {
      return res.status(503).json({
        error: `${result.error}. Please try again in 30 seconds.`
      });
    }

    res.json({ versionA: result.data.content[0].text });
  } catch (err) {
    console.error("Edit endpoint error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("ScriptBot backend v4.5 (Viral Structure: Hook -> Interrupt -> Story -> Loop -> CTA) is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("ScriptBot server v4.5 (Viral Structure) running on port " + PORT);
});
