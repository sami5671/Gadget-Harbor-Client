import img1 from "../../assets/Images/pic1.jpg";
import img2 from "../../assets/Images/jhankarmahbub.png";
import img3 from "../../assets/Images/pic 4.jpeg";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AboutUs = () => {
  return (
    <section className="p-8">
      <div className="mt-12"></div>
      <SectionTitle
        heading={"Meet Our Team Member"}
        subHeading={"Great People with Amazing work"}
      ></SectionTitle>
      <div className="container mx-auto">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center text-cyan-400 mb-4">
          About Us
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Introducing the cutting-edge QuantumX Pro, our latest technological
          marvel that seamlessly combines innovation and performance. This
          state-of-the-art device revolutionizes the tech landscape with its
          quantum computing capabilities, enabling unprecedented speeds and
          computational power. The QuantumX Pro also prioritizes security,
          incorporating quantum encryption for data protection, setting new
          standards for privacy in the digital age. Stay connected effortlessly
          with 5G connectivity and experience unparalleled multitasking with its
          seamless integration of augmented reality applications. The QuantumX
          Pro is not just a product; it's a glimpse into the future of
          technology, where quantum computing meets everyday convenience,
          setting a new benchmark for the possibilities of tomorrow.
        </p>
        <p className="text-gray-700 text-lg mb-6">
          The QuantumX Pro is meticulously crafted for versatility, boasting an
          ultra-slim design that houses a quantum processor, ensuring optimal
          efficiency for diverse computing tasks. Equipped with advanced
          artificial intelligence algorithms, this tech marvel adapts to user
          behavior, delivering a personalized and intuitive experience. Its
          immersive display features quantum dot technology, rendering vibrant
          colors and lifelike visuals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={img1}
              alt="Manager 1"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-xl font-semibold mb-2">John Doe</h3>
            <p className="text-gray-600">General Manager</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={img2}
              alt="Manager 2"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-xl font-semibold mb-2">Jhankar Mahbub</h3>
            <p className="text-gray-600">Admin</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={img3}
              alt="Manager 3"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-xl font-semibold mb-2">Michael Johnson</h3>
            <p className="text-gray-600">Moderator </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
