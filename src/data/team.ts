export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  heads: TeamMember[];
  subHeads: TeamMember[];
}

export const faculty: TeamMember = {
  name: "Dr. Poonam Kadam",
  role: "Incharge Faculty Member",
  image: "/team/Dr_Poonam_Kadam.jpeg"
};

export const leadership = {
  chairperson: {
    name: "Heet Bharadwa",
    role: "Chairperson",
    image: "/team/Heet_Bharadwa.jpeg",
    linkedin: "https://linkedin.com/in/heet-bharadwa-239a17334"
  },
  viceChairperson: {
    name: "Kalash Bheda",
    role: "Vice Chairperson",
    image: "/team/Kalash_Bheda.jpeg",
    linkedin: "https://linkedin.com/in/kalash-bheda"
  },
  secretary: {
    name: "Shushant Singh",
    role: "Secretary",
    image: "/team/Sushant.jpg",
    linkedin: "https://linkedin.com/in/sushant450"
  },
  jointSecretary: {
    name: "Sneha Sancheti",
    role: "Joint Secretary",
    image: "/team/Sneha%20Sancheti.png",
    linkedin: "https://linkedin.com/in/sneha-sancheti-87a311320"
  },
  treasurer: {
    name: "Rishabh Ritesh Rathi",
    role: "Treasurer",
    image: "/team/Rishabh_Rathi.jpg",
    linkedin: "https://linkedin.com/in/rishabh-rathi-7b0901376"
  }
};

export const departments: Department[] = [
  {
    id: "01",
    name: "TECHNICAL",
    description: "Building the core foundation through hands-on VLSI projects and technical exploration.",
    heads: [
      { name: "Kairav Lokesh Singhal", role: "Technical Head", image: "/team/Kairav_Singhal_MM.jpg", linkedin: "https://linkedin.com/in/kairav-singhal-9ba599377" },
      { name: "Swayam Pandya", role: "Technical Head", image: "/team/Swayam%20Pandya%20.png", linkedin: "https://linkedin.com/in/swayam-pandya-902b8542b" }
    ],
    subHeads: [
      { name: "Hriday Hablani", role: "Sub Head", image: "/team/Hriday%20Hablani%20MM.png", linkedin: "https://www.linkedin.com/in/hriday-hablani-2100482a8/" },
      { name: "Shrutak Reddy", role: "Sub Head", image: "/team/ShrutakReddy.png", linkedin: "https://linkedin.com/in/shrutak-reddy-902b5742b" }
    ]
  },
  {
    id: "02",
    name: "CREATIVES / DOCUMENTATION",
    description: "Shaping the visual identity and recording the journey of our community.",
    heads: [
      { name: "Fanali Doshi", role: "Creatives Head", image: "/team/Fanali_Doshi.jpg", linkedin: "https://linkedin.com/in/fanalidoshi" },
      { name: "Arnav Bhandari", role: "Creatives Head", image: "/team/Arnav_Bhandari.jpg", linkedin: "https://linkedin.com/in/arnav-bhandari-78b187314" }
    ],
    subHeads: [
      { name: "Samuel Gonsalves", role: "Sub Head", image: "/team/Samuel_Gonsalves.png", linkedin: "https://linkedin.com/in/samuel-gonsalves-a04608346" },
      { name: "Soham Chopade", role: "Sub Head", image: "/team/Soham%20Chopade.png", linkedin: "https://www.linkedin.com/in/soham-chopade-4870a8419?utm_source=share_via&utm_content=profile&utm_medium=member_android" }
    ]
  },
  {
    id: "03",
    name: "SPONSORSHIP / COLLABORATION",
    description: "Bridging the gap between the club and industry partners for mutual growth.",
    heads: [{ name: "Tanush Shah", role: "Sponsorship Head", image: "/team/Tanush.jpg" }],
    subHeads: [
      { name: "Aadit Dani", role: "Sub Head", image: "/team/Aadit.png", linkedin: "https://linkedin.com/in/aadit-dani-5a5739255" },
      { name: "Geetansh Daga", role: "Sub Head", image: "/team/Geetansh_Daga.jpeg", linkedin: "https://linkedin.com/in/geetansh-daga-84892b372" }
    ]
  },
  {
    id: "04",
    name: "RESEARCH",
    description: "Pushing the boundaries of learning through in-depth analysis and academic papers.",
    heads: [
      { name: "Arnav Bhandari", role: "Research Head", image: "/team/Arnav_Bhandari.jpg", linkedin: "https://linkedin.com/in/arnav-bhandari-78b187314" },
      { name: "Varad Bhandari", role: "Research Head", image: "/team/Varad_Bhandari.png", linkedin: "https://linkedin.com/in/varad-bhandari-9a9971331" }
    ],
    subHeads: [
      { name: "Dhruv Balsara", role: "Sub Head", image: "/team/Dhruv_Balsara.jpg", linkedin: "https://linkedin.com/in/dhruvbalsara-djsce" }
    ]
  },
  {
    id: "05",
    name: "EVENTS",
    description: "Orchestrating workshops, seminars, and engaging experiences for the students.",
    heads: [{ name: "Swayam Pandya", role: "Events Head", image: "/team/Swayam%20Pandya%20.png", linkedin: "https://linkedin.com/in/swayam-pandya-902b8542b" }],
    subHeads: [
      { name: "Divy Kothari", role: "Sub Head", image: "/team/Divy%20Kothari.png", linkedin: "https://linkedin.com/in/divy-kothari" },
      { name: "Prashil Ruparelia", role: "Sub Head", image: "/team/prashil_ruparelia.jpeg", linkedin: "https://linkedin.com/in/prashil-ruparelia-10799b2a4" }
    ]
  },
  {
    id: "06",
    name: "OUTREACH AND PUBLICITY",
    description: "Expanding our presence and connecting our vision with the broader audience.",
    heads: [{ name: "Arya Upadhyay", role: "Outreach Head", image: "/team/Arya%20Upadhyay_.png", linkedin: "https://linkedin.com/in/arya-upadhyay-3a672534b" }],
    subHeads: [
      { name: "Anaya Kajave", role: "Sub Head", image: "/team/Anaya_Kajave.png", linkedin: "https://linkedin.com/in/anaya-kajave-19b83a1b6" },
      { name: "Rajat Viroja", role: "Sub Head", image: "/team/Rajat%20Viroja_.png", linkedin: "https://linkedin.com/in/rajat-viroja-851921338" },
      { name: "Shlok Dhaybar", role: "Sub Head", image: "/team/Shlok_Dhaybar.png", linkedin: "https://linkedin.com/in/shlok-dhaybar-ab0032371" }
    ]
  }
];
