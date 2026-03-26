import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        value: "gettadele@gmail.com",
        link: "mailto:gettadele@gmail.com",
    },

    {
        icon: Phone,
        title: "Phone",
        value: "+251 0916432937",
        link: "tel:+251916432937",
    },

    {
        icon: MapPin,
        title: "Location",
        value: "Addis Ababa, Ethiopia",
        link: "https://www.google.com/maps/place/Addis+Ababa",
    }
]
export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState ({
        type: null, //'success' or 'error'
        message: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitStatus({ type: null, message: "" });
        try {

            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
            if (!serviceId || !templateId || !publicKey) {
                throw new Error("EmailJS configration is missing. Please check your environment variables."

                );
            }
            await emailjs.send(serviceId, templateId, { 
                name: formData.name,
                email: formData.email,
                message: formData.message,
               
            }, 
            publicKey
        );
        setSubmitStatus({ 
            type: "success", 
            message: "Message sent successfully! I'll get back to you soon." 
        });
        setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("EmailJS Error:", error);
            setSubmitStatus({
                type: "error",
                message: error.text || "Failed to send message. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section id="contact" className="relative py-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2">
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl"/>
            </div>
            <div className="container mx-auto px-6 relative z-10">
                 {/* Section Header */}
                <div className="text-center mx-auto max-w-3xl mb-16">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
                        Get In Touch
                        </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                        Let's build {" "}
                        <span className="font-serif italic font-normal text-white">
                            {" "}
                            something great.
                            </span>
                    </h2>
                    <p className="text-muted-foreground animate-fade-in animation-delay-200">
                       I'm always open to new opportunities and collaborations. Feel free to reach out to me through any of the channels below. 
                    </p>
                </div>
                <div className="grid lg:grid-cols-8 gap-12 w-full max-w-7xl xl:max-w-[1400px] mx-auto px-6">
                    <div className="lg:col-span-5">
                    <div className="glass p-8 rounded-3xl border border-primary/30 animate-fade-in animation-delay-300">
                        
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label 
                                htmlFor="name"
                                className="block text-sm font-medium mb-2">Name</label>
                                <input 
                                    id="name" 
                                    type="text"
                                    required
                                    placeholder="Your name..."
                                    value={formData.name}
                                    onChange={(e) => 
                                        setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"/>
                            </div>

                            <div>
                                <label 
                                    htmlFor="email"
                                    
                                    className="block text-sm font-medium mb-2"
                                    >
                                        Email
                                        </label>
                                <input
                                    className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    required
                                    type="email"
                                    placeholder="Your email..."
                                    value={formData.email}
                                    onChange={(e) => 
                                        setFormData({...formData, email: e.target.value})}
                                    />                           </div>
                            <div>
                                <label 
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-2">Message</label>
                                <textarea 
                                rows={5}
                                    required
                                    placeholder="Your message..."
                                    value={formData.message}
                                    onChange={(e) => 
                                        setFormData({...formData, message: e.target.value})}
                                    className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"/>
                            </div>
                            <Button 
                            className="w-full" 
                            type="submit" 
                            size="lg" 
                            disabled={isLoading}
                            >
                              {isLoading ? (
                                <>Sending...</>

                                ) : (
                               
                                <>
                                Send Message
                               
                                <Send className="w-5 h-5"/>
                                 </>
                                )}
                            </Button>
                            {submitStatus.type && (
                                <div 
                                    className={`flex items-center gap-3 
                                        p-4 rounded-xl ${
                                        submitStatus.type === "success" 
                                        ? "bg-green-500/10 border border-green-500/10 text-green-500" 
                                        : "bg-red-500/10 border border-red-500/10 text-red-500"
                                        }`}
                                    >
                                        {submitStatus.type === "success" ? (
                                                <CheckCircle className="w-5 h-5 flex-shrink-0"/>
                                            ) : (
                                                <AlertCircle className="w-5 h-5 flex-shrink-0"/>
                                            )}
                                        <p className="text-sm">{submitStatus.message}</p>
                                    </div>
                                )}
                        </form>
                        </div>
                    </div>
                   {/* Contact Info */}
                   <div className="lg:col-span-3">
                   <div className="flex flex-col gap-6 animate-fade-in animation-delay-400">
                        <div className="glass rounded-3xl p-8">
                            <h3 className="text-xl font-semibold mb-6">
                                Contact Info
                                </h3>
                                <div className="space-y-4">
                                    {contactInfo.map((item, i) => (
                                        <a
                                        key={i}
                                        href={item.link}
                                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                               <item.icon className="w-5 h-5 text-primary"/>
                                            </div>
                                            <div>
                                                <div className="text-sm text-muted-foreground">
                                                    {item.title}
                                                </div>
                                                <div className="font-medium">
                                                    {item.value}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                    {/* Availability Card */}
                                    <div className="glass rounded-3xl p-8 border-primary/30">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"/>
                                            <span className="font-medium">Currently Available</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                I am currently open to new opportunities and would love to hear from you.
                                            </p>
                                    </div>
                    </div></div>      
                </div>
            </div>
    
 
                </div>
            </div>
            
        
            
            </section>
   )}; 