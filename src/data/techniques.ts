export type BreathPhase = "inhale" | "hold" | "exhale" | "pause" | "rest" | "guide";

export type PhaseStep = {
  phase: BreathPhase;
  durationSec: number;
  label: string;
  instruction: string;
  /** Optional audio cue label shown in UI */
  cue?: string;
};

export type TechniqueCategory =
  | "foundations"
  | "rhythms"
  | "energy"
  | "heart"
  | "spiritual";

export type Technique = {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  why: string;
  howTo: string[];
  tips: string[];
  category: TechniqueCategory;
  level: "beginner" | "intermediate" | "advanced";
  durationMin: number;
  /** Number of full cycle loops in a guided session */
  cycles: number;
  pattern: PhaseStep[];
  /** Intro guide steps played once before cycles */
  intro?: PhaseStep[];
  /** Optional cool-down after all cycles */
  outro?: PhaseStep[];
  benefits: string[];
  color: string;
  icon: "eye" | "wave" | "wind" | "yawn" | "triangle" | "box" | "layers" | "circle" | "heart" | "flame" | "spark";
  danNote?: string;
};

export type JourneyModule = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  theme: string;
  description: string;
  practices: string[];
  techniqueIds: string[];
  reflection: string;
  color: string;
};

export const CATEGORY_META: Record<
  TechniqueCategory,
  { label: string; description: string; color: string }
> = {
  foundations: {
    label: "Foundations",
    description: "Awareness, presence, and the basics of conscious breathing",
    color: "#2dd4bf",
  },
  rhythms: {
    label: "Rhythms",
    description: "Timed patterns that train the nervous system",
    color: "#38bdf8",
  },
  energy: {
    label: "Energy & Power",
    description: "Vitality, grounding, and fire in the belly",
    color: "#fb923c",
  },
  heart: {
    label: "Heart Center",
    description: "Openness, compassion, and emotional intelligence",
    color: "#fb7185",
  },
  spiritual: {
    label: "Spiritual Breathing",
    description: "Connected breath, presence, and expanded awareness",
    color: "#a78bfa",
  },
};

