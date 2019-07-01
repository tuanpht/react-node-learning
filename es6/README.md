# ES6

## ECMAScript là gì?
- Tên chính thức của Javascript
- Thường được gọi tắt là ES

## ES6 là gì?
- Bản đặc tả ECMAScript phiên bản 6. Đặc tả tức là bản mô tả chức năng, cú pháp, còn việc có hỗ trợ hay không là phụ thuộc vào phiên bản của từng platform (browser, node.js, babel transpiler,...)
- Ra đời vào năm 2015 nên còn được gọi là ES2015
- Là phiên bản nâng cấp lớn của ES5 ra đời vào năm 2009
- 6 năm cho một lần release là quá lâu và số lượng feature mới cũng là quá nhiều mà chưa có platform nào implement được đầy đủ [1],[2]. Do đó quy trình release đã được thay đổi. Các phiên bản tiếp theo được release theo từng năm và theo quy trình mở [3],[4].
- Có thể chia ra thành các phiên bản: ES6, ES 2016+ (ES7, ES8, ES9, ES10...) và ES Next (là những chức năng mới sắp được release [5])
- Vì thường có yêu cầu phải support nhiều phiên bản trình duyệt khác nhau nên chúng ta thường phải sử dụng các transpiler (chẳng hạn babel, swc) để translate ra cú pháp mà support được các browser cũ, do đó khi đọc bảng compatibility table [1] nên chú ý đến cột *Babel + core-js*

Tham khảo thêm:
- [1] https://kangax.github.io/compat-table/es6/
- [2] https://node.green/
- [3] https://kipalog.com/posts/Tim-hieu-quy-trinh-TC39
- [4] http://2ality.com/2015/11/tc39-process.html
- [5] https://github.com/tc39/proposals/blob/master/finished-proposals.md

## ES6 features
Thực hành tại website: https://codesandbox.io/s/blazing-leaf-0gbn6

### let, const
ES6 giới thiệu 2 từ khóa mới là `let` và `const` dùng để khai báo biến, trước đây chỉ có `var`.

#### Khác với `var`
Các biến được khai báo với `var` có phạm vi `function scope`, còn với `let`, `const` thì nó phạm vi `block scope`
- `function scope`: Biến được khai báo dùng được trong toàn bộ function
    ```js
    function usingVar() {
        let x = 1;
        if (true) {
            var y = 2;
            console.log(x); // 1
        }

        console.log(y); // 2
    }
    ```
- `block scope`: Biến được khai báo chỉ sử dụng được trong block {} nơi mà nó được khai báo
    ```js
    function usingLet() {
        let x = 1;
        if (true) {
            let y = 2;
            console.log(x); // 1
        }

        console.log(y); // Error: y is not defined
    }
    ```
    Hoặc đối với biến trong vòng for:
    ```js
    for (let i = 0; i < 5; ++i) {
        console.log(i); // OK
    }

    console.log(i); // Error: y is not defined
    ```

#### let vs const
- `let`: biến đã khai báo có thể được gán lại
    ```js
    let letVar = 'My old name';
    if (true) {
        letVar = 'I can have new name';
    }
    ```
- `const`: biến đã khai báo không thể được gán lại
    ```js
    const constVar = 'Only god can change me';
    if (true) {
        constVar = 'Don\'t try to change me'; // Error: invalid assignment
    }
    ```
    Tuy nhiên nếu const là object thì giá trị của object vẫn có thể bị thay đổi. Chỉ *không thể bị gán thành object khác* mà thôi.
    ```js
    const myObject = {
        id: 1,
        name: 'Can be changed'
    };
    myObject.name = 'New name'; // OK
    myObject = null; // Error
    ```

Từ đây trở đi chúng ta sẽ chủ yếu dùng `let` và `const`.

### Template strings
ES6 giới thiệu thêm việc khai báo string bằng ký tự \` (backtick), bổ sung cho `'` và `"`.

