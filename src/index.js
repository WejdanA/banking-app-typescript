// bank class
class Bank {
  constructor(name) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch) {
    if (this.checkBranch(branch)) {
      console.log(`this baranch "${branch.getName()}" already added `);
      return false;
    }
    this.branches.push(branch);
    console.log(`${branch.getName()} was added to ${this.name}`);
  }

  addCustomer(branch, customer) {
    if (this.checkBranch(branch)) {
      return branch.addCustomer(customer);
    }
    console.log(`there is no ${branch.getName()}branch in ${this.name} bank `);
    return false;
  }

  addCustomerTransaction(branch, customerId, amount) {
    if (this.checkBranch(branch)) {
      return branch.addCustomerTransaction(customerId, amount);
    }
    console.log(` there are no branch with name ${branch.name}`);
    return false;
  }

  findBranchByName(branchName) {
    let branch = this.branches.filter(
      (branch) => branch.getName() == branchName
    );
    if (branch.length == 0) {
      console.log(`there is no branch with this name "${branchName}"`);
      return null;
    }
    return branch;
  }

  checkBranch(branch) {
    if (this.branches.includes(branch)) {
      return true;
    }
    return false;
  }

  listCustomers(branch, includeTransactions) {
    console.log(`_____${this.name} bank ${branch.getName()} list_____`);
    if (this.checkBranch(branch)) {
      console.log(branch.getName());
      let customers = branch.getCustomers();
      for (let customer of customers) {
        console.log("customer: Id | name");
        console.log(`         ${customer.getId()}   ${customer.getName()}`);

        let transactions = customer.getTransactions();

        if (includeTransactions) {
          console.log(`transiactions:`);
          for (let transaction of transactions) {
            console.log(
              `amount:${transaction.amount} date:${transaction.date}`
            );
          }
          console.log("____________");
        }
      }
    } else {
      console.error(`The ${branch.getName()}is not found`);
    }
  }
}
// branch class
class Branch {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }

  getName() {
    return this.name;
  }

  getCustomers() {
    return this.customers;
  }

  addCustomer(customer) {
    let condition = this.getCustomers().find(
      (cust) => cust.getId() == customer.getId()
    );

    if (!condition) {
      this.getCustomers().push(customer);
      console.log(
        `${customer.getId()}, ${customer.getName()} was added to ${this.name}`
      );
      return true;
    }
    console.log(
      `${customer.getId()}, ${customer.getName()} already added to ${this.name}`
    );

    return false;
  }

  addCustomerTransaction(customerId, amount) {
    let index = this.getCustomers().findIndex(
      (customer) => customer.getId() == customerId
    );
    if (index == -1) {
      console.log(`this customer is not found in ${this.getName()}`);
      return false;
    }

    this.getCustomers()[index].addTransactions(amount);
    return true;
  }
}

// customr class
class Customer {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getTransactions() {
    return this.transactions;
  }
  getBalance() {
    let balance = this.getTransactions().reduce((balance, current) => {
      return balance + current.amount;
    }, 0);

    return balance;
  }

  addTransactions(amount) {
    if (this.getBalance() + amount >= 0) {
      let date = new Date();
      this.getTransactions().push({ amount, date });
      console.log(
        ` the transaction was processed successfully \n your current balance is ${this.getBalance()}`
      );
      return true;
    }
    console.log(
      ` There is no enough balance for this transaction \n your current balance is ${this.getBalance()}`
    );
    return false;
  }
}

// transation class
class Transaction {
  constructor(amount, date) {
    this.amount = amount;
    this.date = date;
  }
}

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);
console.log("___________________________________________");
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);

console.log("___________________________________________");
console.log(arizonaBank.findBranchByName("bank"));
console.log(arizonaBank.findBranchByName("sun"));

console.log("___________________________________________");
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomer(sunBranch, customer2);
console.log("___________________________________________");
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

console.log("___________________________________________");
customer1.addTransactions(-1000);
customer1.addTransactions(-5000);
console.log(customer1.getBalance());
arizonaBank.listCustomers(westBranch, true);
arizonaBank.listCustomers(sunBranch, true);
