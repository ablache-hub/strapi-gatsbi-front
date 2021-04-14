import '../assets/css/comment.css';
import React from 'react'

let localHoust ="";

const submitForm = ((ev, strapiId) => {
    localHoust =  window.location.protocol + "//" + window.location.host;
    ev.preventDefault();
    fetch(`http://localhost:1337/comments`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // "query": `mutation ($input: createCommentInput!){createComment(input: $input){comment{Message, Email, article{id}}}}`,
          /*  "variables": {
                "input": {
                    "data": */

                        "article": strapiId,
                        "Email": ev.target.Email.value,
                        "Message": ev.target.Message.value,





        }),
    })
        .then((res) => window.location.reload())
})


const Comments = ({ comments, article }) => {
    console.log(comments)
    return (
        <div>
            <hr />
            <div className="comment-list">
                {comments.length ? (
                    comments.map((comment) => (
                        <div className="comment-block">
                            <h4 className="comment-author">Ecrit par : {comment.Email}</h4>
                            <h4 className="comment-date"> le {comment.created_at}</h4>
                            <p className="comment-content">{comment.Message}</p>
                        </div>
                    ))
                ) : (
                    <h5 className="no-comments-alert">
                        No comments on this post yet. Be the first!
                    </h5>
                )}
            </div>

            <form className="comment-form" onSubmit={ev => submitForm(ev, article.strapiId)}>
                <h4 className="comment-post">Laissez un commentaire</h4>
                <input
                    type="text"
                    placeholder="Votre pseudo/nom"
                    name="Email"
                />
                <textarea
                    type="text"
                    placeholder="Votre commentaire"
                    rows="4"
                    name="Message"
                />
                <div>
                    <button className="button submit-button" type="submit">Envoyer</button>
                </div>
            </form>

        </div>
    );
};

export default Comments;