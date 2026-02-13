import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Web App",
    description: "A full-featured online store with product listing, cart, and checkout functionality built with React and Node.js.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/fahisapallikkattil",
  },
  {
    title: "Portfolio Website",
    description: "A responsive personal portfolio showcasing projects, skills, and contact information with modern design.",
    tags: ["React", "Tailwind CSS", "Vite"],
    link: "https://github.com/fahisapallikkattil",
  },
  {
    title: "Task Management App",
    description: "A productivity tool for managing daily tasks with CRUD operations, filtering, and local storage persistence.",
    tags: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/fahisapallikkattil",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather information app using REST API integration with location-based search and forecast display.",
    tags: ["React", "REST API", "CSS"],
    link: "https://github.com/fahisapallikkattil",
  },
  {
    title: "Data Visualization Tool",
    description: "Automated Excel data processing and visualization dashboard using Python and Power BI integration.",
    tags: ["Python", "Openpyxl", "Power BI"],
    link: "https://github.com/fahisapallikkattil",
  },
  {
    title: "Blog Platform",
    description: "A content management system with user authentication, CRUD for posts, and responsive design.",
    tags: ["Express.js", "Firebase", "React"],
    link: "https://github.com/fahisapallikkattil",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding bg-card">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
          My <span className="text-gradient">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-card rounded-2xl p-6 border border-border shadow-card hover:shadow-glow hover:border-primary/30 transition-all duration-300 group block"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
