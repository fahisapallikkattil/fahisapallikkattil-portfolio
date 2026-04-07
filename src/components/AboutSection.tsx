const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-card">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="bg-gradient-card rounded-2xl p-8 md:p-12 border border-border shadow-card">
          <p className="text-2xl mb-6">👋 Hello, I'm <span className="text-gradient font-semibold">Fahisa Pallikkattil</span></p>

          <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              I am an AI-powered Frontend Developer specializing in React.js, intelligent web applications, and workflow automation. With expertise in AI chatbots, RAG systems, and full-stack development, I build scalable and user-focused digital solutions while combining technology with creativity.
            </p>
            <p className="text-primary font-semibold text-xl pt-2">
              Let's build something amazing together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
