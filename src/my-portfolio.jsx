import { useState, useEffect, useRef, useCallback } from "react";

// ── Image imports (Vite resolves & validates these at build time) ──
import imgItIntern from "./assets/images/it-intern.jpeg";
import imgTechForge from "./assets/images/tech-forge.jpeg";
import imgIitDelhi from "./assets/images/iit-delhi.png";
import imgIitBombay from "./assets/images/iit-bombay.png";
import imgNgo from "./assets/images/ngo.jpeg";
import imgUdemy from "./assets/images/udemy.png";
import linuxlpu from "./assets/images/lpu.png";
import googlebits from "./assets/images/google.png";
import profile from "./assets/images/profile.jpeg";
import ardashboard from "./assets/images/ardashboard.jpg";
import xrmarket from "./assets/images/xrmarket.jpg";
import shoesar from "./assets/images/shoesar.jpg";
import snapcutai from "./assets/images/snapcutai.png";
import sikkimtour from "./assets/images/sikkimtour.jpg";
import highflyers from "./assets/images/highflyers.jpeg";
import cvFile from "./assets/cv/Suryanmandal_cv.pdf";
// import profile2 from "./assets/images/profile2.jpeg";

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */

const personasData = [
  {
    id: 1, title: "The College Student", frameLabel: "01",
    description: "Pursuing B.Tech in Computer Science Engineering at Lovely Professional University. Building strong foundations in CS principles, DSA, and modern development frameworks.",
    frameBg: "radial-gradient(ellipse at 60% 40%, #c9f0ff 0%, #a8d8f0 45%, #7ec8e3 75%, #b5d5e8 100%)",
    frameAccent: "#7ec8e3",
    profileImage: profile, // set to e.g. "/images/hero-student.jpg"
  },
  {
    id: 2, title: "The Software Engineer", frameLabel: "02",
    description: "Developing robust applications using C++, Java, and Python. Experienced in rapid prototyping and translating complex logic into clean, scalable code.",
    frameBg: "radial-gradient(ellipse at 60% 40%, #d4f5e9 0%, #a8e6cf 45%, #6bcba5 75%, #9dd9bf 100%)",
    frameAccent: "#6bcba5",
    profileImage: profile,
  },
  {
    id: 3, title: "The UI/UX Designer", frameLabel: "03",
    description: "Designing responsive, cross-platform interfaces focused on immersive commerce and spatial computing. Bridging the gap between beautiful design and technical performance.",
    frameBg: "radial-gradient(ellipse at 60% 40%, #fde8f5 0%, #f4b8e0 45%, #e88ac8 75%, #f0b0d8 100%)",
    frameAccent: "#e88ac8",
    profileImage: profile,
  },
  {
    id: 4, title: "The XR Developer", frameLabel: "04",
    description: "Founder of Reality Loops. Architecting immersive WebAR/WebXR solutions and markerless virtual try-on systems using React.js, Three.js, and Lens Studio.",
    frameBg: "radial-gradient(ellipse at 60% 40%, #e8e0ff 0%, #c4b0f5 45%, #9d7de8 75%, #b89ee0 100%)",
    frameAccent: "#9d7de8",
    profileImage: profile,
  },
  {
    id: 5, title: "The Cloud Engineer", frameLabel: "05",
    description: "Deploying serverless architecture, managing Google Cloud Functions, and architecting real-time databases using Firebase, AWS, and Docker.",
    frameBg: "radial-gradient(ellipse at 60% 40%, #fff3d4 0%, #fde68a 45%, #f5c842 75%, #f0d878 100%)",
    frameAccent: "#f5c842",
    profileImage: profile,
  },
];

const projectsData = [
  {
    id: 1, title: "Smart AR Dashboard", subtitle: "Analytics Visualizer",
    description: "Real-time analytics overlay rendered in augmented reality. Spatial data visualization surfaced on physical devices via marker-based tracking.",
    tech: ["FlutterFlow", "Firebase", "Google Cloud"], accent: "#7ec8e3", size: "large", emoji: "📊",
    coverImage: ardashboard, url: "https://realityloopsio.flutterflow.app/dashboard",
  },
  {
    id: 2, title: "XR Marketplace", subtitle: "Immersive Commerce",
    description: "End-to-end WebXR commerce engine with no-code product configurator. Shoppers inspect 3D products at scale before purchasing.",
    tech: ["React.js", "Three.js", "WebXR", "Firebase"], accent: "#9d7de8", size: "wide", emoji: "🛍️",
    coverImage: xrmarket, url: "https://kzmgj8crwj1ab5b4otpu.lite.vusercontent.net/",
  },
  {
    id: 5, title: "Sikkim HDR", subtitle: "Virtual Tour of Sikkim",
    description: "Step inside Sikkim from your home. An immersive virtual 360° tour powered by WebGL, Three.js and panoramic HDR photography — mountains, monasteries and more.",
    tech: ["React.js", "Three.js", "Node.js", "Next.js", "MongoDB"], accent: "#f5c842", size: "large", emoji: "🏔️",
    coverImage: sikkimtour, url: null,
  },
  {
    id: 3, title: "Shoes AR", subtitle: "Virtual Try-On System",
    description: "Markerless foot-tracking AR try-on. Users see photorealistic shoes on their own feet via the browser camera.",
    tech: ["JavaScript", "WebXR"], accent: "#e88ac8", size: "small", emoji: "👟",
    coverImage: shoesar, url: "https://shoes-ar.vercel.app",
  },
  {
    id: 4, title: "Snapcut Ai", subtitle: "Ai Tool",
    description: "Remove you image background instantly",
    tech: ["React.js", "N8N", "Supabase", "APIs"], accent: "#6bcba5", size: "small", emoji: "⚡",
    coverImage: snapcutai, url: "https://snapcut-ai-six.vercel.app",
  },
];

