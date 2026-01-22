import React from "react";
import { useTranslation } from "react-i18next";
import { GraduationCap } from "lucide-react";
import {
  TimelineItem,
  type TimelineItemData,
} from "../../../shared/components/TimelineItem";
import { SectionHeader } from "../../../shared/components/SectionHeader";


const educationData: TimelineItemData[] = [
  {
    id: "1",
    titleKey: "education.master.title",
    organization: "EMIT Fianarantsoa",
    location: "Madagascar",
    period: "2024 - 2025",
    descriptionKey: "education.master.description",
    highlightsKeys: [
      "education.master.highlights.emihack",
      "education.master.highlights.internship",
    ],
    skillsKeys: [
      "education.master.skills.geospatial",
      "education.master.skills.it",
      "education.master.skills.programming",
    ],
  },
  {
    id: "2",
    titleKey: "education.bachelor.title",
    organization: "EMIT Fianarantsoa",
    location: "Madagascar",
    period: "2021 - 2024",
    descriptionKey: "education.bachelor.description",
    skillsKeys: [
      "education.bachelor.skills.javascript",
      "education.bachelor.skills.python",
      "education.bachelor.skills.database",
    ],
  },
];


export const Education: React.FC = () => {
  const { t } = useTranslation();

  const getTranslatedEducation = (item: TimelineItemData) => ({
    ...item,
    title: item.titleKey ? t(item.titleKey) : item.title,
    description: item.descriptionKey ? t(item.descriptionKey) : item.description,
    highlights: item.highlightsKeys ? item.highlightsKeys.map(key => t(key)) : item.highlights,
    skills: item.skillsKeys ? item.skillsKeys.map(key => t(key)) : item.skills,
  });

  return (
    <section id="education" className="py-20 px-4 relative overflow-hidden">
      {/* Effet de lumière d'arrière-plan */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* En-tête de section */}
        <SectionHeader icon={GraduationCap} title={t("education.title")} />

        {/* Timeline */}
        <div className="relative">
          {educationData.map(getTranslatedEducation).map((item, index) => (
            <TimelineItem key={item.id} item={item} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