export const techniques: Technique[] = [
  {
    id: "breath-awareness",
    name: "Breath Awareness",
    shortName: "Awareness",
    tagline: "Wake up to the breath that is already breathing you",
    description:
      "The yin of breathwork. Simply notice the breath without controlling it — the foundation of all Spiritual Breathing practice.",
    why: "Dan Brulé teaches that Breath Awareness is half of the practice. Before you change the breath, you learn to witness it. Awareness itself is transformative — it brings you into the present moment and expands consciousness.",
    howTo: [
      "Sit or lie comfortably with a straight spine.",
      "Close your eyes or soften your gaze.",
      "Notice the breath exactly as it is — fast or slow, deep or shallow.",
      "Feel where the breath moves: nostrils, chest, belly, back.",
      "When the mind wanders, gently return to sensation.",
      "Do not force, count, or fix anything. Just observe.",
    ],
    tips: [
      "Practice for 1–2 minutes several times a day, especially under stress.",
      "Ask: Is it high or low? Smooth or jagged? Through nose or mouth?",
      "Awareness of breath leads to more awareness of life.",
    ],
    category: "foundations",
    level: "beginner",
    durationMin: 5,
    cycles: 1,
    pattern: [
      {
        phase: "guide",
        durationSec: 20,
        label: "Settle",
        instruction: "Find a comfortable position. Soften the face and jaw.",
      },
      {
        phase: "rest",
        durationSec: 45,
        label: "Observe",
        instruction: "Notice the natural breath. No control — only awareness.",
      },
      {
        phase: "rest",
        durationSec: 45,
        label: "Sensations",
        instruction: "Where do you feel the breath most clearly right now?",
      },
      {
        phase: "rest",
        durationSec: 45,
        label: "Rhythm",
        instruction: "Is it fast or slow? Deep or shallow? Smooth or irregular?",
      },
      {
        phase: "rest",
        durationSec: 45,
        label: "Presence",
        instruction: "Rest in pure observation. You are being breathed.",
      },
      {
        phase: "guide",
        durationSec: 15,
        label: "Close",
        instruction: "Gently open your eyes. Carry this awareness with you.",
      },
    ],
    benefits: ["Presence", "Calm", "Mindfulness", "Self-knowledge"],
    color: "#2dd4bf",
    icon: "eye",
    danNote:
      "Whatever breathing exercise makes you more conscious — that is the best one.",
  },
  {
    id: "low-and-slow",
    name: "Low & Slow",
    shortName: "Low & Slow",
    tagline: "Enter the therapeutic zone of 4–8 breaths per minute",
    description:
      "Diaphragmatic breathing at a relaxed pace. The body softens; the mind steadies; the nervous system shifts toward rest-and-digest.",
    why: "Brulé calls 4–8 breaths per minute the therapeutic zone. Breathing low into the belly and slowing the rate is one of the fastest ways to reduce stress chemistry and restore balance.",
    howTo: [
      "Place one hand on the belly, one on the chest.",
      "Inhale gently through the nose so the belly rises first.",
      "Exhale slowly through pursed lips or with a soft shhh sound.",
      "Aim for roughly 6 breaths per minute (about 5s in, 5s out).",
      "Keep the chest relatively quiet; let the diaphragm do the work.",
    ],
    tips: [
      "Start with 5 minutes; build toward longer sessions.",
      "If lightheaded, shorten the count and soften the effort.",
      "Shushing on the exhale helps lengthen and calm.",
    ],
    category: "foundations",
    level: "beginner",
    durationMin: 5,
    cycles: 15,
    pattern: [
      {
        phase: "inhale",
        durationSec: 5,
        label: "Inhale",
        instruction: "Nose inhale — belly rises, low and soft.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 5,
        label: "Exhale",
        instruction: "Slow exhale — shhh. Belly falls.",
        cue: "Out",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 12,
        label: "Prepare",
        instruction: "Hand on belly. Soft shoulders. We breathe low and slow.",
      },
    ],
    benefits: ["Stress relief", "Nervous system balance", "Focus", "Sleep prep"],
    color: "#38bdf8",
    icon: "wave",
    danNote: "Learn to breathe low and slow — then live from that place.",
  },
  {
    id: "exhale-comfort",
    name: "Exhale Comfort Zone",
    shortName: "Exhale Zone",
    tagline: "Lengthen the out-breath and rest in the quiet after",
    description:
      "Gentle inhale, longer exhale, then linger in the natural pause. Turn the space after the out-breath into a comfort zone.",
    why: "Brulé emphasizes leaning into the exhale and befriending the pause after it. This trains the parasympathetic response and teaches the body that stillness is safe.",
    howTo: [
      "Inhale gently through the nose (shorter).",
      "Exhale slowly and fully, without strain.",
      "Rest in the quiet pause after the exhale — no rush to inhale.",
      "When the body wants air, inhale softly again.",
      "Practice at least 5 minutes, three times a day if possible.",
    ],
    tips: [
      "Never force the pause — comfort is the goal.",
      "If anxiety rises, shorten the hold and return to low & slow.",
      "The pause is not emptiness; it is presence.",
    ],
    category: "foundations",
    level: "beginner",
    durationMin: 6,
    cycles: 12,
    pattern: [
      {
        phase: "inhale",
        durationSec: 4,
        label: "Inhale",
        instruction: "Soft nasal inhale. Fill gently.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 6,
        label: "Exhale",
        instruction: "Lengthen the out-breath. Soften everything.",
        cue: "Out",
      },
      {
        phase: "pause",
        durationSec: 4,
        label: "Rest",
        instruction: "Linger in the quiet. No rush. Comfort zone.",
        cue: "Still",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 12,
        label: "Prepare",
        instruction: "We will lean into the exhale and rest in the pause after.",
      },
    ],
    benefits: ["Deep calm", "Anxiety relief", "Emotional regulation", "Presence"],
    color: "#fb7185",
    icon: "wind",
  },
  {
    id: "yawn-and-sigh",
    name: "Yawn & Sigh",
    shortName: "Yawn & Sigh",
    tagline: "Shake loose, yawn big, sigh with relief",
    description:
      "A playful reset: conscious yawning, big sighs of relief, and gentle movement to discharge tension and blocked energy.",
    why: "When stress locks the body, Brulé recommends yawning and sighing while shaking and wiggling. It is not frivolous — it reboots the nervous system and restores pleasure to the breath.",
    howTo: [
      "Stand or sit with room to move.",
      "Induce a full yawn — open the jaw, stretch the face.",
      "Sigh out with a sound of relief: ahhh.",
      "Shake arms, legs, and torso loosely while breathing.",
      "Continue for 1–2 minutes until you feel looser and lighter.",
    ],
    tips: [
      "Fake yawns often become real ones.",
      "Make pleasurable sounds — they amplify release.",
      "Great before meetings, after hard news, or first thing morning.",
    ],
    category: "energy",
    level: "beginner",
    durationMin: 3,
    cycles: 6,
    pattern: [
      {
        phase: "inhale",
        durationSec: 4,
        label: "Yawn In",
        instruction: "Big yawn-inhale. Stretch the face and jaw.",
        cue: "Yawn",
      },
      {
        phase: "exhale",
        durationSec: 5,
        label: "Sigh Out",
        instruction: "Sigh of relief — ahhh. Shake and loosen.",
        cue: "Sigh",
      },
      {
        phase: "rest",
        durationSec: 3,
        label: "Wiggle",
        instruction: "Wiggle joints. Soften. Feel the release.",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 10,
        label: "Prepare",
        instruction: "Stand if you can. This is playful — let the body shake free.",
      },
    ],
    benefits: ["Tension release", "Energy reset", "Mood lift", "Embodiment"],
    color: "#fbbf24",
    icon: "yawn",
    danNote: "Yawn and sigh of relief — loosen the muscles and free the energy.",
  },
  {
    id: "triangle-breath",
    name: "Triangle Breath",
    shortName: "Triangle",
    tagline: "Three equal sides: inhale, exhale, pause",
    description:
      "A three-part rhythm that balances activation and rest. Equal counts create a steady, meditative geometry of breath.",
    why: "Triangle breath is one of Brulé’s go-to patterns for coming into balance. The equal sides train evenness of mind while the pause after exhale cultivates comfort with stillness.",
    howTo: [
      "Choose a count of 3, 4, or 5 seconds per side.",
      "Inhale for the count.",
      "Exhale for the same count.",
      "Pause (empty) for the same count.",
      "Repeat smoothly for several minutes.",
    ],
    tips: [
      "Beginners: start with 3 seconds per side.",
      "Keep the transitions smooth — no gasping.",
      "Visualize drawing a triangle with each cycle.",
    ],
    category: "rhythms",
    level: "beginner",
    durationMin: 5,
    cycles: 12,
    pattern: [
      {
        phase: "inhale",
        durationSec: 4,
        label: "Inhale",
        instruction: "Even inhale — side one of the triangle.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 4,
        label: "Exhale",
        instruction: "Even exhale — side two.",
        cue: "Out",
      },
      {
        phase: "pause",
        durationSec: 4,
        label: "Pause",
        instruction: "Empty pause — side three. Rest.",
        cue: "Hold",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 10,
        label: "Prepare",
        instruction: "Equal sides: inhale, exhale, pause. Find the triangle.",
      },
    ],
    benefits: ["Balance", "Focus", "Meditation", "Emotional steadiness"],
    color: "#a78bfa",
    icon: "triangle",
  },
  {
    id: "box-breathing",
    name: "Box Breathing",
    shortName: "Box",
    tagline: "Four equal sides for calm control under pressure",
    description:
      "Inhale, hold, exhale, hold — each equal. Used by elite performers and first responders to stay clear and composed.",
    why: "Brulé includes box breathing among the essential tools of Spiritual Breathing. Equal four-part timing builds nervous-system resilience and deliberate control without force.",
    howTo: [
      "Inhale through the nose for 4 seconds.",
      "Hold full for 4 seconds (soft, not strained).",
      "Exhale for 4 seconds.",
      "Hold empty for 4 seconds.",
      "Repeat for 4–8 minutes.",
    ],
    tips: [
      "Soften the throat during holds — never clamp.",
      "If 4 is hard, use 3; if easy, try 5.",
      "Eyes soft or closed; jaw relaxed.",
    ],
    category: "rhythms",
    level: "beginner",
    durationMin: 5,
    cycles: 10,
    pattern: [
      {
        phase: "inhale",
        durationSec: 4,
        label: "Inhale",
        instruction: "Fill evenly. Side one of the box.",
        cue: "In",
      },
      {
        phase: "hold",
        durationSec: 4,
        label: "Hold Full",
        instruction: "Soft hold. Stay open and easy.",
        cue: "Hold",
      },
      {
        phase: "exhale",
        durationSec: 4,
        label: "Exhale",
        instruction: "Empty evenly. Side three.",
        cue: "Out",
      },
      {
        phase: "pause",
        durationSec: 4,
        label: "Hold Empty",
        instruction: "Soft empty hold. Complete the box.",
        cue: "Hold",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 10,
        label: "Prepare",
        instruction: "Four equal sides. Breathe with calm precision.",
      },
    ],
    benefits: ["Performance calm", "Focus", "Emotional control", "Resilience"],
    color: "#38bdf8",
    icon: "box",
  },
  {
    id: "full-yogic",
    name: "Full Yogic Breath",
    shortName: "Full Yogic",
    tagline: "Fill from the earth up — belly, ribs, chest",
    description:
      "The complete three-part breath: pelvis and belly first, then mid-ribs, then upper chest. Connection to body and ground.",
    why: "In Brulé’s first essential, full yogic breath connects you to Mother Earth — security, safety, survival. Filling from the bottom up gets you out of the head and into the body.",
    howTo: [
      "Inhale into the lower belly and pelvic floor.",
      "Continue into the mid-ribs, expanding sideways.",
      "Finish into the upper chest, collarbones soft.",
      "Exhale from top to bottom — reverse order, unforced.",
      "Keep the whole wave smooth and continuous.",
    ],
    tips: [
      "Imagine pouring water into a glass from the bottom up.",
      "No strain at the top — leave a little room.",
      "Excellent grounding practice before spiritual work.",
    ],
    category: "energy",
    level: "intermediate",
    durationMin: 6,
    cycles: 10,
    pattern: [
      {
        phase: "inhale",
        durationSec: 6,
        label: "Fill Up",
        instruction: "Belly → ribs → chest. Bottom to top.",
        cue: "In",
      },
      {
        phase: "hold",
        durationSec: 2,
        label: "Settle",
        instruction: "Soft pause at the top. Feel fullness.",
      },
      {
        phase: "exhale",
        durationSec: 6,
        label: "Empty Down",
        instruction: "Chest → ribs → belly. Soft release.",
        cue: "Out",
      },
      {
        phase: "pause",
        durationSec: 2,
        label: "Ground",
        instruction: "Rest empty. Feel the earth.",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 12,
        label: "Prepare",
        instruction: "Connect to the body. We fill from the ground up.",
      },
    ],
    benefits: ["Grounding", "Vital capacity", "Embodiment", "Calm power"],
    color: "#34d399",
    icon: "layers",
  },
  {
    id: "circular-breath",
    name: "Circular Breathing",
    shortName: "Circular",
    tagline: "Connected breath — no pause, continuous wave",
    description:
      "The core of Spiritual Breathing: active inhale, relaxed exhale, no gaps. A continuous circular wave that opens energy and awareness.",
    why: "Connected circular breathing is central to Brulé’s lineage (from rebirthing and modern breathwork). Inhale is intentional; exhale is passive and free. No pause — one continuous stream of life force.",
    howTo: [
      "Breathe in actively through the mouth or nose.",
      "Let the exhale fall out relaxed — no push.",
      "Connect inhale to exhale with no pause between.",
      "Keep a steady, moderate rhythm — not forced hyperventilation.",
      "Stay soft in the body; ride the wave of sensation.",
    ],
    tips: [
      "If intensity rises, slow down and soften — never force.",
      "Hands can rest on belly to feel the circular motion.",
      "This is conscious breathing with passion and awareness.",
      "Stop if dizzy; return to normal breath.",
    ],
    category: "spiritual",
    level: "intermediate",
    durationMin: 8,
    cycles: 40,
    pattern: [
      {
        phase: "inhale",
        durationSec: 3,
        label: "Active In",
        instruction: "Active inhale. Fill with intention.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 3,
        label: "Passive Out",
        instruction: "Let go. Exhale falls free — no pause.",
        cue: "Out",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 15,
        label: "Prepare",
        instruction:
          "Connected circular breath. No gaps. Soft body, continuous wave. Go gently.",
      },
    ],
    benefits: ["Energy flow", "Emotional release", "Expanded awareness", "Aliveness"],
    color: "#a78bfa",
    icon: "circle",
    danNote:
      "Conscious connected circular breathing — inhale active, exhale passive, continuous.",
  },
  {
    id: "heart-breath",
    name: "Heart-Centered Breath",
    shortName: "Heart",
    tagline: "Breathe into the heart as the new root",
    description:
      "Direct the breath into and around the heart. Cultivate love, acceptance, compassion — and live from emotional intelligence.",
    why: "Brulé teaches that the lungs wrap the heart, and the heart can become the new root chakra. Heart breathing awakens emotional intelligence and a heart-centered life.",
    howTo: [
      "Place a hand over the heart center.",
      "Inhale as if breathing into the heart space.",
      "Exhale with a feeling of warmth or gratitude.",
      "Optionally add a word: love, peace, thank you.",
      "Smile gently; soften the chest.",
    ],
    tips: [
      "If emotions arise, stay with the breath — no fixing.",
      "Practice before difficult conversations.",
      "Sound (soft hum) can open the heart further.",
    ],
    category: "heart",
    level: "beginner",
    durationMin: 6,
    cycles: 12,
    pattern: [
      {
        phase: "inhale",
        durationSec: 5,
        label: "Into Heart",
        instruction: "Breathe into the heart space. Soft chest.",
        cue: "In",
      },
      {
        phase: "hold",
        durationSec: 2,
        label: "Feel",
        instruction: "Rest in warmth. Love and acceptance.",
      },
      {
        phase: "exhale",
        durationSec: 6,
        label: "Radiate",
        instruction: "Exhale kindness outward. Soft smile.",
        cue: "Out",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 12,
        label: "Prepare",
        instruction: "Hand on heart. We breathe as if the heart is home.",
      },
    ],
    benefits: ["Compassion", "Connection", "Emotional healing", "Warmth"],
    color: "#fb7185",
    icon: "heart",
  },
  {
    id: "fire-belly",
    name: "Fire in the Belly",
    shortName: "Fire Belly",
    tagline: "Awaken power in the dantien — grace under pressure",
    description:
      "Diaphragmatic power breathing centered in the lower belly (hara / dantien). Generate life-force energy without adrenalized stress.",
    why: "Module three of Brulé’s essentials: access personal power through the belly battery. Breath builds genuine chi instead of stress hormones — balance and grace under pressure.",
    howTo: [
      "Sit tall or stand with knees soft.",
      "Inhale firmly into the lower belly.",
      "Exhale with a short, decisive release (optional soft ha).",
      "Keep the upper body relatively still.",
      "Build rhythm for 1–3 minutes, then rest and feel.",
    ],
    tips: [
      "Power without tension — soft face, strong center.",
      "Stop if dizzy; rest in low & slow.",
      "Use before challenges that need presence and courage.",
    ],
    category: "energy",
    level: "intermediate",
    durationMin: 4,
    cycles: 20,
    pattern: [
      {
        phase: "inhale",
        durationSec: 2,
        label: "Charge",
        instruction: "Firm belly inhale. Fire the center.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 2,
        label: "Release",
        instruction: "Decisive exhale. Stay soft in the face.",
        cue: "Out",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 10,
        label: "Prepare",
        instruction: "Find the lower belly. We charge the battery with breath.",
      },
    ],
    outro: [
      {
        phase: "rest",
        durationSec: 20,
        label: "Integrate",
        instruction: "Rest. Feel warmth and power in the center.",
      },
    ],
    benefits: ["Vitality", "Courage", "Focus under pressure", "Embodied power"],
    color: "#fb923c",
    icon: "flame",
  },
  {
    id: "breath-hold-soft",
    name: "Soft Breath Hold",
    shortName: "Soft Hold",
    tagline: "Gentle retention to expand capacity and calm",
    description:
      "Comfortable breath holds after inhale or exhale. Train CO₂ tolerance and mental ease without struggle.",
    why: "Breath holding appears in Brulé’s essentials toolkit. Soft retention builds capacity and teaches non-reactivity — holding life gently rather than gripping it.",
    howTo: [
      "Inhale fully but comfortably.",
      "Hold softly with an open throat (or hold empty after exhale).",
      "When urge to breathe is moderate, release smoothly.",
      "Never strain, gasp, or push past dizziness.",
      "Recover with 2–3 easy breaths between holds.",
    ],
    tips: [
      "Comfort is mastery — struggle is not the goal.",
      "Never practice breath holds in water or while driving.",
      "If anxious, switch to low & slow.",
    ],
    category: "rhythms",
    level: "intermediate",
    durationMin: 6,
    cycles: 6,
    pattern: [
      {
        phase: "inhale",
        durationSec: 4,
        label: "Inhale",
        instruction: "Comfortable full inhale.",
        cue: "In",
      },
      {
        phase: "hold",
        durationSec: 8,
        label: "Soft Hold",
        instruction: "Open throat. Soft eyes. Rest in fullness.",
        cue: "Hold",
      },
      {
        phase: "exhale",
        durationSec: 5,
        label: "Release",
        instruction: "Smooth release. No gasp.",
        cue: "Out",
      },
      {
        phase: "rest",
        durationSec: 6,
        label: "Recover",
        instruction: "Easy natural breaths. Recover.",
      },
    ],
    intro: [
      {
        phase: "guide",
        durationSec: 12,
        label: "Prepare",
        instruction: "Soft holds only. Comfort over duration. You are safe.",
      },
    ],
    benefits: ["Capacity", "Mental calm", "Non-reactivity", "Focus"],
    color: "#38bdf8",
    icon: "spark",
  },
  {
    id: "spiritual-breathing",
    name: "Spiritual Breathing Session",
    shortName: "Spiritual",
    tagline: "Awareness + conscious breathing for transformation",
    description:
      "A complete practice uniting Breath Awareness and Conscious Breathing — the two wings of Spiritual Breathing as taught by Dan Brulé.",
    why: "Breathwork, in Brulé’s words, is Breath Awareness and Conscious Breathing for healing, growth, and spiritual awakening. This session weaves both: witness, then shape, then rest in presence.",
    howTo: [
      "Begin with pure observation of the natural breath.",
      "Move into low, slow diaphragmatic breathing.",
      "Open into gentle connected circular breathing.",
      "Close with heart-centered breath and silence.",
      "Approach the breath as sacred, intelligent, alive.",
    ],
    tips: [
      "Quality over intensity. Consciousness is the measure.",
      "Emotions may surface — meet them with breath, not judgment.",
      "End with gratitude for the breath that never leaves you.",
    ],
    category: "spiritual",
    level: "advanced",
    durationMin: 12,
    cycles: 1,
    pattern: [
      {
        phase: "guide",
        durationSec: 15,
        label: "Arrive",
        instruction: "Sit tall. Soften. The breath is already here.",
      },
      {
        phase: "rest",
        durationSec: 40,
        label: "Awareness",
        instruction: "Watch the natural breath. Being, not doing.",
      },
      {
        phase: "inhale",
        durationSec: 5,
        label: "Low In",
        instruction: "Begin low & slow. Belly rises.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 5,
        label: "Slow Out",
        instruction: "Lengthen the exhale. Soften.",
        cue: "Out",
      },
      {
        phase: "inhale",
        durationSec: 5,
        label: "Low In",
        instruction: "Continue. Steady and low.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 5,
        label: "Slow Out",
        instruction: "Exhale longer if it feels good.",
        cue: "Out",
      },
      {
        phase: "inhale",
        durationSec: 5,
        label: "Low In",
        instruction: "Belly soft. Mind quiet.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 6,
        label: "Slow Out",
        instruction: "Release completely.",
        cue: "Out",
      },
      {
        phase: "guide",
        durationSec: 10,
        label: "Open",
        instruction: "Now circular connected breath. Continuous wave.",
      },
      {
        phase: "inhale",
        durationSec: 3,
        label: "Active In",
        instruction: "Active inhale. No pause after.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 3,
        label: "Passive Out",
        instruction: "Passive exhale. Connected.",
        cue: "Out",
      },
      {
        phase: "inhale",
        durationSec: 3,
        label: "Active In",
        instruction: "Keep the circle flowing.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 3,
        label: "Passive Out",
        instruction: "Let go. Soft body.",
        cue: "Out",
      },
      {
        phase: "inhale",
        durationSec: 3,
        label: "Active In",
        instruction: "Energy rising with awareness.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 3,
        label: "Passive Out",
        instruction: "Release. Stay present.",
        cue: "Out",
      },
      {
        phase: "inhale",
        durationSec: 3,
        label: "Active In",
        instruction: "Continue the wave.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 3,
        label: "Passive Out",
        instruction: "Smooth connection.",
        cue: "Out",
      },
      {
        phase: "inhale",
        durationSec: 4,
        label: "Slow Down",
        instruction: "Gradually slow the circle.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 5,
        label: "Ease Out",
        instruction: "Softer, slower.",
        cue: "Out",
      },
      {
        phase: "guide",
        durationSec: 8,
        label: "Heart",
        instruction: "Bring the breath to the heart.",
      },
      {
        phase: "inhale",
        durationSec: 5,
        label: "Heart In",
        instruction: "Breathe into the heart center.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 6,
        label: "Heart Out",
        instruction: "Exhale warmth and gratitude.",
        cue: "Out",
      },
      {
        phase: "inhale",
        durationSec: 5,
        label: "Heart In",
        instruction: "Love, acceptance, presence.",
        cue: "In",
      },
      {
        phase: "exhale",
        durationSec: 6,
        label: "Heart Out",
        instruction: "Radiate peace.",
        cue: "Out",
      },
      {
        phase: "rest",
        durationSec: 45,
        label: "Silence",
        instruction: "Rest. Let the breath be natural. Simply be.",
      },
      {
        phase: "guide",
        durationSec: 12,
        label: "Close",
        instruction: "Thank the breath. Open eyes when ready.",
      },
    ],
    benefits: [
      "Transformation",
      "Spiritual clarity",
      "Emotional release",
      "Deep presence",
    ],
    color: "#2dd4bf",
    icon: "spark",
    danNote:
      "All the benefits of breathwork depend on consciousness + breathing. Wake up.",
  },
];

