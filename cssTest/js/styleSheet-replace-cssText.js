// 获取HTML文档中的所有样式表
var styleSheets = document.styleSheets;

// 遍历样式表
for (var i = 0; i < styleSheets.length; i++) {
  var styleSheet = styleSheets[i];

  // 获取样式表的所有规则
  var rules = styleSheet.rules || styleSheet.cssRules;

  // 遍历规则
  for (var j = 0; j < rules.length; j++) {
    var rule = rules[j];

    if (!rule.style || !rule.style.cssText.includes("rem")) break;
    const cssText = rule.style.cssText;

    // 获取规则的样式字符串
    const regex = /\S+rem/g;
    const newCssText = cssText.replace(
      regex,
      "calc(1 / var(--scale-factor) * $&)"
    );
    // var styleString = rule.style.cssText;
    rule.style.cssText = newCssText;

    // 输出样式字符串
    console.log(1111, newCssText);
  }
}
