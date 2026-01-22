import React from "react";
import { useTranslation } from "react-i18next";
import { Briefcase } from "lucide-react";
import {
  TimelineItem,
  type TimelineItemData,
} from "../../../shared/components/TimelineItem";
import { SectionHeader } from "../../../shared/components/SectionHeader";


const experienceData: TimelineItemData[] = [
  {
    id: "1",
    titleKey: "experience.madatlas.title",
    organization: "Madatlas",
    location: "Hybrid",
    period: "Septembre 2025 - Fevrier 2026",
    descriptionKey: "experience.madatlas.description",
    skillsKeys: [
      "experience.madatlas.skills.qgis",
      "experience.madatlas.skills.postgis",
    ],
  },
  {
    id: "2",
    titleKey: "experience.innovt.title",
    organization: "Innov-T Madagascar",
    location: "Fianarantsoa, Madagascar",
    period: "Juin 2024 - Septembre 2024",
    descriptionKey: "experience.innovt.description",
    skillsKeys: [
      "experience.innovt.skills.angular",
      "experience.innovt.skills.typescript",
      "experience.innovt.skills.i18n",
      "experience.innovt.skills.stripe",
    ],
  },
  {
    id: "3",
    titleKey: "experience.arato.title",
    organization: "Arato Fianarantsoa",
    location: "Fianarantsoa, Madagascar",
    period: "Juin 2023 - Août 2023",
    descriptionKey: "experience.arato.description",
    skillsKeys: [
      "experience.arato.skills.angular",
      "experience.arato.skills.materialui",
      "experience.arato.skills.laravel",
    ],
  },
];

export const Experience: React.FC = () => {
  const { t } = useTranslation();

  const getTranslatedExperience = (item: TimelineItemData) => ({
    ...item,
    title: item.titleKey ? t(item.titleKey) : item.title,
    description: item.descriptionKey ? t(item.descriptionKey) : item.description,
    skills: item.skillsKeys ? item.skillsKeys.map(key => t(key)) : item.skills,
  });

  return (
    <section
      id="experience"
      className="py-20 px-4 relative bg-surface overflow-hidden"
    >
      {/* Effet de grille animée */}
      <div className="absolute inset-0 opacity-7">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, var(--color-primary) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>
      {/* Effet de lumière d'arrière-plan */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* En-tête de section */}
        <SectionHeader icon={Briefcase} title={t("experience.title")} />

        {/* Timeline */}
        <div className="relative">
          {experienceData.map(getTranslatedExperience).map((item, index) => (
            <TimelineItem key={item.id} item={item} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
