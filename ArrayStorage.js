'use strict'

class ArrayStorage {
    //constructeur pour initialiser l'objet
    constructor(name){
        this.name = name
        this.list = this.get()
    }
    //methode pour recuperer une tache
    get(){
        if (!localStorage.getItem(this.name)) {
           localStorage.setItem(this.name,'[]') 
        }
        return JSON.parse(localStorage.getItem(this.name))
    }
    // methode pour ajouter une tache
    set(value){
        this.list.push(value);
        localStorage.setItem(this.name,JSON.stringify(this.list)); 
    }
    // methode pour supprimer une tache
    remove(value){
        const index = this.list.indexOf(value);
        this.list.splice(index,1);
        localStorage.setItem(this.name,JSON.stringify(this.list));
    }
    // methode pour vider tout le tableau
    clear() {
        localStorage.removeItem(this.name);
    }
}

