// import dataSource from "emoji-datasource/emoji.json"; // disabled fallback
import data from "emojibase-data/en/data.json";
import messages from "emojibase-data/en/messages.json";
import emojibaseShortcodes from "emojibase-data/en/shortcodes/emojibase.json";
import gitHubShortcodes from "emojibase-data/en/shortcodes/github.json";
import fs from "fs";
import json5 from "json5";

import type { EmojiItem } from "../src/emoji";
import { removeVariationSelector } from "../src/helpers/removeVariationSelector";

const emojis: EmojiItem[] = data
  .filter((emoji) => emoji.version > 0 && emoji.version < 14)
  .map((emoji) => {
    // #region - disabled fallback
    // const dataSourceEmoji = dataSource.find((item) => {
    //   return (
    //     item.unified === emoji.hexcode || item.non_qualified === emoji.hexcode
    //   );
    // });
    // const hasFallbackImage = dataSourceEmoji?.has_img_apple;
    // #endregion
    const name =
      [gitHubShortcodes[emoji.hexcode]].flat()[0] ||
      [emojibaseShortcodes[emoji.hexcode]].flat()[0]!;
    const shortcodes = emojibaseShortcodes[emoji.hexcode]
      ? [emojibaseShortcodes[emoji.hexcode]!].flat()
      : [];
    const emoticons = emoji.emoticon ? [emoji.emoticon].flat() : [];

    return {
      emoji: removeVariationSelector(emoji.emoji),
      name,
      shortcodes,
      tags: emoji.tags || [],
      group: emoji.group
        ? (messages.groups[emoji.group]?.message ?? "")
        : undefined,
      emoticons: emoticons.length > 0 ? emoticons : undefined,
      version: emoji.version,
      // #region - disabled fallback
      // fallbackImage: hasFallbackImage
      //   ? `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${dataSourceEmoji.image}`
      //   : undefined,
      // #endregion
    };
  });

// #region - disable fallback (github emoji are useless without them)
// const gitHubCustomEmojiNames = [
//   // "atom",
//   // "basecamp",
//   // "basecampy",
//   "bowtie",
//   // "electron",
//   "feelsgood",
//   // "finnadie",
//   // "goberserk",
//   // "godmode",
//   // "hurtrealbad",
//   // "neckbeard",
//   // "octocat",
//   "rage1",
//   "rage2",
//   "rage3",
//   "rage4",
//   "shipit",
//   "suspect",
//   "trollface",
// ];

// const gitHubCustomEmojis: EmojiItem[] = gitHubCustomEmojiNames.map((name) => {
//   return {
//     name,
//     shortcodes: [name],
//     tags: [],
//     group: "GitHub",
//     fallbackImage: `https://github.githubassets.com/images/icons/emoji/${name}.png`,
//   };
// });

// const content = `// This is a generated file

// import type { EmojiItem } from "./emoji.js";

// export const emojis: EmojiItem[] = ${json5.stringify(emojis, { space: 2, quote: '"' })};

// export const gitHubCustomEmojis: EmojiItem[] = ${json5.stringify(gitHubCustomEmojis, { space: 2, quote: '"' })};

// export const gitHubEmojis: EmojiItem[] = [...emojis, ...gitHubCustomEmojis];
// `;
// #endregion

const content = `// This is a generated file

import type { EmojiItem } from "./emoji.js";

export const emojis: EmojiItem[] = ${json5.stringify(emojis, { space: 2, quote: '"' })};
`;

fs.writeFileSync("./src/data.ts", content);
