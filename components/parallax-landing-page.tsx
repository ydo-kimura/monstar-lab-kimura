'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import React, { useEffect, useRef, useState } from 'react'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  direction?: 'left' | 'right'
}

interface LoadingAnimationProps {
  text: string
}

interface Page {
  title: string
  content: string
}

interface Slide {
  title: string
  pages: Page[]
}

interface CarouselProps {
  slides: Slide[]
  t: Translation
}

interface Translation {
  name: string
  role: string
  aboutMe: string
  slides: Slide[]
  expertise: string
  skills: string[]
  contactMe: string
  contactText: string
  getInTouch: string
  copyright: string
  switchLanguage: string
  prev: string
  next: string
}

type Translations = Record<string, Translation>

const translations: Translations = {
  "en": {
    name: "Hideki Kimura",
    role: "Solution Architect",
    aboutMe: "About Me",
    slides: [
      {
        title: "Career",
        pages: [
          {
            title: "New Graduate Humanities SE",
            content: "1996/04 - 2002/12 Resident at a financial system subsidiary @ Osaki\n・Professional baseball players came to greet us during the off-season.\n・Work: Sales support, debt collection\n・Languages: PowerBuilder, C, Java (Servlet/JSP), HTML/CSS, Javascript\n・OS: Windows 3.1, 95, 98, NT 3.5, 4, 2000, XP, AIX\n・DBMS: DB2 5, 7\n・AP Server: WebSphere Application Server 3.5\n\n→ All IBM. I was allowed to do almost everything from upstream to on-premise except for networking (I raised my hand a lot). The basics were established."
          },
          {
            title: "Resident at a manufacturer's system subsidiary",
            content: "2003/01 - 2012 Resident at a manufacturer's system subsidiary @ Nagoya, Toyota\n・I was sent to Nagoya with three others in an event gacha.\n・Work: Credit card acceptance, screening, installment, head office HR, accounting, etc.\n・Languages: C, Java (Servlet/JSP), HTML/CSS, Javascript, VB, VBA\n・OS: Windows XP, Vista, 7, 2003, 2008, 2012\n・DBMS: DB2 8, 9, Oracle 10g, 11g\n・AP Server: WebSphere Application Server 4, 5, 6, 7, 8\n\n→ The tech stack remained almost unchanged. I was allowed to do various things like ETL and data analysis infrastructure construction. Although there were only tables worth billions or tens of billions, we wasted money using early in-memory technologies (despite my warnings). Started using OracleDB (quickly got Gold)."
          },
          {
            title: "Troubleshooting three major deficit projects",
            content: "2013 In-house work @ Nagoya\n・Finally worked in-house after nearly 20 years.\n・However, I was flying around troubleshooting the three major deficit projects of that year.\n・Average monthly overtime exceeded 70 hours.\n・Completed an app for checking the loading position and delivery destination of cargo by inserting an iPhone into a barcode reader, despite being new to Objective-C.\n・Tuned a cloud service for construction site surveillance cameras to achieve the number of cameras per server, despite being new to C#, and received a bonus."
          },
          {
            title: "Cost calculation system construction",
            content: "2014 - 2015 Manufacturer's cost calculation system construction (one-person project)\n・Did almost everything from requirements definition, external design, internal design, implementation, testing, personnel planning, partner selection, budget management, infrastructure/DB construction, technology selection, etc.\n・Was already doing DevContainer-like things with VirtualBox, Chef, Vagrant (alone).\n・Implemented SPA with AngularJS and Typescript, which had just come out (alone).\n・Had to create 60 batch jobs in Java despite only having COBOL programmers as partners.\n・Created basic abstract classes for batch jobs on top of the then-unknown Spring Batch, allowing anyone who could write SQL and edit records to write batch jobs.\n・Created a test runner using JUnit and DBUnit that automatically replaced and verified table data before and after batch processing, allowing anyone who could use Excel to test batch jobs.\n\n→ Completed 60 batch jobs in six months."
          },
          {
            title: "In-house product development",
            content: "2016 - 2019/07 In-house product development. Factory data visualization. Collaboration with an Osaka manufacturer @ Aichi, Osaka\n・Commuted to Osaka once a week, eventually lived there for six months.\n・Work: Factory data visualization\n・Languages: Java, HTML/CSS, Typescript, Angular\n・OS: Windows 7, CentOS 6, 7\n・DBMS: MySQL, PostgreSQL\n・AP Server: WildFly Application Server\n・Others: Apache Kafka, Apache NiFi, Node-RED\n\n・Often couldn't get work reports signed off despite being on a quasi-delegation contract."
          },
          {
            title: "Resignation",
            content: "2019/08 Resigned.\n\n【Personal reasons for resignation】\n\n・Although not intended, all directors and executive officers were smokers, and I felt I couldn't get promoted without smoking (subjective).\n・Troubleshooting ultimately resulted in immense gratitude and appreciation from clients, but since it was a fire-fighting situation, there was no future, and it didn't lead to positive evaluations, making it meaningless despite the effort.\n・In one-person projects, there was no need to be at this company.\n・Technical discussions didn't resonate with those around me, so I was always struggling alone.\n\n→ Staying on seemed pointless.\n→ The risk of having no one outside the company to evaluate me was too great."
          },
          {
            title: "Studying for E qualification (Deep Learning)",
            content: "2019/09 - 2020/01 Passed the G test and studied for the E qualification for six months but temporarily gave up.\n\nAlthough I passed the final test, cramming linear algebra into someone who only remembers getting red marks in subjects other than English and Japanese history in school was too much of a burden, and my understanding was too shallow. I need to study more long-term."
          },
          {
            title: "Job hunting",
            content: "2020/02 - 2020/03\nDue to COVID-19, all interviews became remote (I felt lucky at this point).\n\nHad several coding tests, and passed all the interviews I reached. When I was told the evaluation of the coding test, I was told, 'Everyone else wrote the process straightforwardly, but you were the only one who found and implemented the pattern.' I don't know how many people applied, but I thought I might never go hungry again if no one else could read the intent of the question for a job with a salary of 10 million yen a year.\n\nNarrowed it down to the backend engineer at GO and Monstarlab.\nI didn't want to be a full-time backend engineer even if I got paid, and decided on Monstarlab because of Yoshida-san's bright 'It's really good.' (everyone else was gloomy)."
          },
          {
            title: "Monstarlab contract work",
            content: "2020/03 - 2024/08 Monstarlab contract work\n\n・Sompo Japan・Driving!\n・SoftBank・Vendy (twice)\n・Michinori HD, Mitsubishi Corporation・Arrival time prediction service\n・Konica Minolta・CDM\n・Konica Minolta・tomoLinks\n・Konica Minolta・MELON\n・Asahi Group Foods・Wako-chan app"
          }
        ]
      },
      {
        title: "Hobbies",
        pages: [
          {
            title: "Going to live concerts",
            content: "Being from the acid jazz generation (?), I go to about 40 concerts a year, mainly club jazz and R&B, soul from the 90s and 2000s.\n\nI also like club music such as house and drum and bass, and used to go to clubs when my favorite DJs came to Japan. Masters At Work, Blaze, Body&Soul, Rasmus Faber, London Elektricity, Goldie, etc. The last one I went to was London Elektricity in December 2019, so I haven't been in five years.\n\nAs you can see from my profile picture, I always wear T-shirts bought at live concert merchandise. I can't play any instruments. I'm a listen-only person."
          },
          {
            title: "Cooking",
            content: "In the past, men's cooking was often about 'being particular about ingredients, being particular about the finished product, and not cleaning up afterward,' but for me, the driving force is 'the process of making it seems interesting.'\n\nI can make most of the dishes that a typical mother would make, but for me, the process is important, so I like to make elaborate dishes such as:\n\n・Sometimes making dumplings from scratch,\n・Baking cheesecakes, making puddings,\n・Making fried chicken, pork cutlets, croquettes, minced meat cutlets,\n・Making gratin from flour,\n・Making curry from frying onions,\n\nI like making such elaborate dishes."
          }
        ]
      },
      {
        title: "Things I'm concerned about",
        pages: [
          {
            title: "Monstarlab's funding and its aim",
            content: "Since I started working at Monstarlab, every time I see news about funding, I keep wondering how they plan to increase ROI with a business centered on SI and increasing the denominator (funds)."
          },
          {
            title: "Small projects",
            content: "I think people assigned to small projects with small budgets and only one or two people, like myself, are probably having a hard time."
          },
          {
            title: "Waste",
            content: "There are many highly capable people, but I feel their abilities are only being utilized to the extent of consulting when in trouble, and not being leveraged as organizational strength."
          }
        ]
      }
    ],
    expertise: "My Expertise",
    skills: ['System Design', 'Cloud Architecture', 'Microservices', 'DevOps', 'API Design', 'Data Modeling'],
    contactMe: "Contact Me",
    contactText: "I'm always interested in discussing new projects and innovative solutions. If you're looking for a Solution Architect to help bring your ideas to life, feel free to reach out!",
    getInTouch: "Slack !",
    copyright: "© 2023 Hideki Kimura. All rights reserved.",
    switchLanguage: "日本語",
    prev: "Previous",
    next: "Next",
  },
  "ja": {
    name: "木村 秀樹",
    role: "ソリューションアーキテクト",
    aboutMe: "自己紹介",
    slides: [
      {
        title: "経歴",
        pages: [
          {
            title: "新卒文系ＳＥ",
            content: "1996/04 - 2002/12 金融系会社のシステム子会社常駐 @ 大崎\n・シーズンオフにプロ野球選手が挨拶に来てた。\n・業務：営業支援、債権回収\n・言語：PowerBuilder, C, Java (Servlet/JSP), HTML/CSS, Javascript\n・OS：Windows 3.1, 95, 98, NT 3.5, 4, 2000, XP, AIX\n・DBMS：DB2 5, 7\n・AP Server：WebSphere Application Server 3.5\n\n→ IBM一色。ネットワーク以外、上流からオンプレでできることは\n    ほぼやらせてもらえた（手上げまくった）。\n    基礎が出来上がる。"
          },
          {
            title: "メーカーのシステム子会社常駐",
            content: "2003/01 - 2012 メーカーのシステム子会社常駐 @ 名古屋、豊田\n・名古屋に３人飛ばすイベントガチャで飛ばされる。\n・業務：クレジットカード受付、審査、割賦、本社人事、会計など\n・言語：C, Java (Servlet/JSP), HTML/CSS, Javascript, VB, VBA\n・OS：Windows XP, Vista, 7, 2003, 2008, 2012\n・DBMS：DB2 8, 9, Oracle 10g, 11g\n・AP Server：WebSphere Application Server 4, 5, 6, 7, 8\n\n→ 技術スタックはほぼ変わらず。ETLやデータ分析基盤構築など、色々やらせてもらう。\n    基本億、十億単位のテーブルしかないのに、出始めのインメモリとかを使って\n    無駄にお金を使っていた（諌めたのに）。OracleDB を使いだす（Goldはすぐ取った）。"
          },
          {
            title: "３大赤字プロジェクトのトラブルシューティング",
            content: "2013 自社勤務 @ 名古屋\n・20年近く経ってようやく自社勤務。\n・のはずが、その年の３大赤字プロジェクトのトラブルシューティングで飛び回る。\n・月の平均残業時間が70時間を超える。\n・バーコードリーダーに iPhone を差し込み、積荷の積載位置、配達先を確認する\n    アプリのバグが一向に減らず遅れていたが、Objective-C 初見で完成させる。\n・工事現場向けの監視カメラのクラウドサービスでサーバーあたりのカメラ台数が\n    メモリ超過で達成できてなかったが、C#初見でチューニング仕切り、金一封もらう。"
          },
          {
            title: "原価計算システム構築",
            content: "2014 - 2015 メーカーの原価計算システム構築（１人プロジェクト）\n・要件定義、外部設計、内部設計、実装、テストはもちろん\n    要員計画、パートナーの選定、予算管理、インフラ・DB構築、\n    技術選定などなどほぼ全て１人で行う。\n・この頃既に VirtualBox, Chef, Vagrant で DevContainerっぽいことをやってた（１人で）。\n・出たばかりの AngularJS と Typpescript で既にSPAを実装していた（１人で）。\n・パートナーがコボラーしかいないのに Java でバッチを60本作らなければならなかった。\n・全然情報がなかった Spring Batch の上に基本的なバッチの抽象クラスを作り、\n   SQL文がかけて、レコードの編集さえできればバッチ書けるようにした。\n・JUnit、DBUnit を使い、バッチ処理前後のテーブルデータをExcelで用意しさえすれば、\n   自動的にデータの差し替えから検証まで行うテストランナーを作り、Excelさえ使えれば\n   バッチのテストができるようにした。\n\n→ 半年でバッチ60本作りきった。"
          },
          {
            title: "自社製品開発",
            content: "2016 - 2019/07 自社製品開発。工場データ可視化。大阪のメーカーと協業 @ 愛知、大阪\n・週１で大阪に通い、最終的に半年住んだ。\n・業務：工場データ可視化\n・言語：Java, HTML/CSS, Typescript, Anguler\n・OS：Windows 7, CentOS 6, 7\n・DBMS：MySQL, PostgreSQL\n・AP Server：WildFly Application Server\n・Others：Apache Kafka, Apache NiFi, Node-RED\n\n・準委任で作業報告書もっていくと、払われへんって言われて判子押してもらえないことが\n    しばしばあった。"
          },
          {
            title: "退社",
            content: "2019/08 退職。 \n\n【自分的退職事由】\n\n・そのつもりはないが、取締役、執行役員全員喫煙家で\n    タバコ吸わないと出世で来ない（主観）。\n・トラブルシューティングは、最終的にクライアントに滅茶苦茶感謝され、\n   評価されるが、炎上しているので先がなく、プラスの評価にもならないので、\n    苦労するだけで意味がない。\n・１人プロジェクトだと、別にこの会社である必要がない。\n・技術的な話がまったく周りに通じない為、常に１人で苦労し続けている。\n\n→ 在籍し続けてもいいことなさそう。\n→ 社内以外に自分を評価してくれる人がいないことがリスクとして大き過ぎる。"
          },
          {
            title: "Ｅ資格（ディープラーニング）の勉強",
            content: "2019/09 - 2020/01 Ｇ検定をとり、Ｅ資格の勉強を半年するも、一旦諦める。\n\n一応、終業テストも合格したが、学生時代、数学（というか英語と日本史以外）赤点しか\n取った記憶がない自分に線形代数から詰め込むのは負荷が高過ぎで、理解が浅すぎた。\nもっと長期的に勉強する必要がある。"
          },
          {
            title: "職探し",
            content: "2020/02 - 2020/03\nコロナになり、面談がすべてリモートに（この時点でもってるな自分を強く感じる）。\n\nコーディング試験もいくつかあり、面談までいったものはすべて合格した。\nコーディングテストの評価を聞かされたときに、「ほかはみんな愚直に処理を書いてましたが、パターンを見つけて実装してるのはあなただけでした」と聞かされる。\n何人受けたか知らないが、年収１Ｋ万の仕事に応募した人誰一人として出題者の意図を読めないのか。。。一生食いっぱぐれないかもと思う。\n\n転職サービスのGOのバックエンドエンジニアとモンラボの二択に絞る。\nお金もらっても専業バックエンドエンジニアはいやだったのと、\n吉田さんの「めちゃめちゃいいじゃないですか。」とその明るさで（ほかはみんな暗かった）モンラボに決めた。"
          },
          {
            title: "モンスターラボ業務委託",
            content: "2020/03 - 2024/08 モンスターラボ業務委託\n\n・損保ジャパン・Driving!\n・ソフトバンク・Vendy（２回）\n・みちのりHD、三菱商事・到着時刻予測サービス\n・コニカミノルタ・CDM\n・コニカミノルタ・tomoLinks\n・コニカミノルタ・MELON\n・アサヒグループ食品・わこちゃんアプリ"
          }
        ]
      },
      {
        title: "趣味",
        pages: [
          {
            title: "ライブにいく",
            content: "アシッドジャズ世代なので（？）、クラブジャズとか\n９０年代２０００年代のR&B、ソウルなどを中心に、年40本ぐらい行ってます。\n\nハウスやドラムンベースなどのクラブミュージックも好きで\n好きなDJが来日したときはクラブにも行ってました。\nMasters At Work, Blaze, Body&Soul, Rasmus Faber, London Elektricity, Goldieとか。\n最後に行ったのは2019年12月の London Elektricity なので、5年は行ってないですが。\n\nプロフィール写真もそうですが、ライブの物販で買ったＴシャツを常に着ています。\n楽器は出来ません。Listen Only です。"
          },
          {
            title: "料理",
            content: "一昔前は男の料理というと、「材料にこだわり、出来栄えにこだわり、後片付けはしない」みたいな感じだったと思いますが、自分の場合は、「つくる過程がおもしろそう」が原動力になってます。\n\n普通にお母さんが作ってくれそうな料理はたいてい作れますが、\nわたしにとっては過程が重要なので、\n\n・たまに餃子を皮から作ってみたり、\n・チーズケーキ焼いてみたり、プリン作ってみたり、\n・唐揚げ、とんかつ、コロッケ、メンチカツ作ってみたり、\n・グラタンを小麦粉から作ってみたり、\n・カレーを玉ねぎ炒めるところからやってみたり、\n\nみたいな手の込んだ料理を作るのが好きです。"
          }
        ]
      },
      {
        title: "気になってること",
        pages: [
          {
            title: "モンラボの資金調達とそのねらい",
            content: "モンラボの仕事はじめてから、資金調達したニュースを見るたびに、\nSI中心のビジネスで、分母（資金）どんどん増やして、\nどうやって ROI を上げていくつもりなんだろうってずっと思ってます。"
          },
          {
            title: "少人数のプロジェクト",
            content: "自分がそうなんですが、予算が小さくて、１人２人で回しているプロジェクトに\nアサインされている人は結構辛いって思ってるんじゃないかなと思ってます。"
          },
          {
            title: "もったいない",
            content: "能力の高い人がたくさんいるのに、その人達のちからが、せいぜい困ったときに相談乗るとかぐらいで、組織のちからとして活用できてない気がしてます。"
          }
        ]
      }
    ],
    expertise: "専門分野",
    skills: ['システム設計', 'クラウドアーキテクチャ', 'マイクロサービス', 'DevOps', 'API設計', 'データモデリング'],
    contactMe: "お問い合わせ",
    contactText: "新しいプロジェクトや革新的なソリューションについて議論することに常に興味があります。アイデアを実現するためのソリューションアーキテクトをお探しでしたら、お気軽にご連絡ください。",
    getInTouch: "Slack !",
    copyright: "© 2023 木村 秀樹. All rights reserved.",
    switchLanguage: "English",
    prev: "前へ",
    next: "次へ",
  }
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children, className, direction = 'left' }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollTop, setLastScrollTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (st > lastScrollTop) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }
      setLastScrollTop(st <= 0 ? 0 : st)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollTop])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const variants = {
    hidden: {
      x: direction === 'left' ? -100 : 100,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      x: direction === 'left' ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.8, ease: "easeIn" }
    }
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </div>
  )
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ text }) => {
  const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF']
  const ballSize = 20
  const triangleSize = 60

  const vertices = [
    { x: 0, y: -triangleSize * Math.sqrt(3) / 2 },
    { x: triangleSize / 2, y: triangleSize * Math.sqrt(3) / 4 },
    { x: -triangleSize / 2, y: triangleSize * Math.sqrt(3) / 4 },
  ]

  const ballVariants = {
    animate: (i: number) => ({
      x: [vertices[i].x, vertices[(i + 1) % 3].x, vertices[(i + 2) % 3].x, vertices[i].x],
      y: [vertices[i].y, vertices[(i + 1) % 3].y, vertices[(i + 2) % 3].y, vertices[i].y],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }
    })
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-24 h-24 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ballSize,
              height: ballSize,
              left: `calc(50% - ${ballSize / 2}px)`,
              top: `calc(50% - ${ballSize / 2}px)`,
            }}
            variants={ballVariants}
            animate="animate"
            custom={i}
          >
            <motion.div
              className="w-full h-full rounded-full"
              animate={{
                backgroundColor: colors,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        ))}
      </div>
      <motion.h2
        className="text-white text-4xl font-bold"
        animate={{
          opacity: [0, 1, 0],
          y: [-20, 0, 20],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.h2>
    </motion.div>
  )
}

