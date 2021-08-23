

//#region 1. Get Started with Higher Order Observables in RxJS

// import { interval, fromEvent } from 'rxjs'
// import { map } from 'rxjs/operators'

// const clickObservable = fromEvent(document, 'click')

// const clockObservable = clickObservable
//   .pipe(map(click => interval(1000)))

// clockObservable
//   .subscribe(clock => clock.subscribe(tick => console.log(tick)))

//#endregion

//#region 2. Flatten a Higher Order Observable with RxJS switch

// import { interval, fromEvent } from 'rxjs'
// import { map, switchAll } from 'rxjs/operators'

// const clickObservable = fromEvent(document, 'click');

// const clockObservable = clickObservable
//   .pipe(
//     map(click => interval(1000)),
//     switchAll()
//   )
  

// clockObservable.subscribe(x => console.log(x));

// // flattening
// // Observable<Observable<number>> ---> Observable<number>

// /*
// --------+--------+------------------------
//         \        \
//          -0-1-2-3 -0-1-2-3-4-5-6
         
//          switch
         
// ----------0-1-2-3--0-1-2-3-4-5-6

// */

//#endregion

//#region 3. Flatten a Higher Order Observable with mergeAll in RxJS

// import { interval, fromEvent } from "rxjs"
// import { map, mergeAll } from "rxjs/operators"

// const clickObservable = fromEvent(document, "click")

// const clockObservable = clickObservable.pipe(
//   map(click => interval(1000)),
//   mergeAll(3)
// )

// clockObservable.subscribe(x => console.log(x))

// // flattening
// // Observable<Observable<number>> ---> Observable<number>

// /*
// --------+--------+------------------------
//         \        \
//          -0-1-2-3 -0-1-2-3-4-5-6
         
//          mergeAll
         
// ----------0-1-2-3-405162738495...
// */

//#endregion

//#region 4. Flatten a Higher Order Observable with concatAll in RxJS

// import { interval, fromEvent } from "rxjs"
// import { map, concatAll, take } from "rxjs/operators"

// const clickObservable = fromEvent(document, "click")

// const clockObservable = clickObservable.pipe(
//   map(click => interval(1000).pipe(take(5))),
//   concatAll()
// )

// clockObservable.subscribe(x => console.log(x))

// // flattening
// // Observable<Observable<number>> ---> Observable<number>

// /*
// --------+--------------+-+----
//         \        
//          -0-1-2-3-4|
         
//          concatAll
         
// ----------0-1-2-3-4-----0-1-2-3-4--0-1-2-3-4
// */



//#endregion

//#region 5. Use RxJS switchMap to Map and Flatten Higher Order Observables

// import { fromEvent } from "rxjs"
// import { switchMap } from "rxjs/operators"

// const clickObservable = fromEvent(document, "click")

// function performRequest() {
//   return fetch("https://jsonplaceholder.typicode.com/users/1").then(res =>
//     res.json()
//   )
// }

// // Observable<Event> ---> Observable<Response>
// const responseObservable = clickObservable.pipe(
//   switchMap(click => performRequest())
// )

// // switchMap = map ... + ... switch

// responseObservable.subscribe(x => console.log(x.email))


//#endregion

//#region 6. Use RxJS mergeMap to Map and Merge High Order Observables

// import { fromEvent } from "rxjs"
// import { mergeMap } from "rxjs/operators"

// const clickObservable = fromEvent(document, "click")

// function performRequest() {
//   return fetch("https://jsonplaceholder.typicode.com/users/1").then(res =>
//     res.json()
//   )
// }

// const emailObservable = clickObservable.pipe(
//   mergeMap(click => performRequest(), (click, res) => res.email, 3)
// )

// // mergeMap = map ... + ... mergeAll

// emailObservable.subscribe(
//   email => console.log(email)
// )

//#endregion

//#region 7. Use RxJS concatMap to Map and Concat High Order Observables

// import { fromEvent } from "rxjs"
// import { switchMap } from "rxjs/operators"

// const clickObservable = fromEvent(document, "click")

// function performRequest() {
//   return fetch("https://jsonplaceholder.typicode.com/users/1").then(res =>
//     res.json()
//   )
// }

// const emailObservable = clickObservable.pipe(
//   switchMap(click => performRequest(), (click, res) => res.email)
// )

// // concatMap = map ... + ... concatAll
// // mergeMap
// // switchMap

// emailObservable.subscribe(
//   email => console.log(email)
// )


//#endregion

//#region 8. Use RxJS mergeMap for Fine-grain Custom Behavior

// import { interval, of } from "rxjs"
// import { mergeMap, take } from "rxjs/operators"

// const sourceObservable = interval(500).pipe(take(5))

// const resultObservable = sourceObservable.pipe(
//   mergeMap(x => {
//     if (x % 2 === 0) {
//       return of(x)
//     } else {
//       return of(x + 1, x + 2)
//     }
//   })
// )

// resultObservable.subscribe(x => console.log(x))