const experienceData = [
  {
    id: 1, type: "award", role: "High Flyers", org: "Lovely Professional University", period: "October 2025",
    detail: "Received an Appreciation Award from the Pro-Chancellor of LPU, (Col.) Rashmi Mittal.",
    icon: "🏆", accent: "#7ec8e3",
    image: highflyers,
  },
  {
    id: 2, type: "award", role: "1st Runner-Up", org: "Tech Forge 2025", period: "2025",
    detail: "Secured trophy and ₹7.5L seed funding offer for the Reality Loops XR platform pitch.",
    icon: "🥈", accent: "#f5c842",
    image: imgTechForge,
  },
  {
    id: 3, type: "award", role: "Gold Medalist", org: "SBI Youth Ideathon 2025", period: "IIT Delhi · 2025",
    detail: "Top 15 in India. Awarded 'Future Founder' title by SBI innovation panel. Team Reality Loops, Lovely Professional University.",
    icon: "🥇", accent: "#fde68a",
    image: imgIitDelhi,
  },
  {
    id: 4, type: "award", role: "Top 40 Nationwide", org: "Build Fest 2025", period: "IIT Bombay · 2025",
    detail: "Selected from 1,000+ startups nationwide. Pitched Reality Loops to top-tier VCs and mentors.",
    icon: "🚀", accent: "#6bcba5",
    image: imgIitBombay,
  },
  {
    id: 5, type: "work", role: "Volunteer", org: "Robinhood Army", period: "Siliguri– 2024",
    detail: "Grateful to be a part of the Robin Hood Army, where small acts of kindness create big changes. Together, we’re making a difference one meal at a time. 🌍💚",
    icon: "🌱", accent: "#a8e6cf",
    image: imgNgo,
  },
  {
    id: 6, type: "work", role: "IT Intern", org: "SMG Electric Scooters Ltd.", period: "Jun – Jul 2025",
    detail: "Developed immersive AR features using Three.js & WebXR. Built responsive UI components shipped to production.",
    icon: "💼", accent: "#7ec8e3",
    image: imgItIntern,
  },
];

const skillsData = [
  { label: "C", color: "#a8d8f0" }, { label: "C++", color: "#7ec8e3" }, { label: "Java", color: "#f4b8e0" },
  { label: "Python", color: "#fde68a" }, { label: "JavaScript", color: "#fde68a" }, { label: "ReactJS", color: "#a8e6cf" },
  { label: "Three.js", color: "#c4b0f5" }, { label: "WebXR", color: "#9d7de8" }, { label: "Firebase", color: "#f5c842" },
  { label: "Google Cloud", color: "#7ec8e3" }, { label: "Docker", color: "#a8d8f0" }, { label: "AWS", color: "#fde68a" },
  { label: "FlutterFlow", color: "#a8e6cf" }, { label: "Unity", color: "#d4d4d4" }, { label: "Lens Studio", color: "#f4b8e0" },
  { label: "Blender", color: "#e88ac8" },
];

const educationCards = [
  {
    id: 1, type: "university",
    institution: "Lovely Professional University",
    degree: "B.Tech — Computer Science & Engineering",
    board: "LPU · Phagwara, Punjab", period: "Aug 2023 – Present",
    grade: "CGPA: 7.12 / 10",
    highlights: ["DSA & Algorithms", "Web Development", "Cloud Computing", "AR/VR Systems"],
    color: "#7ec8e3", icon: "🎓", logo: null,
  },
  {
    id: 2, type: "school12",
    institution: "B.M.R.H.S.S",
    degree: "Class XII — Science",
    board: "CBSE", period: "2022",
    grade: "Percentage: 85%",
    highlights: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    color: "#9d7de8", icon: "🏫", logo: null,
  },
  {
    id: 3, type: "school10",
    institution: "Sri Krishna P.V.N",
    degree: "Class X",
    board: "CBSE", period: "2020",
    grade: "Percentage: 72%",
    highlights: ["Mathematics", "Science", "English", "Hindi"],
    color: "#e88ac8", icon: "🏫", logo: null,
  },
];

const certificatesData = [
  {
    id: 1, title: "Build Generative AI Applications",
    issuer: "Infosys Springboard", date: "2025",
    skills: ["Generative AI", "LLMs", "Prompt Engineering"],
    color: "#f5c842", icon: "🤖", image: imgUdemy, link: "https://drive.google.com/file/d/1Xp_V7sR_X9Q3CElE8T14u9A5qmTCfSQb/view",
  },
  {
    id: 2, title: "Linux Fundamentals",
    issuer: "Lovely Professional University", date: "2025",
    skills: ["Linux", "Shell Scripting", "System Admin"],
    color: "#7ec8e3", icon: "🐧", image: linuxlpu, link: "https://drive.google.com/file/d/1l9WVOCJ7oCV0ZdshxVdcayYc6nGAuuW8/view",
  },
  {
    id: 3, title: "The Bits and Bytes of Computer Networking",
    issuer: "Google (Coursera)", date: "2025",
    skills: ["Networking", "TCP/IP", "DNS", "HTTP"],
    color: "#9d7de8", icon: "🌐", image: googlebits, link: "https://drive.google.com/file/d/1F5_oicqgGFW9gyTfd0dVKcExNILHmke2/view",
  },
  // { id: 4, placeholder: true, color: "rgba(11,12,16,.06)", icon: "➕" },
  // { id: 5, placeholder: true, color: "rgba(11,12,16,.06)", icon: "➕" },
];

const contactData = {
  email: "suryanmandal393@gmail.com",
  linkedin: { url: "https://www.linkedin.com/in/surya-narayan-mandal-240496283", display: "in/SuryaNarayanMandal" },
  github: { url: "https://github.com/Suryanmandal", display: "github.com/Suryanmandal" },
  phone: "+91 7602548747",
};

