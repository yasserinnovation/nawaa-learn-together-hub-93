import { Bot, Cpu, BarChart3, ShieldCheck, FlaskConical, Printer, Brain, Lightbulb, Gamepad2, Microscope, Smartphone, Rocket } from "lucide-react";
import { Course } from "@/types/course";

const courses: Course[] = [
  {
    id: 1,
    title: "Inventor's Playground – Building a Smart Mini Theme Park",
    icon: CircuitBoard,
    ageGroup: "10–13",
    duration: "3 hours",
    category: "technology",
    level: "Level 1",
    maxGroupSize: 20,
    totalDuration: "21 hours (3 hours/day over 7 days)",
    project: "Design and build a mini amusement park powered by technology and imagination",
    stemFocus: "Electronics, robotics, renewable energy, circuitry",
    lifeSkills: "Creative problem-solving, teamwork, presentation skills, leadership",
    outcomes: "Understand basic electronic components. Apply principles of circuitry: parallel and series connections. Program simple robotic functions using LEGO EV3 or equivalent. Harness renewable energy sources (solar, wind). Develop creative problem-solving and teamwork skills. Present and pitch a project idea to an audience",
    description: "This beginner-friendly, project-based course introduces young learners to key concepts in electronics, robotics, renewable energy, and creative problem-solving. Students collaboratively design and build a mini amusement park powered by technology and their imagination.",
    days: [
      {
        day: 1,
        title: "Think Like an Inventor",
        hours: 3,
        activities: "Ice-breaking, team formation, brainstorming city layout",
        skills: "Creative thinking, team-building"
      },
      {
        day: 2,
        title: "Energy Explorers",
        hours: 3,
        activities: "Exploring batteries, solar cells, and wind turbines",
        skills: "Sustainability, systems thinking"
      },
      {
        day: 3,
        title: "Circuit Creators",
        hours: 3,
        activities: "Learning circuits, parallel & series wiring",
        skills: "Electronics, safety, troubleshooting"
      },
      {
        day: 4,
        title: "Robo-Engineers",
        hours: 3,
        activities: "Intro to robotics, assembling and coding LEGO EV3",
        skills: "Robotics, logic, programming"
      },
      {
        day: 5,
        title: "Builders' Lab",
        hours: 3,
        activities: "Hands-on building: houses, streetlights, rides",
        skills: "Design, construction, innovation"
      },
      {
        day: 6,
        title: "Show Time Prep",
        hours: 3,
        activities: "Practice presentation, storytelling, public speaking",
        skills: "Communication, confidence"
      },
      {
        day: 7,
        title: "Demo Day",
        hours: 3,
        activities: "Present to peers and parents; simulate investor pitch",
        skills: "Leadership, reflection"
      }
    ]
  },
  {
    id: 12,
    title: "Robo-Innovators – From Idea to Prototype",
    icon: Bot,
    ageGroup: "12–15",
    duration: "2-3 hours",
    category: "technology",
    level: "Level 2",
    maxGroupSize: 12,
    totalDuration: "12 hours (flexible: 2–3 hours/day over 4–6 days)",
    project: "Develop and prototype technological solutions to real-world problems using robotics",
    stemFocus: "Robotics, electronics, programming, sensor integration",
    lifeSkills: "Design thinking, problem-solving, presentation skills, teamwork",
    outcomes: "Understand and apply the design thinking cycle (empathize, ideate, prototype, test). Build functional prototypes using EV3 components or Arduino. Learn advanced programming logic (loops, conditionals, sensor data). Use tools like the multimeter (AVO) to diagnose issues. Present and justify their inventions as social impact solutions.",
    description: "This intermediate course focuses on innovation through robotics. Learners develop and prototype technological solutions to real-world problems using robotics kits, sensors, and programmable logic. Emphasis is placed on ideation, prototyping, and testing using a design-thinking approach.",
    days: [
      {
        day: 1,
        title: "Ideas that Matter",
        hours: 2,
        activities: "Brainstorm challenges, group selection, intro to design thinking",
        skills: "Critical thinking, empathy"
      },
      {
        day: 2,
        title: "Circuit & Sensor Bootcamp",
        hours: 3,
        activities: "Review circuits, use sensors (color, distance, sound)",
        skills: "Technical fluency, safety"
      },
      {
        day: 3,
        title: "Code it Smart",
        hours: 2,
        activities: "Advanced EV3/Arduino programming, control via mobile",
        skills: "Programming, logical reasoning"
      },
      {
        day: 4,
        title: "Prototype Lab",
        hours: 3,
        activities: "Build working models: auto bin, light-sensitive curtain, smart glove",
        skills: "Innovation, engineering"
      },
      {
        day: 5,
        title: "Test & Iterate",
        hours: 1,
        activities: "Diagnose issues, peer review, improve designs",
        skills: "Problem-solving, iteration"
      },
      {
        day: 6,
        title: "Tech Talk",
        hours: 1,
        activities: "Final presentation: explain concept, benefits, demo prototype",
        skills: "Pitching, storytelling"
      }
    ]
  },
  {
    id: 13,
    title: "FutureTech Founders – Smart Solutions for Real-World Challenges",
    icon: Rocket,
    ageGroup: "14–17",
    duration: "3 hours",
    category: "technology",
    level: "Level 3",
    maxGroupSize: 12,
    totalDuration: "18 hours (6 sessions, 3 hours each)",
    project: "Design and deploy smart, tech-based solutions for real-world challenges",
    stemFocus: "Microcontrollers, IoT, mobile app integration, sensor technology",
    lifeSkills: "Entrepreneurship, project management, presentation skills, innovation thinking",
    outcomes: "Design and assemble complete smart systems integrating hardware and software. Use microcontrollers and multiple sensors (e.g., motion, sound, light, color). Learn basic IoT and app control (e.g., Bluetooth/WiFi modules). Build, test, and iterate a fully functional tech prototype. Deliver a persuasive investor-style pitch for their product.",
    description: "This advanced-level program guides teens through designing and deploying smart, tech-based solutions for environmental, accessibility, or everyday life challenges. They will explore microcontrollers (Arduino), advanced sensors, mobile app integration, and IoT basics while simulating startup development—from concept to pitch.",
    days: [
      {
        day: 1,
        title: "Tech Startups & Big Ideas",
        hours: 3,
        activities: "Explore tech startups, identify problems worth solving, team setup",
        skills: "Innovation thinking, team building"
      },
      {
        day: 2,
        title: "Deep Dive: Arduino & Sensors",
        hours: 3,
        activities: "Advanced Arduino, IoT sensors, mobile connectivity (e.g. Blynk app)",
        skills: "Embedded systems, mobile control"
      },
      {
        day: 3,
        title: "Smart System Design",
        hours: 3,
        activities: "Circuit design, app integration, energy sources (solar, battery)",
        skills: "Engineering design, IoT basics"
      },
      {
        day: 4,
        title: "Build Day",
        hours: 3,
        activities: "Assemble, code, and test smart devices",
        skills: "Prototyping, troubleshooting"
      },
      {
        day: 5,
        title: "Pitch Day Prep",
        hours: 3,
        activities: "Develop branding, logos, financial model, investor pitch",
        skills: "Entrepreneurship, design"
      },
      {
        day: 6,
        title: "Demo & Pitch Event",
        hours: 3,
        activities: "Present solutions to a panel (parents, mentors, investors)",
        skills: "Public speaking, feedback handling"
      }
    ]
  },
  {
    id: 2,
    title: "Robotics",
    icon: Bot,
    ageGroup: "10–12",
    duration: "2 hours",
    category: "technology",
    project: "Build a robot that reacts to sound or light using basic sensors and motor control modules.",
    stemFocus: "Engineering fundamentals, electrical circuits, basic programming logic (via block coding)",
    lifeSkills: "Team collaboration, communication under constraint, problem framing and solving, responsibility in shared tasks",
    outcomes: "Students will understand the foundations of how robots perceive and act on stimuli. They will gain experience in coding logic, teamwork mechanics, and hardware assembly."
  },
  {
    id: 3,
    title: "Drones",
    icon: Gamepad2,
    ageGroup: "12–14",
    duration: "2 hours",
    category: "technology",
    project: "Program a mini drone to follow a rescue path using visual-based block programming.",
    stemFocus: "Aerodynamics basics, spatial orientation, introductory coding and mission logic",
    lifeSkills: "Leadership under pressure, spatial awareness, decision-making, risk management",
    outcomes: "Students will learn drone mechanics and flight safety while building awareness of how tech can support real-world challenges."
  },
  {
    id: 4,
    title: "3D Printing",
    icon: Printer,
    ageGroup: "11–14",
    duration: "2 hours",
    category: "technology",
    project: "Design and 3D print a small tool to solve a community need, such as a water carrier, prosthetic part, or book holder.",
    stemFocus: "Engineering design process, geometric modeling, CAD software (e.g., Tinkercad)",
    lifeSkills: "Creativity, empathy for others, design with purpose",
    outcomes: "Students will learn how to transform abstract needs into tangible solutions, using design thinking and rapid prototyping tools."
  },
  {
    id: 5,
    title: "Artificial Intelligence",
    icon: Brain,
    ageGroup: "12–15",
    duration: "2 hours",
    category: "technology",
    project: "Image classification with Teachable Machine",
    stemFocus: "Computer science, data patterns, model training",
    lifeSkills: "Ethics in AI, logical analysis",
    outcomes: "Students will gain insight into how machines learn and ethical tech use"
  },
  {
    id: 6,
    title: "Renewable Energy",
    icon: Lightbulb,
    ageGroup: "10–13",
    duration: "2 hours",
    category: "science",
    project: "Build a solar-powered mini house",
    stemFocus: "Environmental engineering, circuits",
    lifeSkills: "Sustainability, green responsibility",
    outcomes: "Students will understand solar power and system efficiency"
  },
  {
    id: 7,
    title: "Virtual Reality",
    icon: Gamepad2,
    ageGroup: "11–15",
    duration: "2 hours",
    category: "technology",
    project: "Create a virtual Mars journey",
    stemFocus: "Storyboarding, digital creativity, 3D navigation",
    lifeSkills: "Empathy, storytelling",
    outcomes: "Students will explore narrative design and immersive tech"
  },
  {
    id: 8,
    title: "Internet of Things (IoT)",
    icon: Cpu,
    ageGroup: "12–16",
    duration: "2 hours",
    category: "technology",
    project: "Smart lighting control system",
    stemFocus: "Embedded systems, sensor integration, electronics",
    lifeSkills: "Innovation, planning, team leadership",
    outcomes: "Students will create functional tech and understand automation"
  },
  {
    id: 9,
    title: "Data Analysis",
    icon: BarChart3,
    ageGroup: "12–15",
    duration: "2 hours",
    category: "math",
    project: "Analyze behavioral or weather data",
    stemFocus: "Math, statistics, spreadsheet tools",
    lifeSkills: "Critical thinking, data-driven decisions",
    outcomes: "Students will gain analytical skills and pattern recognition"
  },
  {
    id: 10,
    title: "Cybersecurity",
    icon: ShieldCheck,
    ageGroup: "10–14",
    duration: "2 hours",
    category: "technology",
    project: "Digital escape game on safety",
    stemFocus: "Digital literacy, logic puzzles",
    lifeSkills: "Digital ethics, protection mindset",
    outcomes: "Students will understand personal data safety and ethics online"
  },
  {
    id: 11,
    title: "Biotechnology",
    icon: Microscope,
    ageGroup: "10–13",
    duration: "2 hours",
    category: "science",
    project: "Grow a plant under different conditions",
    stemFocus: "Biology, experimentation, sensors",
    lifeSkills: "Patience, inquiry, scientific mindset",
    outcomes: "Students will learn about environmental impact and scientific testing"
  }
];

export const getAllCourses = (): Course[] => {
  return courses;
};

export const getCourseById = (id: number): Course | undefined => {
  return courses.find(course => course.id === id);
};

// Import missing icon
import { CircuitBoard } from "lucide-react";
