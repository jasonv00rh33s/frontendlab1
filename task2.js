class User {
    constructor(lastName, firstName, age, education, feedback_goal, date_of_appeal, time_of_appeal){
        this.lastName = lastName;
    this.firstName = firstName;
        this.age = age;
        this.education = education;
        this.feedback_goal = feedback_goal;
        this.date_of_appeal = date_of_appeal;
        this.time_of_appeal = time_of_appeal;
    }

    getMonth() {
    let parts = this.date_of_appeal.split("-");
    return Number(parts[1]);
  }

   getTime() {
    let parts = this.time_of_appeal.split(":");
    return Number(parts[0]);
   }
}

let users = [
  new User("Коваленко", "Олег", 20, "вища", "претензія", "2026-10-15", "10:30"),
  new User("Мельник", "Анна", 25, "неповна", "побажання", "2026-10-15", "14:00"),
  new User("Шевченко", "Іван", 30, "професійна", "претензія", "2026-10-20", "11:15"),
  new User("Бондар", "Марія", 35, "вища", "інше", "2026-11-05", "18:30"),
  new User("Ткаченко", "Сергій", 40, "повна", "побажання", "2026-10-15", "14:00"),
  new User("Кравченко", "Юлія", 20, "вища", "побажання", "2026-09-12", "09:10"),
  new User("Олійник", "Дмитро", 25, "професійна", "претензія", "2026-10-15", "20:00"),
  new User("Мороз", "Олена", 30, "вища", "побажання", "2026-10-18", "16:45"),
  new User("Лисенко", "Андрій", 35, "повна", "претензія", "2026-12-01", "12:00"),
  new User("Гриценко", "Наталія", 40, "вища", "інше", "2026-10-15", "14:00")
];


console.log("Всі користувачі:");
console.table(users);
// 1. Виведення переліку користувачів, який звернулись продовж певного місяця, в деякий заданий момент часу. 
let searchMonth = 10;
let searchTime = "14:00";
let filteredUsers = [];


for (let i = 0; i < users.length; i++) {
    if (users[i].getMonth() === searchMonth && users[i].time_of_appeal === searchTime){
        filteredUsers.push(users[i]);
    }
}

console.log(`Користувачі за місяць ${searchMonth} о ${searchTime}:`)
console.table(filteredUsers);

// 2. Вивести середній вік користувачів і якщо він співпадає із віком деякого користувача, то надати його персональні дані про освіту. 

let totalAge = 0;
let usersCount = 0;
for (let i = 0; i < users.length; i++){
    totalAge += users[i].age
}
let ageAvg = totalAge / users.length;

for (let i = 0; i < users.length; i++) {
  if (users[i].age === ageAvg) {
    console.log(`Користувач з віком ${ageAvg} (${users[i].lastName}): освіта - ${users[i].education}`);
  }
}


// 3. Поділити користувачів за часом звернення та метою на три класи – 
// «звернулись з претензією у робочий час» (з 09:00 до 18:00), «звернулись 
// з побажанням у робочий час» та «Інші». Знайти кількість користувачів у 
// кожному з класів. 

let usersWithComplaint = [];
let usersWithAWish = [];
let others = [];


for (let i = 0; i < users.length; i++){
    if (users[i].getTime() >= 9 && users[i].getTime() < 18 && users[i].feedback_goal === "претензія"){
        usersWithComplaint.push(users[i]);
    } else if (users[i].getTime() >= 9 && users[i].getTime() < 18 && users[i].feedback_goal === "побажання"){
        usersWithAWish.push(users[i]);
    } else {
        others.push(users[i]);
    }
}
console.log("Кількість користувачів з претензією: ", usersWithComplaint.length);
console.log("Кількість користувачів з побажанням: ", usersWithAWish.length);
console.log("Інші: ", others.length);

// 4. Сортування за спаданням віку
let sortedByAge = [...users].sort(function(a, b) {
  return b.age - a.age;
});
console.log("Сортування за спаданням віку:");
console.table(sortedByAge);

// 4. Сортування за алфавітом (прізвище)
let sortedByName = [...users].sort(function(a, b) {
  if (a.lastName > b.lastName) return 1;
  if (a.lastName < b.lastName) return -1;
  return 0;
});
console.log("Сортування за алфавітом:");
console.table(sortedByName);