// https://javascript.info/ Pure javascript
// https://github.com/sudheerj/reactjs-interview-questions#what-is-flux

// Routing
// https://reacttraining.com/react-router/web/guides/quick-start

// SMS
// https://themeforest.net/item/admin-akkhor-school-management-system-psd/19909875?s_rank=25

// https://themeforest.net/item/smart-bootstrap-4-admin-dashboard-template-for-university-school-colleges/21188679?s_rank=1

// http://preview.themeforest.net/item/pathshala-responsive-school-management-template/full_screen_preview/20335933?_ga=2.246241412.1058116050.1548757120-1531217221.1547802924

// Videos application
// https://video.blender.org/videos/local?sort=-publishedAt&page=1

// https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e Explanation for viewchild and content child

// Difference between function declaration and function expression
// It is a function declaration and is defined as soon as its surrounding function (or)
// script is executed (due to hoisting).
funDeclaration();

function funDeclaration() {
  console.log("Say Hi declaration");
  return "Say Hi to declaration";
}

// It is a function expression and so only defined when that line is reached
funExpression();
var funExpression = function () {
  console.log("Say Hi expression");
  return "Say Hi expression";
};
// Refere this image https://i.stack.imgur.com/bCrSm.png

// Note: funDeclaration is faster than the funExpression

// carvy,syska,v4
