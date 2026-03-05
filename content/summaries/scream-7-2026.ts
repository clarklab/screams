import type { MovieSummaries } from '@/types/movie';

const quickTake = "Neve Campbell returns as Sidney Prescott, now a mother in the small town of Pine Grove, where a new Ghostface killer targets her teenage daughter -- forcing Sidney to confront her traumatic past one more time in a plot that weaponizes AI deepfakes and toxic fandom.";

const spoilerFree: MovieSummaries['spoilerFree'] = [
  {
    timestamp: '0–15 min',
    heading: 'The Macher House Returns',
    paragraphs: [
      "A young couple rents the infamous Macher House from the original Woodsboro massacre for a horror-themed getaway, only to meet a gruesome end at the hands of a new Ghostface. Meanwhile, in the small town of Pine Grove, Indiana, Sidney Prescott has built a quiet life: she runs a coffee shop, is married to police officer Mark Evans, and is raising their children, including teenage daughter Tatum -- named after Sidney's late best friend.",
    ],
  },
  {
    timestamp: '15–40 min',
    heading: 'Stu Macher Lives?',
    paragraphs: [
      "Sidney receives a chilling video call from what appears to be an aged, scarred Stu Macher -- the killer everyone believed died 30 years ago. The apparent resurrection of Stu sends shockwaves through Sidney's carefully constructed normal life. Gale Weathers arrives in Pine Grove to investigate, and the Meeks-Martin twins Mindy and Chad join the group.",
      "As Ghostface begins targeting people close to Sidney's family, her daughter Tatum grows increasingly curious about the violent past her mother has kept hidden.",
    ],
  },
  {
    timestamp: '40–80 min',
    heading: 'A New Kind of Ghostface',
    paragraphs: [
      "The body count rises as Ghostface picks off victims in Pine Grove. The investigation leads Sidney and Gale to a nearby psychiatric facility, where they uncover a connection between the attacks and a disturbed patient obsessed with the Stab franchise. One Ghostface is killed early -- run over by Gale -- but the killings continue, revealing that multiple killers are at work.",
    ],
  },
  {
    timestamp: '80–114 min',
    heading: 'The Cycle Continues',
    paragraphs: [
      "The climax reveals that the apparent return of Stu Macher was an elaborate deepfake created with AI technology. The true killers' motives are rooted in obsessive fandom and a twisted desire to force Sidney back into her 'final girl' role. Sidney must fight to protect her daughter and break the cycle of violence that has haunted her for three decades.",
    ],
  },
];

const fullPlot: MovieSummaries['fullPlot'] = [
  {
    timestamp: '0–15 min',
    heading: 'Opening Kills at the Macher House',
    paragraphs: [
      "Horror fans Scott and Madison rent the infamous Macher House from the original 1996 Woodsboro massacre. They're murdered by a new Ghostface in the film's cold open. In Pine Grove, Indiana, Sidney Prescott lives a quiet life running a coffee shop, married to police officer Mark Evans, and raising their children. Her eldest, teenager Tatum Evans (named after Tatum Riley), wants to learn more about her mother's violent past, which Sidney has kept from her.",
    ],
  },
  {
    timestamp: '15–30 min',
    heading: 'The Return of Stu Macher',
    paragraphs: [
      "Sidney receives a Ghostface call that escalates to a video call revealing what appears to be an aged and scarred Stu Macher -- the killer who supposedly died when a television was dropped on his head 30 years ago. The 'surviving' Stu threatens Sidney and her family. Gale Weathers arrives in Pine Grove to investigate, and the Meeks-Martin twins Mindy and Chad join the effort.",
      "A first Ghostface is unmasked early when Gale runs him over with her car. He is revealed as Karl Allan Gibbs, an escaped psychiatric patient obsessed with the Stab franchise. His room at the institution is covered in Stab memorabilia and drawings of Sidney.",
    ],
  },
  {
    timestamp: '30–70 min',
    heading: 'Investigation and Body Count',
    paragraphs: [
      "Despite Karl's death, the killings continue -- proving multiple Ghostfaces are active. Tatum's friend Chloe, Sidney's neighbor's son Lucas Bowden, and Tatum's boyfriend Ben are all murdered. Sidney and Gale travel to the Fallbrook psychiatric facility to investigate Karl's background. They meet an orderly named Marco, who shows them Karl's obsession-filled room and identifies a photo of Stu as a former patient known as 'John Doe' who suffered memory loss from a traumatic head injury.",
      "Sidney's daughter Tatum begins her own investigation into her mother's past, uncovering details about the original Woodsboro massacre.",
    ],
  },
  {
    timestamp: '70–114 min',
    heading: 'Deepfakes and the True Killers',
    paragraphs: [
      "The climax unfolds at Sidney's home. Tatum is taken hostage, tied to a chair with Ghostface holding her at knifepoint. The Ghostface unmasks as Marco, the psychiatric hospital orderly, who reveals he is also a former Google security specialist with an AI background. He created the deepfake 'Stu Macher' using his tech expertise -- Stu was never alive. A second Ghostface unmasks as {{REDACTED:Jessica Bowden}}, Sidney's neighbor.",
      "{{REDACTED:Jessica}} reveals her twisted motive: she endured an abusive marriage and found solace in Sidney's memoir about surviving Ghostface. Inspired by Sidney's resilience, she murdered her own husband. But rather than finding freedom, she became obsessed with Sidney as a symbol of survival. When Sidney didn't appear during the New York killings in Scream VI, {{REDACTED:Jessica}} felt abandoned. She checked herself into the psychiatric facility, recruited Marco, and used Karl as a disposable first killer -- all to engineer a new massacre that would restore Sidney to her 'final girl' legacy.",
      "{{REDACTED:Jessica}} murdered her own son Lucas ('He had too much of his father in him') and now intends to kill Sidney in front of Tatum to continue the 'cycle' that began with Maureen Prescott's murder. In the final confrontation, Mark helps Tatum break free. Sidney shoots Marco in the head. {{REDACTED:Jessica}} flees to the garage but is ultimately stopped. Sidney survives once more, finally breaking the cycle for her daughter.",
    ],
  },
];

export const summaries: MovieSummaries = { quickTake, spoilerFree, fullPlot };
