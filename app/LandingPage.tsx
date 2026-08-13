"use client";

import { useEffect, useState, type ReactNode } from "react";

// TODO: INSERIR LINK REAL DO CHECKOUT
const CHECKOUT_URL = "#";

// TODO: INSERIR IDs DO META PIXEL, GTM E ANALYTICS
const HERO_ANGLES = [
  {
    id: 1,
    eyebrow: "AULA SEMENTE — AO VIVO",
    headline: (
      <>
        Comprar empolgado.<br />
        <span className="pain-line">Vender com medo.</span>
        <small>Dá para sair desse ciclo.</small>
      </>
    ),
    subheadline: (
      <>
        Você não chegou aqui por falta de inteligência. Faltou uma coisa que quase ninguém ensinou: <strong>um sistema antes da emoção aparecer.</strong> Na Aula Semente, você vai entender o erro e começar a enxergar suas decisões no mercado com mais clareza.
      </>
    ),
    cta: "QUERO ENTENDER O QUE ESTÁ FALTANDO",
    priceLabel: "HOJE: R$47",
  },
  {
    id: 3,
    eyebrow: "AULA SEMENTE — AO VIVO",
    headline: (
      <>
        A próxima moeda não resolve o seu problema.
        <small>Porque o problema não é o ativo. É o jogo.</small>
      </>
    ),
    subheadline: (
      <>
        Existe um padrão que pode fazer até quem entra certo sair cedo demais. Ele tem nome: <strong>FOSI.</strong> Na Aula Semente, você vai entender como esse padrão aparece — e por que método pesa mais que palpite.
      </>
    ),
    cta: "QUERO ENTENDER ESSE JOGO",
    priceLabel: "R$47",
  },
  {
    id: 2,
    eyebrow: "AULA SEMENTE — AO VIVO",
    headline: (
      <>
        Entenda por que suas decisões saem do plano — sem sinais, sem depender de sorte e sem viver grudado no gráfico.
      </>
    ),
    subheadline: (
      <>
        Na Aula Semente, você vai reconhecer o padrão, entender o FOSI e conhecer o primeiro princípio do Método M.E.S.T.R.E. para começar a decidir com sistema.
      </>
    ),
    cta: "QUERO PARTICIPAR POR R$47",
    priceLabel: "R$47",
  },
];

const transformations = [
  ["A decisão começa quando o preço mexe.", "Você entende o que deveria existir antes."],
  ["Medo parece informação.", "Você reconhece quando emoção e processo começam a se misturar."],
  ["O erro parece azar.", "O padrão fica visível."],
];

const understanding = [
  "A moeda certa não corrige uma decisão sem método.",
  "Sardinha reage. Tubarão lê o tabuleiro.",
  "Existe um medo pouco falado: FOSI.",
  "Decisão com método começa antes da emoção.",
];

const beliefBreaks = [
  "Uma moeda boa não corrige uma decisão ruim.",
  "Informação não é método.",
  "Sair cedo também pode ser emoção.",
  "Um erro fica mais fácil de enxergar quando ganha um nome.",
];

const forYou = [
  "já entrou em cripto e depois não entendeu onde errou;",
  "está começando e quer evitar decisões por hype;",
  "acompanha especialistas, mas quer compreender a lógica;",
  "já conhece mercado, mas se reconhece saindo cedo;",
  "quer método, não palpite.",
];

const notForYou = [
  "sinal;",
  "moeda pronta;",
  "lucro garantido;",
  "enriquecimento rápido;",
  "recomendação individual.",
];

const mestre = [
  ["M", "Mindset"],
  ["E", "Estratégia"],
  ["S", "Segurança"],
  ["T", "Táticas"],
  ["R", "Retorno"],
  ["E", "Exploração"],
];

const faqs = [
  ["É para iniciante?", "Sim. A aula começa pela lógica da decisão e pelo comportamento antes de avançar para conceitos mais técnicos."],
  ["Preciso ter muito dinheiro?", "Não. O conteúdo é sobre processo e comportamento, não sobre tamanho de capital."],
  ["Vou receber sinais?", "Não. A proposta é justamente mostrar uma forma de pensar sem depender do próximo palpite."],
  ["Preciso ficar o dia todo olhando gráfico?", "Não. A Aula Semente não foi criada para transformar você em day trader."],
  ["Vocês garantem lucro?", "Não. Este é um produto educacional. Nenhum resultado financeiro é garantido."],
  ["Quanto custa?", "O primeiro lote está ativo por R$47. Os valores dos lotes futuros ficam visíveis exclusivamente na seção de lotes."],
  ["Tenho garantia?", "Sim. Você tem 7 dias de garantia para conhecer o conteúdo e avaliar a proposta."],
];