// /*
// ---0---1---2---3---4|

// ---+---+---+---+---+|
//    \   \   \   \   \
//    0|  23|  2| 45| 4|
   
// ---0---23--2---45--4|
// */

// // mergeMap
// // concatMap
// // switchMap


//#endregion

//#region 9. Split an RxJS Observable with Window

// import { fromEvent, interval } from "rxjs"
// import { window, map, switchAll, count } from "rxjs/operators"

// const clickObservable = fromEvent(document, "click")
// const clockObservable = interval(1000)

// const resultObservable = clockObservable.pipe(
//   window(clickObservable),
//   map(obs => obs.pipe(count())),
//   switchAll()
// )

// resultObservable.subscribe(x => console.log(x))

// /*
// --0--1--2--3--4--5--6--7--8-- clockObservable
// -------c-------c---c--------- clickObservable

//     window
 
// +------+-------+---+---------
// \      \       \   \
//  -0--1-|2--3--4|-5-|6--7--8--
 
//   map(obs => obs.count())
  
// +------+-------+---+--
// \      \       \   \
//  -----2|------3|--1|---
          
//     switch
 
// ------2-------3---1----

// */

//#endregion

//#region 10. Split an RxJS Observable Conditionally with windowToggle

// import { fromEvent, interval } from "rxjs"
// import { mergeAll, windowToggle } from "rxjs/operators"

// const clickObservable = fromEvent(document, "click")
// const clockObservable = interval(1000)
// const downObservable = fromEvent(document, "mousedown")
// const upObservable = fromEvent(document, "mouseup")

// const resultObservable = clockObservable.pipe(
//   windowToggle(downObservable, () => upObservable),
//   mergeAll()
// )

// resultObservable.subscribe(x => console.log(x))

// /*
// --0--1--2--3--4--5--6--7--8--9--
// ----------D-------------D------- downObservable
// -------------------U------------ upObservable

//  windowToggle
 
// ----------+-------------+-------
//           \3--4--5-|    \-8--9--
          
//  mergeAll
 
// -----------3--4--5--------8--9--

// */


//#endregion

//#region 11. Split an RxJS Observable into Groups with groupBy

// import { interval } from "rxjs"
// import { take, map, groupBy, mergeAll, count } from "rxjs/operators"

// const numbersObservable = interval(500).pipe(take(5))

// numbersObservable
//   .pipe(
//     groupBy(x => x % 2),
//     map(innerObs => innerObs.pipe(count())),
//     mergeAll()
//   )
//   .subscribe(x => console.log(x))

// /*
// --0--1--2--3--4|

//  groupBy(x => x % 2)
 
// --+--+---------|
//   \  \
//   \  1-----3---|
//   0-----2-----4|
  
//  map(innerObs => innerObs.count())
 
// --+--+---------|
//   \  \
//   \  ---------2|
//   ------------3|
  
//  mergeAll
 
// --------------(3,2)|

// */


//#endregion

//#region 12. Use groupBy in Real RxJS Applications

// import { of } from "rxjs"
// import { concatMap, delay, groupBy, mergeMap, skip, map } from "rxjs/operators"

// const busObservable = of(
//   { code: "en-us", value: "-TEST-" },
//   { code: "en-us", value: "hello" },
//   { code: "es", value: "-TEST-" },
//   { code: "en-us", value: "amazing" },
//   { code: "pt-br", value: "-TEST-" },
//   { code: "pt-br", value: "olá" },
//   { code: "es", value: "hola" },
//   { code: "es", value: "mundo" },
//   { code: "en-us", value: "world" },
//   { code: "pt-br", value: "mundo" },
//   { code: "es", value: "asombroso" },
//   { code: "pt-br", value: "maravilhoso" }
// ).pipe(
//   concatMap(x => of(x)),
//   delay(500)
// )

// const all = busObservable.pipe(
//   groupBy(obj => obj.code),
//   mergeMap(innerObs =>
//     innerObs.pipe(
//       skip(1),
//       map(obj => obj.value)
//     )
//   )
// )

// all.subscribe(x => console.log(x))

//#endregion

//#region 13. Use switchMap as a Safe Default to Flatten Observables in RxJS

// import { fromEvent, interval } from "rxjs"
// import { switchMap, map } from "rxjs/operators"

// const clickObservable = fromEvent(document, "click")

// // const requestObservable = ...

// // const responseObservable = requestObservable
// //   .switchMap(request => ... response)

// const clockObservable = clickObservable.pipe(
//   switchMap(click => {
//     return interval(1000).pipe(map(i => i * 10 * click.clientX))
//   })
// )

// clockObservable.subscribe(x => console.log(x))

// // flattening
// // Observable<Observable<number>> ---> Observable<number>

// /*
// --------+--------+-----------------
//         \        \
//          -0-1-2-3 -0-1-2-3-4-5-6---
         
//          switch
         
// ----------0-1-2-3--0-1-2-3-4-5-6---
// */

//#endregion



