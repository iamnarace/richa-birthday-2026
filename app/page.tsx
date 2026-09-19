"use client";

import Image from "next/image";
import { useState } from "react";

const photos = [
  { src: "/album/richa-red-dress.webp", alt: "Richa smiling in a red dress", note: "The smile I could look at forever", className: "portrait tall" },
  { src: "/album/our-mountain-day.webp", alt: "Richa and Naresh together in the mountains", note: "Every view is better with you", className: "landscape wide" },
  { src: "/album/richa-sari.webp", alt: "Richa wearing a beautiful red sari", note: "Grace, warmth, and a little magic", className: "portrait" },
  { src: "/album/our-special-day.webp", alt: "Richa and Naresh dressed for a special day", note: "मेरो मन पर्ने हामी", className: "portrait tall" },
  { src: "/album/richa-coast.webp", alt: "Richa smiling by the coast", note: "Adventures feel like home with you", className: "portrait" },
  { src: "/album/our-tika-memory.webp", alt: "Richa and Naresh celebrating with tika", note: "Our traditions, our little world", className: "landscape wide" },
  { src: "/album/richa-boardwalk.webp", alt: "Richa standing on a boardwalk", note: "My favourite travel companion", className: "portrait" },
  { src: "/album/our-selfie.webp", alt: "A close selfie of Richa and Naresh", note: "You + me, always", className: "portrait" },
  { src: "/album/richa-summer.webp", alt: "Richa enjoying a sunny day", note: "Sunshine looks good on you", className: "portrait" },
] as const;

const promises = [
  ["01", "आजको दिन पूर्ण रूपमा Birthday Girl को हो।", "Today belongs completely to the birthday girl."],
  ["02", "तिम्रो मुस्कान यस पेजको सबैभन्दा सुन्दर हिस्सा हो।", "Your smile is the most beautiful part of this page."],
  ["03", "केही फोटो अलिकति लाजमर्दो हुन सक्छन्।", "A few photographs may be adorably embarrassing."],
  ["04", "हाँस्न, भावुक हुन र ‘Naresh, यो के हो?’ भन्न पाइन्छ।", "Laughing, getting emotional, and saying ‘Naresh, what is this?’ are encouraged."],
  ["05", "यी सम्झना र आउने सबै दिन—हाम्रो साझा कथा हुन्।", "These memories, and all the days ahead, are our shared story."],
] as const;

function Entrance({ onEnter }: { onEnter: () => void }) {
  const [message, setMessage] = useState("");
  return (
    <main className="entrance">
      <div className="terms-window" role="dialog" aria-labelledby="terms-title" aria-modal="true">
        <header className="terms-header">
          <p>20 September 2026</p>
          <h1 id="terms-title">Terms of Being Loved</h1>
          <span>मायाका साना सर्तहरू</span>
        </header>
        <div className="terms-scroll">
          <div className="terms-intro">
            <span className="heart-seal" aria-hidden="true">♥</span>
            <p>Dear Richa,</p>
            <h2>Before you open this little album…</h2>
            <p className="nepali">यो सानो सम्झनाको संसार खोल्नुअघि, तलका मायाका सर्तहरू स्वीकार गर्नुपर्नेछ।</p>
          </div>
          <ol className="promise-list">
            {promises.map(([number, nepali, english]) => (
              <li key={number}><span>{number}</span><div><strong>{nepali}</strong><p>{english}</p></div></li>
            ))}
          </ol>
          <div className="terms-signature"><p>Made especially for</p><strong>Richa</strong><span>with all my love — Naresh</span></div>
        </div>
        <footer className="terms-actions">
          <button className="agree" onClick={onEnter}>Agree &amp; open my album <span>♥</span></button>
          <button className="disagree" onClick={() => setMessage("यो option आज उपलब्ध छैन 😌  The birthday girl deserves all the love.")}>Disagree</button>
          <p aria-live="polite">{message}</p>
        </footer>
      </div>
    </main>
  );
}