export const journeyModules: JourneyModule[] = [
  {
    id: "earth",
    number: 1,
    title: "Connect to Mother Earth",
    subtitle: "Security, safety & survival",
    theme: "Grounding",
    description:
      "Practice the full yogic breath — filling from the bottom up into the floor of the pelvis. Get out of the head and into the body. Center, ground, and embody the spirit of the Higher Self.",
    practices: [
      "Full yogic breath from the base up",
      "Elemental awareness (earth, air, water, fire)",
      "Body-first presence before spiritual flight",
    ],
    techniqueIds: ["full-yogic", "low-and-slow", "breath-awareness"],
    reflection:
      "Where in my body do I feel most supported by the earth right now?",
    color: "#34d399",
  },
  {
    id: "ecstatic",
    number: 2,
    title: "Ecstatic Breath Energy",
    subtitle: "Pleasure, vitality & life force",
    theme: "Aliveness",
    description:
      "Explore the ecstatic and transformative nature of breath energy. Awaken comfort and pleasure. Access life force within and around you — and pack chi into the fascia to recharge spiritual batteries.",
    practices: [
      "Yawn & sigh for pleasure and release",
      "Gentle circular breathing for energy flow",
      "Relax into intensity without bracing",
    ],
    techniqueIds: ["yawn-and-sigh", "circular-breath", "exhale-comfort"],
    reflection: "Can I allow more pleasure and ease in my breath today?",
    color: "#fbbf24",
  },
  {
    id: "power",
    number: 3,
    title: "Fire in the Belly",
    subtitle: "Personal power & grace under pressure",
    theme: "Power",
    description:
      "Awaken the dantien / hara. Recharge your battery to meet life’s challenges with genuine life-force energy — not adrenalized stress. Direct energy toward purpose with balance.",
    practices: [
      "Diaphragmatic power breathing",
      "Belly-centered focus under pressure",
      "Soft face, strong center",
    ],
    techniqueIds: ["fire-belly", "box-breathing", "low-and-slow"],
    reflection: "What challenge needs my calm power today?",
    color: "#fb923c",
  },
  {
    id: "heart",
    number: 4,
    title: "Heart-Centered Life",
    subtitle: "Emotional intelligence & compassion",
    theme: "Heart",
    description:
      "Open and heal the heart with love, acceptance, and compassion. The lungs wrap the heart — breathe as if the heart is the new root. Connect to self, others, and life from the center.",
    practices: [
      "Heart-centered breathing",
      "Gratitude on the exhale",
      "Express love, joy, peace, gratitude",
    ],
    techniqueIds: ["heart-breath", "exhale-comfort", "breath-awareness"],
    reflection: "What would change if I met this day from the heart?",
    color: "#fb7185",
  },
  {
    id: "voice",
    number: 5,
    title: "Authentic Voice",
    subtitle: "Clear programming & speak truth",
    theme: "Voice",
    description:
      "Use sound as a healing force. Clear negative programming and limiting beliefs. Connect to your authentic voice, resonance, and frequency — speak truth with courage and innocence.",
    practices: [
      "Sighs, hums, and soft sound on the breath",
      "Yawn & sigh to free the throat",
      "Affirmations on the exhale",
    ],
    techniqueIds: ["yawn-and-sigh", "heart-breath", "triangle-breath"],
    reflection: "What truth wants to be spoken — even softly?",
    color: "#38bdf8",
  },
  {
    id: "vision",
    number: 6,
    title: "Spiritual Clarity & Vision",
    subtitle: "See through the eyes of love",
    theme: "Vision",
    description:
      "Clear confusion and doubt. Infuse every cell with breath energy. Work with light and soft vision — looking without looking, seeing without seeing — so spirit shines through.",
    practices: [
      "Breath awareness as expanded consciousness",
      "Soft holds with open awareness",
      "Infuse the body with light on each inhale",
    ],
    techniqueIds: ["breath-awareness", "breath-hold-soft", "spiritual-breathing"],
    reflection: "What do I see when I look with softer eyes?",
    color: "#a78bfa",
  },
  {
    id: "infinite",
    number: 7,
    title: "Full Potential & Infinite Spirit",
    subtitle: "Break free of limitations",
    theme: "Liberation",
    description:
      "Use the breath to transcend the limited ego. Connect to higher intelligence and Advaita — oneness. Embody the infinite Self and pure being through devoted Spiritual Breathing practice.",
    practices: [
      "Full Spiritual Breathing session",
      "Circular breath into silence",
      "Rest as pure awareness after practice",
    ],
    techniqueIds: ["spiritual-breathing", "circular-breath", "heart-breath"],
    reflection: "Who am I when the breath breathes me?",
    color: "#2dd4bf",
  },
];

