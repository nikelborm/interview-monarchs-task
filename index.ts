type Merge<T> = { [P in keyof T]: T[P] } & {};

type RemapEnumArrToObject<T extends Array<string> | Array<number>> =
  T['length'] extends 0
  ? {}
  : T['length'] extends 1
    ? { [k in T[0]] : T[0] }
    : T extends [
      infer U extends T[number],
      ...infer Rest extends Array<string> | Array<number>
    ]
      ? { [k in U] : U } & RemapEnumArrToObject<Rest>
      : never;

const secureObject = (o: Record<string|number|symbol, any>) => {
  Object.seal(o);
  Object.freeze(o);
  Object.preventExtensions(o);
}

const ENUM = <
  const T extends Array<string> | Array<number>
>(arr: T):Merge<Readonly<RemapEnumArrToObject<T>>> => {
  const map = Object.fromEntries(arr.map( e => [e, e] ));
  secureObject(map);
  return map;
};






const MONARCHS = {
  'NIKOLAY_1': 'Николай 1',
  'ALEXEI_MICHAILOVICH': 'Алексей Михайлович',
  'EKATERINA_VELIKAYA': 'Екатерина Великая',
  'PETR_1': 'Пётр 1',
  'MICHAI_FEDOROVICH': 'Михаил Фёдорович',
} as const;

type IMonarchs = keyof typeof MONARCHS;

console.log(MONARCHS)

const baseRules = new Set([
  'there is token type [T]',
  'there is token [T]', // meaning that it must be placed somewhere
  'token [T] is of type [U]',
  'token [T] is in slot with index [N]',

  'there are exactly [N] spatial slots',
  '[T] OR [U]', // ???
  '[T] AND [U]', // ???
  'NOT [T]', // ???
  '[T] XOR [U]', // ???
]);

const possibleRules = new Set([
  'token of type [T] to the left of token of type [U]', // requires minimum 2 spatial slots
  'token [T] to the left of token of type [U]', // T ..(0,∞).. U
  'token of type [T] to the left of token [U]',
  'token [T] to the left of token [U]',

  'token of type [T] to the right of token of type [U]', // U ..(0,∞).. T
  'token [T] to the right of token of type [U]',
  'token of type [T] to the right of token [U]',
  'token [T] to the right of token [U]',

  'token of type [T] must have a neighbour token of type [U]', // U ..(0).. T, T ..(0).. U
  'token [T] must have a neighbour token of type [U]',
  'token of type [T] must have a neighbour token [U]',
  'token [T] must have a neighbour token [U]',

  'there are at most [N] spatial slots',
  'there are at least [N] spatial slots',

  'there are at most [N] tokens of [M] type in any single spatial slot',
  'there are at least [N] tokens of [M] type in any single spatial slot',
  'there are exactly [N] tokens of [M] type in any single spatial slot', // for example every single slot must have 1 and only one monarch

  'if slot has token [T], it has token [U]',

  'there are at most [N] tokens in any single spatial slot',
  'there are at least [N] tokens in any single spatial slot',
  'there are exactly [N] tokens in any single spatial slot',
] as const);

const remapTokens = {
  'token [T] to the left of token [U]': {
    requires: [
      'there are exactly [N] spatial slots',
    ],
    results: {
      type: 'OR',
      set: [
        {
          type: 'AND',
          set: []
        }
      ] // 
    },
  }
}


// есть infinite time-spatial slot sequence.
// на неё можно накладывать правила.
// spatial token slots have indices.
// она может быть детерминированной (иметь ограниченное количество состояний удовлетворяющих вопросу)
// или недетерминированной (например иметь бесконечное количество состояний (например когда не имеет ограниченной длины и сказано, что что-то стоит правее чего-то))

// есть системы, которым соответствует исключительно одно решение
// есть системы, которым соответствует 0 решений
// есть системы, которым соответсвует несколько решений

// решение -- нечто странное, что можно назвать и набором правил и инстансом в котором всё уже расставлено.

// системы решений можно складывать, что приводит к либо расширению пространства решений, либо к его сужению

// rules can be expanded or collapsed. completely expanded ruleset looks like a set of rulesets that have only 1 solution and represents the solution space

// some rulesets are AND combination of few rulesets. some rulesets are OR combination of few rulesets.
// AND rulesets are more restrictive than each of the individual rules. OR rulesets are more allowing than each of the individual rules

// TODO: вспомни про какое-то правило, которое позволяет not or конвертировать в ! AND !


// MONARCHS_ENGLISH.MICHAI_FEDOROVICH



// 'Nibiru': 'Нибиру',
// 'Kottedzh': 'Коттедж',
// 'Kolomenskij': 'Коломенский',
// 'Putevoj': 'Путевой',
