/* ============================================================
   長野市のお困りごと案内所：共通の設定と動き（全ページで読み込まれます）
   設定を変えるときは、このファイルの上の方だけを編集してください。
   ============================================================ */
const ROOT=window.ROOT||"";   /* トップ="" ／ カテゴリー別ページ="../"（各ページ側で指定） */

/* ★★ 相談の受け付け方法（"line" か "phone"） */
const RECEPTION_MODE="line";

/* ★★ 同意の文言（案内画面のチェックボックス）
   ※ LINE_RECEPTION.prefill にも同じ趣旨の文があります。変えるときは両方を合わせてください。 */
const CONSENT_LABEL="送信する相談内容・お名前・電話番号などを、対応可能な専門業者へ共有し、専門業者から直接お電話がかかることに同意します。";

/* ★★ LINE受付の設定
   ・url：LINE公式アカウントのURL（lin.ee / line.me / page.line.me で始まるものだけ有効）
   ・basicId：ベーシックID。入れると相談メッセージが入力された状態でLINEが開きます
   ・hours：受付時間（空欄なら表示しません） */
const LINE_RECEPTION={
  url:"https://lin.ee/tTiPLc4",
  basicId:"@164wtqps",
  hours:"",
  hoursNote:"メッセージはいつでも送信できます。確認・返信は受付時間内に行います。",
  lead:"長野市のお困りごと案内所のLINEで、ご相談内容を受け付けます。\n内容は、地域の専門業者へおつなぎします。",
  categoryHint:"LINEで相談する際は、選んだカテゴリーもお知らせください。",
  prefill:"【{category}】について相談したいです。\n相談内容・お名前・電話番号などを、対応可能な専門業者へ共有し、専門業者から直接お電話がかかることに同意します。"
};

/* ------------------------------------------------------------
   ★ LINE公式アカウント側「あいさつメッセージ」の例（画面には表示されません）
     ご相談ありがとうございます。長野市のお困りごと案内所です。
     当窓口は、ご相談内容を受け付け、地域の専門業者へおつなぎする窓口です。
     専門的なご相談は、専門業者が電話で直接うかがいます。
     次の情報を、順番にお送りください。
     ①お名前（LINEの表示名と違う場合は本名）　②電話番号
     ③困りごとの内容　④困りごとが起きている地域　⑤状況が分かる写真（任意）
     お送りいただいた内容・お名前・電話番号などは、対応できる専門業者へ共有し、
     専門業者から直接お電話します。同意いただける場合は「同意します」とお送りください。
     ※同意をいただくまでは、専門業者へ情報を転送しません。
   ------------------------------------------------------------ */

/* 電話受付の設定（RECEPTION_MODE を "phone" にした時だけ使われます） */
const PHONE_RECEPTION={phone:"",hours:""};

/* ★ 共通の文言 */
const RECEPTION={
  responseNote:"緊急性のないご相談は、原則7日以内を目安にご連絡します。",
  showEmergencyNotice:true,
  emergencyNotice:"※当サービスは緊急対応窓口ではありません。緊急性の高いトラブルについては、状況に応じて適切な緊急対応先へご相談ください。",
  feeNote:"相談内容に応じて専門業者へつなぎ、実際の依頼・紹介につながった場合、当サービスが紹介料等を受け取る場合があります。",
  confirmNote:"相談したからといって、必ず依頼する必要はありません。"
};

/* ★ 運営者の表示事項（空欄なら「現在準備中です」と表示。実在しない情報は入れないでください） */
const OPERATOR={
  name:"",     // 運営者名
  address:"",  // 所在地
  phone:"",    // 電話番号
  email:""     // メールアドレス
};

