import config from '../../config.json'

export default function Footer() {
  const { comment, shell, copyright } = config.footer
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-line">
          <span className="footer-comment">{comment}</span>
        </div>
        <div className="footer-line">
          <span className="footer-prompt">root@s10wd0wn</span>
          <span className="footer-sep">:</span>
          <span className="footer-path">~</span>
          <span className="footer-sep">$</span>
          <span className="footer-text">{shell}</span>
        </div>
        <div className="footer-line">
          <span className="footer-output">{copyright}</span>
        </div>
      </div>
    </footer>
  )
}
