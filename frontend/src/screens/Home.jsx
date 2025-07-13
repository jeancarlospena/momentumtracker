import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div className="landing-page">
      {/* <div className="message-section">
        <h1 className="main-h1 landing-h1">Announcing</h1>
        <div className="button-title-section">
          <Link to="/signup" className="trial-btn">
            Start a free account 👍
          </Link>
          <h1 className="landing-h1">constant growth</h1>
        </div>
        <h1 className="landing-h1">quant strategies</h1>
      </div> */}
      <div className="message-section">
        <div className="content-wrapper">
          <div className="img-back-business">
            <div className="container">
              <div className="content">
                <h1 className="intro-heading ">
                  Decisions Backed by Data. Moves Backed by Confidence.
                </h1>
                <p className="intro-p">
                  Engineered for precision, our trading systems are optimized
                  for capital efficiency, advanced risk mitigation, and
                  independently validated performance metrics.
                </p>
                <p className="intro-p">
                  No sales calls. No fluff. Just proven systems — and expert
                  support when you want it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="informative-section ">
          <div className="double-image">
            <img
              src="../images/office-worker.jpg"
              alt=""
              className="worker-intro-image"
            />
            <img
              src="../images/office-worker-2.jpg"
              alt=""
              className="worker-intro-image-2"
            />
          </div>
          <div className="informative-section-text">
            <h3 className="title-h3">Why Investors Choose Us</h3>
            <div className="bullet-point">
              <span className="bullet-heading">
                Hands-Free Investing, Fully in Your Control
              </span>
              <p className="bullet-p">
                Automated execution eliminates the need for manual trading — but
                you’re never in the dark. Get real-time visibility into strategy
                behavior, risk parameters, and performance metrics.
              </p>
            </div>
            <div className="bullet-point">
              <span className="bullet-heading">
                Constantly Evolving, Relentlessly Tested
              </span>
              <p className="bullet-p">
                Markets change — and so do we. Our systems continuously evolve
                by adapting strategies based on live market data, stress tests,
                and predictive modeling. Underperformers are removed. Only the
                strongest survive.
              </p>
            </div>
            <div className="bullet-point">
              <span className="bullet-heading">
                Risk-First Design That Protects Capital
              </span>
              <p className="bullet-p">
                Growth is important — but never at the cost of safety. Every
                strategy is built with embedded risk controls and monitored for
                drawdown protection, so your capital stays protected even in
                volatile conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="informative-section">
          <div className="informative-section-text-left">
            <h3 className="title-h3">
              Welcome to the Investor Dashboard Controller
            </h3>
            <p className="bullet-p">
              Stay connected to your strategies, performance, and goals — all in
              one place. Import trades from most major brokers to unlock a
              powerful, broker-synced trading journal and performance hub.
            </p>

            <div className="check-bullet-point">
              <img className="check-bullet" src="../images/check2.svg" alt="" />
              <p className="bullet-p">
                Real-time performance metrics and strategy analytics
              </p>
            </div>

            <div className="check-bullet-point">
              <img className="check-bullet" src="../images/check2.svg" alt="" />
              <p className="bullet-p">
                Subscribe to multiple algorithms tailored to your goals
              </p>
            </div>

            <div className="check-bullet-point">
              <img className="check-bullet" src="../images/check2.svg" alt="" />
              <p className="bullet-p">
                Risk management tools with return projections based on input
              </p>
            </div>

            <div className="check-bullet-point">
              <img className="check-bullet" src="../images/check2.svg" alt="" />
              <p className="bullet-p">
                Detailed trade breakdowns with chart-based visualizations
              </p>
            </div>

            <div className="check-bullet-point">
              <img className="check-bullet" src="../images/check2.svg" alt="" />
              <p className="bullet-p">
                Performance calendar with day-by-day tracking
              </p>
            </div>

            <div className="check-bullet-point">
              <img className="check-bullet" src="../images/check2.svg" alt="" />
              <p className="bullet-p">
                Step-by-step onboarding guides for instant setup
              </p>
            </div>
          </div>
          <img className="side-photo" src="../images/investor.jpg" alt="" />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
