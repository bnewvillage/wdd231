export default class User {
    constructor(age, name)
{
    this.age = age, 
    this.name = name
}}

export function printName(user){
    console.log(`User's name is ${user.name}`);
}

export function printAge(user){
    console.log(`User's age is ${user.age}`);
}