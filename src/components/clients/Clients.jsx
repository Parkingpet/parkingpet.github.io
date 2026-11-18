import React from 'react';
import { resumeData } from '../../resumeData';

const sectors = {
  "Infrastructure and communications": [
    "Flo.Solutions",
    "LANgineers",
    "Lumibuild"
  ],
  "Media and community arts": [
    "Eastside Arts Alliance",
    "Poor Magazine",
    "RevisionFX"
  ],
  "Dental systems": [
    "Dr. Cox Dental Office",
    "Dr. Rathod Dental Office"
  ],
  "Professional and individual support": [
    "Charles Bonner Law",
    "David Quan Insurance",
    "LMI",
    "Osha Neumann"
  ]
};

export default function Clients() {
  const grouped = new Map(Object.keys(sectors).map(title => [title, []]));
  for (const client of resumeData.clients) {
    const sector = Object.keys(sectors).find(title => sectors[title].includes(client.name)) || 'Other engagements';
    if (!grouped.has(sector)) grouped.set(sector, []);
    grouped.get(sector).push(client);
  }
  return (
    <div style={{ padding: 'clamp(14px, 3vw, 32px)', background: '#0b1420', borderRadius: 10 }}>
      <h2 style={{ color: '#82d9fb' }}>Clients</h2>
      <p style={{ color: '#c6d3df' }}>Browse {resumeData.clients.length} engagements by practice area.</p>
      {Array.from(grouped, ([sector, clients]) => clients.length > 0 && (
        <section key={sector}>
          <h3 style={{ color: '#86dfcb', marginTop: 28 }}>{sector}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: 12 }}>
            {clients.sort((a, b) => a.name.localeCompare(b.name)).map(client => (
              <article key={client.name} style={{ padding: 16, border: '1px solid #314657', borderRadius: 8, background: '#101e2d' }}>
                <small style={{ color: '#afc6d8' }}>{client.years}</small>
                <h4 style={{ margin: '4px 0 8px', color: '#e7f2ff' }}>{client.link ? <a href={client.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{client.name}</a> : client.name}</h4>
                <p style={{ color: '#c8d6e2', margin: 0, lineHeight: 1.6 }}>{client.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
