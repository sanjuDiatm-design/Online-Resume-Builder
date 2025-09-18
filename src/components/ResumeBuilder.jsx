import React, { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../StyleSheets/ResumeBuilder.css";

function ResumeBuilder() {
  // Get templateId from URL (like /build/template-one)
  const { templateId } = useParams();

  // Just pick the templateId OR fallback to template-one
  const validTemplates = ["template-one", "template-two", "template-three"];
  const templateKey = validTemplates.includes(templateId) ? templateId : "template-one";

  // Form data (all inputs in one object)
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    experienceCompany: "",
    experienceRole: "",
    experienceStart: "",
    experienceEnd: "",
    experienceDesc: "",
    educationSchool: "",
    educationDegree: "",
    educationYear: "",
    skills: "",
  });

  // Update form data dynamically when user types
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Convert comma-separated skills into an array
  const skillsList = formData.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Ref for capturing preview (for PDF)
  const previewRef = useRef(null);

  // Download as PDF
  async function handleDownloadPDF() {
    const element = previewRef.current;
    if (!element) return;

    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 10, pageWidth, imgHeight);
    pdf.save(`${templateKey}-resume.pdf`);
  }

  // Download as DOCX
  async function handleDownloadDOCX() {
    const { Document, Packer, Paragraph, TextRun } = await import("docx");

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ text: formData.fullName || "Your Name", heading: "Heading1" }),
            new Paragraph({ text: formData.jobTitle || "Job Title", italics: true }),
            new Paragraph({
              text:
                [formData.email, formData.phone, formData.address].filter(Boolean).join(" • ") ||
                "email • phone • location",
            }),
            new Paragraph({ text: "Summary", bold: true }),
            new Paragraph({ text: formData.summary || "Write a short professional summary." }),
            new Paragraph({ text: "Experience", bold: true }),
            new Paragraph({
              text: `${formData.experienceRole || "Role"} - ${formData.experienceCompany || "Company"}`,
            }),
            new Paragraph({ text: formData.experienceDesc || "Responsibilities and achievements." }),
            new Paragraph({ text: "Education", bold: true }),
            new Paragraph({
              text: `${formData.educationDegree || "Degree"} • ${formData.educationSchool || "Institution"} • ${formData.educationYear || "Year"}`,
            }),
            new Paragraph({ text: "Skills", bold: true }),
            ...(skillsList.length
              ? skillsList.map((s) => new Paragraph({ text: s }))
              : [new Paragraph({ text: "Add your skills" })]),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${templateKey}-resume.docx`;
    a.click();
  }

  return (
    <section className="builder">
      {/* Top Header */}
      <div className="builder__header">
        <h2 className="builder__title">Build Your Resume</h2>
        <div className="builder__meta">
          <span className={`builder__template-badge builder__template-badge--${templateKey}`}>
            {templateKey.replace("-", " ")}
          </span>
          <Link to="/" className="builder__back">
            ← Back
          </Link>
        </div>
      </div>

      {/* Two-column layout: Form + Preview */}
      <div className="builder__grid">
        {/* FORM */}
        <form className="builder__form" onSubmit={(e) => e.preventDefault()}>
          {/* Personal Info */}
          <h3 className="builder__section-title">Personal Info</h3>
          <input className="builder__input" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} />
          <input className="builder__input" name="jobTitle" placeholder="Software Engineer" value={formData.jobTitle} onChange={handleChange} />
          <input className="builder__input" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
          <input className="builder__input" name="phone" placeholder="(555) 555-5555" value={formData.phone} onChange={handleChange} />
          <input className="builder__input" name="address" placeholder="City, Country" value={formData.address} onChange={handleChange} />

          {/* Summary */}
          <h3 className="builder__section-title">Summary</h3>
          <textarea className="builder__textarea" name="summary" placeholder="A short professional summary." value={formData.summary} onChange={handleChange} />

          {/* Experience */}
          <h3 className="builder__section-title">Experience</h3>
          <input className="builder__input" name="experienceCompany" placeholder="Company" value={formData.experienceCompany} onChange={handleChange} />
          <input className="builder__input" name="experienceRole" placeholder="Role" value={formData.experienceRole} onChange={handleChange} />
          <input className="builder__input" name="experienceStart" placeholder="Start" value={formData.experienceStart} onChange={handleChange} />
          <input className="builder__input" name="experienceEnd" placeholder="End" value={formData.experienceEnd} onChange={handleChange} />
          <textarea className="builder__textarea" name="experienceDesc" placeholder="Responsibilities & achievements." value={formData.experienceDesc} onChange={handleChange} />

          {/* Education */}
          <h3 className="builder__section-title">Education</h3>
          <input className="builder__input" name="educationSchool" placeholder="University" value={formData.educationSchool} onChange={handleChange} />
          <input className="builder__input" name="educationDegree" placeholder="Degree" value={formData.educationDegree} onChange={handleChange} />
          <input className="builder__input" name="educationYear" placeholder="2024" value={formData.educationYear} onChange={handleChange} />

          {/* Skills */}
          <h3 className="builder__section-title">Skills</h3>
          <input className="builder__input" name="skills" placeholder="React, JS, CSS" value={formData.skills} onChange={handleChange} />
          <span className="builder__hint">Comma-separated</span>

          {/* Action Buttons */}
          <div className="builder__actions">
            <button type="button" className="builder__download-btn" onClick={handleDownloadPDF}>
              Download PDF
            </button>
            <button type="button" className="builder__download-btn builder__download-btn--outline" onClick={handleDownloadDOCX}>
              Download DOCX
            </button>
          </div>
        </form>

        {/* PREVIEW */}
        <aside ref={previewRef} className={`builder__preview preview preview--${templateKey}`}>
          <div className="preview__header">
            <h2 className="preview__name">{formData.fullName || "Your Name"}</h2>
            <p className="preview__title">{formData.jobTitle || "Job Title"}</p>
            <p className="preview__contacts">
              {[formData.email, formData.phone, formData.address].filter(Boolean).join(" • ") || "email • phone • location"}
            </p>
          </div>

          <div className="preview__section">
            <h3 className="preview__section-title">Summary</h3>
            <p>{formData.summary || "Write a short professional summary."}</p>
          </div>

          <div className="preview__section">
            <h3 className="preview__section-title">Experience</h3>
            <p>
              <strong>{formData.experienceRole || "Role"}</strong> @ {formData.experienceCompany || "Company"} ({formData.experienceStart || "Start"} - {formData.experienceEnd || "End"})
            </p>
            <p>{formData.experienceDesc || "Responsibilities & achievements."}</p>
          </div>

          <div className="preview__section">
            <h3 className="preview__section-title">Education</h3>
            <p>
              {formData.educationDegree || "Degree"} - {formData.educationSchool || "Institution"} ({formData.educationYear || "Year"})
            </p>
          </div>

          <div className="preview__section">
            <h3 className="preview__section-title">Skills</h3>
            <ul className="preview__skills">
              {skillsList.length ? skillsList.map((s, i) => <li key={i} className="preview__skill">{s}</li>) : <li className="preview__skill">Add your skills</li>}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ResumeBuilder;
