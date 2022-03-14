import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div className="m-1">
      <h3 className="text-dark">{company}</h3>
      <p>
        {moment(from).format("ll")} - {to ? moment(to).format("ll") : " Now"}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
