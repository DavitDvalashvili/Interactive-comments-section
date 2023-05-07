"use strict";

const active = {
    addCommentActive: false,
    editCommentActive: false,
};

const sendButton = document.querySelector(".submit");
const CommentArea = document.querySelector("textarea");
const body = document.querySelector("body");
const addComment = document.querySelector(".new-comment");
const targetComment = document.querySelector(".target-comment");


//add new comment.
sendButton.addEventListener("click", (event) => {
    if(CommentArea.value !== ""){
        // //copies initial comment;
        let newComment = targetComment.cloneNode(true);
        body.appendChild(newComment);
        body.insertBefore(newComment, addComment);
        resetData(newComment, event);
        newComment.querySelector(".tagName").textContent = "";
        event.target.previousElementSibling.value = "";
    }
    removeCommentFunction();
    editFunction();
})

function resetData(target, event) {
    target.classList.remove("target-comment");
    target.classList.remove("reply-container");
    target.querySelector(".score").textContent = "0";
    target.querySelector(".createdAt").textContent = "just now";
    target.querySelector(".content").textContent = event.target.previousElementSibling.value;
}

//add new reply on the screen
const newCommentArea = document.querySelector(".new-comment");
const replyButtons = document.querySelectorAll(".reply");
let newReply;
replyButtons.forEach(replyButton => {
    let target;
    replyButton.addEventListener("click", (event) => {
        if(event.target.classList.contains("reply")){
            target = event.target;
        } else {
            target = event.target.parentNode;
        }
        if(!active.addCommentActive) {
            newReply = newCommentArea.cloneNode(true);
            body.appendChild(newReply);
            target.parentNode.parentNode.parentNode.insertAdjacentElement('afterend', newReply);
            newReply.querySelector(".submit").textContent = "reply"
            newReply.classList.add("new-reply");
            active.addCommentActive = true;
        } else {
            newReply.remove();
            active.addCommentActive = false;
        }
        submitReply();
    })
})


function submitReply() {
    const replyBox = document.querySelector(".new-reply");
    replyBox.querySelector(".submit").addEventListener("click", (event) => {
        if(event.target.previousElementSibling.value !== ""){
            let reply = targetComment.cloneNode(true);
            body.appendChild(reply);
            event.target.parentNode.insertAdjacentElement('afterend', reply);
            reply.querySelector(".tagName").textContent = "@" + event.target.parentNode.previousElementSibling.querySelector(".user-name").textContent;
            event.target.parentNode.remove();
            resetData(reply, event);
            reply.classList.add("reply-container");
            active.addCommentActive = false;
        }
        removeCommentFunction();
        editFunction();
    })
}


//ask user about deleting element
const deleteComment = document.querySelector("#delete-comment");
function removeCommentFunction() {
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            deleteComment.style.display = "flex";
            let targetElement = e.target.parentNode.parentNode.parentNode;
            submitDelete(targetElement);
        })
    })
}

removeCommentFunction();

// delete element
const buttons = document.querySelectorAll(".buttons button");
function submitDelete(targetElement) {
    buttons.forEach(btn => {
        btn.addEventListener("click", (event) => {
            if(event.target.classList.contains("yes")) {
                targetElement.remove();  
            }
            deleteComment.style.display = "none";
        })
    })
}



function editFunction() {
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach(editBtn => {
        editBtn.addEventListener("click",  (event) => {
            let editTarget;
            if(event.target.classList.contains("edit")) {
                editTarget = event.target;
            } else {
                editTarget = event.target.parentNode;
            }

            let editComment
            if(!active.editCommentActive){
                active.editCommentActive = true;
                const editTemplate = document.querySelector(".edit-container");
                editTarget.parentNode.parentNode.querySelector(".tagName").parentNode.style.display = "none";
                editComment = editTemplate.cloneNode(true);
                const parentElement = editTarget.parentNode.parentNode.querySelector(".comment");
                parentElement.appendChild(editComment);
                parentElement.insertBefore(editTarget.parentNode.parentNode.querySelector(".user"), editComment);
                editComment.style.display = "flex";
            } else {
                //editComment.remove();
                event.target.parentNode.parentElement.querySelector(".edit-container").remove();
                editTarget.parentNode.parentNode.querySelector(".tagName").parentNode.style.display = "block";
                active.editCommentActive = false;
            }



        })
    })
}

