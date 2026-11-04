/* ============================================================
   長野市のお困りごと案内所：共通の設定と動き（全ページで読み込まれます）
   設定を変えるときは、このファイルの上の方だけを編集してください。
   ============================================================ */
const ROOT=window.ROOT||"";   /* トップ="" ／ カテゴリー別ページ="../"（各ページ側で指定） */

/* ★★ 同意の文言（案内画面のチェックボックス）
   ※ LINE_RECEPTION.prefill にも同じ趣旨の文があります。変えるときは両方を合わせてください。 */
const CONSENT_LABEL="送信する相談内容・お名前・電話番号などを、対応可能な専門業者へ共有し、専門業者から直接お電話がかかることに同意します。";

/* ★★ LINE受付の設定（相談の受付は、公式LINEのみです）
   ・url：LINE公式アカウントのURL（lin.ee / line.me / page.line.me で始まるものだけ有効）
   ・basicId：ベーシックID。入れると、下の prefill（入力用紙）が入力された状態でLINEが開きます
   ・hours：お問い合わせの受付時間（案内所の受付時間です。業者の対応時間ではありません）
   ・prefill：LINEに事前入力するメッセージ。
       {category}=カテゴリー名、{item}=相談項目（なければ空）、{form}=記入項目（入力用紙） */
const LINE_RECEPTION={
  url:"https://lin.ee/tTiPLc4",
  basicId:"@164wtqps",
  hours:"月曜日〜金曜日 8:30〜17:00",
  hoursNote:"メッセージは時間外でも送信できます。確認・返信は受付時間内に行います。",
  lead:"長野市のお困りごと案内所のLINEで、ご相談内容を受け付けます。\n内容は、相談内容に応じた地域の専門業者へおつなぎします。",
  prefill:"【{category}】{item}について相談したいです。\n\n{form}\n\n相談内容・お名前・電話番号などを、対応可能な専門業者へ共有し、専門業者から直接お電話がかかることに同意します。"
};

/* ★ 入力用紙の共通の記入項目（カテゴリーごとの項目は、下の CATEGORIES の ask に書いてあります） */
const FORM_TOP=["お名前（本名）","電話番号","困りごとが起きている地域（町名まで）"];
const FORM_PHOTO="写真（任意・このあとお送りします）";

/* ★ 共通の文言 */
const RECEPTION={
  responseNote:"緊急性のないご相談は、原則7日以内を目安にご連絡します。",
  showEmergencyNotice:true,
  emergencyNotice:"※当サービスは緊急対応窓口ではありません。緊急性の高いトラブルについては、状況に応じて適切な緊急対応先へご相談ください。",
  feeNote:"ご相談者さまから、相談料・紹介料・仲介手数料をいただくことはありません。紹介先の業者から、実際に依頼が成立した場合に、当サービスが紹介料等を受け取ることがあります。",
  confirmNote:"相談したからといって、必ず依頼する必要はありません。"
};

/* ★ 対応地域・受付時間などの案内（「受付時間・対応について」に表示されます） */
const SERVICE_INFO={
  area:"長野県及びその周辺地域",
  areaNote:"地域やご相談内容によって対応できない場合があります。詳しくはお問い合わせください。",
  providerHours:"ご相談内容や紹介先の業者によって異なります。お問い合わせ後に確認いたします。",
  emergency:"対応可能な業者を確認いたします。まずはお問い合わせください。",
  reserve:"事前予約のご相談ができます。ご希望の日時をお知らせください。",
  reserveNote:"予約の確定は、紹介先の業者との直接のご確認によります。",
  caution:"上の受付時間は、案内所のお問い合わせ受付時間です。作業を行う業者の対応時間とは異なります。"
};

/* ★ サービスの説明（トップ・運営者情報に表示。フッターには「民間の紹介サービスです」と行政ではない旨が出ます） */
const SERVICE_NOTICE={
  title:"このサービスについて",
  lead:"長野市のお困りごと案内所は、長野県及びその周辺地域のお困りごとについて、相談内容に応じた専門業者をご紹介する民間の紹介サービスです。",
  points:[
    "ご相談者さまから、相談料・紹介料・仲介手数料をいただくことはありません。会費もありません。",
    "作業内容・料金・日程・契約条件の確認、作業の実施、お支払いは、利用者と紹介先業者との間で直接行っていただきます。",
    "当サービスは、紹介先業者から、実際に依頼が成立した場合に紹介料等を受け取ることがあります。"
  ],
  gov:"本サービスは、長野市、国、その他の行政機関が運営するものではありません。"
};

/* ★ カテゴリー
   ・items：相談項目（ボタンになります）
   ・ask：入力用紙の、カテゴリーごとの記入項目（各ページの「相談するときに伝えておくとよい情報」と対応）
   ・active:false にすると、トップ・リンクから消え、ページは「準備中」の表示になります
     （紹介できる業者がいないカテゴリーは false に。sitemap.xml からも、そのページを消します） */
