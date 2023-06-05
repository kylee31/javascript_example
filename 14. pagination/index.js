//pagination
const thead = document.querySelector('#table thead');
const tr = document.createElement('tr');
tr.innerHTML += `<th>gender</th><th>email</th><th>first_name</th><th>phone</th>`
thead.appendChild(tr)

//1. json 얻어오기 2.보여주기 3.페이지 별로 나누기
async function getData() {
    const data = await fetch(`https://randomuser.me/api/?results=20`)
        .then((res) => {
            if (res.ok) { return res.json() }
            else { console.log("error") }
        })
    return data
}

//리스트 보여주기 (페이지 번호, 아이템 개수)
const tableDiv = document.querySelector('#table tbody');
async function Table(page_num, item_num) {
    const data = await getData();
    const list = data.results;
    tableDiv.innerHTML = "";
    for (let i = item_num * (page_num - 1); i < item_num * page_num; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML += `<td>${list[i].gender}</td><td>${list[i].email}</td><td>${list[i].name.first}</td><td>${list[i].phone}</td>`
        tableDiv.appendChild(tr);
    }
}

//버튼생성
function pageButton() {
    const buttonDiv = document.getElementById('button');
    for (let i = 1; i <= 4; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.setAttribute('class', "btn")
        buttonDiv.appendChild(btn);
    }
}
pageButton();

//클릭 이벤트 부여
const pageClick = document.querySelectorAll('.btn');
pageClick.forEach((numBtn) => {
    numBtn.addEventListener('click', (e) => {
        Table(e.target.innerText, 5)
        SelectedPage(e.target.innerText)
    });
});

//페이지 번호 css 적용
function SelectedPage(e) {
    pageClick.forEach((numBtn) => {
        if (numBtn.classList.contains('selected')) {
            numBtn.classList.remove('selected');
        }
    });
    pageClick[e - 1].classList.add('selected');
}

function init() {
    SelectedPage(1);
    Table(1, 5);
}
init();