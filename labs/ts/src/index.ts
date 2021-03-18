export type BasicPrimitive = number | string | boolean;

export function doStuff(value: BasicPrimitive) {
  if (value < 5) {
    return undefined;
  }
  return value;
}

let a: [string, ...number[], boolean] = ['hello world', 10, false];

interface Person {
  name: string;
  [x: string]: any;
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
const b: k1 = 'a'

type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;


