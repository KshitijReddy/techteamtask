const nameArr = [];
const amountArr = [];
const choiceArr = [];
const dateArr = [];
const categoryArr = [];
let totalIncome = 0;
let totalExpenses = 0;
let balance = 0;

balance = parseFloat(prompt("Your Initial Balance in numbers...").trim());

function storeInput() {
    const inputVar = document.getElementById("userInput");
    const amountVar = document.getElementById("amountInput");
    const dateVar = document.getElementById("date");
    const category = document.getElementById("categorization").value;
    const choice = document.getElementById("mySelect").value;

    const value1 = inputVar.value.trim();
    const value2 = parseFloat(amountVar.value.trim());
    const date = dateVar.value.trim();

    if (value1 !== "" && !isNaN(value2)) {
        if (choice === "spent" && value2 > balance) {
        alert("Error: Not enough balance to spend this amount."); // gives alert if the amount to be spent is more than the balance
        return;
        }

    const dateFormatCheck = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dateFormatCheck.test(date)) {  //Checks whether the date formate is correct or not
        alert("Invalid date format. Please use (DD/MM/YYYY) format.");
        return;
    }

    nameArr.push(value1);
    amountArr.push(value2);
    dateArr.push(date);
    categoryArr.push(category);
    choiceArr.push(choice);

    if (choice === "received") {
      totalIncome += value2;
      balance += value2;
    } 
    else {
      totalExpenses += value2;
      balance -= value2;
    }

    inputVar.value = "";
    amountVar.value = "";
    dateVar.value = "";

    updateDisplay();
  }
}

function searchDetails() {
    const Search = document.getElementById("Name");
    const serialNumber = parseInt(Search.value.trim());

    const list = document.getElementById("Details");
    list.innerHTML = "";

        const li = document.createElement("li");
        li.textContent = `${nameArr[serialNumber - 1]} (${dateArr[serialNumber - 1]}): Amount ${choiceArr[serialNumber - 1]} by you = ₹${amountArr[serialNumber - 1]} for ${categoryArr[serialNumber - 1]}`;
        list.appendChild(li);
}


