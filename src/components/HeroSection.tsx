import { ArrowDown, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import resumePdf from "@/assets/Fahisa_Pallikkattil_AI_Engineer.pdf";

const HeroSection = () => {
  const handleResumeDownload = () => {
    window.open(resumePdf, "_blank");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
          Web Developer
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 animate-fade-in-up">
          Hi, I'm{" "}
          <span className="text-gradient">Fahisa Pallikkattil</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Building fast, scalable, and visually engaging web experiences that deliver real value.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
          >
            Contact Me
            <ArrowDown size={18} />
          </a>
          <a
            href="https://drive.google.com/file/d/1LA2jw0y_Ank9sD-dvLQNly9FvgM1CKii/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
          >
            Resume
            <Download size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
