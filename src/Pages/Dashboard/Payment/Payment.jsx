import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// =================================================================
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
// =================================================================

const Payment = () => {
  const totalPrice = 12.5;
  return (
    <>
      <section>
        <SectionTitle
          heading={"Payment Here"}
          subHeading={"Make Payment & Get facilities"}
        ></SectionTitle>
      </section>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm totalPrice={totalPrice}></CheckoutForm>
        </Elements>
      </div>
    </>
  );
};

export default Payment;
