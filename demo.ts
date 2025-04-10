let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const [un, deux, ...nomdevotrevariable] = array;

console.log(un, deux, nomdevotrevariable);

const person = {
  name: "John",
  age: 20,
  city: "New York",
};

const { age, city } = person;

console.log(age, city);