Dùng backtick ta có thể khai báo multiline string:
```js
const multiline = `Rose is #f00
Violet is #00f
People often use word
But I will use hex code for you!
`;
```
Thay cho trước đây:
```js
const multiline = 'This is first line'
    + 'This is second line';
```

Có thể dùng biến hoặc biểu thức JS trong string (String interpolation):
```js
const name = 'ES6';
function thanks() {
    return 'Thank you!';
};
const obj = {
    ask() {
        return 'And you?';
    }
};
const superPowerString = `How are you, ${name}? - I'm fine. ${thanks()} ${obj.ask()}`;
```

### Arrow function
Cú pháp viết function ngắn gọn sử dụ dấu `=>` hay còn gọi là **fat arrow**:

```js
const hello = () => {
    console.log('Hello ES6 "fat arrow" function');
}
```
Ví dụ trên tương đương với cách viết cũ như sau:
```js
function hello() {
    console.log('Hello ES6 "fat arrow" function');
}
```

#### Tham số trong arrow function
Khi cần truyền tham số:
```js
const hello = (name, year) => {
    console.log(`Hello ${name} from the year ${year} of future!`)
}
```
Nếu chỉ có 1 tham số thì có thể lược bỏ dấu ngoặc đơn:
```js
const hello = name => {
    console.log(`Hello ${name}!`)
}
```

#### Expression bodies (Implicit returns)
Không có curly braces => Implicit return
```js
const add = (x, y) => x + y;
console.log(add(1, 2)); // 3

const products = [
    {id: 1, name: 'Ubuntu'},
    {id: 2, name: 'CentOS'},
    {id: 3, name: 'openSUSE'},
];
const productIds = products.map(product => product.id);
```

Nếu muốn return object thì sao? => Wrap object bên trong cặp ngoặc `()`:
```js
const makeCoffee = () => ({
    type: 'Gi cung duoc',
});
console.log(makeCoffee()); // { type: "Gi cung duoc" }

this.setState(prevState => ({
    count: prevState.count++
}));
```

#### Statement Bodies
Nếu viết theo statement bodies:
```js
const add = (x, y) => {
    return x + y;
}

const makeCoffee = () => {
    return {
        type: 'Gi cung duoc',
    };
};

