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
    rateComment()
})

// changes copied elements content
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

// displays reply comment on the screen
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
        rateComment()
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
                targetElement.style.margin = "0"
                targetElement.style.padding = "0"
                targetElement.remove();
            }
            deleteComment.style.display = "none";
        })
    })
}


// function for editing comment
function editFunction() {
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach(editBtn => {
        let editComment;
        editBtn.addEventListener("click",  (event) => {
            let editTarget;
            if(event.target.classList.contains("edit")) {
                editTarget = event.target;
            } else {
                editTarget = event.target.parentNode;
            }
            if(!active.editCommentActive){
                active.editCommentActive = true;
                const editTemplate = document.querySelector(".edit-container");
                const userElement = editTarget.parentNode.parentNode.querySelector(".user");
                editTarget.parentNode.parentNode.querySelector(".comment-text").style.display = "none";
                editComment = editTemplate.cloneNode(true);
                const parentElement = editTarget.parentNode.parentNode.querySelector(".comment");
                parentElement.appendChild(editComment);
                userElement.insertAdjacentElement("afterend", editComment);
                editComment.style.display = "flex";
                editComment.querySelector("textArea").value = editTarget.parentNode.parentNode.querySelector(".content").textContent;
            } else {
                active.editCommentActive = false;
                editComment.remove();
                editTarget.parentNode.parentNode.querySelector(".comment-text").style.display = "block";
            }
            updateComment(editComment, editTarget);
        })
    })
}

editFunction();

// edit comment
function updateComment(comment, target){
    const updateButtons = document.querySelectorAll(".updateBtn")
    updateButtons.forEach(updateButton => {
        updateButton.addEventListener("click", (e) => {
            e.target.parentNode.parentNode.querySelector(".content").textContent = e.target.previousElementSibling.value;
            active.editCommentActive = false;
            comment.remove();
            target.parentNode.parentNode.querySelector(".comment-text").style.display = "block";
        })
    })
}

// change score of the comment.
function rateComment() {
    const scoreButtons = document.querySelectorAll(".vote-box span");
    scoreButtons.forEach(scoreButton => {
        scoreButton.addEventListener("click", (e)=> {
            if(e.target.classList.contains("plus")) {
                e.target.nextElementSibling.textContent = parseInt(e.target.nextElementSibling.textContent)+1;
            } else if(e.target.classList.contains("minus")) {
                e.target.previousElementSibling.textContent = parseInt(e.target.previousElementSibling.textContent)-1;
            }
        })
    })
}

rateComment();