const Carousel: React.FC<CarouselProps> = ({ slides, t }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const selectSlide = (index:number) => {
    setCurrentSlideIndex(index)
    setCurrentPageIndex(0)
  }

  const nextSlide = () => {
    if (currentPageIndex === slides[currentSlideIndex].pages.length - 1) {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
      setCurrentPageIndex(0)
    } else {
      setCurrentPageIndex((prevIndex) => (prevIndex + 1) % slides[currentSlideIndex].pages.length)
    }
  }

  const prevSlide = () => {
    if (currentPageIndex === 0) {
      const newSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length
      const newPageIndex = slides[newSlideIndex].pages.length - 1
      setCurrentSlideIndex(newSlideIndex)
      setCurrentPageIndex(newPageIndex)
    } else {
      setCurrentPageIndex((prevIndex) => (prevIndex - 1 + slides[currentSlideIndex].pages.length) % slides[currentSlideIndex].pages.length)
    }
  }

  return (
    <div className="relative w-full h-[700px] overflow-hidden bg-gray-800 rounded-lg shadow-lg" aria-roledescription="carousel">
      <div className="w-full flex flex-row">
        {slides.map((slide: Slide, index: number) => (
        <div key={index} className="flex flex-col items-start justify-start px-10 pt-10 overflow-y-auto" onClick={() =>  selectSlide(index)}>
          <h1 className={`text-3xl font-bold border-white ${ currentSlideIndex === index ? ' text-[#fcff01] border-b-4 animate-underline' : 'text-[#cccc6a]' } mb-4`}>{slide.title}</h1>
        </div>
        ))}
      </div>
      <AnimatePresence initial={false} custom={currentPageIndex}>
        <motion.div
          key={currentPageIndex}
          custom={currentPageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-[90px] flex flex-col items-start justify-start px-20 pt-5 pb-10 overflow-y-auto"
        >
          <h3 className="text-2xl font-bold text-[#fcff01] mb-4">{slides[currentSlideIndex].pages[currentPageIndex].title}</h3>
          <p className="text-lg text-white whitespace-pre-wrap">{slides[currentSlideIndex].pages[currentPageIndex].content}</p>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#fcff01] text-gray-900 p-2 rounded-full"
        aria-label={typeof t === 'object' && 'prev' in t ? String(t.prev) : 'Previous'}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#fcff01] text-gray-900 p-2 rounded-full"
        aria-label={typeof t === 'object' && 'next' in t ? String(t.next) : 'Next'}
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides[currentSlideIndex].pages.map((_:Page, index:number) => (
          <button
            key={index}
            onClick={() => setCurrentPageIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentPageIndex ? 'bg-[#fcff01]' : 'bg-gray-400'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export function ParallaxLandingPage() {
  const ref = useRef(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [isHeaderFixed, setIsHeaderFixed] = useState(false)
  const [buttonHref, setButtonHref] = useState('/slack-redirect')
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState('ja')
  const [buttonBottom, setButtonBottom] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsHeaderFixed(scrollPosition > window.innerHeight * 0.7)

      if (footerRef.current) {
        const footerHeight = footerRef.current.offsetHeight
        setButtonBottom(footerHeight + 20)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial position
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setButtonHref('https://monstarlab.slack.com/archives/C07MWMSQJ4S')
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.open(buttonHref, '_blank', 'noopener,noreferrer')
  }

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ja' : 'en')
  }

  const t = translations[language]

  return <>
    <style jsx global>{`
      .name-outline {
        text-shadow: 
          -3px -3px 0 #000,
          3px -3px 0 #000,
          -3px 3px 0 #000,
          3px 3px 0 #000,
          0 -3px 0 #000,
          0 3px 0 #000,
          -3px 0 0 #000,
          3px 0 0 #000;
      }
      .role-outline {
        text-shadow: 
          -2px -2px 0 #000,
          2px -2px 0 #000,
          -2px 2px 0 #000,
          2px 2px 0 #000,
          0 -2px 0 #000,
          0 2px 0 #000,
          -2px 0 0 #000,
          2px 0 0 #000;
      }
    `}</style>
    <AnimatePresence>
      {isLoading && <LoadingAnimation text="Loading..." />}
    </AnimatePresence>

    <motion.div
      ref={ref}
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {isHeaderFixed && (
        <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-50 transition-all duration-300 ease-in-out">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <div className="bg-[#fcff01] h-16 w-56 flex items-center justify-center px-5">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/logo.webp"
                    alt="Monstarlab Logo"
                    priority={true}
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "contain"
                    }} />
                </div>
              </div>
              <div className="flex items-center py-4">
                <Image
                  src="/images/profile.jpg"
                  alt={t.name}
                  priority={true}
                  height={40}
                  width={40}
                  className="rounded-full mr-3 border-[#fcff01]" />
                <div>
                  <h2 className="text-2xl font-bold text-white name-outline">{t.name}</h2>
                  <p className="text-xl font-bold text-[#fcff01] role-outline">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="h-screen overflow-hidden relative">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/background.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            y: backgroundY
          }}
        />

        <motion.div
          className="relative z-10 h-full flex flex-col justify-center items-center text-white"
          style={{ y: textY }}
        >
          <div className="w-[320px] h-[90px] relative mb-8 bg-[#fcff01] rounded flex items-center justify-center px-5">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/logo.webp"
                alt="Monstarlab Logo"
                priority={true}
                fill
                sizes="100vw"
                style={{
                  objectFit: "contain"
                }} />
            </div>
          </div>
          <Image
            src="/images/profile.jpg"
            alt={t.name}
            priority={true}
            width={200}
            height={0}
            className="h-auto rounded-full mb-6 shadow-lg"
          />
          <AnimatedText className="mb-4" direction="left">
            <h1 className="text-5xl font-bold name-outline">{t.name}</h1>
          </AnimatedText>
          <AnimatedText direction="right">
            <p className="text-2xl text-[#fcff01] role-outline">{t.role}</p>
          </AnimatedText>
        </motion.div>
      </div>

      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedText className="mb-6" direction="left">
            <h2 className="text-3xl font-bold text-[#fcff01]">{t.aboutMe}</h2>
          </AnimatedText>
          <Carousel slides={t.slides} t={t} />
        </div>
      </section>

      <section className="bg-gray-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedText className="mb-6" direction="right">
            <h2 className="text-3xl font-bold text-[#fcff01]">{t.expertise}</h2>
          </AnimatedText>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {t.skills.map((skill, index) => (
              <AnimatedText key={skill} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="bg-gray-700 p-4 rounded shadow border-l-4 border-[#fcff01]">
                  {skill}
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedText className="mb-6" direction="left">
            <h2 className="text-3xl font-bold text-[#fcff01]">{t.contactMe}</h2>
          </AnimatedText>
          <AnimatedText className="mb-6" direction="right">
            <p className="text-lg">
              {t.contactText}
            </p>
          </AnimatedText>
          <AnimatedText direction="left">
            <a
              href={buttonHref}
              onClick={handleButtonClick}
              className="inline-block bg-[#fcff01] text-gray-900 px-6 py-3 rounded hover:bg-opacity-80 transition-colors font-semibold"
            >
              {t.getInTouch}
            </a>
          </AnimatedText>
        </div>
      </section>

      <footer ref={footerRef} className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="bg-[#fcff01] h-16 w-56 flex items-center justify-center px-5">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/images/logo.webp"
                  alt="Monstarlab Logo"
                  priority={true}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "contain"
                  }} />
              </div>
            </div>
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>

      <button
        onClick={toggleLanguage}
        style={{ bottom: `${buttonBottom}px` }}
        className="fixed right-4 bg-[#fcff01] text-gray-900 px-4 py-2 rounded hover:bg-opacity-80 transition-colors font-semibold z-50"
      >
        {t.switchLanguage}
      </button>
    </motion.div>
  </>;
}