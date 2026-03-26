import { Github, Linkedin } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/getnettadele",
    label: "Github",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/getnet-tadele-960561146",
    label: "Linkedin",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo + Copyright */}
          <div className="text-center md:text-left">
            <a href="#" className="text-xl font-bold tracking-tight">
              Get.
            </a>

            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Getnet Tadele. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};