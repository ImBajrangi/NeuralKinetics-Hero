import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import {
  ANIMATION_TIMINGS,
  BRAND_NAME,
  HEADER_TAGS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  ModalPanelId,
} from '../utils/heroConfig';

interface NavbarProps {
  onOpenModal: (panel: ModalPanelId, tagLabel?: string) => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <motion.nav
      className="hero-navbar"
      aria-label="Primary Navigation"
      initial={ANIMATION_TIMINGS.navbar.initial}
      animate={ANIMATION_TIMINGS.navbar.animate}
      transition={ANIMATION_TIMINGS.navbar.transition}
    >
      {/* Left Side */}
      <div className="navbar-left">
        {/* 1. Logo: custom SVG icon (two rotated rounded rectangles at -35deg, black fill) + brand text "hardwithharsh" */}
        <a
          href="#top"
          className="brand-lockup"
          aria-label={`${BRAND_NAME} Home`}
          onClick={(e) => {
            e.preventDefault();
            onOpenModal(null);
          }}
        >
          <svg
            className="brand-logo-svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="4"
              y="7"
              width="14"
              height="5.5"
              rx="2.75"
              transform="rotate(-35 11 9.75)"
              fill="#000000"
            />
            <rect
              x="10"
              y="15.5"
              width="14"
              height="5.5"
              rx="2.75"
              transform="rotate(-35 17 18.25)"
              fill="#000000"
            />
          </svg>
          <span className="brand-text">{BRAND_NAME}</span>
        </a>

        {/* 2. Menu button: black pill with white circle containing Plus icon (size 12, strokeWidth 3) + "Menu" text (11px, white) */}
        <button
          type="button"
          className="menu-pill-btn"
          onClick={() => onOpenModal('menu')}
          aria-haspopup="dialog"
        >
          <span className="menu-circle-icon" aria-hidden="true">
            <Plus size={12} strokeWidth={3} />
          </span>
          <span className="menu-btn-label">Menu</span>
        </button>

        {/* 3. Tags pill: light gray (#F4F4F6) rounded-full container with two text labels "Advanced Bionics" and "Cognitive AI" */}
        <div className="nav-tags-pill" role="group" aria-label="Technology domains">
          {HEADER_TAGS.map((tag, index) => (
            <button
              key={tag}
              type="button"
              className={`nav-tag-item ${index === 0 ? 'nav-tag-item-first' : ''}`}
              onClick={() => onOpenModal('tag-detail', tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="navbar-right">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="insta-nav-pill"
          aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
        >
          <span className="insta-circle-icon" aria-hidden="true">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </span>
          <span className="insta-nav-label">{INSTAGRAM_HANDLE}</span>
        </a>

        <button
          type="button"
          className="adaptive-pill"
          onClick={() => onOpenModal('adaptive-systems')}
          aria-label="Adaptive Systems"
          aria-haspopup="dialog"
        >
          <span className="adaptive-circle-btn" aria-hidden="true">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3.25" cy="3.25" r="1.35" fill="#FFFFFF" />
              <circle cx="8.75" cy="3.25" r="1.35" fill="#FFFFFF" />
              <circle cx="3.25" cy="8.75" r="1.35" fill="#FFFFFF" />
              <circle cx="8.75" cy="8.75" r="1.35" fill="#FFFFFF" />
            </svg>
          </span>
          <span className="adaptive-label">Adaptive Systems</span>
        </button>
      </div>
    </motion.nav>
  );
}
