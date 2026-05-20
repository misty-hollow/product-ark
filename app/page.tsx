import Link from 'next/link';

export default function HomePage() {
  // 모듈러 데이터 (실제 DB 데이터와 연동 시 대체 가능)
  const systemStats = {
    totalRecords: "0",
    firstKeepers: "0",
    memoryLedger: "0",
  };

  const recentMemories = [
    {
      id: "1",
      itemTitle: "크라운산도 딸기맛",
      content: "외할머니 댁 안방 자개장 깊은 곳에서 항상 꺼내주시던 붉은색 상자의 과자. 특유의 달콤하고 텁텁한 딸기 크림 냄새가 아직도 생생합니다.",
      author: "기록인 김주형",
      date: "2026.05.12",
      specimenId: "ARK-0102-0012"
    },
    {
      id: "2",
      itemTitle: "모나미 153 볼펜 (노란색)",
      content: "아버지가 일기 쓰실 때 쓰시던 볼펜인데, 끝부분을 딱딱 누르는 소리가 밤새 들리곤 했습니다. 그 소리가 그립네요.",
      author: "기록인 이민재",
      date: "2026.05.11",
      specimenId: "ARK-0304-0048"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-stone-900 selection:bg-stone-200 font-sans antialiased overflow-x-hidden">
      
      {/* 얇고 아날로그한 방안지(Grid) 배경 스타일 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* 헤더 네비게이션 영역 */}
      <header className="relative border-b border-stone-200 bg-[#FAF9F5]/90 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-stone-900">지구물건보관소</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-stone-400">EARTH OBJECT ARCHIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              href="/search"
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              소장 기록 조회
            </Link>
            <Link 
              href="/records/new"
              className="bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium px-4 py-2 transition-colors rounded-none"
            >
              + 신규 기록 생성
            </Link>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24 z-10">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center rounded-none border border-stone-200 bg-stone-100/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-stone-500">
            Open Object Registry
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-stone-950 leading-[1.15]"
            style={{ wordBreak: 'keep-all' }}
          >
            오늘의 평범한 물건도 시간이 지나면 한 시대의 흔적이 된다.
          </h1>

          <p 
            className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 leading-relaxed"
            style={{ wordBreak: 'keep-all' }}
          >
            지구물건보관소는 지금 실존하는 사물의 이름, 형태적 특징, 그리고 사람들의 일상적 기록 해설을 수집하여 영구 보존하는 열린 아카이브 플랫폼입니다.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link 
              href="/records/new" 
              className="bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold px-6 py-3.5 transition-all rounded-none border border-stone-900 shadow-sm"
            >
              기초 기록 수립하기
            </Link>
            <Link 
              href="/search" 
              className="bg-transparent hover:bg-stone-100 text-stone-800 text-xs font-semibold px-6 py-3.5 transition-all rounded-none border border-stone-200"
            >
              최근 기록 살펴보기
            </Link>
          </div>
        </section>

        {/* SYSTEM STATUS (수장고 환경 로그 계측 배너) */}
        <section className="border border-stone-200 bg-stone-50/50 p-4 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-stone-500 font-bold">
                [시스템 제어 로그]
              </span>
            </div>
            <div className="font-mono text-[9px] tracking-[0.1em] text-stone-400 space-y-1 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              <span>수장고 온도: <span className="text-stone-700 font-bold">20.4°C</span></span>
              <span className="hidden sm:inline">/</span>
              <span>습도: <span className="text-stone-700 font-bold">45.0% 유지 중</span></span>
              <span className="hidden sm:inline">/</span>
              <span>상태: <span className="text-stone-700 font-bold">대기 기초 자료 등록 가동 중</span></span>
            </div>
          </div>
        </section>

        {/* STATS BOARD SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-stone-200 divide-y md:divide-y-0 md:divide-x divide-stone-200/80 bg-white/40">
          <div className="p-8 text-center md:text-left space-y-4">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] tracking-widest uppercase text-stone-400">01 / TOTAL RECORDS</span>
              <span className="text-xs font-medium text-stone-500 mt-1">총 소장 기록</span>
            </div>
            <div className="font-mono text-4xl font-light text-stone-900">
              {systemStats.totalRecords} <span className="text-xs text-stone-400 font-sans ml-1">건</span>
            </div>
          </div>

          <div className="p-8 text-center md:text-left space-y-4">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] tracking-widest uppercase text-stone-400">02 / FIRST KEEPERS</span>
              <span className="text-xs font-medium text-stone-500 mt-1">최초 등록자 수</span>
            </div>
            <div className="font-mono text-4xl font-light text-stone-900">
              {systemStats.firstKeepers} <span className="text-xs text-stone-400 font-sans ml-1">명</span>
            </div>
          </div>

          <div className="p-8 text-center md:text-left space-y-4">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] tracking-widest uppercase text-stone-400">03 / MEMORY LEDGER</span>
              <span className="text-xs font-medium text-stone-500 mt-1">누적 기억 기록</span>
            </div>
            <div className="font-mono text-4xl font-light text-stone-900">
              {systemStats.memoryLedger} <span className="text-xs text-stone-400 font-sans ml-1">증언</span>
            </div>
          </div>
        </section>

        {/* RECENT MEMORIES SECTION (최근 편입된 소장기억 도감) */}
        <section className="space-y-8">
          <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row items-baseline justify-between gap-2">
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-widest uppercase text-stone-400">RECENTLY COMMITTED MEMORIES</span>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900">최근 소장품에 보태진 기억들</h2>
            </div>
            <span className="text-xs text-stone-500" style={{ wordBreak: 'keep-all' }}>
              공개 기록물 아래에 채워진 개별 주관적 역사입니다.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentMemories.map((memory) => (
              <div 
                key={memory.id} 
                className="group relative border border-stone-200 bg-white p-6 hover:border-stone-400 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <span className="font-mono text-[9px] text-stone-400 font-bold tracking-wider">
                      {memory.specimenId}
                    </span>
                    <span className="font-mono text-[9px] text-stone-400">
                      INDEX #{memory.id.padStart(3, '0')}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-950 group-hover:text-stone-800 transition-colors">
                    {memory.itemTitle}
                  </h3>
                  <p 
                    className="text-stone-600 text-xs leading-relaxed"
                    style={{ wordBreak: 'keep-all' }}
                  >
                    "{memory.content}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                  <span className="text-[11px] font-medium text-stone-700">{memory.author}</span>
                  <span className="font-mono text-[10px] text-stone-400">{memory.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER SECTION (공식 수집 권고 안내 문서 스타일) */}
        <section className="border border-stone-200 bg-[#FAF9F5] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12">
            <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
              <path d="M10 10h80v80H10zM30 30h40v40H30z" />
            </svg>
          </div>

          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-[9px] tracking-widest uppercase text-stone-400 block">
              ACQUISITION CODE OF CONDUCT
            </span>
            <h2 
              className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950"
              style={{ wordBreak: 'keep-all' }}
            >
              아직 우리 수장고에 등록되지 않은 보편적 사물의 기초 서식을 작성해 주십시오.
            </h2>
            <p 
              className="text-xs sm:text-sm text-stone-600 leading-relaxed"
              style={{ wordBreak: 'keep-all' }}
            >
              어제 먹은 가공 음료의 빈 병, 책상 구석에 방치된 오래된 볼펜, 서랍 속 잠자던 아날로그 스마트폰까지. 우리 시대의 평범한 문화 유산을 소장품 기록지로 영원히 박제할 수 있는 권한을 제공합니다.
            </p>
            <div className="pt-4 flex">
              <Link 
                href="/records/new"
                className="bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold px-6 py-3.5 transition-colors rounded-none"
              >
                신규 기초 소장 서식 수립
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* 푸터 영역 */}
      <footer className="border-t border-stone-200 bg-stone-100/30 py-12 text-center text-stone-400 font-mono text-[9px] tracking-widest">
        <p>© 2026 EARTH OBJECT ARCHIVE. ALL SPECIMEN RECORDS PERMANENTLY KEPT.</p>
      </footer>
    </div>
  );
}