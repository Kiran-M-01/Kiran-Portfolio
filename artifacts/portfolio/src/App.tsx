import React, { useEffect, useState } from "react";
import profileImage from "@assets/wavegenerics-anonymous-7722244_1779370818970.png";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Code2, 
  Database, 
  Terminal, 
  Wrench,
  GraduationCap,
  Briefcase,
  Sun,
  Moon,
  Send
} from "lucide-react";
import { 
  SiPython, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiCplusplus, 
  SiMysql, 
  SiFlask, 
  SiReact, 
  SiGit, 
  SiGithub, 
  SiVitedotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb
} from "react-icons/si";

const queryClient = new QueryClient();

// Add a typing effect hook
function useTypingEffect(text: string, speed = 100) {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return displayText;
}

const Section = ({ id, title, children }: { id: string, title?: string, children: React.ReactNode }) => (
  <section id={id} className="min-h-screen py-24 flex flex-col justify-center relative z-10">
    <div className="max-w-5xl mx-auto px-6 w-full">
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 text-foreground"
        >
          {title}
          <div className="h-[1px] bg-border flex-1 ml-4" />
        </motion.h2>
      )}
      {children}
    </div>
  </section>
);

function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const typedTitle = useTypingEffect("Python Developer", 100);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:mkiranmkiran306@gmail.com?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-primary selection:text-primary-foreground relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
        style={{ scaleX }}
      />
      
      {/* Background elements */}
      <div className="fixed inset-0 grid-bg opacity-30 z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_800px_800px_at_50%_-20%,rgba(0,183,255,0.1),transparent)] z-0 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-mono font-bold text-xl tracking-tighter text-primary group">
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">&lt;</span>
            M.Kiran
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">/&gt;</span>
          </a>
          <div className="hidden md:flex items-center gap-8 font-mono text-sm">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a 
              href="#contact" 
              className="px-4 py-2 border border-primary/50 text-primary rounded hover:bg-primary/10 transition-colors"
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center pt-16 relative">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-primary mb-5">Hi, my name is</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-4">
                M. Kiran.
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-muted-foreground mb-6 min-h-[1.2em]">
                {typedTitle}<span className="animate-pulse text-primary">_</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                I'm a software engineer specializing in backend development and problem-solving. 
                Currently focused on building efficient, scalable applications and mastering Python full-stack technologies.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="#projects"
                  className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                >
                  Check out my work!
                </a>
                <div className="flex items-center gap-4 ml-4">
                  <a href="https://linkedin.com/in/m-kiran-972425330" target="_blank" rel="noreferrer" className="p-3 border border-border rounded-md hover:border-primary hover:text-primary transition-colors group">
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="mailto:mkiranmkiran306@gmail.com" className="p-3 border border-border rounded-md hover:border-primary hover:text-primary transition-colors group">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <Section id="about" title="About Me">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-muted-foreground text-lg leading-relaxed"
            >
              <p>
                Hello! My name is M. Kiran and I enjoy creating things that live on the internet. My interest in software development started back in college when I decided to try editing custom Python scripts — turns out hacking together small terminal apps taught me a lot about logic and data structures!
              </p>
              <p>
                Fast-forward to today, and I'm a CS graduate with a B.E. from Government Engineering College, K R Pet. I've had the privilege of working on full-stack projects that bridge complex backend architectures with modern frontend interfaces.
              </p>
              <p>
                My main focus these days is building scalable backend APIs, optimizing database queries, and exploring AI integration within web applications.
              </p>
              <div className="flex items-center gap-2 text-primary font-mono text-sm mt-4">
                <MapPin className="w-4 h-4" />
                <span>India</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group mx-auto w-64 h-64 md:w-80 md:h-80"
            >
              <div className="absolute inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-card rounded-lg overflow-hidden border border-border z-10">
                <img
                  src={profileImage}
                  alt="M. Kiran"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="Technical Skills">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Programming",
                icon: <Code2 className="w-6 h-6 text-primary" />,
                skills: [
                  { name: "Python", icon: <SiPython /> },
                  { name: "Java (Basics)", icon: null },
                  { name: "C/C++", icon: <SiCplusplus /> },
                  { name: "JavaScript", icon: <SiJavascript /> },
                  { name: "HTML/CSS", icon: <SiHtml5 /> }
                ]
              },
              {
                title: "Frameworks & Libs",
                icon: <Terminal className="w-6 h-6 text-primary" />,
                skills: [
                  { name: "Flask", icon: <SiFlask /> },
                  { name: "React.js", icon: <SiReact /> },
                  { name: "Node.js", icon: <SiNodedotjs /> },
                  { name: "Express.js", icon: <SiExpress /> }
                ]
              },
              {
                title: "Databases",
                icon: <Database className="w-6 h-6 text-primary" />,
                skills: [
                  { name: "MySQL", icon: <SiMysql /> },
                  { name: "Oracle SQL", icon: <Database className="w-4 h-4" /> },
                  { name: "MongoDB", icon: <SiMongodb /> }
                ]
              },
              {
                title: "Tools & Concepts",
                icon: <Wrench className="w-6 h-6 text-primary" />,
                skills: [
                  { name: "Git & GitHub", icon: <SiGithub /> },
                  { name: "VS Code", icon: null },
                  { name: "Data Structures", icon: null },
                  { name: "Algorithms", icon: null },
                  { name: "OOP", icon: null }
                ]
              }
            ].map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {category.icon}
                </div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  {category.icon}
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                </div>
                <ul className="space-y-3 relative z-10">
                  {category.skills.map(skill => (
                    <li key={skill.name} className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground/90 transition-colors">
                      <span className="text-primary/70">{skill.icon || <ChevronRight className="w-4 h-4" />}</span>
                      <span className="font-mono text-sm">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience" title="Experience">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-0"
            >
              <div className="hidden md:block absolute left-[8.5rem] top-0 bottom-0 w-[1px] bg-border" />
              
              <div className="relative mb-12 md:flex items-start gap-12 group">
                <div className="md:w-32 flex-shrink-0 pt-1">
                  <div className="font-mono text-sm text-primary mb-2 md:mb-0 md:text-right">
                    Feb 2026<br/>Present
                  </div>
                </div>
                
                <div className="hidden md:block absolute left-[8.5rem] w-3 h-3 bg-background border-2 border-primary rounded-full top-1.5 -translate-x-[5px] group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(0,255,255,0)] group-hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                
                <div className="md:absolute hidden md:block left-[8.5rem] w-[1px] h-full bg-border -translate-x-[0.5px] -z-10 group-hover:bg-primary/50 transition-colors" />

                <div className="bg-card border border-border rounded-lg p-6 flex-1 hover:border-primary/30 transition-colors relative">
                  <div className="absolute left-0 top-6 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-border -translate-x-full md:hidden" />
                  <h3 className="text-xl font-bold text-foreground mb-1">Python Full Stack Trainee</h3>
                  <h4 className="text-lg text-primary mb-4 font-medium flex items-center gap-2">
                    @ Pentagon Space <MapPin className="w-4 h-4" />
                  </h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Currently upskilling on Python full stack development methodologies and best practices.</span>
                    </li>
                    <li className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Working on end-to-end Full Stack Development projects to enhance knowledge and practical application.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Featured Projects">
          <div className="space-y-24">
            {/* Project 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-12 gap-6 items-center group"
            >
              <div className="md:col-span-7 relative z-10">
                <div className="bg-card border border-border/50 rounded-xl overflow-hidden aspect-video relative group-hover:border-primary/50 transition-colors">
                  <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center p-8">
                    <div className="w-full h-full border border-primary/20 rounded flex flex-col items-center justify-center gap-4 bg-background/50 backdrop-blur-sm relative overflow-hidden">
                       <div className="absolute inset-0 grid-bg opacity-20" />
                       <SiMongodb className="w-16 h-16 text-primary/50" />
                       <span className="font-mono text-primary/70 tracking-widest uppercase">STEGOHIDE SYSTEM</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              <div className="md:col-span-5 md:-ml-12 relative z-20 flex flex-col md:items-end text-left md:text-right">
                <p className="font-mono text-primary text-sm mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors">StegoHide</h3>
                <div className="bg-card p-6 rounded-lg border border-border shadow-xl text-muted-foreground mb-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-shadow">
                  <p>Secure Message Hiding System utilizing the LSB algorithm for Image Steganography. Features robust REST APIs for image upload and OTP verification, backed by AES encryption and admin authentication for top-tier security.</p>
                </div>
                <ul className="flex flex-wrap gap-4 font-mono text-sm text-primary/70 mb-6 justify-start md:justify-end">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB Atlas</li>
                  <li>Cloudinary</li>
                </ul>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><SiGithub className="w-5 h-5" /></a>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-12 gap-6 items-center group"
            >
              <div className="md:col-span-5 relative z-20 flex flex-col md:items-start text-left order-2 md:order-1">
                <p className="font-mono text-primary text-sm mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors">AI Reel Generator</h3>
                <div className="bg-card p-6 rounded-lg border border-border shadow-xl text-muted-foreground mb-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-shadow md:-mr-12 z-30 relative">
                  <p>Automated reel generation platform integrating ElevenLabs API for voice narration. Built complex workflows for audio generation, video rendering via FFmpeg, and media processing, optimized with background task handling.</p>
                </div>
                <ul className="flex flex-wrap gap-4 font-mono text-sm text-primary/70 mb-6 justify-start">
                  <li>Python</li>
                  <li>Flask</li>
                  <li>FFmpeg</li>
                  <li>ElevenLabs API</li>
                </ul>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><SiGithub className="w-5 h-5" /></a>
                </div>
              </div>
              <div className="md:col-span-7 relative z-10 order-1 md:order-2">
                <div className="bg-card border border-border/50 rounded-xl overflow-hidden aspect-video relative group-hover:border-primary/50 transition-colors">
                  <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center p-8">
                    <div className="w-full h-full border border-primary/20 rounded flex flex-col items-center justify-center gap-4 bg-background/50 backdrop-blur-sm relative overflow-hidden">
                       <div className="absolute inset-0 grid-bg opacity-20" />
                       <SiPython className="w-16 h-16 text-primary/50" />
                       <span className="font-mono text-primary/70 tracking-widest uppercase">REEL GENERATOR</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Education Section */}
        <Section id="education" title="Education">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                degree: "B.E. in Computer Science",
                school: "Government Engineering College, K R Pet",
                year: "2022–2026",
                score: "CGPA: 7.3/10"
              },
              {
                degree: "12th Grade (PUE Board)",
                school: "St. Anthony's P U College, K R Nagar",
                year: "2020–2022",
                score: "91.5%"
              },
              {
                degree: "10th Grade (KSEEB)",
                school: "St. Anthony's High School, K R Nagar",
                year: "2019–2020",
                score: "88%"
              }
            ].map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <GraduationCap className="w-8 h-8 text-primary mb-6 relative z-10" />
                <h3 className="text-xl font-bold mb-2 relative z-10">{edu.degree}</h3>
                <p className="text-muted-foreground mb-4 relative z-10">{edu.school}</p>
                <div className="flex items-center justify-between font-mono text-sm relative z-10">
                  <span className="text-primary/70">{edu.year}</span>
                  <span className="text-primary">{edu.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Get In Touch">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                I'm open to new opportunities, collaborations, and interesting conversations. 
                Whether you have a project in mind, a question, or just want to connect — fill out the form below and I'll get back to you soon.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-xl p-8 space-y-6"
              data-testid="form-contact"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    data-testid="input-name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    data-testid="input-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  data-testid="input-message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                data-testid="button-send-message"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(0,183,255,0.3)] active:scale-95"
              >
                <Send className="w-4 h-4" />
                {formSent ? "Opening mail client..." : "Send Message"}
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-12 pt-8 border-t border-border flex flex-col items-center gap-6 text-muted-foreground font-mono text-sm"
            >
              <div className="flex gap-6">
                <a href="https://linkedin.com/in/m-kiran-972425330" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="mailto:mkiranmkiran306@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> mkiranmkiran306@gmail.com
                </a>
                <a href="tel:+919113082286" className="hover:text-primary transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +91 9113082286
                </a>
              </div>
              <p>Designed & Built by M. Kiran</p>
            </motion.div>
          </div>
        </Section>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/" component={Portfolio} />
            <Route component={Portfolio} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
