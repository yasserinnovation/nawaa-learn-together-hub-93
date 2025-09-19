import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { courseId } = await req.json();

    if (!courseId) {
      return new Response(
        JSON.stringify({ error: 'Course ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Import docx dynamically
    const docxModule = await import('https://esm.sh/docx@8.5.0');
    const { 
      Document, 
      Packer, 
      Paragraph, 
      TextRun, 
      HeadingLevel, 
      AlignmentType,
      UnderlineType,
      BorderStyle
    } = docxModule;

    // Sample course data - in a real app, you'd fetch from database
    const sampleCourses = [
      {
        id: 1,
        title: "Inventor's Playground – Building a Smart Mini Theme Park",
        ageGroup: "10–13",
        duration: "3 hours",
        category: "technology",
        level: "Level 1",
        description: "This beginner-friendly, project-based course introduces young learners to key concepts in electronics, robotics, renewable energy, and creative problem-solving.",
        requirements: ["Basic understanding of electronics", "Interest in building and creating", "Team collaboration skills"],
        learningOutcomes: [
          "Understand basic electronic components",
          "Apply principles of circuitry: parallel and series connections", 
          "Program simple robotic functions using LEGO EV3",
          "Harness renewable energy sources",
          "Develop creative problem-solving and teamwork skills"
        ],
        stemFocus: "Electronics, robotics, renewable energy, circuitry",
        lifeSkills: "Creative problem-solving, teamwork, presentation skills, leadership",
        price: 299
      },
      {
        id: 2,
        title: "Meet Mr. AI! – Discover the Smart Side of Tech",
        ageGroup: "10–13",
        duration: "3 hours",
        category: "technology", 
        level: "Level 1",
        description: "A hands-on, story-driven intro to Artificial Intelligence where kids learn how AI sees, hears, and learns — and then train their own smart assistant.",
        requirements: ["Basic computer skills", "Curiosity about technology", "Creative thinking"],
        learningOutcomes: [
          "Grasp AI basics through storytelling and games",
          "Explore real-world AI applications", 
          "Train basic machine learning models",
          "Build AI-enhanced projects in Scratch",
          "Present ideas confidently"
        ],
        stemFocus: "Artificial intelligence, machine learning, computer science, programming",
        lifeSkills: "Digital creativity, critical thinking, problem-solving, presentation skills",
        price: 249
      }
    ];

    const course = sampleCourses.find(c => c.id === parseInt(courseId)) || sampleCourses[0];

    // Create Word document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: course.title,
                bold: true,
                size: 32,
                color: "1F2937"
              })
            ],
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 }
          }),

          // Course Overview
          new Paragraph({
            children: [
              new TextRun({
                text: "Course Overview",
                bold: true,
                size: 24,
                color: "374151"
              })
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Age Group: `,
                bold: true
              }),
              new TextRun({
                text: course.ageGroup
              })
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Duration: `,
                bold: true
              }),
              new TextRun({
                text: course.duration
              })
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Category: `,
                bold: true
              }),
              new TextRun({
                text: course.category.charAt(0).toUpperCase() + course.category.slice(1)
              })
            ],
            spacing: { after: 100 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Level: `,
                bold: true
              }),
              new TextRun({
                text: course.level
              })
            ],
            spacing: { after: 200 }
          }),

          // Description
          new Paragraph({
            children: [
              new TextRun({
                text: "Description",
                bold: true,
                size: 20,
                color: "374151"
              })
            ],
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 150 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: course.description
              })
            ],
            spacing: { after: 200 }
          }),

          // STEM Focus
          new Paragraph({
            children: [
              new TextRun({
                text: "STEM Focus Areas",
                bold: true,
                size: 20,
                color: "374151"
              })
            ],
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 150 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: course.stemFocus
              })
            ],
            spacing: { after: 200 }
          }),

          // Life Skills
          new Paragraph({
            children: [
              new TextRun({
                text: "Life Skills Development",
                bold: true,
                size: 20,
                color: "374151"
              })
            ],
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 150 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: course.lifeSkills
              })
            ],
            spacing: { after: 200 }
          }),

          // Requirements
          new Paragraph({
            children: [
              new TextRun({
                text: "Prerequisites",
                bold: true,
                size: 20,
                color: "374151"
              })
            ],
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 150 }
          }),

          ...course.requirements.map(req => new Paragraph({
            children: [
              new TextRun({
                text: `• ${req}`
              })
            ],
            spacing: { after: 100 }
          })),

          // Learning Outcomes
          new Paragraph({
            children: [
              new TextRun({
                text: "Learning Outcomes",
                bold: true,
                size: 20,
                color: "374151"
              })
            ],
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 300, after: 150 }
          }),

          ...course.learningOutcomes.map(outcome => new Paragraph({
            children: [
              new TextRun({
                text: `✓ ${outcome}`
              })
            ],
            spacing: { after: 100 }
          })),

          // Pricing
          new Paragraph({
            children: [
              new TextRun({
                text: "Course Investment",
                bold: true,
                size: 20,
                color: "374151"
              })
            ],
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 300, after: 150 }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `${course.price} EGP per participant`,
                bold: true,
                size: 16,
                color: "059669"
              })
            ],
            spacing: { after: 200 }
          }),

          // Footer
          new Paragraph({
            children: [
              new TextRun({
                text: "Generated by NAWAA Platform",
                italics: true,
                size: 16,
                color: "6B7280"
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400 }
          })
        ]
      }]
    });

    // Generate the document buffer
    const buffer = await Packer.toBuffer(doc);

    // Return the document
    return new Response(buffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${course.title.replace(/[^a-zA-Z0-9]/g, '_')}.docx"`,
      },
    });

  } catch (error) {
    console.error('Error generating Word document:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate Word document',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});