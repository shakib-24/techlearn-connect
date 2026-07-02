export interface Review {
  id: string;
  reviewerType: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Instructor {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Infrastructure" | "UI/UX Design" | "AI/Data Science";
  skills: string[];
  tagline: string;
  format: "オンライン" | "対面" | "両方対応";
  price: string;
  bio: string;
  achievements: string[];
  curriculum: string[];
  initials: string;
  avatar: string;
  reviews?: Review[];
}

export const instructors: Instructor[] = [
  {
    id: "1",
    name: "田中 健太",
    category: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "パフォーマンス最適化"],
    tagline: "モダンWebの最前線を走るフロントエンドエンジニア",
    format: "両方対応",
    price: "¥15,000 / 時間",
    bio: "大手EC企業でフロントエンド開発を10年経験。React・TypeScriptを中心としたモダンな開発手法を伝授。チームでの実務を想定した実践的なカリキュラムが強み。月間1億PVサービスの設計・運用に携わってきた現場感覚を直接届ける。",
    achievements: [
      "月間1億PVサイトのパフォーマンス改善を主導（LCP 60%短縮）",
      "社内フロントエンド研修プログラムを設計・運営（受講者累計300名）",
      "React Tokyo Meetupの定期登壇者"
    ],
    curriculum: [
      "Reactの基礎とコンポーネント設計パターン",
      "TypeScriptによる型安全な開発",
      "Next.js App Routerの活用とSSR/SSG戦略",
      "パフォーマンス計測と改善手法（Core Web Vitals）",
      "チーム開発を想定したコードレビュー演習"
    ],
    initials: "TK",
    avatar: "/instructors/instructor-1.jpg",
    reviews: [
      { id: "r1", reviewerType: "企業研修担当者", rating: 5, comment: "React研修を10名で受講しました。現場感覚を交えた解説が非常にわかりやすく、研修後すぐに実業務で活用できました。来年度もぜひお願いしたいと思っています。", date: "2026年4月" },
      { id: "r2", reviewerType: "個人受講者", rating: 5, comment: "TypeScriptの型設計から実際のプロジェクト構成まで丁寧に教えていただきました。質問のたびに具体的なコードを書いてくれるので非常に理解しやすかったです。", date: "2026年3月" },
      { id: "r3", reviewerType: "新人研修担当", rating: 4, comment: "新卒エンジニアのオンボーディング研修として活用しました。実践的な内容で受講者の飲み込みも早く、次年度も継続依頼を検討中です。", date: "2026年2月" },
    ],
  },
  {
    id: "2",
    name: "Sarah Williams",
    category: "UI/UX Design",
    skills: ["Figma", "UXリサーチ", "プロトタイピング", "デザインシステム", "英語対応"],
    tagline: "グローバルデザイン思考を持つUXスペシャリスト。英語での研修も可能",
    format: "オンライン",
    price: "¥18,000 / 時間",
    bio: "シリコンバレーのスタートアップでProduct Designerとして7年間勤務後、日本に拠点を移す。日英バイリンガルであり、外資系・グローバルチームへの研修実績が豊富。英語での研修・資料提供にも対応可能。デザイン思考を軸にしたワークショップが高評価を得ている。",
    achievements: [
      "Fortune 500企業のプロダクトデザインをリード",
      "デザインシステム構築で開発速度40%向上を実現",
      "国内外カンファレンス（UX Tokyo・Smashing Conf）で計10回以上登壇"
    ],
    curriculum: [
      "UXリサーチ手法（インタビュー・アンケート設計）",
      "Figmaを使ったプロトタイピング実践",
      "デザインシステムの構築と運用",
      "ユーザビリティテストの実施と分析",
      "デザインと開発の効果的な連携プロセス"
    ],
    initials: "SW",
    avatar: "/instructors/instructor-2.jpg",
    reviews: [
      { id: "r4", reviewerType: "個人受講者", rating: 5, comment: "英語と日本語を交えた研修で、グローバルな視点のデザイン思考を学べました。Figmaのハンズオンが特に実践的で、翌日から業務に使えるレベルの知識が身につきました。", date: "2026年5月" },
      { id: "r5", reviewerType: "企業研修担当者", rating: 5, comment: "グローバルチーム向けにデザインシステム構築の研修をお願いしました。英語・日本語両対応で進めていただき、外国籍メンバーも大変満足していました。", date: "2026年4月" },
    ],
  },
  {
    id: "3",
    name: "吉田 浩二",
    category: "Backend",
    skills: ["Python", "Django", "REST API", "PostgreSQL", "Docker", "初心者歓迎"],
    tagline: "丁寧な解説で未経験者も安心。バックエンド開発の基礎から実践まで",
    format: "両方対応",
    price: "¥12,000 / 時間",
    bio: "SIer出身のバックエンドエンジニア。プログラミング未経験の社員向け研修を3年間担当し、500名以上を育成してきた実績を持つ。「なぜそうなるのか」を大切にした丁寧な指導が特徴で、初心者が詰まりがちなポイントを熟知している。",
    achievements: [
      "社内エンジニア育成プログラムの年間MVP受賞（3年連続）",
      "未経験者向けPythonカリキュラムを開発・体系化（受講者500名超）",
      "技術書「はじめてのDjango REST API」を共著"
    ],
    curriculum: [
      "Pythonの基礎文法と実行環境構築",
      "Djangoを使ったWebアプリ開発入門",
      "REST APIの設計と実装",
      "データベース（PostgreSQL）の基礎操作",
      "Dockerによる開発環境の統一"
    ],
    initials: "YK",
    avatar: "/instructors/instructor-3.jpg",
    reviews: [
      { id: "r6", reviewerType: "個人受講者", rating: 5, comment: "プログラミング未経験からDjango REST APIを構築できるようになりました。一つひとつのステップを丁寧に説明してくれるので、詰まることなく進められました。本当におすすめです。", date: "2026年3月" },
      { id: "r7", reviewerType: "企業研修担当者", rating: 5, comment: "文系出身の社員へのPython研修を依頼しました。難しい概念もわかりやすく噛み砕いてくれて、受講者全員が「楽しかった」と言っていたのが印象的でした。", date: "2026年2月" },
    ],
  },
  {
    id: "4",
    name: "Alex Chen",
    category: "AI/Data Science",
    skills: ["Python", "機械学習", "TensorFlow", "LLM活用", "MLOps", "英語対応"],
    tagline: "AIエンジニアリングの最先端を届ける。日本語・英語どちらでも対応可",
    format: "オンライン",
    price: "¥22,000 / 時間",
    bio: "MIT卒業後、Google AI Researchにて自然言語処理の研究開発に5年従事。現在は東京在住フリーランスとして国内外の企業向けにAI人材育成を行う。日本語・英語両対応で外資系企業や海外拠点を持つ企業からの依頼が多い。",
    achievements: [
      "Google AI Researchにて査読付き論文5本を発表",
      "大手商社のAI活用研修プログラムを設計（受講者200名）",
      "LLMを活用した業務自動化ワークショップを全国6都市で展開"
    ],
    curriculum: [
      "機械学習の基礎理論とPython実装",
      "データ前処理・特徴量エンジニアリング",
      "TensorFlow / PyTorchによるモデル構築",
      "LLMのビジネス活用（RAG・ファインチューニング）",
      "MLOpsと本番環境へのデプロイ"
    ],
    initials: "AC",
    avatar: "/instructors/instructor-4.jpg",
    reviews: [
      { id: "r8", reviewerType: "企業研修担当者", rating: 5, comment: "LLMを活用した業務自動化の研修を依頼しました。実際の業務シナリオに沿った内容で、研修後すぐにPoCを開始できました。費用対効果が非常に高い研修でした。", date: "2026年4月" },
      { id: "r9", reviewerType: "国際学生", rating: 4, comment: "The English and Japanese mixed session was very effective for our diverse team. Alex explained complex ML concepts in an accessible way. Highly recommended for international teams.", date: "2026年3月" },
    ],
  },
  {
    id: "5",
    name: "中村 圭介",
    category: "Infrastructure",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "セキュリティ", "短期集中OK"],
    tagline: "1週間でインフラの核心を掴む。短期集中型でクラウド運用を体得",
    format: "オンライン",
    price: "¥20,000 / 時間",
    bio: "AWS認定12冠のクラウドアーキテクト。スタートアップから上場企業まで多様な現場を経験し、短期集中型の実践研修を得意とする。「理論より手を動かす」スタイルで、2〜5日の集中プログラムにも対応可能。",
    achievements: [
      "AWS認定資格12冠取得",
      "上場企業のクラウド移行プロジェクトをリード（コスト60%削減）",
      "AWS Startup Loftにて年次登壇（2022・2023・2024）"
    ],
    curriculum: [
      "AWSコアサービスの実践（EC2 / S3 / RDS / Lambda）",
      "Terraformによるインフラのコード化（IaC）",
      "Kubernetesクラスタの構築と運用",
      "CI/CDパイプラインの設計と実装",
      "クラウドセキュリティのベストプラクティス"
    ],
    initials: "NK",
    avatar: "/instructors/instructor-5.jpg",
    reviews: [
      { id: "r10", reviewerType: "企業研修担当者", rating: 5, comment: "2日間の集中研修でAWSの主要サービスをひととおり学べました。Terraformのハンズオンが特に充実しており、研修後すぐに実環境へ適用できました。スピード感のある研修でした。", date: "2026年5月" },
      { id: "r11", reviewerType: "個人受講者", rating: 5, comment: "Kubernetes研修を受けました。実際のクラスタを触りながら学べる実践的なスタイルで、クラウド認定資格の勉強にも大いに役立っています。また受講したいです。", date: "2026年3月" },
    ],
  },
  {
    id: "6",
    name: "山本 ゆき",
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "Vue.js", "アクセシビリティ", "やさしい日本語"],
    tagline: "専門用語をかみ砕いてわかりやすく。Webの仕組みをゼロから丁寧に",
    format: "対面",
    price: "¥10,000 / 時間",
    bio: "元小学校教員という異色のキャリアを持つフロントエンド講師。子ども向けプログラミング教室の運営経験から、難しい概念をやさしい日本語・図解で伝えることが得意。外国籍社員や日本語に不慣れな受講者がいる企業からの依頼も多く対応。",
    achievements: [
      "子ども向けプログラミング教室を5年間運営（延べ800名受講）",
      "「やさしいWeb入門」動画シリーズがUdemy週間ランキング1位を獲得",
      "多言語環境向け研修の設計・実施実績あり（対応言語：日・英・中・韓）"
    ],
    curriculum: [
      "HTMLの構造とセマンティクス（図解でしっかり理解）",
      "CSSレイアウトの基礎（Flexbox / Grid）",
      "JavaScriptの基本（変数・関数・DOM操作）",
      "Vue.jsを使った動的なページ作成",
      "アクセシビリティの基礎と実装チェックリスト"
    ],
    initials: "YY",
    avatar: "/instructors/instructor-6.jpg",
    reviews: [
      { id: "r12", reviewerType: "企業研修担当者", rating: 5, comment: "外国籍社員が多い職場向けにやさしい日本語でのHTML/CSS研修をお願いしました。図解が豊富で、日本語に不慣れなメンバーにも大変好評でした。", date: "2026年4月" },
      { id: "r13", reviewerType: "個人受講者", rating: 5, comment: "プログラミング初心者ですが、Webの仕組みをゼロから丁寧に教えていただきました。専門用語がなくわかりやすく、自分のペースで理解できました。受講して本当によかったです。", date: "2026年3月" },
    ],
  },
  {
    id: "7",
    name: "鈴木 愛",
    category: "AI/Data Science",
    skills: ["Python", "データ分析", "Tableau", "統計学", "初心者歓迎", "短期集中OK"],
    tagline: "文系・非エンジニア大歓迎。短期集中でデータ分析スキルを身につける",
    format: "両方対応",
    price: "¥14,000 / 時間",
    bio: "元マーケター出身のデータサイエンティスト。文系・非エンジニアへのデータ分析研修を専門とし、「数字で語れるビジネスパーソン」育成に注力。2〜3日の集中ブートキャンプ形式にも対応しており、研修後の現場実践率が高いと評判。",
    achievements: [
      "大手消費財メーカーのデータ活用研修を設計（参加者150名）",
      "非エンジニア向けデータ分析ブートキャンプを年4回開催（満足度96%）",
      "Tableau Ambassador認定（2023年度）"
    ],
    curriculum: [
      "データ分析の思考プロセスと基礎統計",
      "PythonのPandas / NumPyで始めるデータ処理",
      "Tableauを使ったデータ可視化・ダッシュボード作成",
      "ビジネスKPIの分析・レポーティング実践",
      "機械学習入門（予測モデルの作り方と活用法）"
    ],
    initials: "SA",
    avatar: "/instructors/instructor-7.jpg",
    reviews: [
      { id: "r14", reviewerType: "企業研修担当者", rating: 5, comment: "マーケティング部門のデータ活用研修として3日間のブートキャンプをお願いしました。文系出身の参加者でも理解できる内容で、研修後にTableauを積極的に使う社員が増えました。", date: "2026年4月" },
      { id: "r15", reviewerType: "個人受講者", rating: 4, comment: "データ分析未経験から受講しました。Pandasの使い方から可視化まで段階的に学べ、実業務のデータを使った演習があって非常に実践的でした。コメントが丁寧でわかりやすかったです。", date: "2026年3月" },
    ],
  }
];
