import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import PostService from "../../Services/PostService"

// Source for the custom rating component: https://github.com/chibuike07/star_rating

// Question: How I can create a dynamic css style for ":nth-child(-n + 4)"?
const RatingWrapper = styled.aside`
        width: max-content;
        height: max-content;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          & :nth-child(-n + 4) {
            margin-right: 0.2rem;
            width: max-content;
            text-align: center;
          }
        }
    
        pre{
          font-size: .75em;
          margin-left:5px;
        }
      
        .radio_input {
          display: none;
        }
      `;

export default function CustomRating({ canSpin, post, loggedInUser, starCount, averageStarDeciamlPoint }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [shouldSpin, setShouldSpin] = useState(canSpin);

    let ratesAverage = 0;
    if (post.rates.length > 0)
        ratesAverage = post.rates.reduce((sum, prevRate) => { return sum + prevRate }, 0) / post.rates.length;

    useEffect(() => {
        if (post.userRateId.includes(loggedInUser.id)) {
            setRating(post.rates[post.userRateId.findIndex((userId) => userId === loggedInUser.id)]);
            setShouldSpin(false);
        }
    }, [loggedInUser.id, post.rates, post.userRateId, rating])

    const handleOnClick = (newRating) => {
        if (!post.userRateId.includes(loggedInUser.id)) {
            post.userRateId.push(loggedInUser.id);
            post.rates.push(newRating);
        }
        else {
            let userIndexInRatings = post.userRateId.findIndex((userId) => userId === loggedInUser.id);
            post.rates[userIndexInRatings] = newRating;
        }
        PostService.updatePost(post);
        setShouldSpin(false);
        setRating(newRating);
    }

    return (
        <RatingWrapper>
            {
                [...Array(starCount)].map((n, i) => {
                    const ratingValue = i + 1;
                    return (
                        <span key={i}>
                            <FontAwesomeIcon
                                icon={faStar}
                                color={ratingValue <= (hover || rating) ? "#ffa500" : "#ccc"}
                                spin={shouldSpin ? true : false}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => {
                                    handleOnClick(ratingValue);
                                }}
                            />
                        </span>
                    );
                }

                )
            }
            <pre>
                ave: {ratesAverage.toFixed(averageStarDeciamlPoint)}
            </pre>
        </RatingWrapper>
    );
};
