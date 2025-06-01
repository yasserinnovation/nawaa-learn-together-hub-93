
import { MultipleIntelligenceQuestion, PersonalityQuestion, TechnicalQuestion } from "@/types/assessment";

export const multipleIntelligenceQuestions: MultipleIntelligenceQuestion[] = [
  { id: 1, text: "I enjoy taking apart machines or toys to see how they work.", category: "mechanical" },
  { id: 2, text: "I love solving math problems or brain puzzles.", category: "logical" },
  { id: 3, text: "I like expressing myself through speaking or writing.", category: "linguistic" },
  { id: 4, text: "I feel comfortable working in a team rather than alone.", category: "interpersonal" },
  { id: 5, text: "I enjoy drawing, designing, or working with colors.", category: "spatial" },
  { id: 6, text: "I often try to fix broken things at home.", category: "mechanical" },
  { id: 7, text: "I come up with new ways to reuse old materials.", category: "creative" },
  { id: 8, text: "I'm curious about how machines or tools are made.", category: "mechanical" },
  { id: 9, text: "I watch invention or science experiment videos for fun.", category: "logical" },
  { id: 10, text: "I am good at organizing tasks and assigning roles in a group.", category: "interpersonal" },
  { id: 11, text: "I use apps or programs to design or build things.", category: "spatial" },
  { id: 12, text: "I prefer learning through hands-on activities than lectures.", category: "mechanical" },
  { id: 13, text: "Helping others solve their problems makes me happy.", category: "interpersonal" },
  { id: 14, text: "I notice small details in my surroundings that others might miss.", category: "spatial" },
  { id: 15, text: "I enjoy storytelling or creating dialogues for characters.", category: "linguistic" },
];

export const personalityQuestions: PersonalityQuestion[] = [
  {
    id: 1,
    text: "When I start a project, I prefer:",
    options: [
      { value: "A", label: "Planning carefully first" },
      { value: "B", label: "Jumping in creatively" }
    ],
    category: "planning"
  },
  {
    id: 2,
    text: "During free time, I feel more relaxed:",
    options: [
      { value: "A", label: "Alone with my thoughts" },
      { value: "B", label: "With a group of friends" }
    ],
    category: "social"
  },
  {
    id: 3,
    text: "When facing a problem, I tend to:",
    options: [
      { value: "A", label: "Analyze it logically" },
      { value: "B", label: "Ask others and consider feelings" }
    ],
    category: "thinking"
  },
  {
    id: 4,
    text: "I learn best through:",
    options: [
      { value: "A", label: "Reading and observation" },
      { value: "B", label: "Playing and experimenting" }
    ],
    category: "learning"
  },
  {
    id: 5,
    text: "In group work, I usually take the role of:",
    options: [
      { value: "A", label: "The task organizer" },
      { value: "B", label: "The creative executor" }
    ],
    category: "leadership"
  },
  {
    id: 6,
    text: "When given instructions, I:",
    options: [
      { value: "A", label: "Follow them exactly" },
      { value: "B", label: "Look for a new way to do it" }
    ],
    category: "creativity"
  },
  {
    id: 7,
    text: "I enjoy more:",
    options: [
      { value: "A", label: "Realistic, practical projects" },
      { value: "B", label: "Imaginative, creative experiments" }
    ],
    category: "creativity"
  },
  {
    id: 8,
    text: "When presenting my idea, I prefer:",
    options: [
      { value: "A", label: "A clear and detailed explanation" },
      { value: "B", label: "A visual or artistic style" }
    ],
    category: "presentation"
  }
];

export const technicalQuestions: TechnicalQuestion[] = [
  {
    id: 1,
    text: "Have you ever built a simple electrical circuit or electronics project? Describe the experience briefly.",
    type: "textarea"
  },
  {
    id: 2,
    text: "What kind of apps or games do you enjoy most? Why?",
    type: "textarea"
  },
  {
    id: 3,
    text: "Have you participated in any school or external group projects? What was your role?",
    type: "textarea"
  },
  {
    id: 4,
    text: "If asked to design a city, a machine, or a toy, what would you choose and why?",
    type: "textarea"
  },
  {
    id: 5,
    text: "What topic excites you the most?",
    type: "select",
    options: ["Coding", "Electronics", "Photography", "Presentation", "Fixing things"]
  },
  {
    id: 6,
    text: "Name any course or educational project you've taken that had a strong impact on you.",
    type: "textarea"
  }
];
