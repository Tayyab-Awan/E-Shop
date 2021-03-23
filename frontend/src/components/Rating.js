import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { isInteger } from '../helpers/numbers/CheckIntegers';
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {

    const renderRatingStars = (totalStars) => {
        const stars = [];
        let emptyStars = 0;
        const isHalfEmptyStar = isInteger(value) ? false : true;
        if (isHalfEmptyStar) {
            emptyStars = Math.floor(totalStars - value);
        }
        else {
            emptyStars = totalStars - value;
        }

        const fullStars = Math.floor(value);
        for (let index = 0; index < fullStars; index++) {
            stars.push(
                <i
                    key={Math.random() * 100}
                    className="fas fa-star"
                    style={{ color }}
                ></i>
            );
        }
        if (isHalfEmptyStar) {
            stars.push(
                <i
                    key={Math.random() * 300}
                    className="fas fa-star-half-alt"
                    style={{ color }}
                ></i>
            );
        }
        for (let index = 0; index < emptyStars; index++) {
            stars.push(
                <i
                    key={Math.random() * 200}
                    className="far fa-star"
                    style={{ color }}
                ></i>
            );
        }
        return stars;
    }

    return (
        <Row>
            <Col sm={6} md={7}>{renderRatingStars(5)}</Col>
            <Col sm={6} md={5}><small>{text && text}</small></Col>
        </Row>
    )
}

Rating.defaultProps = {
    color: '#f8e825',
    value: 0,
    text: ''
}
Rating.propTypes = {
    color: PropTypes.string,
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
}

export default Rating;
