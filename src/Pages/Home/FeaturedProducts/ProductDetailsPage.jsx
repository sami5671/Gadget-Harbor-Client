// Import necessary libraries and components
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ProductDetailsPage = () => {
  const productDetails = useLoaderData();
  const { name, image, tags } = productDetails;

  return (
    <div>
      <Helmet>
        <title>Gadget Harbor || Product Details</title>
      </Helmet>
      <h1 className="lg:mb-24 text-white">hello</h1>
      <SectionTitle
        heading={name}
        subHeading={"----Product Details of-------"}
      ></SectionTitle>

      <section className="flex flex-col lg:flex-row px-4 lg:px-0">
        <div className="lg:mr-8">
          <img className="w-full lg:w-[900px]" src={image} alt="" />
        </div>

        <div>
          <h1 className="text-lg lg:text-xl mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            voluptas, repudiandae deserunt ut nobis quo dolor exercitationem
            aliquam ipsum voluptate, placeat repellendus ea magni vitae mollitia
            cupiditate pariatur illum perspiciatis.
          </h1>
          <div className="mb-4">
            <p>Tag_1: {tags[0]}</p>
            <p>Tag_2: {tags[1]}</p>
            <p>Tag_3: {tags[2]}</p>
          </div>
          <p>External Links: </p>
          <p>UpVote Count: </p>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