this.setState(prevState => {
    return {
        count: prevState.count++
    };
}
```

#### Lexical this
Khoan nói về khái niệm `lexical this`.

##### `this` là gì?
Giống như trong các ngôn ngữ lập trình khác như PHP, Java thì `this` được sử dụng như một đại từ nhân xưng để thay thế cho đối tượng mà chúng ta đang sử dụng.

Ví dụ:
```php
class Person {
    private $name;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function hello()
    {
        return "My name is {$this->name}.";
    }
}

$es = new Person('ES');
$es->hello(); // "My name is ES."
```

`this` chỉ tồn tại và được sử dụng bên trong object (hay còn gọi là: instance của một class). Thật đơn giản và dễ hiểu!!!

Nhưng ở đây Javascript không như vậy. Điều khác biệt là:
- Function trong JS cũng là một object và do đó nó có `this`
- `this` được xác định vào lúc function được gọi, dựa theo ngữ cảnh: *ai* (*đối tượng nào*) gọi function đó và gọi theo cách nào, chứ không phải dựa theo nơi mà nó được sử dụng (bên trong method của class)

Vậy trong JS có những cách gọi function nào? Ví dụ ta có function sau:
```js
function whoami() {
    console.log('You are ', this);
}
```
- Global function call:
    ```js
    whoami(); // You are Window
    ```
    > => `this` được xác định là global object, tương đương với đối tượng `window` trên trình duyệt hoặc `global` trong NodeJS.

- Method call:
    ```js
    const obj = {
        name: 'Normal Person',
        whoami: whoami,
    };

    obj.whoami(); // "You are " Object { name: "Normal Person" }
    ```
    > => `this` ở đây là đối tượng `obj`, do method `whoami` được `obj` gọi

- Thông qua `apply()` hoặc `call()`:
    Nhớ lại, trong JS function cũng là một object và object này có một số method mặc định. Trong đó `apply` và `call`, mục đích của 2 method này giống nhau, chỉ khác trong cách truyền tham số:
    ```js
    function.apply(thisArg, [argsArray])
    //
    function.call(thisArg, arg1, arg2, ...)
    ```
    Và mục đích ở đây là: set giá trị của `this` bên trong function, truyền tham số (nếu có) và gọi function. Ví dụ:
    ```js
    const harry = {
        name: 'Harry Potter',
    };

    const ron = {
        name: 'Ron Weasley',
    };

    whoami.call(harry); // "You are " Object { name: "Harry Potter" }

    whoami.apply(ron); // "You are " Object { name: "Ron Weasley" }
    ```
    > => `this` ở đây là giá trị được chỉ định tường minh (explicit binding).

    Ví dụ sử dụng khi function có nhiều tham số:
    ```js
    function sendMessage(to, message) {
        console.log(`From: ${this.name}, To: ${to.name} ==> ${message}`);
    }

    const harry = {
        name: 'Harry Potter',
    };

    const ron = {
        name: 'Ron Weasley',
    };

    sendMessage.call(harry, ron, 'Buzzz!!!'); // "From: Harry Potter, To: Ron Weasley ==> Buzzz!!!"

    sendMessage.apply(harry, [ron, 'Buzzz!!!']); // "From: Harry Potter, To: Ron Weasley ==> Buzzz!!!"
    ```

    Ngoài ra khi làm việc với React, chúng ta có thể hay dùng đến method `bind()`. Mục đích của method này đó là: copy function tạo ra function mới và set giá trị của `this` bên trong function mới tạo.
    ```js
    function speak() {
        console.log(this.voice);
    }

    const cat = {
        voice: 'Meow',
    };
    const catSpeak = speak.bind(cat);
    catSpeak();

    const dog = {
        voice: 'Gogo',
    };
    const dogSpeak = speak.bind(dog);
    dogSpeak();
    ```
- Callback, event handler:
    Ở đây, chúng ta không trực tiếp gọi function mà là khai báo function và đưa cho đối tượng khác sử dụng.
    ```js
    const pikachu = {
        name: 'Pikachu',
        type: 'Electric',
        showDetail: function () {
            console.log(`This is ${this.name} from ${this.type} World`);
        }
    }

    setTimeout(pikachu.showDetail, 5000);
    ```
    Chú ý là khi viết `pikachu.showDetail` tức là chúng ta đang coi nó như là một object, chứ chưa gọi method `pikachu.showDetail()`.

    `pikachu.showDetail` ở đây được gọi là callback cho hàm `setTimeout`, tức là khi cần (ví dụ, sau khi đếm ngược hết 5 giây) thì `setTimeout` sẽ gọi hàm `pikachu.showDetail` (Hiểu từ theo cách tự nhiên: anh đưa cho em *số điện thoại này* khi nào cần em *gọi lại* (callback) cho anh nhé!!! :D).

    Thế nhưng đối tượng gọi hàm `showDetail` ở đây không phải là `pikachu` mà là function `setTimeout`. Vậy chắc bạn cũng đoán được kết quả rồi.

    Một ví dụ khác:
    ```js
    const sampleSet = {
        sets: [],
        addMany: function (values) {
            values.forEach(function (value) {
                if (this.sets.indexOf(value) === -1) {
                    this.sets.push(value);
                }
            });
        }
    }
    sampleSet.addMany([1, 2, 3]);
    sampleSet.addMany([2, 5, 4]);
    ```
    Ở đây chúng ta truyền callback cho method `forEach` là một anonymous function (hàm không tên).

    Ví dụ tương tự với event handler:
    ```html
    <button id="js-btn-show-pikachu">Show Pikachu</button>

    <script>
    const pikachu = {
        name: 'Pikachu',
        type: 'Electric',
        showDetail: function () {
            console.log(`This is ${this.name} from ${this.type} World`);
        }
    }

    document.querySelector('#js-btn-show-pikachu').addEventListener('click', pikachu.showDetail);
    // $('#js-btn-show-pikachu').on('click', pikachu.showDetail);
    </script>
    ```
    Giống như trong React chúng ta hay viết:
    ```jsx
    class PikachuButton extends React.Component {
        constructor() {
            super();

            this.name  = 'Pikachu';
            this.type  = 'Electric';
        }

        showDetail() {
            console.log('this is:', this);
        }

        render() {
            return (
                <button onClick={this.showDetail}>Click me (onegai)</button>
            );
        }
    }
    ```
    Tương tự với ví dụ `setTimeout`, khi có sự kiện `click` thì đối tượng gọi hàm `showDetail` ở đây sẽ là `button` và đến đây thì ai cũng biết kết quả là gì rồi.

    Để có kết quả như ý muốn, ta có thể sửa lại như sau:
    ```js
    const showPikachuCallback = pikachu.showDetail.bind(pikachu);
    setTimeout(showPikachuCallback, 5000);

    $('#js-btn-show-pikachu').on('click', showPikachuCallback);
    ```

    ```js
    const sampleSet = {
        sets: [],
        addMany: function (values) {
            const self = this;
            values.forEach(function (value) {
                if (self.sets.indexOf(value) === -1) {
                    self.sets.push(value);
                }
            });
        }
    }
    sampleSet.addMany([1, 2, 3]);
    sampleSet.addMany([2, 5, 4]);
    ```

    ```jsx
    class PikachuButton extends React.Component {
        constructor() {
            super();

            // ...

            this.showDetail = this.showDetail.bind(this);
        }

        // ...

        render() {
            return (
                <button onClick={this.showDetail}>Click me (onegai)</button>
            );
        }
    }
    ```
    Xem thêm ví dụ về React => https://codesandbox.io/s/hardcore-johnson-h6eki
##### `lexical this` là gì?
Khác với function thông thường, arrow function không tự bind `this` và chúng ta cũng không dùng các method `call()`, `apply()`, `bind()` để "set this" cho function.

`this` trong arrow function được xác định dựa vào nơi mà nó được define (hoặc là global hoặc bên trong class hoặc bên trong function khác).

Thử thay function thông thường bằng arrow function trong các ví dụ trên:
```js
const whoami = () => {
    console.log('You are ', this);
}

const harry = {
    name: 'Harry Potter',
};

const ron = {
    name: 'Ron Weasley',
};

whoami.call(harry); // You are Window

whoami.apply(ron); // You are Window
```
`call()`, `apply()`, `bind()` đều không áp dụng được cho arrow function. Ở ví dụ trên, function `whoami` được define global nên `this` bên trong function này sẽ được gắn với global object (window).

Cần phải chú ý khi dùng arrow function cho callback, event handler, object method:
```js
document.querySelector('#js-btn-show').addEventListener('click', () => {
    console.log(this); // window!!!
});

const pikachu = {
    name: 'Pikachu',
    type: 'Electric',
    showDetail: () => {
        console.log(this);
    }
}
pikachu.showDetail(); // window!!!
```

Tuy vậy, arrow function là khá hữu ích khi dùng làm callback trong trường hợp này:
```js
const sampleSet = {
    sets: [],
    addMany: function (values) {
        values.forEach((value) => {
            if (this.sets.indexOf(value) === -1) {
                this.sets.push(value);
            }
        });
    }
}
sampleSet.addMany([1, 2, 3]);
sampleSet.addMany([2, 5, 4]);
```

Hoặc event handler trong React class component:
```jsx
class Button extends React.Component {
    handleClick(event) {
        console.log(event, this);
        // this.setState()...
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(event)}>Click me (onegai)</button>
        );
    }
}
```
Vì arrow function được khai báo bên trong class, `this` tham chiếu đến chính đối tượng của class này, chứ không tự động bind theo ngữ cảnh lúc gọi nữa.

### Class

### Destructuring
### Modules
### Generators
### for..of
### Promise
### Default parameters
### Rest parameters
### Spread Operator
### Unicode
### Map, Set, WeakMap, WeakSet
