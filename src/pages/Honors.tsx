import config from '../../config.json'

export default function Honors() {
  const { comment, title, description } = config.pages.honors
  return (
    <div className="page honors-page">
      <div className="page-header">
        <span className="section-comment">{comment}</span>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>

      <div className="honors-list">
        {config.honors.map((honor, idx) => (
          <div key={idx} className="honor-card">
            <div className="honor-main">
              {honor.image ? (
                <img src={honor.image} alt={honor.title} className="honor-thumb" />
              ) : (
                <span className="honor-icon">🏆</span>
              )}
              <span className="honor-title">{honor.title}</span>
            </div>
            <span className="honor-desc">{honor.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