editFunction();
















// const replyButtons = document.querySelectorAll('.reply');
// let replyArea;
// replyButtons.forEach(replyButton => {
//     replyButton.addEventListener("click", (e) => {
//         let replyTarget;
//         if(e.target.parentNode.parentNode.classList.contains("comment-box")){
//             replyTarget = e.target.parentNode.parentNode;
//         } else {
//             replyTarget = e.target.parentNode.parentNode.parentNode;
//             //replyArea.style.width = "642px"
//         }
//         replyTarget.classList.add("reply-target");
//         replyButton.classList.toggle("active");
//         if(replyButton.classList.contains("active")){
//             displayReplyArea();
//         } else {
//             replyArea.remove();
//         }
//         replyTarget.classList.remove("reply-target");
//     })
// })

// //displays new area for reply on the screen
// function displayReplyArea() {
//     const replyElement = document.querySelector(".reply-target");
//     replyArea = addComment.cloneNode(true);
//     body.appendChild(replyArea);
//     replyElement.insertAdjacentElement('afterend', replyArea);
//     replyArea.lastElementChild.textContent = "reply"
//     replyArea.lastElementChild.classList.add("submit-reply");
//     replyArea.lastElementChild.classList.remove("send");
//     if(replyArea.parentNode.classList.contains("comment-reply") && window.innerWidth > 1024){
//         replyArea.style.width = "642px"
//     }
//     submitReply();
// }


// //submit reply
// let newReplyBox;
// function submitReply() {
//     const replyBox = document.querySelector(".initial-reply-box")
//     const submitReplies = document.querySelectorAll(".submit-reply");
//     submitReplies.forEach(submitReply => {
//         submitReply.addEventListener("click", (e) => {
//             if(!e.target.parentNode.parentNode.classList.contains("comment-reply")) {
//                 if(submitReply.previousElementSibling.value !== ""){
//                     newReplyBox = replyBox.cloneNode(true);
//                     submitReply.parentNode.parentNode.appendChild(newReplyBox);
//                     submitReply.parentNode.parentNode.insertBefore(newReplyBox, replyArea);
//                     newReplyBox.firstElementChild.remove();
//                     newReplyBox.classList.remove("initial-reply-box");
//                     console.log(newReplyBox);
//                     newReplyBox.querySelector(".content").textContent = submitReply.previousElementSibling.value;
//                     newReplyBox.querySelector(".createdAt").textContent = "just now"
//                     newReplyBox.querySelector(".score").textContent = 0;
//                 }
//             } else {
//                 if(submitReply.previousElementSibling.value !== ""){
//                     const userName = submitReply.parentNode.previousElementSibling.querySelector(".user-name");
//                     let newReply = replyBox.lastElementChild.cloneNode(true);
//                     e.target.parentNode.parentNode.appendChild(newReply);
//                     newReply.querySelector(".content").textContent = submitReply.previousElementSibling.value;
//                     //add tags in comment;
//                     let tagName = document.createElement("span");
//                     tagName.textContent = "@" + userName.textContent+ " ";
//                     newReply.querySelector(".content").appendChild(tagName);
//                     newReply.querySelector(".content").insertBefore(tagName, newReply.querySelector(".content").firstChild);
//                     //reset time and score
//                     newReply.querySelector(".createdAt").textContent = "just now"
//                     newReply.querySelector(".score").textContent = 0;
                    

//                 }
//             }
//             replyArea.remove();
//         })
//     })
// }

