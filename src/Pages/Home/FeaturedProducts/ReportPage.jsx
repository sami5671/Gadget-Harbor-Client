import { useLoaderData } from "react-router-dom";

const ReportPage = () => {
  // =================================================================
  const products = useLoaderData();
  console.log(products);

  // =================================================================
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default ReportPage;
