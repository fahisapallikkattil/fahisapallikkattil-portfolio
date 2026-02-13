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
              I'm a passionate and detail-oriented Web Developer who loves turning ideas into clean, responsive, and user-friendly digital experiences. With a strong foundation in HTML, CSS, JavaScript, and modern frameworks, I focus on building fast, scalable, and visually engaging websites and web applications.
            </p>
            <p>
              I enjoy solving real-world problems through code and continuously learning new technologies to stay ahead in the ever-evolving tech landscape. From designing intuitive user interfaces to developing functional backend systems, I aim to create seamless experiences that deliver real value.
            </p>
            <p>
              I believe great web development is not just about writing code — it's about understanding users, crafting smart solutions, and building products that make an impact.
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
