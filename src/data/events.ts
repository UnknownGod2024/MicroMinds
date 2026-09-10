export interface EventData {
  id: string;
  status: 'upcoming' | 'past';
  date: string;
  title: string;
  subtitle: string;
  speaker?: string;
  venue?: string;
  coverImage: string;
  galleryImages?: string[];
  learnings?: string[];
  highlights?: string[];
  description: string;
}

export const events: EventData[] = [
  {
    id: "fpga-workshop-feb2026",
    status: 'past',
    date: "22 February 2026",
    title: "VLSI AND FPGA DESIGN",
    subtitle: "Hands-on Workshop",
    speaker: "Dr. Poonam Kadam",
    venue: "4th Floor, AIML Dept., Dwarkadas J. Sanghvi College of Engineering",
    coverImage: "/events/IMG_7483.jpeg",
    galleryImages: [
      "/events/IMG_7425.jpeg",
      "/events/IMG_7426.jpeg",
      "/events/IMG_7441.jpeg",
      "/events/IMG_7447.jpeg",
      "/events/IMG_7448.jpeg"
    ],
    learnings: [
      "Introduction to VLSI Design Flow",
      "Verilog HDL basics",
      "FPGA-based digital design",
      "Communication protocols"
    ],
    highlights: [
      "Step-by-step hands-on implementation",
      "Hands-on FPGA exposure",
      "Verilog to hardware flow",
      "Real-time implementation guidance",
      "Certificate of participation"
    ],
    description: "A comprehensive hands-on workshop introducing participants to the intricacies of VLSI design and FPGA development. Led by Dr. Poonam Kadam, attendees gained practical experience in writing Verilog HDL, understanding digital design communication protocols, and translating software code into functional hardware implementations."
  },
  {
    id: "fpga-workshop-sep2026",
    status: 'upcoming',
    date: "27 September 2026",
    title: "FPGA WORKSHOP",
    subtitle: "Digital Design & FPGA Development",
    coverImage: "/vision/workshop_3d.png",
    description: "A hands-on FPGA workshop introducing participants to digital design and FPGA development. More details and registration coming soon."
  }
];
