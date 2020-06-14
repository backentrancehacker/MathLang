# MathLang
A simple implementation of a made up language, MathLang. Input code is transpiled and evaluated with Javascript.

## Usage
There are several operators, including `add`, `mul`, `sub`, `div`, and `mod`.
The only reserved words are `with`, `to`, and `by`, but they all function the same way and are intended for better readability.
Simple math problems take the form of 
```
[operator] [number] with [number]
```
For example,
```
add 2 with 2
// 2 + 2
// = 2
```
You can add onto math problems by declaring another operator and adding another simple math problem to it.
For example,
```
add 2 with 3 add mul 3 with 3
// 2 + 3 + 3 x 3
// = 14
```

## Side Notes
* Operations follow the order of operations.
* Implemented within 60 lines of code