import honors from '../data/honors.json'

export default function Honors() {
  return (
    <div className="page honors-page">
      <div className="page-header">
        <span className="section-comment"># cat honors.json | jq</span>
        <h1>Honors & Awards</h1>
        <p className="page-description">Our achievements in CTF competitions</p>
      </div>

      <div className="honors-list">
        {honors.map((honor) => (
          <div key={honor.id} className="honor-card">
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
