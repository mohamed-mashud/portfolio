import {
  profile,
  about,
  education,
  experience,
  projects,
  skills,
  achievements,
  workshops,
  publications,
} from "../src/data/portfolio.js";

export type Chunk = { id: string; text: string };

export function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile",
    text: [
      `Name: ${profile.name}.`,
      `Role: ${profile.role} at ${profile.company}.`,
      `Based in ${profile.location} (home base ${profile.homeBase}).`,
      `Email: ${profile.email}. Phone: ${profile.phone}.`,
      `GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}.`,
      profile.available ? "Currently open to new opportunities." : "",
      `Tagline: ${profile.tagline.join(" ")}`,
    ]
      .filter(Boolean)
      .join(" "),
  });

  chunks.push({
    id: "about",
    text: `About ${profile.name}: ${about.paragraphs.join(" ")} Quick facts: ${about.facts
      .map((f) => `${f.label}: ${f.value}`)
      .join("; ")}.`,
  });

  education.forEach((edu, i) => {
    chunks.push({
      id: `education-${i}`,
      text: `Education: ${edu.degree} at ${edu.institute} (${edu.period}), score ${edu.score}.`,
    });
  });

  experience.forEach((exp, i) => {
    chunks.push({
      id: `experience-${i}`,
      text: `Experience: ${exp.role} at ${exp.company}, ${exp.location} (${exp.period})${
        exp.current ? " — current role" : ""
      }. Responsibilities: ${exp.bullets.join(" ")} Tech stack: ${exp.stack.join(", ")}.`,
    });
  });

  projects.forEach((project, i) => {
    chunks.push({
      id: `project-${i}`,
      text: `Project "${project.name}" (${project.year}): ${project.blurb} ${project.bullets.join(
        " "
      )} Tech stack: ${project.stack.join(", ")}.${
        project.featured ? " This is a featured project." : ""
      }`,
    });
  });

  chunks.push({
    id: "skills",
    text: `Skills — ${skills
      .map((group) => `${group.label}: ${group.items.join(", ")}`)
      .join("; ")}.`,
  });

  chunks.push({
    id: "achievements",
    text: `Achievements and awards: ${achievements
      .map((a) => `${a.title} (${a.result})`)
      .join("; ")}.`,
  });

  if (workshops.length) {
    chunks.push({
      id: "workshops",
      text: `Workshops attended: ${workshops.join("; ")}.`,
    });
  }

  publications.forEach((pub, i) => {
    chunks.push({
      id: `publication-${i}`,
      text: `Publication: "${pub.title}" (${pub.venue}). ${pub.summary}`,
    });
  });

  return chunks;
}
