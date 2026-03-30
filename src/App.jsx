import './App.css'
import 'leaflet/dist/leaflet.css'
import { useMemo, useState } from 'react'
import { Circle, CircleMarker, MapContainer, Popup, TileLayer, Tooltip, Polyline } from 'react-leaflet'

const content = {
  fr: {
    langLabel: 'FR',
    nav: { services: 'Services', about: 'À propos', contact: 'Contact' },
    eyebrow: 'Systèmes environnementaux · Géosciences · Géothermie',
    title: 'Surveillance, expertise et données pour des décisions de terrain plus sûres.',
    intro:
      'GeoAzimut conçoit et déploie des systèmes de mesure et d’analyse pour les environnements exigeants, avec une approche claire, structurée et professionnelle.',
    primaryCta: 'Prendre contact',
    secondaryCta: 'Voir les services',
    stats: [
      { value: '2011', label: 'Fondée à Fribourg' },
      { value: 'Suisse', label: 'Approche de terrain' },
      { value: 'De bout en bout', label: 'Étude à mise en service' },
    ],
    metricMain: {
      label: 'Surveillance',
      title: 'Systèmes fiables pour conditions réelles',
      text: 'Des dispositifs pensés pour la continuité opérationnelle, la lisibilité des données et la rapidité d’interprétation.',
    },
    metricSide: { label: 'Méthode', title: 'Étude, déploiement et suivi technique' },
    highlights: [
      'Ingénierie suisse',
      'Exécution structurée',
      'Vision claire du terrain',
      'Support technique réactif',
    ],
    servicesHeading: 'Des services techniques orientés résultat',
    servicesIntro:
      'Une offre structurée pour surveiller, analyser et exploiter des données utiles à la décision.',
    services: [
      {
        title: 'Surveillance environnementale',
        text: 'Instrumentation et suivi pour terrains sensibles, infrastructures et aléas naturels.',
      },
      {
        title: 'Expertise en géothermie',
        text: 'Appui technique pour essais TRT, études, interprétation de résultats et cadrage opérationnel.',
      },
      {
        title: 'Données et visualisation',
        text: 'Chaîne complète de collecte, structuration et restitution pour une lecture claire de la situation.',
      },
    ],
    aboutHeading: 'Une expertise technique rendue lisible',
    aboutText:
      'GeoAzimut privilégie les solutions robustes, les livrables clairs et une relation de travail simple pour le client comme pour les équipes techniques.',
    approach: 'Approche',
    approachValue: 'Précise, structurée, pragmatique',
    focus: 'Priorité',
    focusValue: 'Des systèmes qui tiennent dans le temps',
    outcome: 'Effet attendu',
    outcomeValue: 'Meilleure visibilité, meilleure réactivité, meilleure décision',
    contactHeading: 'Discuter d’un besoin technique',
    contactText:
      'Présentez le contexte, le site et l’objectif. Une première qualification permet d’orienter rapidement la bonne réponse technique.',
    contactButton: 'Envoyer la demande',
    contactMeta: 'Réponse indicative sous 1 à 2 jours ouvrés',
    formName: 'Nom',
    formCompany: 'Société',
    formEmail: 'Email',
    formPhone: 'Téléphone',
    formNeed: 'Type de besoin',
    formNeedPlaceholder: 'Choisir',
    formNeedOptions: ['Surveillance', 'Géothermie', 'Instrumentation', 'Analyse / données', 'Autre'],
    formMessage: 'Message',
    formMessagePlaceholder: 'Contexte, localisation, objectif, contraintes, délai…',
    mapEyebrow: 'Installations',
    mapHeading: 'Présence opérationnelle en Suisse',
    mapText: 'Une représentation structurée des sites d’installation et de surveillance, avec lecture des zones de couverture et du niveau de vigilance.',
    legendTitle: 'Lecture de la carte',
    legendA: 'Nœud actif',
    legendB: 'Zone de couverture',
    legendC: 'Signal de détection',
    legendD: 'Liaison réseau',
    riskTitle: 'Niveaux de vigilance',
    riskLow: 'Standard',
    riskMedium: 'Renforcé',
    riskHigh: 'Sensible',
    mapCardTitle: 'Carte des installations',
    mapCardText: 'Vue d’ensemble du réseau de sites, du relief et des zones d’attention.',
    mapNote: 'Le Valais concentre la majorité des nœuds à couverture dense.',
    widgetsTitle: 'Fiches sites',
    widgetLabel: 'Site actif',
    coverageLabel: 'Portée',
    vigilanceLabel: 'Niveau',
  },
  en: {
    langLabel: 'EN',
    nav: { services: 'Services', about: 'About', contact: 'Contact' },
    eyebrow: 'Environmental systems · Geoscience · Geothermal',
    title: 'Monitoring, expertise and data for safer field decisions.',
    intro:
      'GeoAzimut designs and deploys measurement and analysis systems for demanding environments, with a clear, structured and professional delivery approach.',
    primaryCta: 'Get in touch',
    secondaryCta: 'View services',
    stats: [
      { value: '2011', label: 'Founded in Fribourg' },
      { value: 'Swiss', label: 'Field-based approach' },
      { value: 'End-to-end', label: 'Study to commissioning' },
    ],
    metricMain: {
      label: 'Monitoring',
      title: 'Reliable systems for real conditions',
      text: 'Designed for operational continuity, readable data and faster interpretation in the field.',
    },
    metricSide: { label: 'Method', title: 'Study, deployment and technical follow-up' },
    highlights: [
      'Swiss engineering',
      'Structured delivery',
      'Clear field visibility',
      'Responsive technical support',
    ],
    servicesHeading: 'Technical services built around outcomes',
    servicesIntro:
      'A structured offering to monitor, analyse and turn field data into usable operational insight.',
    services: [
      {
        title: 'Environmental monitoring',
        text: 'Instrumentation and monitoring for sensitive terrain, infrastructure and natural hazards.',
      },
      {
        title: 'Geothermal expertise',
        text: 'Technical support for TRT testing, studies, result interpretation and operational framing.',
      },
      {
        title: 'Data and visualisation',
        text: 'A complete chain for acquisition, structuring and reporting of information that matters.',
      },
    ],
    aboutHeading: 'Technical expertise made readable',
    aboutText:
      'GeoAzimut focuses on robust solutions, clear deliverables and a working relationship that remains simple for both clients and technical teams.',
    approach: 'Approach',
    approachValue: 'Precise, structured, pragmatic',
    focus: 'Priority',
    focusValue: 'Systems that remain dependable over time',
    outcome: 'Expected outcome',
    outcomeValue: 'Better visibility, better responsiveness, better decisions',
    contactHeading: 'Discuss a technical requirement',
    contactText:
      'Share the site context, objective and constraints. A first qualification helps direct the right technical response quickly.',
    contactButton: 'Send inquiry',
    contactMeta: 'Indicative reply within 1 to 2 business days',
    formName: 'Name',
    formCompany: 'Company',
    formEmail: 'Email',
    formPhone: 'Phone',
    formNeed: 'Need type',
    formNeedPlaceholder: 'Select',
    formNeedOptions: ['Monitoring', 'Geothermal', 'Instrumentation', 'Data / analysis', 'Other'],
    formMessage: 'Message',
    formMessagePlaceholder: 'Context, location, objective, constraints, timing…',
    mapEyebrow: 'Installations',
    mapHeading: 'Operational presence across Switzerland',
    mapText: 'A structured representation of installation and monitoring sites with visibility on coverage zones and watch levels.',
    legendTitle: 'Map legend',
    legendA: 'Active node',
    legendB: 'Coverage zone',
    legendC: 'Detection pulse',
    legendD: 'Network link',
    riskTitle: 'Watch levels',
    riskLow: 'Standard',
    riskMedium: 'Elevated',
    riskHigh: 'Sensitive',
    mapCardTitle: 'Installation map',
    mapCardText: 'Overall view of the site network, terrain and areas of attention.',
    mapNote: 'Valais concentrates most of the dense-coverage nodes in the network.',
    widgetsTitle: 'Site cards',
    widgetLabel: 'Active site',
    coverageLabel: 'Coverage',
    vigilanceLabel: 'Level',
  },
  de: {
    langLabel: 'DE',
    nav: { services: 'Leistungen', about: 'Über uns', contact: 'Kontakt' },
    eyebrow: 'Umweltsysteme · Geowissenschaften · Geothermie',
    title: 'Monitoring, Fachkompetenz und Daten für fundiertere Entscheidungen im Feld.',
    intro:
      'GeoAzimut entwickelt und betreibt Mess- und Analysesysteme für anspruchsvolle Umgebungen – klar, strukturiert und professionell umgesetzt.',
    primaryCta: 'Kontakt aufnehmen',
    secondaryCta: 'Leistungen ansehen',
    stats: [
      { value: '2011', label: 'Gegründet in Freiburg' },
      { value: 'Schweiz', label: 'Praxisnahe Arbeitsweise' },
      { value: 'Ganzheitlich', label: 'Von Studie bis Inbetriebnahme' },
    ],
    metricMain: {
      label: 'Monitoring',
      title: 'Zuverlässige Systeme für reale Bedingungen',
      text: 'Ausgelegt auf Betriebssicherheit, klare Datennutzung und schnelle Interpretation im Feld.',
    },
    metricSide: { label: 'Methode', title: 'Studie, Umsetzung und technische Begleitung' },
    highlights: [
      'Schweizer Ingenieuransatz',
      'Strukturierte Umsetzung',
      'Klare Sicht auf das Feld',
      'Reaktiver technischer Support',
    ],
    servicesHeading: 'Technische Leistungen mit klarem Ergebnisfokus',
    servicesIntro:
      'Ein strukturiertes Angebot, um zu überwachen, zu analysieren und Felddaten nutzbar zu machen.',
    services: [
      {
        title: 'Umweltmonitoring',
        text: 'Instrumentierung und Überwachung für sensibles Gelände, Infrastrukturen und Naturgefahren.',
      },
      {
        title: 'Geothermie-Kompetenz',
        text: 'Technische Unterstützung für TRT-Tests, Studien, Resultatinterpretation und operative Einordnung.',
      },
      {
        title: 'Daten und Visualisierung',
        text: 'Vollständige Kette für Erfassung, Strukturierung und verständliche Auswertung relevanter Informationen.',
      },
    ],
    aboutHeading: 'Technische Kompetenz verständlich dargestellt',
    aboutText:
      'GeoAzimut setzt auf robuste Lösungen, klare Ergebnisse und eine Zusammenarbeit, die für Auftraggeber und technische Teams einfach bleibt.',
    approach: 'Ansatz',
    approachValue: 'Präzise, strukturiert, pragmatisch',
    focus: 'Priorität',
    focusValue: 'Systeme, die langfristig belastbar bleiben',
    outcome: 'Erwarteter Nutzen',
    outcomeValue: 'Mehr Übersicht, schnellere Reaktion, bessere Entscheidungen',
    contactHeading: 'Einen technischen Bedarf besprechen',
    contactText:
      'Beschreiben Sie Standort, Ziel und Rahmenbedingungen. Eine erste Einordnung hilft, rasch die passende technische Antwort zu formulieren.',
    contactButton: 'Anfrage senden',
    contactMeta: 'Rückmeldung in der Regel innerhalb von 1 bis 2 Werktagen',
    formName: 'Name',
    formCompany: 'Unternehmen',
    formEmail: 'E-Mail',
    formPhone: 'Telefon',
    formNeed: 'Bedarfsart',
    formNeedPlaceholder: 'Auswählen',
    formNeedOptions: ['Monitoring', 'Geothermie', 'Instrumentierung', 'Daten / Analyse', 'Andere'],
    formMessage: 'Nachricht',
    formMessagePlaceholder: 'Kontext, Ort, Ziel, Randbedingungen, Zeitrahmen…',
    mapEyebrow: 'Installationen',
    mapHeading: 'Operative Präsenz in der ganzen Schweiz',
    mapText: 'Eine strukturierte Darstellung der Installations- und Überwachungsstandorte mit Abdeckungszonen und Wachsamkeitsstufen.',
    legendTitle: 'Kartenlegende',
    legendA: 'Aktiver Knoten',
    legendB: 'Abdeckungszone',
    legendC: 'Erkennungssignal',
    legendD: 'Netzverbindung',
    riskTitle: 'Wachsamkeitsstufen',
    riskLow: 'Standard',
    riskMedium: 'Erhöht',
    riskHigh: 'Sensibel',
    mapCardTitle: 'Installationskarte',
    mapCardText: 'Gesamtansicht des Standortnetzes, des Reliefs und der Aufmerksamkeitszonen.',
    mapNote: 'Das Wallis bündelt den grössten Teil der dicht überwachten Knoten des Netzwerks.',
    widgetsTitle: 'Standortkarten',
    widgetLabel: 'Aktiver Standort',
    coverageLabel: 'Abdeckung',
    vigilanceLabel: 'Stufe',
  },
}

