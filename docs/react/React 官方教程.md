---
title: React 官方教程
author: fcd
date: '2024-04-23'
---

## 一、快速入门

### 创建和嵌套组件

React 组件是返回标签的 JavaScript 函数：

```jsx
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

### 使用 JSX 编写标签 

- 必须闭合标签
- 不能返回多个JSX标签，必须包裹到一个共享的父级标签中或一个空的标签 <>...</>

```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```



[HTML 转换 JSX](https://transform.tools/html-to-jsx)

### 添加样式

`className`

```jsx
<img className="avatar" />
```

### 显示数据

`{}`

```jsx
return (
  <h1>
    {user.name}
  </h1>
);
```

### 条件渲染

`if`

```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

`?` 三元运算

```jsx
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

`&&`逻辑与

```jsx
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

### 渲染列表

```jsx
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

`key`React 将依靠 key 来判断后续新插入、删除、排序。

### 响应事件

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

### 更新界面

引入`useState`：

```jsx
import { useState } from 'react';
```

声明 state 变量：

```jsx
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```

返回值：当前的 state(count) 和用于更新的函数(setCount)

```jsx
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

同一组件多次渲染，每个组件的 state 不共享

### 使用Hook

以 `use` 开头的函数被称为 **Hook**。`useState` 是 React 提供的一个内置 Hook。你可以在 [React API 参考](https://react.docschina.org/reference/react) 中找到其他内置的 Hook。你也可以通过组合现有的 Hook 来编写属于你自己的 Hook。

Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 **顶层** 调用 Hook。如果你想在一个条件或循环中使用 `useState`，请提取一个新的组件并在组件内部使用它。

### 组件间共享数据

`prop`

```jsx
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```



## 二、教程：井字棋游戏

### 状态提升

多个子组件收集数据，或者两个子组件通信，不鼓励将 State 定义在子组件中，因为代码变得难以理解、容易出现错误并且难以重构。

**要从多个子组件收集数据，或让两个子组件相互通信，请改为在其父组件中声明共享 state。父组件可以通过 props 将该 state 传回给子组件。这使子组件彼此同步并与其父组件保持同步。**



### 不变性很重要



```jsx
const arr = [null, null, null];

// 1.直接更改
arr[0] = 'X';

// 2.副本替换
const copy = arr.slice();
copy[0] = 'X';
```

以上例子中，结果一样，但通过不直接改变（改变底层数据），有以下好处：

- 不变性使复杂的功能更容易实现。避免数据直接突变可以让你保持以前版本的数据完好无损，并在以后重用它们。（例如 撤消 重做）

- 不变性使得组件比较其数据是否已更改的成本非常低。

  [对比 `Vue`](https://v2.cn.vuejs.org/v2/guide/comparison.html#%E8%BF%90%E8%A1%8C%E6%97%B6%E6%80%A7%E8%83%BD)：

  - `React`: 某个组件状态发生变化时，默认会以该组件为根，重新渲染整个组件子树。
  - `Vue`: 组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。



### 疑问

#### 为什么 winner 自动更新？

以下代码：

```jsx
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```



函数组件中的 `useState` 和 `useEffect` 钩子可以帮助组件管理状态和副作用。当**状态发生改变时**，React会**重新渲染组件**以反映最新的状态。

在以上代码中，`useState` 钩子用于管理 `xIsNext` 和 `squares` 这两个状态。当 `setSquares` 或 `setXIsNext` 被调用时，React会重新渲染 `Board` 组件，并在重新渲染时计算 `status` 和 `winner` 的值。

`winner` 的值会自动更新是因为每当 `squares` 状态发生改变时，React会重新运行函数组件内部的所有代码，包括计算 `winner` 的逻辑。因此，每次 `squares` 发生变化时，都会重新计算 `winner`，从而确保 `winner` 始终是最新的。



#### 函数式

(回答来自chatGPT3.5)：

**Q**: React是函数式编程吗

**A**: React本身并不是纯粹的函数式编程框架，而是一种基于组件化和声明式编程思想的库。然而，React受到了函数式编程范式的启发，并且在很多方面借鉴了函数式编程的思想和特性。

下面是React中与函数式编程相关的特性：

1. **纯函数组件：** React中的函数组件是纯函数，给定相同的输入，始终返回相同的输出，不产生副作用。这使得组件的行为更可预测，更容易测试。
2. **无状态组件：** 函数组件本身是无状态的，它们仅接受props作为输入，并根据props的值渲染UI。这符合函数式编程的纯粹性原则，不引入任何副作用。
3. **不可变性：** React推崇不可变性的原则，即状态不可变。这与函数式编程中的不可变数据结构和纯函数一致，有助于提高组件的性能和可维护性。
4. **高阶组件和Hooks：** React提供了高阶组件和Hooks等特性，使得组件的逻辑和状态可以被抽象和复用，这符合函数式编程中函数的高阶和组合的概念。

虽然React并不是纯粹的函数式编程框架，但它秉承了函数式编程的一些核心理念，并通过这些理念提供了一种更加简洁、可预测和可组合的开发模式。

---

**Q**: 那vue呢

**A**: 和React类似，Vue也不是严格意义上的函数式编程框架，但它受到了函数式编程的影响，并在某些方面借鉴了函数式编程的思想和特性。

以下是Vue中与函数式编程相关的特性：

1. **单文件组件：** Vue中推崇组件化开发的理念，组件可以看作是函数式编程中的纯函数，接受props作为输入，渲染UI作为输出。这使得Vue应用可以被拆分成可复用、独立和可组合的组件。
2. **计算属性和观察属性：** Vue提供了计算属性和观察属性来实现对数据的响应式计算和观察，这些特性与函数式编程中的函数和观察者模式类似。
3. **响应式数据：** Vue中的数据绑定和响应式系统使得数据的变化能够自动触发UI的更新，这种反应式的机制和函数式编程中的不可变性原则相呼应。
4. **函数式组件：** Vue 3 中引入了函数式组件(Functional Components)，这种组件基于模板编译，具有更高的性能。它们是无状态的、纯粹的，接受props作为输入，返回渲染函数的结果，符合函数式编程的特性。
5. **VueX状态管理：** VueX是Vue的官方状态管理库，它使用单向数据流和函数式编程的思想来管理应用的状态。通过使用纯函数来修改状态，VueX促进了应用状态的可预测性和可维护性。

虽然Vue并不是纯粹的函数式编程框架，但它借鉴了函数式编程的一些思想，并通过这些思想提供了一种更加简洁、可维护和可组合的开发模式。

---

**Q**: 说说面向对象编程和面向函数编程

**A**: 面向对象编程（OOP）和面向函数编程（FP）是两种不同的编程范式，它们在处理数据和组织代码方面有着不同的理念和方法。

**面向对象编程（OOP）：**

1. **封装（Encapsulation）：** OOP将数据和操作封装在对象中，对象可以隐藏其内部状态和实现细节，通过接口提供对外的访问。
2. **继承（Inheritance）：** OOP允许通过继承机制创建新类，并从现有类中继承属性和方法，实现代码的重用和扩展。
3. **多态（Polymorphism）：** OOP支持多态性，同一个方法可以在不同的对象上表现出不同的行为，提高了代码的灵活性和可扩展性。
4. **对象（Object）：** OOP的核心是对象，对象是具有状态（属性）和行为（方法）的实体，通过类来定义和创建。

**面向函数编程（FP）：**

1. **函数作为一等公民（First-Class Functions）：** FP将函数视为一等公民，函数可以像变量一样传递、赋值和返回，可以作为参数传递给其他函数，也可以作为返回值返回给其他函数。
2. **纯函数（Pure Functions）：** FP鼓励编写纯函数，即函数的输出只依赖于输入，不产生副作用，同样的输入始终产生同样的输出，这使得函数更容易理解、测试和并行化。
3. **不可变性（Immutability）：** FP强调不可变性，即数据一旦创建就不能被修改。这样可以避免数据共享和意外的副作用，并简化并发编程。
4. **高阶函数（Higher-Order Functions）：** FP支持高阶函数，即函数可以接受函数作为参数或返回函数作为结果。这种函数的组合和抽象能力使得代码更加简洁和灵活。

总的来说，OOP注重于数据和行为的封装、继承和多态，而FP则注重于函数的抽象、组合和不可变性。两种编程范式都有各自的优点和适用场景，可以根据具体的问题和需求选择合适的编程方式。在实际开发中，通常会将两者结合使用，以实现更高效、可维护和可扩展的代码。

---

**Q**: 分别在什么场景下适用呢

**A**: 面向对象编程（OOP）和面向函数编程（FP）各有其适用的场景：

**面向对象编程（OOP）适用场景：**
1. **复杂的系统设计：** 当需要建模和设计复杂的系统或软件时，OOP提供了一种自然的方式来组织和管理代码，通过对象的封装、继承和多态性来实现系统的模块化和拓展性。
2. **图形用户界面（GUI）开发：** GUI应用通常涉及到大量的对象和交互，OOP的面向对象思想可以很好地描述和处理GUI中的各种元素和行为，提高了代码的可读性和可维护性。
3. **大型团队协作：** 在大型团队中，OOP的封装性和继承性可以帮助团队成员更好地分工合作，每个人可以专注于开发和维护自己负责的对象或模块。
4. **游戏开发：** 游戏开发中通常需要处理大量的游戏对象和场景，OOP的对象模型可以很好地描述和管理游戏中的各种实体和行为。

**面向函数编程（FP）适用场景：**
1. **并发和并行编程：** FP的不可变性和纯函数特性使得代码更容易理解和并行化，可以减少共享数据和竞态条件的问题，提高了并发编程的安全性和可靠性。
2. **数据处理和转换：** 对于涉及到数据处理和转换的任务，FP的高阶函数和函数组合特性可以提供更加简洁和灵活的解决方案，使得代码更易于编写、测试和维护。
3. **算法和数学计算：** FP的函数抽象和组合特性使得代码更容易表达复杂的算法和数学计算，函数式编程语言通常在处理数学和科学计算领域有着广泛的应用。
4. **函数式 UI 开发：** 基于函数式编程思想的 UI 开发框架，如 React Hooks 和 Vue 3 的函数式组件，可以提供更简洁、可测试和可组合的 UI 开发方式，适用于构建复杂的用户界面。

---

**Q**: vue更像OOP还是FP

**A**：Vue更像面向对象编程（OOP）而不是面向函数编程（FP）。

虽然Vue框架中也有一些函数式编程的概念和特性，比如响应式数据、计算属性、以及一些函数式编程的风格，但总体上，Vue更强调组件化和对象的概念，更符合面向对象编程的思想。

以下是一些说明：

1. **组件化：** Vue将UI视为可重用的组件，每个组件封装了自己的状态和行为，这符合面向对象编程中的对象概念。

2. **选项式 API：** Vue 2.x 使用选项式 API，通过创建组件对象来描述组件，对象中包含了数据、计算属性、方法等选项，这种设计更贴近面向对象编程的方式。

3. **单文件组件：** Vue推崇使用单文件组件来组织和管理UI，每个单文件组件都可以看作是一个对象，封装了自己的状态和行为。

4. **响应式数据：** Vue中的响应式数据和双向绑定机制使得数据的变化能够自动更新UI，这种特性更符合面向对象编程中封装和内聚的概念。

5. **VueX状态管理：** VueX是Vue的官方状态管理库，它通过集中式存储管理应用的所有组件状态，提供了一种面向对象的状态管理方案。

综上所述，虽然Vue中也有一些函数式编程的特性，但总体上更符合面向对象编程的思想和设计方式。

---

**Q**: React呢

**A**：React在某种程度上更加灵活，既可以使用面向对象编程（OOP）的思想，也可以借鉴函数式编程（FP）的概念。

以下是React借鉴了函数式编程的一些特性：

1. **函数组件：** React中的函数组件是纯函数，接受props作为输入，并返回UI元素作为输出，这符合函数式编程的纯函数概念。

2. **Hooks：** React Hooks是函数式编程的概念在React中的体现，它们允许函数组件内部使用状态、副作用等特性，而无需使用类组件和this关键字。

3. **不可变性：** 虽然React并没有强制要求数据不可变，但不可变性在React中被视为一种最佳实践，它有助于减少副作用和提高性能，这也是函数式编程的一个重要概念。

4. **高阶组件和Render Props：** React中的高阶组件和Render Props模式都是函数式编程的思想在React中的体现，它们允许组件逻辑的抽象和复用。

然而，React也保留了面向对象编程的一些特性，比如类组件、组件生命周期等。因此，React在设计上更加灵活，既可以使用面向对象编程的思想来组织和管理代码，也可以借鉴函数式编程的思想来提高代码的可维护性和可测试性。