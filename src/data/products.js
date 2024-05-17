const products = [
    {
        id: 1,
        category_id: 1,
        name: "Foredom 3Xl",
        price: 59.9,
        image: "dremel",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 250,
        available: true
      },
      {
        id: 2,
        category_id: 1,
        name: "Foredom Batidor",
        price: 49.9,
        image: "foredom",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 150,
        available: true
      },
      {
        id: 3,
        category_id: 2,
        name: "Dremel spress white",
        price: 25.65,
        image: "dremel",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 150,
        available: true
      },
      {

        id: 4,
        category_id: 3,
        name: "Antorcha poderosa",
        price: 325.65,
        image: "fundicion_equipos",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 50,
        available: true
      },
      {

        id: 5,
        category_id: 3,
        name: "Antorcha poderosa xfg",
        price: 125.65,
        image: "fundicion_equipos",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 350,
        available: true
      },
      {
        id: 6,
        category_id: 4,
        name: "Rectificador de corriente 5AMP",
        price: 125.65,
        image: "galvanoplastia",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 350,
        available: true
      },
      {
        id: 7,
        category_id: 4,
        name: "Rectificador de corriente 500AMP",
        price: 1725.25,
        image: "galvanoplastia",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 370,
        available: true
      },
      {
        id: 8,
        category_id: 5,
        name: "Grabador de anillos pequeños",
        price: 725.25,
        image: "grabado",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 270,
        available: true
      },
      {
        id: 9,
        category_id: 5,
        name: "Grabador de anillos medianos",
        price: 525.25,
        image: "grabado",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 10,
        category_id: 5,
        name: "Grabador de anillos laser",
        price: 525.25,
        image: "grabado",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 11,
        category_id: 5,
        name: "trokelador de anillos laser",
        price: 25.25,
        image: "grabado",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 12,
        category_id: 5,
        name: "Grabador de anillos medianos",
        price: 425.25,
        image: "grabado",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 13,
        category_id: 6,
        name: "Laminador de anillos",
        price: 485.25,
        image: "laminadoras",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 14,
        category_id: 6,
        name: "troquelador de anillos",
        price: 185.25,
        image: "laminadoras",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 15,
        category_id: 6,
        name: "expansor de anillos",
        price: 85.25,
        image: "laminadoras",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 16,
        category_id: 7,
        name: "Cera de anillos azul",
        price: 65.25,
        image: "ceras",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 17,
        category_id: 7,
        name: "Cera de anillos roja",
        price: 65.25,
        image: "ceras",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 18,
        category_id: 7,
        name: "Cera de anillos verde",
        price: 55.45,
        image: "ceras",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 19,
        category_id: 7,
        name: "Cera de anillos expandible",
        price: 55.45,
        image: "ceras",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 20,
        category_id: 8,
        name: "broca cnc expandible",
        price: 155.45,
        image: "ceras",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 21,
        category_id: 8,
        name: "broca cnc 1/2",
        price: 155.45,
        image: "brocas",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 22,
        category_id: 8,
        name: "broca cnc 3/2",
        price: 105.45,
        image: "brocas",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 23,
        category_id: 8,
        name: "broca cnc 3/5",
        price: 125.45,
        image: "brocas",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 24,
        category_id: 10,
        name: "Sujetador cnc 3/5",
        price: 225.45,
        image: "sujetadores",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 25,
        category_id: 10,
        name: "Sujetador cnc 1/5",
        price: 225.45,
        image: "sujetadores",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 26,
        category_id: 10,
        name: "pin de apollo cnc 3/5",
        price: 225.45,
        image: "sujetadores",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 27,
        category_id: 10,
        name: "pin de apollo cnc 3/5",
        price: 225.45,
        image: "sujetadores",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      },
      {
        id: 28,
        category_id: 11,
        name: "prensa de apollo cnc 3/5",
        price: 225.45,
        image: "prensas",
        description: "Con este equipo podras desacer y hacer todo lo que quieras en el momoento que deses, pregunta ya por nyuestra suèr combo del año",
        units : 70,
        available: true
      }
]

export {
    products 
}