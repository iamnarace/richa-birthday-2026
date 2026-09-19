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
  ["आजको दिन पूर्ण रूपमा Birthday Girl को हो।", "Today belongs completely to the birthday girl."],
  ["तिम्रो मुस्कान यस अनुभवको सबैभन्दा सुन्दर भाग हो।", "Your smile is the most beautiful part of this surprise."],
  ["केही फोटोले हँसाउन वा लजाउन सक्छन्।", "Some photos may make you laugh, blush, or both."],
  ["‘Naresh, यो के बनाएको?’ भन्न पूर्ण अनुमति छ।", "Saying “Naresh, what have you made?” is fully permitted."],
  ["आज र सधैँ, धेरै माया स्वीकार गर्नुपर्नेछ।", "Today and always, you agree to be loved beyond measure."],
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
            {terms.map(([np, en], index) => (
              <li key={np}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{np}</strong><span>{en}</span></div></li>
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
          <span>OUR PHOTO ALBUM</span>
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

function Experience() {
  const [step, setStep] = useState(0);
  const lastStep = 7;
  const next = () => setStep((value) => Math.min(lastStep, value + 1));
  const back = () => setStep((value) => Math.max(0, value - 1));

  return (
    <main className={`experience step-${step}`}>
      <div className="petals" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</div>
      <header className="journey-header">
        <button onClick={back} disabled={step === 0} aria-label="Previous chapter">←</button>
        <div>{Array.from({ length: lastStep + 1 }, (_, index) => <i key={index} className={index === step ? "active" : index < step ? "done" : ""} />)}</div>
        <span>{String(step + 1).padStart(2, "0")} / 08</span>
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

      <section className={`chapter letter reveal ${step === 5 ? "visible" : ""}`} aria-hidden={step !== 5}>
        <div className="letter-photo"><Image src="/album/our-selfie.webp" alt="Richa and Naresh together" fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
        <article>
          <small>एउटा सानो चिठी · A LETTER FOR YOU</small>
          <h2>प्रिय रिचा,<br /><em>जन्मदिनको धेरै धेरै शुभकामना।</em></h2>
          <p className="nepali">तिमीलाई जन्मदिनको शुभकामना भन्न एउटा साधारण message मात्र पर्याप्त लागेन, त्यसैले तिम्रो लागि यो सानो संसार बनाएँ। तिमीसँग बिताएका दिनहरू, हाँसो, यात्रा र घरका सामान्य पलहरू—यी सबै मेरो जीवनका सबैभन्दा बहुमूल्य सम्झना हुन्।</p>
          <p className="nepali">तिमी मेरो जीवनमा आएपछि “घर” एउटा ठाउँ मात्र रहेन; तिमी जहाँ छौ, त्यहीँ मेरो घर भयो। तिम्रो खुसीमा सँगै हाँस्न, गाह्रो दिनमा तिम्रो हात समात्न, र आउने हरेक वर्ष तिमीसँगै बढ्न पाउनु मेरो सबैभन्दा ठूलो चाहना हो।</p>
          <p>I built this because one birthday message felt far too small for everything I wanted to tell you. Thank you for being the warmth in our home, the calm in difficult moments, and the person who makes even an unplanned, ordinary day worth remembering.</p>
          <p>I love the life we are creating—not because every moment is perfect, but because it is ours. I want to keep choosing you through every new place, every change, every silly disagreement, every quiet evening, and every dream still waiting for us.</p>
          <p className="nepali">आज तिमीले आफूलाई मेरो आँखाबाट हेर्न सक—दयालु, साहसी, सुन्दर, रमाइलो र असीमित माया पाउन योग्य। तिमीलाई पाएकोमा म हरेक दिन आभारी छु।</p>
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

      <section className={`chapter reasons reveal ${step === 4 ? "visible" : ""}`} aria-hidden={step !== 4}>
        <div className="reasons-title"><small>A FEW OF A MILLION REASONS</small><h2>म तिमीलाई किन<br /><em>यति धेरै माया गर्छु</em></h2></div>
        <div className="reason-cards">
          <article><b>01</b><h3>तिम्रो मन</h3><p>सानो कुरामा पनि देखिने तिम्रो माया र care गर्ने बानी।</p></article>
          <article><b>02</b><h3>तिम्रो हाँसो</h3><p>The smile that can rescue even the most ordinary day.</p></article>
          <article><b>03</b><h3>तिम्रो शक्ति</h3><p>शान्त, बलियो र सुन्दर—हरेक कठिनाइमा पनि अगाडि बढ्ने तिमी।</p></article>
          <article><b>04</b><h3>Simply you</h3><p>तिम्रो हाँसो, बानी र अलिकति रिस—सबै मिलेर मेरो प्रिय तिमी।</p></article>
        </div>
        <button className="chapter-next" onClick={next}>There is a letter for you <b>→</b></button>
      </section>

      <section className={`chapter wish reveal ${step === 6 ? "visible" : ""}`} aria-hidden={step !== 6}>
        <div className="wish-photo"><Image src="/album/our-mountain-day.webp" alt="Richa and Naresh in the mountains" fill sizes="100vw" /></div>
        <div className="wish-card">
          <small>MY WISH FOR YOU</small>
          <h2>यो वर्ष तिम्रो मनजस्तै<br /><em>सुन्दर होस्।</em></h2>
          <p className="nepali">तिम्रो हरेक सपना पूरा होस्, हरेक दिन खुसीले भरियोस्, र जीवनको हरेक यात्रामा म तिम्रो साथमा रहन पाऊँ।</p>
          <p>May this new year of your life bring you peace, laughter, proud moments, and every beautiful thing you deserve.</p>
          <button onClick={next}>Make a birthday wish ✦</button>
        </div>
      </section>

      <section className={`chapter final reveal ${step === 7 ? "visible" : ""}`} aria-hidden={step !== 7}>
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