const languageOrder = ['fr', 'en', 'de']
const installations = [
  { name: 'Champéry', coords: [46.17543, 6.86903], danger: 180, level: 'medium' },
  { name: 'Echallens', coords: [46.633, 6.633], danger: 220, level: 'low' },
  { name: 'La Fouly', coords: [46.071, 7.101], danger: 280, level: 'high' },
  { name: 'St-Sulpice', coords: [46.511, 6.559], danger: 180, level: 'low' },
  { name: 'Gottéron (Fribourg)', coords: [46.806, 7.162], danger: 220, level: 'medium' },
  { name: 'Vens', coords: [46.033, 7.14], danger: 320, level: 'high' },
  { name: 'Torrent St-Barthélémy', coords: [46.09, 7.2], danger: 260, level: 'high' },
  { name: 'Le Frachey', coords: [46.08, 7.16], danger: 220, level: 'medium' },
  { name: 'Le Pissot', coords: [46.06, 7.18], danger: 210, level: 'medium' },
  { name: 'Fregnoley', coords: [46.05, 7.15], danger: 230, level: 'medium' },
  { name: 'Comblonard', coords: [46.04, 7.17], danger: 240, level: 'medium' },
  { name: 'Blatten', coords: [46.422, 7.82], danger: 300, level: 'high' },
  { name: 'Les Ars', coords: [46.06, 7.13], danger: 210, level: 'medium' },
  { name: "Torrent de l'Echerche", coords: [46.02, 7.12], danger: 280, level: 'high' },
  { name: 'Sé de la Raide', coords: [46.05, 7.14], danger: 230, level: 'medium' },
]
const networkLinks = [
  ['Echallens', 'St-Sulpice'],
  ['St-Sulpice', 'Champéry'],
  ['Champéry', 'La Fouly'],
  ['La Fouly', 'Vens'],
  ['Vens', 'Torrent St-Barthélémy'],
  ['Torrent St-Barthélémy', 'Blatten'],
  ['Gottéron (Fribourg)', 'Echallens'],
]
const installationByName = Object.fromEntries(installations.map((site) => [site.name, site]))
const levelStyles = {
  low: { marker: '#6ea6d8', pulse: '#88b8e3', fill: '#dbeaf7' },
  medium: { marker: '#4f89bf', pulse: '#6ca6d8', fill: '#d0e4f7' },
  high: { marker: '#c76a4f', pulse: '#d88b73', fill: '#f5ddd5' },
}

