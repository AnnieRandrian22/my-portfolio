import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProjectCard } from "./ProjectCard";
import FusionModal from "../../../shared/components/FusionModal";
import { Briefcase, Heart, ChevronRight } from "lucide-react";
import { projects, type Project } from "../data/projects";

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "all" | "professional" | "personal"
  >("all");

  const getTranslatedProject = (project: Project) => ({
    ...project,
    title: t(project.titleKey),
    description: t(project.descriptionKey),
    fullDescription: project.fullDescriptionKey ? t(project.fullDescriptionKey) : undefined,
    images: project.images.map(img => ({
      ...img,
      description: t(`${project.titleKey.replace('.title', '')}.images.${img.url.split('/').pop()?.split('.')[0]}`)
    }))
  });

  const filteredProjects =
    activeTab === "all"
      ? projects.map(getTranslatedProject)
      : projects.filter((p) => p.type === activeTab).map(getTranslatedProject);

  // --- CORRECTION ICI ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0");
            // Bonne pratique : arrêter d'observer une fois animé pour économiser des ressources
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Légèrement réduit pour déclencher plus facilement sur mobile
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // On utilise un petit délai pour s'assurer que le DOM est à jour après le filtrage
    const timer = setTimeout(() => {
      const elements = sectionRef.current?.querySelectorAll(".observe-animation");
      elements?.forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [filteredProjects]); // <--- L'ajout de cette dépendance répare le filtre

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const professionalCount = projects.filter(
    (p) => p.type === "professional"
  ).length;
  const personalCount = projects.filter((p) => p.type === "personal").length;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Effets de lumière */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-color-primary opacity-10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* En-tête */}
        <div className="observe-animation opacity-0 transition-all duration-700 mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t("projects.title")}</span>
          </h2>
          <p className="text-color-text-secondary max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </div>

        {/* Filtres avec tabs modernes */}
        <div className="observe-animation opacity-0 transition-all duration-700 mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-gradient-primary text-white shadow-lg scale-105"
                  : "bg-color-surface text-color-text-secondary hover:text-color-primary border border-color-border hover:border-color-primary"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("projects.viewAll")}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === "all"
                      ? "bg-white/20"
                      : "bg-color-primary-light/10 text-color-primary"
                  }`}
                >
                  {projects.length}
                </span>
              </span>
              {activeTab === "all" && (
                <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-50" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("professional")}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "professional"
                  ? "bg-gradient-primary text-white shadow-lg scale-105"
                  : "bg-color-surface text-color-text-secondary hover:text-color-primary border border-color-border hover:border-color-primary"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {t("projects.professional")}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === "professional"
                      ? "bg-white/20"
                      : "bg-color-primary-light/10 text-color-primary"
                  }`}
                >
                  {professionalCount}
                </span>
              </span>
              {activeTab === "professional" && (
                <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-50" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("personal")}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "personal"
                  ? "bg-gradient-primary text-white shadow-lg scale-105"
                  : "bg-color-surface text-color-text-secondary hover:text-color-primary border border-color-border hover:border-color-primary"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                {t("projects.personal")}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === "personal"
                      ? "bg-white/20"
                      : "bg-color-primary-light/10 text-color-primary"
                  }`}
                >
                  {personalCount}
                </span>
              </span>
              {activeTab === "personal" && (
                <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-50" />
              )}
            </button>
          </div>
        </div>

        {/* Grille de projets */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              // J'ai ajouté project.titleKey comme clé pour aider React à identifier les changements
              key={`${project.titleKey}-${activeTab}`}
              className={`observe-animation opacity-0 transition-all duration-700`}
              style={{ transitionDelay: `${(idx % 3) * 100}ms` }} // Délai optimisé
            >
              <ProjectCard
                {...project}
                onViewDetails={() => handleOpenModal(project)}
              />
            </div>
          ))}
        </div>

        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 observe-animation opacity-0 transition-all duration-700">
            <p className="text-color-text-secondary">
              Aucun projet dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>

      {/* Modal avec carrousel */}
      <FusionModal isOpen={!!selectedProject} onClose={handleCloseModal}>
        {selectedProject && (
          <div className="flex flex-col h-full rounded-2xl max-h-[80vh]">
            {/* En-tête fixe */}
            <div className="shrink-0 pb-4 border-b border-color-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-color-primary mb-2">
                    {selectedProject.titleKey}
                  </h2>
                  <div className="flex items-center gap-2">
                    {selectedProject.type === "professional" ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium border border-blue-500/20">
                        <Briefcase className="w-3 h-3" />
                        Professionnel
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 text-xs font-medium border border-pink-500/20">
                        <Heart className="w-3 h-3" />
                        Personnel
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 min-h-0 overflow-y-auto scroll-thin space-y-6 py-4">
              <p className="text-color-text-primary leading-relaxed">
                {selectedProject.fullDescriptionKey || selectedProject.descriptionKey}
              </p>

              {/* Carrousel d'images */}
              <div className="relative">
                <div className="relative aspect-video bg-color-surface rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.images[currentImageIndex].url}
                    alt={selectedProject.images[currentImageIndex].description}
                    className="w-full h-full object-cover"
                  />

                  {/* Boutons de navigation */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-primary bg-opacity-50 hover:bg-opacity-70 text-white flex items-center justify-center transition-all"
                      >
                        ‹
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-primary bg-opacity-50 hover:bg-opacity-70 text-white flex items-center justify-center transition-all"
                      >
                        ›
                      </button>
                    </>
                  )}

                  {/* Indicateurs */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? "bg-gradient-primary w-8"
                            : "bg-text-secondary bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Description de l'image actuelle */}
                <p className="mt-3 text-sm text-color-text-secondary text-center">
                  {selectedProject.images[currentImageIndex].description}
                </p>
              </div>

              {/* Tags avec affichage limité */}
              <div>
                <h3 className="text-sm font-semibold text-color-text-primary mb-3 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-color-primary" />
                  Technologies utilisées
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.slice(0, 5).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-color-primary-light/10 text-color-primary border border-color-primary/20 hover:bg-color-primary-light/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {selectedProject.tags.length > 5 && (
                    <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-color-surface text-color-text-secondary border border-color-border">
                      +{selectedProject.tags.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Pied de page fixe */}
            <div className="shrink-0 pt-4 border-t border-color-border">
              <div className="flex gap-4">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg transition-colors bg-gradient-primary text-white text-center hover:opacity-90 font-medium"
                  >
                    Voir le site
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg transition-colors bg-color-surface-elevated text-color-text-primary border border-color-primary text-center hover:bg-color-surface font-medium"
                  >
                    Code source
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </FusionModal>
    </section>
  );
};

export default Projects;