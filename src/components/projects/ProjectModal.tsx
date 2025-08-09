import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Facebook } from "lucide-react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface ProjectModalProps {
  project: Project | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { language } = useLanguage();

  if (!project) return null;

  const renderYoungLeadersContent = () => {
    return language === 'en' ? (
      <>
        <p className="mb-4">Kutaisi City Hall always strives to support the development of young people. One of their initiatives is the Young Leaders' School, which is held twice a year.</p>
        <p className="mb-2">I had the honor of participating in this camp twice:</p>
        <ul className="mb-4 list-disc pl-5">
          <li className="mb-2">
            <strong>In 2023</strong>, I attended for the first time <br />
            <OptimizedImage src={"/photos/camps/YoungLeaders'School2023.jpeg"} alt="Young Leaders School 2023" className="my-2 rounded shadow w-full max-w-xs" />
            where we covered topics such as:
            <ul className="list-disc pl-5">
              <li>Effective communication</li>
              <li>Leadership and management</li>
              <li>Writing a proper CV</li>
            </ul>
          </li>
          <li>
            <strong>In 2025</strong>, I participated again <br />
            <OptimizedImage src={"/photos/camps/YoungLeaders'School2025.jpeg"} alt="Young Leaders School 2025" className="my-2 rounded shadow w-full max-w-xs" />
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
        <p className="mb-4">ქუთაისის მერია ყოველთვის ცდილობს ხელი შეუწყოს ახალგაზრდების განვითარებას. მათი ერთ-ერთი პროექტია „ლიდერთა სკოლია", ამ პროექტის მიზანია შექმნას გარემო, რომელიც ხელს შეუწყობს ახალგაზრდების პიროვნულ განვითარებას, მათი შესაძლებლობებიდან და ლიდერობის პოტენციალიდან გამომდინარე. </p>
        <p className="mb-2">მქონდა პატივი ორჯერ მიმეღო მონაწილეობა ამ ბანაკში:</p>
        <ul className="mb-4 list-disc pl-5">
          <li className="mb-2">
            <strong>2023 წელს</strong> პირველად მივიღე მონაწილეობა <br />
            <OptimizedImage src={"/photos/camps/YoungLeaders'School2023.jpeg"} alt="Young Leaders School 2023" className="my-2 rounded shadow w-full max-w-xs" />
            სადაც განვიხილეთ თემები:
            <ul className="list-disc pl-5">
              <li>ახალგაზრდების საკვანძო კომპონენტების განვითარების მხარდაჭერა</li>
              <li>ახალგაზრდების პიროვნული განვითარების ხელშეწყობა</li>
            </ul>
          </li>
          <li>
            <strong>2025 წელს</strong> კვლავ მივიღე მონაწილეობა <br />
            <OptimizedImage src={"/photos/camps/YoungLeaders'School2025.jpeg"} alt="Young Leaders School 2025" className="my-2 rounded shadow w-full max-w-xs" />
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
    );
  };

  const renderAnakliaContent = () => {
    return language === 'en' ? (
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
        <OptimizedImage src={"/photos/camps/anakliaFootball.jpeg"} alt="Anaklia Football Championship" className="my-2 rounded shadow w-full max-w-xs" />
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
        <OptimizedImage src={"/photos/camps/anakliaFootball.jpeg"} alt="Anaklia Football Championship" className="my-2 rounded shadow w-full max-w-xs" />
        <div className="mt-4">
          <a href="https://www.facebook.com/photo/?fbid=477969575038747&set=pcb.477971548371883" target="_blank" rel="noopener noreferrer" className="text-primary flex items-center hover:underline">
            Facebook
            <Facebook className="ml-1" size={16} />
          </a>
        </div>
      </>
    );
  };

  const renderModalContent = () => {
    if (project.id === 4) {
      return renderYoungLeadersContent();
    }
    
    if (project.id === 5) {
      return renderAnakliaContent();
    }

    // Modal for design projects with modal property
    if (project.modal) {
      return (
        <>
          <p className="mb-4">{project.modal.content}</p>
          {project.modal.images && project.modal.images.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center">
              {project.modal.images.map((img, idx) => (
                <OptimizedImage key={idx} src={img} alt={project.title + ' image ' + (idx + 1)} className="my-2 rounded shadow w-full max-w-xs" />
              ))}
            </div>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div>
            {renderModalContent()}
          </div>
        </DialogDescription>
        <DialogClose asChild>
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;