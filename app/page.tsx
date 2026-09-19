"use client";

import Image from "next/image";
import { useState } from "react";

const albumPages = [
  {
    label: "हाम्रो यात्रा · Our adventures",
    photos: [
      ["/album/our-mountain-day.webp", "जहाँ तिमी, त्यहीँ मेरो घर।", "landscape"],
      ["/album/richa-boardwalk.webp", "My favourite travel companion.", "portrait"],
    ],
  },
  {
    label: "तिमी · Beautiful you",
    photos: [
      ["/album/richa-red-dress.webp", "तिम्रो हाँसो—मेरो मन पर्ने दृश्य।", "portrait"],
      ["/album/richa-sari.webp", "Grace, warmth and a little magic.", "portrait"],
    ],
  },
  {
    label: "हामी · You and me",
    photos: [
      ["/album/our-special-day.webp", "मेरो मन पर्ने ‘हामी’।", "portrait"],
      ["/album/our-selfie.webp", "Together is my favourite place.", "portrait"],
    ],
  },
  {
    label: "सानो संसार · Our little world",
    photos: [
      ["/album/our-tika-memory.webp", "Our traditions. Our story.", "landscape"],
      ["/album/richa-coast.webp", "Every adventure feels like home with you.", "portrait"],
      ["/album/richa-summer.webp", "Sunshine looks beautiful on you.", "portrait"],
    ],
  },
] as const;

const terms = [
  "आजको दिन completely Birthday Girl को हो—no arguments allowed.",
  "तिम्रो smile आजको सबैभन्दा important decoration हो।",
  "केही photos हेर्दा हाँस्न, लजाउन वा ‘Naresh!’ भन्न पाइन्छ।",
  "आजको सबै decisions मा Richa automatically right हुनेछिन्।",
  "And finally—आज र सधैँ, धेरै माया accept गर्नुपर्नेछ।",
] as const;

function Terms({ onAccept }: { onAccept: () => void }) {
  const [notice, setNotice] = useState("");
  return (
    <main className="terms-stage">
      <section className="terms-sheet" aria-labelledby="terms-title">
        <header>
          <small>20 SEPTEMBER 2026 · FOR RICHA</small>
          <h1 id="terms-title">Terms of Being Loved</h1>
          <p>मायाका साना सर्तहरू</p>
        </header>
        <div className="terms-body">
          <span className="seal">♥</span>
          <h2>Dear Richa,</h2>
          <p className="nepali intro">यो सानो surprise खोल्नुअघि, मायाका यी सर्तहरू पढेर स्वीकार गर्नुहोस्।</p>
          <ol>
            {terms.map((line, index) => (
              <li key={line}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{line}</strong></div></li>
            ))}
          </ol>
          <div className="signed"><small>Made only for</small><strong>Richa</strong><span>धेरै मायासहित — Naresh</span></div>
        </div>
        <footer>
          <button className="accept" onClick={onAccept}>स्वीकार छ · I agree <span>♥</span></button>
          <button className="decline" onClick={() => setNotice("यो विकल्प आज उपलब्ध छैन 😌")}>Disagree</button>
          <p aria-live="polite">{notice}</p>
        </footer>
      </section>
    </main>
  );
}

