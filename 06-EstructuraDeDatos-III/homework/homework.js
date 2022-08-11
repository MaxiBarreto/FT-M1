"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)
​
  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/
// LinkedList()
// his.head = null

function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

//var tree = new BinarySearchTree(20) ---> ROOT
//       20
//tree.insert(8)
//        20
//      /
//     8

BinarySearchTree.prototype.insert = function (value) {
  //si es menor
  if (this.value > value) {
    // si a la izquierda esta null
    if (!this.left) this.left = new BinarySearchTree(value);
    // si a la izquierda ya tengo un nodo, llamamos a recursion
    else this.left.insert(value);
  }
  //si es mayor o igual
  else {
    if (!this.right) this.right = new BinarySearchTree(value);
    else this.right.insert(value);
  }
};
// .insert
// si el valor es mayor o menor al root
// si es mayor
// tenes algo a la derecha?
// si es null --> inserta el nuevo BST
// si tiene algo --> recursion
// si es menor
// ... lo mismo hacia la izquierda

BinarySearchTree.prototype.size = function () {
  //caso base --->  // 1 bst hoja
  if (!this.left && !this.right) return 1;
  // if (this.left === null && this.right === null)
  // 1 bst con 1 hijo a la izquierda
  if (this.left && !this.right) return 1 + this.left.size();
  // 1 bst con 1 hijo a la derecha
  if (!this.left && this.right) return 1 + this.right.size();
  // 1 bst con 2 nodos hijos
  if (this.left && this.right) return 1 + this.left.size() + this.right.size();
};

/*
             8
            / \
          3   10
        /   \
       1    4
             \
             6
​
            nivel 0 = 1 + left.size() (4)                            + right.size() (1)
            nivel 1=        1 + left.size()  + right.size()                 1
            nivel 2=                1             1   + right.size()
            nivel 3=                                             1
*/


BinarySearchTree.prototype.contains = function (value) {
  //caso de corte en la recursion
  if (this.value === value) return true;
  // si es mayor o menor?
  if (value > this.value) {
    if (!this.right) return false;
    else return this.right.contains(value);
  } else {
    if (!this.left) return false;
    else return this.left.contains(value);
  }
};

BinarySearchTree.prototype.depthFirstForEach = function (cb, order) {
    // izq - der - root
  if (order === "post-order"){
    if (this.left) this.left.depthFirstForEach(cb, order)
    if (this.right) this.right.depthFirstForEach(cb, order)
    cb(this.value)
  }
   // root - izq - der
  else if (order === "pre-order"){
    cb(this.value)
    if (this.left) this.left.depthFirstForEach(cb, order)
    if (this.right) this.right.depthFirstForEach(cb, order)
  }
  else {
    //voy todo hacia la izquierda
   if (this.left) this.left.depthFirstForEach(cb, order)
   //aplico el cb al root
   cb(this.value)
   // voy hacia la derecha
   if (this.right) this.right.depthFirstForEach(cb, order)
  }
};


BinarySearchTree.prototype.breadthFirstForEach = function (cb, array = []) {
/*
             8
            / \
          3   10
        /   \   \ 
       1    4    25
             \
             6
*/

cb(this.value)                          //cb(8)                 //cb(3)
if (this.left) array.push(this.left)   // array = [3]           // array [10, 1]
if (this.right) array.push(this.right) // array = [3, 10]      // array [10, 1, 4]

let next = array.shift()             // next = 3 array [10]    // next = 10 array [1, 4]
if (next) next.breadthFirstForEach(cb, array)

 // if (array.length > 0) array.shift().breadthFirstForEach(cb, array)
};

// No modifiquen nada debajo de esta linea
// --------------------------------


module.exports = {
  BinarySearchTree,
};
