import { Bot, Cpu, BarChart3, ShieldCheck, FlaskConical, Printer, Brain, Lightbulb, Gamepad2, Microscope, Smartphone, Rocket, Briefcase, GraduationCap, CircuitBoard, Computer, Map, Image, MessageSquare, FileText, Palette, Wifi } from "lucide-react";
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
    id: 19,
    title: "Fly It Yourself! – First Steps with Drones",
    icon: Gamepad2,
    ageGroup: "10–13",
    duration: "3 hours",
    category: "technology",
    level: "Level 1",
    maxGroupSize: 12,
    totalDuration: "12 hours (4 sessions × 3 hours)",
    project: "Learn basic drone operations and complete a flight mission using simple coding",
    stemFocus: "Aerodynamics, robotics, coding, spatial orientation",
    lifeSkills: "Safety awareness, teamwork, problem-solving, hand-eye coordination",
    outcomes: "Understand how drones work: lift, thrust, yaw, pitch, and roll. Safely operate a beginner drone indoors. Identify drone parts and their functions. Use a simple coding tool to control a drone's flight path. Complete a basic flight mission as a team.",
    description: "This hands-on course introduces kids to the exciting world of drones through simple, safe activities. They'll learn how drones fly, what makes them stable, and how to control them using basic maneuvers and simple coding — all in a safe, supervised environment.",
    days: [
      {
        day: 1,
        title: "What Keeps It in the Air?",
        hours: 3,
        activities: "Explore drone parts, safety rules, flight demo",
        skills: "Safety knowledge, mechanical understanding"
      },
      {
        day: 2,
        title: "You're the Pilot Now!",
        hours: 3,
        activities: "Learn takeoff, land, and hover",
        skills: "Basic flight control, spatial awareness"
      },
      {
        day: 3,
        title: "Fly by Code!",
        hours: 3,
        activities: "Use blocks to create basic flight paths",
        skills: "Visual programming, sequential thinking"
      },
      {
        day: 4,
        title: "Can You Save the Package?",
        hours: 3,
        activities: "Team challenge: code + fly to deliver a payload",
        skills: "Mission planning, teamwork, problem-solving"
      }
    ]
  },
  {
    id: 20,
    title: "Drone Challenge! – Code, Race & Rescue",
    icon: Gamepad2,
    ageGroup: "11–14",
    duration: "3 hours",
    category: "technology",
    level: "Level 2",
    maxGroupSize: 12,
    totalDuration: "15 hours (5 sessions × 3 hours)",
    project: "Design and fly complex drone missions using block-based programming",
    stemFocus: "Advanced coding, spatial navigation, mission planning, aerodynamics",
    lifeSkills: "Team collaboration, problem-solving under pressure, creative thinking, planning",
    outcomes: "Control drones using advanced block coding (loops, conditionals). Design and fly complex missions (e.g., rescue, delivery). Understand drone roles in industries (agriculture, delivery, safety). Work in teams to solve flight-based challenges. Begin exploring sensors and camera use (intro only).",
    description: "This intermediate-level course ramps up drone skills with exciting missions: coding obstacle runs, simulating rescue operations, and creating flight plans using block-based programming. Students will explore how drones are used in real-world scenarios like delivery, mapping, and disaster response.",
    days: [
      {
        day: 1,
        title: "Fly the Maze!",
        hours: 3,
        activities: "Practice loops, turns, and hovering through obstacles",
        skills: "Advanced flight control, coding concepts"
      },
      {
        day: 2,
        title: "Program a Delivery Route",
        hours: 3,
        activities: "Map a coded route to deliver a small object",
        skills: "Sequential programming, spatial planning"
      },
      {
        day: 3,
        title: "Find & Help the Lost Hiker!",
        hours: 3,
        activities: "Code a search pattern, \"drop\" aid package",
        skills: "Search algorithms, precision flying"
      },
      {
        day: 4,
        title: "Make Your Own Mission",
        hours: 3,
        activities: "Design & test an original drone mission",
        skills: "Creative problem-solving, mission design"
      },
      {
        day: 5,
        title: "Fly-Off and Award Ceremony",
        hours: 3,
        activities: "Teams compete in speed, accuracy & mission design",
        skills: "Performance under pressure, teamwork"
      }
    ]
  },
  {
    id: 16,
    title: "Meet Mr. AI! – Discover the Smart Side of Tech",
    icon: Brain,
    ageGroup: "10–13",
    duration: "3 hours",
    category: "technology",
    level: "Level 1",
    maxGroupSize: 15,
    totalDuration: "15 hours (5 sessions × 3 hours)",
    project: "Train AI models and build an interactive AI project using tools like Teachable Machine and Scratch",
    stemFocus: "Artificial intelligence, machine learning, computer science, programming",
    lifeSkills: "Digital creativity, critical thinking, problem-solving, presentation skills",
    outcomes: "Grasp AI basics through storytelling and games. Explore real-world AI uses (YouTube, Siri, smart games). Train basic models (image or sound recognition). Build a project using AI-enhanced code in Scratch. Share ideas confidently in a friendly tech fair.",
    description: "A hands-on, story-driven intro to Artificial Intelligence where kids learn how AI sees, hears, and learns — and then train their own smart assistant. Each child creates a playful AI project using tools like Teachable Machine and Scratch, helping them build logic and digital creativity.",
    days: [
      {
        day: 1,
        title: "Can Computers Think?",
        hours: 3,
        activities: "Icebreakers, intro games, roleplay AI",
        skills: "AI literacy, critical thinking"
      },
      {
        day: 2,
        title: "Who Taught YouTube?",
        hours: 3,
        activities: "Discover AI in daily life, map ideas",
        skills: "Analysis, pattern recognition"
      },
      {
        day: 3,
        title: "Catch the Cat or Clap!",
        hours: 3,
        activities: "Train a model with images/sounds",
        skills: "Data collection, model training"
      },
      {
        day: 4,
        title: "Make AI Talk in Scratch!",
        hours: 3,
        activities: "Build a game/story with AI input",
        skills: "Programming, creativity"
      },
      {
        day: 5,
        title: "Show Off Mr. AI!",
        hours: 3,
        activities: "Present project, reflect, get feedback",
        skills: "Presentation, communication"
      }
    ]
  },
  {
    id: 17,
    title: "Train Your AI Pet! – Make Smart Projects That Learn",
    icon: Computer,
    ageGroup: "11–14",
    duration: "3 hours",
    category: "technology",
    level: "Level 2",
    maxGroupSize: 15,
    totalDuration: "18 hours (6 sessions × 3 hours)",
    project: "Train a digital AI pet that responds to voice, poses, or objects using machine learning models",
    stemFocus: "Machine learning, conditional logic, interactive design, computational thinking",
    lifeSkills: "Design thinking, problem-solving, creativity, ethical awareness",
    outcomes: "Deepen understanding of AI training and decision-making. Build more refined models with multiple labels and better accuracy. Apply conditional logic to AI inputs in creative projects. Develop and present interactive digital pets or characters that \"think.\" Begin exploring ethical thinking in how AI behaves and learns.",
    description: "In this playful intermediate course, kids step up their AI skills by training their own \"AI pet\" — a custom digital friend that responds to voice, poses, or objects. They'll explore machine learning, logic building, and interactive design using Teachable Machine, Scratch, and optional tools like Machine Learning for Kids.",
    days: [
      {
        day: 1,
        title: "How AI Makes Decisions",
        hours: 3,
        activities: "Decision trees, input/output, logic games",
        skills: "Computational thinking, logic"
      },
      {
        day: 2,
        title: "Train It Better!",
        hours: 3,
        activities: "Train multi-class models (3+ labels)",
        skills: "Data collection, model training"
      },
      {
        day: 3,
        title: "Design a Smart Friend",
        hours: 3,
        activities: "Plan behavior: bark, wave, cheer, etc.",
        skills: "Design planning, creativity"
      },
      {
        day: 4,
        title: "If... Then... AI",
        hours: 3,
        activities: "Link AI inputs to animated actions or sound effects",
        skills: "Programming, integration"
      },
      {
        day: 5,
        title: "What If It Fails?",
        hours: 3,
        activities: "Error handling, re-training, smarter responses",
        skills: "Debugging, optimization"
      },
      {
        day: 6,
        title: "My AI Pet's Got Talent!",
        hours: 3,
        activities: "Demo day: Each project presents and reflects",
        skills: "Presentation, peer feedback"
      }
    ]
  },
  {
    id: 18,
    title: "AI in the Wild! – Bring Smart Ideas to Life",
    icon: Cpu,
    ageGroup: "12–15",
    duration: "3 hours",
    category: "technology",
    level: "Level 3",
    maxGroupSize: 12,
    totalDuration: "18 hours (6 sessions × 3 hours)",
    project: "Connect AI models with real-world outputs using hardware like micro:bit or Arduino",
    stemFocus: "AI integration, electronics, physical computing, interactive design",
    lifeSkills: "Problem-solving, engineering design, troubleshooting, presentation skills",
    outcomes: "Connect AI inputs (voice, image, motion) to real devices. Use Scratch or Python to control outputs (LEDs, motors, sounds). Design and build a working AI-powered invention. Understand basic hardware components and how AI can interact with them. Explore how AI affects real-world problem solving and safety.",
    description: "This advanced hands-on course bridges digital and physical worlds. Students connect AI models with real-world outputs using simple hardware (micro:bit, Arduino, or Makey Makey) and explore how AI powers robots, smart devices, and interactive installations. They'll build a responsive prototype like an \"AI guard dog\" or \"smart plant helper.\"",
    days: [
      {
        day: 1,
        title: "Can AI Move Things?",
        hours: 3,
        activities: "Intro to hardware and connecting AI outputs",
        skills: "Circuit basics, physical computing"
      },
      {
        day: 2,
        title: "Make It Smarter!",
        hours: 3,
        activities: "Train refined models (voice, image, pose)",
        skills: "Model training, data collection"
      },
      {
        day: 3,
        title: "What Will Your AI Do?",
        hours: 3,
        activities: "Design idea: security bot, plant whisperer",
        skills: "Engineering design, planning"
      },
      {
        day: 4,
        title: "Wires + Code = Magic",
        hours: 3,
        activities: "Assemble and connect model to physical output",
        skills: "Hardware integration, coding"
      },
      {
        day: 5,
        title: "Make It Smarter, Safer",
        hours: 3,
        activities: "Debug input/output, improve accuracy",
        skills: "Troubleshooting, optimization"
      },
      {
        day: 6,
        title: "Look What I Made!",
        hours: 3,
        activities: "Present AI creations with working demos",
        skills: "Presentation, documentation"
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
    id: 14,
    title: "Techpreneurs Lab – From Prototype to Product",
    icon: Briefcase,
    ageGroup: "15–18",
    duration: "4 hours",
    category: "technology",
    level: "Level 4",
    maxGroupSize: 10,
    totalDuration: "20 hours (5 sessions of 4 hours each)",
    project: "Refine an existing tech prototype or develop a new solution for market readiness",
    stemFocus: "Digital fabrication, PCB design, 3D printing, product development",
    lifeSkills: "Entrepreneurship, business modeling, market analysis, investor relations",
    outcomes: "Refine and scale tech prototypes for real-world application. Conduct competitive and market analysis. Develop a business model and go-to-market strategy. Master digital fabrication (3D printing, laser cutting, PCB design). Build investor-ready pitch decks and product demos.",
    description: "This capstone-level course blends deep tech innovation with entrepreneurship. Students refine an existing tech prototype or develop a new solution, conduct market research, design for manufacturability, and prepare full product presentations. The course ends with a demo day for investors, community leaders, and tech incubators.",
    days: [
      {
        day: 1,
        title: "Product Thinking",
        hours: 4,
        activities: "Analyze real tech products, user needs, lifecycle and roadmap planning",
        skills: "UX thinking, research, planning"
      },
      {
        day: 2,
        title: "Tech to Market",
        hours: 4,
        activities: "Market research, SWOT, business model canvas, prototyping for scale",
        skills: "Entrepreneurship, design thinking"
      },
      {
        day: 3,
        title: "Fabrication & Branding",
        hours: 4,
        activities: "PCB design, 3D print housing, visual identity, packaging",
        skills: "Digital fabrication, branding"
      },
      {
        day: 4,
        title: "Startup Simulation",
        hours: 4,
        activities: "Pitch deck creation, pricing, marketing, legal/IP basics",
        skills: "Startup skills, team roles"
      },
      {
        day: 5,
        title: "Demo & Funding Day",
        hours: 4,
        activities: "Present to community incubators, potential investors, online showcase",
        skills: "Public speaking, investor relations"
      }
    ]
  },
  {
    id: 15,
    title: "Tech Ambassadors – Leading & Teaching Innovation",
    icon: GraduationCap,
    ageGroup: "16–19",
    duration: "4 hours",
    category: "technology",
    level: "Level 5",
    maxGroupSize: 8,
    totalDuration: "24 hours (6 sessions of 4 hours)",
    project: "Design and lead tech workshops for younger students",
    stemFocus: "STEM pedagogy, educational design, leadership development",
    lifeSkills: "Teaching, facilitation, mentoring, public speaking, ethical leadership",
    outcomes: "Master the pedagogy of teaching STEM and tech to young learners. Facilitate hands-on learning with empathy and inclusivity. Lead small tech workshops, events, or hackathons. Understand educational ethics, motivation techniques, and team dynamics. Develop and evaluate educational content and toolkits.",
    description: "This elite-level training transforms top learners into youth tech leaders and community changemakers. Participants develop advanced teaching, leadership, and facilitation skills, design learning experiences for younger students, and run their own mini workshops. It includes ethics, inclusive tech education, and mentoring practices.",
    days: [
      {
        day: 1,
        title: "Becoming a Leader",
        hours: 4,
        activities: "Identifying strengths, leadership styles, mentoring stories",
        skills: "Self-awareness, role modeling"
      },
      {
        day: 2,
        title: "Tech Teaching Toolkit",
        hours: 4,
        activities: "How to teach tech to different age groups, breaking down complexity",
        skills: "Pedagogy, communication"
      },
      {
        day: 3,
        title: "Educational Design",
        hours: 4,
        activities: "Design micro-lessons, activities, and inclusive learning kits",
        skills: "Instructional design"
      },
      {
        day: 4,
        title: "Practice Teaching",
        hours: 4,
        activities: "Conduct a mock workshop, peer feedback, classroom management",
        skills: "Facilitation, adaptation"
      },
      {
        day: 5,
        title: "Ethics & Inclusion",
        hours: 4,
        activities: "Equity in STEM, teaching with empathy, cultural context awareness",
        skills: "Educational ethics, empathy"
      },
      {
        day: 6,
        title: "Final Showcase",
        hours: 4,
        activities: "Run a real session with younger students; reflection and certification",
        skills: "Coaching, evaluation"
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
  },
  {
    id: 21,
    title: "Eyes in the Sky! – Explore, Map & Measure with Drones",
    icon: Map,
    ageGroup: "13–16",
    duration: "3 hours",
    category: "technology",
    level: "Level 3",
    maxGroupSize: 10,
    totalDuration: "18 hours (6 sessions × 3 hours)",
    project: "Use drones for aerial photography, mapping, and environmental monitoring",
    stemFocus: "Aerial imaging, data collection, GPS navigation, spatial analysis",
    lifeSkills: "Environmental awareness, data interpretation, problem-solving, spatial reasoning",
    outcomes: "Capture and interpret aerial images and videos. Measure real-world distances using drones. Understand how drones use sensors (camera, altimeter, compass). Explore basic GPS-based flight control. Conduct a mini drone-based research project.",
    description: "In this advanced course, students become drone scientists and explorers. They'll learn how to use drones for aerial photography, mapping, environmental monitoring, and basic GPS navigation. Real-world missions include mapping a small area, measuring distances, and capturing visual data.",
    days: [
      {
        day: 1,
        title: "What Can You See From Up There?",
        hours: 3,
        activities: "Intro to aerial imaging, test photo flights",
        skills: "Camera control, flight stability"
      },
      {
        day: 2,
        title: "How High, How Far?",
        hours: 3,
        activities: "Estimate height, area, and distance from the air",
        skills: "Measurement, spatial estimation"
      },
      {
        day: 3,
        title: "Create Your Own Aerial Map",
        hours: 3,
        activities: "Fly in patterns, stitch photos into maps",
        skills: "Systematic data collection, basic mapping"
      },
      {
        day: 4,
        title: "Spot the Flood or Trash Zone!",
        hours: 3,
        activities: "Collect data on an issue (e.g., blocked paths)",
        skills: "Environmental analysis, documentation"
      },
      {
        day: 5,
        title: "Plan & Pitch a Drone Solution",
        hours: 3,
        activities: "Teams propose and prep a real-world flight mission",
        skills: "Project planning, presentation design"
      },
      {
        day: 6,
        title: "What Did You Discover?",
        hours: 3,
        activities: "Present data/maps, discuss findings, award medals",
        skills: "Data presentation, critical analysis"
      }
    ]
  },
  {
    id: 22,
    title: "Create with AI! – Your First Steps into Generative Magic",
    icon: Image,
    ageGroup: "11–14",
    duration: "3 hours",
    category: "technology",
    level: "Level 1",
    maxGroupSize: 15,
    totalDuration: "12 hours (4 sessions × 3 hours)",
    project: "Create images, stories, music, and presentations using AI tools",
    stemFocus: "Artificial intelligence, digital creativity, computational thinking, multimedia production",
    lifeSkills: "Creative expression, critical thinking, digital literacy, responsible technology use",
    outcomes: "Understand what Generative AI is and how it creates new content. Use text prompts to generate images, stories, and art. Create their own characters, songs, or comics using AI tools. Discuss the pros, cons, and responsible use of AI creativity. Present a creative mini project made with AI.",
    description: "This course unlocks the fun side of Generative AI — letting students create images, music, stories, and videos with the help of smart machines. Learners will experiment with tools like DALL·E, ChatGPT, and AI music generators, all while understanding the basics of how these tools \"think.\"",
    days: [
      {
        day: 1,
        title: "Can a Robot Draw?",
        hours: 3,
        activities: "Intro games, AI-generated image play",
        skills: "Digital creativity, prompt writing"
      },
      {
        day: 2,
        title: "Write Me a Wild Tale!",
        hours: 3,
        activities: "Create characters, plot twists using ChatGPT",
        skills: "Storytelling, AI interaction"
      },
      {
        day: 3,
        title: "Can AI Compose?",
        hours: 3,
        activities: "Make a theme song or game music with AI",
        skills: "Audio production, mood design"
      },
      {
        day: 4,
        title: "Present Your Creation",
        hours: 3,
        activities: "Combine story + image + sound into final project",
        skills: "Presentation, creative integration"
      }
    ]
  },
  {
    id: 23,
    title: "Prompt Masters! – Shape AI into Your Creative Tool",
    icon: MessageSquare,
    ageGroup: "12–15",
    duration: "3 hours",
    category: "technology",
    level: "Level 2",
    maxGroupSize: 12,
    totalDuration: "15 hours (5 sessions × 3 hours)",
    project: "Create multimedia stories and digital posters with better AI prompts",
    stemFocus: "Artificial intelligence, prompt engineering, digital storytelling, multimedia creation",
    lifeSkills: "Creative thinking, digital literacy, critical evaluation, ethical awareness",
    outcomes: "Write effective prompts to get more accurate and creative AI outputs. Mix text, image, and audio AI tools to build multimedia stories. Learn how to revise and improve AI-generated content. Explore where AI content comes from and why that matters. Build a mini portfolio of AI-generated creative work.",
    description: "In this hands-on course, students level up their creativity by learning how to craft better prompts for smarter results. They'll experiment with image styles, story twists, voice and tone in writing, and even generate simple comics, music videos, and digital posters — all guided by Generative AI.",
    days: [
      {
        day: 1,
        title: "Say It Right to Make It Bright!",
        hours: 3,
        activities: "Experiment with prompt styles and tweaks",
        skills: "Prompt engineering, creative thinking"
      },
      {
        day: 2,
        title: "Make It Smarter!",
        hours: 3,
        activities: "Compare AI drafts, improve them, rewrite endings",
        skills: "Revision, creative writing"
      },
      {
        day: 3,
        title: "My AI Adventure!",
        hours: 3,
        activities: "Generate scenes, write dialogue, design layout",
        skills: "Comic creation, storytelling"
      },
      {
        day: 4,
        title: "Soundtrack for My Story",
        hours: 3,
        activities: "Match story scenes with mood music",
        skills: "Audio-visual pairing, mood design"
      },
      {
        day: 5,
        title: "What Should AI Create?",
        hours: 3,
        activities: "Discuss limits, present portfolios to peers",
        skills: "Ethics, presentation, peer feedback"
      }
    ]
  },
  {
    id: 24,
    title: "AI Story Studio! – Build a World with Text, Art & Sound",
    icon: FileText,
    ageGroup: "13–16",
    duration: "3 hours",
    category: "technology",
    level: "Level 3",
    maxGroupSize: 10,
    totalDuration: "18 hours (6 sessions × 3 hours)",
    project: "Create a multimedia story using AI-generated text, images, and audio",
    stemFocus: "AI integration, digital storytelling, media production, creative technology",
    lifeSkills: "Project management, creative direction, narrative design, presentation skills",
    outcomes: "Design and script an original AI-generated story, documentary, or explainer. Use multiple AI tools to generate visual, textual, and audio elements. Build a multimedia story (video, slideshow, podcast, or animated comic). Edit and polish AI outputs into a professional final product. Present their work as part of a public or classroom exhibition.",
    description: "This advanced course transforms students into creative directors of their own AI-powered worlds. They will use generative tools to script, illustrate, narrate, and even animate mini-stories or documentaries. The focus is on combining different media types (text, image, audio) into cohesive digital productions.",
    days: [
      {
        day: 1,
        title: "Build Your World!",
        hours: 3,
        activities: "Plan plot, characters, scenes with AI assistance",
        skills: "Story engineering, world-building"
      },
      {
        day: 2,
        title: "Draw My Imagination!",
        hours: 3,
        activities: "Generate and refine visual scenes and characters",
        skills: "Visual prompt engineering, image curation"
      },
      {
        day: 3,
        title: "Make It Speak!",
        hours: 3,
        activities: "Create AI voice narration or sound effects",
        skills: "Voice direction, audio production"
      },
      {
        day: 4,
        title: "Now Bring It to Life!",
        hours: 3,
        activities: "Combine elements into video or animated story",
        skills: "Animation, multimedia assembly"
      },
      {
        day: 5,
        title: "Sound Good? Look Right?",
        hours: 3,
        activities: "Edit, refine, sync narration, visuals, music",
        skills: "Editing, quality control"
      },
      {
        day: 6,
        title: "My AI Show Launch!",
        hours: 3,
        activities: "Present projects, Q&A, feedback & digital certificates",
        skills: "Presentation, receiving feedback"
      }
    ]
  },
  {
    id: 25,
    title: "AI Art Lab! – Draw, Paint & Design with Smart Tools",
    icon: Palette,
    ageGroup: "10–13",
    duration: "3 hours",
    category: "technology",
    level: "Level 1",
    maxGroupSize: 15,
    totalDuration: "12 hours (4 sessions × 3 hours)",
    project: "Create digital art using AI tools and design a mini-gallery of work",
    stemFocus: "Artificial intelligence, digital art, visual design, computational creativity",
    lifeSkills: "Creative expression, digital literacy, design thinking, presentation skills",
    outcomes: "Understand how AI turns text into art. Create art in different styles (cartoon, abstract, realistic). Mix their own ideas with AI outputs using creative prompts. Design a poster, card, or mini-gallery of their work. Reflect on the artist's role when using smart tools.",
    description: "This course invites young learners into a digital art studio powered by AI. Students explore how machines can create pictures, mix styles, and even turn words into wild artworks. It's all about learning the magic of visual creativity with fun, safe tools.",
    days: [
      {
        day: 1,
        title: "Make a Flying Banana!",
        hours: 3,
        activities: "Intro to AI art, silly prompts",
        skills: "AI literacy, creative thinking"
      },
      {
        day: 2,
        title: "Paint Like Picasso!",
        hours: 3,
        activities: "Use prompts to create art in different styles",
        skills: "Style recognition, prompt crafting"
      },
      {
        day: 3,
        title: "Make a Poster or Card!",
        hours: 3,
        activities: "Turn AI art into a real design (gift, card)",
        skills: "Design, digital editing"
      },
      {
        day: 4,
        title: "Show Your AI Masterpiece",
        hours: 3,
        activities: "Display & present favorite creations",
        skills: "Presentation, reflection"
      }
    ]
  },
  {
    id: 26,
    title: "Talk to a Robot! – Create Stories, Jokes & Games with AI",
    icon: MessageSquare,
    ageGroup: "10–13",
    duration: "3 hours",
    category: "technology",
    level: "Level 1",
    maxGroupSize: 15,
    totalDuration: "12 hours (4 sessions × 3 hours)",
    project: "Create interactive stories, jokes, riddles, and choose-your-own-adventure games using AI",
    stemFocus: "Artificial intelligence, computational thinking, language processing, creative writing",
    lifeSkills: "Communication, creativity, storytelling, presentation skills",
    outcomes: "Learn how to \"talk\" to AI using prompts and questions. Create short stories, poems, and fun characters. Design interactive stories with choices and branching paths. Use AI to generate silly jokes, riddles, and quiz questions. Present their work and get feedback in a group.",
    description: "This course brings language to life! Kids will chat with AI to invent stories, make up jokes, write riddles, and even build choose-your-own-adventure games. It's a playful path into writing and creativity using smart tools that talk back.",
    days: [
      {
        day: 1,
        title: "Hello AI Writer!",
        hours: 3,
        activities: "Intro to chatting with AI, poems, fun facts",
        skills: "AI conversation, prompt writing"
      },
      {
        day: 2,
        title: "Joke & Riddle Lab",
        hours: 3,
        activities: "Write original jokes, riddles, and mini quizzes",
        skills: "Humor, creative writing"
      },
      {
        day: 3,
        title: "Build a Story Game",
        hours: 3,
        activities: "Plan branching stories and use AI to help write",
        skills: "Narrative design, decision trees"
      },
      {
        day: 4,
        title: "Storytelling Stage",
        hours: 3,
        activities: "Share creations, peer feedback, celebration",
        skills: "Presentation, peer feedback"
      }
    ]
  },
  {
    id: 27,
    title: "Hack Your Home! – Intro to Smart Devices & IoT",
    icon: Wifi,
    ageGroup: "11–14",
    duration: "3 hours",
    category: "technology",
    level: "Level 1",
    maxGroupSize: 12,
    totalDuration: "12 hours (4 sessions × 3 hours)",
    project: "Build a mini smart room with automated features using simple electronics",
    stemFocus: "Internet of Things (IoT), electronics, sensor technology, basic programming",
    lifeSkills: "Problem-solving, creative thinking, technical communication, presentation skills",
    outcomes: "Understand what IoT is and how smart devices work. Learn about sensors (motion, light, temperature) and actuators. Program simple smart actions (like lights that react to movement). Build a mini \"smart room\" using plug-and-play electronics. Present a working demo of their automated idea.",
    description: "This course introduces students to the Internet of Things (IoT) — the tech behind smart homes, smart lights, and automated gadgets. Learners will explore how sensors, apps, and basic coding can make devices smarter and more helpful, and they'll create simple home automation projects.",
    days: [
      {
        day: 1,
        title: "Welcome to Smart Tech",
        hours: 3,
        activities: "Intro to IoT, explore smart home examples",
        skills: "IoT concepts, systems thinking"
      },
      {
        day: 2,
        title: "Sensors & Signals",
        hours: 3,
        activities: "Build simple circuits with motion-triggered LEDs",
        skills: "Electronics basics, circuit building"
      },
      {
        day: 3,
        title: "Smart Room Project",
        hours: 3,
        activities: "Plan and build a smart room corner (e.g., auto-fan)",
        skills: "Project design, implementation"
      },
      {
        day: 4,
        title: "Demo & Reflect",
        hours: 3,
        activities: "Present smart room idea, discuss real-world use",
        skills: "Presentation, ethical thinking"
      }
    ]
  }
];

export const getAllCourses = (): Course[] => {
  return courses;
};

export const getCourseById = (id: number): Course | undefined => {
  return courses.find(course => course.id === id);
};