export const principles = [
  {
    id: "two-wings",
    title: "Two Wings of Breathwork",
    body: "Breath Awareness (yin — being the breath) and Conscious Breathing (yang — doing the breath). Together they form a complete practice of healing, growth, and awakening.",
  },
  {
    id: "consciousness",
    title: "Consciousness First",
    body: "All benefits depend on consciousness plus breathing. The best exercise is the one that makes you more aware, more present, more alive.",
  },
  {
    id: "sacred",
    title: "The Breath Is Sacred",
    body: "Approach the breath with romance and reverence. It is intelligent, alive, and always with you — a lifelong teacher and ally.",
  },
  {
    id: "body",
    title: "Out of the Head, Into the Body",
    body: "Spiritual Breathing is embodied. Fill from the ground up. Soften the muscles. Feel more than you think.",
  },
  {
    id: "comfort",
    title: "Comfort Is Mastery",
    body: "Especially with holds and intensity — struggle is not the goal. Expand capacity within ease. Soft face, open throat, kind mind.",
  },
  {
    id: "energy",
    title: "Genuine Life Force",
    body: "Breath can generate vitality without stress chemistry. Fire in the belly is power with grace — not adrenaline with anxiety.",
  },
];

export function getTechnique(id: string): Technique | undefined {
  return techniques.find((t) => t.id === id);
}

export function getModule(id: string): JourneyModule | undefined {
  return journeyModules.find((m) => m.id === id);
}

export function estimateSessionSeconds(t: Technique): number {
  const intro = t.intro?.reduce((s, p) => s + p.durationSec, 0) ?? 0;
  const outro = t.outro?.reduce((s, p) => s + p.durationSec, 0) ?? 0;
  const cycle = t.pattern.reduce((s, p) => s + p.durationSec, 0);
  return intro + cycle * t.cycles + outro;
}
