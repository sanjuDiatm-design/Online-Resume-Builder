import React, { useRef, useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useAuth, API_BASE_URL } from "../context/AuthContext";
import "../StyleSheets/ResumeBuilder.css";

const COLOR_PRESETS = [
  { name: "Royal Blue", value: "#2563eb" },
  { name: "Emerald Green", value: "#059669" },
  { name: "Modern Slate", value: "#334155" },
  { name: "Deep Purple", value: "#7c3aed" },
  { name: "Crimson Red", value: "#dc2626" },
  { name: "Amber Orange", value: "#d97706" },
];

const SAMPLE_DATA = {
  title: "Senior Full Stack Engineer Resume",
  templateId: "template-one",
  themeColor: "#2563eb",
  fontFamily: "Inter, sans-serif",
  personalInfo: {
    fullName: "Sanju Ghosh",
    jobTitle: "Senior Full-Stack Engineer",
    email: "sg6289793@gmail.com",
    phone: "+91 8509729245",
    address: "India",
    website: "https://sanjughosh.dev",
    linkedin: "linkedin.com/in/sanjughosh",
    github: "github.com/sanjughosh",
  },
  summary:
    "Dynamic and results-driven Software Engineer with 6+ years of experience designing, architecting, and deploying scalable web applications and distributed cloud systems. Proven track record of spearheading high-traffic platforms, optimizing microservices performance by 40%, and mentoring junior engineering talent.",
  experience: [
    {
      company: "Starlight Cloud Systems",
      role: "Lead Full-Stack Developer",
      location: "San Francisco, CA",
      startDate: "2022",
      endDate: "Present",
      current: true,
      description:
        "• Architected core microservices handling over 5M+ daily requests with 99.98% uptime.\n• Spearheaded migration from legacy monolithic server to React 19 and Node.js microservices.\n• Mentored 8 junior and mid-level software engineers across agile sprint cycles.",
    },
    {
      company: "Nexus Technologies",
      role: "Software Engineer",
      location: "Austin, TX",
      startDate: "2019",
      endDate: "2022",
      current: false,
      description:
        "• Developed reusable component libraries reducing frontend development cycle time by 25%.\n• Optimized MongoDB aggregation pipelines and Redis caching layers, cutting query latency by 45%.\n• Integrated third-party OAuth and Stripe payment processing systems seamlessly.",
    },
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      fieldOfStudy: "Software Engineering & Distributed Systems",
      location: "Berkeley, CA",
      startDate: "2015",
      endDate: "2019",
      grade: "3.85 GPA - Magna Cum Laude",
    },
  ],
  projects: [
    {
      title: "FlowState AI Workflow Orchestrator",
      description: "An automated workflow builder empowering developers to link multi-step LLM operations with real-time state tracking.",
      link: "https://flowstate-ai.example.com",
      techStack: "React, Node.js, Express, MongoDB, WebSocket",
    },
    {
      title: "QuickMetrics Analytics Engine",
      description: "Lightweight, privacy-first web performance analytics SDK tracking core web vitals and user engagements.",
      link: "https://quickmetrics.example.com",
      techStack: "TypeScript, Vite, Express, Redis",
    },
  ],
  skills: [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "RESTful APIs",
    "GraphQL",
    "Docker",
    "Git / GitHub",
    "Tailwind CSS",
    "AWS",
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      name: "MongoDB Certified Developer Associate",
      issuer: "MongoDB Inc.",
      date: "2022",
    },
  ],
};

