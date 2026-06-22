const questions = [
  {
    id: 1,
    concept: "Paradigmas",
    question: "¿Qué es un paradigma de programación según los apuntes de clase?",
    options: [
      "Una librería especializada que optimiza la compilación del código.",
      "Un modelo básico de diseño e implementación que proporciona una filosofía y enfoque particular para resolver problemas.",
      "Una secuencia estricta de instrucciones lógicas ejecutadas únicamente por la CPU."
    ],
    answer: 1
  },
  {
    id: 2,
    concept: "Paradigma Imperativo",
    question: "¿En qué se centra principalmente el paradigma imperativo?",
    options: [
      "En describir qué es la solución del problema, abstrayéndose del procedimiento.",
      "En el uso exclusivo de funciones matemáticas puras sin alterar la memoria.",
      "En indicar al ordenador el 'cómo' hacer las cosas paso a paso."
    ],
    answer: 2
  },
  {
    id: 3,
    concept: "Paradigma Imperativo",
    question: "¿Cuál es una característica distintiva del paradigma imperativo a nivel de memoria?",
    options: [
      "Utiliza variables ligadas a posiciones de memoria que sufren constantes alteraciones mediante asignaciones destructivas.",
      "No actualiza estados de memoria ni utiliza asignaciones destructivas de ningún tipo.",
      "Asigna memoria de solo lectura que es administrada por un motor de inferencias lógico."
    ],
    answer: 0
  },
  {
    id: 4,
    concept: "Paradigma Declarativo",
    question: "¿Cómo resuelven los problemas los lenguajes del paradigma declarativo?",
    options: [
      "Mediante una secuencia paso a paso controlada por el programador usando bucles explícitos.",
      "Delegando el 'cómo' alcanzar la solución a mecanismos o motores internos de evaluación del lenguaje.",
      "A través de asignaciones de memoria destructivas en registros físicos del procesador."
    ],
    answer: 1
  },
  {
    id: 5,
    concept: "Programación Lógica",
    question: "¿Cuál es el lenguaje representativo de la programación lógica mencionado en el texto?",
    options: [
      "Haskell",
      "Prolog",
      "Smalltalk"
    ],
    answer: 1
  },
  {
    id: 6,
    concept: "Programación Funcional",
    question: "¿En qué basa su estructura la programación funcional?",
    options: [
      "En la definición de predicados y la evaluación de funciones transparentes sin actualización de estados.",
      "En el envío de mensajes asíncronos entre objetos clonados en memoria.",
      "En la creación de diagramas de flujo interactivos ejecutados de manera secuencial."
    ],
    answer: 0
  },
  {
    id: 7,
    concept: "Paradigma Orientado a Objetos",
    question: "¿Cómo concibe la POO un sistema computacional?",
    options: [
      "Como una colección de funciones recursivas de evaluación inmediata.",
      "Como un mundo poblado de objetos que cooperan comunicándose a través de mensajes.",
      "Como un flujo lineal de sentencias imperativas ejecutadas en paralelo."
    ],
    answer: 1
  },
  {
    id: 8,
    concept: "Programación Dirigida por Eventos",
    question: "En la programación dirigida por eventos, ¿qué determina la ruta de ejecución del programa?",
    options: [
      "Los sucesos o eventos que ocurren en el entorno, como que el usuario presione un botón.",
      "Una estructura condicional switch centralizada definida por el compilador.",
      "La resolución de reglas lógicas cargadas en la memoria al iniciar el sistema."
    ],
    answer: 0
  },
  {
    id: 9,
    concept: "Programación Reactiva",
    question: "¿En qué se basa el paradigma de la programación reactiva?",
    options: [
      "En estructurar el código en funciones recursivas de orden superior sin estados.",
      "En crear objetos emisores asíncronos y objetos que se 'suscriben' a ellos para reaccionar a los valores que reciben.",
      "En resolver problemas mediante algoritmos de complejidad O(n) sin utilizar objetos."
    ],
    answer: 1
  },
  {
    id: 10,
    concept: "Programación Dinámica",
    question: "¿Qué busca resolver la programación dinámica y con qué complejidad computacional?",
    options: [
      "Desacoplar la memoria dinámica del Heap logrando una complejidad de O(1).",
      "Romper problemas complejos en partes muy pequeñas para encontrar la solución óptima sin recursividad, buscando complejidad O(n).",
      "Ejecutar consultas recursivas asíncronas sobre bases de datos SQL."
    ],
    answer: 1
  },
  {
    id: 11,
    concept: "DSL",
    question: "¿Qué es un DSL (Lenguaje Específico del Dominio) y cuál es el ejemplo más claro según los apuntes?",
    options: [
      "Un lenguaje multiparadigma; el ejemplo es C#.",
      "Un lenguaje creado exclusivamente para resolver un problema extremadamente puntual; el ejemplo es SQL.",
      "Un protocolo de comunicación física; el ejemplo es la pila de ejecución."
    ],
    answer: 1
  },
  {
    id: 12,
    concept: "Abstracción",
    question: "¿En qué consiste la abstracción según la definición de los apuntes?",
    options: [
      "En la habilidad de filtrar información, quedándonos solo con las características útiles e ignorando el resto.",
      "En duplicar todas las propiedades físicas del objeto del mundo real dentro de la memoria RAM.",
      "En reescribir un algoritmo para que se ejecute sin variables locales en el Stack."
    ],
    answer: 0
  },
  {
    id: 13,
    concept: "Abstracción",
    question: "Si queremos representar la 'Tierra' para un juego del Sistema Solar, ¿qué datos abstraemos según los apuntes?",
    options: [
      "Los límites geográficos, la cantidad de países y el producto interno bruto.",
      "El tamaño, el peso y su órbita espacial.",
      "Los nombres de los océanos y la densidad de población."
    ],
    answer: 1
  },
  {
    id: 14,
    concept: "Abstracción",
    question: "En la abstracción, ¿qué significa el concepto de 'Caja Negra'?",
    options: [
      "Que no podemos acceder a ningún servicio o método del objeto desde el exterior.",
      "Que la computadora almacena las variables privadas en un sector oscuro del Heap.",
      "Que podemos usar un objeto (ej. consultar obtenerDensidad()) sin tener que entender cómo funciona por dentro."
    ],
    answer: 2
  },
  {
    id: 15,
    concept: "Abstracción",
    question: "¿Qué ventaja práctica ofrece la abstracción cuando nos damos cuenta de que dos problemas parecen diferentes pero en el fondo son iguales?",
    options: [
      "Permite reciclar la lógica del código (ej. resolver el estacionamiento y los casilleros del club con la misma estructura).",
      "Permite que el recolector de basura de la memoria funcione en tiempo récord de O(1).",
      "Aumenta la cantidad de herencia múltiple permitida en el compilador de C#."
    ],
    answer: 0
  },
  {
    id: 16,
    concept: "Objeto",
    question: "¿Cuáles son las dos partes fundamentales que agrupa un objeto?",
    options: [
      "Clases y constructores.",
      "Stack y Heap.",
      "Atributos (datos) y Métodos (comportamiento)."
    ],
    answer: 2
  },
  {
    id: 17,
    concept: "Objeto",
    question: "¿Cuál es la diferencia entre un 'objeto del problema' y un 'objeto de software'?",
    options: [
      "El del problema es teórico (se identifica en diseño); el de software es real (se instancia en la memoria RAM en ejecución).",
      "El del problema vive en el Stack; el de software reside físicamente en la memoria de la base de datos.",
      "El del problema es de solo lectura; el de software permite asignaciones destructivas ilimitadas."
    ],
    answer: 0
  },
  {
    id: 18,
    concept: "Objeto",
    question: "¿Cuáles son las tres características que posee cada objeto de software en ejecución?",
    options: [
      "Un nombre de clase obligatorio, un compilador integrado y una interfaz visual.",
      "Una identidad propia, un estado interno (atributos) y la capacidad de comunicarse mediante mensajes.",
      "Un constructor dinámico, un puntero al Stack y una dirección estática física."
    ],
    answer: 1
  },
  {
    id: 20,
    concept: "Tipos de POO",
    question: "¿En qué consiste la POO basada en clases (como la de C#, Java y C++)?",
    options: [
      "Se crean objetos directamente clonándolos a partir de plantillas sueltas sin moldes previos.",
      "Se basa en definir obligatoriamente un molde llamado clase, a partir del cual se instancian los objetos usando new.",
      "Se prohíbe el uso de constructores y variables privadas para acelerar el Heap."
    ],
    answer: 1
  },
  {
    id: 21,
    concept: "Tipos de POO",
    question: "¿En qué consiste la POO basada en prototipos (como la de JavaScript)?",
    options: [
      "No existen las clases, solo hay objetos. La reutilización se logra mediante la clonación de objetos prototípicos.",
      "Obliga al uso de modificadores static e internal en todos los objetos creados.",
      "Solo admite herencia de constructores estáticos."
    ],
    answer: 0
  },
  {
    id: 22,
    concept: "Tipos de POO",
    question: "¿Cómo emula C# la reutilización basada en prototipos?",
    options: [
      "Permitiendo agregar métodos dinámicos al vuelo en tiempo de compilación.",
      "Implementando un método Clone() para replicar objetos existentes sin tener que volver a cargar todos sus datos manualmente.",
      "Usando variables locales nulas en la pila de ejecución."
    ],
    answer: 1
  },
  {
    id: 23,
    concept: "Memoria",
    question: "¿Qué es el Heap (o Montículo) en la memoria de la computadora?",
    options: [
      "El área de memoria de alta velocidad donde residen las variables locales y de control del procesador.",
      "El espacio físico donde se crean y almacenan los objetos de software durante la ejecución.",
      "Un registro estático del compilador que contiene el código binario de la aplicación."
    ],
    answer: 1
  },
  {
    id: 24,
    concept: "Memoria",
    question: "¿Qué reside en el Stack (Pila) de la memoria durante la ejecución?",
    options: [
      "Los objetos de software de gran tamaño instanciados con new.",
      "Las variables locales y las referencias (punteros) que apuntan hacia las direcciones del Heap.",
      "El código fuente traducido a lenguaje ensamblador."
    ],
    answer: 1
  },
  {
    id: 25,
    concept: "Clase",
    question: "Desde el punto de vista del diseño (visión estática), ¿qué es una clase?",
    options: [
      "Una estructura de almacenamiento de datos temporal en el Stack.",
      "Un patrón o plantilla que establece los atributos y comportamiento comunes a un conjunto de objetos.",
      "Un objeto dinámico clonable mediante comandos de solo lectura."
    ],
    answer: 1
  },
  {
    id: 26,
    concept: "Clase",
    question: "Desde el punto de vista de la implementación (visión dinámica), ¿qué es una clase?",
    options: [
      "Un módulo de software (código) que la computadora utiliza como fábrica para instanciar los objetos.",
      "Un puntero lógico hacia una dirección del Heap.",
      "Una colección de objetos que comparten exactamente la misma dirección física de memoria."
    ],
    answer: 0
  },
  {
    id: 27,
    concept: "UML",
    question: "En UML, ¿qué es el diagrama de clases?",
    options: [
      "Una secuencia temporal que muestra el orden de los mensajes enviados entre objetos.",
      "Una representación visual que modela la vista estática del sistema, sus clases, estructura y relaciones.",
      "Un gráfico que detalla cómo se guardan los bytes en el Heap y en el Stack."
    ],
    answer: 1
  },
  {
    id: 28,
    concept: "UML",
    question: "¿Cómo se compone gráficamente el diagrama de una clase en UML?",
    options: [
      "Un círculo dividido en sectores según el nivel de encapsulamiento.",
      "Un rectángulo dividido en compartimentos que contienen Nombre, Atributos, Servicios y Responsabilidades.",
      "Un diagrama de flujo secuencial que detalla comandos algorítmicos."
    ],
    answer: 1
  },
  {
    id: 29,
    concept: "UML",
    question: "En el diagrama de clases de UML, ¿cómo se representa gráficamente una nota o comentario?",
    options: [
      "Como un rectángulo externo con la esquina superior derecha plegada, unido al diagrama con una línea simple.",
      "Como una etiqueta de texto encerrada entre corchetes rectangulares.",
      "Como un óvalo con fondo rojo neón que se dibuja en la parte inferior del molde."
    ],
    answer: 0
  },
  {
    id: 30,
    concept: "UML",
    question: "¿Cómo se declaran los atributos y métodos en el diseño de un diagrama UML?",
    options: [
      "Especificando primero el tipo de dato y luego el nombre (ej. entero maxima).",
      "Especificando primero el nombre y luego el tipo de dato (ej. maxima: entero o obtenerMaxima() : entero).",
      "Declarando únicamente el modificador private o public sin especificar nombres."
    ],
    answer: 1
  },
  {
    id: 31,
    concept: "Atributos de Instancia",
    question: "¿Qué son los atributos de instancia?",
    options: [
      "Aquellos que guardan valores comunes y compartidos de forma global por todas las clases del ensamblado.",
      "Aquellos cuyos valores son fijos, definidos con const y no ocupan memoria física.",
      "Aquellos que guardan los valores propios e individuales de cada objeto, definiendo su estado individual."
    ],
    answer: 2
  },
  {
    id: 32,
    concept: "Atributos de Clase",
    question: "¿Qué son los atributos de clase (o estáticos)?",
    options: [
      "Aquellos cuyos valores son comunes y compartidos por absolutamente todas las instancias de la clase, almacenados en un único espacio de memoria.",
      "Aquellos que cambian su valor de forma aleatoria e independiente en cada objeto creado.",
      "Las variables locales temporales que se borran del Stack al finalizar un método."
    ],
    answer: 0
  },
  {
    id: 33,
    concept: "Metáfora del Edificio",
    question: "En los apuntes se usa la 'Metáfora del Edificio'. ¿Qué representa el tanque de agua central?",
    options: [
      "Los atributos de instancia, porque cada departamento los usa como quiere.",
      "El atributo de clase (estático), porque es único en memoria, es compartido y si se vacía afecta a todos.",
      "El constructor por defecto, que provee agua de forma automática a los residentes."
    ],
    answer: 1
  },
  {
    id: 34,
    concept: "Metáfora del Edificio",
    question: "En la 'Metáfora del Edificio', ¿qué representan las canillas de cada departamento?",
    options: [
      "Los constructores sobrecargados de la clase hija.",
      "Los atributos de instancia, ya que cada departamento tiene los suyos y puede usarlos sin afectar al resto.",
      "Las propiedades de solo lectura que acceden al tanque estático."
    ],
    answer: 1
  },
  {
    id: 35,
    concept: "Constructores",
    question: "¿Qué es un constructor?",
    options: [
      "Un método que se ejecuta automáticamente mediante new para inicializar los atributos de instancia del nuevo objeto.",
      "Una función del compilador que elimina los objetos inactivos del Heap.",
      "Un modificador de comportamiento que blinda la clase para que no se pueda heredar."
    ],
    answer: 0
  },
  {
    id: 36,
    concept: "Constructores",
    question: "¿Qué característica de nomenclatura tienen los constructores?",
    options: [
      "Deben llamarse obligatoriamente Init() o Constructor().",
      "Tienen exactamente el mismo nombre que la clase a la que pertenecen.",
      "Llevan un prefijo especial según su modificador de acceso."
    ],
    answer: 1
  },
  {
    id: 37,
    concept: "Sobrecarga de Constructores",
    question: "¿Qué es la sobrecarga de constructores?",
    options: [
      "Tener múltiples constructores en una clase con el mismo nombre pero diferente número o tipo de parámetros.",
      "El error que ocurre en memoria al instanciar demasiados objetos de software en el Heap.",
      "La herencia obligatoria de constructores desde la clase padre hacia la clase hija."
    ],
    answer: 0
  },
  {
    id: 38,
    concept: "Constructor por Defecto",
    question: "¿Cuándo genera el compilador un 'constructor por defecto'?",
    options: [
      "Solo si el desarrollador decide no programar ningún constructor explícitamente.",
      "Siempre, independientemente de los constructores que escriba el programador.",
      "Solo cuando la clase se declara como abstracta y de solo lectura."
    ],
    answer: 0
  },
  {
    id: 39,
    concept: "Constructores y Herencia",
    question: "¿Se heredan los constructores en la Programación Orientada a Objetos?",
    options: [
      "Sí, la clase hija hereda todos los constructores del padre de forma idéntica.",
      "No, las clases hijas no heredan los constructores del padre. Cada clase debe programar los suyos.",
      "Solo se heredan si el constructor del padre tiene el modificador de acceso public."
    ],
    answer: 1
  },
  {
    id: 40,
    concept: "Palabra clave 'this'",
    question: "Siguiendo la 'Receta del Profesor', ¿para qué se usa la palabra clave this en un constructor?",
    options: [
      "Para instanciar el objeto en la pila de memoria local.",
      "Para guardar el valor recibido en el atributo interno de la clase, diferenciándolo del parámetro que ingresa.",
      "Para liberar el espacio de memoria que ocupa la referencia nula."
    ],
    answer: 1
  },
  {
    id: 41,
    concept: "Principio CQS",
    question: "¿Qué establece el Principio CQS (Separación de Comandos y Consultas)?",
    options: [
      "Que los atributos de instancia deben estar separados de los atributos de clase en el Heap.",
      "Que los métodos de un objeto deben dividirse estrictamente en dos categorías: Comandos o Consultas.",
      "Que un constructor no debe utilizar el operador new para inicializar el estado del objeto."
    ],
    answer: 1
  },
  {
    id: 42,
    concept: "CQS - Consultas",
    question: "¿Cuál es la 'Regla de Oro' de las Consultas (Queries) en el Principio CQS?",
    options: [
      "No deben modificar el estado interno del objeto (deben estar libres de efectos secundarios).",
      "Deben retornar siempre un tipo de dato void y no utilizar return.",
      "Solo se pueden ejecutar una vez por cada ciclo de ejecución."
    ],
    answer: 0
  },
  {
    id: 43,
    concept: "CQS - Comandos",
    question: "¿Cuál es la 'Regla de Oro' de los Comandos (Commands) en el Principio CQS?",
    options: [
      "Su trabajo es modificar el estado interno, por lo que en un diseño puro su tipo de retorno debe ser void.",
      "Siempre deben finalizar con una instrucción return que devuelva el estado completo del objeto.",
      "No se les permite recibir parámetros ni interactuar con atributos privados."
    ],
    answer: 0
  },
  {
    id: 44,
    concept: "Modificadores de Acceso",
    question: "En modificadores de acceso, ¿cuál es la diferencia entre private y protected?",
    options: [
      "Private es accesible por el ensamblado; protected es accesible desde cualquier lugar.",
      "Private da acceso solo al código interno de la clase; protected da acceso a la clase original y a sus subclases derivadas.",
      "Private se guarda en el Stack; protected se guarda en el Heap."
    ],
    answer: 1
  },
  {
    id: 45,
    concept: "Modificadores de Acceso",
    question: "Si en lenguajes como C# no escribes ningún modificador de acceso en un atributo de clase, ¿cuál toma por defecto?",
    options: [
      "public",
      "private",
      "internal"
    ],
    answer: 1
  },
  {
    id: 46,
    concept: "Modificadores de Acceso",
    question: "¿Qué permisos otorga el modificador de acceso 'internal'?",
    options: [
      "Permite el acceso únicamente a cualquier código que pertenezca al mismo ensamblado (proyecto o paquete compilado).",
      "Restringe el acceso solo a los métodos estáticos del constructor base.",
      "Permite que solo las clases hijas ubicadas en otros proyectos puedan leer el atributo."
    ],
    answer: 0
  },
  {
    id: 47,
    concept: "Modificadores de Comportamiento",
    question: "¿Qué indica el modificador de comportamiento 'abstract' colocado delante de una clase?",
    options: [
      "Que la clase es de solo lectura y no permite comandos.",
      "Que la clase está incompleta y, por lo tanto, no se pueden crear objetos (instancias) directamente de ella.",
      "Que todos sus métodos son de tipo static."
    ],
    answer: 1
  },
  {
    id: 48,
    concept: "Modificador final / const",
    question: "En Java/C#, ¿qué efecto tiene aplicar final (Java) o const/final (C#) sobre una clase?",
    options: [
      "Significa que la clase es el eslabón final y no se permite que ninguna otra clase herede o se extienda de ella.",
      "Fuerza a que todos los atributos de la clase se almacenen en el Stack en lugar del Heap.",
      "Habilita el polimorfismo dinámico en todos los métodos de la clase."
    ],
    answer: 0
  },
  {
    id: 49,
    concept: "Encapsulamiento",
    question: "¿Cuál es el principal beneficio de tratar a un componente como una 'Caja Negra' mediante el encapsulamiento?",
    options: [
      "Los demás objetos interactúan solo con su interfaz pública, ignorando cómo está implementado por dentro, reduciendo el acoplamiento.",
      "Permite duplicar el objeto en la base de datos de manera automática.",
      "Optimiza el uso del Stack para almacenar variables compartidas."
    ],
    answer: 0
  },
  {
    id: 50,
    concept: "Propiedades",
    question: "En C#, ¿cómo funcionan los descriptores get y set en las propiedades?",
    options: [
      "get actúa como constructor y set actúa como destructor del objeto en el Heap.",
      "get actúa como consulta (devuelve el valor); set actúa como comando (asigna usando el parámetro implícito value).",
      "get almacena la variable en el Stack y set la copia al Heap."
    ],
    answer: 1
  },
  {
    id: 51,
    concept: "Referenciamiento",
    question: "Debido al referenciamiento, ¿qué sucede cuando ejecutas la asignación cb3 = cb2 entre dos variables de tipo clase?",
    options: [
      "Se crea un objeto duplicado idéntico en un nuevo espacio del Heap.",
      "Se copia la referencia (dirección); ambas variables apuntan al mismo objeto en el Heap (Aliasing).",
      "El compilador borra el objeto cb2 de la memoria e inicializa cb3 con valores nulos."
    ],
    answer: 1
  },
  {
    id: 52,
    concept: "Referenciamiento",
    question: "Si cb1 y cb2 apuntan a objetos distintos creados con new, pero con los mismos datos, ¿qué devuelve cb1 == cb2 y por qué?",
    options: [
      "true, porque los valores de sus atributos son equivalentes.",
      "false, porque el operador == compara identidades (dirección de memoria) y no equivalencia de datos.",
      "true, porque comparten el tanque de agua central de la clase."
    ],
    answer: 1
  },
  {
    id: 53,
    concept: "Polimorfismo",
    question: "¿Qué es el polimorfismo en la Programación Orientada a Objetos?",
    options: [
      "La capacidad de que objetos de diferentes clases respondan al mismo mensaje (llamada a método) a su propia manera.",
      "La restricción que obliga a que una clase hija tenga un solo constructor base.",
      "El proceso de clonar dinámicamente un prototipo en el Stack de memoria."
    ],
    answer: 0
  },
  {
    id: 54,
    concept: "Polimorfismo",
    question: "En el ejemplo de la orquesta, si el Director llama a tocarInstrumento(), ¿cómo responde el Baterista?",
    options: [
      "Haciendo un punteo de cuerdas virtuales.",
      "Presionando las teclas de manera secuencial.",
      "Golpeando los tambores a su propia manera."
    ],
    answer: 2
  },
  {
    id: 55,
    concept: "Herencia",
    question: "¿Cuál es la regla principal que debe cumplirse para aplicar la herencia entre una clase padre e hija?",
    options: [
      "La regla del 'Es un' (Is-a); la clase hija debe ser un tipo específico de la clase padre.",
      "La regla de 'Tiene un'; la clase hija debe almacenar un atributo estático del padre.",
      "La regla de 'Clonación'; la clase hija debe copiar el prototipo de la clase base con base.Clone()."
    ],
    answer: 0
  },
  {
    id: 56,
    concept: "Herencia",
    question: "En lenguajes como C# o Java, ¿por qué se implementa la Herencia Simple y qué se usa si se requiere heredar comportamiento múltiple?",
    options: [
      "Se hereda de una sola clase para evitar el 'problema del diamante'; si se requiere comportamiento múltiple se usan Interfaces.",
      "Se hereda de una sola clase para ahorrar memoria en el Stack; para comportamiento múltiple se clonan objetos.",
      "Se hereda de una sola clase para proteger los métodos private; para comportamiento múltiple se usan comandos void."
    ],
    answer: 0
  }
];

// Export standard CommonJS module if in Node, or expose globally in browser
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = questions;
} else {
  window.questionsData = questions;
}
