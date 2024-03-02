const loadData = async () => {

    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');

    const data = await response.json();

    const originalData = data.posts;

    loadPost(originalData);


}

const loadPost = (data) => {

    data.forEach(element => {
        // console.log(element);

        const discussPrint = document.getElementById('discuss-print');

        const div = document.createElement('div');

        div.className = 'bg-neutral-200 rounded-3xl p-10 flex justify-between items-start gap-x-6';

        div.innerHTML = `
        <div class="relative bg-white">
            <div class="w-[72px] h-[72px] flex justify-center items-center"><img
                src="${element.image}" alt="...Loading" class="rounded-2xl"></div>
            <div id="greenSignal" class="rounded-full w-[18px] h-[18px] absolute -right-2 -top-1">
            </div>
        </div>
        <div class="flex-1">
            <div class="border-b-2 border-neutral-400 border-dashed">
                <div class="font-inter text-sm font-medium text-neutral-500 flex gap-x-5">
                    <h6>#<span>${element.category}</span></h6>
                    <h6>Author: <span>${element.author.name}</span></h6>
                </div>
                <h3 class="text-xl font-bold mt-3 mb-4">${element.title}</h3>
                <p class="font-inter text-neutral-400 text-base leading-7 mb-5">${element.description}</p>
            </div>
            <div class="mt-5 font-inter font-normal text-base text-neutral-500 flex justify-between">
                <div class="flex gap-x-6">
                    <div class="flex gap-x-3 items-center">
                        <img class="w-5 h-5" src="images/messageicon.png" alt="...Loading">
                        <h6>${element.comment_count}</h6>
                    </div>
                    <div class="flex gap-x-3 items-center">
                        <img class="w-5 h-5" src="images/eyeicon.png" alt="...Loading">
                        <h6>${element.view_count}</h6>
                    </div>
                    <div class="flex gap-x-3 items-center">
                        <img class="w-5 h-5" src="images/clockicon.png" alt="...Loading">
                        <h6>${element.posted_time}</h6>
                    </div>
            </div>
            <div class="flex gap-x-3 items-center cursor-pointer" onclick="markAsRead('${element.title}','${element.view_count}')">
                <img class="w-7 h-7" src="images/emailicon.png" alt="...Loading" id="mark-read">
            </div>
        </div>                        
        `;

        discussPrint.appendChild(div);

    });
}

const markAsRead = (title, view) => {

    console.log(title);

    const titleElementPrint = document.getElementById('title-element-print');

    const div = document.createElement('div');

    div.className = 'bg-white p-4 flex justify-between items-center rounded-2xl';

    div.innerHTML = `
    <h4 class="text-base font-semibold w-52 leading-6">'${title}'</h4>
    <div class="flex items-center justify-between gap-x-2 text-neutral-500">
        <img class="w-7 h-7" src="images/eyeicon.png" alt="...Loading">
        <h6 class="font-inter text-base font-normal">${view}</h6>
    </div>
    `;

    titleElementPrint.appendChild(div);

}

document.addEventListener('click', function (event) {

    const markAsReadText = document.getElementById('markAsReadText').innerText;

    markAsReadNumber = parseInt(markAsReadText);

    if (event.target.id == 'mark-read') {
        markAsReadNumber = markAsReadNumber + 1;
        document.getElementById('markAsReadText').innerText = markAsReadNumber;
    }

})

// const searchByCategory = async() =>{
//     const response = await fetch( 'https://openapi.programming-hero.com/api/retro-forum/posts?category=coding');
//     const data = await response.json();
//     data.posts.forEach(element => {
//         const inputValue = document.getElementById( 'search-box' ).value;

//         if (element.category === inputValue) {
//             loadPost();
//         }
//     });
// }

// const onlineStatus = (status) => {

//     const online = document.getElementById('greenSignal');

//     if (element.isActive === true) {
//         online.classList.add('bg-green-500');
//     } else {
//         online.classList.add('bg-red-500');
//     }

//     console.log(status);
// }

// const online = document.getElementById('greenSignal');

//         if (element.isActive === true) {
//             online.classList.add('bg-green-500');
//         } else {
//             online.classList.add('bg-red-500');
//         }

loadData();