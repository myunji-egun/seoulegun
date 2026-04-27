import BoardIdentityLayout from './BoardIdentityLayout'

const pillars = [
  {
    title: '투명교정 전문',
    description: '인비절라인 공인 프로바이더로\n눈에 띄지 않는 투명 장치로 교정합니다.\n일상을 방해하지 않는 교정을 경험하세요.',
  },
  {
    title: '성장기 교정',
    description: '아이의 골격 발달 단계를 고려한 맞춤 치료입니다.\n적절한 시기에 시작하는 교정이\n평생 구강 건강의 기반이 됩니다.',
  },
  {
    title: '교합 중심',
    description: '치아 배열만이 아닌 기능적 교합을 목표합니다.\n씹는 힘, 턱 관절, 안면 균형까지\n전체적인 조화를 고려합니다.',
  },
]

export default function OrthodonticsIdentity() {
  return (
    <BoardIdentityLayout
      label="ORTHODONTICS"
      title={<>가지런한 치아,<br /><span className="text-[#0080C8]">건강한 교합을 만듭니다</span></>}
      description={<>교정은 외모만의 문제가 아닙니다.<br />올바른 교합은 치아 수명과 전신 건강에 직결됩니다.<br />이건치과 교정과 전문의가 함께합니다.</>}
      pillars={pillars}
    />
  )
}
