import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Globe, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const CompetitionsGuide = () => {
  const competitions = [
    {
      id: 1,
      title: "FIRST LEGO League Egypt (FLL)",
      titleEn: "FIRST LEGO League Egypt (FLL)",
      ages: "من 4 إلى 16 سنة | 4–16 years",
      description: "تصميم وبرمجة روبوتات LEGO، أكبر وأشهر بطولة روبوتات تعليمية في مصر.",
      address: "23 شارع عصام حلمي المصري، سموحة، الإسكندرية",
      phone: "+20 (3) 4244803 / +20 1554000256",
      website: "https://firstlegoleagueegypt.org/",
      facebook: "https://www.facebook.com/FIRSTLEGOLEAGUEEGYPT/",
      category: "Robotics"
    },
    {
      id: 2,
      title: "Robotex Egypt",
      titleEn: "Robotex Egypt",
      ages: "جميع الأعمار | All ages",
      description: "النسخة المصرية من مسابقة Robotex الدولية (روبوتات، ابتكار، AI).",
      date: "18–19 يوليو 2025 | 18–19 July 2025",
      location: "كلية كارلتون – مدينة الشروق، القاهرة | Carleton College Egypt – El Shorouk, Cairo",
      email: "abdallah@robotex.international",
      website: "https://robotex-eg.com/",
      facebook: "https://www.facebook.com/robotex.eg/",
      category: "Robotics"
    },
    {
      id: 3,
      title: "International Robot Challenge (IRC)",
      titleEn: "International Robot Challenge (IRC)",
      ages: "من 6 سنوات فما فوق | 6+ years",
      description: "مسابقات روبوتات، برمجة، ذكاء اصطناعي وبحث علمي.",
      date: "4 أكتوبر 2025 | 4 October 2025",
      website: "https://international-robotchallenge.org/",
      facebook: "https://www.facebook.com/InternationalRobotChallenge/",
      instagram: "https://www.instagram.com/internationalrobotchallenge/",
      category: "Robotics"
    },
    {
      id: 4,
      title: "Robofest Egypt",
      titleEn: "Robofest Egypt",
      ages: "الصف الرابع حتى 12 | Grades 4–12",
      description: "طلاب يمكنهم استخدام أي عدة روبوتات أو لغة برمجة.",
      dates: "التسجيل المسبق: 8 سبتمبر | نهائيات مصر: أغسطس | النهائيات العالمية: 15–17 مايو",
      email: "robofest@ltu.edu",
      website: "https://www.robofest.net/",
      facebook: "https://www.facebook.com/p/Robofest-EGYPT-100092659810325/",
      category: "Robotics"
    },
    {
      id: 5,
      title: "World Robot Olympiad (WRO Egypt)",
      titleEn: "World Robot Olympiad (WRO Egypt)",
      ages: "8–19 سنة | 8–19 years",
      description: "أولمبياد عالمي للروبوتات بفئات تعليمية متعددة.",
      finalDate: "النهائي العالمي: سنغافورة 26–28 نوفمبر 2025 | Singapore, 26–28 Nov 2025",
      website: "https://wro-association.org/",
      facebook: "https://www.facebook.com/WROEgyptOfficial",
      category: "Robotics"
    },
    {
      id: 6,
      title: "RoboCupJunior Egypt",
      titleEn: "RoboCupJunior Egypt",
      ages: "الأطفال والطلاب | K–12 students",
      description: "روبوتات كرة، إنقاذ، رقص.",
      date: "16–19 أبريل 2025 | 16–19 April 2025",
      location: "الأكاديمية العربية للعلوم والتكنولوجيا (الإسكندرية) | AASTMT, Alexandria",
      website: "https://aast.edu",
      category: "Robotics"
    },
    {
      id: 7,
      title: "RoboRAVE Egypt",
      titleEn: "RoboRAVE Egypt",
      ages: "من 8 سنوات حتى الكبار | 8+ years",
      description: "تحديات بناء وتصميم روبوتات.",
      date: "4–5 يوليو 2025 | 4–5 July 2025",
      location: "جامعة مصر-اليابان (E-JUST) | E-JUST, Egypt-Japan Univ.",
      facebook: "https://www.facebook.com/roboraveegypt",
      website: "https://ejust.edu.eg",
      category: "Robotics"
    },
    {
      id: 8,
      title: "IEEE SSCS Arduino Contest 2025",
      titleEn: "IEEE SSCS Arduino Contest 2025",
      ages: "ثانوي وجامعة | High school & university",
      description: "ابتكار مشاريع إلكترونية لذوي الإعاقة.",
      deadline: "الموعد النهائي: 15 أغسطس 2025 | Deadline: 15 August 2025",
      website: "https://arduino-contest.sscs.ieee.org/",
      category: "Electronics"
    },
    {
      id: 9,
      title: "Arab AI Olympiad – Egypt",
      titleEn: "Arab AI Olympiad – Egypt",
      description: "منافسات في الذكاء الاصطناعي والأمن السيبراني.",
      phone: "+20 1281884422",
      facebook: "https://www.facebook.com/p/الأولمبياد-العربي-للذكاء-الاصطناعي-بطولة-مصر-100086521389123/",
      category: "AI"
    },
    {
      id: 10,
      title: "Arab Programming Week 2025",
      titleEn: "Arab Programming Week 2025",
      description: "أسبوع برمجة عربي لتعزيز الابتكار.",
      facebook: "https://www.facebook.com/MOHESREGYPT/posts/1234190458063786",
      category: "Programming"
    },
    {
      id: 11,
      title: "Afro-Asian Forum for Innovation & Technology (AAFFIAT)",
      titleEn: "Afro-Asian Forum for Innovation & Technology (AAFFIAT)",
      ages: "6–18 سنة | 6–18 years",
      finalDate: "النهائيات: ماليزيا، أكتوبر 2025 | Finals: Malaysia, October 2025",
      website: "https://africaniat.com/",
      facebook: "https://www.facebook.com/africaniat/",
      instagram: "https://www.instagram.com/aaffiategypt/",
      category: "Innovation"
    },
    {
      id: 12,
      title: "Egypt IoT & AI Challenge",
      titleEn: "Egypt IoT & AI Challenge",
      description: "طلاب ثانوي، جامعات، Startups",
      website: "https://iotandai.com/",
      facebook: "https://www.facebook.com/IOTAIChallenge",
      youtube: "https://www.youtube.com/@IoTandAIChallenge",
      category: "AI"
    },
    {
      id: 13,
      title: "Global Robotics Challenge (GRC)",
      titleEn: "Global Robotics Challenge (GRC)",
      description: "روبوتات ذاتية، غواصات صغيرة، برمجة.",
      website: "https://www.grc-championship.com/",
      email: "GlobalRoboticsChallenge01@gmail.com",
      phone: "+20 1275570270",
      facebook: "https://www.facebook.com/Global-Robotics-Challenge-61554115716058/",
      category: "Robotics"
    },
    {
      id: 14,
      title: "Codeavour Egypt",
      titleEn: "Codeavour Egypt",
      description: "برمجة وذكاء اصطناعي باستخدام PictoBlox.",
      website: "https://codeavour.org/",
      websiteEgypt: "https://codeavour-egypt.org/",
      facebook: "https://www.facebook.com/CodeavourEgypt",
      category: "Programming"
    },
    {
      id: 15,
      title: "Egyptian Olympiad in Informatics (EOI)",
      titleEn: "Egyptian Olympiad in Informatics (EOI)",
      description: "أولمبياد خوارزميات وبرمجة (IOI).",
      website: "https://eoi.ciit.org.eg/",
      facebook: "https://www.facebook.com/EgyptianOlympiadInInformatics",
      category: "Programming"
    },
    {
      id: 16,
      title: "Egyptian Collegiate Programming Contest (ECPC)",
      titleEn: "Egyptian Collegiate Programming Contest (ECPC)",
      description: "تنافس فرق جامعية نحو ICPC.",
      website: "https://icpc.global/regionals/finder/Egyptian-Collegiate-Programming-Contest-ECPC-2025",
      facebook: "https://www.facebook.com/ECPCofficial",
      category: "Programming"
    },
    {
      id: 17,
      title: "NASA Space Apps Challenge (Cairo & Alexandria)",
      titleEn: "NASA Space Apps Challenge (Cairo & Alexandria)",
      date: "4–5 أكتوبر 2025 | 4–5 October 2025",
      website: "https://www.spaceappschallenge.org/",
      websiteCairo: "https://spaceappscairo.com/",
      websiteAlex: "https://www.spaceappschallenge.org/locations/",
      category: "Space Tech"
    },
    {
      id: 18,
      title: "Maker Faire Cairo",
      titleEn: "Maker Faire Cairo",
      description: "معرض ابتكار وورش روبوتات.",
      website: "https://makerfairecairo.com/",
      facebook: "https://www.facebook.com/makerfairecairo",
      category: "Innovation"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Robotics": "bg-blue-100 text-blue-800",
      "Programming": "bg-green-100 text-green-800",
      "AI": "bg-purple-100 text-purple-800",
      "Electronics": "bg-orange-100 text-orange-800",
      "Innovation": "bg-pink-100 text-pink-800",
      "Space Tech": "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            دليل مسابقات التكنولوجيا في مصر 2025
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Egypt Technology Competitions Guide 2025
          </p>
          <p className="text-lg max-w-3xl mx-auto opacity-80">
            دليل شامل لجميع مسابقات التكنولوجيا والروبوتات والبرمجة في مصر لعام 2025
          </p>
        </div>
      </section>

      {/* Competitions Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {competitions.map((competition) => (
              <Card key={competition.id} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getCategoryColor(competition.category)}>
                      {competition.category}
                    </Badge>
                    <span className="text-sm text-gray-500">#{competition.id}</span>
                  </div>
                  <CardTitle className="text-lg mb-2">{competition.title}</CardTitle>
                  {competition.titleEn && (
                    <p className="text-sm text-gray-600">{competition.titleEn}</p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {competition.ages && (
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{competition.ages}</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-700">{competition.description}</p>

                  {competition.date && (
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-green-600" />
                      <span>{competition.date}</span>
                    </div>
                  )}

                  {competition.dates && (
                    <div className="flex items-start text-sm">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      <span>{competition.dates}</span>
                    </div>
                  )}

                  {competition.deadline && (
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-red-600" />
                      <span>{competition.deadline}</span>
                    </div>
                  )}

                  {competition.finalDate && (
                    <div className="flex items-start text-sm">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                      <span>{competition.finalDate}</span>
                    </div>
                  )}

                  {competition.location && (
                    <div className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-red-600" />
                      <span>{competition.location}</span>
                    </div>
                  )}

                  {competition.address && (
                    <div className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-red-600" />
                      <span>{competition.address}</span>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="space-y-2 pt-2 border-t">
                    {competition.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        <a href={`tel:${competition.phone}`} className="text-blue-600 hover:underline">
                          {competition.phone}
                        </a>
                      </div>
                    )}

                    {competition.email && (
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-600" />
                        <a href={`mailto:${competition.email}`} className="text-blue-600 hover:underline">
                          {competition.email}
                        </a>
                      </div>
                    )}

                    {competition.website && (
                      <div className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2 text-blue-600" />
                        <a href={competition.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          الموقع الرسمي
                        </a>
                      </div>
                    )}

                    {competition.websiteEgypt && (
                      <div className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2 text-blue-600" />
                        <a href={competition.websiteEgypt} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          موقع مصر
                        </a>
                      </div>
                    )}

                    {competition.websiteCairo && (
                      <div className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2 text-blue-600" />
                        <a href={competition.websiteCairo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          موقع القاهرة
                        </a>
                      </div>
                    )}

                    {competition.facebook && (
                      <div className="flex items-center text-sm">
                        <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                        <a href={competition.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          فيسبوك
                        </a>
                      </div>
                    )}

                    {competition.instagram && (
                      <div className="flex items-center text-sm">
                        <Instagram className="h-4 w-4 mr-2 text-pink-600" />
                        <a href={competition.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          إنستغرام
                        </a>
                      </div>
                    )}

                    {competition.youtube && (
                      <div className="flex items-center text-sm">
                        <Youtube className="h-4 w-4 mr-2 text-red-600" />
                        <a href={competition.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          يوتيوب
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">معلومات إضافية</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">الروبوتات</h3>
              <p className="text-gray-600">
                8 مسابقات متخصصة في الروبوتات والتحكم الآلي
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-600">البرمجة</h3>
              <p className="text-gray-600">
                4 مسابقات في البرمجة والخوارزميات
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">الذكاء الاصطناعي</h3>
              <p className="text-gray-600">
                2 مسابقة متخصصة في الذكاء الاصطناعي
              </p>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompetitionsGuide;