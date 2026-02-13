import { Layout, Server, Smartphone, Search, Rocket, Wrench } from "lucide-react";

const services = [
  {
    title: "Frontend Development",
    description: "Building responsive, interactive UIs with React, Tailwind CSS, and modern JavaScript frameworks.",
    icon: Layout,
  },
  {
    title: "Backend Development",
    description: "Creating robust server-side applications with Node.js, Express, and database integration.",
    icon: Server,
  },
  {
    title: "Responsive Design",
    description: "Ensuring websites look and work perfectly across all devices and screen sizes.",
    icon: Smartphone,
  },
  {
    title: "SEO Optimization",
    description: "Implementing best practices to improve search engine rankings and visibility.",
    icon: Search,
  },
  {
    title: "Performance Optimization",
    description: "Enhancing website speed and efficiency for the best user experience.",
    icon: Rocket,
  },
  {
    title: "Maintenance & Support",
    description: "Ongoing website maintenance, updates, bug fixes, and technical support.",
    icon: Wrench,
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
