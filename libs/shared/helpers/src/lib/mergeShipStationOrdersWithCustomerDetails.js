export default function mergeShipStationOrdersWithCustomerDetails(
  customerDetails,
  shipStationOrders
) {
  return {
    ...customerDetails,
    orders: customerDetails.orders.map(order => {
      return {
        ...order,
        ...shipStationOrders[order.name],
      };
    }),
  };
}
