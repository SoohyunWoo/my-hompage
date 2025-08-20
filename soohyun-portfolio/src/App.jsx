\
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ExternalLink, FileText, MapPin, ArrowDown, Instagram, Sun, Moon } from "lucide-react";
import { Card, CardContent } from "./components/ui/card.jsx";
import { Button } from "./components/ui/button.jsx";

/* ====== BASE (GitHub Pages 서브경로 대응) ====== */
const BASE = import.meta.env.BASE_URL || "/";

/* ====== 데이터 (캔버스 최종본) ====== */
const PROFILE = {
  name: "우수현",
  role: "경제정책·시장 해석 | 주식 리서치",
  summary:
    "한국외국어대학교 융합일본지역/경제학 전공. 교내 학회·연합동아리·대외활동에서 기업/산업 리서치와 자료 제작을 수행했습니다. 데이터 가공·시각화와 IR/뉴스 해석을 기반으로 신속하고 구조화된 리포트를 만듭니다.",
  location: "Seoul, Korea",
  email: "sa0110984@naver.com",
  phone: "010-9508-9986",
  img: "",
  openTo: ["Global Equity Research", "Policy/Market Briefing", "Internship"]
};

const LINKS = {
  github: "",
  linkedin: "",
  instagram: "https://instagram.com/diarchiveov",
  resume: BASE + "resume.pdf"
};

const FOCUS = [
  { title: "글로벌 주식 리서치", points: ["기업/산업 구조 파악, IR/공시 문서 요약", "경쟁구도·리스크 요인 정리 및 투자포인트 도출"] },
  { title: "정책·시장 해석", points: ["통상/규제/거시 이슈가 섹터·기업 재무에 미치는 영향 요약", "뉴스 플로우·컨퍼런스콜 요약자료 제작"] },
  { title: "자료 제작/시각화", points: ["엑셀·PPT 중심 데이터 가공/차트/도식화", "카드뉴스·보고서·발표자료 템플릿 제작"] }
];

const QUALIFICATIONS = [
  "JLPT N1 (114점)",
  "투자자산운용사 (2024.03.21 합격)",
  "Excel/PowerPoint/Word – 중급, 데이터 가공·시각화"
];

const EXPERIENCE = [
  { org: "한국외국어대학교", title: "증권투자연구회 POSTRADE (리서치팀)", period: "2025.03 – ", bullets: ["기업/산업 리서치, 보고서 제작"] },
  { org: "연합 주식경제동아리", title: "위닝펀드", period: "2025.03 – 2025.06", bullets: ["토론·발표 및 리서치"] },
  { org: "자유기업원", title: "인턴연구원", period: "2024.07 – 2024.08", bullets: ["정책 리서치 보조"] },
  { org: "한국경제인협회", title: "미래내일 일경험(비트코인 ETF 국내 도입 필요성 연구)", period: "2024.05 – 2024.06", bullets: ["정책·시장 리서치 과제 수행"] },
  { org: "한국경제인협회", title: "Elite Intensive Course 42기 (우수 수료자/우수 조)", period: "2024.02 – 2024.06", bullets: ["연합 동아리 프로젝트, 토론 1위"] },
  { org: "두나무", title: "업비트 대학생 서포터즈 업투 2기 (우수활동팀)", period: "2023.09 – 2023.12", bullets: ["가상자산·Web3 카드뉴스/기사 제작"] },
  { org: "서울디자인재단 DDP", title: "디디피 디자인스토어 서포터즈 4기 (우수)", period: "2023.08 – 2023.12", bullets: ["콘텐츠 제작·홍보"] },
  { org: "서울디자인재단 DDP", title: "디디피 디자인스토어 서포터즈 3기 (우수)", period: "2023.04 – 2023.07", bullets: ["콘텐츠 제작·홍보"] },
  { org: "한국외국어대학교 일본학대학", title: "제14대 학생회 '모리' 교육자치국원", period: "2023.03 – 2023.08", bullets: ["행사 기획·자료 제작"] },
  { org: "한국외국어대학교 일본학대학", title: "제13대 학생회 '하루' 교육자치국원", period: "2022.09 – 2023.01", bullets: ["학사·행사 운영"] },
  { org: "한국외국어대학교 일본학대학", title: "융합일본지역학부 1학년 과대표", period: "2020.09 – 2021.02", bullets: ["운영위원회"] },
  { org: "한국외국어대학교 일본학대학", title: "제11대 학생회 '나루' 정책교류국원", period: "2020.03 – 2021.02", bullets: ["정책 교류/자료 제작"] }
];

