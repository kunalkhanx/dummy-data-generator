function randomAge() {
    let num = 0;
    const rnd = Math.random();

    if (rnd < 0.5) {
        // 50% chance to generate number between 25 and 35
        num = Math.floor(Math.random() * 11) + 25;
    } else {
        // 50% chance to generate number between 16 and 24, or between 36 and 80
        const rnd2 = Math.random();
        if (rnd2 < 0.333) {
            num = Math.floor(Math.random() * 9) + 16;
        } else {
            num = Math.floor(Math.random() * 45) + 36;
        }
    }
    return num;
}

function generateRandomDOB(age) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthYear = currentYear - age;

    const minTimestamp = new Date(`${birthYear}-01-01`).getTime();
    const maxTimestamp = new Date(`${birthYear}-12-31`).getTime();

    const randomTimestamp =
        Math.floor(Math.random() * (maxTimestamp - minTimestamp + 1)) +
        minTimestamp;

    const randomDate = new Date(randomTimestamp);
    const month = (randomDate.getMonth() + 1).toString().padStart(2, 0);
    const day = randomDate.getDate().toString().padStart(2, 0);
    const year = randomDate.getFullYear().toString().padStart(2, 0);

    return `${year}-${month}-${day}`;
}

function randomNum(length) {
    return Math.floor(Math.random() * length);
}

function flip(chance = 0.5) {
    return Math.random() < chance;
}

function randomUsername(first_name, last_name, age) {
    const words = [
        "cool",
        "hip",
        "chic",
        "awesome",
        "epic",
        "trendy",
        "funky",
        "neat",
        "slick",
        "smart",
        "sharp",
        "snazzy",
        "sassy",
        "spunky",
        "classy",
        "jazzy",
        "fierce",
        "fly",
        "fresh",
        "hot",
        "swanky",
        "tasty",
        "groovy",
        "rad",
        "rockin",
        "smooth",
        "solid",
        "sweet",
        "dapper",
        "dashing",
        "handsome",
        "sleek",
        "stylish",
        "urbane",
        "vogue",
        "wild",
        "zealous",
        "bright",
        "brilliant",
        "sparkling",
        "vibrant",
        "dazzling",
        "fiery",
        "glowing",
        "radiant",
        "shimmering",
        "shiny",
        "glistening",
        "polished",
        "refined",
        "elegant",
        "fancy",
        "luxurious",
        "opulent",
        "plush",
        "ritzy",
        "sumptuous",
        "swank",
        "charming",
        "cute",
        "darling",
        "lovely",
        "precious",
        "adventurous",
        "bold",
        "courageous",
        "determined",
        "fearless",
        "gutsy",
        "heroic",
        "mighty",
        "powerful",
        "resilient",
        "tenacious",
        "strong",
        "wise",
        "witty",
        "clever",
        "genius",
        "intelligent",
        "smart",
        "wise",
        "brainy",
        "bright",
        "sharp",
        "gifted",
        "talented",
        "skillful",
        "artistic",
        "creative",
        "imaginative",
        "inspired",
        "inventive",
        "original",
        "resourceful",
        "versatile",
        "ambitious",
        "driven",
        "motivated",
        "persistent",
        "dedicated",
        "devoted",
        "faithful",
        "loyal",
        "reliable",
        "dependable",
        "trustworthy",
        "authentic",
        "genuine",
        "real",
        "true",
        "honest",
        "sincere",
        "upright",
        "ethical",
        "moral",
        "principled",
        "virtuous",
        "benevolent",
        "caring",
    ];
    const separator = ["", "", "_", "."];
    let flipResult = flip(0.8);
    let username = "";
    if (flipResult) {
        username = first_name + separator[randomNum(separator.length)];
        if (age < 30) {
            username += words[randomNum(words.length)];
        } else {
            username += last_name;
        }
    } else {
        username = last_name + separator[randomNum(separator.length)];
        if (age < 30) {
            username += words[randomNum(words.length)];
        } else {
            username += first_name;
        }
    }
    username += separator[randomNum(separator.length)];
    username += flip()
        ? new Date().getFullYear() - (age + 1)
        : flip()
        ? randomNum(999)
        : age;

    return username.toLowerCase();
}

function generatePassword(firstName, lastName) {
    firstName = flip() ? firstName : (flip() ? firstName.toLowerCase() : firstName.toUpperCase())
    lastName = flip() ? lastName : (flip() ? lastName.toLowerCase() : lastName.toUpperCase())
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
   let password = ''
   while (password.length < 4) {
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    password += randomChar;
  }
  const flipResult = flip()
  if(flipResult){
    password = flip() ? firstName + password : password + firstName
  }else{
    password = flip() ? lastName + password : password + lastName
  }
  while(password.length < 9){
    password += randomNum(9)
  }
  return password
}


const createUsers = (first_names, last_names, size = 10) => {
    const users = [];
    let i = 1
    while (users.length < size) {
        let index = randomNum(first_names.length);
        const user = {};
        user.id = i
        user.first_name = first_names[index].first_name;
        index = randomNum(last_names.length);
        user.last_name = last_names[index].last_name;
        user.gender = first_names[index].sex == 'M' ? 'Male' : 'Female'
        user.age = randomAge();
        user.date_of_birth = generateRandomDOB(user.age);
        user.username = randomUsername(
            user.first_name,
            user.last_name,
            user.age
        );
        user.email = user.username + "@example.com";
        user.password = generatePassword(user.first_name, user.last_name)
        user.image = `https://fakeface.rest/face/view/${user.first_name}-${user.last_name}-${user.id}?gender=${user.gender.toLowerCase()}&maximum_age=${user.age}`
        users.push(user);
        i++
    }
    return users
};


module.exports = createUsers