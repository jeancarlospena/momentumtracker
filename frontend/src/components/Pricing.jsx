import React from "react";

const Pricing = () => {
  return (
    <>
      <div className="plans-section">
        <div className="plan">
          <div className="main-pricing">
            <h2 className="center-text">Dedicated Trader</h2>
            <p className="center-text pricing-title">$189</p>
            <p className="center-text">
              Signals for <b>3 Months!</b>
            </p>
          </div>

          <p>
            <img className="check-bullet" src="/images/check2.svg" alt="" />
            Access to all algorithms
          </p>
          <p>
            <img className="check-bullet" src="/images/check2.svg" alt="" />
            Upload trades and track performance
          </p>
        </div>
        <div className="vertical-line"></div>
        <div className="plan">
          <div className="main-pricing exclusive-price">
            <h2 className="center-text">Exclusive Trader</h2>
            <p className="center-text pricing-title">$649</p>
            <p className="center-text">
              Signals for <b>1 Year!</b>
            </p>
          </div>
          <p>
            <img className="check-bullet" src="/images/check2.svg" alt="" />
            <b>Save just over a $100</b>, more profits in your pockets!
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
            Exclusive support, we'll go above and beyond to fit your needs with
            software updates and tailored approach
          </p>
        </div>
      </div>
    </>
  );
};

export default Pricing;