function App() {
  const [language, setLanguage] = useState('fr')
  const t = useMemo(() => content[language], [language])

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="brand brand-with-logo">
          <img src="/original-assets/logo_geoazimut.png" alt="GeoAzimut" className="brand-logo" />
        </div>
        <div className="topbar-actions">
          <nav className="nav">
            <a href="#services">{t.nav.services}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="language-switcher" aria-label="Language switcher">
            {languageOrder.map((lang) => (
              <button key={lang} type="button" className={`lang-pill ${language === lang ? 'active' : ''}`} onClick={() => setLanguage(lang)}>
                {content[lang].langLabel}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">{t.primaryCta}</a>
              <a className="button button-secondary" href="#services">{t.secondaryCta}</a>
            </div>
            <div className="stats-row">
              {t.stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual-wrap">
            <div className="hero-card hero-card-clean">
              <img src="/original-assets/landscape.jpeg" alt="Mountain landscape and monitoring environment" className="hero-photo" />
              <div className="hero-overlay" />
            </div>
            <div className="hero-summary-panel">
              <div>
                <small>{t.metricMain.label}</small>
                <strong>{t.metricMain.title}</strong>
                <p>{t.metricMain.text}</p>
              </div>
              <div>
                <small>{t.metricSide.label}</small>
                <strong>{t.metricSide.title}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="strip">
          {t.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </section>

        <section className="section" id="services">
          <div className="section-heading">
            <span className="eyebrow">{t.nav.services}</span>
            <h2>{t.servicesHeading}</h2>
            <p>{t.servicesIntro}</p>
          </div>
          <div className="services-grid">
            {t.services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon" aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section feature-section" id="about">
          <div className="feature-copy">
            <span className="eyebrow">{t.nav.about}</span>
            <h2>{t.aboutHeading}</h2>
            <p>{t.aboutText}</p>
          </div>
          <div className="feature-panel">
            <div>
              <small>{t.approach}</small>
              <strong>{t.approachValue}</strong>
            </div>
            <div>
              <small>{t.focus}</small>
              <strong>{t.focusValue}</strong>
            </div>
            <div>
              <small>{t.outcome}</small>
              <strong>{t.outcomeValue}</strong>
            </div>
          </div>
        </section>

        <section className="section map-section" id="installations">
          <div className="section-heading map-heading-row">
            <div>
              <span className="eyebrow">{t.mapEyebrow}</span>
              <h2>{t.mapHeading}</h2>
              <p>{t.mapText}</p>
            </div>
          </div>
          <div className="map-layout">
            <div className="osm-map-card white-map-card topo-map-card">
              <div className="map-card-header">
                <div>
                  <small>{t.mapEyebrow}</small>
                  <strong>{t.mapCardTitle}</strong>
                </div>
                <p>{t.mapCardText}</p>
              </div>
              <div className="map-callout">
                <span className="map-callout-dot" />
                <span>{t.mapNote}</span>
              </div>
              <MapContainer center={[46.35, 7.15]} zoom={8} scrollWheelZoom={false} className="leaflet-map light-map">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.openstreetmap.org/#map=1/71.6/-96.5">OpenTopoMap</a>' url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
                {networkLinks.map(([from, to]) => (
                  <Polyline key={`${from}-${to}`} positions={[installationByName[from].coords, installationByName[to].coords]} pathOptions={{ color: '#8aa9c9', weight: 2, opacity: 0.55, dashArray: '6 8' }} />
                ))}
                {installations.map((site, index) => {
                  const style = levelStyles[site.level]
                  return (
                    <div key={site.name}>
                      <Circle center={site.coords} radius={site.danger * 0.9} pathOptions={{ color: style.pulse, weight: 1, fillColor: style.fill, fillOpacity: 0.14, className: `radar-ring radar-ring-${(index % 3) + 1}` }} />
                      <Circle center={site.coords} radius={site.danger * 1.45} pathOptions={{ color: style.pulse, weight: 1, fillColor: style.fill, fillOpacity: 0.07, className: `radar-ring radar-ring-${((index + 1) % 3) + 1}` }} />
                      <CircleMarker center={site.coords} radius={8} pathOptions={{ color: '#ffffff', weight: 3, fillColor: style.marker, fillOpacity: 1, className: 'node-marker light-node-marker' }}>
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} className="map-tooltip light-tooltip" permanent={false}>{site.name}</Tooltip>
                        <Popup>{site.name}</Popup>
                      </CircleMarker>
                    </div>
                  )
                })}
              </MapContainer>
            </div>
            <div className="installations-side-panel white-side-panel">
              <div className="map-legend-card white-legend-card">
                <strong>{t.legendTitle}</strong>
                <div className="legend-item legend-item-dark"><span className="legend-node light-legend-node" /><span>{t.legendA}</span></div>
                <div className="legend-item legend-item-dark"><span className="legend-zone light-legend-zone" /><span>{t.legendB}</span></div>
                <div className="legend-item legend-item-dark"><span className="legend-pulse light-legend-pulse" /><span>{t.legendC}</span></div>
                <div className="legend-item legend-item-dark"><span className="legend-line" /><span>{t.legendD}</span></div>
              </div>
              <div className="map-legend-card white-legend-card risk-card">
                <strong>{t.riskTitle}</strong>
                <div className="legend-item legend-item-dark"><span className="risk-swatch risk-low" /><span>{t.riskLow}</span></div>
                <div className="legend-item legend-item-dark"><span className="risk-swatch risk-medium" /><span>{t.riskMedium}</span></div>
                <div className="legend-item legend-item-dark"><span className="risk-swatch risk-high" /><span>{t.riskHigh}</span></div>
              </div>
              <div className="widgets-panel white-list-card-inner">
                <strong className="widgets-title">{t.widgetsTitle}</strong>
                <div className="node-widget-grid">
                  {installations.map((site) => (
                    <div className="node-widget" key={site.name}>
                      <div className="node-widget-top">
                        <span className={`installation-dot installation-dot-live installation-dot-${site.level}`} />
                        <span className="node-widget-badge">{t.widgetLabel}</span>
                      </div>
                      <strong>{site.name}</strong>
                      <div className="node-widget-meta">
                        <span>{t.coverageLabel}: {site.danger} m</span>
                        <span>{t.vigilanceLabel}: {site.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow">{t.nav.contact}</span>
            <h2>{t.contactHeading}</h2>
            <p>{t.contactText}</p>
            <small className="contact-meta">{t.contactMeta}</small>
          </div>
          <form className="contact-form">
            <div className="form-grid two-cols">
              <label><span>{t.formName}</span><input type="text" name="name" /></label>
              <label><span>{t.formCompany}</span><input type="text" name="company" /></label>
            </div>
            <div className="form-grid two-cols">
              <label><span>{t.formEmail}</span><input type="email" name="email" /></label>
              <label><span>{t.formPhone}</span><input type="tel" name="phone" /></label>
            </div>
            <label>
              <span>{t.formNeed}</span>
              <select name="need" defaultValue="">
                <option value="" disabled>{t.formNeedPlaceholder}</option>
                {t.formNeedOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label><span>{t.formMessage}</span><textarea name="message" rows="6" placeholder={t.formMessagePlaceholder} /></label>
            <button type="submit" className="button button-primary form-submit">{t.contactButton}</button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