type TrackName =
  | "hero_cta_click"
  | "lot1_checkout_click"
  | "pricing_section_view"
  | "bonus_section_view"
  | "mechanism_section_view"
  | "faq_open"
  | "final_cta_click"
  | "checkout_click";

function track(event: TrackName, detail?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const trackedWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  trackedWindow.dataLayer = trackedWindow.dataLayer || [];
  trackedWindow.dataLayer.push({ event, ...detail });
}

function Logo() {
  return (
    <a className="brand" href="#topo" aria-label="Zé do Bilhão — voltar ao topo">
      <span className="brand-mark" aria-hidden="true"><i /></span>
      <span className="brand-name">Zé DO <strong>BILHÃO</strong></span>
    </a>
  );
}

function CTA({ children, event, className = "", ariaLabel }: { children: ReactNode; event: TrackName; className?: string; ariaLabel?: string }) {
  function handleClick(eventObject: React.MouseEvent<HTMLAnchorElement>) {
    track(event);
    track("checkout_click", { source: event });
    if (CHECKOUT_URL === "#") {
      eventObject.preventDefault();
      document.getElementById("lotes")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <a className={`cta ${className}`.trim()} href={CHECKOUT_URL} onClick={handleClick} aria-label={ariaLabel}>
      <span>{children}</span><b aria-hidden="true">↗</b>
    </a>
  );
}

function SectionLead({ kicker, title, children, align = "center" }: { kicker?: string; title: ReactNode; children?: ReactNode; align?: "center" | "left" }) {
  return (
    <div className={`section-lead ${align === "left" ? "align-left" : ""}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {children && <div className="lead-copy">{children}</div>}
    </div>
  );
}

export default function LandingPage() {
  const [heroAngle, setHeroAngle] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const requested = Number(new URLSearchParams(window.location.search).get("hero"));
    const found = HERO_ANGLES.findIndex((variant) => variant.id === requested);
    if (found >= 0) setHeroAngle(found);

    document.documentElement.classList.add("js-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -40px" }
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const eventSections: Array<[string, TrackName]> = [
      ["lotes", "pricing_section_view"],
      ["bonus", "bonus_section_view"],
      ["mecanismo", "mechanism_section_view"],
    ];
    const seen = new Set<string>();
    const eventObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target.id)) return;
        const match = eventSections.find(([id]) => id === entry.target.id);
        if (match) {
          seen.add(entry.target.id);
          track(match[1]);
        }
      }),
      { threshold: 0.35 }
    );
    eventSections.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) eventObserver.observe(element);
    });

    const hero = document.getElementById("topo");
    const stickyObserver = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0.04 });
    if (hero) stickyObserver.observe(hero);

    return () => {
      revealObserver.disconnect();
      eventObserver.disconnect();
      stickyObserver.disconnect();
      document.documentElement.classList.remove("js-ready");
    };
  }, []);

  const activeHero = HERO_ANGLES[heroAngle];

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Logo />
          <CTA event="checkout_click" className="header-cta" ariaLabel="Participar da Aula Semente por R$47">PARTICIPAR — R$47</CTA>
        </div>
      </header>

      <main>
        <section id="topo" className="hero" data-hero-angle={activeHero.id}>
          <div className="hero-ambient" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-copy reveal is-visible">
              <p className="eyebrow"><span />{activeHero.eyebrow}</p>
              <h1>{activeHero.headline}</h1>
              <div className="hero-subheadline">{activeHero.subheadline}</div>
              <div className="hero-offer">
                <p className="hero-price">{activeHero.priceLabel}</p>
                <CTA event="hero_cta_click" className="hero-button">{activeHero.cta}</CTA>
                <p className="guarantee-note"><span aria-hidden="true">◇</span> 7 dias de garantia</p>
              </div>
            </div>
            <div className="hero-visual reveal is-visible">
              <div className="visual-frame">
                <img src="/ze-do-bilhao.webp" width="1680" height="936" alt="Zé do Bilhão, tubarão estrategista de terno navy, analisando um tabuleiro de xadrez" fetchPriority="high" />
                <div className="visual-stamp"><span>NÃO É O ATIVO.</span><strong>É O JOGO.</strong></div>
              </div>
            </div>
          </div>
          <div className="hero-index" aria-label="Hero modular com três ângulos disponíveis por parâmetro de URL">
            {HERO_ANGLES.map((variant, index) => (
              <button key={variant.id} type="button" className={heroAngle === index ? "active" : ""} onClick={() => setHeroAngle(index)} aria-label={`Exibir ângulo ${variant.id}`} aria-pressed={heroAngle === index}>
                0{variant.id}
              </button>
            ))}
          </div>
        </section>

        <section className="section transformation">
          <div className="shell">
            <SectionLead kicker="MUDANÇA DE LENTE" title={<>O mercado mexe.<br /><em>Sua decisão não precisa mexer junto.</em></>} />
            <div className="transformation-grid">
              {transformations.map(([before, after], index) => (
                <article className="shift-card reveal" key={before}>
                  <span className="card-number">0{index + 1}</span>
                  <p className="state-label today">HOJE</p>
                  <h3>{before}</h3>
                  <div className="shift-line"><i /></div>
                  <p className="state-label after">DEPOIS</p>
                  <p>{after}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section understand">
          <div className="shell split-heading">
            <SectionLead kicker="ANTES DA ESCOLHA" title={<>Talvez o erro comece<br /><em>antes da moeda.</em></>} align="left" />
            <p className="section-side-copy reveal">Quando tudo parece depender do ativo, o padrão passa despercebido. A aula começa mudando o ponto de observação.</p>
          </div>
          <div className="shell numbered-list">
            {understanding.map((item, index) => (
              <article className="numbered-item reveal" key={item}>
                <span>0{index + 1}</span><h3>{item}</h3><i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
          <div className="center-cta reveal"><CTA event="checkout_click">QUERO VER ISSO NA PRÁTICA — R$47</CTA></div>
        </section>

        <section id="lotes" className="section lots">
          <div className="shell">
            <SectionLead kicker="INGRESSO" title={<>Quanto antes você entra,<br /><em>menor o seu ingresso.</em></>}>
              <p>O 1º lote está ativo agora.</p>
            </SectionLead>
            <div className="lots-grid">
              <article className="lot-card active-lot reveal">
                <span className="lot-badge">LOTE ATUAL</span>
                <p className="lot-title">1º LOTE</p>
                <p className="lot-price"><sup>R$</sup>47</p>
                <p className="lot-status available"><i /> LIBERADO</p>
                <CTA event="lot1_checkout_click" className="full-cta">GARANTIR POR R$47</CTA>
                <small>7 dias de garantia</small>
              </article>
              <article className="lot-card locked reveal" aria-disabled="true">
                <span className="lock" aria-hidden="true">⌑</span>
                <p className="lot-title">2º LOTE</p>
                <p className="lot-price"><sup>R$</sup>97</p>
                <p className="lot-status">BLOQUEADO</p>
                <p>Disponível após o encerramento do lote atual.</p>
              </article>
              <article className="lot-card locked reveal" aria-disabled="true">
                <span className="lock" aria-hidden="true">⌑</span>
                <p className="lot-title">3º LOTE</p>
                <p className="lot-price"><sup>R$</sup>197</p>
                <p className="lot-status">BLOQUEADO</p>
                <p>Lote futuro.</p>
              </article>
            </div>
            <div className="lot-timeline reveal" aria-label="Progressão dos lotes">
              <span className="on">AGORA</span><i /><span>DEPOIS</span><i /><span>MAIS TARDE</span>
            </div>
          </div>
        </section>

        <section className="section persona">
          <div className="shell persona-grid">
            <div className="persona-visual reveal">
              <img src="/ze-do-bilhao.webp" width="1680" height="936" loading="lazy" alt="Zé do Bilhão observando o tabuleiro com postura estratégica" />
              <p><span>Zé DO</span> BILHÃO</p>
            </div>
            <div className="persona-copy reveal">
              <p className="kicker">A PERSONA DO JOGO</p>
              <h2>Não é mais um perfil dizendo <em>qual moeda comprar.</em></h2>
              <p>O Zé do Bilhão existe para traduzir um mercado cheio de ruído em uma linguagem simples.</p>
              <p>Aqui, você não encontra a próxima moeda mágica.</p>
              <div className="word-stack"><strong>tabuleiro.</strong><strong>processo.</strong><strong>decisão.</strong></div>
              <p className="muted">Porque copiar alguém parece mais fácil. Mas continuar dependendo do próximo palpite mantém você no mesmo lugar.</p>
            </div>
          </div>
        </section>

        <section className="section beliefs">
          <div className="shell">
            <SectionLead kicker="QUEBRAS DE CRENÇA" title={<>Antes da próxima decisão,<br /><em>entenda isso.</em></>} />
            <div className="belief-grid">
              {beliefBreaks.map((belief, index) => (
                <article key={belief} className={`belief-card reveal belief-${index + 1}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span><h3>{belief}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section what-is">
          <div className="shell what-grid">
            <div className="what-copy reveal">
              <p className="kicker">AULA SEMENTE</p>
              <h2>Você não precisa de outro palpite.<br /><em>Precisa entender o processo.</em></h2>
              <p>A Aula Semente é um encontro online e ao vivo para quem quer entender por que continua tomando decisões no impulso.</p>
              <ul className="check-list">
                <li>enxergar o jogo;</li><li>reconhecer o FOSI;</li><li>entender a diferença entre reação e processo;</li><li>conhecer o primeiro princípio do M.E.S.T.R.E.</li>
              </ul>
              <CTA event="checkout_click">QUERO PARTICIPAR</CTA>
            </div>
            <aside className="session-card reveal">
              <div className="session-top"><span>AO VIVO</span><i /></div>
              <p className="session-monogram">AS</p>
              <p className="session-name">AULA<br />SEMENTE</p>
              <div className="chip-row"><span>AULA AO VIVO</span><span>SEM SINAIS</span><span>CONTEÚDO EDUCACIONAL</span><span>R$47</span></div>
            </aside>
          </div>
        </section>

        <section className="section learn">
          <div className="shell">
            <SectionLead kicker="O QUE VOCÊ VAI APRENDER" title={<>Do impulso ao tabuleiro.<br /><em>Do medo ao método.</em></>} />
            <div className="learn-grid">
              <article className="learn-card reveal">
                <span className="learn-icon" aria-hidden="true">♟</span><p className="kicker">BLOCO 01</p><h3>DO IMPULSO AO TABULEIRO</h3><p>Mostrar por que sardinhas reagem ao movimento que já aconteceu e o que muda quando uma decisão começa antes.</p><div className="card-axis"><span>REAGIR</span><i /><span>OBSERVAR</span></div>
              </article>
              <article className="learn-card featured reveal">
                <span className="learn-icon" aria-hidden="true">♟</span><p className="kicker">BLOCO 02</p><h3>DO MEDO AO MÉTODO</h3><p>Apresentar o FOSI e o primeiro princípio do M.E.S.T.R.E. para mostrar como uma decisão pode ser organizada antes da pressão.</p><div className="card-axis"><span>EMOÇÃO</span><i /><span>PROCESSO</span></div>
              </article>
            </div>
          </div>
        </section>

        <section id="bonus" className="section bonus">
          <div className="shell">
            <SectionLead kicker="MATERIAIS DE APOIO" title={<>Seu ingresso<br /><em>também libera</em></>} />
            <div className="bonus-grid">
              <article className="bonus-card reveal"><span className="bonus-index">01</span><div className="bonus-icon">◆</div><p className="kicker">DIAGNÓSTICO</p><h3>QUIZ FOSI</h3><strong>8 perguntas.</strong><p>Um diagnóstico para identificar como esse padrão aparece no comportamento.</p></article>
              <article className="bonus-card reveal"><span className="bonus-index">02</span><div className="bonus-icon">◆</div><p className="kicker">MATERIAL RÁPIDO</p><h3>GUIA DOS 3 ERROS</h3><strong>Os 3 Erros Que Fazem Você Perder Dinheiro no Cripto</strong><p>Material rápido de apoio.</p></article>
              <article className="bonus-card reveal"><span className="bonus-index">03</span><div className="bonus-icon">◆</div><p className="kicker">REVISÃO</p><h3>REPLAY + CHECKLIST</h3><strong>Replay temporário da aula.</strong><p>Checklist simples para revisar os pontos principais antes de uma decisão.</p></article>
            </div>
            <div className="center-cta reveal"><CTA event="checkout_click">GARANTIR TUDO POR R$47</CTA></div>
          </div>
        </section>

        <section className="section tension">
          <div className="tension-board" aria-hidden="true"><span>♜</span><span>♞</span><span>♟</span></div>
          <div className="shell tension-inner reveal">
            <p className="kicker">O PADRÃO VIAJA JUNTO</p>
            <h2>Trocar a moeda<br /><em>não troca o jogador.</em></h2>
            <div className="tension-copy"><p>Hoje muda o ativo.</p><p>Amanhã muda o influenciador.</p><p>Depois muda o gráfico.</p><p>Depois aparece outra oportunidade.</p><p>Mas se o processo continua igual...</p><strong>o padrão viaja junto.</strong></div>
            <h3>Antes de procurar a próxima peça,<br />entenda o tabuleiro.</h3>
          </div>
        </section>

        <section className="section fit">
          <div className="shell fit-grid">
            <div className="fit-positive reveal">
              <p className="kicker">PARA QUEM É</p><h2>Essa aula faz sentido<br /><em>para você se...</em></h2>
              <ul className="check-list large">{forYou.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <aside className="fit-negative reveal">
              <span className="negative-icon">×</span><h3>Não é para você se procura:</h3>
              <ul>{notForYou.map((item) => <li key={item}>{item}</li>)}</ul>
              <p>Sem atalhos vendidos como certeza. Sem terceirizar sua responsabilidade.</p>
            </aside>
          </div>
        </section>

        <section id="mecanismo" className="section mechanism">
          <div className="shell">
            <SectionLead kicker="MECANISMO" title={<>O problema tem um nome.<br /><em>O processo também.</em></>} />
            <div className="mechanism-grid">
              <article className="mechanism-card fosi reveal">
                <div className="mechanism-header"><span>PADRÃO</span><i>01</i></div>
                <h3>FOSI</h3><p className="expansion">Fear of Staying In</p><strong>O medo de permanecer.</strong>
                <div className="fosi-illustration" aria-hidden="true"><div className="mini-board" /><span className="chess-piece">♞</span><span className="withdraw-line">↗</span></div>
                <div className="sequence"><span>Você entra.</span><span>A posição começa a andar.</span><span>O medo aparece.</span><span>Você sai.</span></div>
                <p>Depois percebe que talvez o problema não fosse a entrada.</p>
              </article>
              <article className="mechanism-card master reveal">
                <div className="mechanism-header"><span>PROCESSO</span><i>02</i></div>
                <h3>M.E.S.T.R.E.</h3><p className="expansion">Um sistema para tirar decisões do improviso.</p>
                <div className="master-list">{mestre.map(([letter, word]) => <div key={`${letter}-${word}`}><b>{letter}</b><span>{word}</span></div>)}</div>
                <p>Na Aula Semente, você conhece o primeiro princípio — sem atalhos, sem entregar um palpite pronto.</p>
              </article>
            </div>
            <div className="mechanism-close reveal"><p><strong>FOSI</strong> mostra o padrão.</p><p><strong>M.E.S.T.R.E.</strong> organiza o processo.</p><CTA event="checkout_click">QUERO ENTENDER POR R$47</CTA></div>
          </div>
        </section>

        {/* TODO: INSERIR DEPOIMENTOS REAIS — aceitar apenas relatos sobre clareza, método, comportamento, entendimento e autonomia. */}
        <section id="depoimentos" className="testimonials-section" hidden aria-label="Depoimentos reais serão adicionados aqui">
          <div className="shell testimonial-grid"><article /><article /><article /></div>
        </section>

        <section className="section offer">
          <div className="shell">
            <SectionLead kicker="A OFERTA" title={<>Tudo isso por <em>R$47</em></>} />
            <div className="offer-box reveal">
              <div className="offer-includes">
                <p className="offer-label">SEU ACESSO INCLUI</p>
                <ul><li><i>✓</i><span>Aula Semente ao vivo</span></li><li><i>✓</i><span>Quiz FOSI</span></li><li><i>✓</i><span>Guia dos 3 Erros</span></li><li><i>✓</i><span>Replay temporário</span></li><li><i>✓</i><span>Checklist de apoio</span></li></ul>
              </div>
              <div className="offer-price">
                <p>SEU INGRESSO HOJE</p><strong><sup>R$</sup>47</strong><span>7 dias de garantia</span>
                <CTA event="checkout_click" className="full-cta">QUERO MEU INGRESSO POR R$47</CTA>
                <small>◇ Compra protegida por 7 dias</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section guarantee">
          <div className="shell guarantee-grid">
            <div className="shield reveal" aria-hidden="true"><span>7</span><small>DIAS</small></div>
            <div className="guarantee-copy reveal">
              <p className="kicker">GARANTIA</p><h2>Você tem 7 dias para<br /><em>decidir com calma.</em></h2>
              <div className="guarantee-steps"><span>Entre.</span><i /><span>Conheça a proposta.</span><i /><span>Avalie.</span></div>
              <p>Assista ao conteúdo disponibilizado. Se dentro de 7 dias você entender que não faz sentido para você, poderá solicitar o reembolso seguindo o processo da plataforma utilizada.</p>
              <strong className="guarantee-badge">7 DIAS DE GARANTIA</strong>
              <CTA event="checkout_click">QUERO PARTICIPAR POR R$47</CTA>
            </div>
          </div>
        </section>

        <section className="section faq">
          <div className="shell faq-grid">
            <div className="faq-heading reveal"><p className="kicker">DÚVIDAS FREQUENTES</p><h2>Perguntas antes<br /><em>do próximo lance.</em></h2><p>O essencial, sem letras miúdas.</p></div>
            <div className="accordion">
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <article className={`faq-item reveal ${isOpen ? "open" : ""}`} key={question}>
                    <h3><button type="button" aria-expanded={isOpen} aria-controls={`faq-panel-${index}`} onClick={() => { setOpenFaq(isOpen ? null : index); if (!isOpen) track("faq_open", { question }); }}><span>{question}</span><i aria-hidden="true">+</i></button></h3>
                    <div id={`faq-panel-${index}`} className="faq-panel" role="region" aria-hidden={!isOpen}><p>{answer}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <img src="/ze-do-bilhao.webp" width="1680" height="936" loading="lazy" alt="Zé do Bilhão observa uma peça dourada sobre um tabuleiro de xadrez" />
          <div className="final-overlay" />
          <div className="final-chess" aria-hidden="true">♟</div>
          <div className="shell final-content reveal">
            <p className="kicker">SEU PRÓXIMO LANCE</p>
            <h2>A próxima moeda pode mudar.<br /><em>Mas o seu processo precisa mudar antes.</em></h2>
            <div className="final-copy"><p>Antes da próxima decisão, existe uma pergunta mais importante do que “Qual moeda?”</p><p>A pergunta é: <strong>quem está decidindo?</strong></p><div><span>O medo?</span><span>A euforia?</span><span>O palpite de alguém?</span><span>Ou um processo que você realmente entende?</span></div></div>
            <p className="final-price">R$47</p>
            <CTA event="final_cta_click" className="hero-button">QUERO ENTENDER O JOGO</CTA>
            <p className="guarantee-note"><span aria-hidden="true">◇</span> 7 dias de garantia</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-top"><Logo /><p>Aula Semente · Educação comportamental para decisões no mercado cripto.</p><a href="#topo">VOLTAR AO TOPO ↑</a></div>
        <div className="shell disclaimer">Conteúdo educacional. Não é recomendação de investimento. Cada pessoa é responsável pela gestão do seu capital. Para orientação personalizada, consulte um profissional habilitado.</div>
      </footer>

      <div className={`mobile-sticky ${showSticky ? "show" : ""}`} aria-hidden={!showSticky}>
        <div><strong>AULA SEMENTE</strong><span>R$47</span></div>
        <CTA event="checkout_click" ariaLabel="Quero entrar na Aula Semente por R$47">QUERO ENTRAR</CTA>
      </div>
    </>
  );
}
