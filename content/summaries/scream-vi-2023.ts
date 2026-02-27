import type { MovieSummaries } from '@/types/movie';

const quickTake = "The survivors of the latest Woodsboro massacre relocate to New York City for a fresh start, but a new Ghostface follows them, launching a brutal killing spree through Manhattan with a deeply personal vendetta tied to the previous film's events.";

const spoilerFree: MovieSummaries['spoilerFree'] = [
  {
    timestamp: '0–10 min',
    heading: 'New York, New Terror',
    paragraphs: [
      "One year after the Woodsboro killings, Sam and Tara Carpenter have relocated to New York City along with fellow survivors Chad and Mindy Meeks-Martin. Sam is struggling with PTSD and visions of her father Billy Loomis, while online conspiracy theories accuse her of being the real Ghostface killer.",
    ],
  },
  {
    timestamp: '10–35 min',
    heading: 'A Deadlier Ghostface',
    paragraphs: [
      "Their fragile peace is shattered when a new Ghostface emerges in the city. The opening sequence delivers the franchise's first-ever mid-scene unmasking when a killer reveals himself -- only to be murdered by another Ghostface, establishing that this new killer is more ruthless than any before.",
      "As the body count rises across the city -- from the subway to apartment buildings to a bodega -- the group enlists help from returning Scream 4 survivor Kirby Reed, now an FBI agent, and Sam's neighbor Danny. Sam's roommate {{REDACTED:Quinn}} and {{REDACTED:Ethan Landry}}, a friend from university, are drawn into the danger alongside {{REDACTED:Detective Wayne Bailey}}, who is investigating the case.",
    ],
  },
  {
    timestamp: '35–85 min',
    heading: 'Gale Under Attack',
    paragraphs: [
      'Gale Weathers is attacked in her penthouse, surviving only because Sam and Tara arrive in time.',
    ],
  },
  {
    timestamp: '85–123 min',
    heading: 'The Ghostface Shrine',
    paragraphs: [
      'The climax unfolds in an abandoned theater converted into a Ghostface shrine displaying artifacts from every previous massacre. For the first time in franchise history, three killers are revealed -- all members of the same family, united by a desire for revenge. The film explores themes of trauma, family legacy, and the question of whether violence is inherited or chosen.',
    ],
  },
];

const fullPlot: MovieSummaries['fullPlot'] = [
  {
    timestamp: '0–10 min',
    heading: 'Double Cross Opening',
    paragraphs: [
      "The film opens with a twist on the franchise formula: film professor Laura Crane is lured into an alley and murdered by Ghostface, who immediately unmasks as Jason Carvey, a Blackmore University student. Jason calls his roommate Greg to celebrate, but upon arriving home finds Greg dead. The real Ghostface calls Jason and murders him, establishing a more brutal and unpredictable killer.",
    ],
  },
  {
    timestamp: '10–35 min',
    heading: 'Manhattan Murders',
    paragraphs: [
      "One year later, Sam Carpenter is seeing a therapist about her visions of Billy Loomis and her fear that she enjoyed killing Richie. Online, conspiracy theories paint Sam as the real Woodsboro killer. Sam, Tara, Mindy, and Chad are living in New York City. Chad and Tara attend Blackmore University alongside Mindy and her girlfriend Anika, Chad's roommate Ethan Landry, and the Bailey siblings -- Quinn (Sam and Tara's roommate) and her father, NYPD Detective Wayne Bailey.",
      "Ghostface attacks Sam and Tara at a bodega, killing the store owner. Quinn is seemingly killed in the apartment. On the subway, Mindy is stabbed by a Ghostface lost in a crowd of Halloween partygoers. The group is contacted by Kirby Reed, the survivor from Scream 4 who is now an FBI agent specializing in Ghostface cases.",
    ],
  },
  {
    timestamp: '35–85 min',
    heading: 'Gale Targeted',
    paragraphs: [
      "Ghostface calls Gale at her penthouse, taunting her about Dewey's death, then murders her boyfriend and attacks her. Sam and Tara arrive to save Gale, who is hospitalized in critical condition. Detective Bailey discovers a Ghostface shrine in an abandoned theater containing artifacts from all previous massacres -- the original Ghostface robes, Billy's mask, Stu's costume, Amber's mask, and more.",
    ],
  },
  {
    timestamp: '85–123 min',
    heading: "The Kirsch Family's Revenge",
    paragraphs: [
      "Bailey leads the group to the theater, where the trap is sprung. Bailey reveals himself as Ghostface and is joined by a very-much-alive Quinn and by Ethan. They are the family of Richie Kirsch -- Bailey is Richie's father, Quinn and Ethan are his siblings (Ethan using his mother's maiden name, Landry). They orchestrated everything to avenge Richie's death: the online smear campaign against Sam, Quinn faking her death, Ethan infiltrating the friend group at university, and Bailey manipulating the investigation from the inside.",
      "Bailey plans to kill Sam and frame her as the mastermind, using the evidence in the shrine. In the climactic battle, Sam and Tara fight the three killers. Sam kills Quinn by stabbing her. Tara stabs Ethan. Sam dons her father Billy's Ghostface mask, calls Bailey on the phone to taunt him, and then brutally stabs him to death. Ethan revives one last time, but Kirby smashes a television on his head (echoing Sidney killing Stu in the original), ending him.",
      "In the aftermath, Gale, Mindy, and Chad all survive their injuries. Sam looks at Billy's Ghostface mask one final time, then drops it and walks away with Tara and Danny, choosing to leave her father's violent legacy behind. Kirby is taken to the hospital alive.",
    ],
  },
];

export const summaries: MovieSummaries = { quickTake, spoilerFree, fullPlot };
