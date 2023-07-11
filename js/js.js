
import { getData, BASE_URL, postData, delData, newData } from "./http.js"

let form = document.querySelector('form')
let age = document.querySelector('#age')
let nameInput = document.querySelector('#name')
let btn = document.querySelector('.btn')

let box1 = document.querySelector('.box1')
let box2 = document.querySelector('.box2')
let box3 = document.querySelector('.box3')

const modal = document.querySelector('#modal')
const newName = document.querySelector('#newName')
const newAge = document.querySelector('#newAge')
const saveChange = document.querySelector('#saveChanges')
const cancelChange = document.querySelector('#cancelChanges')

let users = []

getData('/users')
    .then(res => reload(res))

form.onsubmit = (event) => {
    event.preventDefault()

    let user = {
        id: Math.random(),
        firstName: nameInput.value,
        age: age.value,
        image: catigories(+age.value)
    }

    let fm = new FormData(event.target)

    fm.forEach((value, key) => {
        user[key] = value
    })

    postData("/users", user)
        .then(() => {
            getData('/users')
                .then(res => reload(res))
        })



}
function catigories(age) {
    if (age === 666) {
        return "/img/black.jpg";
    } else if (age === 777) {
        return "/img/new.jpg";
    } else if (age >= 25 && age <= 50) {
        return "/img/robot.png";
    } else if (age <= 25) {
        return "/img/50r.png";
    } else if (age >= 50) {
        return "/img/puxliy.png";
    }
}

function reload(users) {

    box1.innerHTML = ''
    box2.innerHTML = ''
    box3.innerHTML = ''

    for (let item of users) {

        let div = document.createElement('div')
        let edit = document.createElement('span')
        let p_nm = document.createElement('p')
        let sp_i = document.createElement('span')
        let p_age = document.createElement('p')
        let sp_age = document.createElement('span')
        let img = document.createElement('img')

        div.classList.add('item')
        edit.classList.add('edit')
        p_nm.classList.add('nm')
        p_age.classList.add('age')

        edit.innerHTML = '✏️'
        p_nm.innerHTML = item.firstName
        sp_age.innerHTML = 'Age:'
        p_age.innerHTML = item.age
        img.src = item.image

        if (item.age <= 25) {
            box1.append(div)
        } else if (item.age <= 50) {
            box2.append(div)
        } else if (item.age >= 50) {
            box3.append(div)
        }

        div.append(edit, p_nm, p_age)
        p_nm.append(sp_i)
        sp_i.append(img)
        p_age.prepend(sp_age)


        div.ondblclick = async () => {
            const agreement = confirm("Вы действительно хотите удалить пользователя?")

            if (agreement) {
                await delData(item.id);
                const relData = await getData('/users')
                reload(relData)
            }
        }

        edit.onclick = async () => {
            openModal(item.id, item.firstName, item.age)
            // const relData = await getData('/users')
            //     reload(relData)

        }
    }
    age.value = ''
    nameInput.value = ''
}


// async function newData(userId) {
//     const relData = await getData('/users')
//     reload(relData)
// }
async function usersNewData()  {
   let ud = await getData('/users')
    reload(ud)
}

function openModal(userId, currNm, currAge) {

    newName.value = currNm
    newAge.value = currAge

    saveChange.onclick = () => {
        const newNval = newName.value
        const newAval = newAge.value

        newData(userId, { firstName: newNval, age: newAval })
        usersNewData(userId, { firstName: newName, age: newAge })

        closeModal()
    }
    cancelChange.onclick = () => {
        closeModal()
    }
    modal.style.display = 'block'
}

function closeModal() {
    modal.style.display = 'none';
}