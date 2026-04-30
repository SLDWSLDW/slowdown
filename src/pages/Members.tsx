import members from '../data/members.json'

export default function Members() {
  return (
    <div className="page members-page">
      <div className="page-header">
        <span className="section-comment"># cat members.txt</span>
        <h1>Team Members</h1>
        <p className="page-description">The people behind Slowdown</p>
      </div>

      <div className="members-list">
        {members.map((member) => (
          <div key={member.id} className="member-card">
            <div className="member-main">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="member-avatar" />
              ) : (
                <span className="member-avatar-placeholder">
                  <span>{member.name.charAt(0)}</span>
                </span>
              )}
              <span className="member-name">{member.name}</span>
              <span className="member-role">{member.role}</span>
            </div>
            <span className="member-desc">{member.description}</span>
            <span className="member-links">
              {member.links.github && (
                <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="member-link">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {member.links.twitter && (
                <a href={member.links.twitter} target="_blank" rel="noopener noreferrer" className="member-link">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {member.links.website && (
                <a href={member.links.website} target="_blank" rel="noopener noreferrer" className="member-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </a>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
