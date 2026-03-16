import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, Code, ExternalLink } from 'lucide-react';
import { Routes, Route, Link } from "react-router-dom";
import './Landingpage.css'; // WICHTIG: CSS importieren
import NavBar from '../../components/NavBar';
import ToDoList from "../../projects/project1/ToDoList";


const Portfolio = () => {
  // Typing Effekt State
  const [text, setText] = useState('');
  const fullText = "initializing portfolio...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="portfolio-container" style={{ paddingTop: '64px' }}>
          {/* Scanline Overlay */}
          <div className="scanline"></div>
          <NavBar />
          {/* --- HOME SECTION --- */}
          <section className="section" id="home">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">bash — 80x24</span>
              </div>
              <div className="terminal-body">
                 <h2 className="section-title">
                  <span className="accent">&gt;</span> welcome.dir
                  <span className="separator-line"></span>
                </h2>
                <h2>Willkommen auf meinem Portfolio</h2>
                <p>„Moin aus dem schönen Norden. Ich bin Michelle. Nach meiner Zeit im IT-Support habe ich meine Leidenschaft für das Coden entdeckt. Jetzt möchte ich diese Leidenschaft zu meinem Beruf machen.“</p>
              </div>
            </div>
          </section>
          {/* --- ABOUT SECTION --- */}
          <section className="section" id="about">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">bash — 80x24</span>
              </div>
              <div className="terminal-body">
                      <h2 className="section-title">
                  <span className="accent">&gt;</span> about.sh
                  <span className="separator-line"></span>
                </h2>
                {/* <p className="output-line">&gt; loading skills...</p>
                <p className="output-line">&gt; status: <span className="status-badge">ready_to_hire</span></p> */}
                <h1 className="hero-title">[ Michelle B. Anglet ]</h1>
                <h2 className="hero-subtitle">Junior Web & Software Developer</h2>
                <div className="tech-tags">
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">React</span>
                  <span className="tag">MongoDB</span>
                </div>
                <div className="hero-buttons">
                  <button className="btn btn-outline">
                    <Github size={18} /> GitHub
                  </button>
                  <button className="btn btn-filled">
                    <Mail size={18} /> Kontakt
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* --- PROJECTS SECTION --- */}
          <section className="section" id="projects">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">bash — 80x24</span>
              </div>
              <div className="terminal-body">
                <h2 className="section-title">
                  <span className="accent">&gt;</span> projects.dir
                  <span className="separator-line"></span>
                </h2>
                <div className="projects-grid">
                  {/* Projektdaten */}
                  {[
                    { title: "Project Alpha", desc: "Full-Stack App mit React/Node.", stack: ["React", "Node.js", "MongoDB"] },
                    { title: "Project Beta", desc: "Portfolio im Terminal-Look.", stack: ["HTML", "CSS", "JS"] },
                    { title: "Project Gamma", desc: "REST API & Auth System.", stack: ["Express", "JWT", "Jest"] }
                  ].map((project, i) => (
                    <div key={i} className="project-card">
                      <div className="placeholder-image">
                        <span className="placeholder-text">[ SCREENSHOT_PLACEHOLDER ]</span>
                        <div className="cross-line one"></div>
                        <div className="cross-line two"></div>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.desc}</p>
                      <div className="card-tags">
                        {project.stack.map(tech => (
                          <span key={tech} className="mini-tag">{tech}</span>
                        ))}
                      </div>
                      <div className="card-links">
                        <a href="#"><Code size={14} /> Code</a>
                        {/* Beispiel für Demo-Link: */}
                        <Link to="/todo"><ExternalLink size={14} /> Demo</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* --- CONTACT SECTION --- */}
          <section className="section" id="contact">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">bash — 80x24</span>
              </div>
              <div className="terminal-body">
                <h2 className="section-title">
                  <span className="accent">&gt;</span> contact.sh
                  <span className="separator-line"></span>
                </h2>
                <div className="contact-grid">
                  {/* Linke Seite: Formular */}
                  <div className="contact-form-wrapper">
                    <div className="file-label">send_message.sh</div>
                    <form className="terminal-form">
                      <div className="form-group">
                        <label>$ echo $NAME</label>
                        <input type="text" placeholder="Dein Name..." />
                      </div>
                      <div className="form-group">
                        <label>$ echo $EMAIL</label>
                        <input type="email" placeholder="deine@email.de..." />
                      </div>
                      <div className="form-group">
                        <label>$ cat message.txt</label>
                        <textarea rows="4" placeholder="Deine Nachricht..."></textarea>
                      </div>
                      <button type="submit" className="btn btn-outline full-width">
                        &gt; ./send_message.sh
                      </button>
                    </form>
                  </div>
                  {/* Rechte Seite: Info */}
                  <div className="contact-info">
                    <div className="info-box">
                      <h3 className="file-header">$ cat contact_info.txt</h3>
                      <ul>
                        <li><Github size={18} /> github.com/user</li>
                        <li><Linkedin size={18} /> linkedin.com/in/user</li>
                        <li><Mail size={18} /> mail@example.com</li>
                        <li><MapPin size={18} /> Elmshorn, DE</li>
                      </ul>
                    </div>
                    <div className="system-status">
                      <p><span className="accent">$</span> uptime</p>
                      <p className="output">&gt; Verfügbar für neue Projekte</p>
                      <p><span className="accent">$</span> whoami</p>
                      <p className="output">&gt; Junior Web Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="footer">
            <p>Built with React & CSS. © 2026 Protocol Blackout Design.</p>
          </footer>
        </div>
      } />
      <Route path="/todo" element={<ToDoList />} />
    </Routes>
  )
};

export default Portfolio;
