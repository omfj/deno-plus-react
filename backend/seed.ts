import { db } from "./db/kv.ts";
import { createPost } from "./db/post.ts";

const posts = [
  {
    title: "The Power of Data Analytics in Driving Business Growth",
    body: "Data analytics has become a crucial tool for businesses to gain valuable insights and make informed decisions. By harnessing the power of data, organizations can uncover patterns, trends, and customer behaviors that can drive growth strategies. Data analytics empowers businesses to optimize operations, identify new revenue streams, and personalize customer experiences. From predictive analytics to machine learning algorithms, companies can leverage data to gain a competitive edge in today's data-driven marketplace.",
  },
  {
    title:
      "The Future of Work: Embracing Remote Collaboration and Digital Nomadism",
    body: "Advancements in technology and changing work dynamics have paved the way for remote collaboration and digital nomadism. As more companies adopt flexible work arrangements, teams are collaborating across geographical boundaries, leveraging digital tools and communication platforms. This shift offers numerous benefits, such as increased productivity, access to global talent pools, and improved work-life balance. However, it also brings challenges in terms of communication, team cohesion, and managing virtual work environments. Embracing the future of work requires organizations to adapt their structures, policies, and technologies to foster effective collaboration in a remote and distributed workforce.",
  },
  {
    title: "The Role of Augmented Reality in Transforming User Experiences",
    body: "Augmented reality (AR) is revolutionizing user experiences by overlaying virtual content onto the real world. From gaming and entertainment to retail and education, AR technology enhances interactions and provides immersive experiences. With the help of smartphones, smart glasses, or specialized AR devices, users can engage with digital elements seamlessly integrated into their surroundings. AR opens up new possibilities for businesses, enabling virtual try-ons, interactive product demonstrations, and virtual tours. As AR continues to evolve, it has the potential to reshape how we learn, shop, explore, and interact with the world around us.",
  },
  {
    title:
      "The Rise of Quantum Computing: Unlocking Unprecedented Computational Power",
    body: "Quantum computing is poised to revolutionize the world of computation, offering immense processing power and solving problems that are beyond the reach of classical computers. By utilizing quantum bits or qubits, which can exist in multiple states simultaneously, quantum computers can perform complex calculations with remarkable efficiency. Industries such as cryptography, drug discovery, optimization, and AI stand to benefit greatly from this technology. However, quantum computing is still in its early stages, facing challenges such as maintaining qubit stability and error correction. As researchers continue to advance this field, the potential for quantum computing to transform various domains is becoming increasingly apparent.",
  },
  {
    title: "The Internet of Things (IoT): Connecting the World Around Us",
    body: "The Internet of Things (IoT) is a network of interconnected devices, sensors, and systems that exchange data and enable seamless communication. From smart homes and wearables to industrial automation and smart cities, IoT is revolutionizing the way we interact with our environment. IoT devices collect and analyze data, enabling real-time monitoring, automation, and intelligent decision-making. With the increasing availability of high-speed connectivity and advancements in miniaturization, the potential applications for IoT are virtually limitless. However, the widespread adoption of IoT also brings concerns related to security, privacy, and data management that need to be carefully addressed.",
  },
  {
    title:
      "Artificial Intelligence in Healthcare: Revolutionizing Patient Care",
    body: "Artificial intelligence (AI) is making significant strides in the healthcare industry, transforming patient care and medical research. AI algorithms can analyze vast amounts of patient data, assisting in diagnosing diseases, predicting treatment outcomes, and personalizing healthcare interventions. Machine learning models can aid in the discovery of new drugs and assist in clinical decision-making. AI-powered systems, such as robotic surgeons and virtual nursing assistants, are enhancing surgical precision and patient monitoring. However, the integration of AI in healthcare requires addressing ethical considerations, data privacy, and ensuring transparency in decision-making algorithms. As AI continues to advance, it holds tremendous potential to improve healthcare outcomes and make medical services more accessible and efficient.",
  },
];

const seed = async () => {
  for (const post of posts) {
    await createPost(post);
  }
};

seed()
  .then(() => {
    console.log("🚀 Seeded database");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    db.close();
  });
