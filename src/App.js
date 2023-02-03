import React, { useState } from "react";
import bgMobile from "../src/images/bg-main-mobile.png";
import bgDesktop from "../src/images/bg-main-desktop.png";
import logo from "./images/card-logo.svg";
import tick from "../src/images/done.png";
import { format } from "date-fns";
export default function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("01/23");
  const [cvc, setCvc] = useState("");
  return (
    <>
      <section>
        <div className="absolute -z-10 w-full">
          <picture>
            <source media="(min-width:1024px)" srcSet={bgDesktop} />
            <img src={bgMobile} alt="background" className="w-full lg:w-1/3" />
          </picture>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="mt-[9rem] mx-5 grid grid-cols-1 ">
            <article className="front-card p-5 flex flex-col justify-between ">
              <img src={logo} className="w-20 lg:w-28" alt="logo" />
              <div>
                <h2 className="text-white text-xl lg:text-3xl mb-6 tracking-widest">
                  {cardNumber}
                </h2>
                <ul className="flex items-center justify-between">
                  <li className="text-white text-base lg:text-xl uppercase tracking-widest">
                    {name}
                  </li>
                  <li className="text-white text-base lg:text-xl  tracking-widest">
                    {format(new Date(date), "MM/yy")}
                  </li>
                </ul>
              </div>
            </article>
            <article className="back-card relative mt-0 lg:ml-20">
              <p className="absolute right-10 text-lg lg:text-xl text-white tracking-widest">
                {cvc}
              </p>
            </article>
          </div>
          <div className="pt-8 px-5 pb-20">
            {!confirmed && (
              <form className="flex flex-col justify-center gap-8 max-w-lg lg:h-screen ">
                <div>
                  <label htmlFor="cardholder_name">CARDHOLDER NAME</label>
                  <input
                    type="text"
                    name="cardholder_name"
                    id="cardholder_name"
                    placeholder=" e.g. Danish Sharma"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="card_number">CARD NUMBER</label>
                  <input
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder=" e.g. 1234 1234 1235 5698"
                    required
                    maxLength={19}
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <article className="flex items-center justify-between gap-8">
                  <div className="flex-1">
                    <label htmlFor="expiry_date">EXP DATE (MM/YY)</label>
                    <input
                      type="month"
                      name="expiry_date"
                      id="expiry_date"
                      placeholder="MM YY"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="cvc">CVV</label>
                    <input
                      type="number"
                      name="cvc"
                      id="cvc"
                      placeholder=" e.g. 123"
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                    />
                  </div>
                </article>
                <button onClick={() => setConfirmed(true)} className="btn">
                  Confirm
                </button>
              </form>
            )}
            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>
      </section>
    </>
  );
}

function ThankYou({ setConfirmed }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center lg:h-screen mx-w-lg mx-auto">
        <img src={tick} alt="thankyou" className="block mx-auto"></img>
        <h1 className="text-slate-800 text-3xl my-6 uppercase text-center">
          Thank You!
        </h1>
        <p className="text-slate-400  text-center">
          We've added your card details
        </p>
        <button
          onClick={() => setConfirmed(false)}
          className="btn block mx-auto mt-10 w-full"
        >
          Continue
        </button>
      </div>
    </>
  );
}