const SERVICE = {
  branch: "대한민국 육군",
  role: "병장 · 예비군조교",
  period: "2021.02.23 – 2022.08.22"
};

const PROJECTS = [
  {
    name: "비트코인 ETF 국내 도입의 필요성 연구",
    tags: ["Policy", "ETF", "KR"],
    summary: "미래내일 일경험 프로젝트(한국경제인협회). 정책·시장 영향 분석 자료.",
    link: BASE + "docs/프로젝트 결과보고서_2조 하트비트 (1).pdf",
    embed: true
  },
  { name: "농심 기업 분석 노트", tags: ["F&B", "Equity"], summary: "수요 탄력·원재료·환율 민감도를 바탕으로 매출 하방 안정성 강조.", link: "#" },
  { name: "한일경제안보협력 포럼 기획/운영", tags: ["Event", "Policy"], summary: "현장 운영 및 이슈 정리 자료 제작 경험.", link: "#" },
  { name: "콘텐츠 제작 모음(DDP/Upbit)", tags: ["Content", "Design"], summary: "카드뉴스·썸네일 등 시각자료 아카이빙.", link: "#" }
];

const WRITING = [];

const CERTIFICATES = [
  { title: "업비트 서포터즈 우수활동팀(1위) 상장", img: "" },
  { title: "DDP 디자인스토어 서포터즈 3기 우수", img: "" },
  { title: "DDP 디자인스토어 서포터즈 4기 우수", img: "" },
  { title: "한국경제인협회 EIC 수료증(42기) & 우수 수료자/우수 조", img: "" },
  { title: "YLC X EIC 열린토론회 1위", img: "" }
];

const NAV_SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Career" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "proof", label: "Proof" },
  { id: "contact", label: "Contact" }
];

/* ====== 테마 훅 ====== */
function useTheme() {
  const getInitial = () => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    return stored === "dark" || stored === "light" || stored === "system" ? stored : "system";
  };
  const [theme, setTheme] = useState(getInitial);
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setResolvedTheme(mq.matches ? "dark" : "light");
    } else setResolvedTheme(theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [resolvedTheme, theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setResolvedTheme(mq.matches ? "dark" : "light");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "system" ? "light" : t === "light" ? "dark" : "system"));
  return { theme, resolvedTheme, toggle };
}

/* ====== 섹션 ====== */
function Section({ id, title, children, className = "", fadeOnLeave = true, showRatio = 0.25 }) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!fadeOnLeave) return;
    let ticking = false;
    const calc = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const ratio = visible / Math.min(vh, r.height || vh);
      setHidden(ratio < showRatio);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(calc);
      }
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [fadeOnLeave, showRatio]);

  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-mt-36 md:scroll-mt-48 transition-opacity duration-300 ${className} ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight text-slate-900 dark:text-slate-100"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false, amount: 0.5 }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false, amount: 0.35 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

function splitTitle(t) {
  const open = t.indexOf("(");
  if (open === -1) return { main: t.trim(), note: "" };
  const main = t.slice(0, open).trim();
  const inner = t.slice(open + 1).trim();
  const note = inner.endsWith(")") ? inner.slice(0, -1).trim() : inner;
  return { main, note };
}

