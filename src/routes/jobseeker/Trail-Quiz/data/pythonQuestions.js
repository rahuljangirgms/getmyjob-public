// pythonQuestions.js
export const pythonQuestions = [
    {
      id: 1,
      text: "What is the correct way to define a function in Python?",
      options: [
        "function myFunction():",
        "def myFunction():",
        "define myFunction():",
        "func myFunction():"
      ],
      answer: "def myFunction():"
    },
    {
      id: 2,
      text: "Which data type is mutable in Python?",
      options: ["Tuple", "String", "List", "Integer"],
      answer: "List"
    },
    {
      id: 3,
      text: "Which keyword is used to create a class in Python?",
      options: ["class", "define", "struct", "object"],
      answer: "class"
    },
    {
      id: 4,
      text: "What will be the output of `print(type([]))`?",
      options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"],
      answer: "<class 'list'>"
    },
    {
      id: 5,
      text: "What is the result of `3 * 3 ** 3`?",
      options: ["81", "27", "36", "9"],
      answer: "81"
    },
    {
      id: 6,
      text: "Which method is used to remove whitespace from both ends of a string?",
      options: ["strip()", "trim()", "remove()", "rstrip()"],
      answer: "strip()"
    },
    {
      id: 7,
      text: "Which of the following is a Python immutable data type?",
      options: ["List", "Dictionary", "Set", "Tuple"],
      answer: "Tuple"
    },
    {
      id: 8,
      text: "What will `bool([])` return?",
      options: ["True", "False", "None", "Error"],
      answer: "False"
    },
    {
      id: 9,
      text: "What is the correct way to open a file in read mode?",
      options: ["open('file.txt', 'w')", "open('file.txt', 'a')", "open('file.txt', 'r')", "open('file.txt', 'x')"],
      answer: "open('file.txt', 'r')"
    },
    {
      id: 10,
      text: "What will be the output of `print(2 == 2.0)`?",
      options: ["True", "False", "None", "Error"],
      answer: "True"
    }
];
