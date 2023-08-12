import { ChevronRightIcon } from "@heroicons/react/24/solid";
// eslint-disable-next-line react/prop-types
const OrdersCard = ({ totalPrice, quantity, date }) => {
  return (
    <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80">
      <div className="flex justify-between items-center w-full">
        <p className="flex flex-col">
          <span>{date}</span>
          <span>{quantity} articles</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-2xl">${totalPrice}</span>
          <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
