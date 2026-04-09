import { useState } from "react";
import { Mail, Send, Github, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    try {
      await fetch("https://fahisap.app.n8n.cloud/webhook/a2c2e540-79b9-4e24-8508-23c16323ff40", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      toast({ title: "Message sent successfully! I'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    }
  };

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
          Get In <span className="text-gradient">Touch</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind or just want to say hello? Feel free to reach out!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:getfahisa@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  getfahisa@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Github size={18} className="text-primary shrink-0" />
                <a href="https://github.com/fahisapallikkattil" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  github.com/fahisapallikkattil
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={18} className="text-primary shrink-0" />
                <span className="text-muted-foreground">Available for Remote Work</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
              />
              <input
                type="email"
                placeholder="Your Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              maxLength={200}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
            />
            <textarea
              placeholder="Your Message *"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
            >
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
