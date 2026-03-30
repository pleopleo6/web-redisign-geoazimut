import './App.css'
import 'leaflet/dist/leaflet.css'
import { useMemo, useState } from 'react'
import { Circle, CircleMarker, MapContainer, Popup, TileLayer, Tooltip, Polyline } from 'react-leaflet'

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
    contactHeading: 'Parlons de votre projet',
    contactText:
      'Décrivez brièvement votre besoin. Cette demande peut servir de premier point de contact avant un échange plus technique.',
    contactButton: 'Envoyer la demande',
    contactMeta: 'Réponse typique sous 1 à 2 jours ouvrés',
    formName: 'Nom',
    formCompany: 'Société',
    formEmail: 'Email',
    formPhone: 'Téléphone',
    formNeed: 'Type de besoin',
    formNeedPlaceholder: 'Choisir',
    formNeedOptions: ['Surveillance', 'Géothermie', 'Analyse de données', 'Autre'],
    formMessage: 'Message',
    formMessagePlaceholder: 'Contexte du site, objectif, urgence, localisation…',
    mapEyebrow: 'Installations',
    mapHeading: 'Réseau d’installations en Suisse',
    mapText: 'Une lecture plus éditoriale et plus nette du réseau de surveillance, avec nœuds actifs, zones de couverture, catégories de risque et relief cartographique.',
    legendTitle: 'Lecture de la carte',
    legendA: 'Nœud actif',
    legendB: 'Zone de couverture',
    legendC: 'Signal de détection',
    legendD: 'Liaison réseau',
    riskTitle: 'Niveaux de vigilance',
    riskLow: 'Vigilance standard',
    riskMedium: 'Vigilance renforcée',
    riskHigh: 'Zone sensible',
    mapCardTitle: 'Carte des installations',
    mapCardText: 'Visualisation des points d’intervention, du relief et des zones de détection.',
    mapNote: 'Les nœuds valaisans concentrent les zones de détection les plus denses du réseau.',
    widgetsTitle: 'Nœuds du réseau',
    widgetLabel: 'Nœud actif',
    coverageLabel: 'Portée',
    vigilanceLabel: 'Niveau',
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
    contactHeading: 'Let’s discuss your project',
    contactText:
      'Share the essentials of your need. This form works as a clear first contact before a more technical exchange.',
    contactButton: 'Send inquiry',
    contactMeta: 'Typical reply within 1 to 2 business days',
    formName: 'Name',
    formCompany: 'Company',
    formEmail: 'Email',
    formPhone: 'Phone',
    formNeed: 'Need type',
    formNeedPlaceholder: 'Select',
    formNeedOptions: ['Monitoring', 'Geothermal', 'Data analysis', 'Other'],
    formMessage: 'Message',
    formMessagePlaceholder: 'Site context, objective, urgency, location…',
    mapEyebrow: 'Installations',
    mapHeading: 'Installation network across Switzerland',
    mapText: 'A cleaner editorial reading of the monitoring network, with active nodes, coverage zones, risk categories and topographic relief.',
    legendTitle: 'Map legend',
    legendA: 'Active node',
    legendB: 'Coverage zone',
    legendC: 'Detection pulse',
    legendD: 'Network link',
    riskTitle: 'Risk categories',
    riskLow: 'Standard watch',
    riskMedium: 'Elevated watch',
    riskHigh: 'Sensitive zone',
    mapCardTitle: 'Installation map',
    mapCardText: 'Visualisation of intervention points, terrain relief and detection coverage areas.',
    mapNote: 'The Valais cluster concentrates the densest detection coverage in the network.',
    widgetsTitle: 'Network nodes',
    widgetLabel: 'Active node',
    coverageLabel: 'Coverage',
    vigilanceLabel: 'Level',
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
    contactHeading: 'Sprechen wir über Ihr Projekt',
    contactText:
      'Beschreiben Sie kurz Ihren Bedarf. Dieses Formular dient als klarer erster Kontakt vor einer vertieften technischen Abstimmung.',
    contactButton: 'Anfrage senden',
    contactMeta: 'Typische Rückmeldung innerhalb von 1 bis 2 Werktagen',
    formName: 'Name',
    formCompany: 'Unternehmen',
    formEmail: 'E-Mail',
    formPhone: 'Telefon',
    formNeed: 'Art des Bedarfs',
    formNeedPlaceholder: 'Auswählen',
    formNeedOptions: ['Monitoring', 'Geothermie', 'Datenanalyse', 'Andere'],
    formMessage: 'Nachricht',
    formMessagePlaceholder: 'Standortkontext, Ziel, Dringlichkeit, Ort…',
    mapEyebrow: 'Installationen',
    mapHeading: 'Installationsnetz in der ganzen Schweiz',
    mapText: 'Eine klarere und editoriale Darstellung des Überwachungsnetzes mit aktiven Knoten, Abdeckungszonen, Risikokategorien und topografischem Relief.',
    legendTitle: 'Kartenlegende',
    legendA: 'Aktiver Knoten',
    legendB: 'Abdeckungszone',
    legendC: 'Erkennungssignal',
    legendD: 'Netzverbindung',
    riskTitle: 'Risikokategorien',
    riskLow: 'Standardüberwachung',
    riskMedium: 'Erhöhte Überwachung',
    riskHigh: 'Sensibler Bereich',
    mapCardTitle: 'Installationskarte',
    mapCardText: 'Visualisierung der Einsatzpunkte, des Reliefs und der Erfassungsbereiche.',
    mapNote: 'Die Walliser Standorte bilden den dichtesten Erfassungsbereich des Netzwerks.',
    widgetsTitle: 'Netzknoten',
    widgetLabel: 'Aktiver Knoten',
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
  low: {
    marker: '#6ea6d8',
    pulse: '#88b8e3',
    fill: '#dbeaf7',
  },
  medium: {
    marker: '#4f89bf',
    pulse: '#6ca6d8',
    fill: '#d0e4f7',
  },
  high: {
    marker: '#c76a4f',
    pulse: '#d88b73',
    fill: '#f5ddd5',
  },
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
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.openstreetmap.org/#map=1/71.6/-96.5">OpenTopoMap</a>'
                  url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                />

                {networkLinks.map(([from, to]) => (
                  <Polyline
                    key={`${from}-${to}`}
                    positions={[installationByName[from].coords, installationByName[to].coords]}
                    pathOptions={{
                      color: '#8aa9c9',
                      weight: 2,
                      opacity: 0.55,
                      dashArray: '6 8',
                    }}
                  />
                ))}

                {installations.map((site, index) => {
                  const style = levelStyles[site.level]
                  return (
                    <div key={site.name}>
                      <Circle
                        center={site.coords}
                        radius={site.danger * 0.9}
                        pathOptions={{
                          color: style.pulse,
                          weight: 1,
                          fillColor: style.fill,
                          fillOpacity: 0.16,
                          className: `radar-ring radar-ring-${(index % 3) + 1}`,
                        }}
                      />
                      <Circle
                        center={site.coords}
                        radius={site.danger * 1.45}
                        pathOptions={{
                          color: style.pulse,
                          weight: 1,
                          fillColor: style.fill,
                          fillOpacity: 0.08,
                          className: `radar-ring radar-ring-${((index + 1) % 3) + 1}`,
                        }}
                      />
                      <CircleMarker
                        center={site.coords}
                        radius={9}
                        pathOptions={{
                          color: '#ffffff',
                          weight: 3,
                          fillColor: style.marker,
                          fillOpacity: 1,
                          className: 'node-marker light-node-marker',
                        }}
                      >
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} className="map-tooltip light-tooltip" permanent={false}>
                          {site.name}
                        </Tooltip>
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
                <div className="legend-item legend-item-dark">
                  <span className="legend-node light-legend-node" />
                  <span>{t.legendA}</span>
                </div>
                <div className="legend-item legend-item-dark">
                  <span className="legend-zone light-legend-zone" />
                  <span>{t.legendB}</span>
                </div>
                <div className="legend-item legend-item-dark">
                  <span className="legend-pulse light-legend-pulse" />
                  <span>{t.legendC}</span>
                </div>
                <div className="legend-item legend-item-dark">
                  <span className="legend-line" />
                  <span>{t.legendD}</span>
                </div>
              </div>

              <div className="map-legend-card white-legend-card risk-card">
                <strong>{t.riskTitle}</strong>
                <div className="legend-item legend-item-dark">
                  <span className="risk-swatch risk-low" />
                  <span>{t.riskLow}</span>
                </div>
                <div className="legend-item legend-item-dark">
                  <span className="risk-swatch risk-medium" />
                  <span>{t.riskMedium}</span>
                </div>
                <div className="legend-item legend-item-dark">
                  <span className="risk-swatch risk-high" />
                  <span>{t.riskHigh}</span>
                </div>
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
              <label>
                <span>{t.formName}</span>
                <input type="text" name="name" />
              </label>
              <label>
                <span>{t.formCompany}</span>
                <input type="text" name="company" />
              </label>
            </div>

            <div className="form-grid two-cols">
              <label>
                <span>{t.formEmail}</span>
                <input type="email" name="email" />
              </label>
              <label>
                <span>{t.formPhone}</span>
                <input type="tel" name="phone" />
              </label>
            </div>

            <label>
              <span>{t.formNeed}</span>
              <select name="need" defaultValue="">
                <option value="" disabled>
                  {t.formNeedPlaceholder}
                </option>
                {t.formNeedOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>{t.formMessage}</span>
              <textarea name="message" rows="6" placeholder={t.formMessagePlaceholder} />
            </label>

            <button type="submit" className="button button-primary form-submit">
              {t.contactButton}
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
