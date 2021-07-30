export default (obj) => {
  const objLemgth = Object.keys(obj).length;
  const fullCount = Object.values(obj).filter((el) => el && el.length).length;
  return (fullCount / objLemgth) * 100;
};
