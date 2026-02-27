import type { GhostfaceKiller, MovieSlug } from '@/types/movie';

export const ghostfaceKillers: Record<MovieSlug, GhostfaceKiller[]> = {
  'scream-1996': [
    {
      character: 'Billy Loomis',
      actor: 'Skeet Ulrich',
      motive: "Revenge against Maureen Prescott, whose affair with his father caused his mother to abandon the family. He murdered Maureen and framed Cotton Weary, then one year later orchestrated a new killing spree to torment Sidney and frame her father Neil.",
    },
    {
      character: 'Stu Macher',
      actor: 'Matthew Lillard',
      motive: "Initially claims he joined for fun, but ultimately cites 'peer pressure' from Billy as his reason.",
    },
  ],
  'scream-2-1997': [
    {
      character: 'Mickey Altieri',
      actor: 'Timothy Olyphant',
      motive: 'A psychotic film student who wanted to be caught and become infamous, blaming cinema violence for his actions in a highly publicized trial.',
    },
    {
      character: 'Nancy Loomis (a.k.a. Debbie Salt)',
      actor: 'Laurie Metcalf',
      motive: "Billy Loomis's mother, seeking revenge against Sidney for killing her son, and anger at Maureen Prescott for breaking up her marriage. She funded and recruited Mickey.",
    },
  ],
  'scream-3-2000': [
    {
      character: 'Roman Bridger',
      actor: 'Scott Foley',
      motive: "Sidney's secret half-brother, born from Maureen Prescott's rape during her brief time as an actress in Hollywood. Rejected by Maureen when he tried to find her, Roman was consumed by jealousy of Sidney. He is revealed as the mastermind behind the entire franchise -- he showed Billy Loomis evidence of his father's affair with Maureen and encouraged Billy to murder her, setting the entire series of events into motion.",
    },
  ],
  'scream-4-2011': [
    {
      character: 'Jill Roberts',
      actor: 'Emma Roberts',
      motive: "Sidney's cousin, jealous of the fame and attention Sidney received as a survivor. Jill wanted to create her own massacre and emerge as the new 'final girl' and media celebrity, exploiting the culture of social media and internet fame.",
    },
    {
      character: 'Charlie Walker',
      actor: 'Rory Culkin',
      motive: 'A horror film fanatic and Jill\'s accomplice, motivated by his obsession with horror films and his infatuation with Jill. He believed they would be the new Sidney and Randy. Jill ultimately betrayed and killed him.',
    },
  ],
  'scream-5-2022': [
    {
      character: 'Richie Kirsch',
      actor: 'Jack Quaid',
      motive: "An obsessive, toxic fan of the in-universe 'Stab' horror franchise who was deeply disappointed with the direction of the most recent entry, 'Stab 8.' He met Amber online on a Stab subreddit and together they plotted a new real-life killing spree to inspire a better sequel based on true events.",
    },
    {
      character: 'Amber Freeman',
      actor: 'Mikey Madison',
      motive: "Living in Stu Macher's old house, Amber became obsessed with the original Woodsboro massacre and the Stab franchise. Frustrated with the franchise's decline, she partnered with Richie to create new source material by committing real murders.",
    },
  ],
  'scream-vi-2023': [
    {
      character: 'Detective Wayne Bailey',
      actor: 'Dermot Mulroney',
      motive: 'Father of Richie Kirsch. Seeking revenge against Sam Carpenter for killing his son. He orchestrated an online smear campaign to frame Sam as the real Woodsboro killer, and infiltrated the investigation as a detective.',
    },
    {
      character: 'Quinn Bailey',
      actor: 'Liana Liberato',
      motive: "Richie's sister, seeking revenge for her brother's death. She faked her own death early in the film to divert suspicion and became Sam and Tara's roommate to spy on them.",
    },
    {
      character: 'Ethan Landry',
      actor: 'Jack Champion',
      motive: "Richie's younger brother (using his mother's maiden name). Enrolled at Blackmore University alongside the 'Core Four' to get close to them. Motivated by revenge for his brother's death.",
    },
  ],
};
