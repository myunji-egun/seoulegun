import type { TreatmentContent } from '@/types/treatment'

export const naturalToothTreatments: TreatmentContent[] = [
  {
    boardCategory: 'natural-tooth',
    treatmentType: 'vpt',
    title: 'VPT 신경보존술',
    subtitle: '통증은 줄이고, 신경은 최대한 살리는 방향으로',
    image: '/images/treatments/vpt-treat.jpg',
    description:
      '신경을 살리면 치아의 수명을 오래 유지하고 건강한 치아를 유지할 수 있습니다.',
    highlights: [
      { icon: 'Shield', label: '자연치아 보존', desc: '내 치아를 최대한 보존합니다.' },
      { icon: 'Smile', label: '통증 최소화', desc: '통증을 줄여 편안하게 치료합니다.' },
      { icon: 'CalendarDays', label: '치료 기간 단축', desc: '짧은 기간으로 일상 복귀가 빠릅니다.' },
      { icon: 'Star', label: '높은 성공률', desc: '정확한 진단과 치료로 높은 성공률을 자랑합니다.' },
    ],
    steps: [
      { title: '정밀 진단', desc: 'X-ray, CT로 신경 상태 진단', icon: 'ScanLine' },
      { title: '감염 부위 제거', desc: '신경 전체가 아닌 감염된 부분만 제거', icon: 'Scissors' },
      { title: '신경 보호 및 재생', desc: '특수 재료로 덮어 신경이 스스로 회복하도록 유도', icon: 'ShieldPlus' },
      { title: '생체 재료 밀폐', desc: '신경이 잘 붙어있도록 생체 재료로 밀폐', icon: 'Lock' },
      { title: '경과 관찰', desc: '신경이 잘 붙어있는지 정기적으로 확인', icon: 'ClipboardCheck' },
    ],
    indications: [
      '치아 신경을\n모두 제거하기엔\n아까운 경우',
      '과거 신경 치료 후\n재치료가 필요한\n경우',
      '신경 치료 후에도\n통증이 지속되는\n경우',
      '치아 뿌리 끝 염증이\n크지 않거나 초기인\n경우',
      '자연치아를 최대한\n보존하고 싶은\n경우',
    ],
    benefits: [
      { tag: '치아 신경을 모두 제거하지 않고 남기기', description: '치아 신경을 모두 제거하지 않고 보존 가능성을 먼저 살펴볼 수 있습니다.' },
      { tag: '자연치아의 감각과 생명력을 유지', description: '자연치아의 감각과 생명력을 유지하는 데 도움이 됩니다.' },
      { tag: '적절한 증례에서는 발치나 신경치료 필요 최소화', description: '적절한 증례에서는 발치나 신경치료 필요성을 줄일 수 있습니다.' },
      { tag: '보존적인 방법 우선 선택', description: '보존적인 방법을 우선 선택해 치료 방향을 계획합니다.' },
      { tag: '추후의 선택지 남겨놓기', description: '추후의 치료 선택지를 남겨둘 수 있습니다.' },
    ],
    faq: [
      {
        question: 'VPT는 누구나 받을 수 있나요?',
        answer:
          '모든 경우에 가능한 것은 아닙니다. 통증 양상, 노출된 치수 상태, 염증 범위 등을 종합해 적응증을 판단해야 합니다.',
      },
      {
        question: '신경치료와 무엇이 다른가요?',
        answer:
          '신경치료는 치수 전체를 제거하는 방식이고, VPT는 회복 가능한 신경을 남기는 보존적 치료라는 점에서 차이가 있습니다.',
      },
      {
        question: '치료 후 다시 아플 수도 있나요?',
        answer:
          '치수 상태나 회복 반응에 따라 예후가 달라질 수 있습니다. 치료 후 경과 관찰이 중요하며, 경우에 따라 추가 치료가 필요할 수 있습니다.',
      },
    ],
  },
  {
    boardCategory: 'natural-tooth',
    treatmentType: 'onlay',
    title: '최소삭제 온레이',
    subtitle: '크라운 대신 삭제를 최소화한 온레이 보철로 치질을 보존합니다',
    image: '/images/treatments/onlay-treat.jpg',
    description:
      '치아를 **최대한 살리면서** 손상된 부분을 정밀하게 회복하는 보존 보철입니다. 크라운처럼 치아 전체를 씌우지 않고 **필요한 부분만 정교하게 덮어** 치질 손실을 최소화합니다.',
    richContent: `### ❓ 왜 크라운 대신 온레이인가요?

크라운은 치아 **전체를 삭제**하는 방식이라, 건강한 치질까지 함께 깎아야 합니다. 온레이는 손상된 부위만 정밀하게 덮는 방식으로, **건강한 치아 구조는 그대로 남깁니다.** 한 번 깎인 치아는 되돌릴 수 없기 때문에, **삭제를 줄이는 것이 곧 치아를 지키는 것**입니다.

---

### 🦷 치질 보존이 곧 치아 수명입니다.
깎지 않아도 되는 부분은 절대 깎지 않는다. **최소삭제 원칙**이 이건치과가 온레이를 먼저 제안하는 이유입니다.`,
    benefits: [
      { tag: '크라운보다 치아 삭제 최소화', description: '크라운보다 치아 삭제를 줄여 자연치아를 더 많이 보존합니다.' },
      { tag: '손상 부위만 정밀 회복', description: '손상된 부위만 정밀하게 회복해 기능과 심미를 함께 개선합니다.' },
      { tag: '자연치아와 유사한 색상 재현', description: '세라믹 소재로 자연치아와 유사한 색상을 재현할 수 있습니다.' },
      { tag: '내구성 우수, 장기 사용 가능', description: '내구성이 우수해 장기간 사용이 가능합니다.' },
      { tag: '추후 추가 치료에도 치아 보존에 유리', description: '이후 추가 치료가 필요할 때도 치아 보존에 유리합니다.' },
    ],
    faq: [
      {
        question: '온레이와 크라운은 어떻게 다른가요?',
        answer:
          '크라운은 치아 전체를 씌우는 방식이고, 온레이는 손상된 교합면과 인접면만 덮는 방식입니다. 치아 삭제량을 줄일 수 있습니다.',
      },
      {
        question: '온레이는 얼마나 오래 사용할 수 있나요?',
        answer:
          '소재와 관리 상태에 따라 다르지만, 적절히 관리하면 장기간 사용이 가능합니다. 정기적인 검진이 중요합니다.',
      },
      {
        question: '온레이가 떨어질 수 있나요?',
        answer:
          '접착 기술의 발전으로 탈락 가능성은 낮지만, 과도한 외력이나 불량한 구강 위생으로 문제가 생길 수 있습니다.',
      },
    ],
  },
  {
    boardCategory: 'natural-tooth',
    treatmentType: 'root-canal',
    title: '근관치료 (신경치료)',
    subtitle: '손상된 신경을 정리하고, 내 치아를 지키는 치료',
    image: '/images/treatments/endo_1.jpg',
    description:
      '감염된 신경을 제거해 더 이상 퍼지지 않도록 막고, 치아는 그대로 살려두는 치료입니다.',
    highlights: [
      { icon: 'Shield', label: '치아 보존', desc: '발치 대신 치아를 끝까지 지킵니다.' },
      { icon: 'Smile', label: '통증 해소', desc: '감염 조직 제거로 통증을 줄입니다.' },
      { icon: 'Ban', label: '염증 차단', desc: '염증이 더 퍼지지 않도록 막습니다.' },
      { icon: 'Link', label: '보철 연계', desc: '치료 후 크라운 등 보철로 이어갑니다.' },
    ],
    indications: [
      '치아가 심하게\n아프거나\n저린 경우',
      '잇몸 주변으로\n고름이\n생긴 경우',
      '충치가 신경까지\n깊이\n진행된 경우',
      '치아 내부\n감염이\n의심되는 경우',
      '발치를 권유받았지만\n치아를\n살리고 싶은 경우',
    ],
    benefits: [
      { tag: '발치 대신 치아 보존 선택', description: '심한 충치나 염증이 있어도 발치 대신 치아 보존을 고려할 수 있습니다.' },
      { tag: '감염 조직 제거로 통증 해소', description: '통증의 원인이 되는 감염 조직을 제거하는 데 도움이 됩니다.' },
      { tag: '치아 유지 후 보철 연계 가능', description: '치아를 유지한 상태로 이후 보철치료를 이어갈 수 있습니다.' },
      { tag: '염증 확산 예방', description: '방치 시 커질 수 있는 염증 확산을 줄이는 데 도움이 됩니다.' },
      { tag: '자연치아 유지의 핵심 단계', description: '자연치아를 유지하는 중요한 중간 단계가 될 수 있습니다.' },
    ],
    faq: [
      {
        question: '신경치료를 하면 치아를 오래 쓸 수 있나요?',
        answer:
          '남아 있는 치아량, 균열 여부, 잇몸 상태 등에 따라 달라질 수 있습니다. 치료 후 크라운 등 적절한 보강이 중요합니다.',
      },
      {
        question: '신경치료는 왜 여러 번 내원해야 하나요?',
        answer:
          '염증 정도와 해부학적 형태에 따라 내부를 여러 번 정리하고 소독해야 할 수 있기 때문입니다.',
      },
      {
        question: '신경치료 후에도 통증이 있을 수 있나요?',
        answer:
          '치료 직후 일시적인 불편감은 있을 수 있습니다. 다만 통증이 심하거나 오래 지속되면 추가 확인이 필요합니다.',
      },
    ],
  },
  {
    boardCategory: 'natural-tooth',
    treatmentType: 'gum',
    title: '잇몸치료',
    subtitle: '붓고 피나는 잇몸, 원인부터 차분히 살펴보겠습니다',
    beforeImage: '/images/treatments/sc-before.jpg',
    afterImage: '/images/treatments/sc-after.jpg',
    description:
      '초기에 발견할수록 치료가 간단하고, 내 치아를 훨씬 오래 지킬 수 있습니다.',
    highlights: [
      { icon: 'Trash2', label: '염증 원인 제거', desc: '치석과 세균을 깨끗이 정리합니다.' },
      { icon: 'Heart', label: '출혈·붓기 개선', desc: '잇몸 불편감을 줄이는 데 도움이 됩니다.' },
      { icon: 'TrendingDown', label: '진행 억제', desc: '치주질환 악화를 막습니다.' },
      { icon: 'CalendarDays', label: '장기 관리', desc: '정기 유지관리로 구강 건강을 지킵니다.' },
    ],
    steps: [
      { title: '정밀 검사', desc: '잇몸 깊이 측정, X-ray로 뼈 손실 확인', icon: 'ScanLine' },
      { title: '스케일링', desc: '치석·플라크 제거로 염증 원인 차단', icon: 'Sparkles' },
      { title: '치근활택술', desc: '잇몸 안쪽 깊은 치석까지 꼼꼼히 제거', icon: 'Search' },
      { title: '경과 관찰', desc: '잇몸 상태 회복 여부 확인', icon: 'Eye' },
      { title: '정기 유지관리', desc: '3~6개월마다 재발 방지 관리', icon: 'CalendarDays' },
    ],
    indications: [
      '양치 시 잇몸에서\n피가 나는\n경우',
      '잇몸이 붓거나\n시린\n경우',
      '치아가 흔들리는\n느낌이 드는\n경우',
      '오랫동안 스케일링을\n받지 않은\n경우',
      '구취가\n심해진\n경우',
    ],
    benefits: [
      { tag: '잇몸 출혈·붓기·불편감 개선', description: '잇몸 출혈과 붓기, 불편감 개선에 도움이 될 수 있습니다.' },
      { tag: '치석·염증 원인 제거', description: '치석과 염증 원인을 정리해 구강 위생 관리에 도움이 됩니다.' },
      { tag: '치주질환 진행 속도 억제', description: '치주질환의 진행 속도를 늦추는 데 도움이 될 수 있습니다.' },
      { tag: '치아 지지 조직 관리', description: '치아를 지지하는 조직을 관리하는 중요한 치료입니다.' },
      { tag: '정기 유지관리로 장기 건강', description: '정기적인 유지관리와 연결해 장기적인 관리가 가능합니다.' },
    ],
    faq: [
      {
        question: '잇몸치료는 많이 아픈가요?',
        answer:
          '염증 정도와 치료 범위에 따라 다를 수 있습니다. 필요한 경우 마취를 병행해 불편을 줄이면서 진행합니다.',
      },
      {
        question: '스케일링만 하면 잇몸치료가 끝나나요?',
        answer:
          '상태에 따라 다릅니다. 단순한 치은염은 스케일링으로 호전될 수 있지만, 치주염은 추가 치료와 유지관리가 필요할 수 있습니다.',
      },
      {
        question: '잇몸이 내려간 것도 치료가 되나요?',
        answer:
          '원인과 진행 정도에 따라 접근이 달라집니다. 염증 조절, 칫솔질 습관 개선, 필요 시 추가 치료를 함께 고려합니다.',
      },
    ],
  },
  {
    boardCategory: 'natural-tooth',
    treatmentType: 'resin-buildup',
    title: '원데이 레진 빌드업',
    subtitle: '가능한 한 보존적으로, 필요한 부분을 정교하게 회복합니다',
    beforeImage: '/images/treatments/resin-before.jpg',
    afterImage: '/images/treatments/resin-after.jpg',
    description: '치아 삭제 없이, 당일에, 내 치아를 그대로 살리는 방법입니다.',
    richContent: `### ❓ 씌우는 것과 뭐가 다른가요?

크라운은 치아를 많이 깎고 여러 번 내원해야 하지만, 레진빌드업은 **내 치아를 깎지 않고 위에 덧쌓는 방식**으로 당일 완성됩니다. 나중에 상태가 변해도 **추가 치료 선택지가 그대로 남아있습니다.**`,
    highlights: [
      { icon: 'Shield', label: '내 치아 보존', desc: '치아 삭제 없이 최소한으로' },
      { icon: 'Clock', label: '당일 완성', desc: '하루 만에 치료 완료' },
      { icon: 'Sparkles', label: '자연스러운 심미성', desc: '자연치아와 같은 자연스러운 색감' },
      { icon: 'ShieldCheck', label: '추후 치료 유리', desc: '이후 추가 치료에도 치아 보존에 유리' },
    ],
    benefitsTitle: '원데이 레진 빌드업의 장점',
    benefits: [
      { tag: '치아 삭제 없거나 최소화', description: '치아 삭제 없이 또는 최소한의 삭제로 치료할 수 있습니다.', icon: 'Shield' },
      { tag: '당일 치료로 내원 횟수 절감', description: '당일 치료가 가능한 경우가 있어 내원 횟수를 줄일 수 있습니다.', icon: 'CalendarDays' },
      { tag: '깨짐·마모 부위 자연스럽게 회복', description: '깨지거나 마모된 부분을 자연스럽게 회복하는 데 도움이 됩니다.', icon: 'Sparkles' },
      { tag: '경제적인 방법으로 심미 개선', description: '비교적 경제적인 방법으로 심미적 개선을 기대할 수 있습니다.', icon: 'Wallet' },
      { tag: '추후 치료에도 치아 보존에 유리', description: '이후 추가 치료가 필요한 경우에도 치아 보존에 유리합니다.', icon: 'ShieldCheck' },
    ],
    comparison: {
      leftLabel: '크라운 치료',
      rightLabel: '원데이 레진 빌드업',
      rows: [
        { label: '치아 삭제', icon: 'Scissors', leftText: '치아를 많이 삭제해야 합니다.', rightText: '치아 삭제 없이 또는 최소한으로 치료합니다.' },
        { label: '내원 횟수', icon: 'Clock', leftText: '여러 번 내원이 필요합니다.', rightText: '당일 치료로 내원 횟수를 줄일 수 있습니다.' },
        { label: '치아 보존', icon: 'Shield', leftText: '치아 본래 구조를 많이 잃게 됩니다.', rightText: '자연치아를 최대한 보존할 수 있습니다.' },
        { label: '추후 치료', icon: 'ArrowRight', leftText: '추후 추가 치료 시 선택지가 제한될 수 있습니다.', rightText: '추가 치료 선택지가 그대로 남아있습니다.' },
      ],
    },
    bottomCta: '자연치아를 최대한 살리는 보존적인 치료, 서울이건치과가 함께합니다.',
    faq: [
      {
        question: '레진빌드업은 오래가나요?',
        answer:
          '레진은 시간이 지나면 변색이나 마모가 생길 수 있으며, 사용 습관과 관리 상태에 따라 수명이 달라집니다. 필요 시 보수가 가능합니다.',
      },
      {
        question: '라미네이트와 어떻게 다른가요?',
        answer:
          '레진빌드업은 직접 수복하는 방식이고, 라미네이트는 세라믹을 제작하여 접착하는 방식입니다. 치아 상태와 원하는 결과에 따라 적합한 방법을 선택합니다.',
      },
      {
        question: '앞니가 벌어진 것도 레진으로 해결할 수 있나요?',
        answer:
          '벌어진 정도와 치아 상태에 따라 레진빌드업으로 개선할 수 있는 경우가 있습니다. 정도가 클 경우 다른 치료를 함께 고려할 수 있습니다.',
      },
    ],
  },
]
