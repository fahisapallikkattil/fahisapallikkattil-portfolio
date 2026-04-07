import { Code, Server, Database, GitBranch, Globe, BarChart3, Bot } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    skills: [
      "HTML5, CSS3, JavaScript (ES6+)",
      "React.js (Functional Components, Hooks, Props, State, Router)",
      "Tailwind CSS, Bootstrap",
    ],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    skills: [
      "Node.js & Express.js",
      "REST API Integration, JSON, Fetch",
      "CRUD Operations, Database Connectivity",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL", "Firebase / Firestore"],
  },
  {
    title: "AI Tools & Platforms",
    icon: Bot,
    skills: [
      "AI Models – ChatGPT, Gemini, Claude",
      "Automation – Zapier, Make, n8n",
      "RAG Systems & Prompt Engineering",
      "AI Media – Midjourney, RunwayML, HeyGen, Gamma",
      "AI Dev Tools – Cursor, Windsurf",
      "AI Builders – Firebase Studio, Lovable",
    ],
  },
  {
    title: "Version Control & Tools",
    icon: GitBranch,
    skills: [
      "Git, GitHub, GitHub Actions (CI/CD basics)",
      "VS Code",
      "NPM Package Management",
      "Vite (Frontend Bundler / Build Tool)",
    ],
  },
  {
    title: "Deployment & Hosting",
    icon: Globe,
    skills: [
      "GitHub Pages",
      "Continuous Integration / Deployment (CI/CD basics)",
    ],
  },
  {
    title: "Python & Data Visualization",
    icon: BarChart3,
    skills: ["Python", "Openpyxl", "MS Excel", "Power BI"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
          My <span className="text-gradient">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-gradient-card rounded-2xl p-6 border border-border shadow-card hover:shadow-glow hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <category.icon size={22} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-muted-foreground text-sm flex items-start gap-2"
                  >
                    <span className="text-primary mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
