/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { InfoModal } from './components/InfoModal';
import {
  ANIMATION_TIMINGS,
  FOOTER_TAGS,
  HERO_VIDEO_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  ModalPanelId,
} from './utils/heroConfig';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalPanelId>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleOpenModal = (panel: ModalPanelId, tagLabel?: string) => {
    setSelectedTag(tagLabel ?? null);
    setActiveModal(panel);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedTag(null);
  };

  return (
    <main className="hero-page" id="top" data-focus-fallback>
      {/* Fixed Navbar at top (z-index 50) */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Top layout spacer for flex space-between */}
      <div className="hero-top-spacer" aria-hidden="true" />

      {/* Absolutely positioned full-screen video behind everything (z-index 0) */}
      <div className="hero-video-stage">
        <motion.div
          className="hero-video-wrapper"
          initial={ANIMATION_TIMINGS.video.initial}
          animate={ANIMATION_TIMINGS.video.animate}
          transition={ANIMATION_TIMINGS.video.transition}
        >
          <video
            className="hero-video"
            src={HERO_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </div>

      {/* Footer content pinned to bottom (z-index 30) with white gradient fade-up background */}
      <motion.footer
        className="hero-footer"
        initial={ANIMATION_TIMINGS.footerWrapper.initial}
        animate={ANIMATION_TIMINGS.footerWrapper.animate}
        transition={ANIMATION_TIMINGS.footerWrapper.transition}
      >
        <div className="hero-footer-inner">
          {/* Left Block */}
          <div className="footer-left-block">
            {/* 1. Subtitle line: small black dot (8px circle) + "Best digital banking card 2026" (13px, 55% opacity black) */}
            <motion.div
              className="hero-subtitle-row"
              initial={ANIMATION_TIMINGS.subtitle.initial}
              animate={ANIMATION_TIMINGS.subtitle.animate}
              transition={ANIMATION_TIMINGS.subtitle.transition}
            >
              <span className="hero-subtitle-dot" aria-hidden="true" />
              <span className="hero-subtitle-text">
                Best digital banking card 2026
              </span>
            </motion.div>

            {/* 2. Heading: "One Card, Zero / Limits. Worldwide." on two lines */}
            <motion.h1
              className="hero-heading"
              initial={ANIMATION_TIMINGS.heading.initial}
              animate={ANIMATION_TIMINGS.heading.animate}
              transition={ANIMATION_TIMINGS.heading.transition}
            >
              One Card, Zero{' '}
              <br />
              Limits. Worldwide.
            </motion.h1>

            {/* 3. Two buttons: "See Features" and "How It Works" */}
            <motion.div
              className="hero-buttons-row"
              initial={ANIMATION_TIMINGS.buttons.initial}
              animate={ANIMATION_TIMINGS.buttons.animate}
              transition={ANIMATION_TIMINGS.buttons.transition}
            >
              <button
                type="button"
                className="btn-primary-pill"
                onClick={() => handleOpenModal('features')}
                aria-haspopup="dialog"
              >
                See Features
              </button>
              <button
                type="button"
                className="btn-secondary-pill"
                onClick={() => handleOpenModal('how-it-works')}
                aria-haspopup="dialog"
              >
                How It Works
              </button>
            </motion.div>
          </div>

          {/* Right Block: Three tag pills "Neuromorphic", "AGI", "Cybernetics" + Instagram link */}
          <div className="footer-right-tags" role="group" aria-label="Core capabilities">
            {FOOTER_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className="footer-tag-pill"
                onClick={() => handleOpenModal('tag-detail', tag)}
              >
                {tag}
              </button>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-tag-pill footer-insta-pill"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </motion.footer>

      {/* Interactive Modal Sheet for Menu, Features, How It Works, and Tags */}
      <InfoModal
        activeModal={activeModal}
        selectedTag={selectedTag}
        onClose={handleCloseModal}
        onSwitchModal={handleOpenModal}
      />
    </main>
  );
}
