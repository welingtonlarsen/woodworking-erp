import axios from "axios";
import moment from "moment";

const parseToJsonRequest = (productionOrder) => {
  const rooms = productionOrder.rooms.map((room) => {
    const fornitures = room.fornitures.map((forniture) => {
      console.log(forniture.forecast.valueOf());
      return {
        name: forniture.name,
        productionStart: forniture.productionStart.valueOf(),
        containsPurchaseOrder: forniture.containsPurchaseOrder,
        forecast: forniture.forecast.valueOf(),
        woodWorker: forniture.woodWorker,
        deadline: forniture.deadline.valueOf(),
      };
    });

    return {
      name: room.name,
      fornitures,
    };
  });

  return {
    client: {
      name: productionOrder.client,
    },
    start: new Date().valueOf(),
    deadline: new Date().valueOf(),
    rooms: rooms,
  };
};

const create = async (productionOrder) => {
  await axios.post("http://localhost:3005/productionorder", parseToJsonRequest(productionOrder));
};

const getAll = async () => {
  return axios.get("http://localhost:3005/productionorder");
};

export { create, getAll };
