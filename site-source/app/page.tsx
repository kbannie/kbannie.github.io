'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SocialIcon } from '@/components/social-icon';
import { Button } from '@/components/ui/button';

const sections = [
  { id: 'about', label: 'About' }, { id: 'news', label: 'News' },
  { id: 'work-in-progress', label: 'Research' }, { id: 'publications', label: 'Publications' },
  { id: 'experience', label: 'Experience' }, { id: 'service', label: 'Beyond Research' },
];
const graphRagTopic = 'Where does evidence get lost in multi-hop retrieval?';
const research = [
  { id: 'udapose', name: 'UDAPose',
    title: 'UDAPose: Unsupervised Domain Adaptation for Low-Light Human Pose Estimation',
    authors: 'Haopeng Chen, Yihao Ai, Kabeen Kim, Robby T. Tan, Yixin Chen, Bo Wang', venue: 'CVPR 2026', takeaway: 'Adapting pose estimation to low-light scenes where people blend into the background.',
    figure: { number: 1, src: '/figures/udapose-figure1.png', width: 2084, height: 630, alt: 'UDAPose Figure 1: comparison of enhancement-based, image translation-based, and proposed low-light pose estimation approaches' },
    paper: 'https://arxiv.org/abs/2604.10485', code: 'https://github.com/Vision-and-Multimodal-Intelligence-Lab/UDAPose' },
  { id: 'confuse', name: 'ConFuse',
    title: 'ConFuse: Context-Aware Fusion of LLMs and GBDTs for Sleep Prediction from Lifelog Data',
    authors: 'Kabeen Kim*†, Yena Kim*, Minjeong Seo*', authorNote: '* Equal contribution. † Presenter.', venue: 'ICTC 2026 · Poster', takeaway: 'Combining GBDTs and a fine-tuned LLM for sleep prediction, with fusion weights guided by input quality.',
    figure: { number: 1, src: '/figures/confuse-figure1.png', width: 4000, height: 1668, alt: 'ConFuse Figure 1: overview of context-aware LLM and GBDT prediction fusion' },
    paper: '', code: 'https://github.com/kbannie/ConFuse' },
  { id: 'codu', name: 'CoDU',
    title: 'CoDU: Multi-Stage Approach for Complex Document Structure Understanding',
    authors: 'Kabeen Kim†, Minhye Lee, Haein Seo, Jehyeok Rew', authorNote: '† Presenter.', venue: 'KDBC 2025 · Oral', takeaway: 'Turning complex documents into structured content through layout detection, OCR, and reading-order analysis.',
    figure: { number: 2, src: '/figures/codu-figure2.png', width: 1442, height: 603, alt: 'CoDU Figure 2: bounding box detection and refinement, OCR extraction, and reading order rearrangement pipeline' },
    paper: '', code: 'https://github.com/kbannie/CoDU' },
  { id: 'sptc', name: 'SPTC',
    title: 'SPTC(Single Pass Tree Chain-of-thought): An Efficient Prompting Scheme for Small Language Models',
    authors: 'Kabeen Kim†, Jiye Park, Jehyeok Rew', authorNote: '† Presenter.', venue: 'KCC 2025 · Poster', takeaway: 'Bringing generation, self-evaluation, and selection together in one prompt for small language models.',
    figure: { number: 1, src: '/figures/sptc-figure1.png', width: 653, height: 358, alt: 'SPTC Figure 1: comparison of Tree-of-Thought on the left and SPTC on the right' },
    paper: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12318736', code: '' },
];
const experience = [
  { mark: 'ETRI', tone: 'etri', logo: '/logos/etri.png', organization: 'Electronics and Telecommunications Research Institute', role: 'Research Intern', date: 'Jul 2026 – Aug 2026', location: 'Daejeon, South Korea', summary: 'Traced evidence loss in multi-hop retrieval and evaluated how well generated answers use source evidence.' },
  { mark: 'BCG', tone: 'bcg', logo: '/logos/bcg.png', organization: 'Boston Consulting Group', role: 'Research Analyst Intern', date: 'Mar 2026 – May 2026', location: 'Seoul, South Korea', summary: 'Worked on domain LLM fine-tuning, RAG evaluation, and extracting information from slides.' },
  { mark: 'DMKD', tone: 'dmkd', logo: '/logos/duksung-mark.png', organization: 'DMKD Lab · Duksung Women’s University', role: 'Undergraduate Researcher', advisor: { name: 'Prof. Jehyeok Rew', href: 'https://www.duksung.ac.kr/univ/majorInfo.do?miIdx=73&menuId=5788' }, date: 'Mar 2025 – Feb 2026', location: 'Seoul, South Korea', summary: 'Led studies on efficient prompting and document understanding, alongside a product-search RAG collaboration.' },
  { mark: 'CV', tone: 'cvlab', logo: '/logos/olemiss.png', organization: 'Vision and Multimodal Intelligence Lab · University of Mississippi', role: 'Undergraduate Researcher', advisor: { name: 'Prof. Bo Wang', href: 'https://olemiss.edu/profiles/hbw' }, date: 'Sep 2024 – Aug 2025', location: 'Mississippi, United States', summary: 'Studied failure cases and domain adaptation for low-light pose estimation; continued remotely after my exchange semester.' },
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
            <a className="social-link" href="/KabeenKim_CV.pdf?v=bf3f451a9e47" target="_blank" rel="noreferrer" aria-label="Curriculum Vitae (PDF)" title="CV"><SocialIcon name="cv" /><span>CV</span></a>
          </div>
        </div>
      </aside>
      <main id="main-content">
        <section id="about" className="content-section about-section" aria-labelledby="about-title">
          <h2 id="about-title">About Me</h2>
          <p>Hello:)</p>
          <p>I am an undergraduate in Computer Engineering and Statistics at <a href="https://www.duksung.ac.kr/" target="_blank" rel="noreferrer">Duksung Women’s University</a>, expecting to graduate in February 2027.</p>
          <p className="research-intro">I study how LLM systems <strong>find evidence, connect it, and use it faithfully</strong>. My interests include retrieval-augmented generation, knowledge graphs, and evaluation that helps explain where these systems fail.</p>
          <p>Most recently, I worked on multi-hop GraphRAG at <a href="#experience">ETRI</a>. My earlier work spans LLM reasoning and document understanding at DMKD Lab, low-light pose estimation at the University of Mississippi, and domain LLM applications at BCG.</p>
          <p className="about-links"><a href="#publications">Explore my publications ↓</a><span aria-hidden="true"> · </span><a href="/KabeenKim_CV.pdf?v=bf3f451a9e47" target="_blank" rel="noreferrer">Full CV ↗</a></p>
        </section>
        <section id="news" className="content-section" aria-labelledby="news-title">
          <h2 id="news-title">News</h2>
          <div className="news-scroll" role="region" aria-labelledby="news-title" aria-describedby="news-scroll-hint" tabIndex={0}>
            <ul className="news-list">
              <li><time dateTime="2026-09">[Sep 2026]</time> <span aria-hidden="true">🎉</span> Our paper <a href="#publications">ConFuse</a> was accepted to <strong>ICTC 2026</strong>.</li>
              <li><time dateTime="2026-07">[Jul 2026]</time> I joined <a href="#experience">ETRI</a> as a research intern, working on <a href="#work-in-progress">multi-hop GraphRAG over knowledge graphs</a>.</li>
              <li><time dateTime="2026-03">[Mar 2026]</time> I joined <a href="#experience">BCG</a> as a Research Analyst Intern, working on domain LLM fine-tuning, RAG evaluation, and slide parsing.</li>
              <li><time dateTime="2026-02">[Feb 2026]</time> <span aria-hidden="true">🎉</span> Our paper <a href="https://arxiv.org/abs/2604.10485" target="_blank" rel="noreferrer">UDAPose</a> was accepted to <strong>CVPR 2026</strong>.</li>
              <li><time dateTime="2025-10">[Oct 2025]</time> <span aria-hidden="true">🎉</span> Our paper <a href="#publications">CoDU</a> was accepted to <strong>KDBC 2025</strong>.</li>
              <li><time dateTime="2025-10">[Oct 2025]</time> <span aria-hidden="true">🏆</span> Our team placed <strong>3rd out of 210 teams</strong> in the <a href="#awards">Samsung AI Challenge</a> — Visually-Rich Document Understanding track.</li>
            </ul>
          </div>
          <p id="news-scroll-hint" className="news-scroll-hint">Scroll for earlier updates.</p>
        </section>
        <section id="work-in-progress" className="content-section" aria-labelledby="work-in-progress-title">
          <h2 id="work-in-progress-title">Research Focus</h2>
          <article className="ongoing-research">
            <h3>{graphRagTopic}</h3>
            <p>Answering a multi-hop question requires several pieces of evidence. During my ETRI internship, I investigated where retrieval lost those connections in a knowledge graph built from a technical manual.</p>
            <p>I redesigned traversal and reranking to preserve and score whole paths. The system retrieved all required evidence for <strong>202 of 250 questions, up from 62</strong>. This work shapes my interest in evaluating retrieval failures and their effect on grounded answers.</p>
          </article>
        </section>
        <section id="publications" className="content-section" aria-labelledby="publications-title">
          <h2 id="publications-title">Publications</h2>
          <div className="research-list">{research.map(project => <article className="research-row" key={project.id}>
            <a className="paper-thumbnail" href={project.figure.src} target="_blank" rel="noreferrer" aria-label={'View ' + project.name + ' Figure ' + project.figure.number + ' at full size (opens in a new tab)'} title={'View Figure ' + project.figure.number + ' at full size'}><img src={project.figure.src} width={project.figure.width} height={project.figure.height} loading="lazy" alt={project.figure.alt} /></a>
            <div className="research-copy">
              <h3>{project.title} <span className="paper-links">{project.paper && <a href={project.paper} target="_blank" rel="noreferrer">[paper]</a>}{project.code && <a href={project.code} target="_blank" rel="noreferrer">[code]</a>}</span></h3>
              <p className="paper-takeaway">{project.takeaway}</p><AuthorLine value={project.authors} />{project.authorNote && <p className="paper-author-note">{project.authorNote}</p>}<p className="paper-venue"><em>{project.venue}</em></p>
            </div>
          </article>)}</div>
        </section>
        <section id="education" className="content-section" aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <ul className="education-list">
            <li><strong>2021.03 – 2027.02 (expected)</strong>, B.S. in Computer Engineering and Statistics, <a href="https://www.duksung.ac.kr/" target="_blank" rel="noreferrer">Duksung Women’s University</a>. <span className="entry-meta">GPA: 4.15 / 4.5.</span></li>
            <li><strong>2024.08 – 2024.12</strong>, Exchange Student in Computer Science, <a href="https://olemiss.edu/" target="_blank" rel="noreferrer">University of Mississippi</a>.</li>
          </ul>
        </section>
        <section id="experience" className="content-section" aria-labelledby="experience-title">
          <h2 id="experience-title">Research &amp; Work Experience</h2>
          <div className="experience-list">{experience.map(item => <article className="experience-item" key={item.mark}>
            <div className={'organization-logo ' + item.tone}><img src={item.logo} alt={item.mark === 'DMKD' ? 'Duksung Women’s University emblem' : item.mark === 'CV' ? 'University of Mississippi' : item.mark} width="130" height="80" loading="lazy" /></div>
            <div><h3>{item.organization}</h3><p className="job-title">{item.role} <span className="job-location">| {item.location}</span></p>{item.advisor && <p className="job-title">Advisor: <a href={item.advisor.href} target="_blank" rel="noreferrer">{item.advisor.name}</a></p>}<p className="experience-date">{item.date}</p><p>{item.summary}</p>
            </div>
          </article>)}</div>
        </section>
        <section id="awards" className="content-section" aria-labelledby="awards-title">
          <h2 id="awards-title">Selected Honors</h2>
          <ul className="awards-list">
            <li><strong>2025.10:</strong> <span aria-hidden="true">🏆</span> <strong>3rd Place, Samsung AI Challenge</strong> — Visually-Rich Document Understanding track (210 teams).</li>
            <li><strong>2024:</strong> <strong>31st Mirae Asset Overseas Exchange Scholarship</strong>, Mirae Asset Park Hyeon Joo Foundation.</li>
            <li><strong>2021–2022:</strong> <strong>Academic Excellence Scholarship</strong>, Duksung Women’s University (3 awards).</li>
          </ul>
        </section>
        <section id="service" className="content-section service-section" aria-labelledby="service-title">
          <h2 id="service-title">Beyond Research</h2>
          <ul className="service-list">
            <li id="projects"><strong>Building interactive experiences.</strong> I led the AI work for <a href="https://github.com/4CO4CO/4co4co-ai" target="_blank" rel="noreferrer">Dimension of Memory</a>, a capstone exhibition connecting emotions in photos with music.</li>
            <li><strong>Teaching.</strong> I developed n8n and RAG workshop materials for public-sector staff and taught LEGO robotics and Python to middle-school students in Jeju through CJ UNIT.</li>
            <li><strong>Leading collaborative projects.</strong> Through Duksung Global Challenger, I led “Be a Connector,” a campus–local business app project informed by expert interviews in four European countries.</li>
          </ul>
          <p className="cv-note">For the full list of projects, activities, and awards, see my <a href="/KabeenKim_CV.pdf?v=bf3f451a9e47" target="_blank" rel="noreferrer">CV</a>.</p>
        </section>
        <footer className="site-footer"><span>© 2026 Kabeen Kim.</span><a href="#about">Back to top ↑</a></footer>
      </main>
    </div>
  </>;
}
