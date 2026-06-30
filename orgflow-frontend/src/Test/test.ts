let myName: string = "Mr. M"
let myAge: number = 20

interface Employee {
    id: number
    name: string
    department: string
    age: number
}

let emp: Employee = {
    id: 1,
    name: "M",
    department: "IT",
    age: myAge
}

console.log(emp)
