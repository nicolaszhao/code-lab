import {Readable, Writable} from 'node:stream';
import {spawn} from 'node:child_process';

const childProcess = spawn(
  `sort`, // (A)
  {
    stdio: ['pipe', 'pipe', 'inherit'],
  }
);
const stdin = Writable.toWeb(childProcess.stdin); // (B)
const writer = stdin.getWriter(); // (C)
try {
  await writer.write('Cherry\n');
  await writer.write('Apple\n');
  await writer.write('Banana\n');
} finally {
  writer.close();
}

const stdout = Readable.toWeb(
  childProcess.stdout.setEncoding('utf-8'));

console.log(await readableStreamToString(stdout))


async function readableStreamToString(readableStream) {
  let result = '';
  for await (const chunk of readableStream) {
    result += chunk;
  }
  return result;
}