/* ═══════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.pf-root{height:100vh;overflow-y:scroll;scroll-snap-type:y mandatory;-webkit-overflow-scrolling:touch;background:#F4F1EA;}
.pf-root::-webkit-scrollbar{display:none;}
.pf-root{-ms-overflow-style:none;scrollbar-width:none;}
.pf-root::before{content:'';position:fixed;inset:0;background-image:radial-gradient(circle,#d4cfc5 1px,transparent 1px);background-size:28px 28px;opacity:.38;pointer-events:none;z-index:0;}
.snap-sec{scroll-snap-align:start;scroll-snap-stop:always;min-height:100vh;width:100%;position:relative;z-index:1;}
.eyebrow{font-family:'DM Sans',sans-serif;font-size:.7rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#888;margin-bottom:.55rem;display:flex;align-items:center;gap:.7rem;}
.eyebrow::before{content:'';display:inline-block;width:1.8rem;height:1px;background:#bbb;}
.sec-heading{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3.2rem);font-weight:600;color:#0B0C10;margin-bottom:1.8rem;line-height:1.08;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.fade-in{animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both;}
.glass{background:rgba(255,255,255,.38);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.65);box-shadow:0 4px 24px rgba(0,0,0,.07);}
.side-nav{position:fixed;right:1.2rem;top:50%;transform:translateY(-50%);z-index:200;display:flex;flex-direction:column;align-items:flex-end;gap:.65rem;}
.sd-btn{display:flex;align-items:center;gap:.4rem;background:none;border:none;cursor:pointer;padding:3px;}
.sd-pip{display:block;width:7px;height:7px;border-radius:50%;background:rgba(11,12,16,.25);transition:background .25s,transform .25s;}
.sd-btn.act .sd-pip{background:#0B0C10;transform:scale(1.45);}
.scroll-hint{position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:200;display:flex;flex-direction:column;align-items:center;gap:.3rem;pointer-events:none;}
.sh-text{font-family:'DM Sans',sans-serif;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:#bbb;}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
.sh-arr{font-size:.8rem;color:#ccc;animation:bounce 1.6s ease-in-out infinite;}
.sec-counter{position:fixed;bottom:1.5rem;left:2rem;z-index:200;display:flex;align-items:baseline;gap:.3rem;}
.ctr-cur{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:300;color:#0B0C10;line-height:1;}
.ctr-sep{font-family:'DM Sans',sans-serif;font-size:.8rem;color:#ccc;}
.ctr-tot{font-family:'DM Sans',sans-serif;font-size:.72rem;color:#bbb;}

/* FANCY TOP NAV BAR */
.topbar{
  position:fixed;top:1.2rem;left:50%;transform:translateX(-50%);
  z-index:300;
  display:flex;align-items:center;gap:.25rem;
  background:rgba(255,255,255,.55);
  backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);
  border:1px solid rgba(255,255,255,.8);
  border-radius:100px;
  padding:.45rem .55rem;
  box-shadow:0 4px 28px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.9);
}
.tb-link{
  font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:500;
  letter-spacing:.04em;color:rgba(11,12,16,.55);
  background:none;border:none;cursor:pointer;
  padding:.42rem .85rem;border-radius:100px;
  transition:background .2s,color .2s;
  white-space:nowrap;
}
.tb-link:hover{background:rgba(11,12,16,.07);color:#0B0C10;}
.tb-link.tb-act{background:#0B0C10;color:#F4F1EA;}
.tb-divider{width:1px;height:16px;background:rgba(11,12,16,.1);margin:0 .1rem;flex-shrink:0;}
.tb-cta{
  font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:500;
  letter-spacing:.06em;
  background:#0B0C10;color:#F4F1EA;border:none;
  padding:.42rem 1.1rem;border-radius:100px;cursor:pointer;
  transition:opacity .2s;margin-left:.15rem;
}
.tb-cta:hover{opacity:.78;}

/* HERO */
.hero-wrap{min-height:100vh;display:flex;flex-direction:column;padding-top:5rem;}
.hero-split{display:flex;flex:1;min-height:0;}
.hero-left{flex:1.1;display:flex;flex-direction:column;justify-content:center;padding:2rem 2rem 2rem 3rem;}
.hero-name-tag{font-family:'Cormorant Garamond',serif;font-size:clamp(1.5rem,3vw,2.2rem);font-weight:300;letter-spacing:.04em;color:rgba(11,12,16,.72);margin-bottom:.7rem;font-style:italic;}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.4rem,5vw,4rem);font-weight:600;line-height:1.08;color:#0B0C10;margin-bottom:1.3rem;letter-spacing:-.01em;}
.hero-desc{font-family:'DM Sans',sans-serif;font-size:clamp(.88rem,1.4vw,1rem);line-height:1.75;color:#555;max-width:38ch;font-weight:300;}
.hero-cta{margin-top:2.2rem;display:flex;align-items:center;gap:1rem;}
.btn-p{background:#0B0C10;color:#F4F1EA;border:none;padding:.72rem 1.8rem;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;letter-spacing:.08em;cursor:pointer;border-radius:2px;transition:opacity .2s;}
.btn-p:hover{opacity:.8;}
.btn-g{background:transparent;color:#0B0C10;border:1px solid rgba(11,12,16,.25);padding:.72rem 1.6rem;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:400;letter-spacing:.06em;cursor:pointer;border-radius:2px;transition:border-color .2s;}
.btn-g:hover{border-color:#0B0C10;}
.hero-right{flex:.9;display:flex;align-items:center;justify-content:center;padding:2rem 3rem 2rem 1rem;}
.model-outer{position:relative;width:100%;max-width:340px;aspect-ratio:3/4;}
.model-bg{position:absolute;inset:0;border-radius:180px 180px 120px 120px;overflow:hidden;transition:opacity .38s,background .38s;}
.model-bg::after{content:'';position:absolute;inset:10px;border-radius:inherit;border:1px solid rgba(255,255,255,.55);pointer-events:none;}
.frame-photo-wrap{position:absolute;inset:0;border-radius:180px 180px 120px 120px;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;}
.frame-photo{width:100%;height:100%;object-fit:cover;object-position:center top;}
.frame-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:6.5rem;opacity:.2;filter:blur(1px);}
.frame-badge{position:absolute;top:1.2rem;right:-.8rem;background:rgba(255,255,255,.65);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.8);border-radius:100px;padding:.28rem .9rem;font-size:.68rem;font-weight:500;letter-spacing:.14em;color:#0B0C10;text-transform:uppercase;font-family:'DM Sans',sans-serif;z-index:2;box-shadow:0 2px 12px rgba(0,0,0,.08);}
.ar-badge{position:absolute;bottom:1.4rem;left:50%;transform:translateX(-50%);z-index:2;border-radius:100px;padding:.38rem 1.1rem;display:flex;align-items:center;gap:.45rem;font-size:.72rem;font-weight:500;color:#0B0C10;letter-spacing:.06em;white-space:nowrap;font-family:'DM Sans',sans-serif;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.75)}}
.ar-dot{width:6px;height:6px;border-radius:50%;background:currentColor;animation:pulse 1.8s infinite;}
.hero-pag{display:flex;align-items:center;justify-content:center;gap:.9rem;padding:1.4rem 0 2rem;position:relative;z-index:2;}
.pag-btn{width:42px;height:42px;border-radius:50%;border:1.5px solid rgba(11,12,16,.18);background:rgba(255,255,255,.52);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s,border-color .2s,box-shadow .2s;box-shadow:0 1px 8px rgba(0,0,0,.07);}
.pag-btn:hover{transform:scale(1.12);}
.pag-btn.pag-act{border-width:2px;transform:scale(1.15);box-shadow:0 3px 16px rgba(0,0,0,.14);}
.pag-pip{width:10px;height:10px;border-radius:50%;background:#0B0C10;transition:transform .2s,opacity .2s;}
.pag-btn:not(.pag-act) .pag-pip{opacity:.28;transform:scale(.7);}
.ft{transition:opacity .36s ease,transform .36s ease;}.ft.fh{opacity:0;transform:translateY(10px);}.ft.fv{opacity:1;transform:translateY(0);}
.ff{transition:opacity .36s ease;}.ff.fh{opacity:0;}.ff.fv{opacity:1;}

/* PROJECTS */
.projects-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:4rem 3rem;}
.bento-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.1rem;width:100%;}
.p-card{position:relative;border-radius:20px;overflow:hidden;cursor:pointer;transition:transform .3s,box-shadow .3s;min-height:220px;}
.p-card:hover{transform:scale(1.025);box-shadow:0 8px 32px rgba(0,0,0,.12);}
.p-large{grid-row:span 2;min-height:440px;}
.p-wide{grid-column:span 2;}
.p-full{grid-column:span 3;min-height:200px;}
.proj-cover{position:absolute;inset:0;z-index:0;}
.proj-cover img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
.p-card:hover .proj-cover img{transform:scale(1.05);}
.proj-cover-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4.5rem;opacity:.14;user-select:none;}
.proj-glow{position:absolute;inset:0;pointer-events:none;z-index:1;}
.card-strip{position:absolute;bottom:0;left:0;right:0;padding:.8rem 1.2rem;display:flex;align-items:center;justify-content:space-between;z-index:3;}
.card-num{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:300;color:rgba(11,12,16,.2);line-height:1;}
.card-sub-lbl{font-family:'DM Sans',sans-serif;font-size:.7rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#666;}
.card-overlay{position:absolute;inset:0;z-index:4;background:rgba(255,255,255,.92);backdrop-filter:blur(20px);padding:1.4rem;display:flex;flex-direction:column;justify-content:flex-end;gap:.55rem;opacity:0;transition:opacity .25s,transform .25s;transform:translateY(8px);}
.p-card:hover .card-overlay{opacity:1;transform:translateY(0);}
.ov-title{font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:600;color:#0B0C10;line-height:1.15;}
.ov-desc{font-family:'DM Sans',sans-serif;font-size:.78rem;color:#555;line-height:1.65;}
.tech-row{display:flex;flex-wrap:wrap;gap:.4rem;}
.tech-pill{font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:.06em;padding:.2rem .6rem;border-radius:100px;border:1px solid;background:transparent;}
.ov-cta{align-self:flex-start;background:#0B0C10;color:#F4F1EA;border:none;padding:.5rem 1.1rem;font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:500;letter-spacing:.08em;border-radius:3px;cursor:pointer;}
.photo-hint{position:absolute;top:.8rem;right:.8rem;z-index:3;background:rgba(255,255,255,.7);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.9);border-radius:100px;padding:.2rem .65rem;font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:500;letter-spacing:.1em;color:#888;text-transform:uppercase;}

/* EXPERIENCE */
.exp-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:4rem 2rem;overflow:hidden;position:relative;}
.exp-stage{perspective:1400px;position:relative;width:100%;max-width:1000px;height:520px;display:flex;align-items:center;justify-content:center;margin-top:1rem;}
.exp-card{position:absolute;width:340px;border-radius:24px;display:flex;flex-direction:column;transform-style:preserve-3d;cursor:pointer;transition:all .42s cubic-bezier(.22,1,.36,1);overflow:hidden;}
.exp-img-zone{width:100%;height:215px;flex-shrink:0;position:relative;overflow:hidden;}
.exp-img-zone img{width:100%;height:100%;object-fit:cover;}
.exp-img-ph{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;}
.exp-img-icon{font-size:2.8rem;opacity:.35;}
.exp-img-hint{font-family:'DM Sans',sans-serif;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:#aaa;}
.exp-content{padding:1.2rem 1.4rem 1.3rem;flex:1;display:flex;flex-direction:column;gap:.55rem;position:relative;}
.exp-accent{position:absolute;top:0;left:1.4rem;right:1.4rem;height:2px;border-radius:0 0 2px 2px;}
.exp-type{font-family:'DM Sans',sans-serif;font-size:.63rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#888;margin-top:.2rem;}
.exp-role{font-family:'Cormorant Garamond',serif;font-size:1.38rem;font-weight:600;color:#0B0C10;line-height:1.1;}
.exp-org{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#555;}
.exp-detail{font-family:'DM Sans',sans-serif;font-size:.75rem;line-height:1.65;color:#666;}
.exp-period{font-family:'DM Sans',sans-serif;font-size:.67rem;color:#999;border-top:1px solid rgba(0,0,0,.07);padding-top:.6rem;margin-top:auto;}
.exp-nav{display:flex;align-items:center;gap:2rem;margin-top:1.8rem;}
.nav-arr{width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.52);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.75);box-shadow:0 2px 12px rgba(0,0,0,.09);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem;transition:transform .2s;color:#0B0C10;font-family:'DM Sans',sans-serif;}
.nav-arr:hover:not([disabled]){transform:scale(1.1);}
.nav-arr[disabled]{opacity:.3;cursor:default;}
.exp-dots{display:flex;gap:.5rem;align-items:center;}
.e-dot{width:7px;height:7px;border-radius:50%;background:#ccc;transition:background .25s,transform .25s;cursor:pointer;border:none;padding:0;}
.e-dot.e-act{background:#0B0C10;transform:scale(1.35);}

/* SKILLS */
.skills-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:4rem 3rem;}
.skills-arena{position:relative;width:100%;max-width:800px;height:420px;border-radius:32px;overflow:hidden;}
.arena-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,0,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.03) 1px,transparent 1px);background-size:48px 48px;z-index:1;}
.skill-pill{position:absolute;padding:.35rem .95rem;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:500;backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.75);box-shadow:0 2px 12px rgba(0,0,0,.08);cursor:default;user-select:none;z-index:2;letter-spacing:.02em;white-space:nowrap;transition:transform .2s,box-shadow .2s;}
.skill-pill:hover{transform:scale(1.15);z-index:10;}
${skillsData.map((s, i) => `@keyframes d${i}{0%{left:${((i * 37 + 11) % 65 + 5)}%;top:${((i * 29 + 13) % 65 + 5)}%;}33%{left:${((i * 53 + 7) % 65 + 5)}%;top:${((i * 47 + 3) % 65 + 5)}%;}66%{left:${((i * 41 + 19) % 65 + 5)}%;top:${((i * 61 + 23) % 65 + 5)}%;}100%{left:${((i * 37 + 11) % 65 + 5)}%;top:${((i * 29 + 13) % 65 + 5)}%;}}`).join('')}
${skillsData.map((s, i) => `.sk${i}{animation:d${i} ${8 + (i % 7) * 1.4}s ease-in-out infinite;animation-delay:-${(i * .45) % 4}s;}`).join('')}

/* EDUCATION */
.edu-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:4rem 3rem;overflow:hidden;}
.h-scroll-track{display:flex;gap:1.2rem;overflow-x:auto;padding:.4rem 0 1.2rem;scrollbar-width:thin;scrollbar-color:rgba(11,12,16,.12) transparent;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;}
.h-scroll-track::-webkit-scrollbar{height:4px;}
.h-scroll-track::-webkit-scrollbar-thumb{background:rgba(11,12,16,.13);border-radius:2px;}
.h-arr-row{display:flex;gap:.5rem;justify-content:flex-end;margin-bottom:.6rem;}
.h-arr{width:33px;height:33px;border-radius:50%;background:rgba(255,255,255,.55);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.75);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.8rem;color:#555;transition:background .2s,transform .15s;box-shadow:0 1px 6px rgba(0,0,0,.07);}
.h-arr:hover{background:rgba(255,255,255,.85);transform:scale(1.08);}
.edu-card{flex:0 0 310px;scroll-snap-align:start;border-radius:22px;overflow:hidden;background:rgba(255,255,255,.4);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.68);box-shadow:0 4px 24px rgba(0,0,0,.07);transition:transform .25s,box-shadow .25s;}
.edu-card:hover{transform:translateY(-4px);box-shadow:0 10px 36px rgba(0,0,0,.1);}
.edu-top{height:120px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.edu-logo-ph{font-size:3.5rem;}
.edu-logo{width:68px;height:68px;border-radius:14px;object-fit:contain;background:rgba(255,255,255,.7);padding:8px;}
.edu-body{padding:1.2rem 1.3rem 1.4rem;}
.edu-badge{display:inline-flex;align-items:center;gap:.35rem;font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:#888;margin-bottom:.55rem;}
.edu-bdot{width:5px;height:5px;border-radius:50%;}
.edu-degree{font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:600;color:#0B0C10;line-height:1.2;margin-bottom:.28rem;}
.edu-inst{font-family:'DM Sans',sans-serif;font-size:.8rem;color:#555;margin-bottom:.2rem;}
.edu-board{font-family:'DM Sans',sans-serif;font-size:.7rem;color:#888;}
.edu-grade{margin-top:.55rem;font-family:'DM Sans',sans-serif;font-size:.74rem;font-weight:500;color:#0B0C10;background:rgba(11,12,16,.05);border-radius:6px;padding:.28rem .65rem;display:inline-block;}
.edu-tags{margin-top:.85rem;display:flex;flex-wrap:wrap;gap:.3rem;}
.edu-tag{font-family:'DM Sans',sans-serif;font-size:.62rem;padding:.18rem .52rem;border-radius:100px;border:1px solid;background:transparent;}
.edu-period{margin-top:.8rem;font-family:'DM Sans',sans-serif;font-size:.67rem;letter-spacing:.08em;color:#999;border-top:1px solid rgba(0,0,0,.06);padding-top:.6rem;}
.scroll-tip{font-family:'DM Sans',sans-serif;font-size:.68rem;color:#bbb;letter-spacing:.1em;margin-top:.4rem;}

/* CERTIFICATES */
.cert-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:4rem 3rem;overflow:hidden;}
.cert-card{flex:0 0 268px;scroll-snap-align:start;border-radius:20px;overflow:hidden;background:rgba(255,255,255,.4);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.68);box-shadow:0 4px 24px rgba(0,0,0,.07);transition:transform .25s,box-shadow .25s;}
.cert-card:hover:not(.cert-ph){transform:translateY(-4px);box-shadow:0 10px 36px rgba(0,0,0,.1);}
.cert-ph{border:1.5px dashed rgba(11,12,16,.13);background:rgba(255,255,255,.18);cursor:pointer;}
.cert-ph:hover{background:rgba(255,255,255,.32);}
.cert-img{height:165px;position:relative;overflow:hidden;}
.cert-img img{width:100%;height:100%;object-fit:cover;}
.cert-img-ph{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;}
.cert-body{padding:1rem 1.1rem 1.2rem;}
.cert-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:.45rem;}
.cert-issuer{font-family:'DM Sans',sans-serif;font-size:.66rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#888;}
.cert-date{font-family:'DM Sans',sans-serif;font-size:.66rem;color:#aaa;}
.cert-title{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:600;color:#0B0C10;line-height:1.25;margin-bottom:.55rem;}
.cert-skills{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:.75rem;}
.cert-skill{font-family:'DM Sans',sans-serif;font-size:.62rem;padding:.17rem .48rem;border-radius:100px;border:1px solid;background:transparent;color:#555;}
.cert-link{font-family:'DM Sans',sans-serif;font-size:.7rem;font-weight:500;color:#0B0C10;background:none;border:none;cursor:pointer;padding:0;opacity:.55;transition:opacity .2s;letter-spacing:.04em;}
.cert-link:hover{opacity:1;}

/* CONTACT */
.contact-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:4rem 2rem;position:relative;overflow:hidden;}
.contact-card{position:relative;z-index:2;width:100%;max-width:580px;border-radius:32px;padding:2.8rem;background:rgba(255,255,255,.44);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.72);box-shadow:0 8px 48px rgba(0,0,0,.09);}
.tbar{display:flex;align-items:center;gap:.5rem;margin-bottom:2rem;}
.tbar-dot{width:10px;height:10px;border-radius:50%;}
.tbar-lbl{font-family:'DM Sans',sans-serif;font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;color:#aaa;margin-left:.4rem;}
.avail{display:inline-flex;align-items:center;gap:.45rem;background:rgba(107,203,165,.15);border:1px solid rgba(107,203,165,.4);border-radius:100px;padding:.28rem .85rem;font-family:'DM Sans',sans-serif;font-size:.68rem;font-weight:500;color:#4aab88;margin-bottom:1.3rem;letter-spacing:.06em;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.avail-dot{width:6px;height:6px;border-radius:50%;background:#6bcba5;animation:blink 1.8s ease-in-out infinite;}
.contact-h{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:600;color:#0B0C10;line-height:1.1;margin-bottom:.75rem;}
.contact-p{font-family:'DM Sans',sans-serif;font-size:.86rem;line-height:1.7;color:#666;margin-bottom:2rem;max-width:40ch;}
.soc-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;}
.soc-btn{display:flex;align-items:center;gap:.85rem;padding:.85rem 1rem;border-radius:14px;border:1px solid rgba(255,255,255,.75);cursor:pointer;text-align:left;width:100%;transition:transform .2s;overflow:hidden;box-sizing:border-box;}
.soc-btn:hover{transform:translateY(-3px);}
.soc-icon{width:34px;height:34px;border-radius:10px;border:1px solid;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:.9rem;font-weight:600;flex-shrink:0;background:rgba(255,255,255,.6);}
.soc-text{display:flex;flex-direction:column;gap:.1rem;min-width:0;flex:1;overflow:hidden;}
.soc-lbl{font-family:'DM Sans',sans-serif;font-size:.63rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#999;}
.soc-disp{font-family:'DM Sans',sans-serif;font-size:.72rem;color:#0B0C10;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;}
.soc-arr{font-size:1rem;margin-left:auto;flex-shrink:0;}
.cv-btn{display:flex;align-items:center;justify-content:center;gap:.6rem;width:100%;margin-top:1rem;padding:.85rem 1.6rem;border-radius:14px;background:#0B0C10;color:#F4F1EA;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:500;letter-spacing:.1em;text-decoration:none;transition:opacity .2s,transform .2s;box-shadow:0 4px 20px rgba(11,12,16,.18);}
.cv-btn:hover{opacity:.82;transform:translateY(-2px);}
.cv-btn-icon{font-size:1rem;}
.contact-footer{position:relative;z-index:2;margin-top:2rem;font-family:'DM Sans',sans-serif;font-size:.7rem;letter-spacing:.1em;color:#bbb;text-align:center;}

/* RESPONSIVE */
@media(max-width:768px){
  .topbar{padding:.35rem .4rem;gap:.1rem;}
  .tb-link{font-size:.65rem;padding:.36rem .6rem;}
  .tb-cta{font-size:.65rem;padding:.36rem .75rem;}
  .tb-divider{display:none;}
  .hero-wrap{padding-top:4.5rem;}
  .hero-split{flex-direction:column;}
  .hero-left{padding:1.5rem 1.5rem 0;text-align:center;}
  .hero-desc{max-width:100%;}
  .hero-cta{justify-content:center;}
  .hero-right{padding:1rem 1.5rem;}
  .model-outer{max-width:260px;}
  .bento-grid{grid-template-columns:1fr 1fr;}
  .p-large{grid-row:span 1;}
  .p-wide{grid-column:span 2;}
  .projects-wrap,.skills-wrap,.edu-wrap,.cert-wrap,.contact-wrap{padding:3rem 1.5rem;}
  .soc-grid{grid-template-columns:1fr;}
  .sec-counter{left:1.2rem;}
  .side-nav{right:.6rem;}
}
@media(max-width:540px){
  .topbar{border-radius:16px;top:.7rem;}
  .tb-link:not(.tb-act){display:none;}
  .tb-link.tb-act{display:block;}
}
@media(max-width:480px){.bento-grid{grid-template-columns:1fr;}.p-wide{grid-column:span 1;}.p-large{grid-row:span 1;}}
`;

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
const HERO_EMOJI = ["🎓", "💻", "🎨", "🥽", "☁️"];

function HeroSection() {
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);
  const timer = useRef(null);
  const p = personasData[idx];

  const select = (i) => {
    if (i === idx) return;
    setVis(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setIdx(i); setVis(true); }, 380);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="hero-wrap">
      <div className="hero-split">
        {/* LEFT */}
        <div className="hero-left">
          <div className={`ft ${vis ? "fv" : "fh"}`}>
            <p className="hero-name-tag">Surya Narayan Mandal</p>
            <h1 className="hero-title">{p.title}</h1>
            <p className="hero-desc">{p.description}</p>
            <div className="hero-cta">
              <button className="btn-p">View Work</button>
              <button className="btn-g">Contact Me</button>
            </div>
          </div>
        </div>

        {/* RIGHT — colored canvas + photo */}
        <div className="hero-right">
          <div className="model-outer">
            {/* Colored gradient canvas */}
            <div className={`model-bg ff ${vis ? "fv" : "fh"}`} style={{ background: p.frameBg }} />

            {/* Photo sits ON TOP of the colored canvas */}
            <div className="frame-photo-wrap">
              {p.profileImage
                ? <img src={p.profileImage} alt={p.title} className="frame-photo" />
                : <div className="frame-ph">{HERO_EMOJI[idx]}</div>
              }
            </div>

            {/* Glass label badge */}
            <div className={`frame-badge ff ${vis ? "fv" : "fh"}`}>
              {p.title.replace("The ", "")}
            </div>

            {/* AR pill */}
            <div className="ar-badge glass">
              <span className="ar-dot" />
              View in AR
            </div>
          </div>
        </div>
      </div>

      {/* Persona pagination */}
      <div className="hero-pag">
        {personasData.map((px, i) => (
          <button key={px.id}
            className={`pag-btn ${i === idx ? "pag-act" : ""}`}
            onClick={() => select(i)}
            style={i === idx ? { borderColor: px.frameAccent } : {}}>
            <span className="pag-pip" style={i === idx ? { background: px.frameAccent } : {}} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECTS BENTO  (5 cards, cover photo slots)
═══════════════════════════════════════════════════════ */
function ProjectsBento() {
  const sz = s => s === "large" ? "p-large" : s === "wide" ? "p-wide" : "";
  return (
    <div className="projects-wrap">
      <p className="eyebrow">Selected Work</p>
      <h2 className="sec-heading">Projects</h2>
      <div className="bento-grid">
        {projectsData.map((p, i) => (
          <div key={p.id} className={`p-card glass ${sz(p.size)} fade-in`}
            style={{ animationDelay: `${i * .09}s` }}>
            <div className="proj-cover">
              {p.coverImage
                ? <img src={p.coverImage} alt={p.title} />
                : <div className="proj-cover-ph"
                  style={{ background: `radial-gradient(ellipse at 40% 40%,${p.accent}40 0%,transparent 70%)` }}>
                  {p.emoji}
                </div>
              }
            </div>
            <div className="proj-glow"
              style={{ background: `radial-gradient(ellipse at 30% 30%,${p.accent}30 0%,transparent 62%)` }} />
            {!p.coverImage &&
              <div className="photo-hint">Add Cover Photo</div>}
            <div className="card-strip">
              <span className="card-num">0{p.id}</span>
              <span className="card-sub-lbl">{p.subtitle}</span>
            </div>
            <div className="card-overlay">
              <p className="ov-title">{p.title}</p>
              <p className="ov-desc">{p.description}</p>
              <div className="tech-row">
                {p.tech.map(t => (
                  <span key={t} className="tech-pill"
                    style={{ borderColor: p.accent, color: p.accent }}>{t}</span>
                ))}
              </div>
              <button className="ov-cta"
                style={!p.url ? { opacity: .45, cursor: "default" } : {}}
                onClick={() => p.url && window.open(p.url, "_blank")}
              >View Project →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCE CAROUSEL  (image-first post cards, 5 cards)
═══════════════════════════════════════════════════════ */
function ExperienceCarousel() {
  const [active, setActive] = useState(1);
  const card = experienceData[active];
  const TYPE_LABELS = { work: "Work Experience", award: "Achievement", ngo: "Social Impact" };

  const getStyle = (i) => {
    const d = i - active, a = Math.abs(d);
    if (a === 0) return { scale: 1, x: "0%", rotY: 0, op: 1, zi: 10, br: 1 };
    if (a === 1) return { scale: .78, x: d < 0 ? "-58%" : "58%", rotY: d < 0 ? 16 : -16, op: .48, zi: 5, br: .84 };
    return { scale: .6, x: d < 0 ? "-98%" : "98%", rotY: d < 0 ? 28 : -28, op: .14, zi: 1, br: .7 };
  };

  return (
    <div className="exp-wrap">
      {/* Ambient color orb */}
      <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: card.accent, opacity: .08, top: "4%", right: "4%", filter: "blur(80px)", transition: "background .5s", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ textAlign: "center", marginBottom: "1.5rem", position: "relative", zIndex: 2 }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>Career &amp; Recognition</p>
        <h2 className="sec-heading" style={{ marginBottom: 0 }}>Experience &amp; Achievements</h2>
      </div>

      <div className="exp-stage">
        {experienceData.map((item, i) => {
          const s = getStyle(i);
          return (
            <div key={item.id} className="exp-card glass"
              onClick={() => setActive(i)}
              style={{
                transform: `scale(${s.scale}) translateX(${s.x}) rotateY(${s.rotY}deg)`,
                opacity: s.op, zIndex: s.zi, filter: `brightness(${s.br})`,
              }}>
              {/* ── Image zone (top ~215px) ── */}
              <div className="exp-img-zone"
                style={{ background: `linear-gradient(135deg,${item.accent}30 0%,${item.accent}10 100%)` }}>
                {item.image
                  ? <img src={item.image} alt={item.role} />
                  : <div className="exp-img-ph">
                    <span className="exp-img-icon">{item.icon}</span>
                    <span className="exp-img-hint">Add Photo Here</span>
                  </div>
                }
              </div>
              {/* ── Text content ── */}
              <div className="exp-content">
                <div className="exp-accent" style={{ background: item.accent }} />
                <span className="exp-type">{TYPE_LABELS[item.type] || item.type}</span>
                <h3 className="exp-role">{item.role}</h3>
                <p className="exp-org">{item.org}</p>
                <p className="exp-detail">{item.detail}</p>
                <p className="exp-period">{item.period}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="exp-nav">
        <button className="nav-arr" onClick={() => setActive(a => Math.max(0, a - 1))} disabled={active === 0}>←</button>
        <div className="exp-dots">
          {experienceData.map((_, i) => (
            <button key={i} className={`e-dot ${i === active ? "e-act" : ""}`} onClick={() => setActive(i)} />
          ))}
        </div>
        <button className="nav-arr" onClick={() => setActive(a => Math.min(experienceData.length - 1, a + 1))} disabled={active === experienceData.length - 1}>→</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════ */
function SkillsCloud() {
  return (
    <div className="skills-wrap">
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>Technical Proficiency</p>
        <h2 className="sec-heading" style={{ marginBottom: 0 }}>Skills</h2>
      </div>
      <div className="skills-arena glass"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,.07),inset 0 1px 0 rgba(255,255,255,.8)" }}>
        <div className="arena-grid" />
        {skillsData.map((s, i) => (
          <div key={s.label} className={`skill-pill sk${i}`}
            style={{ background: `${s.color}30`, color: "#0B0C10" }}>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   EDUCATION  (separate section — horizontal scroll)
═══════════════════════════════════════════════════════ */
function EducationSection() {
  const trackRef = useRef(null);
  const scroll = d => trackRef.current?.scrollBy({ left: d * 330, behavior: "smooth" });

  return (
    <div className="edu-wrap">
      <p className="eyebrow">Academic Background</p>
      <h2 className="sec-heading">Education</h2>

      <div className="h-arr-row">
        <button className="h-arr" onClick={() => scroll(-1)}>←</button>
        <button className="h-arr" onClick={() => scroll(1)}>→</button>
      </div>

      <div className="h-scroll-track" ref={trackRef}>
        {educationCards.map((item, i) => (
          <div key={item.id} className="edu-card fade-in" style={{ animationDelay: `${i * .12}s` }}>
            {/* Color top band */}
            <div className="edu-top"
              style={{ background: `linear-gradient(135deg,${item.color}45 0%,${item.color}15 100%)` }}>
              {item.logo
                ? <img src={item.logo} alt={item.institution} className="edu-logo" />
                : <span className="edu-logo-ph">{item.icon}</span>
              }
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${item.color},transparent)` }} />
            </div>

            <div className="edu-body">
              <div className="edu-badge">
                <span className="edu-bdot" style={{ background: item.color }} />
                {item.type === "university" ? "University" : item.type === "school12" ? "Senior Secondary" : "Secondary"}
              </div>
              <h3 className="edu-degree">{item.degree}</h3>
              <p className="edu-inst">{item.institution}</p>
              <p className="edu-board">{item.board}</p>
              <span className="edu-grade">{item.grade}</span>
              <div className="edu-tags">
                {item.highlights.map(h => (
                  <span key={h} className="edu-tag"
                    style={{ borderColor: `${item.color}70`, color: item.color }}>{h}</span>
                ))}
              </div>
              <p className="edu-period">{item.period}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="scroll-tip">← Swipe or scroll horizontally to view all →</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CERTIFICATES  (separate section — horizontal scroll)
═══════════════════════════════════════════════════════ */
function CertificatesSection() {
  const trackRef = useRef(null);
  const scroll = d => trackRef.current?.scrollBy({ left: d * 290, behavior: "smooth" });

  return (
    <div className="cert-wrap">
      <p className="eyebrow">Credentials</p>
      <h2 className="sec-heading">Certifications</h2>

      <div className="h-arr-row">
        <button className="h-arr" onClick={() => scroll(-1)}>←</button>
        <button className="h-arr" onClick={() => scroll(1)}>→</button>
      </div>

      <div className="h-scroll-track" ref={trackRef}>
        {certificatesData.map((cert, i) => (
          <div key={cert.id}
            className={`cert-card fade-in ${cert.placeholder ? "cert-ph" : ""}`}
            style={{ animationDelay: `${i * .09}s` }}>

            <div className="cert-img"
              style={{
                background: cert.placeholder
                  ? "repeating-linear-gradient(45deg,rgba(0,0,0,.025) 0,rgba(0,0,0,.025) 2px,transparent 2px,transparent 12px)"
                  : `linear-gradient(135deg,${cert.color}45 0%,${cert.color}15 100%)`
              }}>
              {cert.image
                ? <img src={cert.image} alt={cert.title} />
                : <div className="cert-img-ph">
                  <span style={{ fontSize: "2.8rem", opacity: cert.placeholder ? .3 : .5 }}>{cert.icon}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#b0b0b0" }}>
                    {cert.placeholder ? "Add Certificate" : "Add Certificate Image"}
                  </span>
                </div>
              }
            </div>

            {!cert.placeholder && (
              <div className="cert-body">
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-skills">
                  {cert.skills.map(s => (
                    <span key={s} className="cert-skill"
                      style={{ borderColor: `${cert.color}80` }}>{s}</span>
                  ))}
                </div>
                <button className="cert-link"
                  onClick={() => cert.link && window.open(cert.link, "_blank")}
                  style={!cert.link ? { cursor: "default" } : {}}
                >
                  {cert.link ? "View Certificate ↗" : "Link coming soon"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="scroll-tip">←  →</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════ */
const SOCIALS = [
  { label: "LinkedIn", display: contactData.linkedin.display, url: contactData.linkedin.url, icon: "in", accent: "#0a66c2", bg: "rgba(10,102,194,.08)" },
  { label: "GitHub", display: contactData.github.display, url: contactData.github.url, icon: "gh", accent: "#333", bg: "rgba(0,0,0,.06)" },
  { label: "Email", display: contactData.email, url: `mailto:${contactData.email}`, icon: "@", accent: "#e88ac8", bg: "rgba(232,138,200,.1)" },
  { label: "Phone", display: contactData.phone, url: `tel:${contactData.phone.replace(/\s/g, "")}`, icon: "☎", accent: "#6bcba5", bg: "rgba(107,203,165,.1)" },
];

function ContactTerminal() {
  const [copied, setCopied] = useState(null);
  const handle = s => {
    if (s.label === "Email") navigator.clipboard?.writeText(s.display).then(() => { setCopied("Email"); setTimeout(() => setCopied(null), 2000); });
    window.open(s.url, "_blank");
  };
  return (
    <div className="contact-wrap">
      <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: "rgba(157,125,232,.08)", top: "-60px", right: "5%", filter: "blur(90px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: "rgba(107,203,165,.09)", bottom: "5%", left: "8%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div className="contact-card fade-in">
        <div className="tbar">
          <div className="tbar-dot" style={{ background: "#ff6059" }} />
          <div className="tbar-dot" style={{ background: "#febc2e" }} />
          <div className="tbar-dot" style={{ background: "#28c840" }} />
          <span className="tbar-lbl">contact.sh</span>
        </div>
        <div className="avail"><span className="avail-dot" />Available for opportunities</div>
        <h2 className="contact-h">Let's build something<br /><em style={{ fontStyle: "italic", fontWeight: 400 }}>immersive.</em></h2>
        <p className="contact-p">I'm Surya — an XR developer and spatial architect. Whether it's a WebAR product, a Three.js experience, or something entirely new, let's talk.</p>
        <div className="soc-grid">
          {SOCIALS.map(s => (
            <button key={s.label} className="soc-btn"
              style={{ background: s.bg, boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}
              onClick={() => handle(s)}>
              <span className="soc-icon" style={{ color: s.accent, borderColor: `${s.accent}40` }}>{s.icon}</span>
              <div className="soc-text">
                <span className="soc-lbl">{s.label}</span>
                <span className="soc-disp">{copied === s.label ? "Copied!" : s.display}</span>
              </div>
              <span className="soc-arr" style={{ color: s.accent }}>↗</span>
            </button>
          ))}
        </div>
        <a className="cv-btn" href={cvFile} download="Suryanmandal_CV.pdf">
          <span className="cv-btn-icon">⬇</span> Download CV
        </a>
      </div>
      <p className="contact-footer">Designed &amp; developed by Surya Narayan Mandal </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FANCY TOP BAR
═══════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: "Projects", sectionId: "projects" },
  { label: "Experience", sectionId: "experience" },
  { label: "Skills", sectionId: "skills" },
  { label: "Education", sectionId: "education" },
  { label: "Certifications", sectionId: "certs" },
];

function TopBar({ activeSection, scrollTo, sectionIds }) {
  const activeId = sectionIds[activeSection];
  return (
    <div className="topbar">
      {NAV_ITEMS.map((item, i) => {
        const sIdx = sectionIds.indexOf(item.sectionId);
        const isAct = activeId === item.sectionId;
        return (
          <button
            key={item.sectionId}
            className={`tb-link ${isAct ? "tb-act" : ""}`}
            onClick={() => sIdx !== -1 && scrollTo(sIdx)}
          >
            {item.label}
          </button>
        );
      })}
      <div className="tb-divider" />
      <button
        className="tb-cta"
        onClick={() => {
          const cIdx = sectionIds.indexOf("contact");
          if (cIdx !== -1) scrollTo(cIdx);
        }}
      >
        Contact Me
      </button>
    </div>
  );
}


const SECTIONS = [
  { id: "hero", label: "Intro", Component: HeroSection },
  { id: "projects", label: "Projects", Component: ProjectsBento },
  { id: "experience", label: "Experience", Component: ExperienceCarousel },
  { id: "skills", label: "Skills", Component: SkillsCloud },
  { id: "education", label: "Education", Component: EducationSection },
  { id: "certs", label: "Certificates", Component: CertificatesSection },
  { id: "contact", label: "Contact", Component: ContactTerminal },
];

export default function PortfolioPreview() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const obs = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(i); },
        { root: containerRef.current, threshold: .5 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = useCallback(i => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const h = e => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); scrollTo(Math.min(active + 1, SECTIONS.length - 1)); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); scrollTo(Math.max(active - 1, 0)); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, scrollTo]);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Fancy top navigation bar */}
      <TopBar
        activeSection={active}
        scrollTo={scrollTo}
        sectionIds={SECTIONS.map(s => s.id)}
      />

      {/* Side nav */}
      <nav className="side-nav">
        {SECTIONS.map((s, i) => (
          <button key={s.id} className={`sd-btn ${i === active ? "act" : ""}`}
            onClick={() => scrollTo(i)} title={s.label}>
            <span className="sd-pip" />
          </button>
        ))}
      </nav>

      {/* Section counter */}
      <div className="sec-counter">
        <span className="ctr-cur">{String(active + 1).padStart(2, "0")}</span>
        <span className="ctr-sep">/</span>
        <span className="ctr-tot">{String(SECTIONS.length).padStart(2, "0")}</span>
      </div>

      {/* Scroll hint */}
      {active < SECTIONS.length - 1 && (
        <div className="scroll-hint">
          <span className="sh-text">Scroll</span>
          <span className="sh-arr">↓</span>
        </div>
      )}

      {/* Snap scroll */}
      <div className="pf-root" ref={containerRef}>
        {SECTIONS.map(({ id, Component }, i) => (
          <div key={id} id={id} className="snap-sec"
            ref={el => sectionRefs.current[i] = el}>
            <Component />
          </div>
        ))}
      </div>
    </>
  );
}
