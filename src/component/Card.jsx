import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Card.css";

const Card = () => {
  const [cardEle, setCardEle] = useState([]);
  const [displayCardDetails, setDisplayCardDetails] = useState({});
  const [displayCard, setDisplayCard] = useState(false);
  const loadCards = async () => {
    const { data } = await axios.get(
      `https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=%2020`
    );
    // console.log(data.results[0].name);
    setCardEle(data.results);
  };

  const showCard = (e) => {
    // console.log(e);
    const newObj = {
      title: e.name.title,
      first: e.name.first,
      last: e.name.last,
      gender: e.gender,
      location: e.location,
      picture: e.picture,
    };
    console.log(newObj.picture.thumbnail);
    console.log(newObj);
    setDisplayCard(true);
    setDisplayCardDetails(newObj);
    // console.log(displayCardDetails);
  };
  useEffect(() => {
    loadCards();
  }, []);
  return (
    <div>
      {displayCard && (
        <div className="main_card">
          <div>
            <img
              className="profile"
              src={displayCardDetails.picture.large}
              alt=""
            />{" "}
          </div>
          <div>
            <h1 className="main_card_name">
              <span>{displayCardDetails.title}</span>
              <span> {displayCardDetails.first} </span>
              <span>{displayCardDetails.last}</span>
            </h1>
            <div>
              <span style={{ color: "#A259FF" }}>
                {displayCardDetails.location.street.number},
              </span>
              <span> {displayCardDetails.location.street.name}, </span>
              <span> {displayCardDetails.location.city}, </span>
              <span> {displayCardDetails.location.state}, </span>
              <span>
                <b>{displayCardDetails.location.country}</b>,
              </span>
              <span>{displayCardDetails.location.postcode}</span>
            </div>
            <br />
            <div>
              {displayCardDetails.location.timezone.offset}
              <span> - </span>
              {displayCardDetails.location.timezone.description}
            </div>
            <br />
            <div className="gender_styles">{displayCardDetails.gender}</div>
          </div>
        </div>
      )}
      <div className="parent_style">
        {cardEle.length > 0
          ? cardEle.map((singleCard) => {
              return (
                <div
                  onClick={() => showCard(singleCard)}
                  key={singleCard.email}
                >
                  <div className="card_style">
                    <span className="gender_styles">
                      {singleCard.gender} . {singleCard.nat}{" "}
                    </span>
                    <span className="name_style">
                      <span>{singleCard.name.title}</span>
                      <span> {singleCard.name.first} </span>
                      <span>{singleCard.name.last}</span>
                    </span>
                    <span className="email_style">{singleCard.email}</span>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Card;