const GROUPS={life:"暮らしのお困りごと",vehicle:"乗り物のお困りごと"};
const CATEGORIES=[
 {id:"water",active:true,group:"life",name:"水道・トイレ",desc:"水漏れ・詰まり・蛇口など",url:"water/",
  items:["水漏れ","トイレの詰まり・流れの悪さ","蛇口の水が止まらない・ポタポタする","排水の流れが悪い","トイレ・蛇口などの交換"],
  ask:["どこで困っているか（トイレ・キッチン・洗面・浴室・屋外 など）","どんな状態か","いつから起きているか","住まいの種類（持ち家・賃貸、戸建て・集合住宅）"],
  icon:'<path d="M12 3C9 8 6 11 6 15a6 6 0 0 0 12 0c0-4-3-7-6-12z"/>'},
 {id:"electric",active:true,group:"life",name:"電気・エアコン",desc:"電球・火災警報器・エアコンなど",url:"electric/",
  items:["照明がつかない・ちらつく","電球の取り替え","コンセントが使えない","ブレーカーが落ちる","住宅用火災警報器の点検","エアコンが動かない・効きが悪い","エアコンの取り付け・取り外し","エアコンのクリーニング"],
  ask:["どの機器・設備か","どんな状態か","メーカー・型番（分かれば）","いつから起きているか"],
  icon:'<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>'},
 {id:"roof",active:true,group:"life",name:"屋根・外壁・雨漏り",desc:"雨漏り・屋根・外壁の修理や塗装など",url:"roof/",
  items:["雨漏りが心配","天井や壁のシミ","屋根の修理","雨どいの修理","屋根の塗装","屋根の洗浄","外壁の塗装","外壁の洗浄"],
  ask:["どこで困っているか（室内・屋根・雨どい・外壁 など）","どんな状態か","いつから・どんな天気のときか","建物の種類・築年数"],
  icon:'<path d="M3 11 12 3l9 8M5 10v10h14V10M10 20v-6h4v6"/>'},
 {id:"garden",active:true,group:"life",name:"草刈り・庭・外まわり",desc:"草刈り・剪定・伐採・砂利敷きなど",url:"garden/",
  items:["草刈り・除草","庭木の剪定","樹木の伐採","樹木の抜根","砂利敷き","防草シート","ブロック塀の解体","物置の解体・撤去"],
  ask:["場所と広さの目安","草木・樹木の状態（高さ・本数など）","希望する作業","敷地の状況（出入りのしやすさ、隣家との距離 など）","希望する時期"],
  icon:'<path d="M12 21v-8M12 13c-5 0-7-4-7-8 5 0 7 3 7 8zM12 15c4 0 6-3 6-6-4 0-6 2-6 6z"/>'},
 {id:"clean",active:true,group:"life",name:"不用品回収・片付け",desc:"不用品・片付け・生前整理・遺品整理など",url:"clean/",
  items:["不用品の回収","不用品の片付け・処分","家の片付け","引っ越し前の片付け","物置・車庫・倉庫の整理","家具・家電の処分","生前整理","遺品整理","家財整理"],
  ask:["片付けたい場所","品目と量の目安","階数・エレベーターの有無","希望する時期"],
  icon:'<path d="M3 8l9-4 9 4-9 4zM3 8v9l9 4 9-4V8M12 12v9"/>'},
 {id:"snow",active:true,group:"life",name:"雪かき・雪下ろし",desc:"雪かき・屋根の雪下ろし・事前予約など",url:"snow/",
  items:["雪かき","屋根の雪下ろし","雪かきの事前予約・定期依頼"],
  ask:["どこの雪か（玄関・駐車場・通路・屋根）と広さ","雪の状況","希望する日時・頻度"],
  icon:'<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M9.5 4.8 12 7l2.5-2.2M9.5 19.2 12 17l2.5 2.2"/>'},
 {id:"help",active:true,group:"life",name:"暮らしのお手伝い",desc:"引っ越しの手伝い・大型家具の移動・蜂の巣駆除など",url:"help/",wide:true,
  items:["引っ越しの手伝い","大型家具の移動","蜂の巣駆除","オリジナルデザインTシャツの作成"],
  ask:["ご希望の内容","作業する場所","量や数の目安（分かれば）","希望する日時・時期"],
  icon:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'},
 {id:"vehicle",active:true,group:"vehicle",name:"乗り物のお困りごと",desc:"バッテリー上がり・タイヤ・レスキューなど",url:"vehicle/",wide:true,
  items:["急なバッテリー上がり","パンク時のタイヤ交換","スタッドレスタイヤへの交換","夏タイヤへの交換","乗用車のタイヤチェーン出張取り付け","乗用車の雪道スタックのレスキュー","乗用車・バイクのガス欠レスキュー","バイク・自転車の故障時のレスキュー"],
  ask:["車両の種類（乗用車・バイク・自転車／メーカー・車名）","今の状況","今いる場所のおおよその地域","タイヤのサイズ（交換の場合・分かれば）","希望する日時"],
  icon:'<path d="M4 15v-4l2-4h12l2 4v4M4 15h16M4 15v2h3v-2M17 15v2h3v-2"/><circle cx="8" cy="12.5" r=".8"/><circle cx="16" cy="12.5" r=".8"/>'},
 {id:"other",active:true,group:"other",name:"その他",desc:"どこに頼めばいいかわからない場合はこちら",url:"#cat=other",wide:true,
  ask:["どんなことで困っているか","いつから起きているか"],
  icon:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17v.1"/>'}
];

/* ★ 専門業者データ【内部用】一般の画面には一切表示されません
   {id:"p001",name:"〇〇設備",category:"water",area:"長野市〇〇周辺",
    services:["水漏れ"],hours:"9:00〜18:00",phone:"026-000-0000",image:"",available:true}, */
const PROVIDERS=[
];

/* ★ 相談案件の管理項目メモ【内部用・画面には表示しません】 */
const CASE_FIELDS=["id","receivedAt","lineName","realName","phone","area","category","item","detail","hasPhoto","urgency","consent","consentAt","consentMethod","forwardedTo","forwardStatus","providerContact","result"];

/* ★ 情報ページの文章（プライバシーポリシー・利用規約） */
const POLICY_DATE={privacy:"",terms:""};

const PRIVACY=[
 {h:"はじめに",b:["長野市のお困りごと案内所（以下「本サイト」）は、利用者のプライバシーを大切にします。このページでは、本サイトが実際に行っている情報の取り扱いについてご説明します。"]},
 {h:"本サイトのウェブページで取得する情報",b:["現在、本サイトのウェブページには、お問い合わせフォーム、会員登録、ログイン、アクセス解析ツール、広告、クリック計測を設置していません。そのため、ウェブページの閲覧だけで、氏名・電話番号・メールアドレスなどの個人情報を取得・保存することはありません。","また、本サイトは Cookie を独自に設定していません。"]},
 {h:"LINEで受け取る情報",b:["「このことで相談する」からLINE公式アカウントでご相談いただいた場合、ご相談の受け付けのために、LINEのメッセージを通じて次の情報を受け取ります。",["LINEの表示名（LINEネーム。LINE上で運営者側に表示される名前）","お名前（LINEの表示名と本名が異なる場合などに、確認することがあります）","電話番号","困りごとの内容（選んだカテゴリーや相談項目を含みます）","住所・地域（困りごとが起きている場所）","状況が分かる写真（任意）","そのほか、相談者様が送信してくださった情報"],"ご相談に必要な範囲でお送りください。"]},
 {h:"利用目的",b:["受け取った情報は、次の目的に限って利用します。",["ご相談内容の確認・整理","ご相談内容に対応できる専門業者の選定・ご紹介","相談者様へのご連絡","紹介業務の管理（ご紹介の経緯や、同意の記録の管理を含みます）"]]},
 {h:"専門業者への個人情報の提供について",b:["当案内所では、お客様からいただいたご相談に対応するため、LINEの表示名、電話番号、ご相談内容、発生地域、送信いただいた写真などの情報を、相談内容に応じた専門業者へ提供する場合があります。LINEの表示名と本名が異なる場合などは、お名前をお伺いして、あわせて提供することがあります。","専門業者は、提供された情報をもとに相談内容を確認し、お客様へ直接電話で連絡することがあります。専門的なご相談や、必要に応じた現地確認・日程調整は、専門業者が電話で直接行います。","個人情報を専門業者へ提供する際は、事前にお客様の同意を取得し、相談への対応に必要な範囲に限って情報を共有します。必要以上の情報は提供しません。同意をいただく前に、専門業者へ情報を提供することはありません。","提供先は、ご相談内容に対応できる専門業者に限ります。","情報の提供を受けた専門業者は、それぞれの方針に基づいて、受け取った情報を取り扱います。"]},
 {h:"同意の確認方法",b:["本サイトの案内画面で、情報の提供についての説明をご覧いただき、同意のチェックをいただいたうえで、LINEへ進んでいただきます。","同意の内容は、LINEのトーク履歴の上でも確認します。同意をいただいた記録は、保存します。"]},
 {h:"メッセージ・写真の取り扱い",b:["LINEで受け取ったメッセージや写真は、ご相談の対応に必要な範囲で、運営者が確認・管理します。ご相談への対応以外の目的には使用しません。"]},
 {h:"安全管理について",b:["受け取った個人情報は、次のとおり管理します。",["情報を扱う者を、必要最小限に限ります。","不要になった情報は、長期間保管せず、適切な方法で削除します。","情報の漏えいなどを防ぐよう、適切に管理します。"]]},
 {h:"開示・訂正・利用停止等のご請求について",b:["ご自身の個人情報についての、開示・訂正・利用停止等のご請求は、公式LINEでお受けします。","ご請求の際は、必要に応じて、ご本人の確認をさせていただきます。いただいたご請求への対応は、記録として保存します。"]},
 {h:"苦情・お問い合わせ窓口",b:["個人情報の取扱いに関するご相談・苦情は、公式LINEでお受けします。"]},
 {h:"LINEの利用について",b:["ご相談は、LINEヤフー株式会社が提供するLINE公式アカウントを通じて行われます。LINE上での情報の取り扱いは、LINEのプライバシーポリシー等に従います。"]},
 {h:"サイトの配信について",b:["本サイトは GitHub Pages を利用して配信しています。配信にあたり、サービス提供元がアクセス記録（IPアドレス等）を取得する場合があります。詳しくは提供元の方針をご確認ください。"]},
 {h:"第三者への提供",b:["ご本人の同意を得た専門業者への情報の提供、および法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。"]},
 {h:"今後の変更",b:["今後、アクセス解析やお問い合わせフォームなどを導入する場合は、本ページを更新します。"]}
];

const TERMS=[
 {h:"このサイトについて",b:["本サイト（長野市のお困りごと案内所）は、長野県及びその周辺地域での暮らしや乗り物のお困りごとについて、ご相談内容を受け付け、相談内容に応じた専門業者をご紹介する民間の紹介サービスです。","本サービスは、長野市、国、その他の行政機関が運営するものではありません。","案内所は、専門業者ではありません。工事、修理、草刈り、伐採、解体、雪下ろし、タイヤ交換などの作業は行いません。専門的な判断、修理方法の提案、電話による相談対応も行いません。"]},
 {h:"利用について",b:["本サイトをご利用になる方は、この利用規約に同意したものとみなします。ご自身の判断と責任でご利用ください。"]},
 {h:"利用料金・紹介料について",b:["ご相談者さまから、相談料・紹介料・仲介手数料・会費等をいただくことはありません。","作業の代金は、利用者が、紹介先の業者へ直接お支払いいただきます。当サービスは、作業代金をお預かりしません。","当サービスは、紹介先の事業者から、実際に依頼が成立した場合に、紹介料等を受け取ることがあります。"]},
 {h:"相談の流れについて",b:["LINEでご相談内容を受け付け、必要な情報を、ご相談内容に対応できる地域の専門業者へLINEで転送します。電話番号などの共有については、ご相談の前にご本人の同意をいただきます。","専門業者は、転送された内容を確認し、ご同意いただいた電話番号へ直接お電話して、専門的なご相談への対応や、必要に応じた現地確認・日程調整を行います。相談者様と専門業者は、電話で直接やり取りします。","緊急性のないご相談は、原則7日以内を目安にご連絡します。これはあくまで目安です。ご相談の内容や、専門業者との調整状況などによって、時間がかかる場合があります。期間内の対応や解決をお約束するものではありません。","専門業者から必ず連絡が来ること、専門業者を必ずご案内できること、問題が解決することをお約束するものではありません。また、本サイトは緊急対応窓口ではなく、緊急対応を保証するものではありません。"]},
 {h:"対応地域・受付時間について",b:["対応地域は、長野県及びその周辺地域です。地域やご相談内容によって、ご案内できない場合があります。","お問い合わせの受付時間は、本サイトに記載のとおりです。時間外でもLINEでメッセージは送信できますが、確認・返信は受付時間内に行います。","作業を行う専門業者の対応時間は、ご相談内容や紹介先の業者によって異なります。案内所の受付時間とは別のものです。","雪かき、屋根の雪下ろし、バッテリー上がり、パンク、ガス欠、スタックなどのレスキュー、樹木の伐採、解体、屋根や外壁の工事など、ご相談内容や専門業者の状況によって、対応できるかどうかが異なります。対応をお約束するものではありません。屋根の雪下ろしは、安全面に配慮し、経験や対応体制のある専門業者へのご紹介を前提としています。","不用品回収・片付け（生前整理・遺品整理・家財整理を含みます）は、必要な許可・資格等を持つ事業者かどうかを確認したうえでご紹介します。すべての品目の回収をお約束するものではありません。"]},
 {h:"専門業者について",b:["紹介先となる事業者は、それぞれが独立して事業を行っています。本サイトは、事業者の順位付けや比較を目的としていません。","作業の内容によっては、必要な許可・資格等が定められているものがあります。","紹介先の業者の作業の品質や対応について、当サービスが保証するものではありません。"]},
 {h:"料金・契約について",b:["作業内容、料金、日程、契約条件、お支払いは、相談者様と紹介先の専門業者との間で、直接確認のうえ決めるものです。見積もりは、専門業者が直接提示します。","本サイトは、その契約の当事者ではなく、業者に代わって作業の契約を締結することはありません。","相談したからといって、依頼する義務は生じません。"]},
 {h:"免責事項",b:["掲載情報は正確になるよう努めますが、その完全性や最新性を保証するものではありません。","事業者とのやり取りや作業に関して生じたトラブルや損害について、本サイトは、法令で認められる範囲で責任を負いません。"]},
 {h:"サービス内容の変更・停止",b:["本サイトの内容は、事前の予告なく変更・停止することがあります。"]},
 {h:"禁止事項",b:["次の行為はおやめください。",["法令や公序良俗に反する行為","本サイトの運営を妨げる行為","事業者や第三者への迷惑行為、誹謗中傷","本サイトの内容の無断転載・無断販売","その他、運営者が不適切と判断する行為"]]},
 {h:"著作権",b:["本サイトの文章・デザインなどの著作権は、運営者に帰属します。法令で認められる範囲を超えて、無断で利用することはできません。"]},
 {h:"規約の変更",b:["必要に応じて、この規約を変更することがあります。変更後の規約は、本ページに掲載した時点から効力を持ちます。"]},
 {h:"準拠法・管轄",b:["この規約には日本法を適用します。","管轄裁判所については、確定後に定めます。"]}
];
/* ===================================================== */

const $=s=>document.querySelector(s);
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const has=v=>v!==undefined&&v!==null&&String(v).trim()!=="";
const DEF_TITLE=document.title;
const ACTIVE=CATEGORIES.filter(c=>c.active!==false);

/* ----- LINE：URLが正しい形の時だけ有効 ----- */
const LURL=has(LINE_RECEPTION.url)?String(LINE_RECEPTION.url).trim():"";
const LINE_URL_OK=/^https:\/\/(lin\.ee|line\.me|page\.line\.me)\/[^\s"'<>]+$/.test(LURL);
if(LURL&&!LINE_URL_OK&&window.console&&console.warn)console.warn("LINEのURLの形が正しくないため、無効にしました:",LURL);
const BID=has(LINE_RECEPTION.basicId)?String(LINE_RECEPTION.basicId).trim():"";
const PREFILL_OK=/^@[A-Za-z0-9._-]{2,}$/.test(BID)&&has(LINE_RECEPTION.prefill);
const LINE_READY=LINE_URL_OK||PREFILL_OK;
const HOURS=LINE_RECEPTION.hours;
const EMERGENCY=RECEPTION.showEmergencyNotice&&has(RECEPTION.emergencyNotice)?RECEPTION.emergencyNotice:"";
const subjectOf=(cat,item)=>item?cat.name+"／"+item:cat.name;

/* 入力用紙（記入項目）と、LINEに入力するメッセージ */
function formText(cat){
  return FORM_TOP.concat(cat.ask||[],[FORM_PHOTO]).map(l=>"■"+l+"：").join("\n");
}
function messageText(cat,item){
  return String(LINE_RECEPTION.prefill||"").replace("{category}",cat.name).replace("{item}",item||"").replace("{form}",formText(cat));
}
function lineLink(cat,item){
  if(PREFILL_OK)return "https://line.me/R/oaMessage/"+BID+"/?"+encodeURIComponent(messageText(cat,item));
  return LINE_URL_OK?LURL:"";
}

/* 固定ヘッダーの実際の高さを取得してCSSに反映 */
const hd=document.querySelector("header");
const setH=()=>document.documentElement.style.setProperty("--header-h",hd.offsetHeight+"px");
setH();addEventListener("resize",setH);
if(window.ResizeObserver)new ResizeObserver(setH).observe(hd);

/* 再読み込み時に、閉じた案内画面の履歴が残って「二重に戻る」ことを防ぐ */
if(history.state&&history.state.sheet)history.replaceState(null,"");

/* フッターに、行政機関ではない旨を表示（全ページ共通） */
const fw=document.querySelector("footer .wrap");
if(fw)fw.insertAdjacentHTML("beforeend",`<p class="fnote">民間の紹介サービスです。${esc(SERVICE_NOTICE.gov)}</p>`);

/* ----- カテゴリーのカード・リンク ----- */
const catHref=c=>ROOT+c.url;
function cardHtml(c){
  const svg=`<svg viewBox="0 0 24 24" aria-hidden="true">${c.icon}</svg>`;
  return c.wide
   ?`<a class="card wide" href="${catHref(c)}">${svg}<div class="t"><b>${esc(c.name)}</b><br><small>${esc(c.desc)}</small></div><em>このことで相談する</em></a>`
   :`<a class="card" href="${catHref(c)}">${svg}<b>${esc(c.name)}</b><small>${esc(c.desc)}</small><em>このことで相談する</em></a>`;
}
function catCards(){
  const by=g=>ACTIVE.filter(c=>c.group===g).map(cardHtml).join("");
  const grp=(g,t)=>by(g)?`<h3 class="gh">${esc(t)}</h3><div class="grid">${by(g)}</div>`:"";
  const h=grp("life",GROUPS.life)+grp("vehicle",GROUPS.vehicle)+(by("other")?`<div class="grid" style="margin-top:12px">${by("other")}</div>`:"");
  document.querySelectorAll(".cats").forEach(e=>e.innerHTML=h);
}
function otherCats(curId){
  const chips=ACTIVE.filter(c=>c.id!==curId).map(c=>
    `<a class="chip" href="${catHref(c)}"><svg viewBox="0 0 24 24" aria-hidden="true">${c.icon}</svg><span>${esc(c.name)}</span></a>`).join("");
  return `<h2>別のカテゴリー</h2><div class="chips">${chips}</div>`;
}

/* サービスの説明（無料・直接契約・紹介料・行政ではない旨） */
function noticeHtml(){
  return `<h2>${esc(SERVICE_NOTICE.title)}</h2><p>${esc(SERVICE_NOTICE.lead)}</p>
   <ul>${SERVICE_NOTICE.points.concat([SERVICE_NOTICE.gov]).map(p=>`<li>${esc(p)}</li>`).join("")}</ul>`;
}

/* 受付時間・対応地域などの案内（設定から作られます） */
function infoHtml(){
  const d=(t,v,note)=>has(v)?`<div><dt>${t}</dt><dd class="plain">${esc(v)}${has(note)?`<small>${esc(note)}</small>`:""}</dd></div>`:"";
  return `<h2>受付時間・対応について</h2>
   <dl class="info">
    ${d("対応地域",SERVICE_INFO.area,SERVICE_INFO.areaNote)}
    ${d("お問い合わせ受付時間",HOURS,LINE_RECEPTION.hoursNote)}
    ${d("業者の対応時間",SERVICE_INFO.providerHours)}
    ${d("緊急対応",SERVICE_INFO.emergency)}
    ${d("事前予約",SERVICE_INFO.reserve,SERVICE_INFO.reserveNote)}
   </dl>
   ${has(SERVICE_INFO.caution)?`<p class="note2">${esc(SERVICE_INFO.caution)}</p>`:""}`;
}

/* 連絡の目安・緊急対応の注意書き・準備中表示（設定から作られます） */
function dynTop(){
  return `${has(RECEPTION.responseNote)?`<p class="resp">${esc(RECEPTION.responseNote)}</p>`:""}
    ${EMERGENCY?`<p class="notice">${esc(EMERGENCY)}</p>`:""}
    ${LINE_READY?"":`<p class="prep">LINE相談窓口は現在準備中です</p>`}`;
}
const feeHtml=()=>has(RECEPTION.feeNote)?`<p class="feenote">${esc(RECEPTION.feeNote)}</p>`:"";

/* 各カテゴリーページの上部にある相談ボタン（全ページ共通の作り） */
function actHtml(cat){
  const items=cat.items||[];
  const opts=items.map(i=>`<button class="opt consult" type="button" data-cat="${esc(cat.id)}" data-item="${esc(i)}"><span>${esc(i)}</span><i>›</i></button>`).join("");
  return `<div class="act">${items.length
    ?`<p class="actt">相談項目を選んでください</p>${opts}<button class="btn consult" type="button" data-cat="${esc(cat.id)}">項目が決まっていない場合はこちら</button>`
    :`<button class="btn consult" type="button" data-cat="${esc(cat.id)}">このことで相談する</button>`}
    <p class="note2">ボタンを押すと、確認画面を経て、LINEが開きます。入力用紙に書き込んで送信してください。</p></div>`;
}

/* トップ内のカテゴリー表示（「その他」用） */
function categoryBody(cat){
  const flow=`<div class="flow"><h2>まずはLINEで、ご相談内容をお送りください。</h2>
      <p>案内所は、ご相談内容を受け付け、相談内容に応じた地域の専門業者をご紹介する窓口です。専門的なご相談は、専門業者が電話で直接うかがいます。</p>
      <ol>
       <li>LINEで相談内容を送る<br><small>（LINEネーム・電話番号・困りごとの内容・地域・写真（任意））</small></li>
       <li>案内所が、内容を専門業者へLINEで転送</li>
       <li>専門業者が、ご同意いただいた電話番号へ直接お電話</li>
      </ol>
      <p class="fine">※電話番号などを専門業者へ共有することへの同意を、LINEに進む前にいただきます。専門業者からの連絡や、問題の解決をお約束するものではありません。</p></div>`;
  return `${flow}<div class="doc">${infoHtml()}</div>${dynTop()}
    <button class="btn consult" type="button" data-cat="${esc(cat.id)}">このことで相談する</button>${feeHtml()}`;
}

/* ===== 情報ページ ===== */
function dateLine(k){return `<p class="small" style="margin-top:28px">制定日：${has(POLICY_DATE[k])?esc(POLICY_DATE[k]):"準備中"}</p>`}
function sections(arr){
  return arr.map(s=>`<h2>${esc(s.h)}</h2>`+s.b.map(x=>Array.isArray(x)?`<ul>${x.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>`:`<p>${esc(x)}</p>`).join("")).join("");
}
function lineRowHtml(){
  return LINE_URL_OK
    ?`公式LINEよりお問い合わせください。<br><a class="lnk" href="${esc(LURL)}" target="_blank" rel="noopener noreferrer">長野市のお困りごと案内所 公式LINE</a>`
    :`公式LINEよりお問い合わせください。<br><span class="pending">公式LINEは現在準備中です</span>`;
}
function aboutHtml(){
  return `<p class="lead">困ったときに、気軽に相談できる場所をつくりたい。</p>
   <dl class="info">
    <div><dt>サービス名</dt><dd>長野市のお困りごと案内所</dd></div>
    <div><dt>サービス内容</dt><dd class="plain">${esc(SERVICE_INFO.area)}にお住まいの方から、暮らしや乗り物のお困りごとをLINEで受け付け、相談内容に応じた専門業者をご紹介する民間の紹介サービスです。</dd></div>
    <div><dt>運営について</dt><dd class="plain">当サービスは、相談内容に応じた専門業者をご紹介する窓口です。修理・施工などの作業を直接行うものではありません。</dd></div>
    <div><dt>お問い合わせ方法</dt><dd class="plain">${lineRowHtml()}</dd></div>
   </dl>
   <div class="noticebox">${noticeHtml()}</div>
   ${infoHtml()}`;
}
const PAGES={
 about:{title:"運営者情報",html:aboutHtml},
 privacy:{title:"プライバシーポリシー",html:()=>sections(PRIVACY)+dateLine("privacy")},
 terms:{title:"利用規約",html:()=>sections(TERMS)+dateLine("terms")},
 contact:{title:"お問い合わせ",html:()=>
  `<h2>お問い合わせについて</h2>
   <p>本サイトについてのご意見・ご質問、個人情報の取扱いに関するご相談やご請求、事業者としての掲載のご相談などは、公式LINEで受け付けています。</p>
   <h2>連絡先</h2>
   <dl class="info"><div><dt>公式LINE</dt><dd class="plain">${lineRowHtml()}</dd></div></dl>
   <h2>お問い合わせ内容</h2>
   <ul><li>本サイトの内容について</li><li>個人情報の開示・訂正・利用停止等のご請求、苦情</li><li>事業者としての掲載について</li><li>その他のご意見・ご要望</li></ul>
   <p>暮らしや乗り物の困りごとのご相談は、トップページで困りごとを選び、「このことで相談する」からお進みください。</p>`}
};

/* ===== 相談の案内画面（全ページ共通：JSで作ります） ===== */
document.body.insertAdjacentHTML("beforeend",`
<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-t">
<div class="bg" data-close></div>
<div class="panel">
<h2 id="sh-t">LINEで相談する</h2>
<p class="lead2" id="sh-l"></p>
<dl id="sh-dl"></dl>
<div class="info2">
<b>LINEでお送りいただく内容（入力用紙）</b>
<p class="formnote" id="sh-fn"></p>
<pre class="formbox" id="sh-form"></pre>
</div>
<p class="note" id="sh-n"></p>
<p class="note em" id="sh-e"></p>
<div class="consent">
<b>電話番号などの共有について（ご確認ください）</b>
<p>送信いただいた相談内容・LINEネーム・お名前・電話番号・地域・写真などを、ご相談内容に対応できる地域の専門業者へLINEで転送します。</p>
<p>専門業者は、内容を確認したうえで、お預かりした電話番号へ直接お電話します。専門的なご相談、現地確認や日程調整は、専門業者と電話で直接行います。</p>
<p>案内所は、専門的な判断や修理方法のご案内、電話での相談対応は行いません。専門業者からの連絡や、問題の解決をお約束するものではありません。</p>
<p><a class="lnk" href="${ROOT}#privacy" target="_blank" rel="noopener">プライバシーポリシーを確認する</a></p>
<label class="ok"><input type="checkbox" id="sh-ok"><span id="sh-ok-t"></span></label>
</div>
<p class="hint" id="sh-hint"></p>
<a class="btn" id="sh-call"></a>
<button class="btn-out" id="sh-copy" type="button" disabled>入力用紙をコピーする</button>
<p class="hint" id="sh-copied"></p>
<button class="btn-out" id="sh-back" type="button" data-close>戻る</button>
</div></div>`);

let sheetOpen=false,curCat=null,curItem="";
function hideSheet(){$("#sheet").classList.remove("open");document.body.style.overflow=""}
function setCall(href,text,cls,blank){
  const c=$("#sh-call");
  c.className="btn"+(cls?" "+cls:"");
  c.textContent=text;
  if(href){c.setAttribute("href",href)}else{c.removeAttribute("href")}
  if(href&&blank){c.setAttribute("target","_blank");c.setAttribute("rel","noopener noreferrer")}
  else{c.removeAttribute("target");c.removeAttribute("rel")}
}
/* LINEボタンとコピーボタン：同意にチェックが入るまで押せない */
function updateCall(){
  if(!curCat)return;
  const ok=$("#sh-ok").checked;
  $("#sh-copy").disabled=!ok;
  if(!LINE_READY){setCall("","LINE相談窓口は現在準備中です","off",false);$("#sh-hint").textContent="";return}
  if(!ok){setCall("","LINEで相談する","off",false);$("#sh-hint").textContent="同意にチェックを入れると、ボタンが押せます。";return}
  $("#sh-hint").textContent="";
  setCall(lineLink(curCat,curItem),"LINEで相談する","line",true);
}
async function copyText(t){
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(t);return true}}catch(e){}
  try{
    const ta=document.createElement("textarea");
    ta.value=t;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.opacity="0";
    document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,t.length);
    const ok=document.execCommand("copy");document.body.removeChild(ta);return ok;
  }catch(e){return false}
}
function openSheet(cat,item){
  curCat=cat;
  curItem=(item&&cat.items&&cat.items.indexOf(item)>=0)?item:"";   /* 登録済みの相談項目だけ使います */
  const subject=subjectOf(cat,curItem);
  const row=(t,v)=>`<dt>${t}</dt><dd>${v}</dd>`;
  let dl=row("相談先","長野市のお困りごと案内所（LINE）")+row("相談内容",esc(subject));
  if(has(HOURS))dl+=row("お問い合わせ受付時間",esc(HOURS));
  const notes=[];
  $("#sh-ok").checked=false;
  $("#sh-hint").textContent="";
  $("#sh-copied").textContent="";
  $("#sh-l").textContent=LINE_RECEPTION.lead;
  $("#sh-ok-t").textContent=CONSENT_LABEL;
  $("#sh-form").textContent=messageText(cat,curItem);
  $("#sh-fn").textContent=PREFILL_OK
    ?"LINEを開くと、次の入力用紙が自動で入力されます。各項目の「：」のあとに書き込んで、送信してください。うまく入力されない場合は、下の「入力用紙をコピーする」を使ってください。"
    :"下の「入力用紙をコピーする」を押して、LINEのメッセージ欄に貼り付け、各項目の「：」のあとに書き込んで送信してください。";
  if(has(RECEPTION.responseNote))notes.push(RECEPTION.responseNote);
  if(has(HOURS)&&has(LINE_RECEPTION.hoursNote))notes.push(LINE_RECEPTION.hoursNote);
  if(LINE_READY){
    if(has(RECEPTION.confirmNote))notes.push(RECEPTION.confirmNote);
  }else{
    notes.push("LINE相談窓口は現在準備中です。準備ができるまで、LINEでの相談はできません。");
  }
  updateCall();
  $("#sh-dl").innerHTML=dl;
  $("#sh-n").textContent=notes.join("\n");
  $("#sh-e").textContent=EMERGENCY;
  $("#sh-back").textContent="戻る";
  $(".panel").scrollTop=0;
  $("#sheet").classList.add("open");
  document.body.style.overflow="hidden";
  if(!sheetOpen){sheetOpen=true;history.pushState({sheet:1},"")}
  $("#sh-back").focus();
}
function closeSheet(){
  if(!sheetOpen)return;
  sheetOpen=false;hideSheet();
  if(history.state&&history.state.sheet)history.back();
}
addEventListener("popstate",()=>{if(sheetOpen){sheetOpen=false;hideSheet()}});
$("#sh-ok").addEventListener("change",updateCall);
document.addEventListener("click",e=>{
  if(e.target.closest("#sh-copy")){
    if(!curCat||$("#sh-copy").disabled)return;
    copyText(messageText(curCat,curItem)).then(ok=>{
      $("#sh-copied").textContent=ok
        ?"コピーしました。LINEのメッセージ欄に貼り付けて、各項目を書き込んでください。"
        :"コピーできませんでした。上の入力用紙を長押しして、コピーしてください。";
    });
    return;
  }
  const b=e.target.closest("#consult,.consult");   /* #consult は以前のページ用 */
  if(b){
    const cat=CATEGORIES.find(c=>c.id===b.dataset.cat);
    if(cat&&cat.active!==false)openSheet(cat,b.dataset.item||"");
    return;
  }
  if(e.target.closest("#sheet [data-close]"))closeSheet();
});
addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet()});

