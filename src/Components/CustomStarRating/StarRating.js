import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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

export default function CustomRating({ canSpin, entity, entityService, loggedInUser, useRandomUserId, starCount, averageStarDeciamlPoint }) {
    /* The line `const [rating, setRating] = useState(null);` is using the `useState` hook in React to
    create a state variable called `rating` and a corresponding setter function called `setRating`.
    The initial value of the `rating` state is set to `null`. This state variable is used to keep
    track of the current rating value selected by the user. The `setRating` function can be used to
    update the value of the `rating` state. */
    const [rating, setRating] = useState(null);
    /* The line `const [hover, setHover] = useState(null);` is using the `useState` hook in React to
    create a state variable called `hover` and a corresponding setter function called `setHover`.
    The initial value of the `hover` state is set to `null`. This state variable is used to keep
    track of the current rating value that the user is hovering over. The `setHover` function can be
    used to update the value of the `hover` state. */
    const [hover, setHover] = useState(null);
    /* The line `const [shouldSpin, setShouldSpin] = useState(canSpin);` is using the `useState` hook
    in React to create a state variable called `shouldSpin` and a corresponding setter function
    called `setShouldSpin`. The initial value of the `shouldSpin` state is set to the value of the
    `canSpin` prop that is passed to the component. This state variable is used to determine whether
    the star icons should spin or not. The `setShouldSpin` function can be used to update the value
    of the `shouldSpin` state. */
    const [shouldSpin, setShouldSpin] = useState(canSpin);

    let ratesAverage = 0;
    if (entity.rates.length > 0)
        ratesAverage = entity.rates.reduce((sum, prevRate) => { return sum + prevRate }, 0) / entity.rates.length;

    /* This code block is checking if the `useRandomUserId` prop is true. If it is true, it generates a
    random user ID for the `loggedInUser` object. The generated ID is a random number between 0 and
    999. This is useful when testing the component and you want to simulate different users with
    random IDs. */
    if (useRandomUserId){
        loggedInUser = {}
        loggedInUser.id = Math.floor(Math.random() * 1000);
    }

    useEffect(() => {
        if (entity.userRateIds.includes(loggedInUser.id)) {
            setRating(entity.rates[entity.userRateIds.findIndex((userId) => userId === loggedInUser.id)]);
            setShouldSpin(false);
        }
    }, [loggedInUser.id, entity.rates, entity.userRateIds, rating])

    const handleOnClick = (newRating) => {
        if (!entity.userRateIds.includes(loggedInUser.id)) {
            entity.userRateIds.push(loggedInUser.id);
            entity.rates.push(newRating);
        }
        else {
            let userIndexInRatings = entity.userRateIds.findIndex((userId) => userId === loggedInUser.id);
            entity.rates[userIndexInRatings] = newRating;
        }
        entityService.update(entity);
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
