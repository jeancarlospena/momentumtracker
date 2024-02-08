import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">Trading Journal For Performance Boosting</h1>
      <h2 className="home-sub-heading">
        The Best Way To Track Performance And Breakdown Trades
      </h2>
      <div className="main-home-section">
        <img
          className="main-home-photo"
          src="/images/main-home-photo.jpg"
          alt=""
        />
        <div className="action-section">
          <ul className="bullets-section">
            <li className="bullet-points">
              <img className="check-icon" src="/images/check.svg" alt="" />
              <p>Detailed chart review of trades.</p>
            </li>
            <li className="bullet-points">
              <img className="check-icon" src="/images/check.svg" alt="" />
              <p>Organise and catagorize trades.</p>
            </li>
            <li className="bullet-points">
              <img className="check-icon" src="/images/check.svg" alt="" />
              <p>Powerful and simple to use platform.</p>
            </li>
          </ul>
          <Link to="/signup" className="trial-btn">
            FREE 7 DAY TRIAL
          </Link>
        </div>
      </div>
      <div className="features-section">
        <div className="feature">
          <div className="feature-img">
            <img src="../images/candles.png" alt="" />
          </div>
          <div className="feature-text-section">
            <h2 className="feature-title">Breakdowns</h2>
            <p className="feature-text">
              See every detail on a trade with our charts, at the same time
              compare side by side with market conditions.
            </p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-img">
            <img src="../images/user.png" alt="" />
          </div>
          <div className="feature-text-section">
            <h2 className="feature-title">Convenience</h2>
            <p className="feature-text">
              The platform is made with traders strategies in mind. Making sure
              our platform offers features that save active investors time,
              while using feedback to improve platform.
            </p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-img">
            <img src="../images/developer.png" alt="" />
          </div>
          <div className="feature-text-section">
            <h2 className="feature-title">Flexible</h2>
            <p className="feature-text">
              Organise your trades into categories and quickly compare each.
              Find out what's working or not.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