function updateDisplay() {
    const list = document.getElementById("displayList");
    list.innerHTML = "";
    for (let i = 0; i < nameArr.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. ${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
        list.appendChild(li);
    }
}

function totIncome() {
    document.getElementById("dashboard").innerHTML = `
        <li><p onclick="totIncome()" id="income" class="cursor">Total Income <br> ₹${totalIncome}</p></li>
        <li><p onclick="totExpense()" id="expense" class="cursor">Total Expenses</p></li>
        <li><p class="cursor">Balance <br> ₹${balance}</p></li>`;
}

function totExpense() {
    document.getElementById("dashboard").innerHTML = `
        <li><p onclick="totIncome()" id="income" class="cursor">Total Income</p></li>
        <li><p onclick="totExpense()" id="expense" class="cursor">Total Expenses <br> ₹${totalExpenses}</p></li>
        <li><p class="cursor">Balance <br> ₹${balance}</p></li>`;
}

function editTransaction() {
    const Search = document.getElementById("Name");
    const serialNumber = parseInt(Search.value.trim());
    let income = totalIncome;
    let expense = totalExpenses; 
    let balanceVar = balance;

    const list = document.getElementById("Details");
    list.innerHTML = "";

    if (isNaN(serialNumber) || serialNumber < 1 || serialNumber > nameArr.length) {
        alert("Invalid serial number.");
        return;
    }

    if (choiceArr[serialNumber - 1] === "received") {
        income -= amountArr[serialNumber - 1];
        balanceVar -= amountArr[serialNumber - 1];
    } else {
        expense -= amountArr[serialNumber - 1];
        balanceVar += amountArr[serialNumber - 1];
    }

    const newName = prompt(`Change name from "${nameArr[serialNumber - 1]}" to?`).trim();
    let newAmount = parseFloat(prompt(`Change the amount from ₹${amountArr[serialNumber - 1]} to?`)); //if we dont use parse float the taken input is in the form of string and i was getting the expected value.
    if (isNaN(newAmount) || newAmount < 0) {
        alert("Invalid amount entered.");
        return;
    }

    let newChoice = prompt("Money received or spent? (Type 'received' or 'spent')").trim().toLowerCase();
    while (newChoice !== "received" && newChoice !== "spent") {
        newChoice = prompt("Invalid input. Please type 'received' or 'spent'.").trim().toLowerCase();
    }

    if(balanceVar < 0)
    {
        alert("Error: Not enough balance to edit this transaction.");
        return;
    }

    balance = balanceVar;
    totalIncome = income;
    totalExpenses = expense;

    const newDate = prompt(`Change the date from ${dateArr[serialNumber - 1]} to? (format: DD/MM/YYYY)`).trim();

    nameArr[serialNumber - 1] = newName;
    amountArr[serialNumber - 1] = newAmount;
    choiceArr[serialNumber - 1] = newChoice;
    dateArr[serialNumber - 1] = newDate;

    if (newChoice === "received") {
        totalIncome += newAmount;
        balance += newAmount;
    } else {
        totalExpenses += newAmount;
        balance -= newAmount;
    }

    const li = document.createElement("li");
    li.textContent = `${nameArr[serialNumber - 1]} (${dateArr[serialNumber - 1]}): Amount ${choiceArr[serialNumber - 1]} by you = ₹${amountArr[serialNumber - 1]} for ${categoryArr[serialNumber - 1]}`;
    list.appendChild(li);

    updateDisplay();

    Search.value = "";
}



function deleteTransaction(){
    const Search = document.getElementById("Name");
    const serialNumber = parseInt(Search.value.trim());
    let income = totalIncome;
    let expense = totalExpenses; 
    let balanceVar = balance;

    const list = document.getElementById("Details");
    list.innerHTML = "";

    
    if (isNaN(serialNumber) || serialNumber < 1 || serialNumber > nameArr.length) {   // Checks if the serial number is valis or not
        alert("Invalid serial number.");
        return;
    }

    const index = serialNumber - 1;

    if (choiceArr[index] === "received") {
        income -= amountArr[index];
        balanceVar -= amountArr[index]; 
    } else {
        expense -= amountArr[index];
        balanceVar += amountArr[index];
    }

    if(balanceVar < 0) {
        alert("Error: Not enough balance to delete this Transaction.");
        return;
    }
    
        balance = balanceVar;
        totalIncome = income;
        totalExpenses = expense;

        for (let i = index; i < nameArr.length; i++) {
            nameArr[i] = nameArr[i+1];
            amountArr[i] = amountArr[i+1];
            choiceArr[i] = choiceArr[i+1];
            dateArr[i] = dateArr[i+1];
            categoryArr[i] = categoryArr[i+1];
        }

        // Removing the extra empty element from the arrays.
        nameArr.length--;
        amountArr.length--;
        choiceArr.length--;
        dateArr.length--;
        categoryArr.length--;

        updateDisplay();

        Search.value = "";
    
}


function searchFood() {
    const list = document.getElementById("foodDetails");
    list.innerHTML = "";

    let a = 0
    
    for (let i = 0; i < categoryArr.length; i++) {
        const element = categoryArr[i];
        
        if(element === "food") {
            const li = document.createElement("li");
            li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
            list.appendChild(li);
            a = 1;
        }
    }
    if (a == 0) {
        const li = document.createElement("li");
        li.textContent = `No transactions found for this Category.`;
        list.appendChild(li);
    }

}

function searchUtilities() {
    const list = document.getElementById("utilitiesDetails");
    list.innerHTML = "";

    let a = 0
    
    for (let i = 0; i < categoryArr.length; i++) {
        const element = categoryArr[i];
        
        if(element === "utilities") {
            const li = document.createElement("li");
            li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
            list.appendChild(li);
            a = 1;
        }
    }
    if (a == 0) {
        const li = document.createElement("li");
        li.textContent = `No transactions found for this Category.`;
        list.appendChild(li);
    }
}

function searchEntertainment() {
    const list = document.getElementById("entertainmentDetails");
    list.innerHTML = "";

    let a = 0
    
    for (let i = 0; i < categoryArr.length; i++) {
        const element = categoryArr[i];
        
        if(element === "entertainment") {
            const li = document.createElement("li");
            li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
            list.appendChild(li);
            a = 1;
        }
    }
    if (a == 0) {
        const li = document.createElement("li");
        li.textContent = `No transactions found for this Category.`;
        list.appendChild(li);
    }
}

function searchSalary() {
    const list = document.getElementById("salaryDetails");
    list.innerHTML = "";

    let a = 0
    
    for (let i = 0; i < categoryArr.length; i++) {
        const element = categoryArr[i];
        
        if(element === "salary") {
            const li = document.createElement("li");
            li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
            list.appendChild(li);
            a = 1;
        }
    }
    if (a == 0) {
        const li = document.createElement("li");
        li.textContent = `No transactions found for this Category.`;
        list.appendChild(li);
    }
}

function filterByDate() {
    const dateVariable = prompt("Enter the date to filter by (format: DD/MM/YYYY):").trim();
    
    const dateFormatCheck = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dateFormatCheck.test(dateVariable)) {  //Checks whether the date formate is correct or not
        alert("Invalid date format. Please use (DD/MM/YYYY) format.");
        return;
    }

    const list = document.getElementById("filteringByDate");
    list.innerHTML = "";

    let q = 0;
    for (let i = 0; i < dateArr.length; i++) {
        if (dateArr[i] === dateVariable) {
            const li = document.createElement("li");
            li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
            list.appendChild(li);
            q = 1;
        }
    }

    if (q == 0) {
        const li = document.createElement("li");
        li.textContent = `No transactions found on ${dateVariable}.`;
        list.appendChild(li);
    }
}

