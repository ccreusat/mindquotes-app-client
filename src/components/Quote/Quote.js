import * as React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./Quote.css";

dayjs.extend(relativeTime);

export const Quote = ({ quote }) => {
  return (
    <div className="quote">
      <blockquote className="quote__body">
        <h2 className="quote__title">{quote.text}</h2>
        <div className="quote__footer">
          <p className="quote__author">{quote.author.name}</p>
          <em className="quote__createdat">
            Posted {dayjs(quote.createdAt).fromNow()}
          </em>
        </div>
      </blockquote>
    </div>
  );
};
