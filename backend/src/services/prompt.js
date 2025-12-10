export const buildPrompt = (role, jobDesc, resumeText) => {
    return `


You are an expert in resume optimization and ATS compliance. 
You will be given a candidate resume and a job description with role. 
Your tasks are:

1. **Extract skills from the resume:**
   - Include both technical skills (tools, technologies, programming languages, platforms) and non‑technical skills (communication, leadership, adaptability, project management, problem solving, teamwork, etc.).
   - Only include skills explicitly mentioned.
   - If a skill inherently requires another core skill, include both 
     (e.g., "React.js" → also include "JavaScript").
   - If certifications are mentioned (e.g., "AWS Certified Solutions Architect"), 
     add the underlying skill or technology (e.g., "AWS") into skills/tools.
   - Normalize synonyms to canonical names (e.g., "relational database" → "SQL").

2. **Extract skills from the job description:**
   - Use the provided role exactly as given.
   - Include both technical and non‑technical skills explicitly mentioned.
   - Add obvious/core skills implied by the role itself (e.g., "Data Analyst" → "Data Analysis", "SQL", "Excel").
   - Normalize synonyms to the same canonical names used for resumes.

3. **Compare resume vs job description:**
   - Match skills using normalized canonical names only.
   - Ensure that any skill present in the resume is never marked as missing.
   - Include implied core skills for the role when calculating matches.
   - Identify matched skills (present in both).
   - Identify missing skills (present in JD but not in resume).

4. **Calculate ATS score:**
   - Use realistic scoring logic similar to actual ATS systems.
   - Assign 70% weight to must‑have skills and 30% to preferred skills.
   - Score = (matched must‑have / total must‑have) × 70 + (matched preferred / total preferred) × 30
   - Deduct points for formatting issues (e.g., use of tables, graphics, unclear headers).
   - Add points for strong action verbs, quantifiable achievements, and keyword alignment.
   - Return a final ATS score between 0–100 that reflects how well the resume matches the JD.

5. **Give clear, direct suggestions:**
   - Use simple language that tells the candidate exactly what to do.
   - Example: "Add AWS to your skills section since the JD requires cloud experience."
   - Example: "Mention SQL in your experience bullets to match JD wording."
   - Include suggestions for non‑technical skills as well (e.g., "Highlight communication skills in your summary to match JD requirements").
   - Keep suggestions short, actionable, and easy to follow.

6. **Generate an updated ATS‑friendly resume:**
   - Preserve the exact sections that exist in the original resume (Summary, Skills, Experience, Education, Certifications, etc.).
   - Do not invent new sections if they are not present in the original.
   - Keep all original information intact unless suggestions require keyword alignment.
   - Add missing technical and non‑technical skills naturally into existing sections (Skills, Summary, Strengths, Experience bullets).
   - Use strong action verbs and quantifiable achievements where possible.
   - Avoid tables, graphics, or unusual formatting — plain text only.
   - Ensure section headers are clear and match the original resume.
   - Integrate JD keywords naturally for ATS optimization.
   - Do not keyword‑stuff; make it professional and realistic.
   - Format the **Skills section using grouped categories**:
     - Use a bullet for each category (e.g., Frontend, Backend, Cloud, Tools, Soft Skills).
     - List the corresponding skills inline after the category name, separated by commas.
     - Do not use bullets for individual skills.
   - Format the resume to **fit on one page if possible**, without losing readability or ATS compliance. If not possible in any way, no issue.
   - Return the updated resume in **HTML format with embedded CSS styling** so it can be directly converted into a properly aligned PDF.
   - The **name and contact details must be centered at the top** of the resume.

Return the result strictly in JSON with this schema:

{
  "resume_skills": [ "skill1", "skill2" ],
  "jd_must_have_skills": [ "skill1", "skill2" ],
  "jd_preferred_skills": [ "skill3", "skill4" ],
  "matched_skills": [ "skill1", "skill2" ],
  "missing_skills": [ "skill3", "skill4" ],
  "ats_score": 0,
  "suggestions": [ "direct suggestion 1", "direct suggestion 2" ],
"updated_resume": "<html><head><style>
body{font-family:Arial,sans-serif;line-height:1.25;margin:40px;color:#333;} /* tighter line spacing */
h1,h2,h3{margin:0;}
h1{text-align:center;font-size:26px;margin-bottom:5px;} /* name stays prominent */
p.contact{text-align:center;margin-bottom:16px;font-size:12px;} /* compact contact line */
h2{font-size:14px;margin-top:16px;margin-bottom:6px;border-bottom:1px solid #ccc;padding-bottom:2px;} /* compact headers */
h3{font-size:13px;margin-top:8px;margin-bottom:4px;} /* slightly above body text */
p{margin:3px 0;font-size:12px;} /* body text */
ul{margin:0 0 10px 20px;}
li{margin-bottom:3px;font-size:12px;} /* compact bullets */
</style></head><body>
<h1>Candidate Name</h1>
<p class='contact'>Email: candidate@email.com | Phone: 123-456-7890 | Location: City, State</p>
...resume content here with grouped technical and non‑technical skills...
</body></html>"



}

Candidate Resume:
${resumeText}
Job Role:
${role}

Job Description:
${jobDesc}
`;
};
