export type BasicPrimitive = number | string | boolean;

export function doStuff(value: BasicPrimitive) {
  if ((value as number) < 5) {
    return undefined;
  }
  return value;
}

let a: [string, ...number[], boolean] = ['hello world', 10, false];

a = ['hello world', 10, 20, 30, 40, false];

console.log(a);

interface Person {
  name: string;
  [x: string]: unknown;
}

function processOptions(person: Person) {
  console.log(`name: ${person.name}, age: ${person.age}`);
}

processOptions({ name: 'jack', age: 22 } as Person);

interface GenericInterface<U> {
  value: U
  getIdentity: () => U
}

class IdentityClass<T> implements GenericInterface<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  getIdentity(): T {
    return this.value
  }

}

const myNumberClass = new IdentityClass('xxx');
myNumberClass.getIdentity();

type k1 = keyof { [x: string]: 1 };
const b: k1 = 'a';

console.log(b);

type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

async function p(arg: string): Promise<string> {
  return Promise.resolve(arg);
}

p('1');

type T = ReturnType<typeof p>;

const x: T = Promise.resolve('1');
console.log(x);
