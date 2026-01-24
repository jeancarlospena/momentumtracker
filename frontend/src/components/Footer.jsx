import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="container">
        <div className="top-footer">
          <div className="left-footer">
            <img className="footer-logo" src="../images/darkso.svg" alt="" />
            <div className="social-icons-section">
              {/* <img
                className="social-svg"
                src="../images/social-facebook.svg"
                alt=""
              />
              <img
                className="social-svg"
                src="../images/social-linked.svg"
                alt=""
              />
              <img
                className="social-svg"
                src="../images/social-instagram.svg"
                alt=""
              />
              <img className="social-svg" src="../images/social-x.svg" alt="" /> */}
              <Link
                to={"https://www.youtube.com/@karlos.trades"}
                target="_blank"
                className="youtube-btn"
              >
                <img
                  className="social-svg"
                  src="../images/social-youtube.svg"
                  alt=""
                />
                YouTube
              </Link>
            </div>
          </div>
          <div className="right-footer">
            <div className="footer-links-section">
              <span>Support</span>
              <span>Contact Us</span>
              <span>Careers</span>
              <span>Media Inquiries</span>
            </div>
            <div className="footer-links-section">
              <span>Privacy Policy</span>
              <span>Privacy Preferences</span>
              <span>Terms and Conditions</span>
              <span>Disclosures</span>
            </div>
            {/* <span>Customer service: (973) 910-8508</span>
            <span>© 2024 | All rights reserved</span> */}
          </div>
        </div>
        <div className="bottom-footer">
          <span>© 2025 SignalOverwatch.com LLC. All rights reserved.</span>
          <span>
            SignalOverwatch.com LLC (“SignalOverwatch.com”) is a software as a
            service provider and financial education company.
            SignalOverwatch.com does not provide investment advice, guidance or
            recommendation, and SignalOverwatch.com does not provide commodity
            trading advice based on, or tailored to, the commodity interest or
            cash market positions or other circumstances or characteristics of
            particular clients, nor does SignalOverwatch.com direct any client
            accounts. No information set forth on this website is an invitation
            to trade any specific investments. SignalOverwatch.com does not take
            into account your own individual financial or personal
            circumstances. Do not act on this information without advice from
            your investment professional, from whom you should expect to
            determine what is suitable for your particular needs and
            circumstances. Please see our Terms & Conditions and Risk
            Disclosures pages for more information. PAST PERFORMANCE IS NOT A
            GUARANTEE OR A RELIABLE INDICATOR OF FUTURE RESULTS. NO
            REPRESENTATION IS MADE OF IMPLIED THAT THE USE OF ANY OF
            SignalOverwatch.com’S PRODUCTS WILL GENERATE INCOME OR GUARANTEE A
            PROFIT. USE OF SignalOverwatch.com’S PRODUCTS INVOLVES A DEGREE OF
            RISK, INCLUDING RISK OF LOSS. LOSS OF THE ENTIRE DEPOSIT IN YOUR
            TRADING ACCOUNT IS POSSIBLE AND USE OF LEVERAGE CAN LEAD TO LARGE
            LOSSES.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
