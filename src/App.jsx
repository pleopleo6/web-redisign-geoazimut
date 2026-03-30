import './App.css'
import 'leaflet/dist/leaflet.css'
import { useMemo, useState } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'

const content = {
  fr: {
    langLabel: 'FR',
    nav: { services: 'Services', about: 'À propos', contact: 'Contact' },
    eyebrow: 'Systèmes environnementaux · Géosciences · Géothermie',
    title: 'Des solutions de terrain claires, fiables et précises.',
    intro:
      'GeoAzimut accompagne les entreprises et les collectivités avec des systèmes de mesure, des analyses et un support technique pensés pour des décisions concrètes.',
    primaryCta: 'Nous contacter',
    secondaryCta: 'Découvrir les services',
    stats: [
      { value: '2011', label: 'Fondée à Fribourg' },
      { value: 'Suisse', label: 'Expertise de terrain' },
      { value: 'De bout en bout', label: 'Étude à déploiement' },
    ],
    metricMain: {
      label: 'Surveillance',
      title: 'Systèmes prêts pour le terrain',
      text: 'Pensés pour des environnements exigeants et une lecture claire des données.',
    },
    metricSide: { label: 'Accompagnement', title: 'Du diagnostic à la mise en service' },
    highlights: [
      'Approche d’ingénierie suisse',
      'Exécution simple et rigoureuse',
      'Solutions adaptées au terrain',
      'Support technique réactif',
    ],
    servicesHeading: 'Ce que GeoAzimut apporte à ses clients',
    servicesIntro:
      'Une présentation directe des expertises essentielles, sans surcharge inutile.',
    services: [
      {
        title: 'Surveillance environnementale',
        text: 'Systèmes de mesure fiables pour terrains sensibles, infrastructures et dangers naturels.',
      },
      {
        title: 'Expertise en géothermie',
        text: 'Support clair pour essais TRT, analyses de terrain et études techniques.',
      },
      {
        title: 'Données & alertes',
        text: 'De la collecte au tableau de bord, avec une information exploitable rapidement.',
      },
    ],
    aboutHeading: 'Une expertise technique présentée avec clarté',
    aboutText:
      'L’objectif n’est pas de compliquer. Il est de livrer une solution robuste, bien expliquée et simple à exploiter pour le client.',
    approach: 'Approche',
    approachValue: 'Précise, calme, pratique',
    focus: 'Priorité',
    focusValue: 'Des systèmes utiles dans des conditions réelles',
    outcome: 'Résultat',
    outcomeValue: 'Plus de visibilité, de meilleures décisions, moins de friction',
    contactHeading: 'Besoin d’une solution simple et sérieuse ?',
    contactText:
      'Expliquez votre besoin de mesure, de surveillance ou d’analyse. Nous revenons avec une proposition claire.',
    contactButton: 'info@geoazimut.com',
    mapEyebrow: 'Installations',
    mapHeading: 'Présence sur le terrain en Suisse',
    mapText: 'Carte OpenStreetMap des sites d’installation et d’intervention fournis.',
  },
  en: {
    langLabel: 'EN',
    nav: { services: 'Services', about: 'About', contact: 'Contact' },
    eyebrow: 'Environmental systems · Geoscience · Geothermal',
    title: 'Clear, dependable solutions for complex field conditions.',
    intro:
      'GeoAzimut supports companies and public organisations with measurement systems, analysis and technical guidance built for practical decisions.',
    primaryCta: 'Contact us',
    secondaryCta: 'Explore services',
    stats: [
      { value: '2011', label: 'Founded in Fribourg' },
      { value: 'Swiss', label: 'Field-based expertise' },
      { value: 'End-to-end', label: 'Study to deployment' },
    ],
    metricMain: {
      label: 'Monitoring',
      title: 'Field-ready systems',
      text: 'Designed for demanding environments and clear interpretation of the data.',
    },
    metricSide: { label: 'Support', title: 'From assessment to commissioning' },
    highlights: [
      'Swiss engineering mindset',
      'Straightforward project delivery',
      'Solutions shaped by real terrain',
      'Responsive technical support',
    ],
    servicesHeading: 'What GeoAzimut delivers to customers',
    servicesIntro: 'A direct presentation of the essential expertise, without unnecessary complexity.',
    services: [
      {
        title: 'Environmental monitoring',
        text: 'Reliable measurement systems for sensitive terrain, infrastructure and natural hazards.',
      },
      {
        title: 'Geothermal expertise',
        text: 'Clear support for TRT testing, field analysis and technical studies.',
      },
      {
        title: 'Data & alerts',
        text: 'From acquisition to dashboard, with information that is immediately usable.',
      },
    ],
    aboutHeading: 'Technical expertise, expressed clearly',
    aboutText:
      'The goal is not to overwhelm. It is to deliver a robust solution, explain it well and make it easy to use.',
    approach: 'Approach',
    approachValue: 'Precise, calm, practical',
    focus: 'Focus',
    focusValue: 'Useful systems that perform in real conditions',
    outcome: 'Outcome',
    outcomeValue: 'Better visibility, stronger decisions, less friction',
    contactHeading: 'Need a straightforward solution?',
    contactText:
      'Tell us what you need to measure, monitor or understand. We will come back with a clear proposal.',
    contactButton: 'info@geoazimut.com',
    mapEyebrow: 'Installations',
    mapHeading: 'Field presence across Switzerland',
    mapText: 'OpenStreetMap view of the provided installation and intervention sites.',
  },
  de: {
    langLabel: 'DE',
    nav: { services: 'Leistungen', about: 'Über uns', contact: 'Kontakt' },
    eyebrow: 'Umweltsysteme · Geowissenschaften · Geothermie',
    title: 'Klare und verlässliche Lösungen für anspruchsvolle Einsätze im Feld.',
    intro:
      'GeoAzimut unterstützt Unternehmen und öffentliche Auftraggeber mit Messsystemen, Analysen und technischer Begleitung für konkrete Entscheidungen.',
    primaryCta: 'Kontakt aufnehmen',
    secondaryCta: 'Leistungen ansehen',
    stats: [
      { value: '2011', label: 'Gegründet in Freiburg' },
      { value: 'Schweiz', label: 'Praxisnahe Expertise' },
      { value: 'Ganzheitlich', label: 'Von Studie bis Einsatz' },
    ],
    metricMain: {
      label: 'Überwachung',
      title: 'Systeme für reale Einsatzbedingungen',
      text: 'Konzipiert für anspruchsvolle Umgebungen und eine klare Auswertung der Daten.',
    },
    metricSide: { label: 'Begleitung', title: 'Von der Analyse bis zur Inbetriebnahme' },
    highlights: [
      'Schweizer Ingenieuransatz',
      'Klare und saubere Umsetzung',
      'Lösungen für echte Geländeanforderungen',
      'Schneller technischer Support',
    ],
    servicesHeading: 'Was GeoAzimut seinen Kunden bietet',
    servicesIntro: 'Eine direkte Darstellung der wichtigsten Kompetenzen ohne unnötige Komplexität.',
    services: [
      {
        title: 'Umweltmonitoring',
        text: 'Zuverlässige Messsysteme für sensibles Gelände, Infrastrukturen und Naturgefahren.',
      },
      {
        title: 'Geothermie-Kompetenz',
        text: 'Klare Unterstützung für TRT-Tests, Feldanalysen und technische Studien.',
      },
      {
        title: 'Daten & Alarme',
        text: 'Von der Erfassung bis zum Dashboard mit Informationen, die direkt nutzbar sind.',
      },
    ],
    aboutHeading: 'Technische Kompetenz, klar vermittelt',
    aboutText:
      'Es geht nicht darum zu überladen. Es geht darum, eine robuste Lösung zu liefern, sie klar zu erklären und einfach nutzbar zu machen.',
    approach: 'Ansatz',
    approachValue: 'Präzise, ruhig, praxisnah',
    focus: 'Fokus',
    focusValue: 'Nützliche Systeme für reale Bedingungen',
    outcome: 'Ergebnis',
    outcomeValue: 'Mehr Übersicht, bessere Entscheidungen, weniger Reibung',
    contactHeading: 'Brauchen Sie eine klare und solide Lösung?',
    contactText:
      'Beschreiben Sie Ihren Bedarf für Messung, Überwachung oder Analyse. Wir melden uns mit einem klaren Vorschlag.',
    contactButton: 'info@geoazimut.com',
    mapEyebrow: 'Installationen',
    mapHeading: 'Präsenz im Feld in der ganzen Schweiz',
    mapText: 'OpenStreetMap-Ansicht der bereitgestellten Installations- und Einsatzorte.',
  },
}

