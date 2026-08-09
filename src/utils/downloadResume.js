import { resumeData } from './resumeData';

export const downloadResume = () => {
  // Create an ATS formatted printable document in a new window or trigger PDF generation
  const resumeWindow = window.open('', '_blank');
  if (!resumeWindow) {
    alert("Please allow pop-ups to download/print the resume.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${resumeData.name} - Resume</title>
      <style>
        @page { size: letter; margin: 15mm; }
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: #111;
          line-height: 1.45;
          margin: 0;
          padding: 20px;
          font-size: 11pt;
        }
        h1 {
          font-size: 22pt;
          text-align: center;
          margin: 0 0 4px 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .subtitle {
          text-align: center;
          font-size: 10pt;
          margin-bottom: 15px;
          color: #333;
        }
        .subtitle a {
          color: #0044cc;
          text-decoration: none;
          margin: 0 4px;
        }
        h2 {
          font-size: 12pt;
          text-transform: uppercase;
          border-bottom: 1.5px solid #222;
          padding-bottom: 2px;
          margin: 14px 0 6px 0;
          letter-spacing: 0.5px;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          margin-top: 6px;
        }
        .item-sub {
          display: flex;
          justify-content: space-between;
          font-style: italic;
          color: #444;
          margin-bottom: 4px;
        }
        ul {
          margin: 4px 0 8px 18px;
          padding: 0;
        }
        li {
          margin-bottom: 3px;
          text-align: justify;
        }
        .skills-section p {
          margin: 3px 0;
          font-size: 10.5pt;
        }
        .print-banner {
          background: #f0fdf4;
          border: 1px solid #86efac;
          color: #166534;
          padding: 10px 14px;
          border-radius: 6px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .print-btn {
          background: #16a34a;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        @media print {
          .print-banner { display: none; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="print-banner">
        <span>📄 <strong>${resumeData.name} Resume Ready</strong> - Click "Print / Save as PDF" or press Ctrl+P / Cmd+P to save as PDF.</span>
        <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
      </div>

      <h1>${resumeData.name}</h1>
      <div class="subtitle">
        ${resumeData.location} | 📞 ${resumeData.phone} | ✉️ <a href="mailto:${resumeData.email}">${resumeData.email}</a> | 
        <a href="${resumeData.linkedin}">LinkedIn</a> | <a href="${resumeData.github}">GitHub</a>
      </div>

      <h2>Education</h2>
      <div class="item-header">
        <span>${resumeData.education.institution}</span>
        <span>${resumeData.education.duration}</span>
      </div>
      <div class="item-sub">
        <span>${resumeData.education.degree}</span>
        <span>${resumeData.education.location}</span>
      </div>

      <h2>Technical Skills</h2>
      <div class="skills-section">
        <p><strong>Languages:</strong> ${resumeData.skills.languages.join(', ')}</p>
        <p><strong>Backend Development:</strong> ${resumeData.skills.backend.join(', ')}</p>
        <p><strong>Databases:</strong> ${resumeData.skills.databases.join(', ')}</p>
        <p><strong>Tools:</strong> ${resumeData.skills.tools.join(', ')}</p>
        <p><strong>Libraries & Frameworks:</strong> ${resumeData.skills.libraries.join(', ')}</p>
        <p><strong>Concepts:</strong> ${resumeData.skills.concepts.join(', ')}</p>
      </div>

      <h2>Experience</h2>
      ${resumeData.experience.map(exp => `
        <div class="item-header">
          <span>${exp.role} — ${exp.company} ${exp.client ? `(${exp.client})` : ''}</span>
          <span>${exp.period}</span>
        </div>
        <div class="item-sub">
          <span>${exp.location}</span>
        </div>
        <ul>
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      `).join('')}

      <h2>Technical Projects</h2>
      ${resumeData.projects.map(proj => `
        <div class="item-header">
          <span>${proj.title} ${proj.github ? `(<a href="${proj.github}">GitHub</a>)` : ''}</span>
          <span>${proj.tech}</span>
        </div>
        <ul>
          ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      `).join('')}

      <script>
        // Trigger print dialog automatically after document renders
        setTimeout(() => {
          window.print();
        }, 600);
      </script>
    </body>
    </html>
  `;

  resumeWindow.document.open();
  resumeWindow.document.write(htmlContent);
  resumeWindow.document.close();
};
