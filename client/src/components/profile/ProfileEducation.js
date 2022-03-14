import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const ProfileEducation = ({
  education: { School, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <div className="m-1">
      <h3 className="text-dark">{School}</h3>
      <p>
        {moment(from).format("ll")} - {to ? moment(to).format("ll") : " Now"}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
