// version 1.2.3
export const ProductCategoryDatabaseNames = <const>[
  // machines
  "cars",
  "carsParts",
  "carsEquipment",

  "realEstate",

  // electronics
  "electronics",
  "smartphones",
  "headphones",
  "computers",
  "commutersEquipment",
  "laptops",
  "photoVideoEquipment",
  "audioDevices",
  "networkDevices",

  // furniture
  "furniture",
  "houseAppliances",

  // humans
  "service",
  "vacancy",
  "resume",
  "handmade",

  "clothes",

  //hobby
  "hobby",
  "sport",
  "musicInstruments",

  "childrenGoods",

  "animals",

  "other"
]

// Convert to union type
export type ProductCategoryDatabaseName = typeof ProductCategoryDatabaseNames[number]

export interface ProductCategory {
  visualName: string
  databaseName: ProductCategoryDatabaseName
}
