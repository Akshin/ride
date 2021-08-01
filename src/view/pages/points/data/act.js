export const act = {
  pointName: "",
  address: "",
  contactName: "",
  contactPhone: "",
  hotScheme: "",
  hotHidroelevator: "",
  hotHVSSystem: "",
  hotHVSСirculation: "",
  hotSensorModel: "",
  hotSensorExport: "",
  internetProvider: "",
  internetToMaster: "",
  hot: "",
  hgvs: "",
  energy: "",
  pipeline: "",
  dispatching: "",
  dispatchingOwner: "",
  dispatchingExport: "",
  amperage: "",
  art: "",
  desc: ""
};

export const actDict = {
  pointName: "Название объекта",
  address: "Адрес объекта",
  contactName: "Контактное лицо",
  contactPhone: "Телефон",
  hotScheme: "Схема теплоснабжения",
  hotHidroelevator: "Наличие гидроэлеватора",
  hotHVSSystem: "Система ГВС",
  hotHVSСirculation: "Циркуляция ГВС",
  hotSensorModel: "Модель теплосчетчика",
  hotSensorExport: "Наличие выхода данных из теплосчетчика",
  internetProvider: "Провайдер",
  internetToMaster:
    "Возможность проведения проводного интернета к мастер устройствам",
  hot: "Отопление",
  hgvs: "ХГВС",
  energy: "Наличие элементов питания в местах размещения оборудования",
  pipeline: "Материал трубопроводов",
  dispatching: "Наличие диспетчеризации",
  dispatchingOwner: "Собственник диспетчеризации",
  dispatchingExport: "Наличие дискретного выхода с счетчика ХВС",
  amperage: "Трансформаторы тока",
  art: "Наличие системы АРТ",
  desc: "Примечание"
};

export const actSorted = {
  ОБЩЕЕ: ["pointName", "address", "contactName", "contactPhone"],
  Теплоснабжение: [
    "hotScheme",
    "hotHidroelevator",
    "hotHVSSystem",
    "hotHVSСirculation"
  ],
  Теплосчетчик: ["hotSensorModel", "hotSensorExport"],
  Интернет: ["internetProvider", "internetToMaster"],
  "Помещение и место размещения оборудования в дальних точках": ["hot", "hgvs"],
  Электрика: ["energy"],
  Трубопровод: ["pipeline"],
  Диспетчеризация: ["dispatching", "dispatchingOwner", "dispatchingExport"],
  Ток: ["amperage"],
  АРТ: ["art"],
  Дополнительно: [],
  Примечания: ["desc"]
};

export const disabledInputs = ["pointName", "address"];
