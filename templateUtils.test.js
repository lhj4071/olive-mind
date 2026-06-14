/**
 * templateUtils.test.js — renderTemplate 단위 테스트
 * 실행: node templateUtils.test.js
 *
 * 템플릿 패턴 규칙:
 *   [빈칸이름] 뒤에 조사(에, 을, 로 등)를 붙이지 말 것.
 *   조사는 빈칸 선택지 값에 포함시킬 것.
 *   ✅ template: '[시점] [시간] 동안 호흡하기', blanks: { 시점: ['아침에', '자기 전에'] }
 *   ❌ template: '[시점]에 [시간] 동안 호흡하기', blanks: { 시점: ['아침에', '자기 전에'] }
 *      → '아침에에 ...' 이중 조사 발생
 */
const { renderTemplate } = require('./templateUtils');

// ── 미니 테스트 프레임워크 ──────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function assert(description, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    console.log(`  ✅ ${description}`);
    passed++;
  } else {
    console.error(`  ❌ ${description}`);
    console.error(`     expected: ${JSON.stringify(expected)}`);
    console.error(`     actual  : ${JSON.stringify(actual)}`);
    failed++;
  }
}

function assertThrows(description, fn, expectedMessage) {
  try {
    fn();
    console.error(`  ❌ ${description} — 예외가 발생하지 않음`);
    failed++;
  } catch (e) {
    if (!expectedMessage || e.message.includes(expectedMessage)) {
      console.log(`  ✅ ${description}`);
      passed++;
    } else {
      console.error(`  ❌ ${description} — 예외 메시지 불일치: ${e.message}`);
      failed++;
    }
  }
}

// ── 케이스 1: 빈칸 없는 템플릿 ────────────────────────────────────────────────
console.log('\n[1] 빈칸 없는 템플릿');

assert(
  'blanks/selectedValues 모두 없어도 text 그대로 반환',
  renderTemplate('오늘 하루도 수고했어', {}, {}),
  { text: '오늘 하루도 수고했어', blankKeys: [] }
);

assert(
  'blanks/selectedValues를 null로 줘도 동작',
  renderTemplate('오늘 하루도 수고했어', null, null),
  { text: '오늘 하루도 수고했어', blankKeys: [] }
);

// ── 케이스 2: 빈칸 1개 ────────────────────────────────────────────────────────
// 조사는 값에 포함. template에 [시점] 뒤에 조사를 붙이지 않음.
console.log('\n[2] 빈칸 1개');

const t1 = '[시점] 가족에게 짧게 인사하기';
const b1 = { 시점: ['아침에', '자기 전에', '하루에 한 번'] };

assert(
  'selectedValues 있으면 해당 값 사용',
  renderTemplate(t1, b1, { 시점: '자기 전에' }),
  { text: '자기 전에 가족에게 짧게 인사하기', blankKeys: ['시점'] }
);

assert(
  'selectedValues 없으면 blanks 첫 번째 값 사용',
  renderTemplate(t1, b1, {}),
  { text: '아침에 가족에게 짧게 인사하기', blankKeys: ['시점'] }
);

assert(
  'selectedValues 자체를 생략(undefined)해도 첫 번째 값 사용',
  renderTemplate(t1, b1, undefined),
  { text: '아침에 가족에게 짧게 인사하기', blankKeys: ['시점'] }
);

// ── 케이스 3: 빈칸 2개 ────────────────────────────────────────────────────────
// 조사는 값에 포함.
console.log('\n[3] 빈칸 2개');

const t2 = '[시점] [시간] 동안 복식호흡 하기';
const b2 = { 시점: ['아침에', '자기 전에'], 시간: ['1분', '3분', '5분'] };

assert(
  'selectedValues 모두 있으면 모두 치환',
  renderTemplate(t2, b2, { 시점: '자기 전에', 시간: '5분' }),
  { text: '자기 전에 5분 동안 복식호흡 하기', blankKeys: ['시점', '시간'] }
);

assert(
  'blankKeys는 template 등장 순서',
  renderTemplate(t2, b2, { 시점: '아침에', 시간: '3분' }).blankKeys,
  ['시점', '시간']
);

// ── 케이스 4: selectedValues 일부만 주어진 경우 ───────────────────────────────
console.log('\n[4] selectedValues 일부만');

assert(
  '주어진 키는 해당 값, 없는 키는 blanks 첫 번째 값',
  renderTemplate(t2, b2, { 시간: '3분' }),
  { text: '아침에 3분 동안 복식호흡 하기', blankKeys: ['시점', '시간'] }
);

assert(
  '반대쪽 키만 있는 경우',
  renderTemplate(t2, b2, { 시점: '자기 전에' }),
  { text: '자기 전에 1분 동안 복식호흡 하기', blankKeys: ['시점', '시간'] }
);

// ── 케이스 5: selectedValues 전혀 없는 경우 ──────────────────────────────────
console.log('\n[5] selectedValues 전혀 없음');

assert(
  '빈칸 2개 모두 blanks 첫 번째 값으로 채움',
  renderTemplate(t2, b2, {}),
  { text: '아침에 1분 동안 복식호흡 하기', blankKeys: ['시점', '시간'] }
);

// ── 케이스 6: blanks에 없는 키가 template에 있는 경우 ─────────────────────────
console.log('\n[6] blanks에 정의되지 않은 빈칸');

assert(
  'blanks에 없는 키는 [키이름] 원문 그대로 유지',
  renderTemplate('[장소] 가기', {}, {}),
  { text: '[장소] 가기', blankKeys: ['장소'] }
);

// ── 케이스 7: 같은 빈칸 이름이 template에 두 번 나오는 경우 ───────────────────
console.log('\n[7] 같은 빈칸이 두 번 등장');

assert(
  '같은 키 두 번 모두 치환, blankKeys에는 한 번만 등장',
  renderTemplate('[방법] 써보고, [방법] 유지하기', { 방법: ['호흡법'] }, {}),
  { text: '호흡법 써보고, 호흡법 유지하기', blankKeys: ['방법'] }
);

// ── 케이스 8: selectedValues가 blanks 선택지에 없는 임의 값인 경우 ─────────────
console.log('\n[8] selectedValues에 blanks 선택지 외 임의 값');

assert(
  '선택지 외 임의 값이어도 그대로 사용',
  renderTemplate('[시점] 산책하기', { 시점: ['아침에'] }, { 시점: '점심에' }),
  { text: '점심에 산책하기', blankKeys: ['시점'] }
);

// ── 케이스 9: blanks 배열이 비어 있는 키 ─────────────────────────────────────
console.log('\n[9] blanks 배열이 빈 배열인 경우');

assert(
  '빈 배열이면 [키이름] 원문 유지',
  renderTemplate('[대상] 연락하기', { 대상: [] }, {}),
  { text: '[대상] 연락하기', blankKeys: ['대상'] }
);

// ── 케이스 10: 잘못된 인수 ───────────────────────────────────────────────────
console.log('\n[10] 잘못된 인수');

assertThrows(
  'template이 null이면 TypeError',
  () => renderTemplate(null, {}, {}),
  'template must be a string'
);

assertThrows(
  'template이 숫자여도 TypeError',
  () => renderTemplate(42, {}, {}),
  'template must be a string'
);

// ── 결과 ─────────────────────────────────────────────────────────────────────
console.log(`\n=== 결과: ${passed} 통과 / ${failed} 실패 ===\n`);
if (failed > 0) process.exit(1);
