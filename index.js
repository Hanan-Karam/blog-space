const container = document.getElementById('container');
const submitForm = document.getElementById('posts-form');

let initialPosts = [];

function renderPosts(){
    let postHTML =""
    initialPosts.map(post =>{
        postHTML +=  `
            <div class="post-container">
            <h1 class="title"> ${post.title} </h1>
            <p class="body"> ${post.body} </p>
            <hr>
            </div>
        `
    }).join(' ')
    container.innerHTML = postHTML;
}

 
fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        initialPosts = data.slice(0, 6);
        //console.log(initialPosts);
        renderPosts()
    });



function addPost(event){
    event.preventDefault();
    let title = document.getElementById('post-title');
    let body = document.getElementById('post-body');
    let newPost = {
        title: title.value,
        body: body.value
    }
    //console.log(posts);
    //using fetch push data to the api
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', {
        method: "POST",
        body: JSON.stringify(newPost),
        headers : {"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        initialPosts.unshift(data);
        renderPosts();
    
    })
    // title.value= "";
    // body.value = "";
    submitForm.reset();
}


submitForm.addEventListener('submit', addPost)