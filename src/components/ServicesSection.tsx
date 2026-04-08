import { Globe, Bot, Brain, Settings, Search, Palette } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description:
      "I build modern, responsive web applications with clean UI, smooth performance, and scalable architecture using the latest technologies.",
    icon: Globe,
  },
  {
    title: "AI Chatbot Development",
    description:
      "I create intelligent chatbots that automate conversations, handle user queries, and deliver accurate, context-aware responses.",
    icon: Bot,
  },
  {
    title: "AI Applications",
    description:
      "I develop AI-powered applications including AI agents and smart systems that enhance functionality and solve real-world problems.",
    icon: Brain,
  },
  {
    title: "Workflow Automation",
    description:
      "I design automation workflows to streamline tasks, reduce manual work, and improve efficiency using tools like Zapier, Make, and n8n.",
    icon: Settings,
  },
  {
    title: "AI Search & RAG Systems",
    description:
      "I build advanced AI systems using vector search and RAG to deliver intelligent, data-driven, and context-aware information retrieval.",
    icon: Search,
  },
  {
    title: "AI Content Creation",
    description:
      "I create high-quality AI-generated visuals, videos, and digital content to elevate branding and enhance online presence.",
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
