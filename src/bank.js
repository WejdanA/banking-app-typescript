// bank class
var Bank = /** @class */ (function () {
  function Bank(name) {
    this.name = name;
    this.branches = [];
  }
  Bank.prototype.addBranch = function (branch) {
    if (this.checkBranch(branch)) {
      console.log(
        'this baranch "'.concat(branch.getName(), '" already added ')
      );
      return false;
    }
    this.branches.push(branch);
    console.log(
      "".concat(branch.getName(), " was added to ").concat(this.name)
    );
    return true;
  };
  Bank.prototype.addCustomer = function (branch, customer) {
    if (this.checkBranch(branch)) {
      return branch.addCustomer(customer);
    }
    console.log(
      "there is no "
        .concat(branch.getName(), "branch in ")
        .concat(this.name, " bank ")
    );
    return false;
  };
  Bank.prototype.addCustomerTransaction = function (
    branch,
    customerId,
    amount
  ) {
    if (this.checkBranch(branch)) {
      return branch.addCustomerTransaction(customerId, amount);
    }
    console.log(" there are no branch with name ".concat(branch.getName()));
    return false;
  };
  Bank.prototype.findBranchByName = function (branchName) {
    var branch = this.branches.filter(function (branch) {
      return branch.getName() == branchName;
    });
    if (branch.length == 0) {
      console.log(
        'there is no branch with this name "'.concat(branchName, '"')
      );
      return null;
    }
    return branch;
  };
  Bank.prototype.checkBranch = function (branch) {
    if (this.branches.includes(branch)) {
      return true;
    }
    return false;
  };
  Bank.prototype.listCustomers = function (branch, includeTransactions) {
    console.log(
      "_____".concat(this.name, " bank ").concat(branch.getName(), " list_____")
    );
    if (this.checkBranch(branch)) {
      console.log(branch.getName());
      var customers = branch.getCustomers();
      for (var _i = 0, customers_1 = customers; _i < customers_1.length; _i++) {
        var customer = customers_1[_i];
        console.log("customer: Id | name");
        console.log(
          "         ".concat(customer.getId(), "   ").concat(customer.getName())
        );
        var transactions = customer.getTransactions();
        if (includeTransactions) {
          console.log("transiactions:");
          for (
            var _a = 0, transactions_1 = transactions;
            _a < transactions_1.length;
            _a++
          ) {
            var transaction = transactions_1[_a];
            console.log(
              "amount:"
                .concat(transaction["amount"], " date:")
                .concat(transaction["date"])
            );
          }
          console.log("____________");
        }
      }
    } else {
      console.error("The ".concat(branch.getName(), "is not found"));
    }
  };
  return Bank;
})();
// branch class
var Branch = /** @class */ (function () {
  function Branch(name) {
    this.name = name;
    this.customers = [];
  }
  Branch.prototype.getName = function () {
    return this.name;
  };
  Branch.prototype.getCustomers = function () {
    return this.customers;
  };
  Branch.prototype.addCustomer = function (customer) {
    var condition = this.getCustomers().find(function (cust) {
      return cust.getId() == customer.getId();
    });
    if (!condition) {
      this.getCustomers().push(customer);
      console.log(
        ""
          .concat(customer.getId(), ", ")
          .concat(customer.getName(), " was added to ")
          .concat(this.name)
      );
      return true;
    }
    console.log(
      ""
        .concat(customer.getId(), ", ")
        .concat(customer.getName(), " already added to ")
        .concat(this.name)
    );
    return false;
  };
  Branch.prototype.addCustomerTransaction = function (customerId, amount) {
    var index = this.getCustomers().findIndex(function (customer) {
      return customer.getId() == customerId;
    });
    if (index == -1) {
      console.log("this customer is not found in ".concat(this.getName()));
      return false;
    }
    this.getCustomers()[index].addTransactions(amount);
    return true;
  };
  return Branch;
})();
// customr class
var Customer = /** @class */ (function () {
  function Customer(name, id) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }
  Customer.prototype.getName = function () {
    return this.name;
  };
  Customer.prototype.getId = function () {
    return this.id;
  };
  Customer.prototype.getTransactions = function () {
    return this.transactions;
  };
  Customer.prototype.getBalance = function () {
    var balance = this.getTransactions().reduce(function (balance, current) {
      return balance + current["amount"]; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }, 0);
    return balance;
  };
  Customer.prototype.addTransactions = function (amount) {
    if (this.getBalance() + amount >= 0) {
      var date = new Date();
      var newTransaction = new Transaction(amount, date);
      this.getTransactions().push(newTransaction);
      console.log(
        " the transaction was processed successfully \n your current balance is ".concat(
          this.getBalance()
        )
      );
      return true;
    }
    console.log(
      " There is no enough balance for this transaction \n your current balance is ".concat(
        this.getBalance()
      )
    );
    return false;
  };
  return Customer;
})();
// transation class
var Transaction = /** @class */ (function () {
  function Transaction(amount, date) {
    this.amount = amount;
    this.date = date;
  }
  return Transaction;
})();
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", 1);
var customer2 = new Customer("Anna", 2);
var customer3 = new Customer("John", 3);
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
