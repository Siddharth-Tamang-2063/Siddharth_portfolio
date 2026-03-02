import { useState } from "react";
import useReveal from "../hooks/useReveal";
import Mag from "../ui/Mag";

const SOCIALS = [
  { label: "GitHub",   icon: "GH", href: "https://github.com/" },
  { label: "LinkedIn", icon: "LI", href: "https://linkedin.com/" },
  { label: "Email",    icon: "@",  href: "https://mail.google.com/mail/?view=cm&to=siddharth20630901@gmail.com" },
];

const Contact = () => {
  useReveal();

  const [form, setForm]       = useState({ name: "", email: "", msg: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.msg) return;

    setLoading(true);
    setError("");

    try {
     const res = await fetch("http://localhost:5000/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name: form.name, email: form.email, msg: form.msg }),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", msg: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "140px 40px 100px", background: "var(--white)" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* Heading */}
        <div className="sr" style={{ textAlign: "center", marginBottom: "72px" }}>
          <span className="slabel">Get In Touch</span>
          <h2
            className="syne"
            style={{ fontSize: "clamp(36px, 7vw, 96px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 0.88, marginTop: "16px" }}
          >
            Let's Build
            <br />
            <span style={{ color: "var(--muted)", fontStyle: "italic", fontWeight: 400 }}>Together.</span>
          </h2>
          <div style={{ marginTop: "28px", display: "inline-flex" }}>
            <span className="lbadge">
              <span className="ldot" />
              Open for Freelance — Nepal &amp; Global
            </span>
          </div>
        </div>

        {/* Form card */}
        <div className="fcard srs" style={{ padding: "clamp(28px, 5vw, 52px)" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "44px 0" }}>
              <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎉</div>
              <div className="syne" style={{ fontSize: "26px", fontWeight: 800, marginBottom: "8px" }}>Sent!</div>
              <p style={{ color: "var(--muted)" }}>
                I'll reply within 24 hours. Let's create something great.
              </p>
            </div>
          ) : (
            <>
              {/* Name + Email row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                {[
                  { label: "Name",  placeholder: "Your name",       key: "name",  type: "text"  },
                  { label: "Email", placeholder: "you@example.com", key: "email", type: "email" },
                ].map(({ label, placeholder, key, type }) => (
                  <div key={key}>
                    <label
                      className="syne"
                      style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "8px" }}
                    >
                      {label}
                    </label>
                    <input
                      className="finput"
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={update(key)}
                    />
                  </div>
                ))}
              </div>

              {/* Message */}
              <div style={{ marginBottom: "26px" }}>
                <label
                  className="syne"
                  style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "8px" }}
                >
                  Message
                </label>
                <textarea
                  className="finput"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.msg}
                  onChange={update("msg")}
                  style={{ resize: "vertical" }}
                />
              </div>

              {/* Error */}
              {error && (
                <p style={{ color: "red", fontSize: "13px", marginBottom: "12px", fontFamily: "'DM Mono', monospace" }}>
                  {error}
                </p>
              )}

              {/* Submit */}
              <Mag s={0.15}>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bink"
                  style={{ width: "100%", justifyContent: "center", fontSize: "15px", borderRadius: "14px", padding: "17px", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </Mag>
            </>
          )}
        </div>

        {/* Social links */}
        <div
          className="sr"
          data-d=".2"
          style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "36px", flexWrap: "wrap" }}
        >
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "9px",
                padding:        "12px 22px",
                borderRadius:   100,
                background:     "var(--cream)",
                border:         "1px solid var(--border)",
                color:          "var(--muted)",
                textDecoration: "none",
                fontSize:       "14px",
                fontFamily:     "'Syne', sans-serif",
                fontWeight:     600,
                cursor:         "pointer",
                transition:     "all .35s cubic-bezier(.34,1.56,.64,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--ink)";
                e.currentTarget.style.color      = "var(--white)";
                e.currentTarget.style.transform  = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.color      = "";
                e.currentTarget.style.transform  = "";
              }}
            >
              <span className="dmono" style={{ fontSize: "11px" }}>{social.icon}</span>
              {social.label}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Contact;