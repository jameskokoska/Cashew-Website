function getRandomMessage() {
  let messages = [
    "a budget app for you",
    "a finance tracker for you",
    "a call to start budgeting",
    "you can get on top of your spending",
    "take control of your finances",
    "achieve your financial goals",
    "see where your money goes",
    "an easy way to budget",
    "start saving smartly",
    "financial freedom awaits",
    "stay financially organized",
    "know your money, know yourself",
    "make every penny count",
    "budgeting made simple",
    "empower your financial future",
    "budget like a pro",
    "stop living paycheck to paycheck",
    "track your expenses effortlessly",
    "make budgeting a breeze",
    "say goodbye to money stress",
    "get financially fit",
    "save for what matters most",
    "make wise money decisions",
    "budget with confidence",
    "manage your money with ease",
    "smart money management at your fingertips",
    "gain financial peace of mind",
    "take charge of your financial life",
    "start a journey to financial success",
    "learn to spend smarter",
    "plan your financial success",
    "stay on top of your finances",
    "budgeting made rewarding",
    "know your worth, know your budget",
    "achieve financial balance",
    "discover financial stability",
    "be in control of your money",
    "financial empowerment made simple",
    "reach your money goals",
    "build a brighter financial future",
    "track, save, thrive",
    "elevate your financial well-being",
    "master your money",
    "budgeting for a brighter tomorrow",
    "transform your financial habits",
    "organize your money matters",
    "budgeting just got easier",
    "navigate your finances with ease",
    "finally, financial clarity.",
    "see your savings grow",
    "take charge of your wallet",
    "financial wisdom unlocked",
    "reach your money milestones",
    "financial planning made easy",
    "the key to financial success",
    "track, save, succeed",
    "discover financial freedom",
    "your budgeting companion",
    "the path to financial wellness",
    "empower your financial journey",
    "say hello to smart spending",
    "building a better financial future",
    "budget like a boss",
    "seize control of your finances",
    "where financial dreams begin",
    "master the art of budgeting",
    "your budget, your rules",
    "track, analyze, thrive",
    "finances made stress-free",
    "make every dollar count",
    "know your finances inside out",
    "plan for a prosperous future",
    "transform the way you budget",
    "financial confidence starts here",
    "budget smarter, not harder",
    "reclaim your financial freedom",
    "find peace in budgeting",
    "take charge of your money",
    "where financial success begins",
    "personalized budgeting made easy",
    "your guide to financial stability",
    "stay ahead of your expenses",
    "smart budgeting, brighter life",
    "empower your financial decisions",
    "where financial goals become reality",
    "start budgeting like a pro",
    "unlock your financial potential",
    "budgeting for a brighter future",
    "where money meets purpose",
    "manage your money, seize the day",
    "the power to control your finances",
    "smart budgeting for smart people",
    "welcome to financial empowerment",
    "unleash your financial possibilities",
    "budgeting made efficient",
    "the gateway to financial prosperity",
    "your partner in financial growth",
    "redefine your financial future",
    "take the first step to financial success",
    "the budgeting tool you need",
    "embrace a budget-friendly lifestyle",
    "make your money work for you",
    "empower your wallet, empower yourself",
    "financial intelligence at your fingertips",
    "budget wisely, live fully",
    "reach your dreams with smart budgeting",
    "where financial journeys begin",
    "step into a financially secure tomorrow",
    "your compass to financial success",
    "empower financial choices, every day",
    "stay ahead of your financial game",
    "where budgeting becomes second nature",
    "unlock the potential of your money",
    "wise choices for a wealthier future",
    "take control of your financial destiny",
    "where financial ambitions come true",
    "the key to unlocking financial freedom",
    "smart budgeting, successful living.",
    "crack the budgeting code with Cashew",
    "harvest financial growth with Cashew",
    "the power of savings, Cashew in",
    "watch your money grow like a Cashew",
    "unlock financial wellness, go Cashew",
    "let Cashew nurture your finances",
    "budgeting made as easy as Cashew",
    "get nutty about budgeting with Cashew",
    "savor the flavor of financial freedom, Cashew-style",
    "stay cash-ewry by budgeting",
    "reach your goals, one Cashew at a time",
    "track, save, and grow, the Cashew way",
    "put a Cashew on overspending",
    "your budget's best friend: Cashew",
  ]
  let randomNumber = Math.floor(Math.random() * messages.length);
  return messages[randomNumber]
}

function startTitleAnimation(quickFirst=false, oldMessage="") {
  let message = getRandomMessage();
  let element = document.getElementById("intro-message");
  if(oldMessage == message) message = getRandomMessage();
  let intervalClear;
  let intervalCreate;
  let i = 0;

  if(quickFirst){
    element.textContent = message;
  } else {
    intervalCreate = setInterval(function() {
      if (i > message.length) {
        clearInterval(intervalCreate);
      } else {
        element.textContent = message.substring(0, i);
        i++;
      }
    }, 40);
  }
  

  z = 0;
  setTimeout(()=>{
    intervalClear = setInterval(function() {
      if (z >= message.length) {
        clearInterval(intervalClear);
        startTitleAnimation(false, message);
      } else {
        element.textContent = message.substring(0, message.length - z);
        z++;
      }
    }, 20);
  }, 4700)
}