/* ===== カテゴリー別ページ（/water/ など） ===== */
const CP=document.querySelector("[data-catpage]");
if(CP){
  const cat0=CATEGORIES.find(c=>c.id===CP.dataset.catpage);
  if(cat0&&cat0.active===false){
    /* 紹介できる業者がいないカテゴリー：「準備中」の表示にして、検索結果には出さないようにします */
    CP.querySelector(".doc").innerHTML=`<a class="back" href="${ROOT}#choose">← 困りごとを選びなおす</a><h1>${esc(cat0.name)}</h1><p class="lead">このカテゴリーのご相談は、現在準備中です。</p><p>ほかの困りごとは、トップページからお選びください。</p>`;
    const mr=document.createElement("meta");mr.name="robots";mr.content="noindex";document.head.appendChild(mr);
  }else{
    const dyn=$("#dyn-top");
    dyn.innerHTML=dynTop();
    $("#dyn-fee").innerHTML=feeHtml();
    /* 相談ボタン（相談項目つき）を、説明の手前（ページ上部）にも置きます */
    const first=CP.querySelector(".doc h2");
    if(cat0&&first)first.insertAdjacentHTML("beforebegin",actHtml(cat0));
    /* 「受付時間・対応について」を、下の相談ボタンの手前に入れます */
    const h=dyn.previousElementSibling;
    if(h)h.insertAdjacentHTML("beforebegin",infoHtml());
    /* 「ほかの困りごと」を、最新のカテゴリー一覧に合わせます */
    const chips=CP.querySelector(".chips");
    if(chips)chips.innerHTML=ACTIVE.filter(c=>c.id!==CP.dataset.catpage)
      .map(c=>`<a class="chip" href="${catHref(c)}"><span>${esc(c.name)}</span></a>`).join("");
  }
}

