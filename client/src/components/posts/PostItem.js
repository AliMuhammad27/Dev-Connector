import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, text, avatar, user, likes, comment, date },
  showActions,
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/DD/MM">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type="button"
              class="btn btn-light"
              onClick={(e) => addLike(_id)}
            >
              <i class="fas fa-thumbs-up"></i>{" "}
              {likes?.length > 0 && <span>{likes?.length}</span>}
            </button>
            <button
              type="button"
              class="btn btn-light"
              onClick={(e) => removeLike(_id)}
            >
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} class="btn btn-primary">
              Discussion{" "}
              {comment?.length > 0 && (
                <span class="comment-count">{comment?.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                class="btn btn-danger"
                onClick={(e) => deletePost(_id)}
              >
                <i class="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  //   post: state.post,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