function GeoBG() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
      <svg className="w-full h-full block dark:hidden" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="goldL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#C59A2A" />
          </linearGradient>
        </defs>
        <rect width="1440" height="720" fill="none" />
        <g opacity="0.16">
          <circle cx="240" cy="120" r="140" fill="url(#goldL)" />
          <rect x="1020" y="80" width="220" height="220" fill="#0E224E" rx="24" />
        </g>
        <g opacity="0.20">
          <polygon points="0,720 260,720 0,460" fill="#0E224E" />
          <circle cx="1240" cy="600" r="180" fill="url(#goldL)" />
        </g>
        <g opacity="0.28">
          <rect x="700" y="180" width="16" height="220" fill="url(#goldL)" rx="8" />
          <rect x="732" y="180" width="16" height="220" fill="url(#goldL)" rx="8" />
          <rect x="764" y="180" width="16" height="220" fill="url(#goldL)" rx="8" />
        </g>
      </svg>
      <svg className="w-full h-full hidden dark:block" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="goldD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CDAF4A" />
            <stop offset="100%" stopColor="#B18E2E" />
          </linearGradient>
        </defs>
        <rect width="1440" height="720" fill="none" />
        <g opacity="0.18">
          <circle cx="240" cy="120" r="140" fill="url(#goldD)" />
          <rect x="1020" y="80" width="220" height="220" fill="#1B2A49" rx="24" />
        </g>
        <g opacity="0.22">
          <polygon points="0,720 260,720 0,460" fill="#1B2A49" />
          <circle cx="1240" cy="600" r="180" fill="url(#goldD)" />
        </g>
        <g opacity="0.30">
          <rect x="700" y="180" width="16" height="220" fill="url(#goldD)" rx="8" />
          <rect x="732" y="180" width="16" height="220" fill="url(#goldD)" rx="8" />
          <rect x="764" y="180" width="16" height="220" fill="url(#goldD)" rx="8" />
        </g>
      </svg>
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={"relative " + className}>
      <div className="glass-outline" />
      <div className="glass-inner">
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

function PdfModal({ src, title, open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-black/60" onClick={onClose}>
      <div
        className="absolute inset-6 md:inset-10 bg-white dark:bg-slate-950 rounded-2xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 dark:border-slate-800/60">
          <h4 className="font-semibold text-[#002D56]">{title}</h4>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            닫기
          </button>
        </div>
        <iframe
          title={title}
          src={`${BASE}pdf-viewer.html?file=${encodeURIComponent(src)}`}
          className="w-full h-[calc(100%-52px)]"
        />
      </div>
    </div>
  );
}

