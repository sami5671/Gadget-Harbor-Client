import ChatbotApp from "../../Components/Chatbot/ChatbotApp";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import UseFeaturedProducts from "../../Hooks/UseFeaturedProducts";
import AllAcceptedProductCard from "./AllAcceptedProductCard";

const AllAcceptedProducts = () => {
  // =================================================================
  const [featuredProduct] = UseFeaturedProducts();
  console.log(featuredProduct);
  // =================================================================
  const allAcceptedProductTrue = featuredProduct.filter(
    (product) => product.AcceptedProduct === "true"
  );
  //  =================================================================

  // =================================================================
  return (
    <>
      <div>
        <h1 className="text-white py-8">helloo</h1>
      </div>
      <section className="relative">
        <SectionTitle
          heading={"Our All Products"}
          subHeading={"We believe in quality not quantity"}
        ></SectionTitle>
        <div className="absolute top-0 right-0">
          <ChatbotApp />
        </div>
      </section>

      <section className="p-4 md:p-16 mx-auto mt-12 lg:mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {allAcceptedProductTrue.map((cards) => (
            <AllAcceptedProductCard
              key={cards._id}
              cards={cards}
            ></AllAcceptedProductCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllAcceptedProducts;
