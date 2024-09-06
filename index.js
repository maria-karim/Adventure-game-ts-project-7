#! /usr/bin/env node
import inquirer from "inquirer";
let enemies = ['skeleton', 'zombie', 'warrior', 'assassin'];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 50;
let numHealthPortion = 3;
let healthPortionHealAmount = 30;
let healthPortionDropChance = 50; //percntage
let running = true;
let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max - min) + min;
};
console.log("\n\twelcome to the Dungeon !");
GAME: while (running) {
    console.log("\t-----------------------------");
    let enemmyHealth = getRandomNumber(1, maxEnemyHealth);
    let enemy = enemies[getRandomNumber(0, enemies.length - 1)];
    console.log(`\t# ${enemy}has apperared #\n`);
    while (enemmyHealth > 0) {
        console.log(`\tYour Hp: ${health}`);
        console.log(`\t${enemy}HP: ${enemmyHealth}`);
        let control = await inquirer.prompt({
            message: "\n\tWhat would you like to do?",
            type: "list",
            choices: ["Attack", "Drink health portion", "Run"],
            name: "command"
        });
        switch (control.command) {
            case "Attack":
                let strikeDamage = getRandomNumber(1, attackDamage);
                let damageTaken = getRandomNumber(1, enemyAttackDamage);
                health -= damageTaken;
                enemmyHealth -= strikeDamage;
                console.log(`\tYou strike the ${enemy} with ${strikeDamage} damage.`);
                console.log(`\tYou recieved ${damageTaken} damage from the enemy`);
                if (health < 1) {
                    console.log(`\tYou taken too much damage.You are too weak to go on.`);
                    break;
                }
                break;
            case "\tDrink health portion":
                if (numHealthPortion > 0) {
                    health += healthPortionHealAmount;
                    console.log(`\tYou drink health portion, healing yourself for ${healthPortionHealAmount}\n\tYou now have${health}HP\n\tYOu now have${numHealthPortion} left`);
                }
                else
                    console.log(`\tYou have no health Portions left,defeat enemies for a chance to get one.`);
                break;
            case "\tRun":
                console.log(`\t You run away from the ${enemy}.`);
                continue GAME;
                break;
        }
    }
    if (health < 1) {
        console.log(`\t You limp out of the dungeon, weak from battle`);
        break;
    }
    console.log("\t-------------------------------------------");
    console.log(`\t#${enemy}has been defeated #`);
    console.log(`\t# you have ${health} HP left #`);
    if (getRandomNumber(1, 100) < healthPortionDropChance) {
        numHealthPortion++;
        console.log(`\t# the ${enemy} dropepd the health portion #`);
        console.log(`\t# you now have a ${numHealthPortion}health portion(s).#`);
    }
    let stateControl = await inquirer.prompt({
        message: "\twhat would you like to do? ",
        type: "list",
        choices: ["\tcontinue Fighting", "\tExit Dengeon"],
        name: "command"
    });
    if (stateControl.command == "\tcontinue Fighting") {
        console.log(`\tYou can continue your adventure!`);
    }
    else {
        console.log(`\tYou exit the dungeon , sucessfull from your adventure`);
        break;
    }
}
console.log(`\t######################`);
console.log(`\tTHANK YOU FOR PLAYING`);
console.log(`\t#####################`);
