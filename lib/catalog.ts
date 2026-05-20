export const CATALOG_TREE = [
  {
    label: "식음료",
    children: [
      {
        label: "마실 것",
        children: ["우유/유제품", "탄산/음료", "차/커피", "물/기타"]
      },
      {
        label: "먹을 것",
        children: ["간편식", "과자/간식", "라면/면류", "소스/조미료"]
      }
    ]
  },
  {
    label: "생활용품",
    children: [
      {
        label: "일상 도구",
        children: ["청소/세탁", "주방 도구", "보관 용기", "욕실 용품"]
      },
      {
        label: "개인 용품",
        children: ["위생 용품", "미용 도구", "휴대 용품", "기타 생활"]
      }
    ]
  },
  {
    label: "전자기기",
    children: [
      {
        label: "소리/영상",
        children: ["이어폰/헤드폰", "스피커", "카메라", "화면 장치"]
      },
      {
        label: "디지털 도구",
        children: ["휴대전화", "컴퓨터 주변기기", "충전/케이블", "저장 장치"]
      }
    ]
  },
  {
    label: "문구/학습",
    children: [
      {
        label: "필기구",
        children: ["펜", "연필", "형광펜", "지우개/수정"]
      },
      {
        label: "종이 자료",
        children: ["노트", "스티커", "파일/바인더", "기타 문구"]
      }
    ]
  },
  {
    label: "의류/소품",
    children: [
      {
        label: "입는 것",
        children: ["상의", "하의", "신발", "가방"]
      },
      {
        label: "착용 소품",
        children: ["모자", "안경", "시계", "기타 소품"]
      }
    ]
  },
  {
    label: "기타",
    children: [
      {
        label: "미분류",
        children: ["용도 불명", "기념품", "수집품", "기타 기록"]
      }
    ]
  }
] as const;

export function formatCategoryPath(major: string, middle: string, minor: string) {
  if (!major || !middle || !minor) return "";

  return `${major} > ${middle} > ${minor}`;
}
