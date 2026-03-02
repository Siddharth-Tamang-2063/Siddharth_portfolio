const SKILLS = [
  "React", "Tailwind CSS", "JavaScript", "Node.js", "MongoDB",
  "GSAP", "Framer Motion", "Figma", "REST APIs", "Git", "Performance", "UI/UX",
];

/**
 * Marquee — Infinite scrolling ticker strip
 * Duplicates items to create a seamless loop.
 */
const Marquee = () => {
  // Double the items for seamless infinite scroll
  const items = [...SKILLS, ...SKILLS];

  return (
    <div
      style={{
        borderTop:    "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background:   "var(--white)",
        overflow:     "hidden",
        padding:      "16px 0",
      }}
    >
      <div className="mtrack">
        {items.map((item, i) => (
          <span key={i} className="mitem">
            {item}
            <span className="msep" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;