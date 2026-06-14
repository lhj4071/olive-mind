/**
 * goalData.js  (v2 — 하위카테고리 기반 구조)
 * 기존 구조는 goalData.legacy.js 에 보존되어 있음.
 *
 * current_states  : { domain: { subcategory: StateItem[] } }
 * goals           : { stateId: { domain, ladder: LadderItem[] } }
 * routines        : { stateId: RoutineItem[] }   ← goal_id 아닌 state_id 단위로 관리
 */

// ── 제약 조건 상수 ─────────────────────────────────────────────────────────────

const GOAL_CONSTRAINTS = {
  MAX_GOALS_PER_DOMAIN: 3,
  MAX_ROUTINES_TOTAL:   5,
};

// ── 전체 데이터 ────────────────────────────────────────────────────────────────

const goalData = {

  // 2.1 영역 및 하위카테고리
  domains: ['symptom', 'function', 'relation', 'meaning'],

  domain_labels: {
    symptom:  '증상',
    function: '기능',
    relation: '관계',
    meaning:  '의미',
  },

  subcategories: {
    symptom: [
      { id: 'mood',      label: '기분 / 감정' },
      { id: 'anxiety',   label: '불안 / 두려움' },
      { id: 'sleep',     label: '수면' },
      { id: 'cognition', label: '생각 / 집중' },
      { id: 'physical',  label: '신체 증상' },
      { id: 'impulse',   label: '감정 조절 / 충동' },
    ],
    function: [
      { id: 'daily_routine', label: '일상 루틴' },
      { id: 'work_study',    label: '직업 / 학업' },
      { id: 'household',     label: '집안일 / 책임' },
      { id: 'self_care',     label: '자기관리' },
    ],
    relation: [
      { id: 'family',      label: '가족' },
      { id: 'friend',      label: '친구' },
      { id: 'partner',     label: '연인 / 배우자' },
      { id: 'work_social', label: '직장 / 사회생활' },
      { id: 'isolation',   label: '전반적인 고립감' },
    ],
    meaning: [
      { id: 'direction', label: '삶의 의미 / 방향' },
      { id: 'identity',  label: '자기 이해 / 정체성' },
      { id: 'enjoyment', label: '즐거움 / 취미' },
      { id: 'autonomy',  label: '주체성 / 자율성' },
    ],
  },

  // ── 2.2 현재의 어려움 ───────────────────────────────────────────────────────
  // 구조: current_states[domain][subcategory] = StateItem[]
  // 각 StateItem: { id, subcategory, text, situational_tags, is_custom? }

  current_states: {

    symptom: {
      // ── 예시 A 완성 ──────────────────────────────────────────────────────────
      anxiety: [
        {
          id: 's_anxiety_1',
          subcategory: 'anxiety',
          text: '별일 없어도 가슴이 조이고, 곧 안 좋은 일이 생길 것 같은 느낌이 든다',
          situational_tags: [],
        },
        {
          id: 's_anxiety_2',
          subcategory: 'anxiety',
          text: '지하철, 엘리베이터, 사람 많은 곳에 가면 심장이 빨라지고 그 자리를 벗어나고 싶어진다',
          situational_tags: ['subway', 'crowd'],
        },
        {
          id: 's_anxiety_3',
          subcategory: 'anxiety',
          text: '잠들기 전에 안 좋은 일들이 자꾸 떠올라서 마음이 가라앉지 않는다',
          situational_tags: ['bedtime'],
        },
        {
          id: 's_anxiety_4',
          subcategory: 'anxiety',
          text: '누군가 나를 안 좋게 평가할까봐 사람들과 있을 때 늘 긴장하게 된다',
          situational_tags: ['social'],
        },
        {
          id: 's_anxiety_custom',
          subcategory: 'anxiety',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── symptom > mood ───────────────────────────────────────────────────────
      mood: [
        {
          id: 's_mood_1',
          subcategory: 'mood',
          text: '아침에 눈을 떴을 때 이미 기분이 가라앉아 있고, 하루를 시작할 의욕이 없다',
          situational_tags: ['morning'],
        },
        {
          id: 's_mood_2',
          subcategory: 'mood',
          text: '특별한 이유도 없는데 갑자기 눈물이 나고, 왜 우는지 설명하기가 어렵다',
          situational_tags: [],
        },
        {
          id: 's_mood_3',
          subcategory: 'mood',
          text: '예전엔 즐거웠던 일들이 지금은 아무 느낌이 없고, 하고 싶은 것 자체가 없어졌다',
          situational_tags: [],
        },
        {
          id: 's_mood_4',
          subcategory: 'mood',
          text: '기분이 너무 자주 바뀌어서, 아침엔 괜찮았다가 저녁엔 완전히 무너지는 날이 많다',
          situational_tags: [],
        },
        {
          id: 's_mood_custom',
          subcategory: 'mood',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── symptom > sleep ──────────────────────────────────────────────────────
      sleep: [
        {
          id: 's_sleep_1',
          subcategory: 'sleep',
          text: '누워도 한 시간 넘게 잠이 안 오고, 천장만 보다가 새벽이 되는 날이 많다',
          situational_tags: ['bedtime'],
        },
        {
          id: 's_sleep_2',
          subcategory: 'sleep',
          text: '새벽에 자꾸 깨고, 한 번 깨면 다시 잠들기까지 너무 오래 걸린다',
          situational_tags: ['night_wake'],
        },
        {
          id: 's_sleep_3',
          subcategory: 'sleep',
          text: '많이 잔 것 같은데도 일어나면 몸이 무겁고 전혀 쉰 것 같지 않다',
          situational_tags: ['morning'],
        },
        {
          id: 's_sleep_4',
          subcategory: 'sleep',
          text: '주말에 몰아서 자거나 낮잠을 자다 보니 밤에 더 잠이 안 오는 것 같다',
          situational_tags: [],
        },
        {
          id: 's_sleep_custom',
          subcategory: 'sleep',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── symptom > cognition ──────────────────────────────────────────────────
      cognition: [
        {
          id: 's_cognition_1',
          subcategory: 'cognition',
          text: '책이나 업무 자료를 읽어도 내용이 머릿속에 들어오지 않고, 같은 줄을 여러 번 읽게 된다',
          situational_tags: ['reading', 'work'],
        },
        {
          id: 's_cognition_2',
          subcategory: 'cognition',
          text: '무언가를 시작하려고 앉아 있는데 머릿속이 멍하고, 손이 움직이지 않는다',
          situational_tags: ['work'],
        },
        {
          id: 's_cognition_3',
          subcategory: 'cognition',
          text: '대화 중에 방금 들은 말이 기억나지 않거나, 상대방 말을 따라가기가 힘들다',
          situational_tags: ['social'],
        },
        {
          id: 's_cognition_4',
          subcategory: 'cognition',
          text: '부정적인 생각이 머릿속에서 빙글빙글 돌고, 스스로 생각을 멈추기가 어렵다',
          situational_tags: [],
        },
        {
          id: 's_cognition_custom',
          subcategory: 'cognition',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── symptom > physical ───────────────────────────────────────────────────
      physical: [
        {
          id: 's_physical_1',
          subcategory: 'physical',
          text: '특별히 무리하지 않았는데도 몸이 항상 무겁고, 조금만 움직여도 금방 지치는 느낌이다',
          situational_tags: [],
        },
        {
          id: 's_physical_2',
          subcategory: 'physical',
          text: '머리가 자주 아프거나 목·어깨가 굳어 있고, 통증이 하루 종일 배경처럼 깔려 있다',
          situational_tags: [],
        },
        {
          id: 's_physical_3',
          subcategory: 'physical',
          text: '식욕이 없어서 밥을 억지로 먹거나, 반대로 스트레스를 받으면 먹는 것을 멈추기가 어렵다',
          situational_tags: ['mealtime'],
        },
        {
          id: 's_physical_4',
          subcategory: 'physical',
          text: '가슴이 답답하거나 숨이 얕게 쉬어지는 느낌이 하루에도 여러 번 찾아온다',
          situational_tags: [],
        },
        {
          id: 's_physical_custom',
          subcategory: 'physical',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── symptom > impulse ───────────────────────────────────────────────────
      impulse: [
        {
          id: 's_impulse_1',
          subcategory: 'impulse',
          text: '화가 치밀어오르면 소리를 지르거나 물건을 던지는 등 행동이 나도 모르게 먼저 나온다',
          situational_tags: [],
        },
        {
          id: 's_impulse_2',
          subcategory: 'impulse',
          text: '기분이 나쁠 때 음식·술·쇼핑 등으로 빠져들고 나중에 후회한다',
          situational_tags: [],
        },
        {
          id: 's_impulse_3',
          subcategory: 'impulse',
          text: '가까운 사람과 갈등이 생기면 상처 주는 말이 먼저 나오고 나서야 후회하게 된다',
          situational_tags: ['social'],
        },
        {
          id: 's_impulse_4',
          subcategory: 'impulse',
          text: '감정이 올라올 때 참아야 한다는 걸 알면서도 몸이 먼저 움직인다',
          situational_tags: [],
        },
        {
          id: 's_impulse_custom',
          subcategory: 'impulse',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],
    },

    function: {
      // ── function > daily_routine ─────────────────────────────────────────────
      daily_routine: [
        {
          id: 'f_daily_1',
          subcategory: 'daily_routine',
          text: '아침에 알람을 여러 번 끄고, 일어나야 하는 시간보다 한두 시간 늦게 겨우 몸을 일으킨다',
          situational_tags: ['morning'],
        },
        {
          id: 'f_daily_2',
          subcategory: 'daily_routine',
          text: '씻거나 밥 먹는 것처럼 기본적인 것도 "나중에"라고 미루다가 결국 못 하는 날이 많다',
          situational_tags: [],
        },
        {
          id: 'f_daily_3',
          subcategory: 'daily_routine',
          text: '자야 하는데도 핸드폰을 보다가 새벽까지 깨어 있고, 다음 날 후회한다',
          situational_tags: ['bedtime'],
        },
        {
          id: 'f_daily_4',
          subcategory: 'daily_routine',
          text: '하루 계획을 세워도 오전부터 흐트러지고, 아무것도 안 한 것 같은 느낌으로 하루가 끝난다',
          situational_tags: [],
        },
        {
          id: 'f_daily_custom',
          subcategory: 'daily_routine',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── function > work_study ────────────────────────────────────────────────
      work_study: [
        {
          id: 'f_work_1',
          subcategory: 'work_study',
          text: '업무나 공부를 시작해도 금방 핸드폰을 켜거나 딴것을 찾게 되고, 정작 해야 할 것은 미뤄진다',
          situational_tags: ['work'],
        },
        {
          id: 'f_work_2',
          subcategory: 'work_study',
          text: '마감이나 시험이 다가와도 몸이 굳고 손이 안 움직여서, 결국 벼락치기를 하거나 아예 포기하게 된다',
          situational_tags: ['work', 'deadline'],
        },
        {
          id: 'f_work_3',
          subcategory: 'work_study',
          text: '실수를 하거나 결과가 안 좋으면 오래도록 자책하고, 다음에 비슷한 상황이 오면 더 겁이 난다',
          situational_tags: ['work'],
        },
        {
          id: 'f_work_4',
          subcategory: 'work_study',
          text: '직장이나 학교에 가기는 가는데, 거기서 내가 할 수 있는 게 없다는 느낌이 들고 점점 자신감이 없어진다',
          situational_tags: ['work'],
        },
        {
          id: 'f_work_custom',
          subcategory: 'work_study',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── function > household ──────────────────────────────────────────────────
      household: [
        {
          id: 'f_house_1',
          subcategory: 'household',
          text: '설거지·빨래·청소가 쌓여 있는 걸 알면서도 손이 가지 않고, 어질러진 채로 하루가 지나간다',
          situational_tags: [],
        },
        {
          id: 'f_house_2',
          subcategory: 'household',
          text: '공과금·병원 예약·서류 제출 같은 중요한 것들을 자꾸 미루다가 마감을 넘겨버린다',
          situational_tags: [],
        },
        {
          id: 'f_house_3',
          subcategory: 'household',
          text: '밥을 챙겨 먹어야 하는데 장도 못 보고, 배달이나 편의점으로 때우는 날이 이어진다',
          situational_tags: ['mealtime'],
        },
        {
          id: 'f_house_4',
          subcategory: 'household',
          text: '집 안이 정리가 안 된 채로 방치되어 있고, 그 모습을 볼 때마다 더 무기력해진다',
          situational_tags: [],
        },
        {
          id: 'f_house_custom',
          subcategory: 'household',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── function > self_care ─────────────────────────────────────────────────
      self_care: [
        {
          id: 'f_self_1',
          subcategory: 'self_care',
          text: '몸이 아파도 병원에 가거나 약을 먹는 것을 계속 미루다가 더 나빠진 적이 있다',
          situational_tags: [],
        },
        {
          id: 'f_self_2',
          subcategory: 'self_care',
          text: '샤워나 양치 같은 기본적인 위생 관리가 며칠씩 밀릴 때가 있다',
          situational_tags: [],
        },
        {
          id: 'f_self_3',
          subcategory: 'self_care',
          text: '운동이나 스트레칭 같은 것을 한 지 오래됐고, 몸을 챙긴다는 느낌이 없다',
          situational_tags: [],
        },
        {
          id: 'f_self_4',
          subcategory: 'self_care',
          text: '좋아하는 것을 사거나 맛있는 것을 먹거나 그냥 쉬는 것에 괜히 죄책감이 든다',
          situational_tags: [],
        },
        {
          id: 'f_self_custom',
          subcategory: 'self_care',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],
    },

    relation: {
      // ── 예시 B 완성 ──────────────────────────────────────────────────────────
      family: [
        {
          id: 'r_family_1',
          subcategory: 'family',
          text: '집에 있어도 가족과 대화 없이 각자 방에서 시간을 보낸다',
          situational_tags: [],
        },
        {
          id: 'r_family_2',
          subcategory: 'family',
          text: '가족이 내 상태에 대해 물어보면 짜증이 나거나 피하고 싶어진다',
          situational_tags: [],
        },
        {
          id: 'r_family_3',
          subcategory: 'family',
          text: '별일 아닌데도 가족에게 화를 내고 나서 후회하는 일이 반복된다',
          situational_tags: [],
        },
        {
          id: 'r_family_4',
          subcategory: 'family',
          text: '가족에게 내가 짐이 되는 것 같아서 마음이 무겁다',
          situational_tags: [],
        },
        {
          id: 'r_family_custom',
          subcategory: 'family',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── relation > friend ────────────────────────────────────────────────────
      friend: [
        {
          id: 'r_friend_1',
          subcategory: 'friend',
          text: '친구에게 연락이 와도 답장을 미루다가 읽씹이 되어버리고, 그게 반복되면서 관계가 멀어지는 것 같다',
          situational_tags: [],
        },
        {
          id: 'r_friend_2',
          subcategory: 'friend',
          text: '오래된 친구에게 먼저 연락하고 싶은데, 너무 오래됐다는 생각에 어떻게 시작해야 할지 모르겠다',
          situational_tags: [],
        },
        {
          id: 'r_friend_3',
          subcategory: 'friend',
          text: '친구를 만나고 나서 집에 오면 너무 지쳐서 한동안 아무것도 못 하게 된다',
          situational_tags: ['social'],
        },
        {
          id: 'r_friend_4',
          subcategory: 'friend',
          text: '친구들이 즐거운 시간을 보내는 사진을 보면 나만 뒤처지는 것 같고, 그래서 오히려 더 피하게 된다',
          situational_tags: ['social'],
        },
        {
          id: 'r_friend_custom',
          subcategory: 'friend',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── relation > partner ───────────────────────────────────────────────────
      partner: [
        {
          id: 'r_partner_1',
          subcategory: 'partner',
          text: '연인·배우자와 대화하다 보면 사소한 것에도 자주 다투고, 상처 주는 말을 한 뒤 후회한다',
          situational_tags: [],
        },
        {
          id: 'r_partner_2',
          subcategory: 'partner',
          text: '함께 있어도 각자 핸드폰만 보게 되고, 진짜 대화다운 대화가 오래됐다는 느낌이 든다',
          situational_tags: [],
        },
        {
          id: 'r_partner_3',
          subcategory: 'partner',
          text: '내가 힘들다는 것을 파트너에게 솔직히 말하기 어렵고, 괜찮은 척하게 된다',
          situational_tags: [],
        },
        {
          id: 'r_partner_4',
          subcategory: 'partner',
          text: '파트너가 내 감정을 이해하지 못하거나 무시하는 것 같아서 오히려 더 혼자라는 느낌이 든다',
          situational_tags: [],
        },
        {
          id: 'r_partner_custom',
          subcategory: 'partner',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── relation > work_social ────────────────────────────────────────────────
      work_social: [
        {
          id: 'r_work_1',
          subcategory: 'work_social',
          text: '직장에서 동료들과 점심이나 회식 자리를 피하게 되고, 혼자 밥을 먹거나 자리를 빠지는 일이 많아졌다',
          situational_tags: ['work', 'social'],
        },
        {
          id: 'r_work_2',
          subcategory: 'work_social',
          text: '회의에서 내 의견을 말해야 할 때 말을 못 하고 넘기거나, 나중에 말하지 말 걸 후회한다',
          situational_tags: ['work'],
        },
        {
          id: 'r_work_3',
          subcategory: 'work_social',
          text: '상사나 동료로부터 지적을 받으면 오래도록 마음에 걸리고, 그 사람과 마주치는 게 불편하다',
          situational_tags: ['work'],
        },
        {
          id: 'r_work_4',
          subcategory: 'work_social',
          text: '직장 사람들과 표면적인 대화는 하는데, 속으로는 겉돌고 있다는 느낌이 든다',
          situational_tags: ['work', 'social'],
        },
        {
          id: 'r_work_custom',
          subcategory: 'work_social',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── relation > isolation ─────────────────────────────────────────────────
      isolation: [
        {
          id: 'r_isolation_1',
          subcategory: 'isolation',
          text: '사람들과 함께 있어도, 집에 혼자 있어도 어느 쪽이나 외롭고 어느 쪽도 편하지 않다',
          situational_tags: [],
        },
        {
          id: 'r_isolation_2',
          subcategory: 'isolation',
          text: '연락하는 사람이 거의 없고, 오늘 내 하루를 알고 있는 사람이 아무도 없다는 느낌이 든다',
          situational_tags: [],
        },
        {
          id: 'r_isolation_3',
          subcategory: 'isolation',
          text: '새로운 관계를 시작하거나 사람들 사이에 끼려 하면 너무 에너지가 들고 잘 안 된다',
          situational_tags: ['social'],
        },
        {
          id: 'r_isolation_4',
          subcategory: 'isolation',
          text: '이 세상에서 나만 혼자 뒤처진 것 같고, 내 상황을 이해해주는 사람이 아무도 없다는 생각이 든다',
          situational_tags: [],
        },
        {
          id: 'r_isolation_custom',
          subcategory: 'isolation',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],
    },

    meaning: {
      // ── meaning > direction ──────────────────────────────────────────────────
      direction: [
        {
          id: 'm_direction_1',
          subcategory: 'direction',
          text: '왜 사는지 모르겠다는 생각이 자주 들고, 아침에 일어나도 오늘 하루가 의미 있을지 모르겠다',
          situational_tags: ['morning'],
        },
        {
          id: 'm_direction_2',
          subcategory: 'direction',
          text: '예전엔 원하는 게 있었는데, 지금은 내가 뭘 하고 싶은지 어디로 가야 하는지 감이 잡히지 않는다',
          situational_tags: [],
        },
        {
          id: 'm_direction_3',
          subcategory: 'direction',
          text: '그냥 버티고 있다는 느낌이 든다. 뭔가를 향해 가는 게 아니라 하루하루를 때우고 있다',
          situational_tags: [],
        },
        {
          id: 'm_direction_4',
          subcategory: 'direction',
          text: '1년 후, 5년 후의 내 모습을 생각하면 아무것도 그려지지 않고 막막하기만 하다',
          situational_tags: [],
        },
        {
          id: 'm_direction_custom',
          subcategory: 'direction',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── meaning > identity ───────────────────────────────────────────────────
      identity: [
        {
          id: 'm_identity_1',
          subcategory: 'identity',
          text: '나답다는 느낌이 언제였는지 기억이 안 나고, 지금 내가 어떤 사람인지 모르겠다',
          situational_tags: [],
        },
        {
          id: 'm_identity_2',
          subcategory: 'identity',
          text: '다른 사람이 원하는 대로, 상황이 요구하는 대로만 살아온 것 같고 내 진짜 모습이 뭔지 모르겠다',
          situational_tags: [],
        },
        {
          id: 'm_identity_3',
          subcategory: 'identity',
          text: '내 감정이나 생각이 맞는 건지 항상 의심하게 되고, 타인의 반응을 먼저 살피게 된다',
          situational_tags: ['social'],
        },
        {
          id: 'm_identity_4',
          subcategory: 'identity',
          text: '내가 좋아하는 것과 싫어하는 것이 뭔지, 무엇이 나를 행복하게 하는지 잘 모르겠다',
          situational_tags: [],
        },
        {
          id: 'm_identity_custom',
          subcategory: 'identity',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── meaning > enjoyment ──────────────────────────────────────────────────
      enjoyment: [
        {
          id: 'm_enjoyment_1',
          subcategory: 'enjoyment',
          text: '예전에 즐거웠던 것들을 이제 해도 아무 느낌이 없고, 즐거움이 뭔지 잘 모르겠다',
          situational_tags: [],
        },
        {
          id: 'm_enjoyment_2',
          subcategory: 'enjoyment',
          text: '뭔가 해보려고 찾아보거나 시작하다가 금방 흥미를 잃고 그만두게 된다',
          situational_tags: [],
        },
        {
          id: 'm_enjoyment_3',
          subcategory: 'enjoyment',
          text: '취미나 즐길 거리가 없어서 쉬는 날에도 핸드폰만 보다가 하루가 지나간다',
          situational_tags: [],
        },
        {
          id: 'm_enjoyment_4',
          subcategory: 'enjoyment',
          text: '즐거운 척은 할 수 있지만, 실제로 즐겁다는 느낌이 드는 게 언제였는지 기억이 잘 안 난다',
          situational_tags: [],
        },
        {
          id: 'm_enjoyment_custom',
          subcategory: 'enjoyment',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],

      // ── meaning > autonomy ──────────────────────────────────────────────────
      autonomy: [
        {
          id: 'm_autonomy_1',
          subcategory: 'autonomy',
          text: '해야 할 것들을 혼자 결정하고 시작하는 게 어렵고, 누군가 대신 정해줬으면 싶을 때가 많다',
          situational_tags: [],
        },
        {
          id: 'm_autonomy_2',
          subcategory: 'autonomy',
          text: '내가 원하는 걸 말하거나 요청하는 것이 불편하고, 그냥 상대방에게 맞추게 된다',
          situational_tags: ['social'],
        },
        {
          id: 'm_autonomy_3',
          subcategory: 'autonomy',
          text: '작은 일도 내가 결정하면 틀릴까봐 불안하고, 결정한 뒤에도 계속 후회하거나 다시 생각하게 된다',
          situational_tags: [],
        },
        {
          id: 'm_autonomy_4',
          subcategory: 'autonomy',
          text: '다른 사람이 시키는 대로 하거나, 상황에 떠밀려 살고 있다는 느낌이 든다',
          situational_tags: [],
        },
        {
          id: 'm_autonomy_custom',
          subcategory: 'autonomy',
          text: '직접 입력',
          is_custom: true,
          situational_tags: [],
        },
      ],
    },
  },

  // ── 2.3 목표 사다리 ─────────────────────────────────────────────────────────
  // 구조: goals[stateId] = { domain, ladder: LadderItem[] }
  // LadderItem: { level, id, template, blanks }
  // is_custom state(s_anxiety_custom, r_family_custom)는 goals 없음 — UI에서 자유 입력 처리

  goals: {

    // ── symptom > anxiety ─────────────────────────────────────────────────────

    's_anxiety_1': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_anxiety_1_s',
          template: '불안한 느낌이 들 때, [지속시간] 안에는 조금 가라앉는 경험을 해보고 싶다',
          blanks: { '지속시간': ['몇 분', '10분', '30분'] },
        },
        {
          level: 'medium',
          id: 'g_anxiety_1_m',
          template: '[시간대]에는 불안한 느낌이 덜 찾아왔으면 좋겠다',
          blanks: { '시간대': ['하루 중 한 번쯤은', '아침 시간에', '잠들기 전에'] },
        },
        {
          level: 'large',
          id: 'g_anxiety_1_l',
          template: '불안한 느낌이 하루 전체를 덮어버리지 않게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_anxiety_2': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_anxiety_2_s',
          template: '[장소]에 가기 전부터 미리 너무 불안해지지는 않았으면 좋겠다',
          blanks: { '장소': ['지하철 타러', '엘리베이터 타러', '사람 많은 곳 가러'] },
        },
        {
          level: 'medium',
          id: 'g_anxiety_2_m',
          template: '[정도] 큰 동요 없이 [장소]을 할 수 있었으면 좋겠다',
          blanks: {
            '정도': ['한 정거장 정도는', '한 층 정도는', '잠깐은'],
            '장소': ['지하철 타기', '엘리베이터 타기', '사람 많은 곳에 머물기'],
          },
        },
        {
          level: 'large',
          id: 'g_anxiety_2_l',
          template: '출퇴근길이나 사람 많은 곳이 더 이상 두렵지 않게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_anxiety_3': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_anxiety_3_s',
          template: '잠들기 전 떠오르는 생각들을 [방법]으로 잠시 내려놓을 수 있었으면 좋겠다',
          blanks: { '방법': ['적어두는 것', '호흡으로', '다른 생각으로 돌리는 것'] },
        },
        {
          level: 'medium',
          id: 'g_anxiety_3_m',
          template: '잠들기까지 걸리는 시간이 [목표시간] 정도로 줄었으면 좋겠다',
          blanks: { '목표시간': ['30분', '20분', '10분'] },
        },
        {
          level: 'large',
          id: 'g_anxiety_3_l',
          template: '침대에 누웠을 때 마음이 비교적 편안하게 가라앉았으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_anxiety_4': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_anxiety_4_s',
          template: '사람들과 있을 때 [부위]의 긴장이 조금은 덜했으면 좋겠다',
          blanks: { '부위': ['어깨', '목', '가슴'] },
        },
        {
          level: 'medium',
          id: 'g_anxiety_4_m',
          template: '[상황]에서 너무 평가받는다는 느낌 없이 있을 수 있었으면 좋겠다',
          blanks: { '상황': ['친한 사람들과의 자리', '회의나 모임', '낯선 사람과의 대화'] },
        },
        {
          level: 'large',
          id: 'g_anxiety_4_l',
          template: '사람들과 있는 시간이 긴장보다 편안함이 더 큰 시간이 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── relation > family ─────────────────────────────────────────────────────

    'r_family_1': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_family_1_s',
          template: '[가족구성원]과 짧은 인사라도 나눌 수 있었으면 좋겠다',
          blanks: { '가족구성원': ['부모님', '형제/자매', '배우자', '자녀'] },
        },
        {
          level: 'medium',
          id: 'g_family_1_m',
          template: '[빈도] 가족과 함께 식사하거나 짧게 이야기 나누는 시간이 있었으면 좋겠다',
          blanks: { '빈도': ['하루에 한 번은', '일주일에 2~3번은', '주말에는'] },
        },
        {
          level: 'large',
          id: 'g_family_1_l',
          template: '가족과 같은 공간에 있는 시간이 불편하지 않게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_family_2': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_family_2_s',
          template: '가족이 물어볼 때, [반응]으로라도 대답할 수 있었으면 좋겠다',
          blanks: { '반응': ['짧게', '괜찮다고만이라도', '나중에 말한다고'] },
        },
        {
          level: 'medium',
          id: 'g_family_2_m',
          template: '내 상태에 대한 질문이 [느낌]으로 덜 느껴졌으면 좋겠다',
          blanks: { '느낌': ['부담', '간섭', '평가'] },
        },
        {
          level: 'large',
          id: 'g_family_2_l',
          template: '가족에게 내 상태를 솔직하게 이야기할 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_family_3': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_family_3_s',
          template: '화가 날 때 [행동]을 먼저 해볼 수 있었으면 좋겠다',
          blanks: { '행동': ['그 자리를 잠깐 벗어나는 것', '숫자를 세는 것', '심호흡을 하는 것'] },
        },
        {
          level: 'medium',
          id: 'g_family_3_m',
          template: '화를 낸 뒤에 [행동]을 할 수 있었으면 좋겠다',
          blanks: { '행동': ['짧게라도 사과하는 것', '왜 그랬는지 설명하는 것', '먼저 다가가는 것'] },
        },
        {
          level: 'large',
          id: 'g_family_3_l',
          template: '작은 일로 가족에게 화를 내는 일이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_family_4': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_family_4_s',
          template: '가족에게 짐이 된다는 생각이 들 때, [행동]을 떠올려볼 수 있었으면 좋겠다',
          blanks: { '행동': ['그게 사실인지 한 번 의심해보는 것', '가족이 실제로 한 말을 떠올려보는 것'] },
        },
        {
          level: 'medium',
          id: 'g_family_4_m',
          template: '가족에게 [작은것]을 표현할 수 있었으면 좋겠다',
          blanks: { '작은것': ['고맙다는 말', '미안하다는 말', '요즘 어떤지 한 마디'] },
        },
        {
          level: 'large',
          id: 'g_family_4_l',
          template: '가족과의 관계에서 내가 짐이 아니라 함께하는 사람이라는 느낌이 들었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── symptom > mood ───────────────────────────────────────────────────────

    's_mood_1': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_mood_1_s',
          template: '아침에 눈을 뜨고 [행동] 하나라도 해볼 수 있었으면 좋겠다',
          blanks: { '행동': ['물 한 잔 마시는 것', '커튼을 여는 것', '음악을 트는 것'] },
        },
        {
          level: 'medium',
          id: 'g_mood_1_m',
          template: '[시간대]에는 조금이라도 기분이 나아지는 순간이 있었으면 좋겠다',
          blanks: { '시간대': ['오전 중', '점심쯤', '저녁 무렵'] },
        },
        {
          level: 'large',
          id: 'g_mood_1_l',
          template: '하루를 시작할 때 무기력함보다 작은 기대가 먼저 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_mood_2': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_mood_2_s',
          template: '눈물이 날 때, 그냥 흘려도 괜찮다는 느낌이 들었으면 좋겠다',
          blanks: {},
        },
        {
          level: 'medium',
          id: 'g_mood_2_m',
          template: '[빈도] 정도는 내가 왜 힘든지 조금씩 알 것 같은 순간이 생겼으면 좋겠다',
          blanks: { '빈도': ['가끔은', '일주일에 한 번쯤', '한 달에 한 번쯤'] },
        },
        {
          level: 'large',
          id: 'g_mood_2_l',
          template: '기분이 처져도 이유를 어느 정도 알고, 스스로 다독일 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_mood_3': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_mood_3_s',
          template: '하루 중 [시간]만이라도 뭔가 해보는 경험을 쌓고 싶다',
          blanks: { '시간': ['5분', '10분', '잠깐'] },
        },
        {
          level: 'medium',
          id: 'g_mood_3_m',
          template: '[활동]을 할 때 예전처럼 조금 즐거워지는 느낌이 돌아왔으면 좋겠다',
          blanks: { '활동': ['음악 듣는 것', '산책하는 것', '드라마 보는 것'] },
        },
        {
          level: 'large',
          id: 'g_mood_3_l',
          template: '하고 싶은 것이 생겼을 때 몸이 자연스럽게 따라갈 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_mood_4': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_mood_4_s',
          template: '기분이 갑자기 나빠질 때 [신호] 정도는 알아차릴 수 있었으면 좋겠다',
          blanks: { '신호': ['몸의 변화', '어떤 상황이었는지', '어떤 생각이 들었는지'] },
        },
        {
          level: 'medium',
          id: 'g_mood_4_m',
          template: '기분이 바닥으로 떨어지는 [횟수나 강도]가 조금 줄었으면 좋겠다',
          blanks: { '횟수나 강도': ['횟수', '강도', '지속 시간'] },
        },
        {
          level: 'large',
          id: 'g_mood_4_l',
          template: '기분의 변화가 있어도 완전히 무너지는 날이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── symptom > sleep ──────────────────────────────────────────────────────

    's_sleep_1': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_sleep_1_s',
          template: '침대에 누웠을 때 [방법]으로 몸이 조금 이완되는 느낌을 가져볼 수 있었으면 좋겠다',
          blanks: { '방법': ['복식호흡', '가벼운 스트레칭', '조용한 음악'] },
        },
        {
          level: 'medium',
          id: 'g_sleep_1_m',
          template: '잠드는 데 걸리는 시간이 [목표시간] 이내로 줄었으면 좋겠다',
          blanks: { '목표시간': ['1시간', '40분', '30분'] },
        },
        {
          level: 'large',
          id: 'g_sleep_1_l',
          template: '누우면 자연스럽게 잠이 드는 날이 더 많아졌으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_sleep_2': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_sleep_2_s',
          template: '새벽에 깼을 때 핸드폰을 보는 대신 [방법]을 해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['눈을 감고 호흡에 집중하는 것', '이어폰으로 소리를 트는 것', '가만히 다시 눕는 것'] },
        },
        {
          level: 'medium',
          id: 'g_sleep_2_m',
          template: '새벽에 깨더라도 [시간] 안에는 다시 잠들 수 있었으면 좋겠다',
          blanks: { '시간': ['30분', '20분', '10분'] },
        },
        {
          level: 'large',
          id: 'g_sleep_2_l',
          template: '한번 잠들면 새벽에 자꾸 깨는 일이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_sleep_3': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_sleep_3_s',
          template: '일어나서 [행동] 하나라도 해봄으로써 몸을 깨워보고 싶다',
          blanks: { '행동': ['햇빛 쬐기', '가벼운 스트레칭', '찬물로 세수하기'] },
        },
        {
          level: 'medium',
          id: 'g_sleep_3_m',
          template: '[시간대]에는 낮 피로감이 조금 덜한 날이 생겼으면 좋겠다',
          blanks: { '시간대': ['오전 중에는', '점심 이후에는', '저녁에는'] },
        },
        {
          level: 'large',
          id: 'g_sleep_3_l',
          template: '잠에서 깼을 때 어느 정도 쉰 것 같다는 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_sleep_4': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_sleep_4_s',
          template: '주말이라도 [시간]에는 일어나볼 수 있었으면 좋겠다',
          blanks: { '시간': ['평일보다 2시간 내로', '오전 11시', '오전 10시'] },
        },
        {
          level: 'medium',
          id: 'g_sleep_4_m',
          template: '낮잠을 자더라도 [시간] 이내로만 자보는 연습을 해볼 수 있었으면 좋겠다',
          blanks: { '시간': ['30분', '20분', '15분'] },
        },
        {
          level: 'large',
          id: 'g_sleep_4_l',
          template: '주중·주말 상관없이 비슷한 시간에 자고 일어나게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── symptom > cognition ──────────────────────────────────────────────────

    's_cognition_1': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_cognition_1_s',
          template: '[분량]이라도 읽고 내용이 어느 정도 기억나는 경험을 해보고 싶다',
          blanks: { '분량': ['한 문단', '한 페이지', '5분치'] },
        },
        {
          level: 'medium',
          id: 'g_cognition_1_m',
          template: '[상황]에서 집중력이 [정도] 유지되는 날이 생겼으면 좋겠다',
          blanks: {
            '상황': ['독서할 때', '업무 자료 볼 때'],
            '정도': ['5분', '10분', '20분'],
          },
        },
        {
          level: 'large',
          id: 'g_cognition_1_l',
          template: '읽거나 듣는 내용이 자연스럽게 머릿속에 들어오는 날이 늘었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_cognition_2': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_cognition_2_s',
          template: '하려던 일을 시작하기까지 걸리는 시간이 [목표시간] 정도로 줄었으면 좋겠다',
          blanks: { '목표시간': ['30분', '20분', '10분'] },
        },
        {
          level: 'medium',
          id: 'g_cognition_2_m',
          template: '[작은 일] 하나라도 시작해서 끝내는 경험이 [빈도] 있었으면 좋겠다',
          blanks: {
            '작은 일': ['이메일 한 통', '할 일 목록 쓰기', '짧은 문서 하나'],
            '빈도': ['하루에 한 번', '이틀에 한 번'],
          },
        },
        {
          level: 'large',
          id: 'g_cognition_2_l',
          template: '할 일이 생겼을 때 크게 망설이지 않고 시작할 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_cognition_3': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_cognition_3_s',
          template: '대화 중 따라가기 어려울 때 [방법]으로 넘어갈 수 있었으면 좋겠다',
          blanks: { '방법': ['다시 물어보는 것', '고개만 끄덕이는 것', '잠깐 정리하는 것'] },
        },
        {
          level: 'medium',
          id: 'g_cognition_3_m',
          template: '[상황]에서 상대방 말을 따라가는 게 조금 덜 힘들었으면 좋겠다',
          blanks: { '상황': ['친한 사람과 대화할 때', '회의나 모임에서', '전화 통화할 때'] },
        },
        {
          level: 'large',
          id: 'g_cognition_3_l',
          template: '대화 중에 내용이 어느 정도 기억되고 내 의견도 표현할 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_cognition_4': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_cognition_4_s',
          template: '부정적인 생각이 떠오를 때 [방법]으로 잠깐이라도 다른 데 집중해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['주변 사물 살펴보기', '호흡에 집중하기', '다른 일 시작하기'] },
        },
        {
          level: 'medium',
          id: 'g_cognition_4_m',
          template: '같은 생각이 [시간] 이상 계속 맴도는 일이 줄었으면 좋겠다',
          blanks: { '시간': ['한 시간', '30분', '15분'] },
        },
        {
          level: 'large',
          id: 'g_cognition_4_l',
          template: '부정적인 생각이 떠올라도 거기서 빠져나올 수 있다는 느낌이 들었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── symptom > physical ───────────────────────────────────────────────────

    's_physical_1': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_physical_1_s',
          template: '하루 중 [시간] 정도는 몸이 조금 가벼운 순간이 있었으면 좋겠다',
          blanks: { '시간': ['10분', '30분', '한두 시간'] },
        },
        {
          level: 'medium',
          id: 'g_physical_1_m',
          template: '[활동] 후에는 예전보다 덜 지친 것 같다는 느낌이 들었으면 좋겠다',
          blanks: { '활동': ['산책', '가사일', '출퇴근'] },
        },
        {
          level: 'large',
          id: 'g_physical_1_l',
          template: '조금 움직여도 이렇게 빨리 지치지 않게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_physical_2': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_physical_2_s',
          template: '목이나 어깨가 굳었다는 것을 [빈도] 알아차릴 수 있었으면 좋겠다',
          blanks: { '빈도': ['하루에 한 번', '느껴질 때마다'] },
        },
        {
          level: 'medium',
          id: 'g_physical_2_m',
          template: '알아차렸을 때 [방법]으로 긴장을 풀어주는 습관을 만들어보고 싶다',
          blanks: { '방법': ['스트레칭 2분', '온찜질', '어깨 크게 돌리기'] },
        },
        {
          level: 'large',
          id: 'g_physical_2_l',
          template: '두통이나 근육 통증이 하루 내내 깔려 있는 날이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_physical_3': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_physical_3_s',
          template: '하루 [끼니] 정도는 먹겠다고 마음먹고 챙겨볼 수 있었으면 좋겠다',
          blanks: { '끼니': ['한 끼는', '두 끼는', '간단한 것이라도'] },
        },
        {
          level: 'medium',
          id: 'g_physical_3_m',
          template: '[상황]에서 먹는 양이 조금 더 안정적이어졌으면 좋겠다',
          blanks: { '상황': ['스트레스받을 때', '기분이 처질 때', '혼자 있을 때'] },
        },
        {
          level: 'large',
          id: 'g_physical_3_l',
          template: '배고픔이나 포만감을 느끼면서 먹을 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_physical_4': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_physical_4_s',
          template: '가슴이 답답하다고 느껴질 때 [방법]으로 잠깐 대응해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['천천히 내쉬기', '자세 바꾸기', '자리에서 일어나기'] },
        },
        {
          level: 'medium',
          id: 'g_physical_4_m',
          template: '[시간대]에 가슴 답답함이 조금 덜한 날이 생겼으면 좋겠다',
          blanks: { '시간대': ['아침에', '오후에', '자기 전에'] },
        },
        {
          level: 'large',
          id: 'g_physical_4_l',
          template: '가슴 답답함이나 얕은 호흡이 하루에 여러 번 찾아오는 일이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── symptom > impulse ───────────────────────────────────────────────────

    's_impulse_1': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_impulse_1_s',
          template: '화가 치밀어오를 때 [행동]으로 잠깐이라도 멈출 수 있었으면 좋겠다',
          blanks: { '행동': ['자리에서 일어나기', '숨을 크게 한 번 쉬기', '방에서 잠깐 나가기'] },
        },
        {
          level: 'medium',
          id: 'g_impulse_1_m',
          template: '[상황]에서 행동이 먼저 나오는 게 [정도] 줄었으면 좋겠다',
          blanks: {
            '상황': ['집에서', '직장에서', '가까운 사람과 있을 때'],
            '정도': ['조금은', '눈에 띄게'],
          },
        },
        {
          level: 'large',
          id: 'g_impulse_1_l',
          template: '화가 많이 나도 일단 멈추고 어떻게 할지 고를 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_impulse_2': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_impulse_2_s',
          template: '기분이 나쁠 때 [행동]으로 빠져들기 전에 잠깐 멈추는 경험을 해보고 싶다',
          blanks: { '행동': ['먹는 것', '술 마시는 것', '쇼핑하는 것'] },
        },
        {
          level: 'medium',
          id: 'g_impulse_2_m',
          template: '[계기]가 생겼을 때 [대안 행동] 한 가지를 먼저 해볼 수 있었으면 좋겠다',
          blanks: {
            '계기': ['기분이 나쁠 때', '심심할 때', '외로울 때'],
            '대안 행동': ['산책 나가기', '물 한 잔 마시기', '친구에게 연락하기'],
          },
        },
        {
          level: 'large',
          id: 'g_impulse_2_l',
          template: '충동적으로 하고 나서 후회하는 일이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_impulse_3': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_impulse_3_s',
          template: '상처 주는 말이 나왔을 때 [방법]으로라도 수습해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['사과하는 것', '나중에 문자로 설명하는 것', '잠깐 그 자리를 피하는 것'] },
        },
        {
          level: 'medium',
          id: 'g_impulse_3_m',
          template: '[상황]에서 말이 나오기 전에 [시간] 정도 멈출 수 있었으면 좋겠다',
          blanks: {
            '상황': ['갈등이 생길 때', '화가 날 때', '답답할 때'],
            '시간': ['3초', '5초', '잠깐'],
          },
        },
        {
          level: 'large',
          id: 'g_impulse_3_l',
          template: '가까운 사람에게 상처 주는 말을 하고 후회하는 일이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    's_impulse_4': {
      domain: 'symptom',
      ladder: [
        {
          level: 'small',
          id: 'g_impulse_4_s',
          template: '감정이 올라올 때 [신체 신호] 정도는 알아차릴 수 있었으면 좋겠다',
          blanks: { '신체 신호': ['가슴이 빨라지는 것', '어깨가 올라가는 것', '손이 떨리는 것'] },
        },
        {
          level: 'medium',
          id: 'g_impulse_4_m',
          template: '신호를 알아차린 후 [행동] 하나를 먼저 해보는 연습을 해볼 수 있었으면 좋겠다',
          blanks: { '행동': ['심호흡', '물 마시기', '잠깐 자리 피하기'] },
        },
        {
          level: 'large',
          id: 'g_impulse_4_l',
          template: '몸이 먼저 반응하기 전에 한 박자 멈추는 날이 늘었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── function > daily_routine ─────────────────────────────────────────────

    'f_daily_1': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_daily_1_s',
          template: '알람을 [횟수] 이내로 끄고 일어날 수 있었으면 좋겠다',
          blanks: { '횟수': ['세 번', '두 번', '한 번'] },
        },
        {
          level: 'medium',
          id: 'g_daily_1_m',
          template: '[목표 시간]에는 자리에서 일어나는 날이 [빈도] 생겼으면 좋겠다',
          blanks: {
            '목표 시간': ['목표한 기상 시간', '30분 이내에', '알람 소리에'],
            '빈도': ['이틀에 한 번', '주 3일은', '매일'],
          },
        },
        {
          level: 'large',
          id: 'g_daily_1_l',
          template: '아침에 일어나는 것이 전쟁처럼 느껴지지 않게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_daily_2': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_daily_2_s',
          template: '[일과] 하나만 정해두고 오늘 그것만은 해볼 수 있었으면 좋겠다',
          blanks: { '일과': ['씻기', '밥 한 끼 챙기기', '방 환기하기'] },
        },
        {
          level: 'medium',
          id: 'g_daily_2_m',
          template: '[빈도] 기본 일과를 미루지 않고 해내는 날이 생겼으면 좋겠다',
          blanks: { '빈도': ['이틀에 한 번은', '주 3일은', '매일'] },
        },
        {
          level: 'large',
          id: 'g_daily_2_l',
          template: '"나중에"가 아니라 그냥 바로 해버리는 날이 늘었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_daily_3': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_daily_3_s',
          template: '자려고 누운 뒤 [시간] 안에는 핸드폰을 내려놓을 수 있었으면 좋겠다',
          blanks: { '시간': ['30분', '20분', '10분'] },
        },
        {
          level: 'medium',
          id: 'g_daily_3_m',
          template: '[목표시각]에는 핸드폰을 내려놓고 눕는 날이 [빈도] 생겼으면 좋겠다',
          blanks: {
            '목표시각': ['12시 전에', '11시 30분 전에', '11시 전에'],
            '빈도': ['이틀에 한 번', '주 3일은'],
          },
        },
        {
          level: 'large',
          id: 'g_daily_3_l',
          template: '자고 싶은 시간에 핸드폰을 끄고 눈을 감을 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_daily_4': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_daily_4_s',
          template: '오늘 꼭 할 것 [개수]만 정해두고 그것만 지켜볼 수 있었으면 좋겠다',
          blanks: { '개수': ['한 가지', '두 가지'] },
        },
        {
          level: 'medium',
          id: 'g_daily_4_m',
          template: '오전 중에 [일 한 가지]라도 끝내는 경험이 [빈도] 있었으면 좋겠다',
          blanks: {
            '일 한 가지': ['작은 일 하나', '미뤄온 것 한 가지', '5분짜리 일'],
            '빈도': ['하루에 한 번', '이틀에 한 번'],
          },
        },
        {
          level: 'large',
          id: 'g_daily_4_l',
          template: '하루가 끝날 때 아무것도 안 한 것 같다는 느낌이 드는 날이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── function > work_study ────────────────────────────────────────────────

    'f_work_1': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_work_1_s',
          template: '[시간]만이라도 다른 것 끊고 하려던 것에 집중해볼 수 있었으면 좋겠다',
          blanks: { '시간': ['5분', '10분', '25분'] },
        },
        {
          level: 'medium',
          id: 'g_work_1_m',
          template: '[방해 요소]를 치워두고 [작업 단위] 끝내는 경험이 생겼으면 좋겠다',
          blanks: {
            '방해 요소': ['핸드폰', '불필요한 탭들', '알림'],
            '작업 단위': ['한 문단', '이메일 하나', '한 문제'],
          },
        },
        {
          level: 'large',
          id: 'g_work_1_l',
          template: '하려는 것을 시작하면 어느 정도는 이어갈 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_work_2': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_work_2_s',
          template: '마감이 다가올 때 [가장 작은 것] 하나만 먼저 해볼 수 있었으면 좋겠다',
          blanks: { '가장 작은 것': ['제목 쓰기', '첫 문장만 쓰기', '자료 한 개 열어두기'] },
        },
        {
          level: 'medium',
          id: 'g_work_2_m',
          template: '[시점]에 [단계] 정도까지는 시작해두는 날이 생겼으면 좋겠다',
          blanks: {
            '시점': ['마감 3일 전에', '마감 이틀 전에', '마감 전날에'],
            '단계': ['아웃라인 잡기', '초안 쓰기', '자료 모으기'],
          },
        },
        {
          level: 'large',
          id: 'g_work_2_l',
          template: '마감이나 시험 앞에서 몸이 굳는 시간이 줄고, 조금이라도 일찍 시작할 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_work_3': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_work_3_s',
          template: '실수를 했을 때 [방법]으로 마음을 조금 추슬러볼 수 있었으면 좋겠다',
          blanks: { '방법': ['잠깐 자리를 피하는 것', '숨을 크게 한 번 쉬는 것', '물 한 잔 마시는 것'] },
        },
        {
          level: 'medium',
          id: 'g_work_3_m',
          template: '실수를 한 뒤 자책이 [시간] 이상 이어지는 일이 줄었으면 좋겠다',
          blanks: { '시간': ['하루', '몇 시간', '한 시간'] },
        },
        {
          level: 'large',
          id: 'g_work_3_l',
          template: '실수를 해도 그게 나의 전부가 아니라는 느낌이 조금씩 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_work_4': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_work_4_s',
          template: '오늘 직장이나 학교에서 [작은 것] 하나라도 해낸 것을 떠올려볼 수 있었으면 좋겠다',
          blanks: { '작은 것': ['이메일 답장', '수업에 출석', '과제 하나 제출'] },
        },
        {
          level: 'medium',
          id: 'g_work_4_m',
          template: '[상황]에서 내가 할 수 있는 것이 [하나쯤]은 있다는 느낌이 들었으면 좋겠다',
          blanks: {
            '상황': ['회의에서', '수업 중에', '업무 중에'],
            '하나쯤': ['한 가지쯤', '작은 것이라도'],
          },
        },
        {
          level: 'large',
          id: 'g_work_4_l',
          template: '직장이나 학교가 내가 아무것도 못 하는 곳이 아니라는 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── function > household ──────────────────────────────────────────────────

    'f_house_1': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_house_1_s',
          template: '오늘 [집안일 한 가지]만 정해두고 그것 하나라도 끝낼 수 있었으면 좋겠다',
          blanks: { '집안일 한 가지': ['설거지', '빨래 돌리기', '쓰레기 버리기'] },
        },
        {
          level: 'medium',
          id: 'g_house_1_m',
          template: '[빈도] 집안일 한 가지씩 해나가는 날이 생겼으면 좋겠다',
          blanks: { '빈도': ['이틀에 한 번', '주 3일은', '매일'] },
        },
        {
          level: 'large',
          id: 'g_house_1_l',
          template: '집안일이 한꺼번에 쌓여 있는 느낌 없이 조금씩 돌아가게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_house_2': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_house_2_s',
          template: '미뤄야겠다는 생각이 들 때 [방법]으로 딱 첫 단계만 해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['전화번호만 찾아두는 것', '서류만 꺼내두는 것', '알람만 맞춰두는 것'] },
        },
        {
          level: 'medium',
          id: 'g_house_2_m',
          template: '중요한 일이 생기면 [시점]에 [행동]을 해둘 수 있었으면 좋겠다',
          blanks: {
            '시점': ['그날 바로', '다음 날 안에', '일주일 안에'],
            '행동': ['메모해두기', '달력에 표시하기', '알람 맞추기'],
          },
        },
        {
          level: 'large',
          id: 'g_house_2_l',
          template: '중요한 것들을 마감 전에 챙기는 일이 조금씩 자연스러워졌으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_house_3': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_house_3_s',
          template: '하루에 [끼니] 정도는 배달이나 편의점 말고 간단히라도 챙길 수 있었으면 좋겠다',
          blanks: { '끼니': ['한 끼는', '간식이라도'] },
        },
        {
          level: 'medium',
          id: 'g_house_3_m',
          template: '[빈도] 정도는 먹을 것을 미리 사두거나 간단하게 준비해볼 수 있었으면 좋겠다',
          blanks: { '빈도': ['주말에는', '일주일에 한 번은', '이틀에 한 번은'] },
        },
        {
          level: 'large',
          id: 'g_house_3_l',
          template: '배달이나 편의점에 매번 의존하지 않는 날이 조금씩 늘었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_house_4': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_house_4_s',
          template: '오늘 [공간 한 곳]만 조금 정리해볼 수 있었으면 좋겠다',
          blanks: { '공간 한 곳': ['책상 위', '침대 주변', '바닥'] },
        },
        {
          level: 'medium',
          id: 'g_house_4_m',
          template: '[시간] 안에 할 수 있는 정리를 [빈도] 해보는 날이 생겼으면 좋겠다',
          blanks: {
            '시간': ['5분', '10분', '15분'],
            '빈도': ['이틀에 한 번', '주 3일은'],
          },
        },
        {
          level: 'large',
          id: 'g_house_4_l',
          template: '집 안이 정리된 날에 기분이 조금 나아진다는 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── function > self_care ─────────────────────────────────────────────────

    'f_self_1': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_self_1_s',
          template: '아픈 데가 있을 때 [방법]으로 일단 기록해두거나 챙겨볼 수 있었으면 좋겠다',
          blanks: { '방법': ['메모해두는 것', '증상 검색해보는 것', '약이라도 먹는 것'] },
        },
        {
          level: 'medium',
          id: 'g_self_1_m',
          template: '[증상]이 [기간] 이상 이어지면 병원이나 약국에 가볼 수 있었으면 좋겠다',
          blanks: {
            '증상': ['몸살 기운', '두통', '소화 불량'],
            '기간': ['3일', '이틀', '일주일'],
          },
        },
        {
          level: 'large',
          id: 'g_self_1_l',
          template: '몸이 보내는 신호를 흘려보내지 않고 그때그때 챙길 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_self_2': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_self_2_s',
          template: '오늘 [기본 위생 한 가지]라도 해볼 수 있었으면 좋겠다',
          blanks: { '기본 위생 한 가지': ['샤워', '양치', '세수'] },
        },
        {
          level: 'medium',
          id: 'g_self_2_m',
          template: '[빈도] 정도는 기본 위생을 챙기는 날이 생겼으면 좋겠다',
          blanks: { '빈도': ['이틀에 한 번', '주 4일은', '매일'] },
        },
        {
          level: 'large',
          id: 'g_self_2_l',
          template: '씻고 나면 기분이 조금 나아진다는 게 자연스럽게 느껴지게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_self_3': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_self_3_s',
          template: '하루 중 [시간]만이라도 몸을 조금 움직여볼 수 있었으면 좋겠다',
          blanks: { '시간': ['5분', '10분', '잠깐'] },
        },
        {
          level: 'medium',
          id: 'g_self_3_m',
          template: '[활동]을 [빈도] 해보는 날이 생겼으면 좋겠다',
          blanks: {
            '활동': ['스트레칭', '산책', '가벼운 운동'],
            '빈도': ['이틀에 한 번', '주 3일은', '매일'],
          },
        },
        {
          level: 'large',
          id: 'g_self_3_l',
          template: '몸을 움직이고 나면 기분이 조금 달라진다는 게 느껴지는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'f_self_4': {
      domain: 'function',
      ladder: [
        {
          level: 'small',
          id: 'g_self_4_s',
          template: '오늘 나를 위한 [작은 것] 하나를 해볼 수 있었으면 좋겠다',
          blanks: { '작은 것': ['좋아하는 음료 한 잔', '10분 혼자만의 시간', '좋아하는 음악 한 곡'] },
        },
        {
          level: 'medium',
          id: 'g_self_4_m',
          template: '나를 위해 뭔가를 할 때 드는 죄책감이 [정도] 줄었으면 좋겠다',
          blanks: { '정도': ['조금', '눈에 띄게'] },
        },
        {
          level: 'large',
          id: 'g_self_4_l',
          template: '나를 챙기는 것이 사치가 아니라 필요한 것이라는 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── relation > friend ────────────────────────────────────────────────────

    'r_friend_1': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_friend_1_s',
          template: '연락이 왔을 때 [방법]으로라도 반응해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['이모티콘 하나', '짧게 한 줄', '"나중에 연락할게"라고'] },
        },
        {
          level: 'medium',
          id: 'g_friend_1_m',
          template: '[빈도] 정도는 연락이 온 것을 당일 안에 읽고 답하는 날이 생겼으면 좋겠다',
          blanks: { '빈도': ['일주일에 한 번', '이틀에 한 번', '매일'] },
        },
        {
          level: 'large',
          id: 'g_friend_1_l',
          template: '연락을 미루다가 관계가 멀어지는 느낌이 드는 일이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_friend_2': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_friend_2_s',
          template: '연락하고 싶은 친구에게 [방법]으로라도 먼저 연락해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['짧은 안부 한 줄', '재밌는 것 공유하기', '"잘 지내?"라고'] },
        },
        {
          level: 'medium',
          id: 'g_friend_2_m',
          template: '[빈도] 오래된 친구 한 명에게 먼저 연락해보는 날이 생겼으면 좋겠다',
          blanks: { '빈도': ['한 달에 한 번', '두 달에 한 번', '생각날 때'] },
        },
        {
          level: 'large',
          id: 'g_friend_2_l',
          template: '먼저 연락하는 것이 더 이상 너무 큰 일처럼 느껴지지 않게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_friend_3': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_friend_3_s',
          template: '친구를 만나고 돌아온 날 [방법]으로 혼자만의 회복 시간을 가져볼 수 있었으면 좋겠다',
          blanks: { '방법': ['조용히 쉬는 것', '좋아하는 것 하는 것', '아무것도 안 하는 것'] },
        },
        {
          level: 'medium',
          id: 'g_friend_3_m',
          template: '만남 전에 [방법]으로 에너지를 미리 아껴두는 준비를 해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['전날 충분히 쉬는 것', '약속을 짧게 잡는 것', '이동을 최소화하는 것'] },
        },
        {
          level: 'large',
          id: 'g_friend_3_l',
          template: '친구를 만나고 나서 지쳐버리는 정도가 조금씩 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_friend_4': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_friend_4_s',
          template: '비교되는 느낌이 들 때 [방법]으로 그 생각을 잠깐 옆에 놓아둘 수 있었으면 좋겠다',
          blanks: { '방법': ['핸드폰 내려두기', '다른 것 하기', '생각 적어두기'] },
        },
        {
          level: 'medium',
          id: 'g_friend_4_m',
          template: '내가 뒤처지는 게 아니라 [다른 관점]으로 보는 연습을 해볼 수 있었으면 좋겠다',
          blanks: { '다른 관점': ['각자 속도가 다른 것', '보이는 것이 전부가 아닌 것', '나도 나대로 가고 있는 것'] },
        },
        {
          level: 'large',
          id: 'g_friend_4_l',
          template: '친구들의 소식이 나를 더 피하게 만드는 이유가 되지 않게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── relation > partner ───────────────────────────────────────────────────

    'r_partner_1': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_partner_1_s',
          template: '다툼이 시작될 것 같을 때 [방법]으로 잠깐 멈출 수 있었으면 좋겠다',
          blanks: { '방법': ['물 한 잔 마시는 것', '"잠깐"이라고 말하는 것', '자리를 잠시 피하는 것'] },
        },
        {
          level: 'medium',
          id: 'g_partner_1_m',
          template: '다툰 후에 [행동]을 [시간] 안에 할 수 있었으면 좋겠다',
          blanks: {
            '행동': ['사과하는 것', '왜 그랬는지 설명하는 것', '먼저 다가가는 것'],
            '시간': ['그날 안에', '한 시간 안에', '다음 날 안에'],
          },
        },
        {
          level: 'large',
          id: 'g_partner_1_l',
          template: '작은 갈등이 큰 다툼으로 번지는 일이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_partner_2': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_partner_2_s',
          template: '[시간]만이라도 함께 핸드폰 없이 같은 공간에 있어볼 수 있었으면 좋겠다',
          blanks: { '시간': ['10분', '30분', '밥 먹는 동안'] },
        },
        {
          level: 'medium',
          id: 'g_partner_2_m',
          template: '[빈도] 파트너와 오늘 어땠는지 짧게 나누는 시간이 있었으면 좋겠다',
          blanks: { '빈도': ['하루에 한 번', '이틀에 한 번', '주 3일은'] },
        },
        {
          level: 'large',
          id: 'g_partner_2_l',
          template: '파트너와 진짜 대화가 오래됐다는 느낌 없이 지내게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_partner_3': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_partner_3_s',
          template: '지금 좀 힘들다는 것을 [방법]으로 파트너에게 알릴 수 있었으면 좋겠다',
          blanks: { '방법': ['짧게 말로', '문자로', '"요즘 좀 힘들어"라고만이라도'] },
        },
        {
          level: 'medium',
          id: 'g_partner_3_m',
          template: '파트너에게 [정도] 내 상태를 솔직하게 이야기할 수 있었으면 좋겠다',
          blanks: { '정도': ['조금씩은', '핵심만이라도', '있는 그대로'] },
        },
        {
          level: 'large',
          id: 'g_partner_3_l',
          template: '파트너 앞에서 괜찮은 척하지 않아도 되는 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_partner_4': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_partner_4_s',
          template: '이해받지 못한 것 같을 때 [방법]으로 다시 한번 표현해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['더 구체적인 예를 들어', '"지금 외롭다"고 말하는 것', '잠시 쉬었다가 다시'] },
        },
        {
          level: 'medium',
          id: 'g_partner_4_m',
          template: '[상황]에서 파트너가 내 편이라는 느낌이 [정도] 드는 날이 생겼으면 좋겠다',
          blanks: {
            '상황': ['힘들 때', '다투고 난 후', '내 이야기를 할 때'],
            '정도': ['조금은', '가끔이라도'],
          },
        },
        {
          level: 'large',
          id: 'g_partner_4_l',
          template: '파트너와 함께 있을 때 혼자라는 느낌이 드는 날이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── relation > work_social ────────────────────────────────────────────────

    'r_work_1': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_work_social_1_s',
          template: '피하던 [자리]에 한 번쯤 있어볼 수 있었으면 좋겠다',
          blanks: { '자리': ['점심 자리', '짧은 티타임', '간단한 회식'] },
        },
        {
          level: 'medium',
          id: 'g_work_social_1_m',
          template: '[빈도] 동료들과 함께하는 자리를 불편하지 않게 넘길 수 있었으면 좋겠다',
          blanks: { '빈도': ['한 달에 한 번', '일주일에 한 번', '기회가 생기면'] },
        },
        {
          level: 'large',
          id: 'g_work_social_1_l',
          template: '직장 사람들과 함께하는 자리가 덜 무겁게 느껴지는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_work_2': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_work_social_2_s',
          template: '회의에서 [방법]으로라도 내 의견을 한 번 꺼내볼 수 있었으면 좋겠다',
          blanks: { '방법': ['짧게 한 마디', '질문 형식으로', '"저는 ~라고 생각했는데요"라고'] },
        },
        {
          level: 'medium',
          id: 'g_work_social_2_m',
          template: '[상황]에서 하고 싶은 말을 [정도] 표현해볼 수 있었으면 좋겠다',
          blanks: {
            '상황': ['1:1 대화에서', '소규모 회의에서', '팀 미팅에서'],
            '정도': ['한 마디씩이라도', '핵심만이라도', '짧게라도'],
          },
        },
        {
          level: 'large',
          id: 'g_work_social_2_l',
          template: '내 의견을 말하고 나서 오래 후회하거나 신경 쓰는 일이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_work_3': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_work_social_3_s',
          template: '지적을 받은 뒤 [방법]으로 잠깐 마음을 가라앉혀볼 수 있었으면 좋겠다',
          blanks: { '방법': ['물 마시러 가기', '화장실에서 잠깐 숨 고르기', '짧게 산책하기'] },
        },
        {
          level: 'medium',
          id: 'g_work_social_3_m',
          template: '지적받은 뒤 마음이 [시간] 이내로 정리되는 날이 생겼으면 좋겠다',
          blanks: { '시간': ['퇴근 전에', '그날 안에', '몇 시간 안에'] },
        },
        {
          level: 'large',
          id: 'g_work_social_3_l',
          template: '지적을 받아도 그게 나 전체에 대한 것이 아니라는 느낌을 조금씩 가질 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_work_4': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_work_social_4_s',
          template: '직장 동료와 [주제]로 가볍게 대화를 나눠볼 수 있었으면 좋겠다',
          blanks: { '주제': ['날씨나 주말 이야기', '최근 있었던 일', '같이 한 프로젝트'] },
        },
        {
          level: 'medium',
          id: 'g_work_social_4_m',
          template: '[동료] 한 명과 조금 더 편하게 대화할 수 있는 관계가 됐으면 좋겠다',
          blanks: { '동료': ['자주 보는 동료', '같은 팀 사람', '비슷한 연차의 사람'] },
        },
        {
          level: 'large',
          id: 'g_work_social_4_l',
          template: '직장에서 완전히 겉도는 것 같은 느낌이 드는 날이 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── relation > isolation ─────────────────────────────────────────────────

    'r_isolation_1': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_isolation_1_s',
          template: '혼자 있는 시간이 [방향]으로 느껴지는 순간이 있었으면 좋겠다',
          blanks: { '방향': ['잠깐 쉬는 것', '나를 위한 시간', '충전하는 것'] },
        },
        {
          level: 'medium',
          id: 'g_isolation_1_m',
          template: '[빈도] 정도는 사람과 함께 있는 게 너무 외롭거나 고단하지 않은 날이 생겼으면 좋겠다',
          blanks: { '빈도': ['일주일에 한 번', '이틀에 한 번', '가끔은'] },
        },
        {
          level: 'large',
          id: 'g_isolation_1_l',
          template: '혼자여도 함께여도 이렇게 외로운 느낌이 조금씩 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_isolation_2': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_isolation_2_s',
          template: '오늘 하루 있었던 것을 [방법]으로 누군가에게 한 마디라도 전할 수 있었으면 좋겠다',
          blanks: { '방법': ['문자로', '카카오로', '짧게 통화로'] },
        },
        {
          level: 'medium',
          id: 'g_isolation_2_m',
          template: '[빈도] 정도는 내 하루를 알고 있는 사람이 한 명쯤 있다는 느낌이 들었으면 좋겠다',
          blanks: { '빈도': ['일주일에 한 번', '며칠에 한 번', '이틀에 한 번'] },
        },
        {
          level: 'large',
          id: 'g_isolation_2_l',
          template: '오늘 하루를 나누고 싶은 사람이 한 명이라도 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_isolation_3': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_isolation_3_s',
          template: '사람과 연결되는 시도를 [방법]으로 아주 작게 해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['온라인 모임 구경만 해보기', '예전 지인에게 짧게 안부 보내기', '관심 있는 모임 정보만 찾아보기'] },
        },
        {
          level: 'medium',
          id: 'g_isolation_3_m',
          template: '[장소나 활동]에서 만나는 사람들과 [방법]으로 편하게 있어볼 수 있었으면 좋겠다',
          blanks: {
            '장소나 활동': ['동네 카페', '같은 취미 모임', '온라인 커뮤니티'],
            '방법': ['자리만 함께해도', '가볍게 인사 정도는', '대화 없이도 편하게'],
          },
        },
        {
          level: 'large',
          id: 'g_isolation_3_l',
          template: '새로운 관계를 시작하는 것이 이렇게 많은 에너지가 들지 않게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'r_isolation_4': {
      domain: 'relation',
      ladder: [
        {
          level: 'small',
          id: 'g_isolation_4_s',
          template: '내 상황을 조금이라도 알아줄 것 같은 [방법]을 하나 시도해볼 수 있었으면 좋겠다',
          blanks: { '방법': ['비슷한 경험을 나눈 글 읽어보기', '상담받아보기', '온라인 커뮤니티에 글 남겨보기'] },
        },
        {
          level: 'medium',
          id: 'g_isolation_4_m',
          template: '[상황]에서 "이 사람은 조금은 이해해줄 것 같다"는 느낌이 [빈도] 드는 날이 생겼으면 좋겠다',
          blanks: {
            '상황': ['상담할 때', '가까운 사람과 이야기할 때', '비슷한 경험의 글을 읽을 때'],
            '빈도': ['가끔', '한 번쯤', '드물게라도'],
          },
        },
        {
          level: 'large',
          id: 'g_isolation_4_l',
          template: '완전히는 아니어도 어느 정도 나를 이해해주는 사람이 한 명이라도 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── meaning > direction ──────────────────────────────────────────────────

    'm_direction_1': {
      domain: 'meaning',
      ladder: [
        {
          level: 'small',
          id: 'g_direction_1_s',
          template: '하루 중 [작은 것] 하나라도 있어서 오늘이 완전히 무의미하지 않았다는 느낌을 가져볼 수 있었으면 좋겠다',
          blanks: { '작은 것': ['기대했던 것', '잠깐 좋았던 것', '해낸 것'] },
        },
        {
          level: 'medium',
          id: 'g_direction_1_m',
          template: '[빈도] 정도는 "오늘 하루 있었던 게 다행이다"라고 느끼는 순간이 생겼으면 좋겠다',
          blanks: { '빈도': ['일주일에 한 번', '이틀에 한 번', '가끔은'] },
        },
        {
          level: 'large',
          id: 'g_direction_1_l',
          template: '아침에 눈을 떴을 때 오늘 하루가 어떨지 조금 궁금해지는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'm_direction_2': {
      domain: 'meaning',
      ladder: [
        {
          level: 'small',
          id: 'g_direction_2_s',
          template: '과거에 내가 좋아했거나 원했던 것을 [방법]으로 하나 떠올려볼 수 있었으면 좋겠다',
          blanks: { '방법': ['일기 찾아보기', '예전 사진 보기', '그냥 기억 더듬어보기'] },
        },
        {
          level: 'medium',
          id: 'g_direction_2_m',
          template: '[조건 없이] 뭔가 해보고 싶다는 느낌이 드는 것이 [빈도] 생겼으면 좋겠다',
          blanks: {
            '조건 없이': ['잘하지 않아도', '의미 없어도', '남이 몰라도'],
            '빈도': ['일주일에 한 번', '가끔은', '이따금'],
          },
        },
        {
          level: 'large',
          id: 'g_direction_2_l',
          template: '내가 뭘 원하는지 조금씩 알아가는 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'm_direction_3': {
      domain: 'meaning',
      ladder: [
        {
          level: 'small',
          id: 'g_direction_3_s',
          template: '오늘 하루 중 내가 선택해서 한 것이 [개수]라도 있었으면 좋겠다',
          blanks: { '개수': ['한 가지', '두 가지'] },
        },
        {
          level: 'medium',
          id: 'g_direction_3_m',
          template: '[빈도] 정도는 "오늘은 때운 게 아니라 뭔가 했다"는 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: { '빈도': ['일주일에 한 번', '이틀에 한 번', '며칠에 한 번'] },
        },
        {
          level: 'large',
          id: 'g_direction_3_l',
          template: '하루하루를 때우는 느낌이 아니라 내가 어디론가 가고 있다는 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    'm_direction_4': {
      domain: 'meaning',
      ladder: [
        {
          level: 'small',
          id: 'g_direction_4_s',
          template: '미래를 상상하려 할 때 [방법]으로 아주 작은 것 하나만 그려볼 수 있었으면 좋겠다',
          blanks: { '방법': ['어디서 살고 싶은지', '무엇을 안 하고 싶은지', '어떤 하루를 보내고 싶은지'] },
        },
        {
          level: 'medium',
          id: 'g_direction_4_m',
          template: '[기간] 뒤의 내 모습을 [방향] 정도로라도 상상해볼 수 있었으면 좋겠다',
          blanks: {
            '기간': ['3개월', '6개월', '1년'],
            '방향': ['어렴풋이', '한 가지라도'],
          },
        },
        {
          level: 'large',
          id: 'g_direction_4_l',
          template: '미래를 생각할 때 막막함보다 궁금함이 조금이라도 더 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── meaning > identity ───────────────────────────────────────────────────
    g_identity_1: {
      domain: 'meaning',
      subcategory: 'identity',
      linked_state: 'm_identity_1',
      ladder: [
        {
          level: 'small',
          id: 'g_identity_1_s',
          template: '오늘 내가 [상황]에서 어떤 감정을 느꼈는지 하나 떠올려볼 수 있었으면 좋겠다',
          blanks: { 상황: ['뭔가를 하면서', '누군가와 있을 때', '혼자 있을 때'] },
        },
        {
          level: 'medium',
          id: 'g_identity_1_m',
          template: '[빈도] 정도는 "이건 나답다" 혹은 "이건 나답지 않다"는 느낌을 하나 알아차릴 수 있었으면 좋겠다',
          blanks: { 빈도: ['일주일에 한 번', '가끔은', '이따금'] },
        },
        {
          level: 'large',
          id: 'g_identity_1_l',
          template: '"나는 어떤 사람이다"라는 느낌이 어렴풋이라도 생기는 날이 있었으면 좋겠다',
          blanks: {},
        },
      ],
    },
    g_identity_2: {
      domain: 'meaning',
      subcategory: 'identity',
      linked_state: 'm_identity_2',
      ladder: [
        {
          level: 'small',
          id: 'g_identity_2_s',
          template: '오늘 아주 작은 것 하나를 [기준] 없이 내가 하고 싶어서 해볼 수 있었으면 좋겠다',
          blanks: { 기준: ['남이 뭐라든 상관', '잘하든 못하든', '결과'] },
        },
        {
          level: 'medium',
          id: 'g_identity_2_m',
          template: '[상황]에서 타인이 기대하는 것이 아니라 내가 원하는 것을 [방법]으로 먼저 확인해볼 수 있었으면 좋겠다',
          blanks: {
            상황: ['선택해야 할 때', '의견을 말해야 할 때', '뭔가를 결정할 때'],
            방법: ['잠깐 멈추고', '속으로', '먼저'],
          },
        },
        {
          level: 'large',
          id: 'g_identity_2_l',
          template: '남이 원하는 것이 아니라 내 기준으로 하루를 보낼 수 있는 날이 늘었으면 좋겠다',
          blanks: {},
        },
      ],
    },
    g_identity_3: {
      domain: 'meaning',
      subcategory: 'identity',
      linked_state: 'm_identity_3',
      ladder: [
        {
          level: 'small',
          id: 'g_identity_3_s',
          template: '내 감정이나 생각이 틀렸는지 확인하기 전에 [방법]으로 먼저 그냥 느껴볼 수 있었으면 좋겠다',
          blanks: { 방법: ['잠깐 그냥 두는 것', '적어두는 것', '이름 붙여보는 것'] },
        },
        {
          level: 'medium',
          id: 'g_identity_3_m',
          template: '[상황]에서 타인의 반응을 살피기 전에 [잠깐] 내 반응을 먼저 확인해볼 수 있었으면 좋겠다',
          blanks: {
            상황: ['누군가와 대화할 때', '뭔가를 결정할 때', '의견을 말해야 할 때'],
            잠깐: ['1초라도', '짧게라도'],
          },
        },
        {
          level: 'large',
          id: 'g_identity_3_l',
          template: '내 감정과 생각이 맞는지 틀린지를 남에게 확인하지 않아도 되는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },
    g_identity_4: {
      domain: 'meaning',
      subcategory: 'identity',
      linked_state: 'm_identity_4',
      ladder: [
        {
          level: 'small',
          id: 'g_identity_4_s',
          template: '오늘 [작은 것]이 좋았는지 싫었는지 하나 알아차려볼 수 있었으면 좋겠다',
          blanks: { '작은 것': ['먹은 것', '한 활동', '만난 사람'] },
        },
        {
          level: 'medium',
          id: 'g_identity_4_m',
          template: '[빈도] 정도는 "이건 나한테 맞지 않아" 또는 "이건 나한테 좋아"라고 느끼는 순간을 기록해볼 수 있었으면 좋겠다',
          blanks: { 빈도: ['일주일에 한 번', '이틀에 한 번', '매일'] },
        },
        {
          level: 'large',
          id: 'g_identity_4_l',
          template: '내가 좋아하는 것과 싫어하는 것에 대해 조금씩 알아가는 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── meaning > enjoyment ──────────────────────────────────────────────────
    g_enjoyment_1: {
      domain: 'meaning',
      subcategory: 'enjoyment',
      linked_state: 'm_enjoyment_1',
      ladder: [
        {
          level: 'small',
          id: 'g_enjoyment_1_s',
          template: '예전에 좋아했던 것을 [시간]만 다시 해보는 경험을 쌓을 수 있었으면 좋겠다',
          blanks: { 시간: ['5분', '10분', '잠깐'] },
        },
        {
          level: 'medium',
          id: 'g_enjoyment_1_m',
          template: '[활동]을 할 때 예전과 [정도]라도 비슷한 느낌이 드는 날이 생겼으면 좋겠다',
          blanks: {
            활동: ['음악을 들을 때', '영상을 볼 때', '산책할 때'],
            정도: ['조금이라도', '어느 정도'],
          },
        },
        {
          level: 'large',
          id: 'g_enjoyment_1_l',
          template: '뭔가를 하다가 "이게 좋다"는 느낌이 자연스럽게 드는 날이 돌아왔으면 좋겠다',
          blanks: {},
        },
      ],
    },
    g_enjoyment_2: {
      domain: 'meaning',
      subcategory: 'enjoyment',
      linked_state: 'm_enjoyment_2',
      ladder: [
        {
          level: 'small',
          id: 'g_enjoyment_2_s',
          template: '뭔가 해보고 싶은 것이 생겼을 때 [방법]으로 딱 한 단계만 해볼 수 있었으면 좋겠다',
          blanks: { 방법: ['검색만', '유튜브에서 구경만', '준비물만 찾아보기'] },
        },
        {
          level: 'medium',
          id: 'g_enjoyment_2_m',
          template: '[활동]을 시작하면 [시간] 정도는 이어가볼 수 있었으면 좋겠다',
          blanks: {
            활동: ['관심 있는 것', '해보고 싶었던 것', '새로 시작한 것'],
            시간: ['10분', '15분', '20분'],
          },
        },
        {
          level: 'large',
          id: 'g_enjoyment_2_l',
          template: '시작한 것을 금방 그만두는 일이 조금씩 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },
    g_enjoyment_3: {
      domain: 'meaning',
      subcategory: 'enjoyment',
      linked_state: 'm_enjoyment_3',
      ladder: [
        {
          level: 'small',
          id: 'g_enjoyment_3_s',
          template: '쉬는 날 핸드폰 대신 [다른 것] 하나를 5분만 해볼 수 있었으면 좋겠다',
          blanks: { '다른 것': ['책 펼치기', '그림 그려보기', '음악 틀어두기'] },
        },
        {
          level: 'medium',
          id: 'g_enjoyment_3_m',
          template: '[빈도] 정도는 핸드폰 없이 뭔가에 집중해보는 시간이 생겼으면 좋겠다',
          blanks: { 빈도: ['주말에 한 번', '이틀에 한 번', '매일 잠깐'] },
        },
        {
          level: 'large',
          id: 'g_enjoyment_3_l',
          template: '핸드폰 없이도 시간을 보낼 수 있는 무언가가 하나 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },
    g_enjoyment_4: {
      domain: 'meaning',
      subcategory: 'enjoyment',
      linked_state: 'm_enjoyment_4',
      ladder: [
        {
          level: 'small',
          id: 'g_enjoyment_4_s',
          template: '[상황]에서 억지가 아닌 진짜 즐거움이 잠깐이라도 느껴지는 순간이 있었으면 좋겠다',
          blanks: { 상황: ['뭔가를 보거나 들을 때', '혼자 있을 때', '좋아하는 것을 할 때'] },
        },
        {
          level: 'medium',
          id: 'g_enjoyment_4_m',
          template: '[빈도] 정도는 즐겁다는 느낌이 실제로 드는 순간을 기억해두고 싶다',
          blanks: { 빈도: ['일주일에 한 번', '이틀에 한 번', '가끔이라도'] },
        },
        {
          level: 'large',
          id: 'g_enjoyment_4_l',
          template: '즐거운 척이 아니라 진짜로 즐겁다는 게 느껴지는 날이 늘어났으면 좋겠다',
          blanks: {},
        },
      ],
    },

    // ── meaning > autonomy ──────────────────────────────────────────────────
    g_autonomy_1: {
      domain: 'meaning',
      subcategory: 'autonomy',
      linked_state: 'm_autonomy_1',
      ladder: [
        {
          level: 'small',
          id: 'g_autonomy_1_s',
          template: '오늘 아주 작은 것 하나를 [방법]으로 내가 먼저 시작해볼 수 있었으면 좋겠다',
          blanks: { 방법: ['따져보지 않고 그냥', '일단 해보는 것으로', '작은 것부터'] },
        },
        {
          level: 'medium',
          id: 'g_autonomy_1_m',
          template: '[상황]에서 누군가에게 결정을 맡기기 전에 [방법]으로 내 생각을 먼저 확인해볼 수 있었으면 좋겠다',
          blanks: {
            상황: ['선택해야 할 때', '뭔가를 시작해야 할 때', '결정이 필요할 때'],
            방법: ['잠깐 멈추고', '종이에 적어보고', '속으로'],
          },
        },
        {
          level: 'large',
          id: 'g_autonomy_1_l',
          template: '일상의 작은 결정들을 내가 직접 내릴 수 있는 날이 늘었으면 좋겠다',
          blanks: {},
        },
      ],
    },
    g_autonomy_2: {
      domain: 'meaning',
      subcategory: 'autonomy',
      linked_state: 'm_autonomy_2',
      ladder: [
        {
          level: 'small',
          id: 'g_autonomy_2_s',
          template: '내가 원하는 것을 [방법]으로라도 한 마디 표현해볼 수 있었으면 좋겠다',
          blanks: { 방법: ['짧게', '간접적으로라도', '넌지시'] },
        },
        {
          level: 'medium',
          id: 'g_autonomy_2_m',
          template: '[상황]에서 상대방에게 맞추기 전에 내가 원하는 것을 [방법]으로 먼저 확인해볼 수 있었으면 좋겠다',
          blanks: {
            상황: ['음식을 고를 때', '계획을 세울 때', '의견을 말해야 할 때'],
            방법: ['속으로', '잠깐 생각하고', '적어보고'],
          },
        },
        {
          level: 'large',
          id: 'g_autonomy_2_l',
          template: '상대방에게 맞추는 것이 아니라 내가 원하는 것을 자연스럽게 말할 수 있게 됐으면 좋겠다',
          blanks: {},
        },
      ],
    },
    g_autonomy_3: {
      domain: 'meaning',
      subcategory: 'autonomy',
      linked_state: 'm_autonomy_3',
      ladder: [
        {
          level: 'small',
          id: 'g_autonomy_3_s',
          template: '오늘 한 가지 작은 결정을 내리고 나서 [시간]은 후회하지 않고 있을 수 있었으면 좋겠다',
          blanks: { 시간: ['1시간', '반나절', '하루'] },
        },
        {
          level: 'medium',
          id: 'g_autonomy_3_m',
          template: '[상황]에서 결정을 내린 뒤 [방법]으로 그 결정을 받아들여볼 수 있었으면 좋겠다',
          blanks: {
            상황: ['작은 것을 선택할 때', '일상적인 결정을 할 때', '뭔가를 고를 때'],
            방법: ['그냥 두는 것', '잘됐다고 여기는 것', '다음에 바꿔도 된다고 생각하는 것'],
          },
        },
        {
          level: 'large',
          id: 'g_autonomy_3_l',
          template: '결정한 뒤 계속 다시 생각하거나 후회하는 일이 조금씩 줄었으면 좋겠다',
          blanks: {},
        },
      ],
    },
    g_autonomy_4: {
      domain: 'meaning',
      subcategory: 'autonomy',
      linked_state: 'm_autonomy_4',
      ladder: [
        {
          level: 'small',
          id: 'g_autonomy_4_s',
          template: '오늘 하루 중 [하나]를 내가 원해서 했다고 느낄 수 있었으면 좋겠다',
          blanks: { 하나: ['한 가지', '작은 선택', '짧은 시간'] },
        },
        {
          level: 'medium',
          id: 'g_autonomy_4_m',
          template: '[빈도] 정도는 "오늘 이건 내가 선택한 것이다"라고 느낄 수 있는 순간이 있었으면 좋겠다',
          blanks: { 빈도: ['일주일에 한 번', '이틀에 한 번', '매일'] },
        },
        {
          level: 'large',
          id: 'g_autonomy_4_l',
          template: '상황에 떠밀리는 것이 아니라 내가 주도해서 하루를 보내는 날이 생겼으면 좋겠다',
          blanks: {},
        },
      ],
    },

  },

  // ── 2.4 루틴 ───────────────────────────────────────────────────────────────
  // 구조: routines[stateId] = RoutineItem[]
  // stateId 단위로 루틴 풀을 관리한다 (goal_id 단위 아님).
  // 같은 state의 모든 ladder 단계가 동일한 routine pool을 참조한다.
  // RoutineItem: { id, template, blanks, situational_tags }

  routines: {

    // ── symptom > anxiety ─────────────────────────────────────────────────────

    's_anxiety_1': [
      {
        id: 'rt_anxiety_1_breathing',
        template: '[시점]에 [시간] 동안 복식호흡 하기',
        blanks: { '시점': ['아침에', '불안할 때', '자기 전에'], '시간': ['1분', '3분', '5분'] },
        situational_tags: [],
      },
      {
        id: 'rt_anxiety_1_note',
        template: '불안한 생각이 들 때 한 줄로 적어두기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_anxiety_1_grounding',
        template: '[방법]으로 지금 이 순간에 집중해보기',
        blanks: { '방법': ['주변 사물 5가지 찾아보기', '발바닥 감각 느껴보기', '손에 닿는 것 만져보기'] },
        situational_tags: [],
      },
    ],

    's_anxiety_2': [
      {
        id: 'rt_anxiety_2_breathing_before',
        template: '[장소] 타기 직전에 [시간] 동안 천천히 숨 쉬기',
        blanks: { '장소': ['지하철', '엘리베이터'], '시간': ['30초', '1분'] },
        situational_tags: ['subway', 'crowd'],
      },
      {
        id: 'rt_anxiety_2_safe_object',
        template: '주머니나 가방에 마음이 편해지는 물건 하나 챙기기',
        blanks: {},
        situational_tags: ['subway', 'crowd'],
      },
      {
        id: 'rt_anxiety_2_music',
        template: '이동 중에는 좋아하는 음악이나 팟캐스트 틀어두기',
        blanks: {},
        situational_tags: ['subway'],
      },
    ],

    's_anxiety_3': [
      {
        id: 'rt_anxiety_3_phone_down',
        template: '자기 전 [시간] 동안 핸드폰 내려놓기',
        blanks: { '시간': ['10분', '20분', '30분'] },
        situational_tags: ['bedtime'],
      },
      {
        id: 'rt_anxiety_3_worry_note',
        template: '오늘 마음에 남는 걱정 한 가지를 적어두고 내일로 미뤄두기',
        blanks: {},
        situational_tags: ['bedtime'],
      },
      {
        id: 'rt_anxiety_3_routine_sound',
        template: '자기 전 [방법]으로 마음을 가라앉히기',
        blanks: { '방법': ['좋아하는 소리(백색소음, 음악) 듣기', '가벼운 스트레칭', '따뜻한 물 한 잔 마시기'] },
        situational_tags: ['bedtime'],
      },
    ],

    's_anxiety_4': [
      {
        id: 'rt_anxiety_4_breathing_before_social',
        template: '[상황] 전에 잠깐 호흡 가다듬기',
        blanks: { '상황': ['모임', '회의', '약속'] },
        situational_tags: ['social'],
      },
      {
        id: 'rt_anxiety_4_one_thing',
        template: '사람들과 있을 때 잘하려고 하기보다, [목표] 하나만 정해두기',
        blanks: { '목표': ['짧게 인사하기', '한 마디만 보태기', '편하게 듣기만 하기'] },
        situational_tags: ['social'],
      },
      {
        id: 'rt_anxiety_4_after_care',
        template: '사람들과 만난 후, 혼자만의 시간 [시간] 갖기',
        blanks: { '시간': ['10분', '20분', '30분'] },
        situational_tags: ['social'],
      },
    ],

    // ── relation > family ─────────────────────────────────────────────────────

    'r_family_1': [
      {
        id: 'rt_family_1_greeting',
        template: '[시점]에 가족에게 짧게 인사하기',
        blanks: { '시점': ['하루에 한 번', '아침에', '자기 전에'] },
        situational_tags: [],
      },
      {
        id: 'rt_family_1_meal',
        template: '[빈도] 가족과 같은 시간에 식사하기',
        blanks: { '빈도': ['일주일에 한 번', '일주일에 두 번', '매일 한 끼는'] },
        situational_tags: [],
      },
      {
        id: 'rt_family_1_share',
        template: '오늘 있었던 일 한 가지를 가족에게 짧게 이야기하기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'r_family_2': [
      {
        id: 'rt_family_2_short_answer',
        template: '바로 답하기 어려우면 "[표현]"이라고 먼저 말해두기',
        blanks: { '표현': ['지금은 좀 힘들어', '이따 얘기해도 될까', '괜찮아, 고마워'] },
        situational_tags: [],
      },
      {
        id: 'rt_family_2_journal',
        template: '가족에게 하고 싶은 말을 먼저 일기에 적어보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'r_family_3': [
      {
        id: 'rt_family_3_pause',
        template: '화가 올라올 때 [방법]으로 잠깐 멈추기',
        blanks: { '방법': ['숨을 세 번 깊게 쉬는 것', '잠깐 다른 방으로 가는 것', '물 한 잔 마시는 것'] },
        situational_tags: [],
      },
      {
        id: 'rt_family_3_note_after',
        template: '화낸 뒤, 오늘 기분과 상황을 짧게 기록해보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'r_family_4': [
      {
        id: 'rt_family_4_thanks',
        template: '가족에게 "[표현]" 같은 말 한 마디 해보기',
        blanks: { '표현': ['고마워', '오늘 도와줘서 고마웠어', '같이 있어줘서 좋아'] },
        situational_tags: [],
      },
      {
        id: 'rt_family_4_reframe',
        template: '"짐이 된다"는 생각이 들 때, 그 생각을 적어두고 다시 읽어보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── symptom > mood ───────────────────────────────────────────────────────

    's_mood_1': [
      {
        id: 'rt_mood_1_act',
        template: '일어나면 [행동]부터 하기',
        blanks: { '행동': ['커튼 열기', '물 한 잔 마시기', '좋아하는 음악 틀기'] },
        situational_tags: ['morning'],
      },
      {
        id: 'rt_mood_1_record',
        template: '오늘 기분을 숫자(1~10)나 날씨로 짧게 기록해두기',
        blanks: {},
        situational_tags: ['morning'],
      },
      {
        id: 'rt_mood_1_wake_body',
        template: '침대에서 나오기 전에 [방법]으로 몸을 깨우기',
        blanks: { '방법': ['스트레칭 30초', '크게 기지개 켜기', '심호흡 세 번'] },
        situational_tags: ['morning'],
      },
    ],

    's_mood_2': [
      {
        id: 'rt_mood_2_allow',
        template: '눈물이 나면 억지로 멈추려 하지 말고 [시간] 동안 그냥 두기',
        blanks: { '시간': ['1분', '3분', '5분'] },
        situational_tags: [],
      },
      {
        id: 'rt_mood_2_word',
        template: '울고 나서, 지금 느끼는 것 한 단어로만 적어두기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_mood_2_warm',
        template: '[방법]으로 몸을 따뜻하게 해주기',
        blanks: { '방법': ['따뜻한 물 마시기', '담요 덮기', '손을 따뜻하게 비비기'] },
        situational_tags: [],
      },
    ],

    's_mood_3': [
      {
        id: 'rt_mood_3_tiny',
        template: '[활동]을 [시간]만 해보기',
        blanks: { '활동': ['좋아했던 음악 듣기', '예전에 보던 영상 틀기', '산책'], '시간': ['5분', '10분'] },
        situational_tags: [],
      },
      {
        id: 'rt_mood_3_least_bad',
        template: '오늘 그나마 덜 싫었던 것 하나 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    's_mood_4': [
      {
        id: 'rt_mood_4_pause',
        template: '기분이 갑자기 나빠진 순간, [방법]으로 잠깐 멈추기',
        blanks: { '방법': ['심호흡 세 번', '그 자리 벗어나기', '물 한 잔 마시기'] },
        situational_tags: [],
      },
      {
        id: 'rt_mood_4_log',
        template: '하루 끝에 오늘 기분의 흐름을 두세 줄로 메모해두기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_mood_4_anchor',
        template: '기분이 처질 때를 대비해 [위로가 되는 것]을 미리 정해두기',
        blanks: { '위로가 되는 것': ['좋아하는 영상 하나', '산책 코스', '연락할 수 있는 사람'] },
        situational_tags: [],
      },
    ],

    // ── symptom > sleep ──────────────────────────────────────────────────────

    's_sleep_1': [
      {
        id: 'rt_sleep_1_phone',
        template: '자기 전 [시간] 동안 핸드폰 내려놓기',
        blanks: { '시간': ['15분', '20분', '30분'] },
        situational_tags: ['bedtime'],
      },
      {
        id: 'rt_sleep_1_relax',
        template: '누웠을 때 [방법]으로 몸을 이완시켜보기',
        blanks: { '방법': ['발끝부터 천천히 힘 빼기', '복식호흡 5회', '4-7-8 호흡법'] },
        situational_tags: ['bedtime'],
      },
      {
        id: 'rt_sleep_1_worry_dump',
        template: '잠자리에 들기 전 걱정이 떠오르면 노트에 적어두고 덮어두기',
        blanks: {},
        situational_tags: ['bedtime'],
      },
    ],

    's_sleep_2': [
      {
        id: 'rt_sleep_2_no_phone',
        template: '새벽에 깼을 때 핸드폰 대신 [방법] 시도해보기',
        blanks: { '방법': ['백색소음 틀기', '눈 감고 호흡 세기', '이완 음성 듣기'] },
        situational_tags: ['night_wake'],
      },
      {
        id: 'rt_sleep_2_no_clock',
        template: '새벽에 깨도 시계나 핸드폰으로 시간 확인하지 않기',
        blanks: {},
        situational_tags: ['night_wake'],
      },
    ],

    's_sleep_3': [
      {
        id: 'rt_sleep_3_light',
        template: '일어나면 바로 [방법]으로 빛 쬐기',
        blanks: { '방법': ['커튼 열기', '잠깐 밖에 나가기', '창가에 서기'] },
        situational_tags: ['morning'],
      },
      {
        id: 'rt_sleep_3_move',
        template: '오전 중 [시간] 가벼운 움직임 하기',
        blanks: { '시간': ['5분', '10분', '15분'] },
        situational_tags: ['morning'],
      },
    ],

    's_sleep_4': [
      {
        id: 'rt_sleep_4_log',
        template: '오늘 잠든 시간과 일어난 시간 짧게 기록해두기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_sleep_4_nap_alarm',
        template: '낮잠을 자고 싶으면 [시간] 알람 맞추기',
        blanks: { '시간': ['15분', '20분', '30분'] },
        situational_tags: [],
      },
      {
        id: 'rt_sleep_4_weekend_alarm',
        template: '주말에도 [목표시각]에는 눈을 뜨려고 알람 맞추기',
        blanks: { '목표시각': ['8시', '9시', '10시'] },
        situational_tags: [],
      },
    ],

    // ── symptom > cognition ──────────────────────────────────────────────────

    's_cognition_1': [
      {
        id: 'rt_cognition_1_chunk',
        template: '[분량]만 읽고 멈추기',
        blanks: { '분량': ['5분', '한 페이지', '한 단락'] },
        situational_tags: ['reading', 'work'],
      },
      {
        id: 'rt_cognition_1_timing',
        template: '집중이 잘 되는 [시간대]에 중요한 것부터 배치해보기',
        blanks: { '시간대': ['오전 중', '식후 한 시간', '저녁'] },
        situational_tags: ['work'],
      },
    ],

    's_cognition_2': [
      {
        id: 'rt_cognition_2_just_start',
        template: '하기 싫어도 [시간]만 일단 해보기',
        blanks: { '시간': ['5분', '10분', '딱 한 가지'] },
        situational_tags: ['work'],
      },
      {
        id: 'rt_cognition_2_one_task',
        template: '오늘 꼭 할 것 한 가지만 적어두고 그것만 끝내기',
        blanks: {},
        situational_tags: ['work'],
      },
      {
        id: 'rt_cognition_2_phone_away',
        template: '시작하기 전에 핸드폰 뒤집어두거나 다른 방에 두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    's_cognition_3': [
      {
        id: 'rt_cognition_3_memo',
        template: '대화 중 중요한 것은 짧게 메모해두기',
        blanks: {},
        situational_tags: ['social'],
      },
      {
        id: 'rt_cognition_3_prep',
        template: '대화 전에 [방법]으로 머리 가볍게 하기',
        blanks: { '방법': ['물 마시기', '잠깐 심호흡', '잠깐 걷기'] },
        situational_tags: ['social'],
      },
    ],

    's_cognition_4': [
      {
        id: 'rt_cognition_4_stop_signal',
        template: '같은 생각이 돌 때 [방법]으로 멈춤 신호 주기',
        blanks: { '방법': ['생각 노트에 적기', '소리 내어 "그만"이라고 말하기', '찬물로 세수하기'] },
        situational_tags: [],
      },
      {
        id: 'rt_cognition_4_switch',
        template: '생각이 반복될 때 [활동]으로 전환해보기',
        blanks: { '활동': ['산책', '설거지 같은 단순 작업', '음악 듣기'] },
        situational_tags: [],
      },
    ],

    // ── symptom > physical ───────────────────────────────────────────────────

    's_physical_1': [
      {
        id: 'rt_physical_1_walk',
        template: '[시간] 가볍게 산책하거나 몸 움직여보기',
        blanks: { '시간': ['5분', '10분', '15분'] },
        situational_tags: [],
      },
      {
        id: 'rt_physical_1_stretch',
        template: '자기 전 [방법]으로 몸 이완시켜보기',
        blanks: { '방법': ['전신 스트레칭', '다리 들어올리기', '발목 천천히 돌리기'] },
        situational_tags: [],
      },
    ],

    's_physical_2': [
      {
        id: 'rt_physical_2_stretch_timed',
        template: '[시점]에 목·어깨 스트레칭 2~3분 하기',
        blanks: { '시점': ['일어나면', '점심 후에', '취침 전에'] },
        situational_tags: [],
      },
      {
        id: 'rt_physical_2_relief',
        template: '통증이 느껴질 때 [방법] 바로 시도해보기',
        blanks: { '방법': ['온찜질 팩 올려두기', '어깨 크게 한 번 돌리기', '잠깐 눕기'] },
        situational_tags: [],
      },
    ],

    's_physical_3': [
      {
        id: 'rt_physical_3_easy_food',
        template: '먹기 싫어도 [음식] 정도는 챙겨두기',
        blanks: { '음식': ['음료나 간식', '과일 한 조각', '간단한 것 하나'] },
        situational_tags: ['mealtime'],
      },
      {
        id: 'rt_physical_3_meal_time',
        template: '밥 먹는 시간을 하루에 [횟수] 미리 정해두기',
        blanks: { '횟수': ['한 번', '두 번', '세 번'] },
        situational_tags: ['mealtime'],
      },
      {
        id: 'rt_physical_3_pause_binge',
        template: '폭식 충동이 올 때 [방법]으로 잠깐 멈추기',
        blanks: { '방법': ['물 한 잔 마시기', '자리에서 일어나기', '5분 기다려보기'] },
        situational_tags: [],
      },
    ],

    's_physical_4': [
      {
        id: 'rt_physical_4_breathe',
        template: '가슴이 답답할 때 [방법]으로 호흡 조절해보기',
        blanks: { '방법': ['4초 들이쉬고 6초 내쉬기', '복식호흡 3회', '천천히 내쉬기에만 집중하기'] },
        situational_tags: [],
      },
      {
        id: 'rt_physical_4_posture',
        template: '[시점]에 자세 확인하고 어깨 펴기',
        blanks: { '시점': ['한 시간마다', '점심 후', '오후 3시쯤'] },
        situational_tags: [],
      },
    ],

    // ── symptom > impulse ───────────────────────────────────────────────────

    's_impulse_1': [
      {
        id: 'rt_impulse_1_stop',
        template: '화가 올라올 때 [방법]으로 그 자리에서 멈추기',
        blanks: { '방법': ['입 다물고 숨 세 번', '속으로 10까지 세기', '손 꽉 쥐었다가 풀기'] },
        situational_tags: [],
      },
      {
        id: 'rt_impulse_1_log',
        template: '화낸 뒤 어떤 상황이었는지 두세 줄 기록해두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    's_impulse_2': [
      {
        id: 'rt_impulse_2_wait',
        template: '충동이 생겼을 때 [시간] 기다려보기',
        blanks: { '시간': ['5분', '10분', '15분'] },
        situational_tags: [],
      },
      {
        id: 'rt_impulse_2_alt',
        template: '대신 할 수 있는 [활동]을 미리 정해두기',
        blanks: { '활동': ['산책 나가기', '냉수 한 잔 마시기', '좋아하는 영상 보기'] },
        situational_tags: [],
      },
    ],

    's_impulse_3': [
      {
        id: 'rt_impulse_3_pause',
        template: '갈등이 생기면 [방법]으로 대화를 잠깐 멈추기',
        blanks: { '방법': ['"잠깐만"이라고 말하기', '물 한 잔 가져오기', '화장실에 다녀오기'] },
        situational_tags: ['social'],
      },
      {
        id: 'rt_impulse_3_sorry',
        template: '사과해야 할 때 [형식]으로라도 마음 전하기',
        blanks: { '형식': ['직접 말로', '문자로', '메모 남겨두기'] },
        situational_tags: ['social'],
      },
    ],

    's_impulse_4': [
      {
        id: 'rt_impulse_4_log',
        template: '하루 한 번, 감정이 올라온 순간을 짧게 기록해두기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_impulse_4_signal',
        template: '[신호]를 느끼면 그 자리에서 심호흡 한 번 하기',
        blanks: { '신호': ['가슴이 빨라질 때', '어깨가 올라갈 때', '목소리가 커지려 할 때'] },
        situational_tags: [],
      },
    ],

    // ── function > daily_routine ─────────────────────────────────────────────

    'f_daily_1': [
      {
        id: 'rt_daily_1_alarm',
        template: '알람을 [개수] 이상 맞추지 않기',
        blanks: { '개수': ['세 개', '두 개', '한 개'] },
        situational_tags: ['morning'],
      },
      {
        id: 'rt_daily_1_first_act',
        template: '일어나면 [행동]부터 바로 하기',
        blanks: { '행동': ['커튼 열기', '물 한 잔 마시기', '세수하기'] },
        situational_tags: ['morning'],
      },
      {
        id: 'rt_daily_1_decide_night',
        template: '전날 밤에 내일 일어날 시간 딱 하나만 정해두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'f_daily_2': [
      {
        id: 'rt_daily_2_write_one',
        template: '하루에 꼭 할 것 한 가지를 [방법]으로 적어두기',
        blanks: { '방법': ['메모앱에', '포스트잇에', '노트에'] },
        situational_tags: [],
      },
      {
        id: 'rt_daily_2_two_min',
        template: '"나중에"라는 생각이 들면 [시간]만 먼저 해보기',
        blanks: { '시간': ['1분', '2분', '5분'] },
        situational_tags: [],
      },
    ],

    'f_daily_3': [
      {
        id: 'rt_daily_3_charge_out',
        template: '자기 [시간] 전부터 핸드폰 충전은 다른 방에서 하기',
        blanks: { '시간': ['30분', '1시간'] },
        situational_tags: ['bedtime'],
      },
      {
        id: 'rt_daily_3_replace',
        template: '누웠을 때 핸드폰 대신 [대안]을 옆에 두기',
        blanks: { '대안': ['책', '수면 음악용 이어폰', '일기장'] },
        situational_tags: ['bedtime'],
      },
    ],

    'f_daily_4': [
      {
        id: 'rt_daily_4_plan_one',
        template: '하루를 시작할 때 오늘 할 것 [개수]만 정해두기',
        blanks: { '개수': ['한 가지', '두 가지'] },
        situational_tags: [],
      },
      {
        id: 'rt_daily_4_morning_win',
        template: '오전 안에 [작은 것] 하나 끝내고 스스로 칭찬해주기',
        blanks: { '작은 것': ['이메일 확인', '설거지', '방 환기'] },
        situational_tags: ['morning'],
      },
      {
        id: 'rt_daily_4_end_review',
        template: '하루 끝에 오늘 한 것 한 가지만 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── function > work_study ────────────────────────────────────────────────

    'f_work_1': [
      {
        id: 'rt_work_1_timer',
        template: '핸드폰 다른 곳에 두고 [시간] 타이머 맞추기',
        blanks: { '시간': ['5분', '10분', '25분'] },
        situational_tags: ['work'],
      },
      {
        id: 'rt_work_1_one_task',
        template: '시작하기 전에 오늘 할 것 [개수]만 적어두기',
        blanks: { '개수': ['한 가지', '두 가지'] },
        situational_tags: ['work'],
      },
    ],

    'f_work_2': [
      {
        id: 'rt_work_2_list_early',
        template: '마감 [기간] 전에 할 일 목록만 먼저 써두기',
        blanks: { '기간': ['3일', '이틀', '하루'] },
        situational_tags: ['deadline'],
      },
      {
        id: 'rt_work_2_smallest_step',
        template: '가장 작은 한 단계만 정해두고 그것만 하기',
        blanks: {},
        situational_tags: ['work', 'deadline'],
      },
      {
        id: 'rt_work_2_body_first',
        template: '시작이 힘들 때 [방법]으로 몸만 먼저 책상에 앉아보기',
        blanks: { '방법': ['타이머 1분 맞추기', '의자만 당겨 앉기', '노트만 펼쳐두기'] },
        situational_tags: ['work'],
      },
    ],

    'f_work_3': [
      {
        id: 'rt_work_3_step_out',
        template: '실수한 뒤 [방법]으로 잠깐 자리 피하기',
        blanks: { '방법': ['물 마시러 가기', '화장실 다녀오기', '짧게 산책하기'] },
        situational_tags: ['work'],
      },
      {
        id: 'rt_work_3_one_good',
        template: '오늘 잘한 것 한 가지를 억지로라도 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'f_work_4': [
      {
        id: 'rt_work_4_log_done',
        template: '오늘 내가 한 것 중 가장 작은 것이라도 [방법]으로 기록하기',
        blanks: { '방법': ['메모앱에', '노트에 한 줄', '문자로 나 자신에게'] },
        situational_tags: ['work'],
      },
      {
        id: 'rt_work_4_micro_goal',
        template: '잘하려는 게 아니라 [목표] 하나만 정하고 출근·등교하기',
        blanks: { '목표': ['그냥 자리에 앉기', '한 가지만 끝내기', '인사 한 번 하기'] },
        situational_tags: ['work'],
      },
    ],

    // ── function > household ──────────────────────────────────────────────────

    'f_house_1': [
      {
        id: 'rt_house_1_pick_one',
        template: '오늘 할 집안일 [개수]만 골라두기',
        blanks: { '개수': ['한 가지', '두 가지'] },
        situational_tags: [],
      },
      {
        id: 'rt_house_1_right_after',
        template: '[시점]에 집안일 하나 바로 해치우기',
        blanks: { '시점': ['밥 먹고 바로', '씻고 나서', '일어나자마자'] },
        situational_tags: [],
      },
    ],

    'f_house_2': [
      {
        id: 'rt_house_2_capture',
        template: '중요한 일이 생기면 바로 [방법]으로 기록해두기',
        blanks: { '방법': ['달력에 표시', '메모앱에', '손에 메모'] },
        situational_tags: [],
      },
      {
        id: 'rt_house_2_alarm_ahead',
        template: '마감이 있는 일은 [기간] 전에 알람 맞춰두기',
        blanks: { '기간': ['3일', '일주일', '하루'] },
        situational_tags: [],
      },
    ],

    'f_house_3': [
      {
        id: 'rt_house_3_grocery',
        template: '주 [횟수] 장 보거나 먹을 것 미리 사두기',
        blanks: { '횟수': ['한 번', '두 번'] },
        situational_tags: ['mealtime'],
      },
      {
        id: 'rt_house_3_simple_menu',
        template: '간단히 만들 수 있는 것 [개수] 미리 정해두기',
        blanks: { '개수': ['한 가지', '두 가지'] },
        situational_tags: ['mealtime'],
      },
    ],

    'f_house_4': [
      {
        id: 'rt_house_4_timed_tidy',
        template: '[시간]만 정리하고 멈추기',
        blanks: { '시간': ['5분', '10분', '15분'] },
        situational_tags: [],
      },
      {
        id: 'rt_house_4_recall',
        template: '오늘 치운 것 한 가지만 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── function > self_care ─────────────────────────────────────────────────

    'f_self_1': [
      {
        id: 'rt_self_1_note_symptom',
        template: '몸이 불편하면 [방법]으로 증상 메모해두기',
        blanks: { '방법': ['메모앱에', '노트에', '캘린더에'] },
        situational_tags: [],
      },
      {
        id: 'rt_self_1_med_visible',
        template: '먹어야 할 약이나 비타민을 [장소]에 꺼내두기',
        blanks: { '장소': ['책상 위에', '물 옆에', '잘 보이는 곳에'] },
        situational_tags: [],
      },
    ],

    'f_self_2': [
      {
        id: 'rt_self_2_wash_timed',
        template: '[시점]에 샤워나 세수 바로 하기',
        blanks: { '시점': ['일어나면', '저녁 먹고 나서', '자기 전에'] },
        situational_tags: [],
      },
      {
        id: 'rt_self_2_warm_up',
        template: '씻기 전에 [방법]으로 몸을 먼저 깨워두기',
        blanks: { '방법': ['스트레칭 1분', '가볍게 걷기', '기지개 한 번'] },
        situational_tags: [],
      },
    ],

    'f_self_3': [
      {
        id: 'rt_self_3_move',
        template: '[시점]에 [활동] [시간]만 하기',
        blanks: {
          '시점': ['아침에', '점심 후에', '자기 전에'],
          '활동': ['스트레칭', '걷기'],
          '시간': ['5분', '10분'],
        },
        situational_tags: [],
      },
      {
        id: 'rt_self_3_log_mood',
        template: '움직이고 나서 오늘 기분 짧게 기록해두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'f_self_4': [
      {
        id: 'rt_self_4_log_treat',
        template: '오늘 나를 위해 한 것 한 가지만 적어두기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_self_4_schedule',
        template: '[좋아하는 것] 하나를 오늘 일정에 넣어두기',
        blanks: { '좋아하는 것': ['좋아하는 음악 틀기', '맛있는 것 한 가지', '짧은 산책'] },
        situational_tags: [],
      },
    ],

    // ── relation > friend ────────────────────────────────────────────────────

    'r_friend_1': [
      {
        id: 'rt_friend_1_reply_today',
        template: '연락이 오면 [시간] 안에 짧게라도 답하기',
        blanks: { '시간': ['당일', '두 시간', '한 시간'] },
        situational_tags: [],
      },
      {
        id: 'rt_friend_1_placeholder',
        template: '바로 답하기 어려우면 "[표현]"이라고 먼저 보내두기',
        blanks: { '표현': ['조금 이따 연락할게', '요즘 좀 힘들어, 나중에 얘기해도 될까', '잘 지내지? 나중에 연락해'] },
        situational_tags: [],
      },
    ],

    'r_friend_2': [
      {
        id: 'rt_friend_2_reach_out',
        template: '생각나는 친구에게 [방법]으로 짧은 안부 보내기',
        blanks: { '방법': ['문자로', '카카오로', '인스타 DM으로'] },
        situational_tags: [],
      },
      {
        id: 'rt_friend_2_prep',
        template: '연락하기 전에 [내용] 하나만 미리 생각해두기',
        blanks: { '내용': ['공유하고 싶은 것', '물어보고 싶은 것', '그냥 잘 지내냐고'] },
        situational_tags: [],
      },
    ],

    'r_friend_3': [
      {
        id: 'rt_friend_3_buffer_day',
        template: '만남 다음 날은 [방법]으로 혼자 쉬는 시간 미리 비워두기',
        blanks: { '방법': ['약속 잡지 않기', '느슨한 일정으로만', '집에서 쉬기로'] },
        situational_tags: ['social'],
      },
      {
        id: 'rt_friend_3_recover',
        template: '만나고 온 날 [활동]으로 몸과 마음 추스르기',
        blanks: { '활동': ['좋아하는 것 하기', '조용히 누워있기', '가벼운 스트레칭'] },
        situational_tags: ['social'],
      },
    ],

    'r_friend_4': [
      {
        id: 'rt_friend_4_unplug',
        template: 'SNS 보다 비교되는 느낌이 들면 [방법]으로 잠깐 벗어나기',
        blanks: { '방법': ['앱 닫기', '핸드폰 내려두기', '다른 것 보기'] },
        situational_tags: ['social'],
      },
      {
        id: 'rt_friend_4_own_step',
        template: '오늘 내가 한 것 중 작은 것 하나 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── relation > partner ───────────────────────────────────────────────────

    'r_partner_1': [
      {
        id: 'rt_partner_1_pause',
        template: '화가 날 때 [방법]으로 일단 멈추기',
        blanks: { '방법': ['10까지 세기', '잠깐 다른 방 가기', '심호흡 세 번'] },
        situational_tags: [],
      },
      {
        id: 'rt_partner_1_repair',
        template: '다툰 뒤 [시점]에 사과나 화해의 말 먼저 건네보기',
        blanks: { '시점': ['한 시간 후', '자기 전에', '상대방이 진정된 것 같을 때'] },
        situational_tags: [],
      },
    ],

    'r_partner_2': [
      {
        id: 'rt_partner_2_phone_free',
        template: '식사할 때 [시간]은 핸드폰 없이 함께하기',
        blanks: { '시간': ['5분', '10분', '밥 먹는 내내'] },
        situational_tags: [],
      },
      {
        id: 'rt_partner_2_check_in',
        template: '자기 전에 오늘 하루 각자 어땠는지 짧게 나누기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'r_partner_3': [
      {
        id: 'rt_partner_3_signal',
        template: '힘든 날 파트너에게 "[표현]"이라고 먼저 말해두기',
        blanks: { '표현': ['오늘 좀 힘들었어', '지금 여유가 없어', '나중에 얘기해도 될까'] },
        situational_tags: [],
      },
      {
        id: 'rt_partner_3_text_first',
        template: '말하기 어려울 때 문자나 메모로 먼저 전달해보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'r_partner_4': [
      {
        id: 'rt_partner_4_rephrase',
        template: '이해받지 못한 것 같을 때 [방법]으로 다시 표현해보기',
        blanks: { '방법': ['더 구체적인 예를 들어', '"내가 원하는 건 ~야"라고', '잠시 쉬었다가 다시'] },
        situational_tags: [],
      },
      {
        id: 'rt_partner_4_recall_good',
        template: '파트너와 함께한 시간 중 좋았던 것 하나 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── relation > work_social ────────────────────────────────────────────────

    'r_work_1': [
      {
        id: 'rt_work_social_1_prep',
        template: '[자리]에 가기 전에 [방법]으로 마음 준비하기',
        blanks: {
          '자리': ['점심', '회식', '팀 모임'],
          '방법': ['심호흡 한 번', '"짧게만 있다 가면 돼"라고 마음먹기', '작은 목표 하나 정하기'],
        },
        situational_tags: ['work', 'social'],
      },
      {
        id: 'rt_work_social_1_recover',
        template: '자리 후 [방법]으로 혼자 회복 시간 갖기',
        blanks: { '방법': ['혼자 커피 한 잔', '짧은 산책', '잠깐 자리 피하기'] },
        situational_tags: ['work'],
      },
    ],

    'r_work_2': [
      {
        id: 'rt_work_social_2_prep_note',
        template: '회의 전에 하고 싶은 말 [방법]으로 미리 정리해두기',
        blanks: { '방법': ['노트에', '메모앱에', '한 줄로'] },
        situational_tags: ['work'],
      },
      {
        id: 'rt_work_social_2_follow_up',
        template: '말 못 한 의견은 회의 후 [방법]으로 전달해보기',
        blanks: { '방법': ['이메일로', '채팅으로', '1:1로 따로'] },
        situational_tags: ['work'],
      },
    ],

    'r_work_3': [
      {
        id: 'rt_work_social_3_step_out',
        template: '지적받은 후 [방법]으로 잠깐 자리 피하기',
        blanks: { '방법': ['물 마시러 가기', '화장실 다녀오기', '짧게 걷기'] },
        situational_tags: ['work'],
      },
      {
        id: 'rt_work_social_3_one_good',
        template: '오늘 잘한 것 한 가지를 억지로라도 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'r_work_4': [
      {
        id: 'rt_work_social_4_initiate',
        template: '오늘 동료 한 명에게 [방법]으로 말 먼저 걸어보기',
        blanks: { '방법': ['인사 건네기', '짧은 안부 묻기', '가벼운 것 물어보기'] },
        situational_tags: ['work', 'social'],
      },
      {
        id: 'rt_work_social_4_log',
        template: '대화 후 어땠는지 기분 짧게 기록해두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── relation > isolation ─────────────────────────────────────────────────

    'r_isolation_1': [
      {
        id: 'rt_isolation_1_own_time',
        template: '혼자인 시간에 [활동] 하나를 "내 시간"처럼 정해두기',
        blanks: { '활동': ['좋아하는 음악 듣기', '산책', '좋아하는 것 보기'] },
        situational_tags: [],
      },
      {
        id: 'rt_isolation_1_reach',
        template: '너무 외로울 때 [방법]으로 짧게 연결해보기',
        blanks: { '방법': ['문자 하나 보내기', '짧은 통화', '온라인으로 누군가와 접속'] },
        situational_tags: [],
      },
    ],

    'r_isolation_2': [
      {
        id: 'rt_isolation_2_share',
        template: '오늘 있었던 것 중 기억에 남는 것 하나를 [방법]으로 누군가에게 전하기',
        blanks: { '방법': ['카카오 메시지로', '인스타 DM으로', '전화로'] },
        situational_tags: [],
      },
      {
        id: 'rt_isolation_2_journal',
        template: '연락하기 어려우면 일기나 메모앱에 오늘 있었던 것 짧게 남겨두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'r_isolation_3': [
      {
        id: 'rt_isolation_3_low_bar',
        template: '사람 많은 자리 대신 [부담 적은 것]부터 시도해보기',
        blanks: { '부담 적은 것': ['온라인 모임 구경', '관심사 커뮤니티 글 보기', '혼자 갈 수 있는 모임 찾아보기'] },
        situational_tags: ['social'],
      },
      {
        id: 'rt_isolation_3_recover',
        template: '만남이 끝나면 [방법]으로 충분히 회복하기',
        blanks: { '방법': ['조용히 혼자 쉬기', '좋아하는 것 하기', '아무것도 안 해도 됨을 허락하기'] },
        situational_tags: ['social'],
      },
    ],

    'r_isolation_4': [
      {
        id: 'rt_isolation_4_find_similar',
        template: '비슷한 경험을 나눈 글이나 콘텐츠 [방법]으로 찾아보기',
        blanks: { '방법': ['검색해보기', '유튜브에서', '관련 커뮤니티에서'] },
        situational_tags: [],
      },
      {
        id: 'rt_isolation_4_understood_moment',
        template: '오늘 조금이라도 이해받은 것 같았던 순간 하나 적어두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── meaning > direction ──────────────────────────────────────────────────

    'm_direction_1': [
      {
        id: 'rt_direction_1_good_thing',
        template: '하루 끝에 오늘 그나마 좋았던 것 [방법]으로 남겨두기',
        blanks: { '방법': ['한 줄로 적기', '사진으로', '마음속에 기억해두기'] },
        situational_tags: [],
      },
      {
        id: 'rt_direction_1_tomorrow',
        template: '내일 기대되는 것 [크기] 하나 미리 정해두기',
        blanks: { '크기': ['아무리 작아도', '억지로라도', '딱 한 가지'] },
        situational_tags: [],
      },
    ],

    'm_direction_2': [
      {
        id: 'rt_direction_2_look_back',
        template: '예전에 좋아했던 것 [방법]으로 잠깐 들여다보기',
        blanks: { '방법': ['유튜브 검색해보기', '일기 꺼내보기', '예전 사진 앨범 보기'] },
        situational_tags: [],
      },
      {
        id: 'rt_direction_2_note_want',
        template: '지금 뭔가 해보고 싶다는 느낌이 드는 것 하나 메모해두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    'm_direction_3': [
      {
        id: 'rt_direction_3_chosen',
        template: '오늘 내가 "선택해서" 한 것 한 가지 적어두기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_direction_3_next',
        template: '내일 해보고 싶은 것 [크기]만 정해두기',
        blanks: { '크기': ['아주 작은 것', '간단한 것', '딱 하나'] },
        situational_tags: [],
      },
    ],

    'm_direction_4': [
      {
        id: 'rt_direction_4_imagine',
        template: '1년 후 내가 바라는 하루를 [방법]으로 상상해보기',
        blanks: { '방법': ['글로 적어보기', '그림으로 그려보기', '눈 감고 떠올려보기'] },
        situational_tags: [],
      },
      {
        id: 'rt_direction_4_not_want',
        template: '지금 "이건 하기 싫어"라고 느끼는 것 하나 적어두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── meaning > identity ───────────────────────────────────────────────────
    g_identity_1: [
      {
        id: 'rt_identity_1a',
        template: '하루 끝에 오늘 "나다웠던" 순간 하나 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_identity_1b',
        template: '지금 느끼는 감정에 [방법]으로 이름 붙여보기',
        blanks: { 방법: ['한 단어로', '날씨로', '색깔로'] },
        situational_tags: [],
      },
    ],
    g_identity_2: [
      {
        id: 'rt_identity_2a',
        template: '오늘 내가 "선택해서" 한 것 하나 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_identity_2b',
        template: '선택해야 할 때 [방법]으로 내 기분을 먼저 확인하기',
        blanks: { 방법: ['잠깐 눈 감고', '속으로 "나는?"이라고 물어보며', '먼저 적어보고 나서'] },
        situational_tags: [],
      },
    ],
    g_identity_3: [
      {
        id: 'rt_identity_3a',
        template: '타인의 반응이 신경 쓰일 때 [방법]으로 내 감정 먼저 확인하기',
        blanks: { 방법: ['노트에 적어두기', '혼자 말로 중얼거리기', '잠깐 멈추기'] },
        situational_tags: ['social'],
      },
      {
        id: 'rt_identity_3b',
        template: '오늘 느낀 것 중 "맞아, 이건 내 감정이다"라고 느낀 것 하나 적어두기',
        blanks: {},
        situational_tags: [],
      },
    ],
    g_identity_4: [
      {
        id: 'rt_identity_4a',
        template: '오늘 좋았던 것 / 별로였던 것 각각 [개수]씩 적어두기',
        blanks: { 개수: ['하나씩', '둘씩'] },
        situational_tags: [],
      },
      {
        id: 'rt_identity_4b',
        template: '"이건 확실히 내가 싫어하는 것"이라는 것 하나 떠올려 적어두기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── meaning > enjoyment ──────────────────────────────────────────────────
    g_enjoyment_1: [
      {
        id: 'rt_enjoyment_1a',
        template: '예전에 좋아했던 것을 [시간]만 그냥 해보기',
        blanks: { 시간: ['5분', '10분'] },
        situational_tags: [],
      },
      {
        id: 'rt_enjoyment_1b',
        template: '오늘 아주 잠깐이라도 느낌이 있었던 것 하나 기록해두기',
        blanks: {},
        situational_tags: [],
      },
    ],
    g_enjoyment_2: [
      {
        id: 'rt_enjoyment_2a',
        template: '해보고 싶은 것이 생기면 [방법]으로 첫 단계만 해두기',
        blanks: { 방법: ['검색만', '탭 열어두기', '재료만 찾아보기'] },
        situational_tags: [],
      },
      {
        id: 'rt_enjoyment_2b',
        template: '시작한 것을 [시간]만 해보고 멈춰도 된다고 허락해두기',
        blanks: { 시간: ['5분', '10분'] },
        situational_tags: [],
      },
    ],
    g_enjoyment_3: [
      {
        id: 'rt_enjoyment_3a',
        template: '쉬는 날 핸드폰 대신 [것] 하나를 옆에 두기',
        blanks: { 것: ['책', '스케치북', '이어폰'] },
        situational_tags: [],
      },
      {
        id: 'rt_enjoyment_3b',
        template: '[시점]에 핸드폰 내려두고 [시간] 다른 것 해보기',
        blanks: { 시점: ['저녁 먹고', '아침에', '잠깐 쉴 때'], 시간: ['5분', '10분'] },
        situational_tags: [],
      },
    ],
    g_enjoyment_4: [
      {
        id: 'rt_enjoyment_4a',
        template: '즐거웠던 순간이 생기면 바로 [방법]으로 기록해두기',
        blanks: { 방법: ['한 줄 메모', '사진', '마음속에 기억해두기'] },
        situational_tags: [],
      },
      {
        id: 'rt_enjoyment_4b',
        template: '오늘 "좋다"는 느낌이 들었던 것 하나 떠올려보기',
        blanks: {},
        situational_tags: [],
      },
    ],

    // ── meaning > autonomy ──────────────────────────────────────────────────
    g_autonomy_1: [
      {
        id: 'rt_autonomy_1a',
        template: '오늘 뭔가를 시작하기 전에 [방법]으로 직접 먼저 해보기',
        blanks: { 방법: ['일단 시작부터', '계획 없이 바로', '5분만 해보기로'] },
        situational_tags: [],
      },
      {
        id: 'rt_autonomy_1b',
        template: '결정이 어려울 때 [방법]으로 기준 하나 정해두기',
        blanks: { 방법: ['직접 한 줄 적어두기', '속으로 말해두기', '그냥 골라두기'] },
        situational_tags: [],
      },
    ],
    g_autonomy_2: [
      {
        id: 'rt_autonomy_2a',
        template: '뭔가를 선택할 때 눈치 보기 전에 [방법]으로 내 것 먼저 정해두기',
        blanks: { 방법: ['속으로', '메모에', '잠깐 눈 감고'] },
        situational_tags: ['social'],
      },
      {
        id: 'rt_autonomy_2b',
        template: '오늘 내가 원해서 선택한 것 하나 떠올려두기',
        blanks: {},
        situational_tags: [],
      },
    ],
    g_autonomy_3: [
      {
        id: 'rt_autonomy_3a',
        template: '결정하고 나서 후회가 올라올 때 [방법]으로 잠깐 멈추기',
        blanks: { 방법: ['"이미 잘 골랐어"라고 말해보기', '다른 생각으로 옮기기', '그냥 두기'] },
        situational_tags: [],
      },
      {
        id: 'rt_autonomy_3b',
        template: '작은 것을 결정할 때 [시간] 안에 바로 결정해버리기',
        blanks: { 시간: ['30초', '1분', '5분'] },
        situational_tags: [],
      },
    ],
    g_autonomy_4: [
      {
        id: 'rt_autonomy_4a',
        template: '오늘 "내가 선택해서 한 것" 하나 기록해두기',
        blanks: {},
        situational_tags: [],
      },
      {
        id: 'rt_autonomy_4b',
        template: '내일 하고 싶은 것 하나를 [방법]으로 미리 정해두기',
        blanks: { 방법: ['노트에 적어두기', '마음속으로 정해두기', '알람으로 메모해두기'] },
        situational_tags: [],
      },
    ],

  },
};

// ── 순수 비즈니스 로직 ─────────────────────────────────────────────────────────
// 아래 함수들은 이번 미션에서 변경하지 않음 (다음 미션에서 새 구조에 맞게 교체 예정).

/**
 * state ID에 연결된 목표 사다리를 반환한다.
 *
 * @param {string} stateId
 * @returns {{ level: string, id: string, template: string, blanks: Object }[]}
 */
function getGoalLadder(stateId) {
  return (goalData.goals[stateId] || {}).ladder || [];
}

/**
 * 선택한 state ID들의 루틴 풀을 반환한다.
 * situational_tags가 activeTags와 겹치는 항목을 우선 정렬하고, ID 기준으로 중복을 제거한다.
 *
 * @param {string[]} selectedStateIds
 * @param {string[]} [activeTags=[]] - 현재 상황 태그 (우선순위 계산용)
 * @returns {object[]} RoutineItem 배열
 */
function getRecommendedRoutines(selectedStateIds, activeTags) {
  const tagSet  = new Set(activeTags || []);
  const seen    = new Set();
  const result  = [];

  for (const stateId of selectedStateIds) {
    let routines = goalData.routines[stateId];
    if (!routines) routines = goalData.routines['g_' + stateId.slice(2)];
    if (!routines) continue;
    for (const rt of routines) {
      if (!seen.has(rt.id)) { seen.add(rt.id); result.push(rt); }
    }
  }

  if (tagSet.size > 0) {
    result.sort((a, b) => {
      const aScore = (a.situational_tags || []).filter(t => tagSet.has(t)).length;
      const bScore = (b.situational_tags || []).filter(t => tagSet.has(t)).length;
      return bScore - aScore;
    });
  }

  return result;
}

// ── 전역 세션 상태 ─────────────────────────────────────────────────────────────

const userSession = {
  selectedDomains:  [],  // string[]
  selectedStates:   {},  // Record<domain, string[]>
  selectedGoals:    {},  // Record<domain, Array<{ stateId, goalId, level, filledBlanks }>>
  goalPriority:     [],  // string[] (goalId 기준)
  selectedRoutines: [],  // Array<{ routineId, stateId, filledBlanks }>
  checkIns:         [],

  // ── 세션 변이 메서드 ────────────────────────────────────────────────────────

  toggleDomain(domain) {
    const idx = this.selectedDomains.indexOf(domain);
    if (idx === -1) this.selectedDomains.push(domain);
    else            this.selectedDomains.splice(idx, 1);
  },

  toggleState(domain, stateId) {
    if (!this.selectedStates[domain]) this.selectedStates[domain] = [];
    const arr = this.selectedStates[domain];
    const idx = arr.indexOf(stateId);
    if (idx === -1) arr.push(stateId);
    else            arr.splice(idx, 1);
  },

  // goalEntry: { stateId, goalId, level, filledBlanks }
  toggleGoal(domain, goalEntry) {
    if (!this.selectedGoals[domain]) this.selectedGoals[domain] = [];
    const arr    = this.selectedGoals[domain];
    const goalId = goalEntry.goalId;
    const idx    = arr.findIndex(e => e.goalId === goalId);
    if (idx === -1) {
      if (arr.length >= GOAL_CONSTRAINTS.MAX_GOALS_PER_DOMAIN) return false;
      arr.push(goalEntry);
      if (!this.goalPriority.includes(goalId)) this.goalPriority.push(goalId);
    } else {
      arr.splice(idx, 1);
      const pIdx = this.goalPriority.indexOf(goalId);
      if (pIdx !== -1) this.goalPriority.splice(pIdx, 1);
    }
    return true;
  },

  // 선택된 목표 항목의 filledBlanks 갱신
  updateGoalBlanks(domain, goalId, filledBlanks) {
    const entry = (this.selectedGoals[domain] || []).find(e => e.goalId === goalId);
    if (entry) entry.filledBlanks = { ...filledBlanks };
  },

  // routineEntry: { routineId, stateId, filledBlanks }
  toggleRoutine(routineEntry) {
    const idx = this.selectedRoutines.findIndex(r => r.routineId === routineEntry.routineId);
    if (idx === -1) {
      if (this.selectedRoutines.length >= GOAL_CONSTRAINTS.MAX_ROUTINES_TOTAL) return false;
      this.selectedRoutines.push(routineEntry);
    } else {
      this.selectedRoutines.splice(idx, 1);
    }
    return true;
  },

  addCheckIn(date, evaluations) {
    this.checkIns = this.checkIns.filter(c => c.date !== date);
    this.checkIns.push({ date, evaluations });
  },

  // ── localStorage 영속화 ─────────────────────────────────────────────────────

  save() {
    try {
      localStorage.setItem('goal_session', JSON.stringify({
        selectedDomains:  this.selectedDomains,
        selectedStates:   this.selectedStates,
        selectedGoals:    this.selectedGoals,
        goalPriority:     this.goalPriority,
        selectedRoutines: this.selectedRoutines,
        checkIns:         this.checkIns,
      }));
    } catch (e) { /* 스토리지 부재 시 조용히 무시 */ }
  },

  load() {
    try {
      const raw = localStorage.getItem('goal_session');
      if (!raw) return;
      const parsed = JSON.parse(raw);

      // 구조 검증: 구 형식(string 배열)이면 초기화 (베타 — 데이터 손실 허용)
      const goalsValid = !parsed.selectedGoals || Object.values(parsed.selectedGoals).every(
        arr => Array.isArray(arr) && arr.every(e => e && typeof e === 'object' && 'goalId' in e)
      );
      const routinesValid = !parsed.selectedRoutines || (
        Array.isArray(parsed.selectedRoutines) &&
        (parsed.selectedRoutines.length === 0 ||
         (typeof parsed.selectedRoutines[0] === 'object' && 'routineId' in parsed.selectedRoutines[0]))
      );
      if (!goalsValid || !routinesValid) return; // 구 구조 → 무시하고 초기 상태 유지

      Object.assign(this, {
        selectedDomains:  parsed.selectedDomains  || [],
        selectedStates:   parsed.selectedStates   || {},
        selectedGoals:    parsed.selectedGoals    || {},
        goalPriority:     parsed.goalPriority     || [],
        selectedRoutines: parsed.selectedRoutines || [],
        checkIns:         parsed.checkIns         || [],
      });
    } catch (e) { /* 파싱 오류 무시 */ }
  },

  reset() {
    this.selectedDomains  = [];
    this.selectedStates   = {};
    this.selectedGoals    = {};
    this.goalPriority     = [];
    this.selectedRoutines = [];
    this.checkIns         = [];
    try { localStorage.removeItem('goal_session'); } catch (e) { /* noop */ }
  },
};

// 페이지 로드 시 저장된 세션 복원
userSession.load();
