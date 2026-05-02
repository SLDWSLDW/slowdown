import config from '../../config.json'

export default function Projects() {
  const { comment, title, description } = config.pages.projects
  return (
    <div className="page projects-page">
      <div className="page-header">
        <span className="section-comment">{comment}</span>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>

      <div className="projects-list">
        {config.projects.map((project, idx) => (
          <div key={idx} className="project-card">
            <div className="project-card-main">
              {project.image && (
                <img src={project.image} alt={project.title} className="project-thumb" />
              )}
              <div className="project-main">
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-name-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span className="project-name">{project.title}</span>
                  </a>
                ) : (
                  <span className="project-main-text">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span className="project-name">{project.title}</span>
                  </span>
                )}
              </div>
              <span className="project-desc">{project.description}</span>
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