function XpCard({ exp, main, note }) {
  return (
    <div className="grid grid-cols-[1fr,6rem] grid-rows-[auto,auto] gap-x-3 gap-y-2 items-start">
      <div className="col-span-2">
        <div className="font-semibold text-base md:text-lg tracking-tight text-[#002D56]">
          {main}
          {note && <span className="ml-1 text-sm font-normal text-slate-600 dark:text-slate-300">({note})</span>}
        </div>
      </div>
      <div className="row-start-2">
        <dl className="space-y-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">기간</dt>
            <dd className="text-sm text-slate-700 dark:text-slate-300">{exp.period}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">소속</dt>
            <dd className="text-sm text-slate-700 dark:text-slate-300">{exp.org}</dd>
          </div>
          {exp.bullets?.length ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">내용</dt>
              <dd>
                <ul className="mt-1 space-y-1 text-sm list-disc list-inside text-slate-700 dark:text-slate-300">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
      <div className="row-start-2 justify-self-end self-start w-24 h-24 rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-slate-100 dark:bg-slate-900/40">
        {exp.img ? (
          <img src={exp.img} alt={`${main} 이미지`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-[10px] text-slate-500 dark:text-slate-400">Image</div>
        )}
      </div>
    </div>
  );
}

/* ====== 메인 App ====== */
export default function App() {
  const [pdfViewer, setPdfViewer] = useState({ open: false, src: "", title: "" });
  const { resolvedTheme, toggle } = useTheme();
  const [revealed, setRevealed] = useState(false);
  const rafRef = useRef(null);

  const revealAndScroll = (id) => {
    if (!revealed) {
      setRevealed(true);
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
    } else {
      scrollToId(id);
    }
  };

  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    return () => (el.style.scrollBehavior = prev);
  }, []);

  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  const scrollToId = (id, duration = 1200) => {
    const section = document.getElementById(id);
    if (!section) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const header = document.querySelector("header");
    const headerH = header?.offsetHeight ?? 64;
    const anchor = section.querySelector("h2, h1, h3") || section;

    const pageTop = (node) => {
      let y = 0, n = node;
      while (n) { y += n.offsetTop || 0; n = n.offsetParent; }
      return y;
    };
    const start = window.scrollY;
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const target = Math.max(0, Math.min(Math.round(pageTop(anchor) - (headerH + 28)), maxY));
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, target);
      return;
    }
    const t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const y = start + (target - start) * ease(p);
      window.scrollTo(0, y);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const scrollToTop = (duration = 1200) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = window.scrollY;
    const target = 0;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, target);
      return;
    }
    const t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const y = start + (target - start) * ease(p);
      window.scrollTo(0, y);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const handleOpenProject = async (e, p) => {
    if (p.embed) {
      e.preventDefault();
      setPdfViewer({ open: true, src: p.link, title: p.name });
      return;
    }
    if (!p.link || p.link === "#" || p.link.startsWith("#")) {
      e.preventDefault();
      return;
    }
    if (p.link.startsWith(BASE)) {
      e.preventDefault();
      window.open(p.link, "_blank", "noopener");
    }
  };

  return (
    <div>
      <div id="top" />
      <div className="min-h-screen scroll-smooth tracking-[-0.01em]">
        {/* 헤더 */}
        <header className="sticky top-0 z-30 backdrop-blur bg-white/60 dark:bg-slate-950/60 border-b border-slate-200/50 dark:border-slate-800/60">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  setRevealed(false);
                  scrollToTop();
                }}
                className="font-bold text-lg tracking-tight transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-sm"
              >
                {PROFILE.name}
              </a>
              <span className="hidden sm:inline text-sm text-slate-500 dark:text-slate-400">· {PROFILE.role}</span>
            </div>
            <nav className="hidden md:flex items-center gap-5">
              {NAV_SECTIONS.map((s) => {
                const long = s.label.length > 14;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      revealAndScroll(s.id);
                    }}
                    className={`inline-flex items-center ${long ? "text-[13px]" : "text-sm"} px-3 py-1.5 rounded-md text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-100/60 dark:hover:bg-slate-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60`}
                  >
                    {s.label}
                  </a>
                );
              })}
              <Button variant="ghost" size="sm" onClick={toggle} aria-label={resolvedTheme === "dark" ? "라이트 모드" : "다크 모드"} className="inline-flex items-center gap-1">
                {resolvedTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="hidden sm:inline">테마</span>
              </Button>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={toggle} aria-label={resolvedTheme === "dark" ? "라이트 모드" : "다크 모드"} className="inline-flex items-center gap-1">
                {resolvedTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="hidden sm:inline">테마</span>
              </Button>
            </div>
          </div>
        </header>

        {/* 히어로 + Quick Links */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-900 min-h-[78vh] md:min-h-[82vh]">
          <GeoBG />
          <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 md:pt-28 pb-56 md:pb-72 grid grid-cols-1 md:[grid-template-columns:1.1fr_0.9fr] gap-8 items-start">
            <div className="relative">
              <div className="absolute -inset-4 md:-inset-6 rounded-[28px] bg-white/28 dark:bg-slate-800/25 backdrop-blur-3xl ring-1 ring-black/10 dark:ring-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]" />
              <div className="relative">
                <motion.h1 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  우수현 포트폴리오
                </motion.h1>
                <p className="mt-2 text-lg font-bold text-slate-700 dark:text-slate-300">Woo's Portfolio</p>
                <div className="mt-6 text-base text-slate-700 dark:text-slate-300 max-w-xl">
                  {PROFILE.summary.split(". ").map((s, i) =>
                    s ? (
                      <span key={i} className="block">
                        {s.trim()}
                        {s.trim().endsWith(".") ? "" : "."}
                      </span>
                    ) : null
                  )}
                </div>
                <div className="mt-6 grid gap-2 text-sm">
                  <div className="inline-flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <Phone className="h-4 w-4" /> {PROFILE.phone}
                  </div>
                  <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 text-slate-800 dark:text-slate-200 transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02]">
                    <Mail className="h-4 w-4" /> {PROFILE.email}
                  </a>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  {LINKS.resume && (
                    <a href={LINKS.resume} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-slate-900 border border-slate-200/60 shadow-sm hover:shadow transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02]">
                      <FileText className="h-4 w-4" /> Resume
                    </a>
                  )}
                  {LINKS.instagram && (
                    <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-slate-900 border border-slate-200/60 shadow-sm hover:shadow transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02]">
                      <Instagram className="h-4 w-4" /> Instagram
                    </a>
                  )}
                  <a href="#profile" onClick={(e) => { e.preventDefault(); revealAndScroll("profile"); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#002D56] text-white shadow transform-gpu transition-all duration-200 hover:bg-[#002D56]/90 hover:text-white hover:-translate-y-0.5 hover:scale-[1.02]">
                    Get Started <ArrowDown className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:justify-self-end self-start w-full md:w-[150px] max-w-[150px]">
              <GlassCard className="[&>div:last-child]:pb-3">
                <h3 className="font-semibold text-lg mb-2 text-[#002D56]">Quick Links</h3>
                <ul className="space-y-3">
                  {NAV_SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          revealAndScroll(s.id);
                        }}
                        className="text-base inline-flex items-center gap-2 whitespace-nowrap tracking-tight transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02]"
                      >
                        → {s.label}
                      </a>
                    </li>
                  ))}
                  <li className="flex gap-4 pt-2 text-base">
                    {LINKS.github && (
                      <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-900 dark:text-slate-100 transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02]">
                        <Github className="h-4 w-4" />GitHub
                      </a>
                    )}
                    {LINKS.linkedin && (
                      <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-900 dark:text-slate-100 transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02]">
                        <Linkedin className="h-4 w-4" />LinkedIn
                      </a>
                    )}
                  </li>
                </ul>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* 본문: 초기에는 숨김, 클릭 시 노출 */}
        <AnimatePresence>
          {revealed && (
            <motion.main initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 36 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-6xl px-4">
              <Section id="profile" title="Profile" fadeOnLeave={false} className="pt-16 md:pt-28">
                <div className="grid md:grid-cols-[1fr,2fr] gap-6 items-start">
                  <div>
                    <div className="relative w-40 h-40 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      {PROFILE.img ? (
                        <img src={PROFILE.img} alt="우수현 프로필 사진" className="w-full h-full object-cover object-top rounded-full" />
                      ) : (
                        <div className="w-full h-full grid place-items-center text-[10px] text-slate-500 dark:text-slate-400">Image</div>
                      )}
                    </div>
                  </div>
                  <div className="leading-relaxed text-slate-700 dark:text-slate-300">
                    한국외국어대학교 융합일본지역/경제학 전공. <span className="whitespace-nowrap">일본 도쿄 소재 조치대학교(上智大学, Sophia University)</span> 교환학생(2024.09–2025.01) 경험이 있으며, 학내 학회와 연합 동아리, 대외활동에서 리서치와 콘텐츠 제작을 병행했습니다.
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">자격/스킬: {QUALIFICATIONS.join(" · ")}</div>
              </Section>

              <div className="mt-10">
                <Section id="focus" title={<span className="text-[#002D56]">Focus</span>}>
                  <div className="grid md:grid-cols-3 gap-4">
                    {FOCUS.map((t, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }} viewport={{ once: true }}>
                        <Card className="shadow-sm">
                          <CardContent>
                            <h3 className="font-semibold text-[#002D56] mb-2">{t.title}</h3>
                            <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300 list-disc list-inside">
                              {t.points.map((p, idx) => (
                                <li key={idx}>{p}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </Section>
                <PdfModal open={pdfViewer.open} src={pdfViewer.src} title={pdfViewer.title} onClose={() => setPdfViewer({ open: false, src: "", title: "" })} />
              </div>

              <div className="mt-10">
                <Section id="experience" title="Career (학력·경력·활동)" showRatio={0.6}>
                  <div className="grid md:grid-cols-2 gap-4">
                    {EXPERIENCE.map((exp, i) => {
                      const { main, note } = splitTitle(exp.title);
                      return (
                        <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }} viewport={{ once: true }}>
                          <Card className="shadow-sm">
                            <CardContent>
                              <XpCard exp={exp} main={main} note={note} />
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </Section>
              </div>

              <div className="mt-10">
                <Section id="projects" title="Projects (리서치 & 노트)">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PROJECTS.map((p, i) => (
                      <motion.a
                        key={i}
                        href={p.link}
                        onClick={(e) => handleOpenProject(e, p)}
                        target="_blank"
                        rel="noreferrer"
                        className="group block"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Card className="relative h-full transform-gpu transition-all duration-300 ease-out shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01] bg-white/70 dark:bg-slate-950/40 backdrop-blur-sm">
                          <CardContent className="h-full flex flex-col">
                            <h3 className="font-semibold text-lg mb-1 flex-1 text-[#002D56]">{p.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{p.summary}</p>
                            <div className="mt-auto flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                              {p.tags.map((t) => (
                                <span key={t} className="px-2 py-1 rounded-full border border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300 group-hover:text-amber-400">
                                  {t}
                                </span>
                              ))}
                              <ExternalLink className="ml-auto h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.a>
                    ))}
                  </div>
                </Section>
              </div>

              <div className="mt-10">
                <Section id="writing" title="Writing & Publications">
                  {WRITING.length === 0 ? (
                    <div className="text-sm text-slate-600 dark:text-slate-300">업데이트 예정</div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {WRITING.map((w, i) => (
                        <motion.a key={i} href={w.link} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }} viewport={{ once: true }} className="block">
                          <Card className="hover:shadow-md transition-shadow">
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-[#002D56]">{w.title}</h3>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{w.date}</span>
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-300">{w.outlet}</div>
                            </CardContent>
                          </Card>
                        </motion.a>
                      ))}
                    </div>
                  )}
                </Section>
              </div>

              <div className="mt-10">
                <Section id="proof" title="그 외 활동 증빙 자료">
                  <div className="grid md:grid-cols-3 gap-4">
                    {CERTIFICATES.map((c, i) => (
                      <Card key={i} className="overflow-hidden">
                        {c.img ? (
                          <img src={c.img} alt={c.title} className="w-full h-64 object-cover" />
                        ) : (
                          <div className="w-full h-64 grid place-items-center text-xs text-slate-500 dark:text-slate-400">Image</div>
                        )}
                        <CardContent className="p-4 text-sm text-center text-[#002D56]">{c.title}</CardContent>
                      </Card>
                    ))}
                  </div>
                </Section>
              </div>

              <div className="mt-10">
                <Section id="service" title="병역">
                  <Card className="shadow-sm">
                    <CardContent>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="font-semibold tracking-tight text-[#002D56]">{SERVICE.branch}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{SERVICE.role}</div>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{SERVICE.period}</div>
                      </div>
                    </CardContent>
                  </Card>
                </Section>
              </div>

              <div className="mt-10 mb-16">
                <Section id="contact" title="Contact">
                  <Card>
                    <CardContent>
                      <p className="text-slate-700 dark:text-slate-300 mb-4">협업/채용/프로젝트 문의는 언제든 환영합니다. 간단한 소개와 필요 내용을 보내주세요!</p>
                      <form
                        className="grid md:grid-cols-2 gap-3"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const data = new FormData(e.currentTarget);
                          const name = data.get("name");
                          const email = data.get("email");
                          const msg = data.get("message");
                          alert(`감사합니다, ${name}! 메시지를 확인 후 회신드릴게요.\\n(${email})\\n\\n${msg}`);
                        }}
                      >
                        <input name="name" placeholder="Your name" required className="w-full rounded-xl border px-3 py-2 bg-transparent border-slate-200/60 dark:border-slate-800/60" />
                        <input name="email" type="email" placeholder="Email" required className="w-full rounded-xl border px-3 py-2 bg-transparent border-slate-200/60 dark:border-slate-800/60" />
                        <textarea name="message" placeholder="Message" required className="md:col-span-2 w-full rounded-xl border px-3 py-2 h-28 bg-transparent border-slate-200/60 dark:border-slate-800/60" />
                        <div className="md:col-span-2 flex justify-end">
                          <Button type="submit" className="rounded-2xl" variant="solid" size="md">
                            Send
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </Section>
              </div>
            </motion.main>
          )}
        </AnimatePresence>

        {/* 푸터 */}
        <footer className="py-8 border-t border-slate-200/50 dark:border-slate-800/60">
          <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-4 justify-between">
            <span>
              © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              {LINKS.github && (
                <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02]">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
              {LINKS.linkedin && (
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02]">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              )}
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 transform-gpu transition-all duration-200 hover:text-amber-400 hover:-translate-y-0.5 hover:scale-[1.02]">
                <Mail className="h-4 w-4" /> Email
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {PROFILE.location}
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* PDF 모달 */}
      <PdfModal open={pdfViewer.open} src={pdfViewer.src} title={pdfViewer.title} onClose={() => setPdfViewer({ open: false, src: "", title: "" })} />
    </div>
  );
}
