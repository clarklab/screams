import type { MovieSummaries } from '@/types/movie';

const quickTake = "Twenty-five years after the original Woodsboro killings, a new Ghostface emerges and targets a group of teenagers connected to the legacy of the original murders, forcing the survivors of the past to return and confront the terror once more.";

const spoilerFree: MovieSummaries['spoilerFree'] = [
  {
    timestamp: '0–10 min',
    heading: 'Tara Attacked',
    paragraphs: [
      "Twenty-five years after the original Ghostface killings, a new masked killer attacks teenager Tara Carpenter in Woodsboro. Unlike the iconic opening of the original, Tara survives, but the attack draws her estranged older sister Sam back to town. Sam carries a dark secret: she is the illegitimate daughter of original Ghostface killer Billy Loomis, and she's been haunted by visions of her dead father.",
    ],
  },
  {
    timestamp: '10–30 min',
    heading: 'Legacy Connections',
    paragraphs: [
      "As the new Ghostface targets Tara's friend group -- all of whom have connections to the original massacre survivors -- Sam and her boyfriend {{REDACTED:Richie}} seek help from Dewey Riley, now divorced and living alone. Dewey contacts Sidney Prescott and Gale Weathers, warning them the nightmare has returned.",
    ],
  },
  {
    timestamp: '30–80 min',
    heading: 'Requel Rules',
    paragraphs: [
      "Mindy Meeks-Martin, niece of the late Randy Meeks, theorizes that the killer is following the rules of a 'requel' -- a combination reboot and sequel that requires new characters connected to legacy characters. The theory proves correct as the killer's targets become clear and the stakes escalate.",
    ],
  },
  {
    timestamp: '80–114 min',
    heading: 'For Wes',
    paragraphs: [
      "The film serves as both a loving tribute to Wes Craven's legacy and a sharp commentary on toxic fandom, nostalgia culture, and the entitled possessiveness that some fans feel over beloved franchises. It ends with a dedication reading 'For Wes.'",
    ],
  },
];

const fullPlot: MovieSummaries['fullPlot'] = [
  {
    timestamp: '0–10 min',
    heading: 'Tara Survives',
    paragraphs: [
      "The film opens with Tara Carpenter home alone in Woodsboro, receiving a threatening call from Ghostface. Unlike the classic opening kill, Tara survives the attack but is severely injured and hospitalized. Her estranged older sister Sam Carpenter drives from Modesto with her boyfriend Richie Kirsch to be at Tara's side.",
    ],
  },
  {
    timestamp: '10–30 min',
    heading: "Sam's Secret",
    paragraphs: [
      "Sam harbors a secret: she discovered she is the illegitimate daughter of Billy Loomis, the original Ghostface killer. She left Woodsboro to escape this legacy and is haunted by hallucinations of her dead father. Tara's friends -- Amber Freeman, Wes Hicks, twins Chad and Mindy Meeks-Martin, and Liv McKenzie -- rally around her. That night, Vince Schneider (Stu Macher's nephew and Liv's ex) is stabbed to death by Ghostface outside a bar.",
      "Sam and Richie seek help from Dewey Riley, who has become an alcoholic recluse after divorcing Gale. Dewey contacts Sidney and Gale to warn them. Mindy, niece of the late Randy Meeks, identifies the pattern: the killer is creating a 'requel,' targeting people connected to the original survivors.",
    ],
  },
  {
    timestamp: '30–80 min',
    heading: "Dewey's Last Stand",
    paragraphs: [
      "Ghostface murders Sheriff Judy Hicks on her front lawn and then kills her son Wes inside their home. At the hospital, Ghostface attacks Tara and Richie. Dewey, Sam, and Richie fight off the killer and evacuate Tara. Dewey, having initially escaped, turns back to finish off the downed Ghostface and is fatally stabbed. His death marks the first time a legacy trio member has been killed in the franchise.",
      "Sidney arrives in Woodsboro after learning of Dewey's death and meets Gale and Sam. Sam initially refuses to help, wanting to flee with Tara and Richie. They end up at a party at Amber's house -- which turns out to be Stu Macher's old house, the location of the original massacre's climax.",
    ],
  },
  {
    timestamp: '80–114 min',
    heading: 'Toxic Fans Unmasked',
    paragraphs: [
      "During a memorial gathering for Wes, Mindy and Chad are attacked separately by Ghostface. Then Amber suddenly pulls out Dewey's stolen gun and shoots Liv in the head, revealing herself as one of the Ghostface killers.",
      "Richie reveals himself as Amber's partner. Together they take Sam, Tara, Sidney, and Gale hostage in the kitchen -- the same kitchen where Sidney confronted Billy and Stu 25 years earlier. Richie and Amber explain they are toxic Stab fans who met on a Reddit forum. Furious that 'Stab 8' (directed by the fictional Rian Johnson stand-in) took the franchise in a new direction, they orchestrated real murders to inspire a 'true' sequel. They plan to frame Sam, using her connection to Billy Loomis as motive.",
      "The group fights back. Amber sets the house ablaze. Sidney and Gale battle Amber -- Gale shoots her and she falls onto a lit stove, catching fire. Richie chases Sam, who sees a hallucination of Billy pointing to a knife. Sam embraces her heritage, grabs the knife, and stabs Richie repeatedly before slitting his throat. She then shoots him to make sure. A severely burned Amber lunges out one final time but Tara shoots her dead.",
      "Sam and Tara reconcile. Gale decides not to write about the killings. Sidney calls her husband and children, confirming she's safe. Mindy and Chad survive their injuries. The film ends with the dedication 'For Wes.'",
    ],
  },
];

export const summaries: MovieSummaries = { quickTake, spoilerFree, fullPlot };