function PhotoAlbum() {
  const [page, setPage] = useState(0);
  const current = albumPages[page];
  return (
    <div className="book-wrap">
      <div className="book">
        <div className="book-head">
          <span>OUR PHOTO ALBUM · ALL 9 PHOTOS</span>
          <b>{page + 1} / {albumPages.length}</b>
        </div>
        <h2>{current.label}</h2>
        <div className={`book-grid count-${current.photos.length}`}>
          {current.photos.map(([src, caption, shape], index) => (
            <figure className={shape} key={src}>
              <div className="photo"><Image src={src} alt={caption} fill priority={page === 0} sizes="(max-width: 700px) 88vw, 38vw" /></div>
              <figcaption><i>0{index + 1}</i>{caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="page-controls">
          <button onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={page === 0}>← अघिल्लो</button>
          <div>{albumPages.map((item, index) => <button key={item.label} className={index === page ? "active" : ""} onClick={() => setPage(index)} aria-label={`Open album page ${index + 1}`} />)}</div>
          <button onClick={() => setPage((value) => Math.min(albumPages.length - 1, value + 1))} disabled={page === albumPages.length - 1}>अर्को →</button>
        </div>
      </div>
    </div>
  );
}

function CakeStep({ onNext }: { onNext: () => void }) {
  const [candles, setCandles] = useState([true, true, true, true]);
  const remaining = candles.filter(Boolean).length;
  return (
    <section className="cake-step">
      <div className="cake-copy">
        <small>एउटा इच्छा माग · MAKE A WISH</small>
        <h2>Four little flames,<br /><em>one beautiful wish.</em></h2>
        <p className="nepali">हरेक बत्तीलाई छोएर निभाऊ। अन्तिम बत्ती निभाउँदा मनमनै एउटा इच्छा माग—म त्यो पूरा होस् भनेर सधैँ कामना गर्नेछु।</p>
        <p>Tap each candle, take a breath, and keep your wish secret. Some things are too precious to say out loud.</p>
      </div>
      <div className="cake-area">
        <div className="candles">
          {candles.map((lit, index) => (
            <button key={index} className={lit ? "lit" : ""} onClick={() => setCandles((current) => current.map((value, i) => i === index ? false : value))} aria-label={`Blow out candle ${index + 1}`}>
              <i /><span />
            </button>
          ))}
        </div>
        <div className="birthday-cake"><div /><div /><strong>R</strong></div>
        <p>{remaining ? `${remaining} बत्ती बाँकी · ${remaining} candle${remaining === 1 ? "" : "s"} left` : "इच्छा सुरक्षित भयो ✦ Wish safely kept"}</p>
        {remaining === 0 ? <button className="cake-next" onClick={onNext}>Continue the surprise →</button> : null}
      </div>
    </section>
  );
}

const whoQuestions = [
  "Who takes more photos before choosing the perfect one?",
  "Who is more likely to say ‘म रिसाएको छैन’ while clearly रिसाएको?",
  "Who turns a simple outing into a full adventure?",
  "Who wins an argument with the strongest facial expression?",
] as const;

const habitCards = [
  ["📸", "photo"], ["🧳", "travel"], ["☕", "tea"],
  ["🧳", "travel"], ["☕", "tea"], ["📸", "photo"],
] as const;

function GameRoom({ onNext }: { onNext: () => void }) {
  const [game, setGame] = useState(0);
  const [roses, setRoses] = useState<boolean[]>(Array(6).fill(false));
  const [answers, setAnswers] = useState<string[]>([]);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const roseTotal = roses.filter(Boolean).length;

  const chooseCard = (index: number) => {
    const [, label] = habitCards[index];
    if (matched.includes(label) || openCards.includes(index)) return;
    if (openCards.length === 0 || openCards.length === 2) {
      setOpenCards([index]);
      return;
    }
    const firstLabel = habitCards[openCards[0]][1];
    if (firstLabel === label) {
      setMatched((current) => [...current, label]);
      setOpenCards([]);
    } else {
      setOpenCards([...openCards, index]);
    }
  };

  return (
    <div className="game-room">
      <div className="game-heading">
        <small>BIRTHDAY GAME ROOM · अब अलिकति खेलौँ</small>
        <h2>{game === 0 ? "Collect six roses" : game === 1 ? "Who does what?" : "Match our little habits"}</h2>
        <p>{game === 0 ? "Richa का लागि सबै roses collect गर—one tap at a time." : game === 1 ? "There is no wrong answer… but there may be consequences 😌" : "Same habit भएका दुई cards भेटाऊ।"}</p>
      </div>

      {game === 0 ? (
        <div className="rose-field">
          {roses.map((caught, index) => <button key={index} className={caught ? "caught" : ""} onClick={() => setRoses((current) => current.map((value, i) => i === index ? true : value))} aria-label={`Collect rose ${index + 1}`}>🌹</button>)}
          <strong>{roseTotal} / 6</strong><span>ROSES FOR RICHA</span>
          {roseTotal === 6 ? <button className="game-continue" onClick={() => setGame(1)}>Next game →</button> : null}
        </div>
      ) : null}

      {game === 1 ? (
        <div className="who-game">
          <h3>{answers.length < whoQuestions.length ? whoQuestions[answers.length] : "Official result: दुवै जना equally guilty—and perfect together. 😂"}</h3>
          {answers.length < whoQuestions.length ? (
            <div>{["Richa", "Naresh", "दुवै · Both"].map((choice) => <button key={choice} onClick={() => setAnswers((current) => [...current, choice])}>{choice}</button>)}</div>
          ) : <button className="game-continue" onClick={() => setGame(2)}>Final game →</button>}
          <p>{answers.map((answer, index) => <span key={index}>{index + 1}. {answer}</span>)}</p>
        </div>
      ) : null}

      {game === 2 ? (
        <div className="match-game">
          <div className="match-grid">
            {habitCards.map(([emoji, label], index) => {
              const shown = openCards.includes(index) || matched.includes(label);
              return <button key={index} className={shown ? "shown" : ""} onClick={() => chooseCard(index)} aria-label={shown ? label : "Hidden habit card"}>{shown ? emoji : "♥"}</button>;
            })}
          </div>
          <p>{matched.length} / 3 habits matched</p>
          {matched.length === 3 ? <button className="game-continue" onClick={onNext}>Games complete · अगाडि जाऔँ →</button> : null}
        </div>
      ) : null}
    </div>
  );
}

function Experience() {
  const [step, setStep] = useState(0);
  const lastStep = 8;
  const next = () => setStep((value) => Math.min(lastStep, value + 1));
  const back = () => setStep((value) => Math.max(0, value - 1));

  return (
    <main className={`experience step-${step}`}>
      <div className="petals" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</div>
      <header className="journey-header">
        <button onClick={back} disabled={step === 0} aria-label="Previous chapter">←</button>
        <div>{Array.from({ length: lastStep + 1 }, (_, index) => <i key={index} className={index === step ? "active" : index < step ? "done" : ""} />)}</div>
        <span>{String(step + 1).padStart(2, "0")} / 09</span>
      </header>

      <section className={`chapter reveal ${step === 0 ? "visible" : ""}`} aria-hidden={step !== 0}>
        <div className="hero-photo"><Image src="/album/richa-red-dress.webp" alt="Richa smiling in a red dress" fill priority sizes="100vw" /></div>
        <div className="hero-wash" />
        <div className="hero-copy">
          <small>20 · 09 · 2026</small>
          <p>मेरो मायालाई</p>
          <h1>Happy Birthday,<br /><em>Richa</em></h1>
          <span>आजको दिन तिम्रो नाममा—र यो सानो surprise पनि।</span>
          <button onClick={next}>Begin your surprise <b>→</b></button>
        </div>
      </section>

      <section className={`chapter dossier reveal ${step === 1 ? "visible" : ""}`} aria-hidden={step !== 1}>
        <div className="dossier-photo"><Image src="/album/richa-boardwalk.webp" alt="Richa smiling on a boardwalk" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
        <div className="dossier-copy">
          <small>CHAPTER ONE · तिम्रो बारेमा</small>
          <h2>A tiny dossier<br />on <em>my favourite person.</em></h2>
          <p className="nepali">आधिकारिक रूपमा Naresh द्वारा तयार गरिएको—किनकि तिम्रो बारेमा लेख्न अरू कसलाई यति धेरै थाहा र माया छ र?</p>
          <div className="facts">
            <article><span>Official title</span><strong>मेरो खुसीको कारण</strong><p>the reason ordinary days feel special</p></article>
            <article><span>Special talent</span><strong>घरलाई घर बनाउने</strong><p>making every place feel warm</p></article>
            <article><span>Current status</span><strong>असीमित माया पाइरहेकी</strong><p>loved beyond any reasonable limit</p></article>
          </div>
          <blockquote>“The world feels lighter, warmer, and much more beautiful with you in it.”</blockquote>
          <button onClick={next}>Show me the receipts <b>→</b></button>
        </div>
      </section>

      <section className={`chapter letter reveal ${step === 6 ? "visible" : ""}`} aria-hidden={step !== 6}>
        <div className="letter-photo"><Image src="/album/our-selfie.webp" alt="Richa and Naresh together" fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
        <article>
          <small>एउटा सानो चिठी · A LETTER FOR YOU</small>
          <h2>प्रिय रिचा,<br /><em>जन्मदिनको धेरै धेरै शुभकामना।</em></h2>
          <p className="nepali">तिमीलाई Happy Birthday भन्न एउटा साधारण message मात्रै enough लागेन, त्यसैले तिम्रो लागि यो सानो संसार बनाएँ। तिमीसँग बिताएका हाँसो, यात्रा र घरका normal moments—यी सबै मेरो life का सबैभन्दा precious memories हुन्।</p>
          <p className="nepali">तिमी मेरो जीवनमा आएपछि “home” एउटा ठाउँ मात्र रहेन; तिमी जहाँ छौ, त्यहीँ मेरो घर भयो। Thank you for being the warmth in our home, कठिन दिनको calm, र कुनै plan नभएको साधारण दिनलाई पनि यादगार बनाउने मान्छे।</p>
          <p className="nepali">I love the life हामीले सँगै बनाइरहेका छौँ—not because every moment is perfect, but because it is ours. नयाँ ठाउँ, change, silly disagreement, quiet evening र बाँकी रहेका हरेक dream मा म फेरि पनि तिमीलाई नै choose गर्न चाहन्छु।</p>
          <p className="nepali">आज तिमीले आफूलाई मेरो आँखाबाट हेर्न सक—kind, brave, beautiful, wonderfully funny, र असीमित माया पाउन योग्य। तिमीलाई पाएकोमा I am grateful every single day.</p>
          <strong>सधैँ तिम्रो, <i>Naresh</i></strong>
          <button onClick={next}>Read my wish for you <b>→</b></button>
        </article>
      </section>

      <section className={`chapter album-chapter reveal ${step === 2 ? "visible" : ""}`} aria-hidden={step !== 2}>
        <PhotoAlbum />
        <button className="chapter-next" onClick={next}>There is more <b>→</b></button>
      </section>

      <section className={`chapter cake-chapter reveal ${step === 3 ? "visible" : ""}`} aria-hidden={step !== 3}>
        <CakeStep onNext={next} />
      </section>

      <section className={`chapter games-chapter reveal ${step === 4 ? "visible" : ""}`} aria-hidden={step !== 4}>
        <GameRoom onNext={next} />
      </section>

      <section className={`chapter reasons reveal ${step === 5 ? "visible" : ""}`} aria-hidden={step !== 5}>
        <div className="reasons-title"><small>A FEW OF A MILLION REASONS</small><h2>म तिमीलाई किन<br /><em>यति धेरै माया गर्छु</em></h2></div>
        <div className="reason-cards">
          <article><b>01</b><h3>तिम्रो मन</h3><p>सानो कुरामा पनि देखिने तिम्रो माया र care गर्ने बानी।</p></article>
          <article><b>02</b><h3>तिम्रो हाँसो</h3><p>The smile that can rescue even the most ordinary day.</p></article>
          <article><b>03</b><h3>तिम्रो शक्ति</h3><p>शान्त, बलियो र सुन्दर—हरेक कठिनाइमा पनि अगाडि बढ्ने तिमी।</p></article>
          <article><b>04</b><h3>Simply you</h3><p>तिम्रो हाँसो, बानी र अलिकति रिस—सबै मिलेर मेरो प्रिय तिमी।</p></article>
        </div>
        <button className="chapter-next" onClick={next}>There is a letter for you <b>→</b></button>
      </section>

      <section className={`chapter wish reveal ${step === 7 ? "visible" : ""}`} aria-hidden={step !== 7}>
        <div className="wish-photo"><Image src="/album/our-mountain-day.webp" alt="Richa and Naresh in the mountains" fill sizes="100vw" /></div>
        <div className="wish-card">
          <small>MY WISH FOR YOU</small>
          <h2>यो वर्ष तिम्रो मनजस्तै<br /><em>सुन्दर होस्।</em></h2>
          <p className="nepali">तिम्रो हरेक dream पूरा होस्, हरेक दिनमा peace र laughter होस्, र तिमीलाई आफूमाथि proud हुने अनगिन्ती moments मिलून्। Life को हरेक यात्रामा म तिम्रो side मा रहन पाऊँ—that is my wish too.</p>
          <button onClick={next}>Make a birthday wish ✦</button>
        </div>
      </section>

      <section className={`chapter final reveal ${step === 8 ? "visible" : ""}`} aria-hidden={step !== 8}>
        <div className="final-photo"><Image src="/album/our-special-day.webp" alt="Richa and Naresh on a special day" fill sizes="100vw" /></div>
        <div className="final-shade" />
        <div className="final-copy">
          <span>♥</span>
          <p>मेरो माया, मेरो साथी, मेरो घर</p>
          <h2>Happy Birthday,<br /><em>Richa</em></h2>
          <blockquote>तिमीलाई पाएकोमा म हरेक दिन आभारी छु।<br />आज, भोलि र सधैँ—म तिमीलाई माया गर्छु।</blockquote>
          <strong>Love, Naresh</strong>
          <button onClick={() => setStep(0)}>फेरि हेर्नुहोस् · Replay</button>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  return accepted ? <Experience /> : <Terms onAccept={() => setAccepted(true)} />;
}
