# JavaScript Calculator

## ABOUT
### A calculator developed in pure JavaScript (ES6), supporting basic and advanced mathematical operations, including square roots, percentages, exponents, and parentheses.
### This project's unique feature is its intelligent input validation system, which prevents users from making common errors when typing mathematical expressions.

## FEATURES
- User-friendly interface with click and keyboard support;
- Dark/Light Mode;
- Responsive

### SUPPORTED CALCULATIONS
- Addition (+), Subtraction (-), Multiplication (*), Division (/);
- Percentage (%);
- Exponents (xʸ);
- Square root (√);
- Parentheses to organize operations (5+3)*7;

### ERROR PREVENTION
- Does not allow numbers with multiple decimal points. Example: 11.2.3
- Blocks duplicate operators. Example: 5++3 or 7+*2
- Ensures parentheses are used correctly by automatically closing missing parentheses. Example: (5+3 → (5+3)
- The algorithm checks if user is trying to close more parentheses that are opened, and block it.
- Fixes implicit multiplication. Example: 5(3+2) → 5*(3+2))

### TECHNOLOGIES USED
- HTML5
- CSS3 (rresponsive, intuitive and dark/light mode)
- JavaScript (ES6)
- math.js lib

Link to the calculator: https://clebtech.github.io/CalcJS/

<img width="629" height="766" alt="Image" src="https://github.com/user-attachments/assets/9956d75f-e90b-4c36-95dc-654c9ed7c39e" />

