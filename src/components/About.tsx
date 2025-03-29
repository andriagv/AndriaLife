
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const About: React.FC = () => {
  return (
    <section id="about" className="bg-secondary/30 section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A brief introduction about who I am and what I do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4">My Story</h3>
            <p className="text-muted-foreground mb-4">
              I'm a passionate [Your Profession] with [X years] of experience creating [type of work/products] for clients around the world. I specialize in [your specialties].
            </p>
            <p className="text-muted-foreground mb-4">
              My journey began when [brief story about how you got started]. Since then, I've worked with [types of clients/companies] to deliver projects that not only meet but exceed expectations.
            </p>
            <p className="text-muted-foreground mb-6">
              I believe in [your philosophy or approach to work]. When I'm not working, you can find me [your hobbies or interests].
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Download Resume
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <p className="text-muted-foreground text-center">Years of Experience</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground text-center">Projects Completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-primary mb-2">30+</div>
                <p className="text-muted-foreground text-center">Happy Clients</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <p className="text-muted-foreground text-center">Awards Won</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
