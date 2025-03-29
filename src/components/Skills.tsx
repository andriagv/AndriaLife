
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Skills: React.FC = () => {
  const technicalSkills = [
    { name: "Skill 1", level: 90 },
    { name: "Skill 2", level: 85 },
    { name: "Skill 3", level: 80 },
    { name: "Skill 4", level: 75 },
    { name: "Skill 5", level: 70 },
  ];

  const softSkills = [
    "Communication",
    "Problem-solving",
    "Teamwork",
    "Time management",
    "Adaptability",
    "Leadership",
    "Creativity",
    "Critical thinking",
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my skills and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Soft Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center justify-center">
                    <span className="text-center">{skill}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