const languageOrder = ['fr', 'en', 'de']

const installations = [
  { name: 'Champéry', coords: [46.17543, 6.86903] },
  { name: 'Echallens', coords: [46.633, 6.633] },
  { name: 'La Fouly', coords: [46.071, 7.101] },
  { name: 'St-Sulpice', coords: [46.511, 6.559] },
  { name: 'Gottéron (Fribourg)', coords: [46.806, 7.162] },
  { name: 'Vens', coords: [46.033, 7.14] },
  { name: 'Torrent St-Barthélémy', coords: [46.09, 7.2] },
  { name: 'Le Frachey', coords: [46.08, 7.16] },
  { name: 'Le Pissot', coords: [46.06, 7.18] },
  { name: 'Fregnoley', coords: [46.05, 7.15] },
  { name: 'Comblonard', coords: [46.04, 7.17] },
  { name: 'Blatten', coords: [46.422, 7.82] },
  { name: 'Les Ars', coords: [46.06, 7.13] },
  { name: "Torrent de l'Echerche", coords: [46.02, 7.12] },
  { name: 'Sé de la Raide', coords: [46.05, 7.14] },
]

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
              <button
                key={lang}
                type="button"
                className={`lang-pill ${language === lang ? 'active' : ''}`}
                onClick={() => setLanguage(lang)}
              >
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
              <img
                src="/original-assets/landscape.jpeg"
                alt="Mountain landscape and monitoring environment"
                className="hero-photo"
              />
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
          <div className="section-heading">
            <span className="eyebrow">{t.mapEyebrow}</span>
            <h2>{t.mapHeading}</h2>
            <p>{t.mapText}</p>
          </div>

          <div className="map-layout">
            <div className="osm-map-card">
              <MapContainer center={[46.35, 7.15]} zoom={8} scrollWheelZoom={false} className="leaflet-map">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {installations.map((site) => (
                  <CircleMarker
                    key={site.name}
                    center={site.coords}
                    radius={8}
                    pathOptions={{
                      color: '#ffffff',
                      weight: 3,
                      fillColor: '#1f4566',
                      fillOpacity: 1,
                    }}
                  >
                    <Popup>{site.name}</Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>

            <div className="installations-list-card">
              {installations.map((site) => (
                <div className="installation-item" key={site.name}>
                  <span className="installation-dot" />
                  <span>{site.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta-section" id="contact">
          <div>
            <span className="eyebrow">{t.nav.contact}</span>
            <h2>{t.contactHeading}</h2>
            <p>{t.contactText}</p>
          </div>
          <a className="button button-primary" href="mailto:info@geoazimut.com">
            {t.contactButton}
          </a>
        </section>
      </main>
    </div>
  )
}

export default App
