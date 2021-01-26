const username = 'Meezy';
// let age = 20;
const hasHobbies = true;

const sumarizeUser = (userName, userAge, userHasHobby) => {
    return 'Name is ' + userName + 'Age is ' + userAge + 'Hobbies: ' + userHasHobby;
};

// console.log(sumarizeUser(username, age, hasHobbies));

const person = {
    name: 'Meezy',
    age: 29,
    greet(){
        console.log('Hi, I am ' + this.name);
    }
};

const copiedPerson = {...person};

console.log(person);
person.greet();

const hobbies = ['sports', 'cooking'];

for (let hobby of hobbies){
    console.log(hobby);
}

console.log(hobbies.map(hobby => `hobby:` + hobby));

hobbies.push('Programming');

console.log(hobbies);

const copiedArray = [...hobbies];

console.log(copiedArray);

console.log(copiedPerson);

const toArray = (...args) => {
    return args;
}

console.log(toArray(1,2,3))


const printName = ({ name, greet }) => {
    console.log(person.name);
}

printName(person);

const { name, age } = person;

console.log(name, age);

const [ hobby1, hobby2 ] = hobbies;
console.log(hobby1, hobby2);
const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done')
        }, 1500);
    });
    return promise;
}

setTimeout(() => {
    console.log('Timer is done')
    fetchData()
        .then(res => console.log(res))
        .catch(err => console.log(err));
}, 2000);

console.log("Hello");
console.log('Hii!!');








