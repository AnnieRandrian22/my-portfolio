export interface ProjectImage {
  url: string;
  description: string;
}

export interface Project {
  id: string; // Ajout d'un ID unique pour chaque projet
  titleKey: string; // Clé de traduction pour le titre
  descriptionKey: string; // Clé de traduction pour la description courte
  fullDescriptionKey?: string; // Clé de traduction pour la description complète
  tags: string[];
  image: string;
  images: ProjectImage[];
  link?: string;
  github?: string;
  type: "professional" | "personal";
}

export const projects: Project[] = [
  {
    id: "hotel-management-system",
    titleKey: "projects.hotelManagement.title",
    descriptionKey: "projects.hotelManagement.description",
    fullDescriptionKey: "projects.hotelManagement.fullDescription",
    tags: [
      "Angular 18",
      "TypeScript",
      "Stripe",
      "RxJS",
      "REST API",
      "Multi-tenant",
      "Dynamic Theming",
      "Payment Gateway",
    ],
    image:
      "images/hms/hotel_home_page.png",
    images: [
      {
        url: "images/hms/hotel_home_page.png",
        description: "Page d'accueil du site de l'hôtel",
      },
      {
        url: "images/hms/booking_page.png",
        description: "Page de reservation de chambre",
      },
      {
        url: "images/hms/stripe_payment.png",
        description: "Interface de paiement avec Stripe",
      },
      {
        url: "images/hms/admin_login_page.png",
        description: "Page d'authentification admin",
      },
    ],
    type: "professional",
  },
  {
    id: "innovt-learning-hub",
    titleKey: "projects.innovtLearning.title",
    descriptionKey: "projects.innovtLearning.description",
    fullDescriptionKey: "projects.innovtLearning.fullDescription",
    tags: [
      "React",
      "JSX",
      "Vite",
      "Google Auth",
      "TypeScript",
      "Tailwind CSS",
    ],
    image:
      "images/innovt/home_page.png",
    images: [
      {
        url: "images/innovt/home_page.png",
        description: "Page d'accueil avec catalogue de formations",
      },
      {
        url: "images/innovt/formation_page.png",
        description: "Liste des formations avec plusieurs filtres",
      },
      {
        url: "images/innovt/signin_form.png",
        description: "Système d'authentification via Google",
      },
      {
        url: "images/innovt/formation_detail.png",
        description: "Page Détail d'une formation",
      },
    ],
    link: "https://innovt-learning-hub.vercel.app",
    github: "https://github.com/AnnieRandrian22/innovt-learning-hub.git",
    type: "professional",
  },
  {
    id: "qimpexx-agri",
    titleKey: "projects.qimpexxAgri.title",
    descriptionKey: "projects.qimpexxAgri.description",
    fullDescriptionKey: "projects.qimpexxAgri.fullDescription",
    tags: ["AngularJS", "TypeScript", "Laravel", "PHP", "REST API", "CRUD", "Excel Import/Export"],
    image:
      "images/qimpex/login_page.png",
    images: [
      {
        url: "images/qimpex/user_form.png",
        description: "Formulaire ajout/modification utilisateur",
      },
      {
        url: "images/qimpex/planter_filter.png",
        description: "Suivi des plantations et questionnaires",
      },
      {
        url: "images/qimpex/plantation_detail.png",
        description: "Détail de contrôle de plantation",
      },
    ],
    type: "professional",
  },
  {
    id: "portfolio",
    titleKey: "projects.portfolio.title",
    descriptionKey: "projects.portfolio.description",
    fullDescriptionKey: "projects.portfolio.fullDescription",
    tags: ["React", "TypeScript", "Vite", "Three.js", "i18n", "Tailwind CSS", "CSS3"],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
        description: "Page d'accueil avec animation 3D",
      },
      {
        url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
        description: "Section projets et compétences",
      },
      {
        url: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
        description: "Interface multilingue avec i18n",
      },
    ],
    link: "#",
    github: "https://github.com/AnnieRandrian22/my-portfolio.git",
    type: "personal",
  },
  {
    id: "facebook-clone",
    titleKey: "projects.facebookClone.title",
    descriptionKey: "projects.facebookClone.description",
    fullDescriptionKey: "projects.facebookClone.fullDescription",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Flexbox", "Grid"],
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        description: "Interface de connexion Facebook",
      },
      {
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        description: "Design responsive et animations",
      },
      {
        url: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
        description: "Interactions JavaScript",
      },
    ],
    link: "#",
    github: "#",
    type: "personal",
  },
];