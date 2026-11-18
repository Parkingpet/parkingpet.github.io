import React from 'react';
import { resumeData } from '../../resumeData';

export default function Clients() {
  const clients = [...resumeData.clients].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div style={{ padding: 'clamp(14px, 3vw, 32px)', background: '#0b1420', borderRadius: 10 }}>
      <h2 style={{ color: '#82d9fb' }}>Clients</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        {clients.map(client => (
        <article key={client.name} style={{ padding: 16, border: '1px solid #314657', borderRadius: 8, background: '#101e2d' }}>
          <small style={{ color: '#afc6d8' }}>{client.years}</small>
          <h3 style={{ margin: '4px 0 8px', color: '#e7f2ff' }}>{client.link ? <a href={client.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{client.name}</a> : client.name}</h3>
          <p style={{ color: '#c8d6e2', margin: 0, lineHeight: 1.6 }}>{client.description}</p>
        </article>
        ))}
      </div>
    </div>
  );
}
