/**
 * templateUtils.js
 *
 * [빈칸이름] 형태의 템플릿 문자열을 완성된 문장으로 치환하는 유틸.
 * browser(<script> 전역)와 Node.js(require) 양쪽에서 사용 가능.
 *
 * 의존: 없음 (순수 함수, 외부 의존 없음)
 */

/**
 * 템플릿 문자열의 [빈칸이름] 자리를 selectedValues(또는 blanks의 첫 번째 값)으로 치환한다.
 *
 * @param {string} template
 *   '[시점]에 [시간] 동안 복식호흡 하기' 형태의 문자열.
 *   빈칸이 없으면 그대로 반환.
 * @param {Object.<string, string[]>} blanks
 *   { 시점: ['아침에', '자기 전에'], 시간: ['1분', '3분'] } 형태.
 *   키가 template의 [빈칸이름]과 일치해야 함.
 * @param {Object.<string, string>} [selectedValues={}]
 *   { 시점: '아침에', 시간: '3분' } 형태.
 *   키가 없으면 blanks의 첫 번째 값을 기본값으로 사용.
 * @returns {{ text: string, blankKeys: string[] }}
 *   text: 완성된 문장 (빈칸 없음)
 *   blankKeys: template에 등장한 빈칸 이름 배열 (등장 순서)
 */
function renderTemplate(template, blanks, selectedValues) {
  if (typeof template !== 'string') throw new TypeError('template must be a string');
  const safeSelected = selectedValues != null ? selectedValues : {};
  const safeBlanks   = blanks   != null ? blanks   : {};

  const blankKeys = [];
  const seen = new Set();

  const text = template.replace(/\[([^\]]+)\]/g, (_, key) => {
    if (!seen.has(key)) { blankKeys.push(key); seen.add(key); }
    if (key in safeSelected) return safeSelected[key];
    const options = safeBlanks[key];
    if (Array.isArray(options) && options.length > 0) return options[0];
    return `[${key}]`; // blanks에도 없으면 원문 유지
  });

  return { text, blankKeys };
}

// Node.js 환경에서 require() 가능하게, browser에서는 무시됨
if (typeof module !== 'undefined') module.exports = { renderTemplate };
