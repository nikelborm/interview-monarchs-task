import { equal } from 'assert';
import test from 'node:test';

function testComparator(
  name: string,
  comparator: (a: boolean, b: boolean) => boolean,
) {
  test(name, () => {
    equal(comparator(false, false), false)
    equal(comparator(false, true),  true )
    equal(comparator(true,  false), true )
    equal(comparator(true,  true),  false)
  })
}

testComparator('original xor', (a, b) => a !== b)

testComparator('1st custom xor using: !, &&    ', (a, b) => !(a && b) && !(!a && !b)) // 7 ops
testComparator('2nd custom xor using: !, &&    ', (a, b) => !( !(a && !b) && !(!a && b) )) // 8 ops

testComparator('1st custom xor using: !, &&, ||', (a, b) => !(a && b) && (a || b)) // 4 ops
testComparator('2nd custom xor using: !, &&, ||', (a, b) => (a && !b) || (!a && b)) // 5 ops
testComparator('3rd custom xor using: !, &&, ||', (a, b) => !( (a && b) || !(a || b) )) // 5 ops
testComparator('4th custom xor using: !, &&, ||', (a, b) => (!a || !b) && (a || b)) // 5 ops
testComparator('5th custom xor using: !, &&, ||', (a, b) => !( (a && b) || (!a && !b) )) // 6 ops

testComparator('1st custom xor using: !, ||', (a, b) => !( !(!a || !b) || !(a || b) )) // 8 ops
