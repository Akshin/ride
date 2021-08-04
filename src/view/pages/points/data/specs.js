export const specs = [
  {
    title: "Теплоснабжение",
    subtype: "hot",
    type: "sensor"
  },
  {
    title: "ГВС",
    subtype: "gvs",
    type: "sensor"
  },
  {
    title: "ХВС",
    subtype: "hvs",
    type: "sensor"
  },
  {
    title: "Мастер устройства",
    subtype: "device",
    type: "device"
  },
  {
    title: "Шкаф управления",
    subtype: "controllerBox",
    type: "equipment"
  },
  {
    title: "Электроэнергия",
    subtype: "electroEnergy",
    type: "sensor"
  },
  {
    title: "Материалы для монтажа",
    subtype: "supply",
    type: "sensor"
  }
];

export const specFields = {
  id: "id",
  pid: "pid",
  name: "Наименование прибора",
  unit: "Ед. изм.",
  quantity: "Количество",
  desc: "Примечание",
  cipher: "Шифр",
  serial: "Серийный номер",
  period: "Периодичность",
  type: "Тип",
  subType: "Подтип"
};
