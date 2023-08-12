import { useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {
  const context = useContext(ShoppingCartContext);
  const { category } = useParams();
  let items =
    context.searchByTitle?.length > 0 ? context.filteredItems : context.items;

  if (category) {
    items = context.filteredItemsByCategory(items, category);
  }

  const renderView = () => {
    if (items?.length > 0) {
      return items.map((item) => <Card key={item.id} data={item} />);
    } else {
      return (
        <div className="absolute inset-0 flex justify-center items-center">
          <p>Sorry! Item not found! :(</p>
        </div>
      );
    }
  };

  return (
    <>
      <Layout>
        <div className="flex items-center justify-center relative w-80 mb-4">
          <h1 className="font-medium text-xl">Exclusive Products</h1>
        </div>
        <input
          type="text"
          placeholder="Search a product"
          className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
          onChange={(event) => {
            context.setSearchByTitle(event.target.value);
          }}
        />
        <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
          {renderView()}
        </div>
        <ProductDetail />
      </Layout>
    </>
  );
}

export default Home;
