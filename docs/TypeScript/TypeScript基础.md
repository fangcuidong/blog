---
title: TypeScript基础
author: fcd
date: '2024-04-17'
---

## 一、TypeScript 基础

### 1.1 数字、布尔、字符串

- number
- boolean
- string

```typescript
let a: number = 1;
let b: boolean = true;
let c: string = "hello";
```

### 1.2 数组(Array)和元组(Tuple)

#### 数组

定义：

```typescript
// 类型
let list1: number[] = [1, 2, 3, 4]
// 泛型
let list2: Array<number> = [1, 2, 3, 4]
// 字面量（TS会自动推断类型）
let list3 = [1, 2, 3, 4] // number[]
```

#### 元组

元组是固定长度，固定类型的数组

```typescript
let person1: [number,string] = [1, "Alex"]

// 不能将类型“string”分配给类型“number”。
person1[0] = "ddd" 

// 不能将类型“boolean”分配给类型“string”。
person1[1] = 222

// 不能将类型“"xxx"”分配给类型“undefined”。
person1[2] = "xxx"

```

注意：

1. 读取超出范围的值时，IDE会报错

   ```typescript
   console.log(person1[2])
   // 长度为 "2" 的元组类型 "[number, string]" 在索引 "2" 处没有元素。
   ```

2. 使用`push`添加内容时，不报错，能通过编译

   ```typescript
   person1.push(3) // 不报错，能编译
   ```

3. 声明时要声明类型，否则会被推断联合数组

   ```typescript
   let person2  = [2, "Alice"]
   // : (string | number)[]
   
   // 以下不报错
   person2[0] = "ddd"
   person2[1] = 222
   person2[2] = 333
   ```

### 1.3 联合(Union)与字面量(Literal)类型

#### 联合类型

```typescript
let union: string | number
union = 1
union = "2"
//报错 不能将类型“boolean”分配给类型“string | number”。
union = true 
```

#### 字面量类型

```typescript
let literal: 0 | 1 | 2;

literal = 0;
// 不能将类型“4”分配给类型“0 | 2 | 1”。
literal = 4;

let literal2: 1 | "2" | true | [1, 2, 3] | { name: "john"; };
```

### 1.4 枚举类型 Enum

`enum` 类型是一种用户定义的类型，它允许我们为一组数值定义有意义的名称。

#### 基本定义

```typescript
// 基本定义：
enum Color {
    red,
    green,
    blue
}

// 使用：
let color = Color.blue
console.log(color) // 2
```

#### 手动赋值

```typescript
// 手动赋值
enum Color {
    red = 1,
    green, // 2
    blue // 3
}
```

#### 字符串枚举

```typescript
enum Direction {  
    Up = "UP",  
    Down = "DOWN",  
    Left = "LEFT",  
    Right = "RIGHT"  
}
```

#### 反射映射

这意味着我们不仅可以通过名称获取枚举的值，还可以通过值获取枚举的名称：

```typescript
console.log(Color[0]);  // 输出: "red"
```

需要注意的是，字符串枚举不支持反向映射，因为字符串到枚举成员的映射可能不是唯一的。

#### 枚举成员作为常量

枚举成员在 TypeScript 中是常量，并且它们不能重新赋值：

 ```typescript
  // 错误：枚举成员不能重新赋值  
  Color.red = 2;  // 报错
 ```

### 1.5 Any 与 unknow

#### Any

`any`类型是一种特殊的类型，表示可以接受任意类型的值，并且不会进行类型检查。当一个变量或函数的类型被指定为`any`时，该变量或函数可以接受任何类型的值，包括数字、字符串、布尔值、对象、数组等。

这种灵活性使得`any`类型在某些情况下非常有用，尤其是在处理来自不可预测源的数据时，如用户输入或第三方API返回的数据。然而，由于`any`类型绕过了TypeScript的类型检查系统，因此使用它可能会导致类型安全问题，并在运行时产生错误。因此，在使用`any`类型时需要格外小心，并尽量避免过度使用。

#### unknow

`unknown`代表了一个未知类型的值。`unknown`类型的引入是为了提供一个比`any`类型更安全的方式来处理不确定或动态类型的值。

