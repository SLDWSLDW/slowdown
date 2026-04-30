export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-line">
          <span className="footer-comment"># EOF</span>
        </div>
        <div className="footer-line">
          <span className="footer-prompt">root@s10wd0wn</span>
          <span className="footer-sep">:</span>
          <span className="footer-path">~</span>
          <span className="footer-sep">$</span>
          <span className="footer-text">echo "Made with ❤️ by Slowdown Team"</span>
        </div>
        <div className="footer-line">
          <span className="footer-output">© {new Date().getFullYear()} Slowdown. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
