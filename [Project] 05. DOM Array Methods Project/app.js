'use strict';

//Selectors
let users = [];
const btnAdd = document.querySelector('.btn1')
const btnDbl = document.querySelector('.btn2')
const btnMil = document.querySelector('.btn3')
const btnDsc = document.querySelector('.btn4')
const btnSum = document.querySelector('.btn5')
const lists = document.querySelector('.lists')
let list = document.getElementsByClassName('list')

//Event Listenrs
window.addEventListener('load', () => {
    for (let i=0 ; i<3 ; i++) {
        getUsers();
    }
})
btnAdd.addEventListener('click', getUsers)
btnDbl.addEventListener('click', doubleMoney)
btnMil.addEventListener('click', getMils)
btnDsc.addEventListener('click', descendList)
btnSum.addEventListener('click', sumList)


//Functions
function getUsers() {
    fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(val => {
            let spanName = `${val.results[0].name.first} ${val.results[0].name.last}`
            let smallMoney = (val.results[0].location.postcode)*5
            users.push([spanName, smallMoney])
            const newList = document.createElement('div')
            newList.classList.add('list')
            const listSpan = document.createElement('span')
            listSpan.innerText = spanName;
            newList.appendChild(listSpan);
            const listSmall = document.createElement('small')
            listSmall.innerText = `$${smallMoney.toLocaleString('en')}`
            newList.appendChild(listSmall)
            lists.appendChild(newList)
        })
}

function doubleMoney() {
    for (let i=0 ; i<list.length ; i++) {
        users[i][1] *= 2
        list[i].querySelector('small').innerText = `$${users[i][1].toLocaleString('en')}`
    }
}

function getMils() {
    let usersM = users.filter(list => list[1] > 1000000);
    let j=0;
    for (let i=0 ; i<list.length ; i++) {
        if(list[i].querySelector('span').innerText !== usersM[j][0]) {
            list[i].style.display = 'none';
        } else {
            j++;
        }
    }
}

function descendList() {
    let usersD = users.sort((a,b) => {
        return b[1]-a[1]
    })
    for (let i=0 ; i<list.length ; i++) {
        list[i].querySelector('span').innerText = usersD[i][0];
        list[i].querySelector('small').innerText = `$${usersD[i][1].toLocaleString('en')}`;
    }
}

function sumList() {
    const sumPrint = document.createElement('div');
    sumPrint.classList.add('sum-list')
    const sumSpan = document.createElement('span')
    sumSpan.innerText = 'Total: '
    sumPrint.appendChild(sumSpan)
    const sumSmall = document.createElement('small')
    let sumValue = 0;
    for (let i=0 ; i<users.length ; i++) {
        if(!isNaN(users[i][1])) {
            sumValue += users[i][1]
            }
        }
    sumSmall.innerText = `$${sumValue.toLocaleString('en')}`;
    sumPrint.appendChild(sumSmall)
    lists.appendChild(sumPrint)
}