function ResumeBuilder() {
  const { templateId } = useParams();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("id");
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const validTemplates = ["template-one", "template-two", "template-three", "template-four"];
  const initialTemplate = validTemplates.includes(templateId) ? templateId : "template-one";

  const [resumeData, setResumeData] = useState({
    title: "My Professional Resume",
    templateId: initialTemplate,
    themeColor: "#2563eb",
    fontFamily: "Inter, sans-serif",
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      linkedin: "",
      github: "",
    },
    summary: "",
    experience: [
      {
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    education: [
      {
        school: "",
        degree: "",
        fieldOfStudy: "",
        location: "",
        startDate: "",
        endDate: "",
        grade: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        link: "",
        techStack: "",
      },
    ],
    skills: ["React", "JavaScript", "HTML/CSS"],
    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
      },
    ],
  });

  const [activeSkillInput, setActiveSkillInput] = useState("");
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef(null);

  // Load existing resume from backend if ID is in URL
  useEffect(() => {
    if (resumeId && token) {
      fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.resume) {
            setResumeData(data.resume);
          }
        })
        .catch((err) => console.error("Error loading resume:", err));
    }
  }, [resumeId, token]);

  // Keep templateId synchronized with URL parameter
  useEffect(() => {
    if (templateId && validTemplates.includes(templateId)) {
      setResumeData((prev) => ({ ...prev, templateId }));
    }
  }, [templateId]);

  // Handlers for Personal Info
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  // Handlers for Experience
  const handleExperienceChange = (index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: "", role: "", location: "", startDate: "", endDate: "", current: false, description: "" },
      ],
    }));
  };

  const removeExperience = (index) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Handlers for Education
  const handleEducationChange = (index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { school: "", degree: "", fieldOfStudy: "", location: "", startDate: "", endDate: "", grade: "" },
      ],
    }));
  };

  const removeEducation = (index) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Handlers for Projects
  const handleProjectChange = (index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", link: "", techStack: "" }],
    }));
  };

  const removeProject = (index) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Handlers for Certifications
  const handleCertificationChange = (index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev.certifications];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, certifications: updated };
    });
  };

  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuer: "", date: "" }],
    }));
  };

  const removeCertification = (index) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Handlers for Skills
  const handleAddSkill = (e) => {
    if ((e.key === "Enter" || e.type === "click") && activeSkillInput.trim()) {
      e.preventDefault();
      const newSkills = activeSkillInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s && !resumeData.skills.includes(s));
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, ...newSkills],
      }));
      setActiveSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Sample Data & Clear actions
  const loadSampleData = () => {
    setResumeData({
      ...SAMPLE_DATA,
      templateId: resumeData.templateId || "template-one",
      themeColor: resumeData.themeColor || "#2563eb",
    });
    showToast("Sample data loaded successfully!", "success");
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all resume fields?")) {
      setResumeData({
        title: "Untitled Resume",
        templateId: resumeData.templateId,
        themeColor: resumeData.themeColor,
        fontFamily: resumeData.fontFamily,
        personalInfo: {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          address: "",
          website: "",
          linkedin: "",
          github: "",
        },
        summary: "",
        experience: [],
        education: [],
        projects: [],
        skills: [],
        certifications: [],
      });
      showToast("Form cleared.", "info");
    }
  };

  const showToast = (text, type = "success") => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage({ text: "", type: "" });
    }, 4000);
  };

  // Save to Database or Local Storage
  const handleSaveResume = async () => {
    setIsSaving(true);
    if (!isAuthenticated || !token) {
      // Save locally
      localStorage.setItem("saved_resume_draft", JSON.stringify(resumeData));
      showToast("Draft saved locally! Sign in to sync across devices.", "info");
      setIsSaving(false);
      return;
    }

    try {
      const url = resumeId ? `${API_BASE_URL}/resumes/${resumeId}` : `${API_BASE_URL}/resumes`;
      const method = resumeId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resumeData),
      });

      const data = await res.json();
      if (res.ok) {
        showToast(resumeId ? "Resume updated in cloud!" : "Resume created and saved to cloud!", "success");
        if (!resumeId && data.resume?._id) {
          navigate(`/build/${resumeData.templateId}?id=${data.resume._id}`, { replace: true });
        }
      } else {
        showToast(data.error || "Failed to save resume.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error while saving to backend.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Download PDF
  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    showToast("Generating high-resolution PDF...", "info");

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 5) {
        position = -(imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = `${(resumeData.personalInfo.fullName || "resume").replace(/\s+/g, "_")}_${resumeData.templateId}.pdf`;
      pdf.save(filename);
      showToast("PDF downloaded successfully!", "success");
    } catch (err) {
      console.error("PDF generation error:", err);
      showToast("Failed to generate PDF.", "error");
    }
  };

  // Print via Browser
  const handlePrint = () => {
    window.print();
  };

  // Download DOCX
  const handleDownloadDOCX = async () => {
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");

      const docChildren = [
        new Paragraph({
          text: resumeData.personalInfo.fullName || "Your Name",
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          text: resumeData.personalInfo.jobTitle || "Job Title",
          italics: true,
        }),
        new Paragraph({
          text: [
            resumeData.personalInfo.email,
            resumeData.personalInfo.phone,
            resumeData.personalInfo.address,
            resumeData.personalInfo.website,
          ]
            .filter(Boolean)
            .join(" • ") || "Contact info",
        }),
        new Paragraph({ text: "" }),
      ];

      if (resumeData.summary) {
        docChildren.push(
          new Paragraph({ text: "PROFESSIONAL SUMMARY", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: resumeData.summary }),
          new Paragraph({ text: "" })
        );
      }

      if (resumeData.experience.length) {
        docChildren.push(new Paragraph({ text: "WORK EXPERIENCE", heading: HeadingLevel.HEADING_2 }));
        resumeData.experience.forEach((exp) => {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${exp.role || "Role"} `, bold: true }),
                new TextRun({ text: `at ${exp.company || "Company"} ` }),
                new TextRun({ text: `(${exp.startDate || "Start"} - ${exp.endDate || "Present"})`, italics: true }),
              ],
            }),
            new Paragraph({ text: exp.description || "" }),
            new Paragraph({ text: "" })
          );
        });
      }

      if (resumeData.education.length) {
        docChildren.push(new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_2 }));
        resumeData.education.forEach((edu) => {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.degree || "Degree"} `, bold: true }),
                new TextRun({ text: `• ${edu.school || "School"} ` }),
                new TextRun({ text: `(${edu.endDate || edu.startDate || ""})`, italics: true }),
              ],
            }),
            new Paragraph({ text: edu.fieldOfStudy ? `Field: ${edu.fieldOfStudy}` : "" }),
            new Paragraph({ text: "" })
          );
        });
      }

      if (resumeData.skills.length) {
        docChildren.push(
          new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: resumeData.skills.join(", ") }),
          new Paragraph({ text: "" })
        );
      }

      const doc = new Document({
        sections: [{ children: docChildren }],
      });

      const blob = await Packer.toBlob(doc);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${(resumeData.personalInfo.fullName || "resume").replace(/\s+/g, "_")}.docx`;
      a.click();
      showToast("DOCX exported successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Error generating DOCX document.", "error");
    }
  };

  return (
    <div className="builder-layout">
      {/* Toast message */}
      {statusMessage.text && (
        <div className={`builder-toast builder-toast--${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}

      {/* Top Toolbar */}
      <header className="builder-toolbar no-print">
        <div className="toolbar-left">
          <input
            type="text"
            className="resume-title-input"
            value={resumeData.title}
            onChange={(e) => setResumeData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Name your resume (e.g. Frontend Engineer)"
          />
        </div>

        <div className="toolbar-center">
          {/* Template switcher pills */}
          <div className="template-picker">
            <label>Template:</label>
            <button
              className={`template-pill ${resumeData.templateId === "template-one" ? "active" : ""}`}
              onClick={() => {
                setResumeData((prev) => ({ ...prev, templateId: "template-one" }));
                navigate(`/build/template-one${resumeId ? `?id=${resumeId}` : ""}`);
              }}
            >
              Modern Clean
            </button>
            <button
              className={`template-pill ${resumeData.templateId === "template-two" ? "active" : ""}`}
              onClick={() => {
                setResumeData((prev) => ({ ...prev, templateId: "template-two" }));
                navigate(`/build/template-two${resumeId ? `?id=${resumeId}` : ""}`);
              }}
            >
              Executive Sidebar
            </button>
            <button
              className={`template-pill ${resumeData.templateId === "template-three" ? "active" : ""}`}
              onClick={() => {
                setResumeData((prev) => ({ ...prev, templateId: "template-three" }));
                navigate(`/build/template-three${resumeId ? `?id=${resumeId}` : ""}`);
              }}
            >
              Tech Accent
            </button>
            <button
              className={`template-pill ${resumeData.templateId === "template-four" ? "active" : ""}`}
              onClick={() => {
                setResumeData((prev) => ({ ...prev, templateId: "template-four" }));
                navigate(`/build/template-four${resumeId ? `?id=${resumeId}` : ""}`);
              }}
            >
              Minimal ATS
            </button>
          </div>

          {/* Color preset swatches */}
          <div className="color-swatches">
            {COLOR_PRESETS.map((color) => (
              <span
                key={color.value}
                className={`color-swatch ${resumeData.themeColor === color.value ? "selected" : ""}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
                onClick={() => setResumeData((prev) => ({ ...prev, themeColor: color.value }))}
              />
            ))}
          </div>
        </div>

        <div className="toolbar-right">
          <button className="tool-btn tool-btn--sample" onClick={loadSampleData}>
            Load Demo
          </button>
          <button className="tool-btn tool-btn--clear" onClick={clearAllData}>
            Clear
          </button>
          <button className="tool-btn tool-btn--save" onClick={handleSaveResume} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Resume"}
          </button>
          <button className="tool-btn tool-btn--primary" onClick={handleDownloadPDF}>
            Download PDF
          </button>
          <button className="tool-btn tool-btn--outline" onClick={handleDownloadDOCX}>
            DOCX
          </button>
          <button className="tool-btn tool-btn--print" onClick={handlePrint} title="Print directly">
            🖨️
          </button>
        </div>
      </header>

      {/* Main Dual-Pane Section */}
      <div className="builder-main">
        {/* LEFT COLUMN: Input Form */}
        <div className="builder-editor no-print">
          {/* 1. Personal Details */}
          <div className="editor-card">
            <h3 className="editor-heading">👤 Personal Information</h3>
            <div className="editor-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Alex Rivera"
                  value={resumeData.personalInfo.fullName}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="form-group">
                <label>Job Title / Headline</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="e.g. Senior Software Engineer"
                  value={resumeData.personalInfo.jobTitle}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="alex@example.com"
                  value={resumeData.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={resumeData.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="form-group">
                <label>Location / Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="City, State / Country"
                  value={resumeData.personalInfo.address}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="form-group">
                <label>Portfolio / Website</label>
                <input
                  type="text"
                  name="website"
                  placeholder="https://yourportfolio.dev"
                  value={resumeData.personalInfo.website}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="linkedin.com/in/username"
                  value={resumeData.personalInfo.linkedin}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="form-group">
                <label>GitHub</label>
                <input
                  type="text"
                  name="github"
                  placeholder="github.com/username"
                  value={resumeData.personalInfo.github}
                  onChange={handlePersonalInfoChange}
                />
              </div>
            </div>
          </div>

          {/* 2. Professional Summary */}
          <div className="editor-card">
            <h3 className="editor-heading">📝 Professional Summary</h3>
            <textarea
              className="editor-textarea"
              placeholder="Write a concise overview of your background, core strengths, and career highlights..."
              value={resumeData.summary}
              onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
            />
          </div>

          {/* 3. Work Experience */}
          <div className="editor-card">
            <div className="editor-card-header">
              <h3 className="editor-heading">💼 Work Experience</h3>
              <button type="button" className="btn-add-item" onClick={addExperience}>
                + Add Experience
              </button>
            </div>

            {resumeData.experience.map((exp, index) => (
              <div key={index} className="nested-item-box">
                <div className="nested-item-top">
                  <span className="nested-item-index">#{index + 1} Position</span>
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeExperience(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className="editor-grid">
                  <div className="form-group">
                    <label>Role / Position</label>
                    <input
                      type="text"
                      placeholder="Senior Full Stack Engineer"
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Organization</label>
                    <input
                      type="text"
                      placeholder="Tech Corp Inc."
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="San Francisco, CA or Remote"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                    />
                  </div>
                  <div className="form-group date-group">
                    <div>
                      <label>Start Date</label>
                      <input
                        type="text"
                        placeholder="2021"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <label>End Date</label>
                      <input
                        type="text"
                        placeholder="Present"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Key Responsibilities & Achievements</label>
                  <textarea
                    placeholder="• Built scalable APIs...&#10;• Reduced latency by 30%..."
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 4. Education */}
          <div className="editor-card">
            <div className="editor-card-header">
              <h3 className="editor-heading">🎓 Education</h3>
              <button type="button" className="btn-add-item" onClick={addEducation}>
                + Add Education
              </button>
            </div>

            {resumeData.education.map((edu, index) => (
              <div key={index} className="nested-item-box">
                <div className="nested-item-top">
                  <span className="nested-item-index">#{index + 1} Degree</span>
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeEducation(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className="editor-grid">
                  <div className="form-group">
                    <label>Degree / Certificate</label>
                    <input
                      type="text"
                      placeholder="B.S. in Computer Science"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>School / University</label>
                    <input
                      type="text"
                      placeholder="UC Berkeley"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Field of Study / Major</label>
                    <input
                      type="text"
                      placeholder="Software Engineering"
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleEducationChange(index, "fieldOfStudy", e.target.value)}
                    />
                  </div>
                  <div className="form-group date-group">
                    <div>
                      <label>Graduation Year</label>
                      <input
                        type="text"
                        placeholder="2019"
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <label>GPA / Honors</label>
                      <input
                        type="text"
                        placeholder="3.8 GPA"
                        value={edu.grade}
                        onChange={(e) => handleEducationChange(index, "grade", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 5. Projects */}
          <div className="editor-card">
            <div className="editor-card-header">
              <h3 className="editor-heading">🚀 Key Projects</h3>
              <button type="button" className="btn-add-item" onClick={addProject}>
                + Add Project
              </button>
            </div>

            {resumeData.projects.map((proj, index) => (
              <div key={index} className="nested-item-box">
                <div className="nested-item-top">
                  <span className="nested-item-index">#{index + 1} Project</span>
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeProject(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className="editor-grid">
                  <div className="form-group">
                    <label>Project Title</label>
                    <input
                      type="text"
                      placeholder="FlowState AI"
                      value={proj.title}
                      onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Demo Link / Repository</label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      value={proj.link}
                      onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Technologies Used</label>
                    <input
                      type="text"
                      placeholder="React, TypeScript, Node.js, MongoDB"
                      value={proj.techStack}
                      onChange={(e) => handleProjectChange(index, "techStack", e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Project Description</label>
                    <textarea
                      placeholder="Brief overview of features, impact and architecture..."
                      value={proj.description}
                      onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 6. Skills */}
          <div className="editor-card">
            <h3 className="editor-heading">⚡ Skills & Technologies</h3>
            <div className="skills-input-wrapper">
              <input
                type="text"
                placeholder="Type skill and press Enter (or comma)..."
                value={activeSkillInput}
                onChange={(e) => setActiveSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
              />
              <button type="button" className="btn-add-skill" onClick={handleAddSkill}>
                Add
              </button>
            </div>
            <div className="skills-chips">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={() => removeSkill(skill)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 7. Certifications */}
          <div className="editor-card">
            <div className="editor-card-header">
              <h3 className="editor-heading">📜 Certifications</h3>
              <button type="button" className="btn-add-item" onClick={addCertification}>
                + Add Certification
              </button>
            </div>

            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="nested-item-box">
                <div className="nested-item-top">
                  <span className="nested-item-index">#{index + 1} Certification</span>
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeCertification(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className="editor-grid">
                  <div className="form-group">
                    <label>Certification Name</label>
                    <input
                      type="text"
                      placeholder="AWS Certified Solutions Architect"
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Issuing Organization</label>
                    <input
                      type="text"
                      placeholder="Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(index, "issuer", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Issue Date</label>
                    <input
                      type="text"
                      placeholder="2023"
                      value={cert.date}
                      onChange={(e) => handleCertificationChange(index, "date", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Paper Preview */}
        <div className="builder-preview-wrapper">
          <div className="preview-container">
            <aside
              ref={previewRef}
              className={`resume-paper ${resumeData.templateId}`}
              style={{ "--theme-color": resumeData.themeColor }}
            >
              {/* TEMPLATE ONE: Modern Clean */}
              {resumeData.templateId === "template-one" && (
                <div className="t1-body">
                  <div className="t1-header">
                    <h1 className="t1-name" style={{ color: resumeData.themeColor }}>
                      {resumeData.personalInfo.fullName || "Your Full Name"}
                    </h1>
                    <div className="t1-title">{resumeData.personalInfo.jobTitle || "Professional Title"}</div>
                    <div className="t1-contacts">
                      {[
                        resumeData.personalInfo.email,
                        resumeData.personalInfo.phone,
                        resumeData.personalInfo.address,
                        resumeData.personalInfo.website,
                        resumeData.personalInfo.linkedin,
                        resumeData.personalInfo.github,
                      ]
                        .filter(Boolean)
                        .map((info, idx) => (
                          <span key={idx} className="t1-contact-item">
                            {info}
                          </span>
                        ))}
                    </div>
                  </div>

                  {resumeData.summary && (
                    <div className="t1-section">
                      <h2 className="t1-section-title" style={{ borderColor: resumeData.themeColor }}>
                        Professional Summary
                      </h2>
                      <p className="t1-summary">{resumeData.summary}</p>
                    </div>
                  )}

                  {resumeData.experience.length > 0 && (
                    <div className="t1-section">
                      <h2 className="t1-section-title" style={{ borderColor: resumeData.themeColor }}>
                        Work Experience
                      </h2>
                      {resumeData.experience.map((exp, i) => (
                        <div key={i} className="t1-item">
                          <div className="t1-item-header">
                            <div>
                              <strong className="t1-item-role">{exp.role || "Job Role"}</strong>
                              <span className="t1-item-company"> • {exp.company || "Company Name"}</span>
                              {exp.location && <span className="t1-item-loc"> ({exp.location})</span>}
                            </div>
                            <span className="t1-item-dates">
                              {exp.startDate || "Start"} — {exp.endDate || (exp.current ? "Present" : "End")}
                            </span>
                          </div>
                          {exp.description && (
                            <div className="t1-item-desc">
                              {exp.description.split("\n").map((line, li) => (
                                <p key={li}>{line}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.projects.length > 0 && (
                    <div className="t1-section">
                      <h2 className="t1-section-title" style={{ borderColor: resumeData.themeColor }}>
                        Featured Projects
                      </h2>
                      {resumeData.projects.map((proj, i) => (
                        <div key={i} className="t1-item">
                          <div className="t1-item-header">
                            <strong className="t1-item-role">{proj.title || "Project Name"}</strong>
                            {proj.link && <span className="t1-item-dates">{proj.link}</span>}
                          </div>
                          {proj.techStack && (
                            <div className="t1-item-tech">
                              <strong>Technologies: </strong>
                              {proj.techStack}
                            </div>
                          )}
                          <p className="t1-item-desc">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.education.length > 0 && (
                    <div className="t1-section">
                      <h2 className="t1-section-title" style={{ borderColor: resumeData.themeColor }}>
                        Education
                      </h2>
                      {resumeData.education.map((edu, i) => (
                        <div key={i} className="t1-item">
                          <div className="t1-item-header">
                            <div>
                              <strong className="t1-item-role">{edu.degree || "Degree"}</strong>
                              <span className="t1-item-company"> • {edu.school || "Institution"}</span>
                              {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                            </div>
                            <span className="t1-item-dates">
                              {edu.endDate || edu.startDate} {edu.grade && `(${edu.grade})`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.skills.length > 0 && (
                    <div className="t1-section">
                      <h2 className="t1-section-title" style={{ borderColor: resumeData.themeColor }}>
                        Skills & Proficiencies
                      </h2>
                      <div className="t1-skills-list">
                        {resumeData.skills.map((s, idx) => (
                          <span key={idx} className="t1-skill-badge">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {resumeData.certifications.length > 0 && (
                    <div className="t1-section">
                      <h2 className="t1-section-title" style={{ borderColor: resumeData.themeColor }}>
                        Certifications
                      </h2>
                      {resumeData.certifications.map((cert, i) => (
                        <div key={i} className="t1-cert-line">
                          <strong>{cert.name}</strong> — {cert.issuer} {cert.date && `(${cert.date})`}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TEMPLATE TWO: Executive Two-Column Sidebar */}
              {resumeData.templateId === "template-two" && (
                <div className="t2-layout">
                  {/* Left Sidebar */}
                  <aside className="t2-sidebar" style={{ backgroundColor: resumeData.themeColor }}>
                    <div className="t2-sidebar-header">
                      <div className="t2-avatar">
                        {(resumeData.personalInfo.fullName || "User").charAt(0).toUpperCase()}
                      </div>
                      <h2 className="t2-name">{resumeData.personalInfo.fullName || "Your Full Name"}</h2>
                      <div className="t2-title">{resumeData.personalInfo.jobTitle || "Job Title"}</div>
                    </div>

                    <div className="t2-sidebar-section">
                      <h3 className="t2-sidebar-heading">CONTACT</h3>
                      <div className="t2-contact-list">
                        {resumeData.personalInfo.email && <div>✉️ {resumeData.personalInfo.email}</div>}
                        {resumeData.personalInfo.phone && <div>📞 {resumeData.personalInfo.phone}</div>}
                        {resumeData.personalInfo.address && <div>📍 {resumeData.personalInfo.address}</div>}
                        {resumeData.personalInfo.website && <div>🌐 {resumeData.personalInfo.website}</div>}
                        {resumeData.personalInfo.linkedin && <div>💼 {resumeData.personalInfo.linkedin}</div>}
                        {resumeData.personalInfo.github && <div>💻 {resumeData.personalInfo.github}</div>}
                      </div>
                    </div>

                    {resumeData.education.length > 0 && (
                      <div className="t2-sidebar-section">
                        <h3 className="t2-sidebar-heading">EDUCATION</h3>
                        {resumeData.education.map((edu, i) => (
                          <div key={i} className="t2-sidebar-edu">
                            <strong>{edu.degree || "Degree"}</strong>
                            <div>{edu.school}</div>
                            <small>{edu.endDate || edu.startDate}</small>
                          </div>
                        ))}
                      </div>
                    )}

                    {resumeData.skills.length > 0 && (
                      <div className="t2-sidebar-section">
                        <h3 className="t2-sidebar-heading">SKILLS</h3>
                        <div className="t2-skills-wrap">
                          {resumeData.skills.map((s, idx) => (
                            <span key={idx} className="t2-skill-pill">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </aside>

                  {/* Right Content */}
                  <div className="t2-main">
                    {resumeData.summary && (
                      <div className="t2-section">
                        <h3 className="t2-main-heading" style={{ color: resumeData.themeColor }}>
                          PROFILE SUMMARY
                        </h3>
                        <p className="t2-summary">{resumeData.summary}</p>
                      </div>
                    )}

                    {resumeData.experience.length > 0 && (
                      <div className="t2-section">
                        <h3 className="t2-main-heading" style={{ color: resumeData.themeColor }}>
                          WORK EXPERIENCE
                        </h3>
                        {resumeData.experience.map((exp, i) => (
                          <div key={i} className="t2-exp-item">
                            <div className="t2-exp-top">
                              <span className="t2-exp-role">{exp.role || "Job Role"}</span>
                              <span className="t2-exp-date">
                                {exp.startDate} - {exp.endDate || (exp.current ? "Present" : "")}
                              </span>
                            </div>
                            <div className="t2-exp-sub">
                              {exp.company} {exp.location && `| ${exp.location}`}
                            </div>
                            {exp.description && (
                              <div className="t2-exp-desc">
                                {exp.description.split("\n").map((line, li) => (
                                  <p key={li}>{line}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {resumeData.projects.length > 0 && (
                      <div className="t2-section">
                        <h3 className="t2-main-heading" style={{ color: resumeData.themeColor }}>
                          PROJECTS
                        </h3>
                        {resumeData.projects.map((proj, i) => (
                          <div key={i} className="t2-exp-item">
                            <div className="t2-exp-top">
                              <span className="t2-exp-role">{proj.title}</span>
                              {proj.link && <span className="t2-exp-date">{proj.link}</span>}
                            </div>
                            {proj.techStack && (
                              <div className="t2-exp-sub">Tech: {proj.techStack}</div>
                            )}
                            <p className="t2-exp-desc">{proj.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {resumeData.certifications.length > 0 && (
                      <div className="t2-section">
                        <h3 className="t2-main-heading" style={{ color: resumeData.themeColor }}>
                          CERTIFICATIONS
                        </h3>
                        {resumeData.certifications.map((cert, i) => (
                          <div key={i} className="t2-cert-item">
                            • <strong>{cert.name}</strong> ({cert.issuer}, {cert.date})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TEMPLATE THREE: Tech Accent */}
              {resumeData.templateId === "template-three" && (
                <div className="t3-layout">
                  <div className="t3-accent-bar" style={{ backgroundColor: resumeData.themeColor }}></div>
                  <div className="t3-header">
                    <div>
                      <h1 className="t3-name">{resumeData.personalInfo.fullName || "Your Full Name"}</h1>
                      <div className="t3-role" style={{ color: resumeData.themeColor }}>
                        {resumeData.personalInfo.jobTitle || "Tech Specialist"}
                      </div>
                    </div>
                    <div className="t3-meta">
                      {[
                        resumeData.personalInfo.email,
                        resumeData.personalInfo.phone,
                        resumeData.personalInfo.address,
                        resumeData.personalInfo.github,
                        resumeData.personalInfo.linkedin,
                      ]
                        .filter(Boolean)
                        .map((c, i) => (
                          <span key={i} className="t3-meta-tag">
                            {c}
                          </span>
                        ))}
                    </div>
                  </div>

                  {resumeData.summary && (
                    <div className="t3-block">
                      <div className="t3-tag-title" style={{ backgroundColor: resumeData.themeColor }}>
                        ABOUT ME
                      </div>
                      <p className="t3-text">{resumeData.summary}</p>
                    </div>
                  )}

                  {resumeData.experience.length > 0 && (
                    <div className="t3-block">
                      <div className="t3-tag-title" style={{ backgroundColor: resumeData.themeColor }}>
                        CAREER TIMELINE
                      </div>
                      <div className="t3-timeline">
                        {resumeData.experience.map((exp, i) => (
                          <div key={i} className="t3-time-node">
                            <div className="t3-node-marker" style={{ borderColor: resumeData.themeColor }}></div>
                            <div className="t3-node-content">
                              <div className="t3-node-top">
                                <strong>{exp.role}</strong> @ <span>{exp.company}</span>
                                <span className="t3-node-time">
                                  {exp.startDate} - {exp.endDate || (exp.current ? "Present" : "")}
                                </span>
                              </div>
                              {exp.description && (
                                <div className="t3-node-desc">
                                  {exp.description.split("\n").map((line, li) => (
                                    <p key={li}>{line}</p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {resumeData.projects.length > 0 && (
                    <div className="t3-block">
                      <div className="t3-tag-title" style={{ backgroundColor: resumeData.themeColor }}>
                        FEATURED BUILDS
                      </div>
                      <div className="t3-projects-grid">
                        {resumeData.projects.map((proj, i) => (
                          <div key={i} className="t3-proj-card">
                            <div className="t3-proj-title">{proj.title}</div>
                            {proj.techStack && <div className="t3-proj-tech">{proj.techStack}</div>}
                            <div className="t3-proj-desc">{proj.description}</div>
                            {proj.link && <div className="t3-proj-link">{proj.link}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="t3-bottom-grid">
                    {resumeData.education.length > 0 && (
                      <div className="t3-block">
                        <div className="t3-tag-title" style={{ backgroundColor: resumeData.themeColor }}>
                          EDUCATION
                        </div>
                        {resumeData.education.map((edu, i) => (
                          <div key={i} className="t3-edu-item">
                            <strong>{edu.degree}</strong>
                            <div>{edu.school}</div>
                            <small>{edu.endDate || edu.startDate}</small>
                          </div>
                        ))}
                      </div>
                    )}

                    {resumeData.skills.length > 0 && (
                      <div className="t3-block">
                        <div className="t3-tag-title" style={{ backgroundColor: resumeData.themeColor }}>
                          SKILLS
                        </div>
                        <div className="t3-skills-chips">
                          {resumeData.skills.map((s, idx) => (
                            <span key={idx} className="t3-skill-chip">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TEMPLATE FOUR: Minimal ATS */}
              {resumeData.templateId === "template-four" && (
                <div className="t4-ats-layout">
                  <header className="t4-header">
                    <h1 className="t4-name">{resumeData.personalInfo.fullName || "Your Full Name"}</h1>
                    <div className="t4-contacts">
                      {[
                        resumeData.personalInfo.address,
                        resumeData.personalInfo.phone,
                        resumeData.personalInfo.email,
                        resumeData.personalInfo.website,
                        resumeData.personalInfo.linkedin,
                      ]
                        .filter(Boolean)
                        .join(" | ")}
                    </div>
                  </header>

                  {resumeData.summary && (
                    <div className="t4-section">
                      <div className="t4-heading">PROFESSIONAL SUMMARY</div>
                      <p className="t4-text">{resumeData.summary}</p>
                    </div>
                  )}

                  {resumeData.experience.length > 0 && (
                    <div className="t4-section">
                      <div className="t4-heading">EXPERIENCE</div>
                      {resumeData.experience.map((exp, i) => (
                        <div key={i} className="t4-exp-item">
                          <div className="t4-row">
                            <strong>{exp.company}</strong>
                            <span>{exp.location}</span>
                          </div>
                          <div className="t4-row t4-sub-row">
                            <em>{exp.role}</em>
                            <span>
                              {exp.startDate} - {exp.endDate || (exp.current ? "Present" : "")}
                            </span>
                          </div>
                          {exp.description && (
                            <div className="t4-desc">
                              {exp.description.split("\n").map((line, li) => (
                                <p key={li}>{line}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.education.length > 0 && (
                    <div className="t4-section">
                      <div className="t4-heading">EDUCATION</div>
                      {resumeData.education.map((edu, i) => (
                        <div key={i} className="t4-exp-item">
                          <div className="t4-row">
                            <strong>{edu.school}</strong>
                            <span>{edu.location}</span>
                          </div>
                          <div className="t4-row t4-sub-row">
                            <span>
                              {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                            </span>
                            <span>{edu.endDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.projects.length > 0 && (
                    <div className="t4-section">
                      <div className="t4-heading">PROJECTS</div>
                      {resumeData.projects.map((proj, i) => (
                        <div key={i} className="t4-exp-item">
                          <div className="t4-row">
                            <strong>{proj.title}</strong>
                            <span>{proj.link}</span>
                          </div>
                          {proj.techStack && <div className="t4-tech">Technologies: {proj.techStack}</div>}
                          <p className="t4-desc">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.skills.length > 0 && (
                    <div className="t4-section">
                      <div className="t4-heading">TECHNICAL SKILLS</div>
                      <p className="t4-text">{resumeData.skills.join(" • ")}</p>
                    </div>
                  )}

                  {resumeData.certifications.length > 0 && (
                    <div className="t4-section">
                      <div className="t4-heading">CERTIFICATIONS</div>
                      <p className="t4-text">
                        {resumeData.certifications.map((c) => `${c.name} (${c.issuer})`).join("; ")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
