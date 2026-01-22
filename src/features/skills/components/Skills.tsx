import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Zap,
  Rocket,
  Sparkles,
  Target,
  Palette,
  Monitor,
  Eye,
  Search,
  Layers,
} from "lucide-react";
import { TechIcons } from "../../../shared/icons/TechIcons";

interface Technology {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
  className?: string;
}

interface Concept {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface Highlight {
  title?: string;
  description?: string;
  Icon: React.ComponentType<{ className?: string }>;
  titleKey?: string;
  descriptionKey?: string;
}

const technologies: Technology[] = [
  // Technologies Frontend prioritaires
  { name: "React", Icon: TechIcons.React, color: "#61DAFB" },
  { name: "TypeScript", Icon: TechIcons.TypeScript, color: "#3178C6" },
  { name: "Angular", Icon: TechIcons.Angular, color: "#DD0031" },
  { name: "JavaScript", Icon: TechIcons.JavaScript, color: "#F7DF1E" },
  { name: "HTML5", Icon: TechIcons.HTML5, color: "#E34F26" },
  { name: "CSS3", Icon: TechIcons.CSS3, color: "#1572B6" },
  { name: "Sass/SCSS", Icon: TechIcons.Sass, color: "#CC6699" },
  { name: "Tailwind CSS", Icon: TechIcons.Tailwind, color: "#06B6D4" },
  
  
  // Outils de développement
  { name: "Git", Icon: TechIcons.Git },
  { name: "Vite", Icon: TechIcons.ViteJs, color: "#646CFF" },
];

const concepts: Concept[] = [
  { name: "UI/UX Design", Icon: Palette },
  { name: "Responsive Design", Icon: Monitor },
  { name: "Performance Web", Icon: Zap },
  { name: "Accessibilité", Icon: Eye },
  { name: "SEO & référencement", Icon: Search },
  { name: "Architecture composants", Icon: Layers },
];

const highlights: Highlight[] = [
  {
    titleKey: "skills.highlights.modernUI.title",
    descriptionKey: "skills.highlights.modernUI.description",
    Icon: Monitor,
  },
  {
    titleKey: "skills.highlights.performance.title",
    descriptionKey: "skills.highlights.performance.description",
    Icon: Rocket,
  },
  {
    titleKey: "skills.highlights.maintainableCode.title",
    descriptionKey: "skills.highlights.maintainableCode.description",
    Icon: Sparkles,
  },
];

const Skills = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const getTranslatedHighlight = (highlight: Highlight) => ({
    ...highlight,
    title: highlight.titleKey ? t(highlight.titleKey) : highlight.title,
    description: highlight.descriptionKey ? t(highlight.descriptionKey) : highlight.description,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0");

            // Animer les éléments avec délai progressif
            const items = entry.target.querySelectorAll(
              ".tech-item, .concept-item"
            );
            items.forEach((item, idx) => {
              setTimeout(() => {
                item.classList.add("animate-bounce-scale");
                item.classList.remove("opacity-0");
              }, idx * 50);
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    const elements = sectionRef.current?.querySelectorAll(".observe-animation");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden bg-background"
    >
      {/* Effet de grille animée */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="observe-animation opacity-0 transition-all duration-700 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">{t("skills.title")}</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Langages & Technologies */}
          <div className="observe-animation opacity-0 transition-all duration-700 lg:col-span-2">
            <div className="glass-effect p-8 rounded-2xl h-full border border-border hover:glow-effect transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  <span className="text-gradient">Langages & Technologies</span>
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="tech-item opacity-0 glass-effect px-4 py-3 rounded-xl border border-border-light hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg group/item"
                  >
                    <div className="flex items-center gap-2">
                      <tech.Icon
                        className={`w-5 h-5 group-hover/item:scale-125 transition-transform duration-300 ${tech.className}`}
                        style={{ color: tech.color }}
                        // L'utilisation de 'fill="currentColor"' dans les SVG permet à ce style de colorer l'icône
                      />
                      <span className="text-sm font-medium text-text-primary">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Concepts / Soft Skills */}
          <div className="observe-animation opacity-0 transition-all duration-700 delay-200">
            <div className="glass-effect p-8 rounded-2xl h-full border border-border hover:glow-effect transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-8">
                
                <h3 className="text-2xl md:text-3xl font-bold">
                  <span className="text-gradient-accent">Concepts</span>
                </h3>
              </div>
              <div className="space-y-3">
                {concepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="concept-item opacity-0 glass-effect px-4 py-3 rounded-xl border border-border-light hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-lg group/item"
                  >
                    <div className="flex items-center gap-3">
                      <concept.Icon className="w-5 h-5 text-secondary group-hover/item:scale-125 transition-transform duration-300" />
                      <span className="text-sm font-medium text-text-primary">
                        {concept.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlights personnels */}
        <div className="observe-animation opacity-0 transition-all duration-700 delay-400">
          <div className="glass-effect p-8 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), var(--color-primary))",
                }}
              >
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gradient">
                {t("skills.highlights.title")}
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map(getTranslatedHighlight).map((highlight, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="glass-effect p-6 rounded-xl border border-border-light hover:border-accent transition-all duration-500 hover:scale-105 hover:shadow-xl h-full">
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-primary group-hover:scale-110 transition-transform duration-300">
                      <highlight.Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-text-primary">
                      {highlight.title}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {highlight.description}
                    </p>
                  </div>
                  {/* Effet de brillance au survol */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at center, var(--color-glow), transparent 70%)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