function filterByCategory() {
    let categoryVariable = prompt("Enter the Category:'food' or 'utilities' or 'entertainment' or 'salary'.").trim().toLowerCase();

    while (categoryVariable !== "food" && categoryVariable !== "utilities" && categoryVariable !== "entertainment" && categoryVariable !== "salary" ) {
        categoryVariable = prompt("Invalid input. Please type 'food' or 'utilities' or 'entertainment' or 'salary'.").trim().toLowerCase();
    }

    const list = document.getElementById("filteringByCategories");
    list.innerHTML = "";

    let c = 0;

    if(categoryVariable === "food") {
        for (let i = 0; i < categoryArr.length; i++) {
            const element = categoryArr[i];
            
            if(element === "food") {
                const li = document.createElement("li");
                li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
                list.appendChild(li);
                c = 1;
            }
        }
    }
    else if (categoryVariable === "utilities") {

        for (let i = 0; i < categoryArr.length; i++) {
            const element = categoryArr[i];
            
            if(element === "utilities") {
                const li = document.createElement("li");
                li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
                list.appendChild(li);
                c = 1;
            }
        }
    }
    else if(categoryVariable === "entertainment") {
        for (let i = 0; i < categoryArr.length; i++) {
            const element = categoryArr[i];
            
            if(element === "entertainment") {
                const li = document.createElement("li");
                li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
                list.appendChild(li);
                c = 1;
            }
        }
    }
    else if (categoryVariable === "salary") {
        for (let i = 0; i < categoryArr.length; i++) {
            const element = categoryArr[i];
            
            if(element === "salary") {
                const li = document.createElement("li");
                li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
                list.appendChild(li);
                c = 1;
            }
        }
    }
    
    if (c == 0) {
        const li = document.createElement("li");
        li.textContent = `No transactions found for this Category.`;
        list.appendChild(li);
    }

}

function filterByType() {
    let choiceVariable = prompt("Enter whether the transaction was an 'income' or 'expense'.").trim().toLowerCase();

    while (choiceVariable !== "income" && choiceVariable !== "expense") {
        choiceVariable = prompt("Invalid input. Please type 'income' or 'expense'.").trim().toLowerCase();
    }

    const list = document.getElementById("filteringByType");
    list.innerHTML = "";

    let b = 0;

    if(choiceVariable == "income") {
        for (let i = 0; i < choiceArr.length; i++) {
            const element = choiceArr[i];
            
            if(element === "received") {
                const li = document.createElement("li");
                li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
                list.appendChild(li);
                b = 1;
            }
        }
    }
    else if (choiceVariable === "expense") {
        for (let i = 0; i < choiceArr.length; i++) {
            const element = choiceArr[i];
            
            if(element === "spent") {
                const li = document.createElement("li");
                li.textContent = `${nameArr[i]} (${dateArr[i]}): Amount ${choiceArr[i]} by you = ₹${amountArr[i]} for ${categoryArr[i]}`;
                list.appendChild(li);
                b = 1;
            }
        }
    }

    if (b == 0) {
        const li = document.createElement("li");
        li.textContent = `No transactions found for this Type.`;
        list.appendChild(li);
    }
}
