import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gitlab, Award, Facebook, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

// Define project type
interface Project {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  gitlabUrl?: string;
  liveUrl?: string;
  certificateUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
}

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const { category } = useCategory();
  const [filter, setFilter] = useState("all");
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  
  // Reset filter when category changes
  useEffect(() => {
    // For iOS, set filter to "app" by default
    if (category === "ios") {
      setFilter("app");
    } else {
      setFilter("all");
    }
  }, [category]);

  // Get section title based on category
  const getSectionTitle = () => {
    switch (category) {
      case "camps":
        return t("campParticipation");
      default:
        return t("myProjects");
    }
  };
  
  // All projects across categories
  const allProjects: Project[] = [
    // iOS Developer projects
    {
      id: 1,
      title: t('campsideTitle'),
      category: "ios",
      subcategory: "app",
      description: t('campsideDescription'),
      imageUrl: "/photos/ios-developer/Campside.png",
      githubUrl: "https://github.com/andriagv/TbcIosFinalProject",
    },
    {
      id: 2,
      title: t('instagramCloneTitle'),
      category: "ios",
      subcategory: "app",
      description: t('instagramCloneDescription'),
      imageUrl: "https://media.designrush.com/tinymce_images/262169/conversions/Instagram-app-design-content.jpg",
      githubUrl: "https://github.com/Irakli66/InstagramClone",
    },
    {
      id: 3,
      title: t('manageSubscriptionsTitle'),
      category: "ios",
      subcategory: "app",
      description: t('manageSubscriptionsDescription'),
      imageUrl: "/photos/ios-developer/ManageSubscriptions.png",
      gitlabUrl: "https://gitlab.com/techxplore7/manage-subscriptions-ios",
    },
    // Camps projects
    {
      id: 4,
      title: t('youngLeadersTitle'),
      category: "camps",
      subcategory: "participation",
      description: t('youngLeadersDescription'),
      imageUrl: "/photos/camps/YoungLeaders'School2023.jpeg"
    },
    {
      id: 5,
      title: t('anakliaTitle'),
      category: "camps",
      subcategory: "participation",
      description: t('anakliaDescription'),
      imageUrl: "https://imgs.search.brave.com/lLm9WnoYpJlLibej2U7YBjA1Pf8tqVgDsyskPtL5I2s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmlwbi5nZS9tZWRp/YS91cGxvYWRzLzIw/MjQvMDktMTYvYmFu/YWtpLmpwZw",
    },
    {
      id: 6,
      title: t('gitaTitle'),
      category: "camps",
      subcategory: "participation",
      description: t('gitaDescription'),
      imageUrl: "/photos/camps/GITAInnovation&StartupCamp.jpg",
      facebookUrl: "https://www.facebook.com/gitatechpark/photos/%E1%83%A5%E1%83%A3%E1%83%97%E1%83%90%E1%83%98%E1%83%A1%E1%83%98%E1%83%A1-%E1%83%A1%E1%83%90%E1%83%94%E1%83%A0%E1%83%97%E1%83%90%E1%83%A8%E1%83%9D%E1%83%A0%E1%83%98%E1%83%A1%E1%83%9D-%E1%83%A3%E1%83%9C%E1%83%98%E1%83%95%E1%83%94%E1%83%A0%E1%83%A1%E1%83%98%E1%83%A2%E1%83%94%E1%83%A2%E1%83%A8%E1%83%98-kiu-%E1%83%A1%E1%83%90-%E1%83%93%E1%83%90-gita-%E1%83%A1-%E1%83%98%E1%83%9C%E1%83%9D%E1%83%95%E1%83%90%E1%83%AA%E1%83%98%E1%83%94%E1%83%91%E1%83%98%E1%83%A1-%E1%83%A1%E1%83%90%E1%83%96%E1%83%90%E1%83%A4%E1%83%AE%E1%83%A3%E1%83%9A%E1%83%9D-%E1%83%A1%E1%83%99%E1%83%9D%E1%83%9A%E1%83%98/612378427734392/",
      linkedinUrl: "https://www.linkedin.com/in/andria-gvaramia-b85935229/overlay/1726070133896/single-media-viewer?type=LINK&profileId=ACoAADlE11UBT_eJRMHxiuoV4gkTpIVAGlSluvA&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B9UnLEeJvSqKTm1%2BduiJCog%3D%3D"
    },
    {
      id: 7,
      title: t('icsuTitle'),
      category: "camps",
      subcategory: "participation",
      description: language === 'en'
        ? 'ICSU is an independent organization of children and students who created a seasonal camp. I participated in the summer of 2021, in Kobuleti.'
        : 'ICSU არის ბავშვებისა და სტუდენტების დამოუკიდებელი ორგანიზაცია, რომელმაც შექმნა სეზონური ბანაკი. მე მონაწილეობა მივიღე 2021 წლის ზაფხულში, ქობულეთში.',
      imageUrl: "/photos/camps/icsu.jpg",
    },
    {
      id: 8,
      title: t('kiuAmbassadorTitle'),
      category: "camps",
      subcategory: "professional",
      description: t('kiuAmbassadorDescription'),
      imageUrl: "/photos/camps/KIUAmbassador.jpeg",
    },
    {
      id: 9,
      title: t('kiuAssistantTitle'),
      category: "camps",
      subcategory: "professional",
      description: t('kiuAssistantDescription'),
      imageUrl: "https://placehold.co/600x400?text=KIU+SA",
    },
    // Camp certificates
    {
      id: 101,
      title: t('campCertificate1Title'),
      category: "camps",
      subcategory: "certificate",
      description: t('campCertificate1Description'),
      imageUrl: "https://placehold.co/600x400?text=Camp+Certificate+1",
      certificateUrl: "https://example.com/certificate1",
    },
    {
      id: 102,
      title: t('campCertificate2Title'),
      category: "camps",
      subcategory: "certificate",
      description: t('campCertificate2Description'),
      imageUrl: "https://placehold.co/600x400?text=Camp+Certificate+2",
      certificateUrl: "https://example.com/certificate2",
    },
    // Academic achievements (formerly Robotics)
    {
      id: 10,
      title: t('kiuEducationTitle'),
      category: "academic",
      subcategory: "education",
      description: t('kiuEducationDescription'),
      imageUrl: "https://placehold.co/600x400?text=KIU+Education",
    },
    {
      id: 11,
      title: t('komarovSchoolTitle'),
      category: "academic",
      subcategory: "education",
      description: t('komarovSchoolDescription'),
      imageUrl: "https://placehold.co/600x400?text=Komarov+School",
    },
    // Startups projects
    {
      id: 12,
      title: t('mathTutorTitle'),
      category: "startups",
      subcategory: "work",
      description: t('mathTutorDescription'),
      imageUrl: "https://placehold.co/600x400?text=Math+Tutor",
    },
    {
      id: 13,
      title: t('kiuAmbassadorWorkTitle'),
      category: "startups",
      subcategory: "work",
      description: t('kiuAmbassadorWorkDescription'),
      imageUrl: "https://scontent.ftbs6-2.fna.fbcdn.net/v/t39.30808-6/481664531_982427847356852_5400299080596096216_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=70TWeE0-1jUQ7kNvgH0W7E0&_nc_oc=AdkxYGpl6cped6Hhg__olbjjQyp_62MqGf4SRzyGlldiVj3DqMOG6rOT5KPkhQO4SXQ&_nc_zt=23&_nc_ht=scontent.ftbs6-2.fna&_nc_gid=E6Wlx2y8IqmU2_CiYk24wg&oh=00_AYGunW_At-JhYoml-CTE83y7XVdhzuYnXspMx0U-joc1yQ&oe=67F29EC0",
    },
    {
      id: 14,
      title: t('labTutorTitle'),
      category: "startups",
      subcategory: "work",
      description: t('labTutorDescription'),
      imageUrl: "https://placehold.co/600x400?text=Lab+Tutor",
    },
    {
      id: 15,
      title: t('architectureTutorTitle'),
      category: "startups",
      subcategory: "work",
      description: t('architectureTutorDescription'),
      imageUrl: "https://placehold.co/600x400?text=Architecture+Tutor",
    },
    {
      id: 16,
      title: t('campsideStartupTitle'),
      category: "startups",
      subcategory: "startup",
      description: t('campsideStartupDescription'),
      imageUrl: "https://private-user-images.githubusercontent.com/20245584/408812148-f281e523-ea4a-44e6-8750-3f7169912803.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDM1NzI3MDYsIm5iZiI6MTc0MzU3MjQwNiwicGF0aCI6Ii8yMDI0NTU4NC80MDg4MTIxNDgtZjI4MWU1MjMtZWE0YS00NGU2LTg3NTAtM2Y3MTY5OTEyODAzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA0MDIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNDAyVDA1NDAwNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI4ZmYwOGZlM2M4ODUwZWU1MWVhN2Q5ZTk0ZjliZDcwOTg5ZmM2NDhmY2YwNThlNTk0MzY3NmE2ZjVkOGFiZWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Ho80fN92or2uyiZQldqu2V5Fs3v89XSdvjxiVPJ4b_A",
    },
    {
      id: 17,
      title: t('nasaSpaceAppsTitle'),
      category: "startups",
      subcategory: "hackathon",
      description: t('nasaSpaceAppsDescription'),
      imageUrl: "https://placehold.co/600x400?text=NASA+Space+Apps",
    },
  ];

  // Category-specific filter buttons
  const filterCategories = {
    ios: [
      { id: "app", label: t('app') }
    ],
    camps: [
      { id: "all", label: t('all') },
      { id: "participation", label: t('campParticipation') },
      { id: "professional", label: t('professional') },
      { id: "certificate", label: t('certificates') }
    ],
    academic: [
      { id: "all", label: t('all') },
      { id: "education", label: t('education') }
    ],
    startups: [
      { id: "all", label: t('all') },
      { id: "work", label: t('work') },
      { id: "startup", label: t('startup') },
      { id: "hackathon", label: t('hackathon') }
    ]
  };

  // Filter projects by current category
  const categoryProjects = allProjects.filter(project => project.category === category);
  
  // Further filter by subcategory if selected
  const filteredProjects = filter === "all" 
    ? categoryProjects 
    : categoryProjects.filter(project => project.subcategory === filter);

  // Get category-specific filters
  const currentFilters = filterCategories[category] || [];

  // Special rendering for CampSide startup info when viewing startups category with startup filter
  const showCampsideInfo = category === "startups" && 
    (filter === "startup" || filter === "all") && 
    filteredProjects.some(p => p.title === t('campsideStartupTitle'));

  const modalProject = allProjects.find(p => p.id === activeModalId);

  return (
    <section id="projects" className="bg-secondary/30 section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{getSectionTitle()}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {category === "camps" ? t('campsDescription') : t('projectsDescription')}
          </p>
        </div>

        {currentFilters.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {currentFilters.map((filterOption) => (
              <Button 
                key={filterOption.id}
                variant={filter === filterOption.id ? "default" : "outline"} 
                onClick={() => setFilter(filterOption.id)}
              >
                {filterOption.label}
              </Button>
            ))}
          </div>
        )}

        {showCampsideInfo && (
          <div className="bg-primary/10 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">{t('campsideInfoTitle')}</h3>
            <div className="text-left space-y-4">
              <p>{t('campsideGreeting')}</p>
              <p className="font-semibold">{t('campsideWhy')}</p>
              <p>{t('campsideMission')}</p>
              <p className="font-semibold">{t('campsideJoin')}</p>
              <p>{t('campsideContact')}</p>
              <p>{t('campsideOutro')}</p>
            </div>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">{t('noProjectsFound')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              // Determine the main link for the card (priority: facebook, linkedin, github, gitlab, live)
              const mainLink = project.facebookUrl || project.linkedinUrl || project.githubUrl || project.gitlabUrl || project.liveUrl;

              // Card content is the same for all cards
              const cardContent = (
                <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
                  <div className="overflow-hidden h-48">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm flex items-center text-primary hover:underline"
                          onClick={e => e.stopPropagation()}
                        >
                          GitHub
                          <Github className="ml-1" size={14} />
                        </a>
                      )}
                      {project.gitlabUrl && (
                        <a 
                          href={project.gitlabUrl}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm flex items-center text-primary hover:underline"
                          onClick={e => e.stopPropagation()}
                        >
                          GitLab
                          <Gitlab className="ml-1" size={14} />
                        </a>
                      )}
                      {project.facebookUrl && (
                        <a 
                          href={project.facebookUrl}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm flex items-center text-primary hover:underline"
                          onClick={e => e.stopPropagation()}
                        >
                          Facebook
                          <Facebook className="ml-1" size={14} />
                        </a>
                      )}
                      {project.linkedinUrl && (
                        <a 
                          href={project.linkedinUrl}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm flex items-center text-primary hover:underline"
                          onClick={e => e.stopPropagation()}
                        >
                          LinkedIn
                          <Linkedin className="ml-1" size={14} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm flex items-center text-primary hover:underline"
                          onClick={e => e.stopPropagation()}
                        >
                          {t('livePreview')}
                          <ExternalLink className="ml-1" size={14} />
                        </a>
                      )}
                      {project.certificateUrl && (
                        <a 
                          href={project.certificateUrl}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm flex items-center text-primary hover:underline"
                          onClick={e => e.stopPropagation()}
                        >
                          {t('viewCertificate')}
                          <Award className="ml-1" size={14} />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );

              // Special handling for projects that open a modal
              if (project.id === 4 || project.id === 5) {
                return (
                  <div key={project.id} onClick={() => setActiveModalId(project.id)}>
                    {cardContent}
                  </div>
                );
              }

              // Default behavior for projects with external links
              if (mainLink) {
                return (
                  <a
                    key={project.id}
                    href={mainLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {cardContent}
                  </a>
                );
              }
              
              // Fallback for cards with no link
              return <div key={project.id}>{cardContent}</div>;
            })}
          </div>
        )}
      </div>

      {/* Modal is now outside the loop */}
      <Dialog open={activeModalId !== null} onOpenChange={() => setActiveModalId(null)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          {modalProject && (
            <>
              <DialogHeader>
                <DialogTitle>{modalProject.title}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <div>
                  {modalProject.id === 4 && (
                    // Young Leaders' School Content
                    language === 'en' ? (
                      <>
                        <p className="mb-4">Kutaisi City Hall always strives to support the development of young people. One of their initiatives is the Young Leaders' School, which is held twice a year.</p>
                        <p className="mb-2">I had the honor of participating in this camp twice:</p>
                        <ul className="mb-4 list-disc pl-5">
                          <li className="mb-2">
                            <strong>In 2023</strong>, I attended for the first time <br />
                            <img src="/photos/camps/YoungLeaders'School2023.jpeg" alt="Young Leaders School 2023" className="my-2 rounded shadow w-full max-w-xs" />
                            where we covered topics such as:
                            <ul className="list-disc pl-5">
                              <li>Effective communication</li>
                              <li>Leadership and management</li>
                              <li>Writing a proper CV</li>
                            </ul>
                          </li>
                          <li>
                            <strong>In 2025</strong>, I participated again <br />
                            <img src="/photos/camps/YoungLeaders'School2025.jpeg" alt="Young Leaders School 2025" className="my-2 rounded shadow w-full max-w-xs" />
                            and the main focus areas were:
                            <ul className="list-disc pl-5">
                              <li>Debating</li>
                              <li>CV writing</li>
                              <li>Boosting motivation</li>
                            </ul>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p className="mb-4">ქუთაისის მერია ყოველთვის ცდილობს ხელი შეუწყოს ახალგაზრდების განვითარებას. მათი ერთ-ერთი პროექტია „ლიდერთა სკოლია“, ამ პროექტის მიზანია შექმნას გარემო, რომელიც ხელს შეუწყობს ახალგაზრდების პიროვნულ განვითარებას, მათი შესაძლებლობებიდან და ლიდერობის პოტენციალიდან გამომდინარე. </p>
                        <p className="mb-2">მქონდა პატივი ორჯერ მიმეღო მონაწილეობა ამ ბანაკში:</p>
                        <ul className="mb-4 list-disc pl-5">
                          <li className="mb-2">
                            <strong>2023 წელს</strong> პირველად მივიღე მონაწილეობა <br />
                            <img src="/photos/camps/YoungLeaders'School2023.jpeg" alt="Young Leaders School 2023" className="my-2 rounded shadow w-full max-w-xs" />
                            სადაც განვიხილეთ თემები:
                            <ul className="list-disc pl-5">
                              <li>ახალგაზრდების საკვანძო კომპონენტების განვითარების მხარდაჭერა</li>
                              <li>ახალგაზრდების პიროვნული განვითარების ხელშეწყობა</li>
                            </ul>
                          </li>
                          <li>
                            <strong>2025 წელს</strong> კვლავ მივიღე მონაწილეობა <br />
                            <img src="/photos/camps/YoungLeaders'School2025.jpeg" alt="Young Leaders School 2025" className="my-2 rounded shadow w-full max-w-xs" />
                            და მთავარი აქცენტები იყო:
                            <ul className="list-disc pl-5">
                              <li>ეფექტური რეზიუმეს შექმნა</li>
                              <li>საჯარო გამოსვლების ხელოვნება</li>
                              <li>სტრატეგიული კომუნიკაციები</li>
                              <li>ლიდერული უნარების გამომუშავება</li>
                            </ul>
                          </li>
                        </ul>
                      </>
                    )
                  )}

                  {modalProject.id === 5 && (
                    // Anaklia Camp Content
                    language === 'en' ? (
                      <>
                        <p className="mb-4">I participated in this camp in 2024, representing Kutaisi International University.</p>
                        <p className="mb-2 font-semibold">What is the goal of the camp?</p>
                        <ul className="mb-4 list-disc pl-5">
                          <li>Social integration and inclusion of young people</li>
                          <li>Opportunity to receive non-formal education</li>
                          <li>Support for the development of physical, mental, and intellectual potential</li>
                          <li>Promotion and encouragement of a healthy lifestyle</li>
                        </ul>
                        <p className="mb-2">Additionally, we won the football championship!</p>
                        <img src="/photos/camps/anakliaFootball.jpeg" alt="Anaklia Football Championship" className="my-2 rounded shadow w-full max-w-xs" />
                        <div className="mt-4">
                          <a href="https://www.facebook.com/photo/?fbid=477969575038747&set=pcb.477971548371883" target="_blank" rel="noopener noreferrer" className="text-primary flex items-center hover:underline">
                            Facebook
                            <Facebook className="ml-1" size={16} />
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="mb-4">2024 წელს ანაკლიის ბანაკში მივიღე მონაწილეობა ქუთაისის საერთაშორისო უნივერსიტეტის სახელით.</p>
                        <p className="mb-2 font-semibold">რა არის ბანაკის მიზანი?</p>
                        <ul className="mb-4 list-disc pl-5">
                          <li>ახალგაზრდების სოციალური ინტეგრაცია და ჩართულობა</li>
                          <li>არაფორმალური განათლების მიღების შესაძლებლობა</li>
                          <li>ფიზიკური, გონებრივი და ინტელექტუალური პოტენციალის განვითარების ხელშეწყობა</li>
                          <li>ჯანსაღი ცხოვრების წესის პოპულარიზაცია და წახალისება</li>
                        </ul>
                        <p className="mb-2">დამატებით, ჩვენ მოვიგეთ ფეხბურთის ჩემპიონატი!</p>
                        <img src="/photos/camps/anakliaFootball.jpeg" alt="Anaklia Football Championship" className="my-2 rounded shadow w-full max-w-xs" />
                        <div className="mt-4">
                          <a href="https://www.facebook.com/photo/?fbid=477969575038747&set=pcb.477971548371883" target="_blank" rel="noopener noreferrer" className="text-primary flex items-center hover:underline">
                            Facebook
                            <Facebook className="ml-1" size={16} />
                          </a>
                        </div>
                      </>
                    )
                  )}
                </div>
              </DialogDescription>
              <DialogClose asChild>
                <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">Close</button>
              </DialogClose>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
