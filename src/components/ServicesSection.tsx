import { Globe, Bot, Settings, Brain, Palette } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description:
      "I build modern, responsive, and high-performance web applications using React.js and the latest frontend technologies. From landing pages to full-stack solutions, I create user-friendly interfaces with seamless functionality and optimized performance.",
    icon: Globe,
  },
  {
    title: "AI Chatbots",
    description:
      "I develop intelligent AI chatbots that automate customer interactions, handle queries, and improve user engagement. From simple assistants to advanced RAG-based chatbots, my solutions deliver accurate and context-aware responses.",
    icon: Bot,
  },
  {
    title: "Workflow Automation",
    description:
      "I design and implement automation systems that streamline business processes and reduce manual work. Using tools like Zapier, Make, and n8n, I create efficient workflows for lead management, data handling, and task automation.",
    icon: Settings,
  },
  {
    title: "AI Applications",
    description:
      "I build AI-powered applications that integrate intelligent features into real-world solutions. This includes AI agents, smart data processing systems, and custom AI integrations that enhance efficiency and user experience.",
    icon: Brain,
  },
  {
    title: "AI Content Creation",
    description:
      "I create high-quality AI-generated visuals, videos, and digital content for modern brands. Using advanced AI tools, I design engaging media that enhances branding, marketing, and social media presence.",
    icon: Palette,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
          My <span className="text-gradient">Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gradient-card rounded-2xl p-6 border border-border shadow-card hover:shadow-glow hover:border-primary/30 transition-all duration-300 group text-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon size={28} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
