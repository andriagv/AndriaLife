
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gitlab } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";

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
}

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { category } = useCategory();
  const [filter, setFilter] = useState("all");
  
  // Reset filter when category changes
  useEffect(() => {
    // For iOS, set filter to "app" by default
    if (category === "ios") {
      setFilter("app");
    } else {
      setFilter("all");
    }
  }, [category]);
  
  // All projects across categories
  const allProjects: Project[] = [
    // iOS Developer projects
    {
      id: 1,
      title: t('campsideTitle'),
      category: "ios",
      subcategory: "app",
      description: t('campsideDescription'),
      imageUrl: "https://private-user-images.githubusercontent.com/20245584/408812148-f281e523-ea4a-44e6-8750-3f7169912803.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDM1NzI3MDYsIm5iZiI6MTc0MzU3MjQwNiwicGF0aCI6Ii8yMDI0NTU4NC80MDg4MTIxNDgtZjI4MWU1MjMtZWE0YS00NGU2LTg3NTAtM2Y3MTY5OTEyODAzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA0MDIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNDAyVDA1NDAwNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI4ZmYwOGZlM2M4ODUwZWU1MWVhN2Q5ZTk0ZjliZDcwOTg5ZmM2NDhmY2YwNThlNTk0MzY3NmE2ZjVkOGFiZWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Ho80fN92or2uyiZQldqu2V5Fs3v89XSdvjxiVPJ4b_A",
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
      imageUrl: "https://drive.google.com/file/d/19jfj0UJx9oEdGohc_CIJdFvVky03uOvh/view?usp=drive_link",
      gitlabUrl: "https://gitlab.com/techxplore7/manage-subscriptions-ios",
    },
    // Camps projects
    {
      id: 4,
      title: t('youngLeadersTitle'),
      category: "camps",
      subcategory: "participation",
      description: t('youngLeadersDescription'),
      imageUrl: "https://placehold.co/600x400?text=Young+Leaders+School",
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
      imageUrl: "https://scontent.ftbs6-2.fna.fbcdn.net/v/t39.30808-6/475769890_919272513711647_605155437867746930_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=DZH_3BQuhG8Q7kNvgExScvh&_nc_oc=AdmyRQnfMhTLN8Y0bK29OZaCfVEY1NBvU67QZ99qBswjGIULqQA_Mvt7sjTDFZUcgYY&_nc_zt=23&_nc_ht=scontent.ftbs6-2.fna&_nc_gid=8n4VHplYB7YaPEZQpivkXQ&oh=00_AYHx3duVsNMJYmEo64uhZW1Gi1rtrnGqan5FhZjRot6RfA&oe=67F28E47",
    },
    {
      id: 7,
      title: t('icsuTitle'),
      category: "camps",
      subcategory: "participation",
      description: t('icsuDescription'),
      imageUrl: "https://scontent.ftbs6-2.fna.fbcdn.net/v/t39.30808-6/327226519_1829451977422225_3039663358711773416_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=kchZalhTr70Q7kNvgFnlmbD&_nc_oc=Adk_q2QTUcn023s6MK3TVTIhAnsKzpyoUaEZobO6oGZ2JjWDD-GnyAfxS-F-qz5VWJ0&_nc_zt=23&_nc_ht=scontent.ftbs6-2.fna&_nc_gid=7XcLrwq3sCvGbFHXTawO9Q&oh=00_AYEwWm6H0LzHByS3WgsuzO2gW39mCsm0jt0pDphJCbc01g&oe=67F2B615",
    },
    {
      id: 8,
      title: t('kiuAmbassadorTitle'),
      category: "camps",
      subcategory: "professional",
      description: t('kiuAmbassadorDescription'),
      imageUrl: "https://scontent.ftbs6-2.fna.fbcdn.net/v/t39.30808-6/481664531_982427847356852_5400299080596096216_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=70TWeE0-1jUQ7kNvgH0W7E0&_nc_oc=AdkxYGpl6cped6Hhg__olbjjQyp_62MqGf4SRzyGlldiVj3DqMOG6rOT5KPkhQO4SXQ&_nc_zt=23&_nc_ht=scontent.ftbs6-2.fna&_nc_gid=E6Wlx2y8IqmU2_CiYk24wg&oh=00_AYGunW_At-JhYoml-CTE83y7XVdhzuYnXspMx0U-joc1yQ&oe=67F29EC0",
    },
    {
      id: 9,
      title: t('kiuAssistantTitle'),
      category: "camps",
      subcategory: "professional",
      description: t('kiuAssistantDescription'),
      imageUrl: "https://placehold.co/600x400?text=KIU+SA",
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
      { id: "professional", label: t('professional') }
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

  return (
    <section id="projects" className="bg-secondary/30 section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('myProjects')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projectsDescription')}
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
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
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
                      >
                        GitHub <Github className="ml-1" size={14} />
                      </a>
                    )}
                    {project.gitlabUrl && (
                      <a 
                        href={project.gitlabUrl}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm flex items-center text-primary hover:underline"
                      >
                        GitLab <Gitlab className="ml-1" size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm flex items-center text-primary hover:underline"
                      >
                        {t('livePreview')} <ExternalLink className="ml-1" size={14} />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
