import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ totalPrice }) => {
  // =================================================================
  const [error, setError] = useState();
  const [clientSecret, setClientSecret] = useState(" ");
  const [transactionId, setTransactionId] = useState(" ");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // =================================================================

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);
  //   =================================================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment Error: ", error);
      setError(error.message);
    } else {
      console.log("Payment Method: ", paymentMethod);
      setError(" ");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error");
    } else {
      console.log("Payment intenet: ", paymentIntent);
    }
    if (confirmError) {
      console.log("confirm error: ");
    } else {
      console.log("payment Intent: ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction Id: ", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        setPaymentCompleted(true);

        // now save the payment in the database
        const payment = {
          email: user.email,
          transactionId: paymentIntent.id,
          price: 12,
          date: new Date(),
          status: "true",
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("Payment saved: ", res.data);

        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thanks for your payment",
            showConfirmButton: false,
            timer: 1500,
          });
          // navigate("/dashboard/userHome");
        }
      }
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Information
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          className={`${
            paymentCompleted
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-700 hover:bg-cyan-400"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          disabled={!stripe || !clientSecret || paymentCompleted}
        >
          {paymentCompleted ? "Payment Completed" : "Pay Now"}
        </button>
        <p className="text-red-600">{error}</p>

        {transactionId && (
          <p className="text-green-600">
            <span className="text-black">your transaction id: </span>
            {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
