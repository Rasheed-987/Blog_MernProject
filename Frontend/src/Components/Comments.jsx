import React from 'react';

const Comments = ({comments }) => {
  return (
    <>
      {console.log(comments)}
      {comments.map((comment) => (
        <div key={comment.postedBy}>
          <h2>Posted By:</h2>
          <h4>{comment.postedBy}</h4>
          <h2>Comments:</h2>
          <p>{comment.text}</p>

          {}
        </div>
      ))}
    </>
  );
};

export default Comments;
