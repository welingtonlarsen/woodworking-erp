import axios from "axios";
import moment from "moment";

const parseToJsonRequest = (productionOrder) => {
  const rooms = productionOrder.rooms.map((room) => {
    const fornitures = room.fornitures.map((forniture) => {
      return {
        name: forniture.name,
        productionStart: moment(new Date(forniture.productionStart)).format(
          "YYYY-MM-DD"
        ),
        containsPurchaseOrder: forniture.containsPurchaseOrder,
        forecast: moment(new Date(forniture.forecast)).format("YYYY-MM-DD"),
        woodWorker: forniture.woodWorker,
        deadline: moment(new Date(forniture.deadline)).format("YYYY-MM-DD"),
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
    rooms: rooms,
  };
};

const create = async (productionOrder) => {
  await axios.post(
    "http://localhost:3000/productionorder",
    parseToJsonRequest(productionOrder)
  );
};

export { create };