/* ===== トップページ：表示の切り替え ===== */
function show(name){
  $("#lp").style.display=name==="lp"?"":"none";
  $("#view").style.display=name==="view"?"block":"none";
  $("#page").style.display=name==="page"?"block":"none";
}
function route(){
  if(sheetOpen){sheetOpen=false;hideSheet()}
  const pm=location.hash.match(/^#(about|privacy|terms|contact)$/);
  if(pm){
    const pg=PAGES[pm[1]];
    show("page");
    $("#pt").textContent=pg.title;
    $("#pb").innerHTML=pg.html();
    document.title=pg.title+"｜長野市のお困りごと案内所";
    scrollTo(0,0);
    return;
  }
  document.title=DEF_TITLE;
  const m=location.hash.match(/^#cat=(\w+)/);
  const c0=m&&CATEGORIES.find(c=>c.id===m[1]);
  const cat=(c0&&c0.active!==false)?c0:null;
  /* 古いリンク（#cat=water など）は、新しい独立ページへ移動します */
  if(cat&&cat.url.charAt(0)!=="#"){location.replace(cat.url);return}
  if(!cat){
    show("lp");
    const id=decodeURIComponent(location.hash.slice(1));
    const el=id&&document.getElementById(id);
    if(el)requestAnimationFrame(()=>el.scrollIntoView());
    return;
  }
  show("view");
  $("#vt").textContent=cat.name+"について相談する";
  $("#vd").textContent=cat.desc;
  $("#vbody").innerHTML=categoryBody(cat);
  $("#others").innerHTML=otherCats(cat.id);
  scrollTo(0,0);
}
if($("#lp")){
  catCards();
  const nb=$("#notice");
  if(nb)nb.innerHTML=noticeHtml();
  const ib=$("#infoblock");
  if(ib)ib.innerHTML=infoHtml();
  addEventListener("hashchange",route);
  route();
}
