const loadData = async (value = '') => {

    pageLoading(true);

    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`);

    const data = await response.json();

    const originalData = data.posts;

    loadPost(originalData);

}

const loadPost = (data) => {

    pageLoading(false);

    const discussPrint = document.getElementById('discuss-print');
    discussPrint.textContent = '';

    data.forEach(element => {

        const div = document.createElement('div');

        div.className = 'bg-neutral-200 rounded-3xl p-4 lg:p-10 flex justify-between items-start gap-x-6';

        div.innerHTML = `
        <div class="relative bg-white">
            <div class="flex justify-center items-center w-[72px] h-[72px]"><img
                src="${element.image}" alt="...Loading" class="rounded-2xl"></div>
            <div id="greenSignal" class="rounded-full w-[15px] h-[15px] absolute -right-1 -top-1 ${element.isActive ? 'bg-green-600' : 'bg-red-600'} ">
            </div>
        </div>
        <div class="lg:flex-1">
            <div class="border-b-2 border-neutral-400 border-dashed">
                <div class="font-inter text-sm font-medium text-neutral-500 flex flex-col lg:flex-row gap-y-2 lg:gap-y-0 lg:gap-x-5">
                    <h6>#<span>${element.category}</span></h6>
                    <h6>Author: <span>${element.author.name}</span></h6>
                </div>
                <h3 class="text-xl font-bold mt-3 mb-4">${element.title}</h3>
                <p class="font-inter text-neutral-400 text-base leading-7 mb-5">${element.description}</p>
            </div>
            <div class="mt-5 font-inter font-normal text-base text-neutral-500 flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between">
                <div class="flex gap-x-6">
                    <div class="flex gap-1 lg:gap-x-3 items-center">
                        <img class="w-5 h-5" src="images/messageicon.png" alt="...Loading">
                        <h6>${element.comment_count}</h6>
                    </div>
                    <div class="flex gap-1 lg:gap-x-3 items-center">
                        <img class="w-5 h-5" src="images/eyeicon.png" alt="...Loading">
                        <h6>${element.view_count}</h6>
                    </div>
                    <div class="flex gap-1 lg:gap-x-3 items-center">
                        <img class="w-5 h-5" src="images/clockicon.png" alt="...Loading">
                        <h6>${element.posted_time}</h6>
                    </div>
            </div>
            <div class="translate-x-40 lg:translate-x-0 flex gap-x-3 items-center cursor-pointer" onclick='markAsRead("${element.title.replace(/'/g, '')}",${element.view_count})'>
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
    <h4 class="text-base font-semibold w-52 leading-6">${title}</h4>
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

const searchByCategory = () => {
    const inputValue = document.getElementById('search-box').value;
    loadData(inputValue);
    pageLoading(true);
}

function pageLoading(isLoading) {
    const pageOnLoad = document.getElementById('pageOnLoad');

    if (isLoading === true) {
        pageOnLoad.classList.remove('hidden');
    } else {
        setTimeout(() => {
            pageOnLoad.classList.add('hidden');
        }, 2000);
    }
}

const latestPosts = async () => {

    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');

    const data = await response.json();

    postsPrint(data);

}

const postsPrint = (element) => {
    const postPrint = document.getElementById('post-print');

    element.forEach(card => {

        const div = document.createElement('div');
        div.className = 'p-6 border border-slate-300 rounded-3xl';
        div.innerHTML = `
        <div>
            <img class="rounded-2xl w-80 h-48" src="${card.cover_image}" alt="...Loading">
        </div>
        <div class="flex gap-x-3 items-center my-6">
            <img class="w-5 h-5" src="images/date.png" alt="...Loading">
            <h6 class="text-base font-normal text-neutral-400">${card.author?.posted_date ?? 'No publish date'}</h6>
        </div>
        <h4 class="text-lg font-extrabold w-80 mb-3">${card.title}</h4>
        <p class="text-neutral-500 w-80 text-start leading-6 font-normal mb-4">${card.description}</p>
        <div class="flex justify-start items-center gap-x-4">
            <div>
                <img class="w-11 h-11 rounded-full flex items-center" src="${card.profile_image}" alt="...Loading">
            </div>
            <div>
                <h4 class="text-base font-bold text-black mb-1">${card.author.name}</h4>
                <h6 class="text-sm font-normal text-neutral-400">${card.author.designation ?? "Unknown"}</h6>
            </div>
        </div>
        `;

        postPrint.appendChild(div);

    });

}

loadData();

latestPosts();