'use client'

import { Briefcase, Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook } from 'lucide-react'

const footerLinks = {
    'Company': ['About Us', 'Careers', 'Blog', 'Press'],
    'For Candidates': ['Browse Jobs', 'Salary Guide', 'Career Advice', 'Resume Builder'],
    'For Employers': ['Post a Job', 'Pricing', 'Hiring Guide', 'Company Pages'],
    'Support': ['Help Center', 'Contact Us', 'Community', 'FAQs'],
}

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold text-foreground">JobConnect Pro</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Connecting talent with opportunity worldwide.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-foreground transition">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-foreground mb-4">{category}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-border mb-8" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
                            <Mail className="w-4 h-4" />
                            support@jobconnectpro.com
                        </a>
                        <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
                            <Phone className="w-4 h-4" />
                            +1 (555) 123-4567
                        </a>
                        <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
                            <MapPin className="w-4 h-4" />
                            San Francisco, CA
                        </a>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                            Cookie Settings
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-border mt-8 pt-8">
                    <p className="text-center text-sm text-muted-foreground">
                        © 2025 JobConnect Pro. All rights reserved. • Built with excellence
                    </p>
                </div>
            </div>
        </footer>
    )
}
