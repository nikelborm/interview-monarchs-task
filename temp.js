let table1 = [1, 2, 2, 3, 3]

let table2 = [3, 3, 4, 4, 5]

// [
//   [ 1, 3 ],    [ 1, 3 ],    [ 1, 4 ],
//   [ 1, 4 ],    [ 1, 5 ],    [ 2, 3 ],
//   [ 2, 3 ],    [ 2, 4 ],    [ 2, 4 ],
//   [ 2, 5 ],    [ 2, 3 ],    [ 2, 3 ],
//   [ 2, 4 ],    [ 2, 4 ],    [ 2, 5 ],
//   [ 3, 3 ],    [ 3, 3 ],    [ 3, 4 ],
//   [ 3, 4 ],    [ 3, 5 ],    [ 3, 3 ],
//   [ 3, 3 ],    [ 3, 4 ],    [ 3, 4 ],
//   [ 3, 5 ],    [ 1, null ], [ 2, null ],
//   [ 2, null ], [ 3, null ], [ 3, null ],
//   [ null, 3 ], [ null, 3 ], [ null, 4 ],
//   [ null, 4 ], [ null, 5 ]
// ]
let output = [
...table1.flatMap(e1 => table2.map(e2 => [e1, e2])),
...table1.map(e1 => [e1, null]),
...table2.map(e2 => [null, e2])
]

output.length
