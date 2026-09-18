"use client";

import { CSSProperties, PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { memories, reasons, wishes } from "@/data/memories";

type Phase = "gate" | "boot" | "story";

const declineLines = [
  "Are you sure that is the button you wanted?",
  "Interesting choice. Please reconsider.",
  "Birthday appreciation cannot be declined.",
  "Ma’am. Please stop chasing the button.",
  "I have a family.",
  "Fine. Your options have been updated.",
];

const bootLines = [
  ["Date verification", "20.09.2026 ✓"],
  ["Recipient detected", "RICHA ✓"],
  ["Loading beautiful photographs", "READY"],
  ["Loading questionable selfies", "TOO MANY"],
  ["Calculating cuteness", "OVERFLOW"],
  ["Checking age", "ACCESS DENIED"],
] as const;

function Petals({ count = 15 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        left: `${(index * 37 + 9) % 100}%`,
        delay: `${(index * 0.71) % 8}s`,
        duration: `${9 + (index % 6)}s`,
        size: `${7 + (index % 5) * 2}px`,
      })),
    [count],
  );

  return (
    <div className="petal-field" aria-hidden="true">
      {petals.map((petal, index) => (
        <span
          className="petal"
          key={index}
          style={
            {
              "--left": petal.left,
              "--delay": petal.delay,
              "--duration": petal.duration,
              "--size": petal.size,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function TermsGate({ onAccept }: { onAccept: () => void }) {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dodge = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (attempts >= 5) {
      onAccept();
      return;
    }
    const next = Math.min(attempts + 1, declineLines.length);
    setAttempts(next);
    const rangeX = Math.min(250, window.innerWidth * 0.3);
    const rangeY = Math.min(180, window.innerHeight * 0.2);
    setPosition({
      x: (Math.random() * 2 - 1) * rangeX,
      y: (Math.random() * 2 - 1) * rangeY,
    });
  };

  return (
    <main className="gate-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <section className="terms-card" aria-labelledby="terms-title">
        <div className="system-bar">
          <span className="status-light" />
          A PRIVATE LITTLE INVITATION · 20.09.2026
        </div>
        <p className="mono-kicker">FOR RICHA, ONLY · FROM NARESH</p>
        <h1 id="terms-title">Before you enter,<br /><em>one tiny promise.</em></h1>
        <ol className="terms-list">
          <li>Today, every argument automatically favours the Birthday Girl.</li>
          <li>Compliments are final, non-refundable and cannot be disputed.</li>
          <li>A few embarrassing photographs may appear without warning.</li>
          <li>Smiling, laughing, crying or saying “Naresh, what is this?” is encouraged.</li>
          <li>All memories are shared property, forever.</li>
          <li>The recipient agrees to be loved an unreasonable amount.</li>
        </ol>
        <div className="gate-actions">
          <button type="button" className="primary-button" onClick={onAccept}>I accept the love <span>♥</span></button>
          <button
            type="button"
            className={`decline-button attempt-${attempts}`}
            onPointerEnter={dodge}
            onPointerDown={dodge}
            style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${Math.max(0.72, 1 - attempts * 0.05)})` }}
            aria-label="Decline — this playful button moves away"
          >
            {attempts >= 5 ? "Also accept 🙄" : attempts >= 4 ? "Decl…" : "Decline"}
          </button>
        </div>
        <p className={`decline-message ${attempts ? "visible" : ""}`} aria-live="polite">
          {attempts ? declineLines[Math.min(attempts - 1, declineLines.length - 1)] : "No pressure. Though the pink button is clearly the right one."}
        </p>
        <div className="card-stamp" aria-hidden="true">MADE<br />WITH<br />LOVE</div>
      </section>
    </main>
  );
}

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisible((value) => {
        if (value >= bootLines.length) {
          window.clearInterval(timer);
          return value;
        }
        return value + 1;
      });
    }, 620);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="boot-shell">
      <section className="boot-panel" aria-live="polite">
        <div className="boot-head"><span>PROJECT_RICHA</span><span>BIRTHDAY BUILD 2026</span></div>
        <p className="boot-signed">Terms accepted ✓ &nbsp; Digital signature: Richa <em>(via mild coercion)</em></p>
        <div className="boot-log">
          {bootLines.slice(0, visible).map(([label, value], index) => (
            <div className="boot-row" key={label} style={{ animationDelay: `${index * 40}ms` }}>
              <span>{label}</span><i /><b className={value === "OVERFLOW" || value === "ACCESS DENIED" ? "warning" : ""}>{value}</b>
            </div>
          ))}
        </div>
        <div className={`boot-result ${visible === bootLines.length ? "ready" : ""}`}>
          <p>Everything is ready.</p>
          <h2>One more thing…</h2>
          <button className="reveal-button" onClick={onComplete}>Reveal birthday surprise</button>
        </div>
      </section>
    </main>
  );
}

function PhotoFrame({ index, image, label }: { index: number; image?: string; label: string }) {
  return (
    <div className={`photo-frame photo-tone-${(index % 4) + 1}`}>
      {image ? <img src={image} alt={label} /> : (
        <div className="photo-placeholder" role="img" aria-label={`Photo space for ${label}`}>
          <span>PHOTO_{String(index + 1).padStart(2, "0")}</span>
          <b>Our memory goes here</b>
          <small>Replace with a favourite photograph</small>
        </div>
      )}
    </div>
  );
}

function MemoryArchive() {
  const [openSecret, setOpenSecret] = useState<number | null>(null);
  return (
    <section className="chapter archive" id="memories">
      <div className="section-heading">
        <p>CHAPTER 02 · OUR ARCHIVE</p>
        <h2>Some days refuse<br />to become ordinary.</h2>
        <span>These are the ones I would save twice.</span>
      </div>
      <div className="memory-list">
        {memories.map((memory, index) => (
          <article className={`memory memory-${memory.tone}`} key={memory.id}>
            <PhotoFrame index={index} image={memory.image} label={memory.title} />
            <div className="memory-copy">
              <p className="mono-kicker">{memory.eyebrow}</p>
              <h3>{memory.title}</h3>
              <div className="memory-meta"><span>{memory.date}</span><span>{memory.location}</span></div>
              <p>{memory.message}</p>
              <button className="secret-trigger" onClick={() => setOpenSecret(openSecret === memory.id ? null : memory.id)}>
                {openSecret === memory.id ? "Close secret note" : "♡ There is something hidden here"}
              </button>
              {openSecret === memory.id && <div className="secret-note"><span>SECRET_NOTE_{String(memory.id).padStart(2, "0")}</span>{memory.secret}</div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MemoryChallenge() {
  const [answer, setAnswer] = useState<string | null>(null);
  return (
    <section className="challenge chapter">
      <div className="challenge-photo"><PhotoFrame index={4} label="memory challenge" /></div>
      <div className="challenge-copy">
        <p className="mono-kicker">MEMORY CHALLENGE #01</p>
        <h2>Recognise this one?</h2>
        <p>A cropped clue will become a real photograph from one of your favourite memories.</p>
        <div className="quiz-options">
          {["Our first adventure", "The day Naresh took one good photo", "Evidence we leave the house"].map((option) => (
            <button key={option} onClick={() => setAnswer(option)} className={answer === option ? "selected" : ""}>{option}</button>
          ))}
        </div>
        {answer && <div className="quiz-result"><b>MEMORY RESTORED ✓</b><span>Correct enough. The best part was being there with you.</span></div>}
      </div>
    </section>
  );
}

function RoseGame() {
  const [caught, setCaught] = useState<boolean[]>(Array(6).fill(false));
  const total = caught.filter(Boolean).length;
  return (
    <section className="rose-game chapter">
      <div className="section-heading centered">
        <p>BIRTHDAY SIDE QUEST</p>
        <h2>Catch six roses.</h2>
        <span>A little tribute to the birthday memories that came before this one.</span>
      </div>
      <div className="rose-field" aria-label={`${total} of 6 roses collected`}>
        {caught.map((isCaught, index) => (
          <button
            key={index}
            className={`rose rose-${index + 1} ${isCaught ? "caught" : ""}`}
            onClick={() => setCaught((current) => current.map((value, i) => i === index ? true : value))}
            aria-label={`Catch rose ${index + 1}`}
          >🌹</button>
        ))}
        <div className="rose-counter"><strong>{total} / 6</strong><span>ROSES COLLECTED</span></div>
      </div>
      {total === 6 && <div className="achievement"><span>ACHIEVEMENT UNLOCKED</span><b>Keeper of the roses 🌹</b></div>}
    </section>
  );
}

function GiftBox() {
  const [opened, setOpened] = useState(false);
  return (
    <section className="gift-section chapter">
      <p className="mono-kicker">CLASSIFIED BIRTHDAY ASSET</p>
      <h2>One mystery package.</h2>
      <button className={`gift ${opened ? "open" : ""}`} onClick={() => setOpened(true)} aria-label="Open mystery birthday gift">
        <span className="gift-lid" /><span className="gift-box" /><span className="gift-ribbon" />
      </button>
      {!opened ? <p>Tap the gift to unwrap it.</p> : (
        <div className="gift-message"><b>Nice try, Richa. 😌</b><span>Your real present is not stored in the browser.</span><em>Please locate Naresh.</em></div>
      )}
    </section>
  );
}

function BirthdayCake() {
  const [lit, setLit] = useState(false);
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [message, setMessage] = useState("Light the candles when you are ready.");
  const audioContext = useRef<AudioContext | null>(null);

  const extinguish = () => {
    setCandles([false, false, false, false, false]);
    setMessage("Wish detected. Encrypting… Wish secured ✓");
  };

  const useMicrophone = async () => {
    if (!lit) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const Context = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const context = new Context();
      audioContext.current = context;
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      context.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      setMessage("Listening… now blow out the candles.");
      let frames = 0;
      const detect = () => {
        analyser.getByteFrequencyData(data);
        const average = data.reduce((sum, value) => sum + value, 0) / data.length;
        if (average > 35) frames += 1;
        else frames = Math.max(0, frames - 1);
        if (frames > 4) {
          stream.getTracks().forEach((track) => track.stop());
          context.close();
          extinguish();
          return;
        }
        requestAnimationFrame(detect);
      };
      detect();
    } catch {
      setMessage("Microphone unavailable—tap ‘Blow out candles’ instead.");
    }
  };

  const allOut = candles.every((value) => !value);
  return (
    <section className={`cake-section chapter ${allOut ? "wish-made" : ""}`}>
      <div className="section-heading centered">
        <p>CHAPTER 06 · MAKE A WISH</p>
        <h2>This one belongs only to you.</h2>
        <span>Don’t tell me. I am not allowed to debug it.</span>
      </div>
      <div className="cake" aria-label="Birthday cake with five candles">
        <div className="candles">
          {candles.map((burning, index) => <span className="candle" key={index}>{lit && burning && <i className="flame" />}</span>)}
        </div>
        <div className="cake-top" /><div className="cake-body"><span>R</span></div><div className="cake-plate" />
      </div>
      <p className="cake-message" aria-live="polite">{message}</p>
      <div className="cake-actions">
        {!lit && <button className="primary-button" onClick={() => { setLit(true); setMessage("Make a wish. Then blow into the microphone—or use the fallback."); }}>Light candles</button>}
        {lit && !allOut && <><button className="primary-button" onClick={useMicrophone}>Enable mic & blow</button><button className="text-button" onClick={extinguish}>Blow out candles</button></>}
      </div>
      {allOut && <div className="wish-secured"><span>WISH_ENCRYPTION</span><b>Secured end-to-end ♥</b><small>Even Naresh does not have permission to read this file.</small></div>}
    </section>
  );
}

function Finale() {
  const [celebrating, setCelebrating] = useState(false);
  return (
    <section className={`finale ${celebrating ? "celebrating" : ""}`} id="finale">
      {celebrating && <Petals count={36} />}
      {!celebrating ? (
        <div className="summary-panel">
          <p className="mono-kicker">BIRTHDAY SESSION SUMMARY</p>
          {["Terms accepted", "Memories revisited", "Embarrassing photos discovered", "Roses collected", "Wish encrypted", "Letter delivered"].map((item) => <div className="summary-row" key={item}><span>{item}</span><i /><b>✓</b></div>)}
          <div className="happiness-check"><span>Birthday Girl Happiness</span><b>UNKNOWN</b></div>
          <button className="primary-button" onClick={() => setCelebrating(true)}>Tap to update status</button>
        </div>
      ) : (
        <div className="final-message">
          <p>20 · 09 · 2026</p>
          <h2>Happy Birthday,<br /><em>Richa.</em></h2>
          <blockquote>Another year of you—and another year I am grateful I get to be beside you.</blockquote>
          <div className="final-status"><span>Age</span><b>+1</b><span>Beauty</span><b>Beyond measure</b><span>Wish</span><b>Encrypted</b><span>Love</span><b>Unlimited</b></div>
          <small>Made by Naresh. Only for Richa. ♥</small>
        </div>
      )}
    </section>
  );
}

function Story() {
  const [developerNote, setDeveloperNote] = useState(false);
  return (
    <main className="story-shell">
      <div className="sound-toggle" aria-label="A soundtrack will be added during personalisation">Soundtrack slot ♫</div>
      <section className="hero">
        <Petals />
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-content">
          <p className="eyebrow">A LITTLE WORLD MADE FOR YOU</p>
          <div className="date-mark"><span>20</span><i /><span>09</span><i /><span>26</span></div>
          <h1>Happy Birthday,<br /><em>Richa.</em></h1>
          <p className="hero-copy">I could have sent you another birthday message. But one message did not feel big enough for all the memories, laughter and little things that make you—you.</p>
          <a href="#release" className="story-link">Begin your birthday story <span>↓</span></a>
        </div>
        <div className="scroll-cue">SCROLL TO ENTER <i /></div>
      </section>

      <section className="release chapter" id="release">
        <div className="release-card">
          <div className="release-title"><span>RICHA</span><h2>Birthday release<br />2026</h2><p>Version 20.09.2026 · Stable ♥</p></div>
          <div className="release-columns">
            <div><p className="mono-kicker">WHAT’S NEW</p><ul><li>One additional year of experience</li><li>Increased beauty and brilliance</li><li>More memories installed</li><li>New adventures unlocked</li><li>Hug compatibility improved</li></ul></div>
            <div><p className="mono-kicker">KNOWN ISSUES</p><ul><li>Age counter continues annually</li><li>Still far too beautiful in photographs</li><li>Naresh remains excessively attached</li><li>Storage usage: too many saved photos</li></ul></div>
          </div>
          <button className="developer-note-button" onClick={() => setDeveloperNote(!developerNote)}>Open developer note</button>
          {developerNote && <div className="developer-note"><span>developer_notes.txt</span><b>The known issues above will not be fixed.</b><p>Fix status: won’t fix. Support plan: lifetime.</p></div>}
        </div>
      </section>

      <MemoryArchive />
      <MemoryChallenge />
      <RoseGame />

      <section className="reasons chapter">
        <div className="section-heading centered"><p>CHAPTER 04 · SIX SMALL REASONS</p><h2>Things I love<br />about you.</h2><span>Tap each one. This list is nowhere near complete.</span></div>
        <div className="reason-grid">
          {reasons.map(([number, title, copy]) => <details className="reason-card" key={number}><summary><span>{number}</span><b>{title}</b><i>+</i></summary><p>{copy}</p></details>)}
        </div>
      </section>

      <section className="wishes chapter">
        <div className="wishes-title"><p className="mono-kicker">future_wishes.log</p><h2>For this next<br />year of you.</h2></div>
        <div className="wish-list">{wishes.map((wish, index) => <div key={wish}><span>0{index + 1}</span><p>{wish}</p></div>)}</div>
      </section>

      <GiftBox />
      <BirthdayCake />

      <section className="letter chapter">
        <div className="letter-photo"><PhotoFrame index={5} label="Richa and Naresh together" /></div>
        <article className="letter-paper">
          <p className="letter-date">20 September 2026</p>
          <h2>My dearest Richa,</h2>
          <p>Somewhere between all the normal days, random conversations, photos, laughs, plans and little moments, you became home to me.</p>
          <p>There are things I probably do not say often enough, so I built somewhere I could not forget to say them.</p>
          <p>I hope this new year of your life brings you the kind of happiness you give to the people around you—the quiet, honest kind that stays. I hope you feel proud of how far you have come, excited for everything still ahead, and deeply loved through all of it.</p>
          <p className="letter-placeholder">[We will replace this paragraph with Naresh’s own favourite memory, personal promise and English + Nepali birthday message.]</p>
          <p>Happy birthday, babe. I am grateful you were born, and even more grateful that life brought you to me.</p>
          <p className="letter-signoff">Always yours,<br /><em>Naresh</em></p>
        </article>
      </section>

      <Finale />
    </main>
  );
}

export default function BirthdayExperience() {
  const [phase, setPhase] = useState<Phase>("gate");
  return phase === "gate" ? <TermsGate onAccept={() => setPhase("boot")} /> : phase === "boot" ? <BootSequence onComplete={() => setPhase("story")} /> : <Story />;
}
