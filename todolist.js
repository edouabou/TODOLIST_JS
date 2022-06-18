'use strict'
//import {ArrayStorage} from 'ArrayStorage.js'

const input = document.getElementById('input');
const add = document.getElementById('add');
const clear = document.getElementById('clear');
const url = document.getElementById('url');
const load = document.getElementById('load');
const list = document.getElementById('list');

// nouvelle instance pour la clé tasks
const storage = new ArrayStorage('tasks');
const tasks = storage.list;

function tastToDOM(task) {
    if (typeof task==='string' && task){
        const li = document.createElement('li');
        const remove = document.createElement('button');
        li.textContent = task;
        remove.textContent = 'REMOVE'
        remove.addEventListener('click',()=>{
            const value = remove.parentNode.firstElementChild.textContent;
            storage.remove(value);
            list.removeChild(remove.parentNode)
        });
        li.appendChild(remove);
        list.insertBefore(li,list.firstElementChild);
        return true
    }
    return false
}
tasks.forEach(task => tastToDOM(task))

// ajout des taches
function newTask(){
    if (storage.list.indexOf(input.value)=== -1 && tastToDOM(input.value)) {
      storage.set(input.value); 
      input.value = '' 
    }
    input.focus();
}
add.addEventListener('click',newTask);
input.addEventListener('keydown',(e)=>{
    if (e.key === 'Enter'){
        newTask();
    }
});

// supprimer la liste du Dom et du navigateur
clear.addEventListener('click',()=>{
    storage.clear();
    list.innerHTML = '';
})

// importation de taches
load.addEventListener('click',()=>{
    fetch(url.value)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error(`${response.statusText} (${response.status})`)
        })
    .then(tasks =>{
        if(Array.isArray(tasks)){
            tasks.forEach(task =>{
                if (storage.list.indexOf(task)=== -1 && tastToDOM(task)) {
                    storage.set(task); 
                  }
            } )
            return
        }
        throw new TypeError(`La reponse n'est pas un tableau JSON (type: ${typeof response})`)
    })
    .catch(e => console.error(e))

});