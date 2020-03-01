let moreComments__btn = document.querySelector('.more-comments__btn');
let comments = document.querySelector('.comments');
let comment = document.querySelectorAll('.comment');
let commentsNum = comment.length;
let bigTitle = document.querySelector('.big-title');
let commentsHeight = 0;
let currentState = false;

let bigTitleHeight = bigTitle.offsetHeight;
let standartHeight = comments.offsetHeight;

moreComments__btn.addEventListener('click', function(){
    comment.forEach(element => commentsHeight += (element.offsetHeight + 30));
    commentsHeight += bigTitleHeight + 20;
    if(!currentState)
    {
        currentState = true;
        comments.style.height = commentsHeight + "px";
    }
    else {
        currentState = false;
        comments.style.height = standartHeight + "px";
    }
});