function Album() {
  const [selected, setSelected] = useState<(typeof photos)[number] | null>(null);
  return (
    <main className="album">
      <section className="cover">
        <div className="cover-photo"><Image src="/album/richa-red-dress.webp" alt="Richa smiling in a red dress" fill priority sizes="100vw" /><div className="cover-shade" /></div>
        <div className="cover-copy">
          <p className="date">20 · 09 · 2026</p><p className="script-line">मेरो मायालाई</p>
          <h1>Happy Birthday,<br /><em>Richa</em></h1>
          <p className="cover-note">A little album of you, of us, and of all the ordinary moments you make beautiful.</p>
          <a href="#letter">Open our story <span>↓</span></a>
        </div>
      </section>

      <section className="opening-note" id="letter">
        <p className="eyebrow">A NOTE FROM MY HEART</p>
        <div className="note-grid">
          <h2>तिमी मेरो जीवनको<br /><em>सबैभन्दा सुन्दर भाग हौ।</em></h2>
          <div className="note-copy">
            <p>Richa, तिम्रो साथले साधारण दिनहरू पनि विशेष हुन्छन्। तिम्रो हाँसोले घर उज्यालो हुन्छ, अनि तिमीसँग बिताएको हरेक पल मेरो मन पर्ने सम्झना बन्छ।</p>
            <p>You bring warmth to my life in ways I can never fully put into words. On your birthday, I just want you to see yourself the way I see you—kind, strong, wonderfully funny, and deeply loved.</p>
            <p className="signature">Always yours, <strong>Naresh</strong></p>
          </div>
        </div>
      </section>

      <section className="feature-memory">
        <div className="feature-image"><Image src="/album/our-mountain-day.webp" alt="Richa and Naresh together in the mountains" fill sizes="(max-width: 800px) 100vw, 60vw" /></div>
        <div className="feature-card"><p>OUR LITTLE WORLD</p><h2>जहाँ तिमी,<br />त्यहीँ मेरो घर।</h2><span>Wherever life takes us, being beside you is the part I want to remember most.</span></div>
      </section>

      <section className="gallery-section" id="album">
        <div className="section-title"><p>THE RICHA ARCHIVES</p><h2>Pieces of our story</h2><span>Tap a photograph to hold the moment a little closer.</span></div>
        <div className="photo-wall">
          {photos.map((photo, index) => (
            <button className={`album-photo ${photo.className}`} key={photo.src} onClick={() => setSelected(photo)}>
              <span className="tape" aria-hidden="true" /><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 92vw, 33vw" />
              <span className="photo-number">0{index + 1}</span><strong>{photo.note}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="reasons-section">
        <div className="reasons-heading"><p>A FEW OF A MILLION REASONS</p><h2>Why I love you</h2></div>
        <div className="reason-list">
          <article><span>01</span><h3>Your heart</h3><p>तिमीले माया र care गर्ने तरिका—सानो कुरामा पनि—मेरो लागि धेरै विशेष छ।</p></article>
          <article><span>02</span><h3>Your smile</h3><p>The kind of smile that can rescue even the most ordinary day.</p></article>
          <article><span>03</span><h3>Your strength</h3><p>Quiet, steady, and beautiful. You keep growing while still caring for everyone around you.</p></article>
          <article><span>04</span><h3>Simply you</h3><p>तिम्रो हाँसो, तिम्रो बानी, तिम्रो अलिकति रिस—सबै मिलेर तिमीलाई तिमी बनाउँछ।</p></article>
        </div>
      </section>

      <section className="finale">
        <div className="finale-photo"><Image src="/album/our-special-day.webp" alt="Richa and Naresh together" fill sizes="100vw" /></div>
        <div className="finale-copy"><p>MY WISH FOR YOU</p><h2>May this year be as<br /><em>beautiful as your heart.</em></h2><blockquote>तिम्रो हरेक सपना पूरा होस्, हरेक दिन खुसीले भरियोस्, र जीवनको हरेक यात्रामा म तिम्रो साथमा रहन पाऊँ।</blockquote><strong>Happy Birthday, मेरो माया ♥</strong><span>Love, Naresh</span></div>
      </section>

      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded photograph" onClick={() => setSelected(null)}>
          <button onClick={() => setSelected(null)} aria-label="Close photograph">×</button>
          <div className="lightbox-photo" onClick={(event) => event.stopPropagation()}><Image src={selected.src} alt={selected.alt} fill sizes="95vw" /></div><p>{selected.note}</p>
        </div>
      )}
    </main>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  return entered ? <Album /> : <Entrance onEnter={() => setEntered(true)} />;
}
