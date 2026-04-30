const banner = `\
  ████████ ██         ███████   ██       ██ ███████     ███████   ██       ██ ████     ██
 ██░░░░░░ ░██        ██░░░░░██ ░██      ░██░██░░░░██   ██░░░░░██ ░██      ░██░██░██   ░██
░██       ░██       ██     ░░██░██   █  ░██░██    ░██ ██     ░░██░██   █  ░██░██░░██  ░██
░█████████░██      ░██      ░██░██  ███ ░██░██    ░██░██      ░██░██  ███ ░██░██ ░░██ ░██
░░░░░░░░██░██      ░██      ░██░██ ██░██░██░██    ░██░██      ░██░██ ██░██░██░██  ░░██░██
       ░██░██      ░░██     ██ ░████ ░░████░██    ██ ░░██     ██ ░████ ░░████░██   ░░████
 ████████ ░████████ ░░███████  ░██░   ░░░██░███████   ░░███████  ░██░     ░██░██    ░░███
░░░░░░░░  ░░░░░░░░   ░░░░░░░   ░░       ░░ ░░░░░░░     ░░░░░░░   ░░       ░░ ░░      ░░░`

export default function Home() {
  return (
    <div className="page home-page">
      <section className="hero-section">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span className="terminal-title">slowdown.sh</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="prompt">root@s10wd0wn</span>
            <span className="sep">:</span>
            <span className="path">~</span>
            <span className="sep">$</span>
            <span className="cmd">cat /etc/team_banner</span>
          </div>
          <div className="terminal-line ascii-art">
            <pre>{banner}</pre>
          </div>
          <div className="terminal-line">
            <span className="prompt">root@s10wd0wn</span>
            <span className="sep">:</span>
            <span className="path">~</span>
            <span className="sep">$</span>
            <span className="cmd">cat /etc/team_description</span>
          </div>
          <div className="terminal-line terminal-output">
            <p>
              We are <strong>Slowdown</strong>, a passionate CTF (Capture The Flag)
              cybersecurity team. We thrive on solving complex challenges across
              various domains — from binary exploitation and reverse engineering
              to cryptography, web security, and forensics.
            </p>
            <p>
              Our team brings together diverse expertise and a shared
              dedication to the craft. Every competition is an opportunity
              to learn, innovate, and push the boundaries of what we know.
            </p>
          </div>
          <div className="terminal-line">
            <span className="prompt">root@s10wd0wn</span>
            <span className="sep">:</span>
            <span className="path">~</span>
            <span className="sep">$</span>
            <span className="blink-cursor">_</span>
          </div>
        </div>
      </section>
    </div>
  )
}
