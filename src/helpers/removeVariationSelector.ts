/**
 * Removes variation selectors from emoji strings. For emoji with text variants,
 * preserves the emoji presentation selector (U+FE0F) to ensure they render as
 * colorful emoji instead of text glyphs.
 *
 * @param value - The emoji string potentially containing variation selectors
 * @param withTextVariant - Whether the emoji has a text presentation variant
 * @returns The emoji string with selectors removed or preserved as needed
 */
export function removeVariationSelector(
  value: string,
  withTextVariant?: boolean,
): string {
  // Always remove text presentation selector (U+FE0E)
  const result = value.replace("\u{FE0E}", "");
  // For emoji with text variants (a text field with U+FE0E), preserve emoji-
  // presentation selector (U+FE0F) to ensure they render as colorful emoji
  if (withTextVariant) {
    return result;
  }
  // For emoji-only characters, remove emoji presentation selector
  return result.replace("\u{FE0F}", "");
}
