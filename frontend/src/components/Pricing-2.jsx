const PricingSection = () => {
  return (
    <div className="container">
      <div className="plans-section">
        <div>
          <div className="main-pricing">
            <h2 className="center-text">Dedicated Trader</h2>
            <p className="center-text pricing-title">$129.00</p>
            <p className="center-text">
              Signals for <b>4 Months!</b>
            </p>
          </div>
          <div className="plan">
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Pro trading video academy
            </p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              MT5 AI and Machine Learning Expert Advisor
            </p>

            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Trade sentiment analysis
            </p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Access to all algorithms
            </p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Upload trades and track performance
            </p>
          </div>
        </div>

        {/* <div className="vertical-line"></div> */}
        <div className=" top-plan">
          <div className="main-pricing exclusive-price">
            <h2 className="center-text">Exclusive Trader</h2>
            <p className="center-text pricing-title">$349.00</p>
            <p className="center-text">
              Signals for <b>1 Year!</b>
            </p>
          </div>
          {/* <h1 className="top-label">1 Year = Better Results</h1> */}
          <div className="plan">
            <p className="recommended-plan">Recommended for better results</p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              <b>Save just over a $35</b>, more profits in your pockets!
            </p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Pro trading video academy
            </p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              MT5 AI and Machine Learning Expert Advisor
            </p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Trade sentiment analysis
            </p>

            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Access to all algorithms
            </p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Upload trades and track performance
            </p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Access to our proprietary charts, with trades entry and exit
            </p>
            <p>
              <img className="check-bullet" src="/images/check2.svg" alt="" />
              Exclusive support, we'll go above and beyond to fit your needs
              with software updates and tailored approach
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
