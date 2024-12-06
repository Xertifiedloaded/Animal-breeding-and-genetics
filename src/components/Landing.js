import Image from "next/image";
import {
  FaGraduationCap,
  FaMicroscope,
  FaAward,
  FaGlobeAfrica,
} from "react-icons/fa";

export default function Research() {
  const stats = [
    {
      icon: <FaGraduationCap className="text-4xl text-blue-600" />,
      number: "500+",
      label: "Alumni Worldwide",
    },
    {
      icon: <FaMicroscope className="text-4xl text-green-600" />,
      number: "25+",
      label: "Research Projects",
    },
    {
      icon: <FaAward className="text-4xl text-purple-600" />,
      number: "50+",
      label: "Publications",
    },
    {
      icon: <FaGlobeAfrica className="text-4xl text-red-600" />,
      number: "10+",
      label: "International Collaborations",
    },
  ];

  const researchAreas = [
    "Animal Genetics",
    "Breeding Technologies",
    "Genomic Selection",
    "Conservation Genetics",
    "Livestock Improvement",
  ];

  return (
    <div className="bg-gray-50">
      <div className="relative h-screen overflow-hidden">
        <Image
          src="/dna.jpg"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
          alt="Department Landscape"
        />
        <div className="absolute inset-0  opacity-70 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 flex flex-col justify-center h-full text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Animal Breeding & Genetics
          </h1>
          <p className="text-xl max-w-2xl mb-8">
            Pioneering Genetic Research for Sustainable Animal Development
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
              Explore Research
            </button>
            <button className="border border-white hover:bg-white hover:text-blue-900 px-6 py-3 rounded-lg">
              Alumni Network
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-xl shadow-md">
                {stat.icon}
                <h3 className="text-3xl font-bold mt-4 text-gray-800">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 lg:mb-12">
            Our Research Focus
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {researchAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="lg:text-xl text-lg font-semibold mb-4">{area}</h3>
                <p className="text-gray-600 lg:text-base text-sm">
                  Innovative approaches to genetic improvement and sustainable
                  development.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}
