import React, { useEffect, useState } from "react";

const FrequentlyAsked = () => {
  const [activeQ, setActiveQ] = useState(-1);
  const [faqElements, setFaqElements] = useState([]);

  const faqElements2 = [
    <div className="faq-section">
      <h2>How will I reveive my signals?</h2>
      <p>
        Signals are immediately sent after being generated through the Telegrams
        channel. For privacy channel members are hidden and your account wont be
        exposed to other members. We provide guidence on how to setup
        notifications to make sure you are always alerted when a new signal is
        generated.{" "}
      </p>
    </div>,
    <div className="faq-section">
      <h2>How is risk managed?</h2>
      <p>
        We take a very concervative approach when it comes to risk. You will get
        the an exact entry, target, and stop price for every signal. You control
        the size of positions in accordance to your level of risk tolerancce.
      </p>
    </div>,
    <div className="faq-section">
      <h2>How much money do I need in my account?</h2>
      <p>We trade futures contracts, which is a highly leverage</p>
    </div>,
  ];

  useEffect(() => {
    const generatedData = faqData.map((data, ind) => {
      return (
        <div key={ind} className="faq-section" onClick={() => setActiveQ(ind)}>
          <h2>{data.q}</h2>
          <p className={ind === activeQ ? "active-faq" : ""}>{data.a}</p>
        </div>
      );
    });
    setFaqElements(generatedData);
  }, [activeQ]);

  return (
    <div className="container">
      <div className="faq-body">
        <h1 className="page-title">FAQ</h1>
        {faqElements}
      </div>
    </div>
  );
};

export default FrequentlyAsked;

const faqData = [
  {
    q: "How will I receive my signals?",
    a: "All trading signals are delivered instantly through our private Telegram channel. The moment our algorithm generates a signal, it’s pushed directly to the group. We’ll guide you step-by-step on how to enable notifications so you never miss an alert. For your privacy, your Telegram account details remain hidden from other members.",
  },
  {
    q: "How is risk managed?",
    a: "Risk management is our top priority. Every signal includes the exact entry, target, and stop-loss levels so you know exactly where to get in and out. You always stay in full control by adjusting your position size based on your own comfort level and risk tolerance. Our approach is designed to be conservative and disciplined.",
  },
  {
    q: "How much money do I need to start?",
    a: "We trade futures contracts, which are highly leveraged instruments. To hold positions overnight, we recommend a minimum account balance of $5,000. For those starting smaller, micro contracts allow you to begin with as little as $200 risked per trade. To take full advantage of the algorithm, an account size of $20,000+ is ideal—but we always suggest starting small and scaling up as you gain confidence.",
  },
  {
    q: "What are the requirements to join?",
    a: "You’ll need a brokerage account and enough funds to meet the broker’s margin requirements. We’ll provide recommendations on brokers and walk you through the setup process so you can get started quickly and smoothly.",
  },
  {
    q: "Which markets do we trade, and why?",
    a: "We currently focus on futures contracts. Futures markets are highly regulated, ensuring transparent pricing and low trading costs. They’re also extremely liquid and volatile, creating frequent opportunities. With trading hours nearly 24/5, you can take advantage of moves almost any time of day.",
  },
  {
    q: "What kind of support will I receive?",
    a: "We provide everything you need to get started and succeed, including video tutorials that cover broker setup, order placement, and platform navigation. On top of that, you can always request a one-on-one call if you need personal guidance. Depending on your membership level, you may also gain access to tailored strategies, custom alerts, and specialized software designed around your goals.",
  },
];