```typescript
function myFunc(param: unknown) {
  param.forEach((element) => {}); // X “param”的类型为“未知”。
}
```

需要为这个变量提供一个具体的类型后才能使用：

```typescript
// 类型断言
function myFunc(param: unknown) {
  (param as unknown[]).forEach((element) => {
    element = element + 1;
  });
}
```

#### 区别与使用场景

##### any 类型

- **定义**：逃逸舱口，允许跳过类型检查。
- **适用场景**：第三方库、迁移过程、性能优化。
- **注意事项**：过度使用会削弱类型检查能力，可能导致运行时错误。

##### unknown 类型

- **定义**：表示未知值，不能直接操作，需先断言或转换。
- **适用场景**：安全处理外部数据、逐步引入类型检查。
- **使用方式**：类型断言或类型守卫。
- **注意事项**：提高类型安全性，但需额外代码处理断言和守卫。

**总结**：`any`跳过类型检查，`unknown`需明确处理类型。通常推荐`unknown`以提高安全性。



### 1.6 void、undefined 与 never

- `void`：表示函数不返回任何值。

  ```typescript
  function logMessage(message: string): void {  
      console.log(message);  
      // 不返回任何值  
  }
  ```

  

- `undefined`：通常不是作为函数返回值的类型，但变量可能因未赋值而具有`undefined`类型。

  ```typescript
  function fetchOptionalValue(): undefined | null {  
      // 假设在某些条件下，函数不返回有效值  
      if (Math.random() < 0.5) {  
          return undefined; // 返回undefined  
      }
  } 
  ```

  

- `never`：表示函数永远不会返回正常结果（如抛出异常或无限循环）。

  ```typescript
  function throwError(message: string): never {  
      throw new Error(message); // 抛出异常，函数不会正常返回  
  } 
  ```

### 1.7 类型适配 Type Assertions

示例：

```typescript
let message: any;
message = "abc";
message.endsWith("c"); // 没有代码提示

// 1
let bool: boolean = (<string>message).endsWith("c");
// 2
let bool2:boolean = (message as string).endsWith('c');
```

### 1.8 函数类型

``` typescript
let log = function (message) {
  console.log(message);
};

let log2 = (message: string) => console.log(message);
log2("hello");
log2(123); // error
log2(true); // error

// 参数默认值、可选参数
let log3 = (message: string, code: number = 0, send?: boolean) => {
  console.log(message, code);
  if (send) {
    // fetch(xxx)
  }
}
// 参数默认值、可选参数 需在正常参数后定义

```



## 二、TypeScript 面对对象

### 2.1 对象类型

#### 字面量：

```typescript
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

#### 接口（interface）：

```typescript
interface Person {
  name: string;
  age: number;
}
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```

#### 类型别名（type）：

```typescript
type Person = {
  name: string;
  age: number;
};
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```

#### type 和 interface 的 区别

[type 与 interface 的区别-掘金](https://juejin.cn/post/7072945053936648200)

- type 不支持声明合并
- interface 扩展用 `extends`, type 使用交叉类型`&`

在TypeScript中，`type`和`interface`都是用来定义类型的，但两者有一些主要区别：

1. **扩展性**：`interface`可以扩展（使用`extends`）其他`interface`或`type`，type扩展使用交叉类型`&`
2. **声明合并**：`interface`可以与同名的其他`interface`或类合并，但`type`不能。
3. **元组**：`type`可以定义元组类型，而`interface`不能。
4. **函数声明**：`type`可以声明调用签名，而`interface`声明函数类型时需要使用方法签名。
5. **索引签名**：`interface`支持索引签名，而`type`不支持。

总的来说，`interface`更适用于定义对象的形状，而`type`则更灵活，适用于各种复杂类型的定义。选择使用哪一个，取决于你的具体需求和使用场景。

#### 属性修饰符（Property Modifiers）：

- 可选属性 （Optional Properties）

  ```typescript
  interface Person {
    name: string;
    age?: number;
  }
  ```
  
- `readonly` 属性（readonly Properties）

  ```typescript
  interface SomeType {
    readonly prop: string;
  }
   
  function doSomething(obj: SomeType) {
    // We can read from 'obj.prop'.
    console.log(`prop has the value '${obj.prop}'.`);
   
    // But we can't re-assign it.
    obj.prop = "hello";
    // Cannot assign to 'prop' because it is a read-only property.
  }
  ```

  注意：属性本身不能被写入，但是其内部内容可以被修改

  ```typescript
  interface Home {
    readonly resident: { name: string; age: number };
  }
   
  function visitForBirthday(home: Home) {
    // We can read and update properties from 'home.resident'.
    console.log(`Happy birthday ${home.resident.name}!`);
    home.resident.age++;
  }
   
  function evict(home: Home) {
    // But we can't write to the 'resident' property itself on a 'Home'.
    home.resident = {
    // Cannot assign to 'resident' because it is a read-only property.
      name: "Victor the Evictor",
      age: 42,
    };
  }
  ```

### 2.2 class 类

```typescript
interface IPoint {
  x: number;
  y: number;
  getDistances: (p: IPoint) => number;
}