/* ★ カテゴリー（url は各ページの場所。「その他」はトップ内の表示です） */
const CATEGORIES=[
 {id:"water",name:"水道・トイレ",desc:"水漏れ・詰まり・蛇口など",url:"water/",icon:'<path d="M12 3C9 8 6 11 6 15a6 6 0 0 0 12 0c0-4-3-7-6-12z"/>'},
 {id:"electric",name:"電気・エアコン",desc:"電気・エアコン・設備の困りごと",url:"electric/",icon:'<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>'},
 {id:"roof",name:"屋根・雨漏り",desc:"雨漏り・屋根・外まわりなど",url:"roof/",icon:'<path d="M3 11 12 3l9 8M5 10v10h14V10M10 20v-6h4v6"/>'},
 {id:"garden",name:"庭・草刈り",desc:"草刈り・剪定・庭木など",url:"garden/",icon:'<path d="M12 21v-8M12 13c-5 0-7-4-7-8 5 0 7 3 7 8zM12 15c4 0 6-3 6-6-4 0-6 2-6 6z"/>'},
 {id:"clean",name:"不用品・片付け",desc:"不用品・片付け・暮らしの整理など",url:"clean/",icon:'<path d="M3 8l9-4 9 4-9 4zM3 8v9l9 4 9-4V8M12 12v9"/>'},
 {id:"other",name:"その他",desc:"どこに頼めばいいかわからない場合はこちら",url:"#cat=other",icon:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17v.1"/>',wide:true}
];

/* ★ 専門業者データ【内部用】一般の画面には一切表示されません
   {id:"p001",name:"〇〇設備",category:"water",area:"長野市〇〇周辺",
    services:["水漏れ"],hours:"9:00〜18:00",phone:"026-000-0000",image:"",available:true}, */
const PROVIDERS=[
];

/* ★ 相談案件の管理項目メモ【内部用・画面には表示しません】 */
const CASE_FIELDS=["id","receivedAt","lineName","realName","phone","area","category","detail","hasPhoto","urgency","consent","consentAt","consentMethod","forwardedTo","forwardStatus","providerContact","result"];

/* ★ 情報ページの文章（プライバシーポリシー・利用規約） */
const POLICY_DATE={privacy:"",terms:""};

const PRIVACY=[
 {h:"はじめに",b:["長野市のお困りごと案内所（以下「本サイト」）は、利用者のプライバシーを大切にします。このページでは、本サイトが実際に行っている情報の取り扱いについてご説明します。"]},
 {h:"本サイトのウェブページで取得する情報",b:["現在、本サイトのウェブページには、お問い合わせフォーム、会員登録、ログイン、アクセス解析ツール、広告、クリック計測を設置していません。そのため、ウェブページの閲覧だけで、氏名・電話番号・メールアドレスなどの個人情報を取得・保存することはありません。","また、本サイトは Cookie を独自に設定していません。"]},
 {h:"LINEで受け取る情報",b:["「このことで相談する」からLINE公式アカウントでご相談いただいた場合、ご相談の受け付けのために、LINEのメッセージを通じて次の情報を受け取ります。",["LINEの表示名（LINEネーム。LINE上で運営者側に表示される名前）","お名前（LINEの表示名と本名が異なる場合などに、確認することがあります）","電話番号","困りごとの内容","困りごとが起きている地域","状況が分かる写真（任意）","そのほか、相談者様が送信してくださった情報"],"ご相談に必要な範囲でお送りください。"]},
 {h:"利用目的",b:["受け取った情報は、次の目的に限って利用します。",["ご相談内容の受け付け・確認","ご相談内容に対応できる地域の専門業者への提供（おつなぎ）","受け付けに必要な、相談者様への確認・ご連絡"]]},
 {h:"専門業者への個人情報の提供について",b:["当案内所では、お客様からいただいたご相談に対応するため、LINEの表示名、電話番号、ご相談内容、発生地域、送信いただいた写真などの情報を、相談内容に応じた専門業者へ提供する場合があります。LINEの表示名と本名が異なる場合などは、お名前をお伺いして、あわせて提供することがあります。","専門業者は、提供された情報をもとに相談内容を確認し、お客様へ直接電話で連絡することがあります。専門的なご相談や、必要に応じた現地確認・日程調整は、専門業者が電話で直接行います。","個人情報を専門業者へ提供する際は、事前にお客様の同意を取得し、相談への対応に必要な範囲で情報を共有します。同意をいただく前に、専門業者へ情報を提供することはありません。","提供先は、ご相談内容に対応できる専門業者に限ります。","情報の提供を受けた専門業者は、それぞれの方針に基づいて、受け取った情報を取り扱います。"]},
 {h:"同意の確認方法",b:["本サイトの案内画面で、情報の提供についての説明をご覧いただき、同意のチェックをいただいたうえで、LINEへ進んでいただきます。","同意の内容は、LINEのトーク履歴の上でも確認します。"]},
 {h:"メッセージ・写真の取り扱い",b:["LINEで受け取ったメッセージや写真は、ご相談の対応に必要な範囲で、運営者が確認・管理します。ご相談への対応以外の目的には使用しません。"]},
 {h:"LINEの利用について",b:["ご相談は、LINEヤフー株式会社が提供するLINE公式アカウントを通じて行われます。LINE上での情報の取り扱いは、LINEのプライバシーポリシー等に従います。"]},
 {h:"サイトの配信について",b:["本サイトは GitHub Pages を利用して配信しています。配信にあたり、サービス提供元がアクセス記録（IPアドレス等）を取得する場合があります。詳しくは提供元の方針をご確認ください。"]},
 {h:"第三者への提供",b:["ご本人の同意を得た専門業者への情報の提供、および法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。"]},
 {h:"今後の変更",b:["今後、アクセス解析やお問い合わせフォームなどを導入する場合は、本ページを更新します。"]}
];

const TERMS=[
 {h:"このサイトについて",b:["本サイトは、長野市での暮らしの困りごとについて、ご相談内容を受け付け、地域の専門業者へおつなぎする窓口として運営するサイトです。","案内所は、専門業者ではありません。専門的な判断、修理方法の提案、電話による相談対応は行いません。"]},
 {h:"利用について",b:["本サイトをご利用になる方は、この利用規約に同意したものとみなします。ご自身の判断と責任でご利用ください。"]},
 {h:"相談の流れについて",b:["LINEでご相談内容を受け付け、必要な情報を、ご相談内容に対応できる地域の専門業者へLINEで転送します。電話番号などの共有については、ご相談の前にご本人の同意をいただきます。","専門業者は、転送された内容を確認し、ご同意いただいた電話番号へ直接お電話して、専門的なご相談への対応や、必要に応じた現地確認・日程調整を行います。相談者様と専門業者は、電話で直接やり取りします。","緊急性のないご相談は、原則7日以内を目安にご連絡します。これはあくまで目安です。ご相談の内容や、専門業者との調整状況などによって、時間がかかる場合があります。期間内の対応や解決をお約束するものではありません。","専門業者から必ず連絡が来ること、専門業者を必ずご案内できること、問題が解決することをお約束するものではありません。また、本サイトは緊急対応窓口ではなく、緊急対応を保証するものではありません。"]},
 {h:"専門業者について",b:["相談先となる事業者は、それぞれが独立して事業を行っています。本サイトは、事業者の順位付けや比較を目的としていません。","本サイトは、掲載・紹介した事業者から紹介料等を受け取る場合があります。"]},
 {h:"料金・契約について",b:["作業内容、料金、契約、支払いなどは、相談者様と専門業者との間で、直接確認のうえ決めるものです。本サイトは、その契約の当事者ではありません。","相談したからといって、依頼する義務は生じません。"]},
 {h:"免責事項",b:["掲載情報は正確になるよう努めますが、その完全性や最新性を保証するものではありません。","事業者とのやり取りや作業に関して生じたトラブルや損害について、本サイトは、法令で認められる範囲で責任を負いません。"]},
 {h:"サービス内容の変更・停止",b:["本サイトの内容は、事前の予告なく変更・停止することがあります。"]},
 {h:"禁止事項",b:["次の行為はおやめください。",["法令や公序良俗に反する行為","本サイトの運営を妨げる行為","事業者や第三者への迷惑行為、誹謗中傷","本サイトの内容の無断転載・無断販売","その他、運営者が不適切と判断する行為"]]},
 {h:"著作権",b:["本サイトの文章・デザインなどの著作権は、運営者に帰属します。法令で認められる範囲を超えて、無断で利用することはできません。"]},
 {h:"規約の変更",b:["必要に応じて、この規約を変更することがあります。変更後の規約は、本ページに掲載した時点から効力を持ちます。"]},
 {h:"準拠法・管轄",b:["この規約には日本法を適用します。","管轄裁判所については、運営者情報の確定後に定めます。"]}
];
/* ===================================================== */

const $=s=>document.querySelector(s);
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const has=v=>v!==undefined&&v!==null&&String(v).trim()!=="";
const DEF_TITLE=document.title;
const IS_LINE=RECEPTION_MODE!=="phone";

/* ----- LINE：URLが正しい形の時だけ有効 ----- */
const LURL=has(LINE_RECEPTION.url)?String(LINE_RECEPTION.url).trim():"";
const LINE_URL_OK=/^https:\/\/(lin\.ee|line\.me|page\.line\.me)\/[^\s"'<>]+$/.test(LURL);
if(LURL&&!LINE_URL_OK&&window.console&&console.warn)console.warn("LINEのURLの形が正しくないため、無効にしました:",LURL);
const BID=has(LINE_RECEPTION.basicId)?String(LINE_RECEPTION.basicId).trim():"";
const PREFILL_OK=/^@[A-Za-z0-9._-]{2,}$/.test(BID)&&has(LINE_RECEPTION.prefill);
const LINE_READY=LINE_URL_OK||PREFILL_OK;
function lineLink(cat){
  if(PREFILL_OK)return "https://line.me/R/oaMessage/"+BID+"/?"+encodeURIComponent(String(LINE_RECEPTION.prefill).replace("{category}",cat.name));
  return LINE_URL_OK?LURL:"";
}

/* ----- 電話（モードが "phone" の時だけ使用） ----- */
const RPH=has(PHONE_RECEPTION.phone)?String(PHONE_RECEPTION.phone).trim():"";
const RTEL=RPH.replace(/[^0-9+]/g,"");
const PH_OK=/^\+?[0-9]{6,}$/.test(RTEL);

const READY=IS_LINE?LINE_READY:PH_OK;
const HOURS=IS_LINE?LINE_RECEPTION.hours:PHONE_RECEPTION.hours;
const EMERGENCY=RECEPTION.showEmergencyNotice&&has(RECEPTION.emergencyNotice)?RECEPTION.emergencyNotice:"";

/* 固定ヘッダーの実際の高さを取得してCSSに反映 */
const hd=document.querySelector("header");
const setH=()=>document.documentElement.style.setProperty("--header-h",hd.offsetHeight+"px");
setH();addEventListener("resize",setH);
if(window.ResizeObserver)new ResizeObserver(setH).observe(hd);

/* 再読み込み時に、閉じた案内画面の履歴が残って「二重に戻る」ことを防ぐ */
if(history.state&&history.state.sheet)history.replaceState(null,"");

/* ----- カテゴリーのカード・リンク ----- */
const catHref=c=>ROOT+c.url;
function catCards(){
  const h=CATEGORIES.map(c=>{
    const svg=`<svg viewBox="0 0 24 24" aria-hidden="true">${c.icon}</svg>`;
    return c.wide
     ?`<a class="card wide" href="${catHref(c)}">${svg}<div class="t"><b>${esc(c.name)}</b><br><small>${esc(c.desc)}</small></div><em>このことで相談する</em></a>`
     :`<a class="card" href="${catHref(c)}">${svg}<b>${esc(c.name)}</b><small>${esc(c.desc)}</small><em>このことで相談する</em></a>`;
  }).join("");
  document.querySelectorAll(".cats").forEach(e=>e.innerHTML=h);
}
function otherCats(curId){
  const chips=CATEGORIES.filter(c=>c.id!==curId).map(c=>
    `<a class="chip" href="${catHref(c)}"><svg viewBox="0 0 24 24" aria-hidden="true">${c.icon}</svg><span>${esc(c.name)}</span></a>`).join("");
  return `<h2>別のカテゴリー</h2><div class="chips">${chips}</div>`;
}

/* 連絡の目安・受付時間・緊急対応の注意書き・準備中表示（設定から作られます） */
function dynTop(){
  const prep=IS_LINE?"LINE相談窓口は現在準備中です":"総合受付の電話番号は現在準備中です";
  return `${has(RECEPTION.responseNote)?`<p class="resp">${esc(RECEPTION.responseNote)}</p>`:""}
    ${has(HOURS)?`<p class="hours">受付時間：${esc(HOURS)}</p>${IS_LINE&&has(LINE_RECEPTION.hoursNote)?`<p class="hoursnote">${esc(LINE_RECEPTION.hoursNote)}</p>`:""}`:""}
    ${EMERGENCY?`<p class="notice">${esc(EMERGENCY)}</p>`:""}
    ${READY?"":`<p class="prep">${prep}</p>`}`;
}
const feeHtml=()=>has(RECEPTION.feeNote)?`<p class="feenote">${esc(RECEPTION.feeNote)}</p>`:"";

/* トップ内のカテゴリー表示（「その他」用） */
function categoryBody(cat){
  const flow=IS_LINE
   ?`<div class="flow"><h2>まずはLINEで、ご相談内容をお送りください。</h2>
      <p>案内所は、ご相談内容を受け付け、地域の専門業者へおつなぎする窓口です。専門的なご相談は、専門業者が電話で直接うかがいます。</p>
      <ol>
       <li>LINEで相談内容を送る<br><small>（LINEネーム・電話番号・困りごとの内容・地域・写真（任意））</small></li>
       <li>案内所が、内容を専門業者へLINEで転送</li>
       <li>専門業者が、ご同意いただいた電話番号へ直接お電話</li>
      </ol>
      <p class="fine">※電話番号などを専門業者へ共有することへの同意を、LINEに進む前にいただきます。専門業者からの連絡や、問題の解決をお約束するものではありません。</p></div>`
   :`<div class="flow"><h2>まずは総合受付で、お困りごとの状況をお聞きします。</h2>
      <p>どんなことで困っているか、どこで起きているか、いつから起きているかなどを確認したうえで、必要に応じて地域の専門業者へ相談します。</p></div>`;
  return `${flow}${dynTop()}
    <button class="btn" type="button" id="consult" data-cat="${esc(cat.id)}">このことで相談する</button>${feeHtml()}`;
}

/* ===== 情報ページ ===== */
const PENDING='<span class="pending">現在準備中です</span>';
const okMail=s=>/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(s);
const okPhone=s=>/^\+?[0-9]{6,}$/.test(String(s).replace(/[^0-9+]/g,""));
function opVal(k){
  const v=OPERATOR[k];
  if(!has(v))return PENDING;
  if(k==="email"&&okMail(v))return `<a class="lnk" href="mailto:${esc(v.trim())}">${esc(v.trim())}</a>`;
  if(k==="phone"&&okPhone(v))return `<a class="lnk" href="tel:${esc(String(v).replace(/[^0-9+]/g,""))}">${esc(v)}</a>`;
  return esc(v);
}
const dateLine=k=>`<p class="small" style="margin-top:28px">制定日：${has(POLICY_DATE[k])?esc(POLICY_DATE[k]):"準備中"}</p>`;
function sections(arr){
  return arr.map(s=>`<h2>${esc(s.h)}</h2>`+s.b.map(x=>Array.isArray(x)?`<ul>${x.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>`:`<p>${esc(x)}</p>`).join("")).join("");
}
function aboutHtml(){
  const lineRow=LINE_URL_OK
    ?`公式LINEよりお問い合わせください。<br><a class="lnk" href="${esc(LURL)}" target="_blank" rel="noopener noreferrer">長野市のお困りごと案内所 公式LINE</a>`
    :`公式LINEよりお問い合わせください。<br><span class="pending">公式LINEは現在準備中です</span>`;
  const anyPending=["name","address","phone","email"].some(k=>!has(OPERATOR[k]));
  return `<p class="lead">困ったときに、気軽に相談できる場所をつくりたい。</p>
   <dl class="info">
    <div><dt>サービス名</dt><dd>長野市のお困りごと案内所</dd></div>
    <div><dt>サービス内容</dt><dd class="plain">長野市周辺にお住まいの方から暮らしのお困りごとをLINEで受け付け、内容に応じた地域の専門業者へおつなぎする取次サービスです。</dd></div>
    <div><dt>運営について</dt><dd class="plain">当サービスは、地域の専門業者への取次を行う窓口です。修理・施工などの専門業務を直接行うものではありません。</dd></div>
    <div><dt>お問い合わせ方法</dt><dd class="plain">${lineRow}</dd></div>
   </dl>
   <h2>運営者の表示事項</h2>
   <dl class="info">
    <div><dt>運営者名</dt><dd>${opVal("name")}</dd></div>
    <div><dt>所在地</dt><dd>${opVal("address")}</dd></div>
    <div><dt>電話番号</dt><dd>${opVal("phone")}</dd></div>
    <div><dt>メールアドレス</dt><dd>${opVal("email")}</dd></div>
   </dl>
   ${anyPending?`<p class="small" style="margin-top:10px">※「現在準備中です」の項目は、確定し次第、こちらに掲載します。</p>`:""}`;
}
const PAGES={
 about:{title:"運営者情報",html:aboutHtml},
 privacy:{title:"プライバシーポリシー",html:()=>sections(PRIVACY)+dateLine("privacy")},
 terms:{title:"利用規約",html:()=>sections(TERMS)+dateLine("terms")},
 contact:{title:"お問い合わせ",html:()=>
  `<h2>お問い合わせについて</h2>
   <p>本サイトについてのご意見・ご質問、事業者としての掲載のご相談などを受け付ける予定です。</p>
   <p>暮らしの困りごとのご相談は、トップページで困りごとを選び、「このことで相談する」からお進みください。</p>
   <h2>連絡先</h2>
   <dl class="info"><div><dt>メールアドレス</dt><dd>${has(OPERATOR.email)?opVal("email"):'<span class="pending">お問い合わせ窓口は準備中です</span>'}</dd></div></dl>
   <h2>お問い合わせ内容</h2>
   <ul><li>本サイトの内容について</li><li>事業者としての掲載について</li><li>その他のご意見・ご要望</li></ul>`}
};

/* ===== 相談の案内画面（全ページ共通：JSで作ります） ===== */
document.body.insertAdjacentHTML("beforeend",`
<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-t">
<div class="bg" data-close></div>
<div class="panel">
<h2 id="sh-t"></h2>
<p class="lead2" id="sh-l"></p>
<dl id="sh-dl"></dl>
<div class="info2" id="sh-info">
<b>LINEでお送りいただく情報</b>
<ul>
<li>LINEネーム（本名と異なる場合は、お名前もお伺いすることがあります）</li>
<li>電話番号</li>
<li>困りごとの内容</li>
<li>困りごとが起きている地域</li>
<li>状況が分かる写真（任意）</li>
</ul>
</div>
<p class="note" id="sh-n"></p>
<p class="note em" id="sh-e"></p>
<div class="consent" id="sh-consent">
<b>電話番号などの共有について（ご確認ください）</b>
<p>送信いただいた相談内容・LINEネーム・お名前・電話番号・地域・写真などを、ご相談内容に対応できる地域の専門業者へLINEで転送します。</p>
<p>専門業者は、内容を確認したうえで、お預かりした電話番号へ直接お電話します。専門的なご相談、現地確認や日程調整は、専門業者と電話で直接行います。</p>
<p>案内所は、専門的な判断や修理方法のご案内、電話での相談対応は行いません。専門業者からの連絡や、問題の解決をお約束するものではありません。</p>
<p><a class="lnk" href="${ROOT}#privacy" target="_blank" rel="noopener">プライバシーポリシーを確認する</a></p>
<label class="ok"><input type="checkbox" id="sh-ok"><span id="sh-ok-t"></span></label>
</div>
<p class="hint" id="sh-hint"></p>
<a class="btn" id="sh-call"></a>
<button class="btn-out" id="sh-back" type="button" data-close>戻る</button>
</div></div>`);

let sheetOpen=false,curCat=null;
function hideSheet(){$("#sheet").classList.remove("open");document.body.style.overflow=""}
function setCall(href,text,cls,blank){
  const c=$("#sh-call");
  c.className="btn"+(cls?" "+cls:"");
  c.textContent=text;
  if(href){c.setAttribute("href",href)}else{c.removeAttribute("href")}
  if(href&&blank){c.setAttribute("target","_blank");c.setAttribute("rel","noopener noreferrer")}
  else{c.removeAttribute("target");c.removeAttribute("rel")}
}
/* LINEボタン：同意にチェックが入るまで押せない */
function updateCall(){
  if(!IS_LINE||!curCat)return;
  const ok=$("#sh-ok").checked;
  if(!LINE_READY){setCall("","LINE相談窓口は現在準備中です","off",false);$("#sh-hint").textContent="";return}
  if(!ok){setCall("","LINEで相談する","off",false);$("#sh-hint").textContent="同意にチェックを入れると、LINEで相談するボタンが押せます。";return}
  $("#sh-hint").textContent="";
  setCall(lineLink(curCat),"LINEで相談する","line",true);
}
function openSheet(cat){
  curCat=cat;
  const row=(t,v,c)=>`<dt>${t}</dt><dd${c?` class="${c}"`:""}>${v}</dd>`;
  let dl,notes=[];
  $("#sh-ok").checked=false;
  $("#sh-info").style.display=IS_LINE?"":"none";
  $("#sh-consent").style.display=IS_LINE?"":"none";
  $("#sh-hint").textContent="";
  if(IS_LINE){
    $("#sh-t").textContent="LINEで相談する";
    $("#sh-l").textContent=LINE_RECEPTION.lead;
    $("#sh-ok-t").textContent=CONSENT_LABEL;
    dl=row("相談先","長野市のお困りごと案内所（LINE）")+row("相談内容",esc(cat.name));
    if(has(LINE_RECEPTION.hours))dl+=row("受付時間",esc(LINE_RECEPTION.hours));
    if(has(RECEPTION.responseNote))notes.push(RECEPTION.responseNote);
    if(has(LINE_RECEPTION.hours)&&has(LINE_RECEPTION.hoursNote))notes.push(LINE_RECEPTION.hoursNote);
    if(LINE_READY){
      notes.push(PREFILL_OK?"「"+cat.name+"」について相談したい、というメッセージが入力された状態でLINEが開きます。内容を確認して送信してください。":LINE_RECEPTION.categoryHint);
      if(has(RECEPTION.confirmNote))notes.push(RECEPTION.confirmNote);
    }else{
      notes.push("LINE相談窓口は現在準備中です。準備ができるまで、LINEでの相談はできません。");
    }
    updateCall();
  }else{
    $("#sh-t").textContent="総合受付へ電話で相談します";
    $("#sh-l").textContent="長野市のお困りごと案内所の総合受付へ電話します。";
    dl=row("相談先","長野市のお困りごと案内所 総合受付")+row("相談内容",esc(cat.name));
    dl+=PH_OK?row("電話番号",esc(RPH),"ph"):row("電話番号",'<span class="pending">現在準備中です</span>');
    if(has(PHONE_RECEPTION.hours))dl+=row("受付時間",esc(PHONE_RECEPTION.hours));
    if(PH_OK){
      if(has(RECEPTION.confirmNote))notes.push(RECEPTION.confirmNote);
      setCall("tel:"+RTEL,"電話をかける","",false);
    }else{
      notes.push("総合受付の電話番号は現在準備中です。準備ができるまで、電話はかけられません。");
      setCall("","電話番号は準備中です","off",false);
    }
  }
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
  const b=e.target.closest("#consult");
  if(b){
    const cat=CATEGORIES.find(c=>c.id===b.dataset.cat);
    if(cat)openSheet(cat);
    return;
  }
  if(e.target.closest("#sheet [data-close]"))closeSheet();
});
addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet()});

/* ===== カテゴリー別ページ（/water/ など）：設定から作る部分を差し込む ===== */
const CP=document.querySelector("[data-catpage]");
if(CP){
  $("#dyn-top").innerHTML=dynTop();
  $("#dyn-fee").innerHTML=feeHtml();
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
  const cat=m&&CATEGORIES.find(c=>c.id===m[1]);
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
  addEventListener("hashchange",route);
  route();
    }
