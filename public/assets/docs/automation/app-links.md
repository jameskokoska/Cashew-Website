App links enables an action to be executed immediately after the app is opened by clicking a link. It's possible to add transactions to the app with a single tap with any of the supported parameters. Links can be clicked from any application, launching Cashew, instructing the app to execute a set command. See the documentation and examples below for all possible endpoints and actions that can be performed from app links.

A discussion/thread on App Links can be found here: https://github.com/jameskokoska/Cashew/issues/127#issuecomment-1975096357. 

## Routes

To create a full endpoint, the following base route is required.

| Platform                  | Route                                          |
| ------------------------- | ---------------------------------------------- |
| `Android` / `iOS`         | `https://cashewapp.web.app/[Endpoint here]`    |
| `Web App`                 | `https://budget-track.web.app/[Endpoint here]` |

All supported endpoints and related parameters are listed below. Please note the examples listed use the `Android` / `iOS` route, and will therefore only function on an Android or iOS device that has Cashew installed.

## Add Single Transaction

| Endpoint                                   | Description                                                                                                                                                           |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/addTransaction`                          | Add a new transaction without a UI prompt (unless a category is missing).                                                                                             |
| `/addTransactionRoute`                     | Open the add new transaction route with information filled in.                                                                                                        |

| Parameter               | Description                                                                                                                                                                                                                                                                                                                              | Required | Default         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| `JSON`                  | A list of JSON objects of transactions. If provided, Cashew will import a list/multiple transactions at once. Each JSON object in the list can use any of the aforementioned parameters. The JSON object should be keyed with `transactions` followed by the list of objects. See the example below.                                     | No       | None            |
| `subcategoryPk`         | The primary key of the subcategory entry within the database.                                                                                                                                                                                                                                                                            | No       | None            |
| `subcategory`           | The name of the subcategory to add the transaction to. If provided, it overwrites the category if a subcategory is found under a main category. Executes a name search, takes the first entry, not case sensitive.                                                                                                                       | No       | None            |
| `categoryPk`            | The primary key of the category entry within the database.                                                                                                                                                                                                                                                                               | No       | Prompt user     |
| `category`              | The name of the category to add the transaction to. Executes a name search, takes the first entry, not case sensitive. Used to determine income or expense.                                                                                                                                                                              | No       | Prompt user     |
| `walletPk`              | The primary key of the wallet entry within the database.                                                                                                                                                                                                                                                                                 | No       | Primary account |
| `account` / `wallet`    | The name of the account. Executes a name search, takes the first entry, not case sensitive.                                                                                                                                                                                                                                              | No       | Primary account |
| `budgetPk`              | The primary key of the budget entry within the database. Note: this should be a "Added Transactions Only" budget                                                                                                                                                                                                                         | No       | None            |
| `budget`                | The name of the "Added Transactions Only" budget entry within the database.                                                                                                                                                                                                                                                              | No       | None            |
| `objectivePk`           | The primary key of the objective entry within the database. Note: an objective is either a goal or long-term loan                                                                                                                                                                                                                        | No       | None            |
| `goal`                  | The name of the objective to add the transaction to. Note: this refers to a goal name.                                                                                                                                                                                                                                                   | No       | None            |
| `loan`                  | The name of the objective loan to add the transaction to. Note: this refers to a long-term loan name.                                                                                                                                                                                                                                    | No       | None            |
| `objective`             | The name of the objective to add the transaction to. Note: this refers to a goal name.                                                                                                                                                                                                                                                   | No       | None            |
| `date` / `dateCreated`  | The date of the transaction. Supported string formats can be found in the `getCommonDateFormats()` method [here](https://github.com/jameskokoska/Cashew/blob/5.2.3%2B328/budget/lib/struct/commonDateFormats.dart).                                                                                                                      | No       | Current date    |
| `amount`                | The amount of the transaction. Note that income/expense transaction type is determined by the category.                                                                                                                                                                                                                                  | No       | 0               |
| `title` / `name`        | The title of the transaction. If an associated title is found and the category is not set, the associated title's category will be used.                                                                                                                                                                                                 | No       | Empty string    |
| `notes` / `note`        | The notes associated with the transaction.                                                                                                                                                                                                                                                                                               | No       | Empty string    |
| `prompt`                | Whether to prompt the user the initial inputs when `/addTransactionRoute` is used. A boolean value.                                                                                                                                                                                                                                      | No       | true            |
| `categoryPolarity`      | Whether to use the polarity (income/expense) of the category. If disabled, it will use the polarity of the amount (i.e. negative amount for expense, positive amount for income). A boolean value.                                                                                                                                       | No       | true            |

The transaction parameters are ordered in terms of precedence, the parameters at the top will be parsed before the ones below. Therefore, overlapping fields will be proceeded by the first parameter.

### Example
Create a transaction with an amount of 100 with the category Shopping at the current date and time

> https://cashewapp.web.app/addTransaction?amount=100&title=All%20the%20shopping&category=Shopping&notes=Went%20shopping

### Example
Create a transaction with a missing category at the current date and time

> https://cashewapp.web.app/addTransaction?amount=100&title=Income&notes=Got%20money

### Example
Open the add transaction page with a custom date with prefilled details

> https://cashewapp.web.app/addTransactionRoute?amount=50&title=All%20the%20shopping&notes=Went%20shopping&date=2024-03-02


## Add Multiple Transactions with JSON

| Endpoint                                   | Description                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `/addTransaction`                          | Add a new transaction without a UI prompt (unless a category is missing).               |
| `/addTransactionRoute`                     | Open the add new transaction route with information filled in.                          |

| Parameter               | Description                                                                                                                                                                                                                                                                                                                              | Required | Default         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| `JSON`                  | A list of JSON objects of transactions. If provided, Cashew will import a list/multiple transactions at once. Each JSON object in the list can use any of the aforementioned parameters. The JSON object should be keyed with `transactions` followed by the list of objects. See the example below.                                     | No       | None            |


The input JSON for `addTransaction` and `addTransactionRoute` should follow the following format:

```JSON
{
  "transactions":[
    { ... },
    { ... },
    { ... }
  ]
}
```

### Example:

```JSON
{
  "transactions": [
    {
      "amount": "-100",
      "notes": "This is a note",
      "category": "Shopping"
    },
    {
      "amount": "-150",
      "notes": "This is a note 2"
    }
  ]
}
```

The JSON must be encoded in the URL as JSON uses invalid URI characters. Once encoded, the output link would look something like:

> https://cashewapp.web.app/addTransaction?JSON=%7B%22transactions%22%3A%5B%7B%22amount%22%3A%22-100%22%2C%20%22notes%22%3A%22This%20is%20a%20note%22%2C%20%22category%22%3A%22Shopping%22%7D%2C%7B%22amount%22%3A%22-150%22%2C%20%22notes%22%3A%22This%20is%20a%20note%202%22%7D%5D%7D

## Add Transfers

| Endpoint               | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| `/addTransferRoute`    | Open the add new transfer route with information filled in.               |

| Parameter                     | Description                                                                                                                                                                                                         | Required | Default           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------- |
| `amountFrom`                  | The transfer deduction amount.                                                                                                                                                                                      | No       | 0                 |
| `amountTo`                    | The transfer addition amount. Will use an exchange rate between the `walletFrom` and `walletTo` to convert the `amountFrom` if not passed in.                                                                       | No       | Use exchange rate |
| `accountFrom` / `walletFrom`  | The name of the account to deduct an amount from. Executes a name search, takes the first entry, not case sensitive.                                                                                                | No       | Primary account   |
| `accountTo` / `walletTo`      | The name of the account to add an amount to. Executes a name search, takes the first entry, not case sensitive.                                                                                                     | No       |                   |
| `title` / `name`              | The title of the transfer transaction.                                                                                                                                                                              | No       | Empty string      |
| `date` / `dateCreated`        | The date of the transaction. Supported string formats can be found in the `getCommonDateFormats()` method [here](https://github.com/jameskokoska/Cashew/blob/5.2.3%2B328/budget/lib/struct/commonDateFormats.dart). | No       | Current date      |


## Correct Total Balance

| Endpoint                    | Description                                                                    |
| --------------------------- | ------------------------------------------------------------------------------ |
| `/correctTotalBalance`      | Set the balance of an account to a certain amount.                             |
| `/correctTotalBalanceRoute` | Open the correct account balance route to with information filled in.          |

| Parameter               | Description                                                                                                                                                                                                         | Required | Default         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| `amount`                | The amount to set an account to.                                                                                                                                                                                    | No       | 0               |
| `account`/ `wallet`     | The name of the account. Executes a name search, takes the first entry, not case sensitive.                                                                                                                         | No       | Primary account |
| `title` / `name`        | The title of the balance correction transaction.                                                                                                                                                                    | No       | Empty string    |
| `date` / `dateCreated`  | The date of the transaction. Supported string formats can be found in the `getCommonDateFormats()` method [here](https://github.com/jameskokoska/Cashew/blob/5.2.3%2B328/budget/lib/struct/commonDateFormats.dart). | No       | Current date    |

<!-- ## Add Transaction by Parsing a Notification Message

The `Notification Parsing` feature must be enabled in `Experimental Features` in the Settings.

| Endpoint                                        | Description                                                                                                                 |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `/addTransaction/notificationMessage`           | Add a new transaction by attempting to parse a notification message with a `Notification Scanner Template`.                  |
| `/addTransactionRoute/notificationMessage`      | Open the add new transaction route by attempting to parse a notification message with a `Notification Scanner Template`.     |

| Parameter                 | Description                                                                                                                                                                                                         | Required | Default           |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------- |
| `message`                 | The notification message to parse.                                                                                                                                                                                  | Yes      | None              |
| `date` / `dateCreated`    | The date of the transaction. Supported string formats can be found in the `getCommonDateFormats()` method [here](https://github.com/jameskokoska/Cashew/blob/5.2.3%2B328/budget/lib/struct/commonDateFormats.dart). | No       | Current date      | -->


## Add Transaction With Intelligence

The `Intelligence` feature must be enabled in `Experimental Features` in the Settings. Note it may take some time for to process the intelligence message when the application is opened.

| Endpoint                                   | Description                                                     |
| ------------------------------------------ | --------------------------------------------------------------- |
| `/addTransaction/intelligence`             | Add a new transaction by parsing a prompt with AI.              |
| `/addTransactionRoute/intelligence`        | Open the add new transaction route parsing a prompt with AI.    |

| Parameter            | Description                              | Required | Default           |
|--------------------- | ---------------------------------------- | -------- | ----------------- |
| `prompt` / `message` | The prompt to send to the AI model.      | Yes      | None              |

### Example:

> https://cashewapp.web.app/addTransactionRoute/intelligence?prompt=Spent%2035%24%20while%20going%20out%20for%20dinner%20yesterday%20and%20got%20a%20burger

## Opening Specific App Pages

| Endpoint                                | Description                                                      |
| --------------------------------------- | ---------------------------------------------------------------- |
| `/addTransactionPage`                   | Open the add transaction page.                                   |
| `/addTransferPage`                      | Open the add transfer page.                                      |
| `/addBudgetPage`                        | Open the add budget page.                                        |
| `/searchTransactionsPage`               | Open the search transactions page. Use a `query` argument to search transactions by that string.   |
| `/notificationSettingsPage`             | Open the notification settings page.                             |
| `/allSpendingPage`                      | Open the all spending summary page.                              |
| `/upcomingOverdueTransactionsPage`      | Open the upcoming/overdue transactions page.                     |

### Example:

> https://cashewapp.web.app/searchTransactionsPage?query=Shopping

## Testing

### Using ADB for Android

You can use ADB to test app links. For example

```shell
adb shell am start -a android.intent.action.VIEW -d "https://cashewapp.web.app/addTransaction?amount=-70\&title=Grocery%20Shopping\&date=2024-03-02\&category=Food\&subcategory=Groceries\&notes=Bought%20fruits%20and%20vegetables\&account=test"
```

### Using links

You can click links and open them with Cashew. See the example section above to test.

## Changelog
* Introduce iOS support (Cashew v5.3.5+400 and up)
* **Breaking:** Remove unsupported app link domain - `cashew://budget.app` (Cashew v5.3.4+396 and up)
* Support for more parameters documented under `Detailed Parameters` (Cashew v5.2.9+358 and up)
* Introduce Android and web support (Cashew v5.2.3+328 and up)

