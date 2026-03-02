import { useRef } from "react";

/**
 * Mag — Magnetic Button Wrapper
 * Translates children toward the cursor on hover using spring-like physics.
 *
 * Props:
 *   children  — any React node
 *   s         — strength multiplier (default 0.35)
 */
const Mag = ({ children, s = 0.35 }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * s;
    const y = (e.clientY - rect.top  - rect.height / 2) * s;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-block",
        transition: "transform .4s cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      {children}
    </div>
  );
};

export default Mag;