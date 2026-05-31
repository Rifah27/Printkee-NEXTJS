import React from "react";
import "../styles/Industries.css";
import {
  Building2,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Globe,
  Rocket,
} from "lucide-react";

const industries = [
  { icon: <Building2 size={52} aria-hidden="true" />, title: "IT Companies" },
  { icon: <Rocket size={52} aria-hidden="true" />, title: "Startups" },
  { icon: <Globe size={52} aria-hidden="true" />, title: "Automobile" },
  { icon: <GraduationCap size={52} aria-hidden="true" />, title: "Education" },
  { icon: <Stethoscope size={52} aria-hidden="true" />, title: "Healthcare" },
  { icon: <Briefcase size={52} aria-hidden="true" />, title: "Corporate Offices" },
];

const Industries = () => {
  return (
    <section
      className="industries-section-full"
      
      aria-labelledby="industries-heading"
    >
      <div className="industries-section">
        <h2 className="industries-heading" id="industries-heading">
          Industries We Serve
        </h2>

        <div className="industries-grid">
          {industries.map((industry, index) => (
            <div
              className="industry-card"
              key={index}
           
              aria-label={industry.title}
            >
              <div className="industry-icon">{industry.icon}</div>
              <p className="industry-title">{industry.title}</p>
            </div>
          ))}
        </div>

        <button
          className="industries-cta"
          aria-label="Talk to a gifting expert"
          onClick={() => (window.location.href = "/contact")}
        >
          Talk to Gifting Expert <span className="arrow-1">→</span>
        </button>
      </div>
    </section>
  );
};

export default Industries;
