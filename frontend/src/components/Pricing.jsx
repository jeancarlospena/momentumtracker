import React from "react";

const Pricing = () => {
  return (
    <>
      <div className="plans-section">
        <div className="plan">
          <h2>Dedicated Trader</h2>

          <p className="pricing-title">$189</p>
          <p>
            Signals for <b>3 Months!</b>
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
        <div className="vertical-line"></div>
        <div className="plan">
          <h2>Exclusive Trader</h2>
          <p className="pricing-title">$649</p>
          <p>
            Signals for <b>1 Year!</b>
          </p>
          <p>
            Save just over a <b>$100</b>, more profits in your pockets!
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
            software adjustment and tailored approach
          </p>
        </div>
      </div>
    </>
  );
};

export default Pricing;
