type DataStructure = {
  [year: string]: {
    // Dynamic keys for years
    [comp: string]: {
      problems: string[];
    };
  };
};

// Example Usage
const data: DataStructure = {
  "2022": {
    state: {
      problems: [
        "andrei",
        "charles",
        "dmitry",
        "fatima",
        "frances",
        "honghui",
        "manuel",
        "michelle",
        "prateek",
        "richard",
        "sanjay",
        "urvashi",
      ],
    },
    region: {
      problems: [
        "agustina",
        "arya",
        "diego",
        "fai",
        "ivan",
        "juana",
        "krithika",
        "michal",
        "paola",
        "ricardo",
        "shivam",
        "tomek",
      ],
    },
    district: { problems: [] },
  },
  "2023": {
    state: {
      problems: [
        "ajay",
        "cynthia",
        "fernando",
        "helena",
        "javier",
        "kamil",
        "louis",
        "neeraj",
        "pavel",
        "romina",
        "sveta",
        "vivek",
      ],
    },
    region: {
      problems: [
        "ajay",
        "cynthia",
        "fernando",
        "helena",
        "javier",
        "kamil",
        "louis",
        "neeraj",
        "pavel",
        "romina",
        "sveta",
        "vivek",
      ],
    },
    district: {
      problems: [
        "bogdan",
        "christine",
        "george",
        "hisoka",
        "janice",
        "krishna",
        "liza",
        "miguel",
        "patrick",
        "shreya",
        "sunil",
        "vanessa",
      ],
    },
  },
  "2024": {
    state: {
      problems: [
        "ace",
        "bart",
        "ben",
        "bethany",
        "conrad",
        "dilbert",
        "jason",
        "lina",
        "max",
        "nicholas",
        "rufus",
        "victoria",
      ],
    },
    region: {
      problems: [
        "audrey",
        "bob",
        "casandra",
        "clarabelle",
        "harmony",
        "jared",
        "jimothy",
        "paola",
        "riley",
        "sasha",
        "svetlana",
        "wesley",
      ],
    },
    district: {
      problems: [
        "ada",
        "ariel",
        "bodhi",
        "caroline",
        "christie",
        "claudius",
        "garold",
        "hannah",
        "jennifer",
        "leah",
        "lucas",
        "veda",
      ],
    },
  },
};

export default data;
