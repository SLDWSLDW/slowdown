import writeups from '../data/writeups.json'

export default function Writeups() {
  return (
    <div className="page writeups-page">
      <div className="page-header">
        <span className="section-comment"># ls -la /writeups/</span>
        <h1>Writeups</h1>
        <p className="page-description">Detailed solutions and technical analyses</p>
      </div>

      <div className="writeups-list">
        {writeups.map((writeup) => (
          <a
            key={writeup.id}
            href={writeup.link}
            target="_blank"
            rel="noopener noreferrer"
            className="writeup-card"
          >
            <span className="writeup-main">
              <span className="writeup-icon">$</span>
              <span className="writeup-name">{writeup.title}</span>
            </span>
            <span className="writeup-meta">
              <span className="writeup-event">{writeup.event}</span>
              <span className="writeup-tags">
                {writeup.tags.map((tag) => (
                  <span key={tag} className="writeup-tag">{tag}</span>
                ))}
              </span>
            </span>
            <span className="writeup-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
