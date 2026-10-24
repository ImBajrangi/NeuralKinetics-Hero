import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BRAND_NAME,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  HERO_VIDEO_URL,
  HERO_EASE,
  ANIMATION_TIMINGS,
  HEADER_TAGS,
  FOOTER_TAGS,
  getTagDetail,
  isValidAnimationSequence,
} from './heroConfig.ts';

test('brand name and instagram link match hardwithharsh specification', () => {
  assert.equal(BRAND_NAME, 'hardwithharsh');
  assert.equal(INSTAGRAM_HANDLE, '@hardwithharsh');
  assert.equal(INSTAGRAM_URL, 'https://www.instagram.com/hardwithharsh/');
});

test('hero configuration matches required video URL and easing curve', () => {
  assert.equal(
    HERO_VIDEO_URL,
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'
  );
  assert.deepEqual(HERO_EASE, [0.16, 1, 0.3, 1]);
});

test('header and footer tags match specification', () => {
  assert.deepEqual(HEADER_TAGS, ['Advanced Bionics', 'Cognitive AI']);
  assert.deepEqual(FOOTER_TAGS, ['Neuromorphic', 'AGI', 'Cybernetics']);
});

test('animation stagger delays follow strict ascending order', () => {
  assert.equal(isValidAnimationSequence(), true);
  assert.equal(ANIMATION_TIMINGS.navbar.transition.duration, 0.8);
  assert.equal(ANIMATION_TIMINGS.video.transition.duration, 1.8);
  assert.equal(ANIMATION_TIMINGS.footerWrapper.transition.delay, 0.5);
  assert.equal(ANIMATION_TIMINGS.subtitle.transition.delay, 0.6);
  assert.equal(ANIMATION_TIMINGS.heading.transition.delay, 0.8);
  assert.equal(ANIMATION_TIMINGS.buttons.transition.delay, 1.0);
});

test('getTagDetail resolves details for all header and footer tags', () => {
  for (const tag of [...HEADER_TAGS, ...FOOTER_TAGS]) {
    const detail = getTagDetail(tag);
    assert.ok(detail, `Expected detail for ${tag}`);
    assert.equal(detail.label, tag);
    assert.ok(detail.metrics.length >= 2);
  }
  assert.equal(getTagDetail('NonExistentTag'), null);
});
