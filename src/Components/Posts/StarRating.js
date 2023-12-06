import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import PostService from "../../Services/PostService"

// Source for the custom rating component: https://github.com/chibuike07/star_rating
const CustomRating = ({ canSpin, post, loggedInUser, starCount }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [shouldSpin, setShouldSpin] = useState(canSpin);

    useEffect(() => {
        if (post.userRateId.includes(loggedInUser.id)) {
            setRating(post.rates[post.userRateId.findIndex((userId) => userId === loggedInUser.id)]);
            setShouldSpin(false);
        }
    }, [loggedInUser.id, post.rates, post.userRateId, rating])

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
        & :nth-child(-n + ${starCount - 1}) {
          margin-right: 0.2rem;
          width: max-content;
          text-align: center;
        }
      }
    
      .radio_input {
        display: none;
      }
    `;

    // if (post.userRateId.includes(loggedInUser.id)) {
    //     setRating(post.rates[post.userRateId.findIndex((userId) => userId === loggedInUser.id)]);
    // }

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
            <p>
                AVE
            </p>
        </RatingWrapper>
    );
};


export default CustomRating;