class Point implements IPoint {
  constructor(public x: number, public y = 0) { }
  getDistances(p: IPoint): number {
    return Math.sqrt(p.x ** 2 + p.y ** 2);
  }
}

const pint = new Point(1, 2);
```

#### 访问修饰符（Access Modifier）

- **public**：这是默认的访问修饰符。如果成员没有被显式地指定为 `private` 或 `protected`，那么它就是 `public` 的。`public` 成员可以在任何地方被访问，包括类的内部、类的外部、以及从该类派生的子类。

- **private**：`private` 成员只能在类的内部被访问。它们对类的外部以及从该类派生的子类都是不可见的。这有助于封装类的内部状态和实现细节，使得外部代码只能通过类提供的公共接口来与之交互。

- **protected**：`protected` 成员可以在类的内部和从该类派生的子类中被访问，但对类的外部是不可见的。这提供了一种机制，允许子类访问和/或修改父类的某些成员，而外部代码则不能。

示例：

```typescript
class MyClass {
  public publicProperty: string = 'public';
  private privateProperty: string = 'private';
  protected protectedProperty: string = 'protected';

  public publicMethod() {
    // 可以访问所有属性  
    console.log(this.publicProperty);
    console.log(this.privateProperty);
    console.log(this.protectedProperty);
  }

  private privateMethod() {
    // 只能访问 private 和 protected 属性  
    console.log(this.privateProperty);
    console.log(this.protectedProperty);
  }
}

class MyDerivedClass extends MyClass {
  constructor() {
    super();
    // 可以访问 public 和 protected 属性  
    console.log(this.publicProperty);
    console.log(this.protectedProperty);
    // 不能访问 private 属性  
    // console.log(this.privateProperty); // 错误：'privateProperty' 是私有的，只能在类 'MyClass' 内部访问。  
  }
}

const myInstance = new MyClass();
console.log(myInstance.publicProperty); // 正确  
// console.log(myInstance.privateProperty); // 错误：'privateProperty' 是私有的，不能在类 'MyClass' 外部访问。  
// console.log(myInstance.protectedProperty); // 错误：'protectedProperty' 是受保护的，只能在类 'MyClass' 及其子类中访问。
```



#### set get

在 TypeScript 中，`set` 和 `get` 访问器用于定义类的属性的读取和写入行为。它们提供了一种方式来隐藏对象的内部状态，并允许你对这些状态的访问进行更精细的控制。

`get` 访问器用于读取属性的值，而 `set` 访问器用于写入属性的值。当尝试读取属性的值时，会调用 `get` 访问器；当尝试给属性赋值时，会调用 `set` 访问器。

下面是一个简单的例子，演示了如何在 TypeScript 类中使用 `set` 和 `get` 访问器：

```typescript
class Person {  
    private _name: string;  
  
    constructor(name: string) {  
        this._name = name;  
    }  
  
    // get 访问器，用于读取 _name 属性的值  
    get name(): string {  
        return this._name;  
    }  
  
    // set 访问器，用于设置 _name 属性的值  
    set name(value: string) {  
        if (value && typeof value === 'string') {  
            this._name = value;  
        } else {  
            console.log('Invalid name');  
        }  
    }  
}  
  
// 创建 Person 实例  
const person = new Person('Alice');  
  
