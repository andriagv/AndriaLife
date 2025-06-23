import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gitlab, Award, Facebook, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { getAllProjects } from "@/data/projects";
import { Project } from "@/types";

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const { category } = useCategory();
  const [filter, setFilter] = useState("all");
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  
  // Reset filter when category changes
  useEffect(() => {
    setFilter("all");
  }, [category]);

  const allProjects = getAllProjects(t, language);

  // Get section title based on category
  const getSectionTitle = () => {
    switch (category) {
      case "camps":
        return t("campParticipation");
      case "ios":
        return t("iosDeveloper");
      case "photography":
        return t("photography");
      case "robotics":
        return t("robotics");
      case "mathematics":
        return t("mathematics");
      case "sports":
        return t("sports");
      default:
        return t("myProjects");
    }
  };
  
  // All projects across categories - This is now moved to the data file.
  
  // Category-specific filter buttons
  const filterCategories = {
    ios: [
      { id: "all", label: t('all') },
      { id: "app", label: t('myProjects') },
      { id: "certificate", label: t('certificates') }
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
    design: [
      { id: "all", label: t('all') },
      { id: "work", label: t('work') },
      { id: "camp", label: 'Camp' }
    ],
    photography: [
      { id: "all", label: t('all') },
      { id: "photos", label: t('photos') }
    ],
    robotics: [
      { id: "all", label: t('all') },
      { id: "projects", label: t('myProjects') }
    ],
    mathematics: [
      { id: "all", label: t('all') },
      { id: "topics", label: t('topics') }
    ],
    sports: [
      { id: "all", label: t('all') },
      { id: "achievements", label: t('achievements') }
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
  const showCampsideInfo = category === "design" && 
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
            {category === "camps" ? t('campsDescription') :
             category === "photography" ? t('photographyDescription') :
             category === "robotics" ? t('roboticsDescription') :
             category === "mathematics" ? t('mathematicsDescription') :
             category === "sports" ? t('sportsDescription') :
             t('projectsDescription')}
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

        {/* Custom layout for Photography category */}
        {category === 'photography' && (
          <div className="album w-full mx-auto max-w-6xl">
            <div className="responsive-container-block bg flex flex-row flex-wrap justify-between">
              <div className="responsive-container-block img-cont flex flex-col max-w-[33.3%] w-full">
                <img className="img w-full mb-5" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/PP5.4.svg" alt="photo1" />
                <img className="img w-full mb-5" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/PP5.5.svg" alt="photo2" />
                <img className="img img-last w-full" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/PP5.6.svg" alt="photo3" />
              </div>
              <div className="responsive-container-block img-cont flex flex-col max-w-[33.3%] w-full">
                <img className="img img-big w-full mb-4" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/PP5.11.svg" alt="photo4" />
                <img className="img img-big img-last w-full" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/PP5.10.svg" alt="photo5" />
              </div>
              <div className="responsive-container-block img-cont flex flex-col max-w-[33.3%] w-full">
                <img className="img w-full mb-5" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/PP5.7.svg" alt="photo6" />
                <img className="img w-full mb-5" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/PP5.8.svg" alt="photo7" />
                <img className="img w-full" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/PP5.9.svg" alt="photo8" />
              </div>
            </div>
          </div>
        )}

        {/* Custom layout for iOS category */}
        {category === 'ios' && (() => {
          const iosApps = categoryProjects.filter(p => p.subcategory === 'app');
          const iosCertificates = categoryProjects.filter(p => p.subcategory === 'certificate');

          const showApps = filter === 'all' || filter === 'app';
          const showCerts = filter === 'all' || filter === 'certificate';

          return (
            <div>
              {/* Projects Section */}
              {showApps && iosApps.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-3xl font-bold text-center mb-12">{t('myProjects')}</h3>
                  <div className="space-y-12">
                    {iosApps.map((project) => (
                      <div 
                        key={project.id} 
                        className="flex flex-col md:flex-row items-center gap-8"
                      >
                        {/* Image */}
                        <div className="w-full md:w-1/6">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-auto object-contain rounded-md"
                          />
                        </div>

                        {/* Content */}
                        <div className="w-full md:w-5/6 text-center md:text-left">
                          <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                          <p className="text-muted-foreground mb-6">{project.description}</p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                            {project.tags?.map(tag => (
                              <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Buttons */}
                          <div className="flex justify-center md:justify-start gap-4">
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Button variant="default" size="lg">GitHub <Github className="ml-2" size={18} /></Button>
                              </a>
                            )}
                            {project.gitlabUrl && (
                              <a href={project.gitlabUrl} target="_blank" rel="noopener noreferrer">
                                <Button variant="default" size="lg">GitLab <Gitlab className="ml-2" size={18} /></Button>
                              </a>
                            )}
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="lg">{t('livePreview')} <ExternalLink className="ml-2" size={18} /></Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates Section */}
              {showCerts && iosCertificates.length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-center mb-12">{t('certificatesSectionTitle')}</h3>
                  <div className="space-y-12">
                    {iosCertificates.map((cert) => (
                      <div 
                        key={cert.id} 
                        className="flex flex-col md:flex-row items-center gap-8"
                      >
                        {/* Image */}
                        <div className="w-full md:w-1/4">
                          <img 
                            src={cert.imageUrl} 
                            alt={cert.title}
                            className="w-full h-auto object-contain rounded-md shadow-lg"
                          />
                        </div>
                        {/* Content */}
                        <div className="w-full md:w-3/4 text-center md:text-left">
                          <h3 className="text-2xl font-bold mb-4">{cert.title}</h3>
                          <p className="text-muted-foreground">{cert.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">{t('noProjectsFound')}</p>
                </div>
              )}
            </div>
          )
        })()}

        {/* Default grid layout for other categories */}
        {category !== 'ios' && (
          <>
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
                  if (project.id === 4 || project.id === 5 || project.modal) {
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
          </>
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

                  {/* Modal for design projects with modal property */}
                  {modalProject.modal && (
                    <>
                      <p className="mb-4">{modalProject.modal.content}</p>
                      {modalProject.modal.images && modalProject.modal.images.length > 0 && (
                        <div className="flex flex-wrap gap-4 justify-center">
                          {modalProject.modal.images.map((img, idx) => (
                            <img key={idx} src={img} alt={modalProject.title + ' image ' + (idx + 1)} className="my-2 rounded shadow w-full max-w-xs" />
                          ))}
                        </div>
                      )}
                    </>
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
