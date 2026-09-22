'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SocialIcon } from '@/components/social-icon';
import { Button } from '@/components/ui/button';

const sections = [
  { id: 'about', label: 'About Me' }, { id: 'news', label: 'News' },
  { id: 'work-in-progress', label: 'Work in Progress' },
  { id: 'publications', label: 'Publications' }, { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Work Experience' }, { id: 'awards', label: 'Awards' },
  { id: 'service', label: 'Outreach' },
];
const graphRagTopic = 'Multi-Hop GraphRAG over Knowledge Graphs';
const research = [
  { id: 'udapose', name: 'UDAPose',
    title: 'UDAPose: Unsupervised Domain Adaptation for Low-Light Human Pose Estimation',
    authors: 'Haopeng Chen, Yihao Ai, Kabeen Kim, Robby T. Tan, Yixin Chen, Bo Wang', venue: 'CVPR 2026',
    figure: { number: 1, src: '/figures/udapose-figure1.png', width: 2084, height: 630, alt: 'UDAPose Figure 1: comparison of enhancement-based, image translation-based, and proposed low-light pose estimation approaches' },
    paper: 'https://arxiv.org/abs/2604.10485', code: 'https://github.com/Vision-and-Multimodal-Intelligence-Lab/UDAPose' },
  { id: 'confuse', name: 'ConFuse',
    title: 'ConFuse: Context-Aware Fusion of LLMs and GBDTs for Sleep Prediction from Lifelog Data',
    authors: 'Kabeen Kim*, Yena Kim*, Minjeong Seo*', authorNote: '* Equal contribution.', venue: 'ICTC 2026',
    figure: { number: 1, src: '/figures/confuse-figure1.png', width: 4000, height: 1668, alt: 'ConFuse Figure 1: overview of context-aware LLM and GBDT prediction fusion' },
    paper: '', code: 'https://github.com/kbannie/ConFuse' },
  { id: 'codu', name: 'CoDU',
    title: 'CoDU: Multi-Stage Approach for Complex Document Structure Understanding',
    authors: 'Kabeen Kim, Minhye Lee, Haein Seo, Jehyeok Rew', venue: 'KDBC 2025',
    figure: { number: 2, src: '/figures/codu-figure2.png', width: 1442, height: 603, alt: 'CoDU Figure 2: bounding box detection and refinement, OCR extraction, and reading order rearrangement pipeline' },
    paper: '', code: '' },
  { id: 'sptc', name: 'SPTC',
    title: 'SPTC (Single-Pass Tree Chain-of-Thought): An Efficient Prompting Scheme for Small Language Models',
    authors: 'Kabeen Kim, Jiye Park, Jehyeok Rew', venue: 'KCC 2025',
    figure: { number: 1, src: '/figures/sptc-figure1.png', width: 653, height: 358, alt: 'SPTC Figure 1: comparison of Tree-of-Thought on the left and SPTC on the right' },
    paper: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12318736', code: '' },
];
const experience = [
  { mark: 'ETRI', tone: 'etri', logo: '/logos/etri.png', organization: 'Electronics and Telecommunications Research Institute', role: 'Research Intern · Knowledge Graph & Multi-Hop GraphRAG', date: 'Jul 2026 – Aug 2026', location: 'Daejeon, South Korea' },
  { mark: 'BCG', tone: 'bcg', logo: '/logos/bcg.png', organization: 'Boston Consulting Group', role: 'Research Analyst Intern · Data Analysis for a Global Battery Manufacturer', date: 'Mar 2026 – May 2026', location: 'Seoul, South Korea' },
  { mark: 'DMKD', tone: 'dmkd', logo: '/logos/duksung-mark.png', organization: 'DMKD Lab · Duksung Women’s University', role: 'Undergraduate Researcher · LLM Reasoning & Document Understanding', advisor: { name: 'Prof. Jehyeok Rew', href: 'https://www.duksung.ac.kr/univ/majorInfo.do?miIdx=73&menuId=5788' }, date: 'Mar 2025 – Feb 2026', location: 'Seoul, South Korea' },
  { mark: 'CV', tone: 'cvlab', logo: '/logos/olemiss.png', organization: 'Vision and Multimodal Intelligence Lab · University of Mississippi', role: 'Undergraduate Researcher · Low-Light Human Pose Estimation', advisor: { name: 'Prof. Hawk Wang', href: 'https://olemiss.edu/profiles/hbw' }, date: 'Aug 2024 – Feb 2025', location: 'Mississippi, United States' },
];

function AuthorLine({ value }: { value: string }) {
  const parts = value.split('Kabeen Kim');
  return <p className="paper-authors">{parts[0]}<strong>Kabeen Kim</strong>{parts[1]}</p>;
}
export default function Home() {
  const [active, setActive] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const update = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) { setActive('service'); return; }
      let current = 'about';
      for (const section of sections) {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= 145) current = section.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', update, { passive: true }); update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><div className="header-inner">
      <a className="site-title" href="#about" onClick={() => setMenuOpen(false)}>Homepage</a>
      <Button className="menu-toggle" variant="ghost" size="icon" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      <nav id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        {sections.map(section => <a key={section.id} href={'#' + section.id} aria-current={active === section.id ? 'location' : undefined} onClick={() => { setActive(section.id); setMenuOpen(false); }}>{section.label}</a>)}
      </nav>
    </div></header>
    <div className="page-layout">
      <aside className="profile" aria-label="Profile">
        <img className="profile-avatar" src="/profile.jpg" width="175" height="175" alt="Portrait of Kabeen Kim" />
        <div className="profile-text">
          <h1>Kabeen Kim</h1>
          <p className="profile-role">Undergraduate at<br />Duksung Women’s University</p>
          <div className="profile-meta"><SocialIcon name="location" /><span>Seoul, South Korea</span></div>
          <div className="contact-links" aria-label="Contact and profiles">
            <a className="social-link" href="mailto:sunk2205@duksung.ac.kr" aria-label="Email" title="Email"><SocialIcon name="email" /><span>Email</span></a>
            <a className="social-link social-link-linkedin" href="https://www.linkedin.com/in/kabeen-kim-6806b8221/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><SocialIcon name="linkedin" /><span>LinkedIn</span></a>
            <a className="social-link social-link-github" href="https://github.com/kbannie" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><SocialIcon name="github" /><span>GitHub</span></a>
            <a className="social-link" href="https://scholar.google.com/citations?user=_GZ1nzIAAAAJ&hl=ko" target="_blank" rel="noreferrer" aria-label="Google Scholar" title="Google Scholar"><SocialIcon name="scholar" /><span>Google Scholar</span></a>
            <a className="social-link" href="/KabeenKim_CV.pdf?v=7862d68cfe0f" target="_blank" rel="noreferrer" aria-label="Curriculum Vitae (PDF)" title="CV"><SocialIcon name="cv" /><span>CV</span></a>
          </div>
        </div>
      </aside>
      <main id="main-content">
        <section id="about" className="content-section about-section" aria-labelledby="about-title">
          <h2 id="about-title" className="sr-only">About Me</h2>
          <p>I am an undergraduate studying Computer Engineering and Information Statistics at <a href="https://www.duksung.ac.kr/" target="_blank" rel="noreferrer">Duksung Women’s University</a>, with expected graduation in February 2027. Most recently, I was a research intern at <strong>ETRI</strong>, working on knowledge graphs and multi-hop GraphRAG. Previously, I conducted research on LLM reasoning and document understanding at <strong>DMKD Lab</strong> under the supervision of <a href="https://www.duksung.ac.kr/univ/majorInfo.do?miIdx=73&menuId=5788" target="_blank" rel="noreferrer">Prof. Jehyeok Rew</a>, and on low-light human pose estimation in the <strong>Vision and Multimodal Intelligence Lab</strong> at the <a href="https://olemiss.edu/" target="_blank" rel="noreferrer">University of Mississippi</a> under the supervision of <a href="https://olemiss.edu/profiles/hbw" target="_blank" rel="noreferrer">Prof. Hawk Wang</a>. I also worked at <strong>BCG</strong>, analyzing data for a global battery manufacturer. Here is my <a href="/KabeenKim_CV.pdf?v=7862d68cfe0f" target="_blank" rel="noreferrer">CV</a>.</p>
          <p>My research spans document understanding, LLM reasoning, and retrieval-augmented generation. Building on my work in document structure analysis (CoDU) and efficient prompting (SPTC), my recent work on <a href="#work-in-progress">multi-hop GraphRAG over knowledge graphs at ETRI</a> focuses on retrieving and connecting evidence for multi-hop question answering.</p>
        </section>
        <section id="news" className="content-section" aria-labelledby="news-title">
          <h2 id="news-title">News</h2>
          <div className="news-scroll" role="region" aria-labelledby="news-title" aria-describedby="news-scroll-hint" tabIndex={0}>
            <ul className="news-list">
              <li><time dateTime="2026-09">[Sep 2026]</time> <span aria-hidden="true">🎉</span> Our paper <a href="#publications">ConFuse</a> was accepted to <strong>ICTC 2026</strong>.</li>
              <li><time dateTime="2026-07">[Jul 2026]</time> I joined <a href="#experience">ETRI</a> as a research intern, working on <a href="#work-in-progress">multi-hop GraphRAG over knowledge graphs</a>.</li>
              <li><time dateTime="2026-03">[Mar 2026]</time> I joined <a href="#experience">BCG</a> as a Research Analyst Intern, analyzing data for a global battery manufacturer.</li>
              <li><time dateTime="2026-02">[Feb 2026]</time> <span aria-hidden="true">🎉</span> Our paper <a href="https://arxiv.org/abs/2604.10485" target="_blank" rel="noreferrer">UDAPose</a> was accepted to <strong>CVPR 2026</strong>.</li>
              <li><time dateTime="2026-01">[Jan 2026]</time> I joined <strong>Tobigs</strong> as an AI member of the 25th cohort.</li>
              <li><time dateTime="2025-10">[Oct 2025]</time> <span aria-hidden="true">🎉</span> Our paper <a href="#publications">CoDU</a> was accepted to <strong>KDBC 2025</strong>.</li>
              <li><time dateTime="2025-10">[Oct 2025]</time> <span aria-hidden="true">🏆</span> Our team placed <strong>3rd out of 210 teams</strong> in the <a href="#awards">Samsung AI Challenge</a> — Visually-Rich Document Understanding track.</li>
              <li><time dateTime="2025-05">[May 2025]</time> <span aria-hidden="true">🎉</span> Our paper <a href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12318736" target="_blank" rel="noreferrer">SPTC</a> was accepted to <strong>KCC 2025</strong>.</li>
              <li><time dateTime="2025-03">[Mar 2025]</time> I joined <a href="#experience">DMKD Lab</a> at Duksung Women’s University as an undergraduate researcher, working on LLM reasoning and document understanding with <a href="https://www.duksung.ac.kr/univ/majorInfo.do?miIdx=73&menuId=5788" target="_blank" rel="noreferrer">Prof. Jehyeok Rew</a>.</li>
              <li><time dateTime="2025-03">[Mar 2025]</time> I began leading a four-member team for <strong>Duksung Global Challenger</strong>, a university-funded international project.</li>
              <li><time dateTime="2024-12">[Dec 2024]</time> I completed my exchange semester at the <a href="https://olemiss.edu/" target="_blank" rel="noreferrer">University of Mississippi</a>.</li>
              <li><time dateTime="2024-08">[Aug 2024]</time> I started my exchange semester at the <a href="https://olemiss.edu/" target="_blank" rel="noreferrer">University of Mississippi</a> and joined the <strong>Vision and Multimodal Intelligence Lab</strong> to work on low-light human pose estimation with <a href="https://olemiss.edu/profiles/hbw" target="_blank" rel="noreferrer">Prof. Hawk Wang</a>.</li>
              <li><time dateTime="2024">[2024]</time> I received the <a href="#awards">Mirae Asset Overseas Exchange Scholarship</a>.</li>
              <li><time dateTime="2024">[2024]</time> <span aria-hidden="true">🏆</span> I received an <strong>Excellence Award</strong> in the <a href="#awards">TAVE 13th Data Analysis Project</a>.</li>
              <li><time dateTime="2024">[2024]</time> <span aria-hidden="true">🏆</span> I received <strong>2nd Prize</strong> in the <a href="#awards">DS Global Vision Makers Innovation Idea Competition</a>.</li>
              <li><time dateTime="2023-03">[Mar 2023]</time> I joined <a href="#service">CJ UNIT’s 8th cohort</a> as a volunteer coding instructor for middle-school students.</li>
              <li><strong>[2021–2022]</strong> I received three <a href="#awards">Academic Excellence Scholarships</a> from Duksung Women’s University.</li>
              <li><time dateTime="2021-03">[Mar 2021]</time> I began my undergraduate studies at <a href="https://www.duksung.ac.kr/" target="_blank" rel="noreferrer">Duksung Women’s University</a>.</li>
            </ul>
          </div>
          <p id="news-scroll-hint" className="news-scroll-hint">Scroll for earlier updates.</p>
        </section>
        <section id="work-in-progress" className="content-section" aria-labelledby="work-in-progress-title">
          <h2 id="work-in-progress-title">Work in Progress</h2>
          <article className="ongoing-research">
            <h3>{graphRagTopic}</h3>
            <p>Developed path-preserving beam search and evidence reranking for multi-hop question answering during my research internship at <a href="#experience">ETRI</a>.</p>
          </article>
        </section>
        <section id="publications" className="content-section" aria-labelledby="publications-title">
          <h2 id="publications-title">Publications</h2>
          <div className="research-list">{research.map(project => <article className="research-row" key={project.id}>
            <a className="paper-thumbnail" href={project.figure.src} target="_blank" rel="noreferrer" aria-label={'View ' + project.name + ' Figure ' + project.figure.number + ' at full size (opens in a new tab)'} title={'View Figure ' + project.figure.number + ' at full size'}><img src={project.figure.src} width={project.figure.width} height={project.figure.height} loading="lazy" alt={project.figure.alt} /></a>
            <div className="research-copy">
              <h3>{project.title} <span className="paper-links">{project.paper && <a href={project.paper} target="_blank" rel="noreferrer">[paper]</a>}{project.code && <a href={project.code} target="_blank" rel="noreferrer">[code]</a>}</span></h3>
              <AuthorLine value={project.authors} />{project.authorNote && <p className="paper-author-note">{project.authorNote}</p>}<p className="paper-venue"><em>{project.venue}</em></p>
            </div>
          </article>)}</div>
        </section>
        <section id="education" className="content-section" aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <ul className="education-list">
            <li><strong>2021.03 – 2027.02 (expected)</strong>, B.S. in Computer Engineering and Information Statistics, <a href="https://www.duksung.ac.kr/" target="_blank" rel="noreferrer">Duksung Women’s University</a>. <span className="entry-meta">GPA: 4.15 / 4.5.</span></li>
            <li><strong>2024.08 – 2024.12</strong>, Exchange Student in Computer Science, <a href="https://olemiss.edu/" target="_blank" rel="noreferrer">University of Mississippi</a>.</li>
          </ul>
        </section>
        <section id="experience" className="content-section" aria-labelledby="experience-title">
          <h2 id="experience-title">Work Experience</h2>
          <div className="experience-list">{experience.map(item => <article className="experience-item" key={item.mark}>
            <div className={'organization-logo ' + item.tone}><img src={item.logo} alt={item.mark === 'DMKD' ? 'Duksung Women’s University emblem' : item.mark === 'CV' ? 'University of Mississippi' : item.mark} width="130" height="80" loading="lazy" /></div>
            <div><h3>{item.organization}</h3><p className="job-title">{item.role} <span className="job-location">| {item.location}</span></p>{item.advisor && <p className="job-title">Advisor: <a href={item.advisor.href} target="_blank" rel="noreferrer">{item.advisor.name}</a></p>}<p className="experience-date">{item.date}</p>
            </div>
          </article>)}</div>
        </section>
        <section id="awards" className="content-section" aria-labelledby="awards-title">
          <h2 id="awards-title">Awards &amp; Scholarships</h2>
          <ul className="awards-list">
            <li><strong>2025.10:</strong> <span aria-hidden="true">🏆</span> <strong>3rd Place, Samsung AI Challenge</strong> — Visually-Rich Document Understanding track (210 teams).</li>
            <li><strong>2024:</strong> <strong>Mirae Asset Overseas Exchange Scholarship</strong>, Mirae Asset Park Hyeon Joo Foundation.</li>
            <li><strong>2024:</strong> <span aria-hidden="true">🏆</span> <strong>Excellence Award, TAVE 13th Data Analysis Project</strong>.</li>
            <li><strong>2024:</strong> <span aria-hidden="true">🏆</span> <strong>2nd Prize, DS Global Vision Makers Innovation Idea Competition</strong>.</li>
            <li><strong>2021–2022:</strong> <strong>Academic Excellence Scholarship</strong>, Duksung Women’s University (3 awards).</li>
          </ul>
        </section>
        <section id="service" className="content-section service-section" aria-labelledby="service-title">
          <h2 id="service-title">Outreach</h2>
          <ul className="service-list"><li><strong>Volunteer Coding Instructor, CJ UNIT (8th cohort)</strong> · Mar–Jun 2023. Developed software curricula and delivered remote coding instruction, including LEGO-based programming activities, to local middle-school students.</li></ul>
        </section>
        <footer className="site-footer"><span>© 2026 Kabeen Kim.</span><a href="#about">Back to top ↑</a></footer>
      </main>
    </div>
  </>;
}
