'use client';

import { useEffect, useState } from 'react';

const SplitText = ({ text, colorShadow = false }: { text: string; colorShadow?: boolean }) => {
  return (
    <>
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} className="gap"> </span>
        ) : (
          <span key={i} className={colorShadow ? 'color-shadow' : ''}>
            {char}
          </span>
        )
      )}
    </>
  );
};

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => setVisible(false), 1500);
  };

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className={`intro${fadeOut ? ' fade-out' : ''}`} onClick={handleClose}>
        <div className="intro-content">

          {/* 1줄: 서울이건치과 (대형, 블루) */}
          <div className="intro-line">
            <SplitText text="서울이건치과" colorShadow={true} />
          </div>

          {/* 2줄: 마음을 담아 정성을 다하여 (소형, 흰색) */}
          <div className="intro-line mini">
            <SplitText text="마음을 담아 정성을 다하여" colorShadow={false} />
          </div>

          {/* 3줄: 서울대 출신 2인 대표원장 (소형, 블루) */}
          <div className="intro-line mini">
            <SplitText text="서울대 출신 2인 대표원장" colorShadow={true} />
          </div>

        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-9Black.woff2') format('woff2');
          font-weight: 900;
          font-display: swap;
        }

        .intro {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100vh;
          background-color: #000;
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          opacity: 1;
          transition: opacity 1.5s;
          cursor: pointer;
        }
        .intro.fade-out { opacity: 0; }

        .intro-content {
          text-align: center;
          color: rgba(255, 255, 255, 0.2);
          font-family: 'Paperozi', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 1vh;
        }

        .intro-line {
          font-size: 7vw;
          line-height: 1.2;
          display: flex;
          justify-content: center;
          overflow: hidden;
          letter-spacing: 0;
        }
        .intro-line.mini {
          font-size: 4vw;
        }

        /* 기본 흰색 글자 */
        .intro-line span {
          display: inline-block;
          font-weight: 900;
          animation: popUp 1.5s ease forwards;
          text-shadow: #ffffff 0px 9vw 0px;
        }
        .intro-line.mini span {
          text-shadow: #ffffff 0px 5vw 0px;
        }
        .intro-line span.gap {
          text-shadow: none;
          min-width: 0.4em;
        }

        /* 블루 강조 #0080C8 */
        .intro-line span.color-shadow {
          text-shadow: #0080C8 0px 9vw 0px;
        }
        .intro-line.mini span.color-shadow {
          text-shadow: #0080C8 0px 5vw 0px;
        }

        @keyframes popUp {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-100%); }
        }

        .intro-line span:nth-child(1)  { animation-delay: 0.50s; }
        .intro-line span:nth-child(2)  { animation-delay: 0.55s; }
        .intro-line span:nth-child(3)  { animation-delay: 0.60s; }
        .intro-line span:nth-child(4)  { animation-delay: 0.65s; }
        .intro-line span:nth-child(5)  { animation-delay: 0.70s; }
        .intro-line span:nth-child(6)  { animation-delay: 0.75s; }
        .intro-line span:nth-child(7)  { animation-delay: 0.85s; }
        .intro-line span:nth-child(8)  { animation-delay: 0.90s; }
        .intro-line span:nth-child(9)  { animation-delay: 0.95s; }
        .intro-line span:nth-child(10) { animation-delay: 1.00s; }
        .intro-line span:nth-child(11) { animation-delay: 1.05s; }
        .intro-line span:nth-child(12) { animation-delay: 1.10s; }
        .intro-line span:nth-child(13) { animation-delay: 1.15s; }
        .intro-line span:nth-child(14) { animation-delay: 1.20s; }
        .intro-line span:nth-child(15) { animation-delay: 1.25s; }
        .intro-line span:nth-child(16) { animation-delay: 1.30s; }

        @media (max-width: 992px) {
          .intro-line       { font-size: 10vw; }
          .intro-line.mini  { font-size: 6vw; }
          .intro-line span  { text-shadow: #ffffff 0px 12vw 0px; }
          .intro-line span.color-shadow { text-shadow: #0080C8 0px 12vw 0px; }
          .intro-line.mini span { text-shadow: #ffffff 0px 7vw 0px; }
          .intro-line.mini span.color-shadow { text-shadow: #0080C8 0px 7vw 0px; }

          .intro-line span:nth-child(1)  { animation-delay: 0.333s; }
          .intro-line span:nth-child(2)  { animation-delay: 0.366s; }
          .intro-line span:nth-child(3)  { animation-delay: 0.400s; }
          .intro-line span:nth-child(4)  { animation-delay: 0.433s; }
          .intro-line span:nth-child(5)  { animation-delay: 0.466s; }
          .intro-line span:nth-child(6)  { animation-delay: 0.500s; }
          .intro-line span:nth-child(7)  { animation-delay: 0.566s; }
          .intro-line span:nth-child(8)  { animation-delay: 0.600s; }
          .intro-line span:nth-child(9)  { animation-delay: 0.633s; }
          .intro-line span:nth-child(10) { animation-delay: 0.666s; }
          .intro-line span:nth-child(11) { animation-delay: 0.700s; }
          .intro-line span:nth-child(12) { animation-delay: 0.733s; }
          .intro-line span:nth-child(13) { animation-delay: 0.766s; }
          .intro-line span:nth-child(14) { animation-delay: 0.800s; }
          .intro-line span:nth-child(15) { animation-delay: 0.833s; }
          .intro-line span:nth-child(16) { animation-delay: 0.866s; }
        }
      `}</style>
    </>
  );
}