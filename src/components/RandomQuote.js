import React from "react";

const renderQuote = (data) => {
  return data.map((quote, i) => {
    return (
      <li className="single-quote" key={i}>
        <div className="quote-ID">{quote.id}</div>
        <div className="quote-text">{quote.quote}</div>
        <div className="attribution">- {quote.person}</div>
      </li>
    );
  });
};

export const RandomQuote = ({ data, visibleQuote }) => {
  return visibleQuote && <ol id="quote-container">{renderQuote(data)}</ol>;
};
