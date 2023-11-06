#! /usr/bin/env node
import inquirer from "inquirer";
;
let Users = [
    {
        userid: "shayan",
        userPin: 1234,
    },
    {
        userid: "ali",
        userPin: 2580,
    },
    {
        userid: "shan",
        userPin: 4567,
    }
];
let balance = Math.floor((Math.random() * 1000000));
let answers1;
let answers2;
startLoop();
async function startLoop() {
    await getuserid();
    do {
        await getTransaction();
        var again = await inquirer.prompt([
            {
                type: "list",
                name: "restart",
                choices: ['yes', 'No'],
                message: 'do you want to continue:',
            }
        ]);
    } while (again.restart == 'yes');
}
;
async function getuserid() {
    answers1 = await inquirer.prompt([
        {
            type: "input",
            name: "userid",
            message: "pleas enter your user ID:"
        },
        {
            type: "number",
            name: "userPin",
            message: "pleas enter your PIN:",
        },
    ]);
    await checkuserid(answers1.userid, answers1.userPin);
}
;
async function checkuserid(userid, userPin) {
    let condition = false;
    for (let i = 0; i < Users.length; i++) {
        if (userid === Users[i].userid && userPin === Users[i].userPin) {
            condition = true;
            break;
        }
    }
    if (!condition) {
        console.log(`Invalid user id or Pin .Try again.`);
        await getuserid();
    }
}
async function getTransaction() {
    answers2 = await inquirer.prompt([
        {
            type: "list",
            name: "accountType",
            choices: ["current", "saving"],
            message: `please select account Type:`,
        },
        {
            type: "list",
            name: "transType",
            choices: ["Fast Cash", "withdraw"],
            message: `please select transaction Type:`,
        },
        {
            type: "list",
            name: "amount",
            choices: ["500", "1000", "2000", "5000", "10000", "15000", "20000"],
            message: `please select your amount (Current Blance is ${balance}):`,
            when(answers2) {
                return answers2.transType == "Fast Cash";
            },
        },
        {
            type: "number",
            name: "amount",
            message: `please select your amount (Current Blance is ${balance}):`,
            when(answers2) {
                return answers2.transType == "withdraw";
            },
        }
    ]);
    if (answers1.userid && answers1.userPin) {
        if (answers2.amount <= balance) {
            balance -= answers2.amount;
            console.log(`Your Current balance is: ${balance}`);
        }
        else {
            console.log(`Insuficient balance  ${balance}`);
        }
    }
}
