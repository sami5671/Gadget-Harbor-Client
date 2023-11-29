import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });
  const axiosSecureUsers = useAxiosSecure();
  const { data: userAddedProduct = [] } = useQuery({
    queryKey: ["userAddedProduct"],
    queryFn: async () => {
      const res = await axiosSecure.get("/userAddedProduct");
      return res.data;
    },
  });

  // Calculate percentages based on the total count of each category
  const totalReviews = reviews.length;
  const totalProducts = userAddedProduct.length;
  const totalUsers = users.length;

  const data = [
    { name: "Reviews", value: totalReviews },
    { name: "Products", value: totalProducts },
    { name: "Users", value: totalUsers },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <section>
        <SectionTitle
          heading={"Statistics"}
          subHeading={"Monitor once in look"}
        ></SectionTitle>

        <div className="flex flex-col lg:flex-row ">
          <h1 className="text-2xl text-green-700 mb-4 lg:mr-4 lg:mb-0">
            Total number of products: {totalProducts}
          </h1>
          <h1 className="text-2xl text-blue-700 mb-4 lg:mr-4 lg:mb-0">
            Total number of reviews: {totalReviews}
          </h1>
          <h1 className="text-2xl text-yellow-400">
            Total number of users: {totalUsers}
          </h1>
        </div>
      </section>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart width={600} height={600}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