// 使用 get 访问器读取 name 属性  
console.log(person.name); // 输出: Alice  
  
// 使用 set 访问器设置 name 属性  
person.name = 'Bob';  
console.log(person.name); // 输出: Bob  
  
// 尝试设置一个非字符串的值，set 访问器会阻止这个操作  
person.name = 123; // 输出: Invalid name  
console.log(person.name); // 输出: Bob
```

在这个例子中，`Person` 类有一个私有属性 `_name`，以及对应的 `name` 属性的 `get` 和 `set` 访问器。当你尝试读取 `person.name` 时，会调用 `get` 访问器并返回 `_name` 的值。当你尝试给 `person.name` 赋值时，会调用 `set` 访问器，该访问器检查传入的值是否有效，如果有效则更新 `_name` 的值，否则在控制台输出错误信息。

使用 `set` 和 `get` 访问器的好处是它们允许你控制对类内部状态的访问，并可以在读取或写入属性值时执行一些额外的逻辑，比如验证、转换或触发其他操作。

### 2.3 Generics 泛型

**含义**：
泛型是TypeScript中的一个特性，它允许在定义函数、接口或类的时候，不预先指定具体的类型，而是在使用的时候再确定。这样做可以增加代码的可重用性和灵活性。

**示例**：
假设我们有一个函数，它接受一个数组并返回数组中的第一个元素。如果我们不使用泛型，我们可能需要为每种类型的数组都写一个函数。但使用泛型，我们可以写一个通用的函数：

```typescript
function firstElement<T>(array: T[]): T | undefined {  
  return array[0];  
}  
  
// 使用时指定类型  
const firstNumber = firstElement<number>([1, 2, 3]);  // 返回数字类型的值或undefined  
const firstString = firstElement<string>(["a", "b", "c"]);  // 返回字符串类型的值或undefined
```

**注意事项**：

1. 使用泛型时，需要确保在使用泛型的地方给出了正确的类型信息，否则可能会引入类型错误。
2. 泛型不仅可以用在函数上，还可以用在接口和类上，以提供更灵活的类型定义。
3. 在使用泛型时，需要注意避免产生复杂的类型嵌套，因为这可能会导致类型推断变得复杂且难以理解。
4. 有时候，类型推断可能不足以满足你的需求，你可以使用类型参数显式地指定泛型类型。



## 三、其他

#### 类型继承

```typescript
// 基础类型 Animal  
interface Animal {  
  name: string;  
  eat(): void;  
}  
  
// Dog 类型继承自 Animal 类型  
interface Dog extends Animal {  
  breed: string;  
  bark(): void;  
}  
  
// 创建一个 Dog 类型的实例  
const myDog: Dog = {  
  name: 'Buddy',  
  breed: 'Golden Retriever',  
  eat() {  
    console.log(`${this.name} is eating.`);  
  },  
  bark() {  
    console.log(`${this.name} is barking.`);  
  },  
};  
  
myDog.eat(); // 输出: Buddy is eating.  
myDog.bark(); // 输出: Buddy is barking.
```



#### 交叉类型

```typescript
// Person 类型  
interface Person {  
  name: string;  
  age: number;  
}  
  
// Employee 类型  
interface Employee {  
  id: number;  
  department: string;  
}  
  
// 使用交叉类型创建一个既是 Person 也是 Employee 的类型  
type PersonAndEmployee = Person & Employee;  
  
// 创建一个 PersonAndEmployee 类型的实例  
const personAndEmployee: PersonAndEmployee = {  
  name: 'John Doe',  
  age: 30,  
  id: 123,  
  department: 'Engineering',  
};  
  
console.log(personAndEmployee.name); // 输出: John Doe  
console.log(personAndEmployee.age);  // 输出: 30  
console.log(personAndEmployee.id);   // 输出: 123  
console.log(personAndEmployee.department); // 输出: Engineering
```



参考资料：

- [慕课网 - 2小时极速入门 TypeScript](https://www.imooc.com/learn/1306)
- [掘金 - TypeScript 入门教程](https://juejin.cn/book/7288482920602271802)
- [冴语 - TypeScript中文文档](https://ts.yayujs.com/)



