import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BRAND_NAME,
  CARD_FEATURES,
  HOW_IT_WORKS_STEPS,
  HERO_EASE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  ModalPanelId,
  getTagDetail,
} from '../utils/heroConfig';

interface InfoModalProps {
  activeModal: ModalPanelId;
  selectedTag: string | null;
  onClose: () => void;
  onSwitchModal: (panel: ModalPanelId, tagLabel?: string) => void;
}

export function InfoModal({
  activeModal,
  selectedTag,
  onClose,
  onSwitchModal,
}: InfoModalProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const getTabbableElements = (container: HTMLElement | null): HTMLElement[] => {
    if (!container) return [];
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => {
        const style = window.getComputedStyle(el);
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          (el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0)
        );
      }
    );
  };

  useEffect(() => {
    if (activeModal) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      const timer = window.setTimeout(() => {
        const tabbables = getTabbableElements(dialogRef.current);
        if (tabbables.length > 0) {
          tabbables[0].focus();
        }
      }, 20);
      return () => window.clearTimeout(timer);
    } else if (triggerRef.current) {
      if (
        document.body.contains(triggerRef.current) &&
        !(triggerRef.current as HTMLButtonElement).disabled
      ) {
        triggerRef.current.focus();
      } else {
        const fallback = document.querySelector<HTMLElement>(
          '[data-focus-fallback], main, #root'
        );
        if (fallback) {
          if (fallback.getAttribute('tabindex') === null) {
            fallback.setAttribute('tabindex', '-1');
          }
          fallback.focus();
        }
      }
    }
  }, [activeModal]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key === 'Tab') {
      const nodes = getTabbableElements(dialogRef.current);
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  };

  const tagDetail = selectedTag ? getTagDetail(selectedTag) : null;

  const getDialogTitle = () => {
    switch (activeModal) {
      case 'menu':
        return `${BRAND_NAME} Navigation`;
      case 'adaptive-systems':
        return 'Adaptive Systems Architecture';
      case 'features':
        return 'Worldwide Card Features';
      case 'how-it-works':
        return `How ${BRAND_NAME} Works`;
      case 'tag-detail':
        return tagDetail ? tagDetail.label : 'Technology Specification';
      default:
        return 'Details';
    }
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: HERO_EASE }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="modal-sheet"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: HERO_EASE }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            <div className="modal-header">
              <div className="modal-kicker-row">
                <span className="modal-dot" aria-hidden="true" />
                <span className="modal-kicker-text">{BRAND_NAME} · 2026 Release</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close dialog"
              >
                Close
              </button>
            </div>

            <h2 id="modal-title" className="modal-heading">
              {getDialogTitle()}
            </h2>

            {activeModal === 'menu' && (
              <div className="modal-body">
                <p className="modal-description">
                  Explore {BRAND_NAME} zero-limit global banking, biometric card hardware,
                  and autonomous FX routing.
                </p>
                <div className="modal-menu-list">
                  <button
                    type="button"
                    className="modal-menu-item"
                    onClick={() => onSwitchModal('features')}
                  >
                    <span>01. Worldwide Card Features</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <button
                    type="button"
                    className="modal-menu-item"
                    onClick={() => onSwitchModal('how-it-works')}
                  >
                    <span>02. How It Works</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <button
                    type="button"
                    className="modal-menu-item"
                    onClick={() => onSwitchModal('adaptive-systems')}
                  >
                    <span>03. Adaptive Systems Telemetry</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-menu-item modal-menu-link"
                  >
                    <span>04. Instagram ({INSTAGRAM_HANDLE})</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            )}

            {activeModal === 'features' && (
              <div className="modal-body">
                <div className="modal-feature-grid">
                  {CARD_FEATURES.map((feat) => (
                    <div key={feat.id} className="modal-feature-card">
                      <div className="modal-feature-top">
                        <h3 className="modal-feature-title">{feat.title}</h3>
                        <span className="modal-feature-metric">{feat.metric}</span>
                      </div>
                      <p className="modal-feature-desc">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'how-it-works' && (
              <div className="modal-body">
                <div className="modal-feature-grid">
                  {HOW_IT_WORKS_STEPS.map((item) => (
                    <div key={item.step} className="modal-feature-card">
                      <div className="modal-feature-top">
                        <h3 className="modal-feature-title">
                          {item.step}. {item.title}
                        </h3>
                      </div>
                      <p className="modal-feature-desc">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'adaptive-systems' && (
              <div className="modal-body">
                <p className="modal-description">
                  Real-time cognitive routing links neuromorphic card hardware with global
                  liquidity pools across 190+ jurisdictions.
                </p>
                <div className="modal-metrics-row">
                  <div className="modal-metric-box">
                    <span className="modal-metric-value">0.00%</span>
                    <span className="modal-metric-label">Interbank FX Spread</span>
                  </div>
                  <div className="modal-metric-box">
                    <span className="modal-metric-value">14 ms</span>
                    <span className="modal-metric-label">Settlement Latency</span>
                  </div>
                  <div className="modal-metric-box">
                    <span className="modal-metric-value">190+</span>
                    <span className="modal-metric-label">Supported Countries</span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'tag-detail' && tagDetail && (
              <div className="modal-body">
                <p className="modal-description">{tagDetail.summary}</p>
                <div className="modal-metrics-row">
                  {tagDetail.metrics.map((m) => (
                    <div key={m.label} className="modal-metric-box">
                      <span className="modal-metric-value">{m.value}</span>
                      <span className="modal-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
